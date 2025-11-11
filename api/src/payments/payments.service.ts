import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { CreatePaymentDto, UpdatePaymentDto, QueryPaymentDto, ConfirmPaymentDto, RefundPaymentDto } from './dto/payments.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // Check if payment code already exists (if provided)
    if (createPaymentDto.paymentCode) {
      const existingPayment = await this.paymentRepository.findOne({
        where: { paymentCode: createPaymentDto.paymentCode }
      });

      if (existingPayment) {
        throw new ConflictException(`Payment with code ${createPaymentDto.paymentCode} already exists`);
      }
    }

    const payment = this.paymentRepository.create(createPaymentDto);
    return await this.paymentRepository.save(payment);
  }

  async findAll(query: QueryPaymentDto = {}) {
    const { 
      page = 1, 
      limit = 10, 
      invoiceId,
      paymentCode,
      paymentMethod,
      status,
      startDate,
      endDate 
    } = query;
    
    const queryBuilder = this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.invoice', 'invoice')
      .leftJoinAndSelect('payment.creator', 'creator');

    if (invoiceId) {
      queryBuilder.andWhere('payment.invoiceId = :invoiceId', { invoiceId });
    }

    if (paymentCode) {
      queryBuilder.andWhere('payment.paymentCode = :paymentCode', { paymentCode });
    }

    if (paymentMethod) {
      queryBuilder.andWhere('payment.paymentMethod = :paymentMethod', { paymentMethod });
    }

    if (status) {
      queryBuilder.andWhere('payment.status = :status', { status });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('payment.paymentDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate
      });
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);
    queryBuilder.orderBy('payment.paymentDate', 'DESC');

    const [data, total] = await queryBuilder.getManyAndCount();

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

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['invoice', 'creator'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async findByPaymentCode(paymentCode: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { paymentCode },
      relations: ['invoice', 'creator'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with code ${paymentCode} not found`);
    }

    return payment;
  }

  async findByInvoiceId(invoiceId: number): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { invoiceId },
      relations: ['invoice', 'creator'],
      order: { paymentDate: 'DESC' }
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    // Check payment code uniqueness if updating
    if (updatePaymentDto.paymentCode && updatePaymentDto.paymentCode !== payment.paymentCode) {
      const existingPayment = await this.paymentRepository.findOne({
        where: { paymentCode: updatePaymentDto.paymentCode }
      });
      
      if (existingPayment) {
        throw new ConflictException(`Payment with code ${updatePaymentDto.paymentCode} already exists`);
      }
    }

    Object.assign(payment, updatePaymentDto);
    return await this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }

  async confirmPayment(id: number, confirmPaymentDto: ConfirmPaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if (payment.status === PaymentStatus.PAID) {
      throw new BadRequestException('Payment is already confirmed');
    }

    if (payment.status === PaymentStatus.REFUNDED) {
      throw new BadRequestException('Cannot confirm a refunded payment');
    }

    payment.status = PaymentStatus.PAID;
    
    if (confirmPaymentDto.transactionId) {
      payment.transactionId = confirmPaymentDto.transactionId;
    }

    if (confirmPaymentDto.notes) {
      payment.notes = confirmPaymentDto.notes;
    }

    return await this.paymentRepository.save(payment);
  }

  async refundPayment(id: number, refundPaymentDto: RefundPaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if (payment.status !== PaymentStatus.PAID) {
      throw new BadRequestException('Only paid payments can be refunded');
    }

    payment.status = PaymentStatus.REFUNDED;
    payment.notes = `Refunded: ${refundPaymentDto.reason}${payment.notes ? ` | Previous notes: ${payment.notes}` : ''}`;

    return await this.paymentRepository.save(payment);
  }

  async markAsFailed(id: number, reason: string): Promise<Payment> {
    const payment = await this.findOne(id);

    payment.status = PaymentStatus.FAILED;
    payment.notes = `Failed: ${reason}${payment.notes ? ` | Previous notes: ${payment.notes}` : ''}`;

    return await this.paymentRepository.save(payment);
  }

  async getTotalByInvoice(invoiceId: number): Promise<number> {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.invoiceId = :invoiceId', { invoiceId })
      .andWhere('payment.status = :status', { status: PaymentStatus.PAID })
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  async getPaymentReport(startDate: string, endDate: string) {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('payment.paymentMethod', 'method')
      .addSelect('COUNT(payment.id)', 'count')
      .addSelect('SUM(payment.amount)', 'total')
      .where('payment.paymentDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate
      })
      .andWhere('payment.status = :status', { status: PaymentStatus.PAID })
      .groupBy('payment.paymentMethod')
      .getRawMany();

    return result.map(item => ({
      method: item.method,
      count: parseInt(item.count),
      total: parseFloat(item.total) || 0
    }));
  }
}