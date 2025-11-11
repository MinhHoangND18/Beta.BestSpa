// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { 
  IsString, 
  IsEmail, 
  IsEnum, 
  IsOptional, 
  IsBoolean, 
  IsNumber,
  MinLength,
  MaxLength 
} from 'class-validator';
import { UserRole } from '../entities/users.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isLocked?: boolean;

  @IsNumber()
  @IsOptional()
  loginAttempts?: number;

  @IsOptional()
  lastLogin?: Date;
}