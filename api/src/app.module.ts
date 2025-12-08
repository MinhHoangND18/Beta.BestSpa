import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { databaseConfig } from './config/database.config';
import { InvoiceItemsModule } from './modules/invoice_items/invoice_items.module';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { StaffModule } from './modules/staff/staff.module';
import { StoresModule } from './modules/stores/stores.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ServicesModule } from './modules/services/services.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { ServiceCategoriesModule } from './modules/service_categories/service_categories.module';
import { ProductsModule } from './modules/products/products.module';
//import { PaymentsModule } from './modules/payments/payments.module';
//import { PromotionsModule } from './modules/promotions/promotions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    PermissionsModule,
    StaffModule,
    StoresModule,
    CustomersModule,
    ServicesModule,
    BookingsModule,
    InvoicesModule,
    InvoiceItemsModule,
    ServiceCategoriesModule,
    ProductsModule,
    //PaymentsModule,
    //PromotionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
