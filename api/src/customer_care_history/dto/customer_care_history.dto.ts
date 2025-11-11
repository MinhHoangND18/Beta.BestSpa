import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CareType } from '../entities/customer_care_history.entity';
import { Type } from 'class-transformer';

export class CreateCustomerCareHistoryDto {
  @ApiProperty({ example: 1, description: 'ID khách hàng' })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiPropertyOptional({ example: 1, description: 'ID nhân viên chăm sóc' })
  @IsNumber()
  @IsOptional()
  staffId?: number;

  @ApiProperty({
    enum: CareType,
    example: CareType.CALL,
    description: 'Loại hình chăm sóc',
  })
  @IsEnum(CareType)
  @IsNotEmpty()
  careType: CareType;

  @ApiPropertyOptional({
    example: 'Gọi điện chúc mừng sinh nhật, khách hàng hài lòng',
    description: 'Nội dung chăm sóc',
  })
  @IsString()
  @IsOptional()
  review?: string;

  @ApiPropertyOptional({
    example: '2024-12-01',
    description: 'Ngày hẹn chăm sóc tiếp theo',
  })
  @IsDateString()
  @IsOptional()
  nextCareDate?: Date;
}

export class UpdateCustomerCareHistoryDto extends PartialType(
  CreateCustomerCareHistoryDto,
) {}

export class QueryCustomerCareHistoryDto {
  @ApiPropertyOptional({ description: 'ID khách hàng' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  customerId?: number;

  @ApiPropertyOptional({ description: 'ID nhân viên' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffId?: number;

  @ApiPropertyOptional({ enum: CareType, description: 'Loại hình chăm sóc' })
  @IsOptional()
  @IsEnum(CareType)
  careType?: CareType;

  @ApiPropertyOptional({ description: 'Tìm kiếm trong nội dung' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Lọc từ ngày (createdAt)',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    example: '2024-12-31',
    description: 'Lọc đến ngày (createdAt)',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiPropertyOptional({
    description: 'Chỉ lấy các record có nextCareDate',
    default: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  hasNextCareDate?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

export class CustomerCareStatisticsDto {
  @ApiPropertyOptional({ description: 'ID khách hàng để lọc thống kê' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  customerId?: number;

  @ApiPropertyOptional({ description: 'ID nhân viên để lọc thống kê' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffId?: number;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Từ ngày',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    example: '2024-12-31',
    description: 'Đến ngày',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;
}