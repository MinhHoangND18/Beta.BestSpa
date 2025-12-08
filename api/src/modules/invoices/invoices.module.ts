import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';
import { ProductsModule } from '../products/products.module';
import { ServicesModule } from '../services/services.module';
import { InvoiceItemsModule } from '../invoice_items/invoice_items.module';
import { Product } from '../products/entities/products.entity';
import { InvoiceItem } from '../invoice_items/entities/invoice_item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, Product, InvoiceItem]),
    ProductsModule,
    ServicesModule,
    InvoiceItemsModule,
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
