/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsNumber, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionDto {
  @ApiProperty({ 
    description: 'Tên role',
    example: 'ADMIN',
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  role: string;

  @ApiProperty({ 
    description: 'ID của permission',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  permissionId: number;
}

export class AssignMultiplePermissionsDto {
  @ApiProperty({ 
    description: 'Tên role',
    example: 'ADMIN',
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  role: string;

  @ApiProperty({ 
    description: 'Danh sách ID của permissions',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  permissionIds: number[];
}