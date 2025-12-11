// src/bookings/bookings.service.ts
import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto, UpdateBookingDto, QueryBookingDto } from './dto/bookings.dto';
import { CreateBookingFlowDto } from './dto/create_booking_flow.dto';
import { Customer } from '../customers/entities/customers.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { InvoiceItem, ItemType } from '../invoice_items/entities/invoice_item.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    // Validate booking time
    if (createBookingDto.endTime && createBookingDto.startTime >= createBookingDto.endTime) {
      throw new BadRequestException('End time must be after start time');
    }

    const booking = this.bookingRepository.create(createBookingDto);
    return await this.bookingRepository.save(booking);
  }

  async findAll(query: QueryBookingDto) {
    const { page = 1, limit = 10, customerId, storeId, bookingDate, status } = query;
    
    const queryBuilder = this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.store', 'store')
      .leftJoinAndSelect('booking.creator', 'creator');

    if (customerId) {
      queryBuilder.andWhere('booking.customerId = :customerId', { customerId });
    }

    if (storeId) {
      queryBuilder.andWhere('booking.storeId = :storeId', { storeId });
    }

    if (bookingDate) {
      queryBuilder.andWhere('booking.bookingDate = :bookingDate', { bookingDate });
    }

    if (status) {
      queryBuilder.andWhere('booking.status = :status', { status });
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);
    queryBuilder.orderBy('booking.createdAt', 'DESC');

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

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['customer', 'store', 'creator'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);

    // Validate booking time if both times are provided
    if (updateBookingDto.endTime && updateBookingDto.startTime) {
      if (updateBookingDto.startTime >= updateBookingDto.endTime) {
        throw new BadRequestException('End time must be after start time');
      }
    }

    Object.assign(booking, updateBookingDto);
    return await this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    const booking = await this.findOne(id);
    await this.bookingRepository.remove(booking);
  }

  async confirmBooking(id: number): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.confirm = true;
    return await this.bookingRepository.save(booking);
  }

  async cancelBooking(id: number): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.status = 'cancelled' as any;
    return await this.bookingRepository.save(booking);
  }

  async getBookingsByDateRange(
    storeId: number,
    startDate: string,
    endDate: string,
  ): Promise<Booking[]> {
    return await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.storeId = :storeId', { storeId })
      .andWhere('booking.bookingDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .leftJoinAndSelect('booking.customer', 'customer')
      .orderBy('booking.bookingDate', 'DESC')
      .addOrderBy('booking.startTime', 'DESC')
      .getMany();
  }

  // Create customer, booking, invoice and invoice items in a single transaction
  async createWithInvoice(createFlowDto: CreateBookingFlowDto) {
    return await this.dataSource.transaction(async (manager) => {
      const customerRepo = manager.getRepository(Customer);
      const bookingRepo = manager.getRepository(Booking);
      const invoiceRepo = manager.getRepository(Invoice);
      const invoiceItemRepo = manager.getRepository(InvoiceItem);

      // 1) Create or reuse customer by phone
      const phone = createFlowDto.customer.phone;
      let customer = await customerRepo.findOne({ where: { phone } });

      if (!customer) {
        customer = customerRepo.create(createFlowDto.customer as any);
        customer = await customerRepo.save(customer);
      }

      // 2) Create booking (attach customerId)
      const bookingPayload: CreateBookingDto = {
        ...createFlowDto.booking,
        customerId: customer.id,
      } as CreateBookingDto;

      const booking = bookingRepo.create(bookingPayload as any);
      const savedBooking = await bookingRepo.save(booking);

      // 3) Compute invoice amounts from items
      const items = createFlowDto.items || [];
      let subtotal = 0;
      const createdItems: InvoiceItem[] = [];

      for (const it of items) {
        const quantity = it.quantity || 1;
        const unitPrice = Number(it.unitPrice) || 0;
        const discount = Number(it.discount) || 0;
        const totalPrice = Number(it.totalPrice) || ((unitPrice * quantity) - discount);
        subtotal += totalPrice;
      }

      // Simple voucher generator
      const voucher = `INV-${Date.now()}`;

      const invoice = invoiceRepo.create({
        voucher,
        bookingId: savedBooking.id,
        customerId: customer.id,
        storeId: savedBooking.storeId,
        subtotal,
        discountAmount: 0,
        taxAmount: 0,
        totalAmount: subtotal,
        paidAmount: 0,
        paymentStatus: 'pending',
      } as any);

      const savedInvoice = await invoiceRepo.save(invoice);

      // 4) Create invoice items (link to savedInvoice)
      for (const it of items) {
        const invItem = invoiceItemRepo.create({
          invoiceId: savedInvoice.id,
          itemType: ItemType.SERVICE,
          itemId: it.itemId,
          itemName: it.itemName || null,
          staffId: it.staffId || null,
          quantity: it.quantity || 1,
          unitPrice: it.unitPrice,
          discount: it.discount || 0,
          totalPrice: it.totalPrice || ((it.unitPrice || 0) * (it.quantity || 1) - (it.discount || 0)),
        } as any);

        const created = await invoiceItemRepo.save(invItem);
        createdItems.push(created);
      }

      // 5) Optionally update customer visit/totalSpent
      try {
        customer.totalSpent = Number(customer.totalSpent || 0) + Number(subtotal || 0);
        customer.totalVisits = (customer.totalVisits || 0) + 1;
        customer.lastVisitDate = new Date();
        await customerRepo.save(customer);
      } catch (err) {
        // ignore non-critical update
      }

      return {
        customer,
        booking: savedBooking,
        invoice: savedInvoice,
        items: createdItems,
      };
    });
  }
}