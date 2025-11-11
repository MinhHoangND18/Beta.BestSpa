// src/users/dto/user-response.dto.ts
import { UserRole } from '../entities/users.entity';

export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  staffId: number;
  storeId: number;
  lastLogin: Date;
  loginAttempts: number;
  isLocked: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}