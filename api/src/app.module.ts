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
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') !== 'production',
      }),
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
