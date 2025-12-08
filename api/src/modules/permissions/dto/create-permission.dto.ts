import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Tên quyền',
    example: 'Quản lý người dùng',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Mã quyền (unique)',
    example: 'USER_MANAGE',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiProperty({
    description: 'Module/nhóm chức năng',
    example: 'USER',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  module?: string;

  @ApiProperty({
    description: 'Mô tả chi tiết về quyền',
    example: 'Cho phép quản lý thông tin người dùng trong hệ thống',
    maxLength: 255,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
