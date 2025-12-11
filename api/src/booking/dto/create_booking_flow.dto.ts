import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCustomerDto } from '../../customers/dto/customers.dto';
import { CreateBookingDto } from './bookings.dto';
import { CreateInvoiceItemDto } from '../../invoice_items/dto/invoice_item.dto';

class BookingPayloadDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateBookingDto)
  booking: CreateBookingDto;
}

export class CreateBookingFlowDto {
  @ApiProperty({ description: 'Customer data' })
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @ApiProperty({ description: 'Booking data (without customerId)' })
  @ValidateNested()
  @Type(() => CreateBookingDto)
  booking: CreateBookingDto;

  @ApiPropertyOptional({ type: [CreateInvoiceItemDto], description: 'Invoice items (one per guest)' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items?: CreateInvoiceItemDto[];
}
