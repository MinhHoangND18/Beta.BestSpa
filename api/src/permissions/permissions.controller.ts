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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo quyền mới' })
  @ApiResponse({ status: 201, description: 'Tạo quyền thành công' })
  @ApiResponse({ status: 409, description: 'Tên hoặc mã quyền đã tồn tại' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách quyền' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Tìm kiếm theo tên' })
  @ApiQuery({ name: 'module', required: false, type: String, description: 'Lọc theo module' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('module') module?: string,
  ) {
    return this.permissionsService.findAll(
      parseInt(page),
      parseInt(limit),
      search,
      module,
    );
  }

  @Get('modules')
  @ApiOperation({ summary: 'Lấy danh sách các module' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách module thành công' })
  getModules() {
    return this.permissionsService.getModules();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết quyền theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.findOne(id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Lấy chi tiết quyền theo mã code' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền' })
  findByCode(@Param('code') code: string) {
    return this.permissionsService.findByCode(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật quyền' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền' })
  @ApiResponse({ status: 409, description: 'Tên hoặc mã quyền đã tồn tại' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa quyền' })
  @ApiResponse({ status: 204, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.remove(id);
  }
}
