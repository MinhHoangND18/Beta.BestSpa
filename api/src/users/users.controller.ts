import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UserRole } from './entities/users.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('role') role?: UserRole,
    @Query('isActive') isActive?: boolean
  ) {
    return this.usersService.findAll(page, limit, search, role, isActive);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
@Get('username/:username')
async findByUsername(@Param('username') username: string): Promise<User | null> {
  return this.usersService.findByUsername(username);
}

@Get('email/:email')
async findByEmail(@Param('email') email: string): Promise<User | null> {
  return this.usersService.findByEmail(email);
}

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.update(id, { isActive: false });
  }

  @Patch(':id/reset-password')
  async resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('newPassword') newPassword: string
  ): Promise<{ message: string }> {
    await this.usersService.resetPassword(id, newPassword);
    return { message: 'Password reset successfully' };
  }

  @Patch(':id/unlock')
  unlockAccount(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.update(id, { 
      isLocked: false, 
      loginAttempts: 0 
    });
  }
}