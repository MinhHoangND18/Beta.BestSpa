import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete,
  HttpCode,
  HttpStatus,
  Put
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RolePermissionsService } from './role-permission.service';
import { AssignPermissionDto, AssignMultiplePermissionsDto } from './dto/assign-permission';

@ApiTags('Role Permissions')
@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Gán một permission cho role' })
  @ApiResponse({ status: 201, description: 'Gán permission thành công' })
  @ApiResponse({ status: 404, description: 'Permission không tồn tại' })
  @ApiResponse({ status: 409, description: 'Permission đã được gán cho role này' })
  assignPermission(@Body() dto: AssignPermissionDto) {
    return this.rolePermissionsService.assignPermission(dto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Gán nhiều permissions cho role cùng lúc' })
  @ApiResponse({ status: 201, description: 'Gán permissions thành công' })
  @ApiResponse({ status: 400, description: 'Một số permission ID không tồn tại' })
  assignMultiplePermissions(@Body() dto: AssignMultiplePermissionsDto) {
    return this.rolePermissionsService.assignMultiplePermissions(dto);
  }

  @Put('sync/:role')
  @ApiOperation({ summary: 'Đồng bộ permissions cho role (xóa cũ, tạo mới)' })
  @ApiParam({ name: 'role', example: 'ADMIN' })
  @ApiResponse({ status: 200, description: 'Đồng bộ thành công' })
  syncPermissions(
    @Param('role') role: string,
    @Body() dto: { permissionIds: number[] }
  ) {
    return this.rolePermissionsService.syncPermissions(role, dto.permissionIds);
  }

  @Get('roles')
  @ApiOperation({ summary: 'Lấy danh sách tất cả roles' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách roles thành công' })
  getAllRoles() {
    return this.rolePermissionsService.getAllRoles();
  }

  @Get('role/:role')
  @ApiOperation({ summary: 'Lấy danh sách permissions của một role' })
  @ApiParam({ name: 'role', example: 'ADMIN' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getPermissionsByRole(@Param('role') role: string) {
    return this.rolePermissionsService.getPermissionsByRole(role);
  }

  @Get('permission/:permissionId/roles')
  @ApiOperation({ summary: 'Lấy danh sách roles có một permission cụ thể' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getRolesByPermission(@Param('permissionId') permissionId: number) {
    return this.rolePermissionsService.getRolesByPermission(permissionId);
  }

  @Get('check/:role/:permissionCode')
  @ApiOperation({ summary: 'Kiểm tra role có permission không' })
  @ApiParam({ name: 'role', example: 'ADMIN' })
  @ApiParam({ name: 'permissionCode', example: 'USER_MANAGE' })
  @ApiResponse({ status: 200, description: 'Kết quả kiểm tra' })
  async hasPermission(
    @Param('role') role: string,
    @Param('permissionCode') permissionCode: string
  ) {
    const hasPermission = await this.rolePermissionsService.hasPermission(role, permissionCode);
    return { hasPermission };
  }

  @Delete(':role/:permissionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Gỡ một permission khỏi role' })
  @ApiParam({ name: 'role', example: 'ADMIN' })
  @ApiParam({ name: 'permissionId', example: 1 })
  @ApiResponse({ status: 204, description: 'Gỡ permission thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  removePermission(
    @Param('role') role: string,
    @Param('permissionId') permissionId: number
  ) {
    return this.rolePermissionsService.removePermission(role, permissionId);
  }

  @Delete('role/:role')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Gỡ tất cả permissions khỏi role' })
  @ApiParam({ name: 'role', example: 'ADMIN' })
  @ApiResponse({ status: 204, description: 'Gỡ tất cả permissions thành công' })
  @ApiResponse({ status: 404, description: 'Role không có permissions' })
  removeAllPermissionsFromRole(@Param('role') role: string) {
    return this.rolePermissionsService.removeAllPermissionsFromRole(role);
  }
}