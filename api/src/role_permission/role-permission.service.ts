import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { AssignPermissionDto, AssignMultiplePermissionsDto } from './dto/assign-permission';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async assignPermission(dto: AssignPermissionDto): Promise<RolePermission> {
    // Kiểm tra permission tồn tại
    const permission = await this.permissionRepository.findOne({
      where: { id: dto.permissionId }
    });

    if (!permission) {
      throw new NotFoundException(`Permission với ID ${dto.permissionId} không tồn tại`);
    }

    // Kiểm tra đã gán chưa
    const existing = await this.rolePermissionRepository.findOne({
      where: { 
        role: dto.role,
        permissionId: dto.permissionId
      }
    });

    if (existing) {
      throw new ConflictException(`Role ${dto.role} đã có permission này rồi`);
    }

    const rolePermission = this.rolePermissionRepository.create({
      role: dto.role,
      permissionId: dto.permissionId
    });

    return await this.rolePermissionRepository.save(rolePermission);
  }

  async assignMultiplePermissions(dto: AssignMultiplePermissionsDto): Promise<RolePermission[]> {
    // Kiểm tra tất cả permissions tồn tại
    const permissions = await this.permissionRepository.find({
      where: { id: In(dto.permissionIds) }
    });

    if (permissions.length !== dto.permissionIds.length) {
      throw new BadRequestException('Một số permission ID không tồn tại');
    }

    // Lấy các permissions đã được gán
    const existingAssignments = await this.rolePermissionRepository.find({
      where: { 
        role: dto.role,
        permissionId: In(dto.permissionIds)
      }
    });

    const existingPermissionIds = existingAssignments.map(a => a.permissionId);
    const newPermissionIds = dto.permissionIds.filter(id => !existingPermissionIds.includes(id));

    if (newPermissionIds.length === 0) {
      throw new ConflictException('Tất cả permissions đã được gán cho role này rồi');
    }

    // Tạo các assignments mới
    const rolePermissions = newPermissionIds.map(permissionId => 
      this.rolePermissionRepository.create({
        role: dto.role,
        permissionId
      })
    );

    return await this.rolePermissionRepository.save(rolePermissions);
  }

  async getPermissionsByRole(role: string): Promise<RolePermission[]> {
    return await this.rolePermissionRepository.find({
      where: { role },
      relations: ['permission'],
      order: { created_at: 'DESC' }
    });
  }

  async getAllRoles(): Promise<string[]> {
    const result = await this.rolePermissionRepository
      .createQueryBuilder('rp')
      .select('DISTINCT rp.role', 'role')
      .getRawMany();

    return result.map(r => r.role);
  }

  async getRolesByPermission(permissionId: number): Promise<string[]> {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: { permissionId },
      select: ['role']
    });

    return [...new Set(rolePermissions.map(rp => rp.role))];
  }

  async removePermission(role: string, permissionId: number): Promise<void> {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { role, permissionId }
    });

    if (!rolePermission) {
      throw new NotFoundException(`Không tìm thấy permission này cho role ${role}`);
    }

    await this.rolePermissionRepository.remove(rolePermission);
  }

  async removeAllPermissionsFromRole(role: string): Promise<void> {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: { role }
    });

    if (rolePermissions.length === 0) {
      throw new NotFoundException(`Role ${role} không có permissions nào`);
    }

    await this.rolePermissionRepository.remove(rolePermissions);
  }

  async hasPermission(role: string, permissionCode: string): Promise<boolean> {
    const count = await this.rolePermissionRepository
      .createQueryBuilder('rp')
      .innerJoin('rp.permission', 'p')
      .where('rp.role = :role', { role })
      .andWhere('p.code = :code', { code: permissionCode })
      .getCount();

    return count > 0;
  }

  async syncPermissions(role: string, permissionIds: number[]): Promise<RolePermission[]> {
    // Xóa tất cả permissions hiện tại của role
    await this.rolePermissionRepository.delete({ role });

    // Kiểm tra tất cả permissions tồn tại
    const permissions = await this.permissionRepository.find({
      where: { id: In(permissionIds) }
    });

    if (permissions.length !== permissionIds.length) {
      throw new BadRequestException('Một số permission ID không tồn tại');
    }

    // Tạo mới
    const rolePermissions = permissionIds.map(permissionId => 
      this.rolePermissionRepository.create({
        role,
        permissionId
      })
    );

    return await this.rolePermissionRepository.save(rolePermissions);
  }
}