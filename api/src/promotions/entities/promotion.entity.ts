import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DiscountType {
  PERCENT = 'percent',
  AMOUNT = 'amount',
}

export enum ApplicableTo {
  ALL = 'all',
  SERVICES = 'services',
  PRODUCTS = 'products',
  PACKAGES = 'packages',
}

export enum PromotionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
}

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
  })
  discount_type: DiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discount_value: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  min_purchase?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  max_discount?: number;

  @Column({ type: 'int', nullable: true })
  usage_limit?: number;

  @Column({ type: 'int', default: 0 })
  usage_count: number;

  @Column({
    type: 'enum',
    enum: ApplicableTo,
    default: ApplicableTo.ALL,
  })
  applicable_to: ApplicableTo;

  @Column({ type: 'date', nullable: true })
  start_date?: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  @Column({
    type: 'enum',
    enum: PromotionStatus,
    default: PromotionStatus.ACTIVE,
  })
  status: PromotionStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
