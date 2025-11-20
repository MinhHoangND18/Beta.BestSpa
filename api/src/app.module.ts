import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role_permission/role-permission.module';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { StaffModule } from './staff/staff.module';
import { CustomersModule } from './customers/customers.module';
import { CustomerCareHistoryModule } from './customer_care_history/customer_care_history.module';
import { ServiceCategoriesModule } from './service_categories/service_categories.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './booking/bookings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceItemsModule } from './invoice_items/invoice_items.module';
import { PaymentsModule } from './payments/payments.module';
import { PromotionsModule } from './promotions/promotions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'spa',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', 
      logging: process.env.NODE_ENV !== 'production',
    }),
    
    PermissionsModule,
    RolePermissionsModule,
    UsersModule,
    StoresModule,
    StaffModule,
    CustomersModule,
    CustomerCareHistoryModule,
    ServiceCategoriesModule,
    ServicesModule,
    BookingsModule,
    InvoicesModule,
    InvoiceItemsModule,
    PaymentsModule,
    PromotionsModule,
  ],
})
export class AppModule {}
