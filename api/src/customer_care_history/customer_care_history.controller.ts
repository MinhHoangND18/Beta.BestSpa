import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CustomerCareHistoryService } from './customer_care_history.service';
import {
  CreateCustomerCareHistoryDto,
  UpdateCustomerCareHistoryDto,
  QueryCustomerCareHistoryDto,
  CustomerCareStatisticsDto,
} from './dto/customer_care_history.dto';

@ApiTags('customer-care-history')
@Controller('customer-care-history')
export class CustomerCareHistoryController {
  constructor(
    private readonly careHistoryService: CustomerCareHistoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Tạo lịch sử chăm sóc khách hàng mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Lịch sử chăm sóc được tạo thành công',
  })
  create(@Body() createDto: CreateCustomerCareHistoryDto) {
    return this.careHistoryService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách lịch sử chăm sóc với phân trang và lọc',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách lịch sử chăm sóc được trả về thành công',
  })
  findAll(@Query() queryDto: QueryCustomerCareHistoryDto) {
    return this.careHistoryService.findAll(queryDto);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Lấy thống kê lịch sử chăm sóc khách hàng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thống kê lịch sử chăm sóc',
  })
  getStatistics(@Query() statsDto: CustomerCareStatisticsDto) {
    return this.careHistoryService.getStatistics(statsDto);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Lấy danh sách lịch chăm sóc sắp tới' })
  @ApiQuery({
    name: 'days',
    required: false,
    type: Number,
    description: 'Số ngày tới (mặc định: 7 ngày)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách lịch chăm sóc sắp tới',
  })
  findUpcomingCares(@Query('days') days?: number) {
    return this.careHistoryService.findUpcomingCares(days || 7);
  }

  @Get('overdue')
  @ApiOperation({ summary: 'Lấy danh sách lịch chăm sóc quá hạn' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách lịch chăm sóc quá hạn',
  })
  findOverdueCares() {
    return this.careHistoryService.findOverdueCares();
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Lấy lịch sử chăm sóc của một khách hàng' })
  @ApiParam({ name: 'customerId', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lịch sử chăm sóc của khách hàng',
  })
  findByCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.careHistoryService.findByCustomer(customerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết lịch sử chăm sóc theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tìm thấy lịch sử chăm sóc',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy lịch sử chăm sóc',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.careHistoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật lịch sử chăm sóc' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cập nhật lịch sử chăm sóc thành công',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy lịch sử chăm sóc',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCustomerCareHistoryDto,
  ) {
    return this.careHistoryService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa lịch sử chăm sóc' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Xóa lịch sử chăm sóc thành công',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy lịch sử chăm sóc',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.careHistoryService.remove(id);
  }
}