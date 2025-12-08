import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Customer } from '../../customers/entities/customers.entity';
import { Staff } from '../../staff/entities/staff.entity';

export enum CareType {
  CALL = 'call',
  SMS = 'sms',
  EMAIL = 'email',
  ZALO = 'zalo',
  VISIT = 'visit',
}

@Entity('customer_care_history')
@Index(['customerId'])
@Index(['nextCareDate'])
export class CustomerCareHistory {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  customerId: number;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'bigint', nullable: true })
  staffId: number;

  @ManyToOne(() => Staff, { nullable: true })
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @Column({
    type: 'enum',
    enum: CareType,
    nullable: false,
  })
  careType: CareType;

  @Column({ type: 'text', nullable: true })
  review: string;

  @Column({ type: 'date', nullable: true })
  nextCareDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}