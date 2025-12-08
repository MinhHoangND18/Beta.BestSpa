import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
// import { Staff } from '../../staff/entities/staff.entity';
// import { Store } from '../../stores/entities/store.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  STORE_ADMIN = 'store_admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  RECEPTIONIST = 'receptionist'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ 
    type: 'varchar', 
    length: 50, 
    unique: true,
    nullable: false 
  })
  username: string;

  @Column({ 
    type: 'varchar', 
    length: 255, 
    nullable: false,
    name: 'password_hash'
  })
  passwordHash: string;

  @Column({ 
    type: 'varchar', 
    length: 100, 
    unique: true 
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF
  })
  role: UserRole;

  @Column({ 
    type: 'bigint', 
    name: 'staff_id',
    nullable: true
  })
  staffId: number;

  @Column({ 
    type: 'bigint', 
    name: 'store_id',
    nullable: true
  })
  storeId: number;

  @Column({ 
    type: 'timestamp', 
    name: 'last_login',
    nullable: true 
  })
  lastLogin: Date;

  @Column({ 
    type: 'int', 
    name: 'login_attempts',
    default: 0 
  })
  loginAttempts: number;

  @Column({ 
    type: 'boolean', 
    name: 'is_locked',
    default: false 
  })
  isLocked: boolean;

  @Column({ 
    type: 'boolean', 
    name: 'is_active',
    default: true 
  })
  isActive: boolean;

  @CreateDateColumn({ 
    type: 'timestamp', 
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({ 
    type: 'timestamp', 
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  // Relations
//   @ManyToOne(() => Staff, (staff) => staff.users)
//   @JoinColumn({ name: 'staff_id' })
//   staff: Staff;

//   @ManyToOne(() => Store, (store) => store.users)
//   @JoinColumn({ name: 'store_id' })
//   store: Store;
}