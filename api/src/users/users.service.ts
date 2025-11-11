// src/users/users.service.ts
import { 
  Injectable, 
  NotFoundException, 
  ConflictException,
  BadRequestException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: createUserDto.username }
    });
    
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const existingEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });
    
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    role?: UserRole,
    isActive?: boolean
  ): Promise<{ users: User[]; total: number }> {
    const options: FindManyOptions<User> = {
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    };

    if (search || role || isActive !== undefined) {
      options.where = {};

      if (search) {
        options.where = [
          { username: Like(`%${search}%`) },
          { email: Like(`%${search}%`) }
        ];
      }

      if (role) {
        options.where = { ...options.where, role };
      }

      if (isActive !== undefined) {
        options.where = { ...options.where, isActive };
      }
    }

    const [users, total] = await this.usersRepository.findAndCount(options);
    return { users, total };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['staff', 'store']
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { username },
      relations: ['staff', 'store']
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { email },
      relations: ['staff', 'store']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findByUsername(updateUserDto.username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
    }
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.findByEmail(updateUserDto.email);
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    }
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto['passwordHash'] = await bcrypt.hash(updateUserDto.password, saltRounds);
      delete updateUserDto.password;
    }

    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async softDelete(id: number): Promise<void> {
    const user = await this.findOne(id);
    user.isActive = false;
    await this.usersRepository.save(user);
  }

  async updateLoginAttempts(id: number, attempts: number): Promise<void> {
    await this.usersRepository.update(id, { 
      loginAttempts: attempts,
      isLocked: attempts >= 5 
    });
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.usersRepository.update(id, { 
      lastLogin: new Date(),
      loginAttempts: 0, 
      isLocked: false 
    });
  }

  async resetPassword(id: number, newPassword: string): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    await this.usersRepository.update(id, { 
      passwordHash: hashedPassword,
      loginAttempts: 0,
      isLocked: false
    });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}