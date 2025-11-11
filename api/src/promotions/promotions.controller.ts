import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PromotionsService } from './promotions.service';
import {
  CreatePromotionDto,
  UpdatePromotionDto,
  QueryPromotionDto,
  ValidatePromotionDto,
  ApplyPromotionDto,
  BulkUpdateStatusDto,
} from './dto/promotions.dto';

@ApiTags('Promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo khuyến mãi mới' })
  create(@Body() dto: CreatePromotionDto) {
    return this.promotionsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách khuyến mãi (có phân trang, lọc, tìm kiếm)' })
  findAll(@Query() query: QueryPromotionDto) {
    return this.promotionsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết khuyến mãi' })
  findOne(@Param('id') id: number) {
    return this.promotionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật khuyến mãi' })
  update(@Param('id') id: number, @Body() dto: UpdatePromotionDto) {
    return this.promotionsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa khuyến mãi' })
  remove(@Param('id') id: number) {
    return this.promotionsService.remove(id);
  }

  @Post('bulk-update-status')
  @ApiOperation({ summary: 'Cập nhật trạng thái hàng loạt' })
  bulkUpdateStatus(@Body() dto: BulkUpdateStatusDto) {
    return this.promotionsService.bulkUpdateStatus(dto);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Kiểm tra và tính toán voucher' })
  validate(@Body() dto: ValidatePromotionDto) {
    return this.promotionsService.validateVoucher(dto);
  }

  @Post('apply')
  @ApiOperation({ summary: 'Áp dụng voucher (tăng usage_count)' })
  apply(@Body() dto: ApplyPromotionDto) {
    return this.promotionsService.applyVoucher(dto);
  }

  @Get('statistics/summary')
  @ApiOperation({ summary: 'Thống kê khuyến mãi' })
  statistics() {
    return this.promotionsService.getStatistics();
  }
}
