import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, IsNull, Not } from 'typeorm';
import {
  CustomerCareHistory,
  CareType,
} from './entities/customer_care_history.entity';
import {
  CreateCustomerCareHistoryDto,
  UpdateCustomerCareHistoryDto,
  QueryCustomerCareHistoryDto,
  CustomerCareStatisticsDto,
} from './dto/customer_care_history.dto';

@Injectable()
export class CustomerCareHistoryService {
  constructor(
    @InjectRepository(CustomerCareHistory)
    private readonly careHistoryRepository: Repository<CustomerCareHistory>,
  ) {}

  async create(
    createDto: CreateCustomerCareHistoryDto,
  ): Promise<CustomerCareHistory> {
    const careHistory = this.careHistoryRepository.create(createDto);
    return await this.careHistoryRepository.save(careHistory);
  }

  async findAll(queryDto: QueryCustomerCareHistoryDto) {
    const {
      customerId,
      staffId,
      careType,
      search,
      fromDate,
      toDate,
      hasNextCareDate,
      page = 1,
      limit = 10,
    } = queryDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.careHistoryRepository
      .createQueryBuilder('care')
      .leftJoinAndSelect('care.customer', 'customer')
      .leftJoinAndSelect('care.staff', 'staff');

    if (customerId) {
      queryBuilder.andWhere('care.customerId = :customerId', { customerId });
    }

    if (staffId) {
      queryBuilder.andWhere('care.staffId = :staffId', { staffId });
    }

    if (careType) {
      queryBuilder.andWhere('care.careType = :careType', { careType });
    }

    if (search) {
      queryBuilder.andWhere('care.content LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (fromDate && toDate) {
      queryBuilder.andWhere('care.createdAt BETWEEN :fromDate AND :toDate', {
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      });
    } else if (fromDate) {
      queryBuilder.andWhere('care.createdAt >= :fromDate', {
        fromDate: new Date(fromDate),
      });
    } else if (toDate) {
      queryBuilder.andWhere('care.createdAt <= :toDate', {
        toDate: new Date(toDate),
      });
    }

    if (hasNextCareDate) {
      queryBuilder.andWhere('care.nextCareDate IS NOT NULL');
    }

    queryBuilder.skip(skip).take(limit).orderBy('care.createdAt', 'DESC');

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<CustomerCareHistory> {
    const careHistory = await this.careHistoryRepository.findOne({
      where: { id },
      relations: ['customer', 'staff'],
    });

    if (!careHistory) {
      throw new NotFoundException(
        `Customer care history with ID ${id} not found`,
      );
    }

    return careHistory;
  }

  async findByCustomer(customerId: number): Promise<CustomerCareHistory[]> {
    return await this.careHistoryRepository.find({
      where: { customerId },
      relations: ['customer', 'staff'],
      order: { createdAt: 'DESC' },
    });
  }

  async findUpcomingCares(days: number = 7): Promise<CustomerCareHistory[]> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return await this.careHistoryRepository.find({
      where: {
        nextCareDate: Between(today, futureDate),
      },
      relations: ['customer', 'staff'],
      order: { nextCareDate: 'DESC' },
    });
  }

  async findOverdueCares(): Promise<CustomerCareHistory[]> {
    const today = new Date();

    const queryBuilder = this.careHistoryRepository
      .createQueryBuilder('care')
      .leftJoinAndSelect('care.customer', 'customer')
      .leftJoinAndSelect('care.staff', 'staff')
      .where('care.nextCareDate < :today', { today })
      .andWhere('care.nextCareDate IS NOT NULL')
      .orderBy('care.nextCareDate', 'DESC');

    return await queryBuilder.getMany();
  }

  async update(
    id: number,
    updateDto: UpdateCustomerCareHistoryDto,
  ): Promise<CustomerCareHistory> {
    const careHistory = await this.findOne(id);
    Object.assign(careHistory, updateDto);
    return await this.careHistoryRepository.save(careHistory);
  }

  async remove(id: number): Promise<void> {
    const careHistory = await this.findOne(id);
    await this.careHistoryRepository.remove(careHistory);
  }

  async getStatistics(statsDto: CustomerCareStatisticsDto) {
    const { customerId, staffId, fromDate, toDate } = statsDto;

    const queryBuilder =
      this.careHistoryRepository.createQueryBuilder('care');

    if (customerId) {
      queryBuilder.andWhere('care.customerId = :customerId', { customerId });
    }

    if (staffId) {
      queryBuilder.andWhere('care.staffId = :staffId', { staffId });
    }

    if (fromDate && toDate) {
      queryBuilder.andWhere('care.createdAt BETWEEN :fromDate AND :toDate', {
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
      });
    } else if (fromDate) {
      queryBuilder.andWhere('care.createdAt >= :fromDate', {
        fromDate: new Date(fromDate),
      });
    } else if (toDate) {
      queryBuilder.andWhere('care.createdAt <= :toDate', {
        toDate: new Date(toDate),
      });
    }

    const [
      totalCares,
      callCount,
      smsCount,
      emailCount,
      zaloCount,
      visitCount,
      withNextCareDate,
    ] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder
        .clone()
        .andWhere('care.careType = :type', { type: CareType.CALL })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('care.careType = :type', { type: CareType.SMS })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('care.careType = :type', { type: CareType.EMAIL })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('care.careType = :type', { type: CareType.ZALO })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('care.careType = :type', { type: CareType.VISIT })
        .getCount(),
      queryBuilder
        .clone()
        .andWhere('care.nextCareDate IS NOT NULL')
        .getCount(),
    ]);

    // Get top customers being cared for
    const topCustomers = await this.careHistoryRepository
      .createQueryBuilder('care')
      .select('care.customerId', 'customerId')
      .addSelect('customer.fullName', 'customerName')
      .addSelect('COUNT(care.id)', 'careCount')
      .leftJoin('care.customer', 'customer')
      .groupBy('care.customerId')
      .addGroupBy('customer.fullName')
      .orderBy('careCount', 'DESC')
      .limit(10)
      .getRawMany();

    // Get top staff
    const topStaff = await this.careHistoryRepository
      .createQueryBuilder('care')
      .select('care.staffId', 'staffId')
      .addSelect('staff.fullName', 'staffName')
      .addSelect('COUNT(care.id)', 'careCount')
      .leftJoin('care.staff', 'staff')
      .where('care.staffId IS NOT NULL')
      .groupBy('care.staffId')
      .addGroupBy('staff.fullName')
      .orderBy('careCount', 'DESC')
      .limit(10)
      .getRawMany();

    return {
      totalCares,
      careByType: {
        call: callCount,
        sms: smsCount,
        email: emailCount,
        zalo: zaloCount,
        visit: visitCount,
      },
      withNextCareDate,
      topCustomers,
      topStaff,
    };
  }
}