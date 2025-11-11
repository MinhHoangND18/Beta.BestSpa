import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    // Kiểm tra name hoặc code đã tồn tại
    const existingPermission = await this.permissionRepository.findOne({
      where: [
        { name: createPermissionDto.name },
        { code: createPermissionDto.code },
      ],
    });

    if (existingPermission) {
      if (existingPermission.name === createPermissionDto.name) {
        throw new ConflictException('Tên quyền đã tồn tại');
      }
      if (existingPermission.code === createPermissionDto.code) {
        throw new ConflictException('Mã quyền đã tồn tại');
      }
    }

    const permission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async findAll(page: number = 1, limit: number = 10, search?: string, module?: string): Promise<{ data: Permission[], total: number, page: number, limit: number }> {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.name = Like(`%${search}%`);
    }

    if (module) {
      where.module = module;
    }

    const [data, total] = await this.permissionRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { created_at: 'DESC' }
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id }
    });

    if (!permission) {
      throw new NotFoundException(`Không tìm thấy quyền với ID ${id}`);
    }

    return permission;
  }

  async findByCode(code: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { code }
    });

    if (!permission) {
      throw new NotFoundException(`Không tìm thấy quyền với mã ${code}`);
    }

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);

    // Kiểm tra name hoặc code mới có bị trùng không
    if (updatePermissionDto.name || updatePermissionDto.code) {
      const existingPermission = await this.permissionRepository.findOne({
        where: [
          { name: updatePermissionDto.name },
          { code: updatePermissionDto.code }
        ]
      });

      if (existingPermission && existingPermission.id !== id) {
        if (existingPermission.name === updatePermissionDto.name) {
          throw new ConflictException('Tên quyền đã tồn tại');
        }
        if (existingPermission.code === updatePermissionDto.code) {
          throw new ConflictException('Mã quyền đã tồn tại');
        }
      }
    }

    Object.assign(permission, updatePermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);
  }

  async getModules(): Promise<string[]> {
    const result = await this.permissionRepository
      .createQueryBuilder('permission')
      .select('DISTINCT permission.module', 'module')
      .where('permission.module IS NOT NULL')
      .getRawMany();

    return result.map(r => r.module);
  }
}
