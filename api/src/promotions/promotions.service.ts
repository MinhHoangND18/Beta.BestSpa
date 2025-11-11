import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import {
  Promotion,
  PromotionStatus,
  ApplicableTo,
} from './entities/promotion.entity';
import {
  CreatePromotionDto,
  UpdatePromotionDto,
  QueryPromotionDto,
  ValidatePromotionDto,
  ApplyPromotionDto,
  BulkUpdateStatusDto,
  PromotionValidationResponseDto,
  PromotionStatisticsDto,
} from './dto/promotions.dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promoRepo: Repository<Promotion>,
  ) {}

  async create(dto: CreatePromotionDto) {
    const exists = await this.promoRepo.findOne({ where: { code: dto.code } });
    if (exists) throw new BadRequestException('Promotion code already exists');

    const promotion = this.promoRepo.create(dto);
    return this.promoRepo.save(promotion);
  }

  async findAll(query: QueryPromotionDto) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      applicable_to,
      from_date,
      to_date,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = query;

    const where: any = {};

    if (search)
      where.name = ILike(`%${search}%`) || { code: ILike(`%${search}%`) };

    if (status) where.status = status;
    if (applicable_to) where.applicable_to = applicable_to;
    if (from_date && to_date)
      where.start_date = Between(new Date(from_date), new Date(to_date));

    const [data, total] = await this.promoRepo.findAndCount({
      where,
      order: { [sort_by]: sort_order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const promo = await this.promoRepo.findOne({ where: { id } });
    if (!promo) throw new NotFoundException('Promotion not found');
    return promo;
  }

  async update(id: number, dto: UpdatePromotionDto) {
    const promo = await this.findOne(id);
    Object.assign(promo, dto);
    return this.promoRepo.save(promo);
  }

  async remove(id: number) {
    const promo = await this.findOne(id);
    await this.promoRepo.remove(promo);
    return { message: 'Promotion deleted successfully' };
  }

  async bulkUpdateStatus(dto: BulkUpdateStatusDto) {
    await this.promoRepo
      .createQueryBuilder()
      .update(Promotion)
      .set({ status: dto.status })
      .whereInIds(dto.ids)
      .execute();

    return { message: 'Bulk update successful' };
  }


  async validateVoucher(
    dto: ValidatePromotionDto,
  ): Promise<PromotionValidationResponseDto> {
    const promo = await this.promoRepo.findOne({
      where: { code: dto.code, status: PromotionStatus.ACTIVE },
    });
    if (!promo) throw new NotFoundException('Invalid or inactive voucher');

    const now = new Date();
    if (promo.start_date && promo.end_date) {
      if (now < promo.start_date || now > promo.end_date)
        throw new BadRequestException('Promotion is expired or not yet valid');
    }

    if (promo.usage_limit && promo.usage_count >= promo.usage_limit)
      throw new BadRequestException('Promotion usage limit reached');

    if (
      promo.applicable_to !== ApplicableTo.ALL &&
      dto.applicable_type &&
      promo.applicable_to !== dto.applicable_type
    )
      throw new BadRequestException(
        `Promotion not applicable to ${dto.applicable_type}`,
      );


    if (promo.min_purchase && dto.purchase_amount < promo.min_purchase)
      throw new BadRequestException('Minimum purchase not reached');


    let discount = 0;
    if (promo.discount_type === 'percent') {
      discount = (dto.purchase_amount * promo.discount_value) / 100;
      if (promo.max_discount && discount > promo.max_discount)
        discount = promo.max_discount;
    } else {
      discount = promo.discount_value;
    }

    const finalAmount = dto.purchase_amount - discount;

    return {
      valid: true,
      promotion: {
        id: promo.id,
        code: promo.code,
        name: promo.name,
        discount_type: promo.discount_type,
        discount_value: promo.discount_value,
      },
      discount_amount: +discount.toFixed(2),
      final_amount: +finalAmount.toFixed(2),
      message: `Giảm ${
        promo.discount_type === 'percent'
          ? `${promo.discount_value}%`
          : `${promo.discount_value.toLocaleString()}đ`
      } ${
        promo.max_discount
          ? `(tối đa ${promo.max_discount.toLocaleString()}đ)`
          : ''
      }`,
    };
  }

  async applyVoucher(dto: ApplyPromotionDto) {
    const promo = await this.promoRepo.findOne({ where: { code: dto.code } });
    if (!promo) throw new NotFoundException('Promotion not found');

    if (promo.usage_limit && promo.usage_count >= promo.usage_limit)
      throw new BadRequestException('Promotion usage limit reached');

    await this.promoRepo.increment({ id: promo.id }, 'usage_count', 1);
    return { message: 'Promotion applied successfully' };
  }


  async getStatistics(): Promise<PromotionStatisticsDto> {
    const total_promotions = await this.promoRepo.count();
    const active_promotions = await this.promoRepo.count({
      where: { status: PromotionStatus.ACTIVE },
    });
    const expired_promotions = await this.promoRepo.count({
      where: { status: PromotionStatus.EXPIRED },
    });
    const inactive_promotions = await this.promoRepo.count({
      where: { status: PromotionStatus.INACTIVE },
    });

    const total_usage = await this.promoRepo
      .createQueryBuilder('p')
      .select('SUM(p.usage_count)', 'sum')
      .getRawOne();

    return {
      total_promotions,
      active_promotions,
      expired_promotions,
      inactive_promotions,
      total_usage: Number(total_usage.sum || 0),
      total_discount_amount: 0, // có thể tính thêm nếu lưu lịch sử discount thực tế
    };
  }
}
