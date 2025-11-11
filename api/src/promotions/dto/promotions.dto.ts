import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  DiscountType,
  ApplicableTo,
  PromotionStatus,
} from '../entities/promotion.entity';

export class CreatePromotionDto {
  @ApiProperty({ example: 'SUMMER2024', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiProperty({ example: 'Khuyến mãi mùa hè', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiPropertyOptional({ example: 'Giảm giá đặc biệt mùa hè' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: DiscountType, example: DiscountType.PERCENT })
  @IsEnum(DiscountType)
  @IsNotEmpty()
  discount_type: DiscountType;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  discount_value: number;

  @ApiPropertyOptional({ example: 100000 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  min_purchase?: number;

  @ApiPropertyOptional({ example: 500000 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  max_discount?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  usage_limit?: number;

  @ApiPropertyOptional({ enum: ApplicableTo, example: ApplicableTo.ALL })
  @IsEnum(ApplicableTo)
  @IsOptional()
  applicable_to?: ApplicableTo;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsDateString()
  @IsOptional()
  start_date?: Date;

  @ApiPropertyOptional({ example: '2024-12-31' })
  @IsDateString()
  @IsOptional()
  end_date?: Date;

  @ApiPropertyOptional({
    enum: PromotionStatus,
    example: PromotionStatus.ACTIVE,
  })
  @IsEnum(PromotionStatus)
  @IsOptional()
  status?: PromotionStatus;
}

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {}

export class QueryPromotionDto {
  @ApiPropertyOptional({ example: 1, description: 'Số trang' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Số lượng mỗi trang' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'SUMMER', description: 'Tìm kiếm theo code hoặc tên' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: PromotionStatus, description: 'Lọc theo trạng thái' })
  @IsOptional()
  @IsEnum(PromotionStatus)
  status?: PromotionStatus;

  @ApiPropertyOptional({
    enum: ApplicableTo,
    description: 'Lọc theo loại áp dụng',
  })
  @IsOptional()
  @IsEnum(ApplicableTo)
  applicable_to?: ApplicableTo;

  @ApiPropertyOptional({ example: '2024-01-01', description: 'Lọc từ ngày' })
  @IsOptional()
  @IsDateString()
  from_date?: string;

  @ApiPropertyOptional({ example: '2024-12-31', description: 'Lọc đến ngày' })
  @IsOptional()
  @IsDateString()
  to_date?: string;

  @ApiPropertyOptional({
    example: 'created_at',
    description: 'Sắp xếp theo trường',
    enum: ['created_at', 'name', 'discount_value', 'usage_count'],
  })
  @IsOptional()
  @IsString()
  sort_by?: string = 'created_at';

  @ApiPropertyOptional({
    example: 'DESC',
    description: 'Thứ tự sắp xếp',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sort_order?: 'ASC' | 'DESC' = 'DESC';
}

export class ValidatePromotionDto {
  @ApiProperty({ example: 'SUMMER2024', description: 'Mã khuyến mãi' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 500000, description: 'Số tiền mua hàng' })
  @IsNumber()
  @Min(0)
  purchase_amount: number;

  @ApiPropertyOptional({
    enum: ApplicableTo,
    example: ApplicableTo.PACKAGES,
    description: 'Loại sản phẩm/dịch vụ áp dụng',
  })
  @IsEnum(ApplicableTo)
  @IsOptional()
  applicable_type?: ApplicableTo;
}

export class ApplyPromotionDto {
  @ApiProperty({ example: 'SUMMER2024', description: 'Mã khuyến mãi' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({ example: 1, description: 'ID người dùng' })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID đơn hàng' })
  @IsNumber()
  @IsOptional()
  order_id?: number;
}

export class BulkUpdateStatusDto {
  @ApiProperty({ example: [1, 2, 3], description: 'Danh sách ID khuyến mãi' })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({
    enum: PromotionStatus,
    example: PromotionStatus.INACTIVE,
    description: 'Trạng thái mới',
  })
  @IsEnum(PromotionStatus)
  @IsNotEmpty()
  status: PromotionStatus;
}

export class PromotionValidationResponseDto {
  @ApiProperty({ example: true })
  valid: boolean;

  @ApiProperty({
    example: {
      id: 1,
      code: 'SUMMER2024',
      name: 'Khuyến mãi mùa hè',
      discount_type: 'percent',
      discount_value: 10,
    },
  })
  promotion: {
    id: number;
    code: string;
    name: string;
    discount_type: DiscountType;
    discount_value: number;
  };

  @ApiProperty({ example: 50000 })
  discount_amount: number;

  @ApiProperty({ example: 450000 })
  final_amount: number;

  @ApiPropertyOptional({ example: 'Giảm 10% tối đa 50,000đ' })
  message?: string;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}

export class PromotionListResponseDto {
  @ApiProperty({ type: [CreatePromotionDto] })
  data: any[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}


export class PromotionStatisticsDto {
  @ApiProperty({ example: 10 })
  total_promotions: number;

  @ApiProperty({ example: 5 })
  active_promotions: number;

  @ApiProperty({ example: 3 })
  expired_promotions: number;

  @ApiProperty({ example: 2 })
  inactive_promotions: number;

  @ApiProperty({ example: 150 })
  total_usage: number;

  @ApiProperty({ example: 15000000 })
  total_discount_amount: number;
}