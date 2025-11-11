import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerCareHistoryService } from './customer_care_history.service';
import { CustomerCareHistoryController } from './customer_care_history.controller';
import { CustomerCareHistory } from './entities/customer_care_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerCareHistory])],
  controllers: [CustomerCareHistoryController],
  providers: [CustomerCareHistoryService],
  exports: [CustomerCareHistoryService],
})
export class CustomerCareHistoryModule {}