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

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsNumber()
  @IsOptional()
  staffId?: number;

  @IsNumber()
  @IsOptional()
  storeId?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}