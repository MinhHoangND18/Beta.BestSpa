import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('role_permissions')
@Index(['role', 'permissionId'], { unique: true })
export class RolePermission {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  role: string;

  @Column({ name: 'permission_id', type: 'bigint', nullable: false })
  permissionId: number;

  @ManyToOne(() => Permission, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}