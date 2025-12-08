import { 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsEnum, 
  IsOptional, 
  Min,
  Length,
  IsDateString 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  invoiceId: number;

  @ApiPropertyOptional({ example: 'PAY-2025-0001', maxLength: 50 })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  paymentCode?: string;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CASH })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: 500000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ example: 'TXN123456789', maxLength: 100 })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  transactionId?: string;

  @ApiPropertyOptional({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiPropertyOptional({ example: '2025-10-15T10:30:00Z' })
  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @ApiPropertyOptional({ example: 'Payment received successfully' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  createdBy?: number;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}

export class QueryPaymentDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  invoiceId?: number;

  @ApiPropertyOptional({ example: 'PAY-2025-0001' })
  @IsOptional()
  @IsString()
  paymentCode?: string;

  @ApiPropertyOptional({ enum: PaymentMethod })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({ enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiPropertyOptional({ example: '2025-10-01' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2025-10-31' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ default: 1, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;
}

export class ConfirmPaymentDto {
  @ApiPropertyOptional({ example: 'TXN123456789' })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiPropertyOptional({ example: 'Payment confirmed' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class RefundPaymentDto {
  @ApiProperty({ example: 'Refund requested by customer' })
  @IsNotEmpty()
  @IsString()
  reason: string;
}