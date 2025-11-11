import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto, QueryPaymentDto, ConfirmPaymentDto, RefundPaymentDto } from './dto/payments.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Payment code already exists' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Return all payments' })
  findAll(@Query() query: QueryPaymentDto = {}) {
    return this.paymentsService.findAll(query);
  }

  @Get('code/:paymentCode')
  @ApiOperation({ summary: 'Get a payment by payment code' })
  @ApiResponse({ status: 200, description: 'Return the payment' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  findByPaymentCode(@Param('paymentCode') paymentCode: string) {
    return this.paymentsService.findByPaymentCode(paymentCode);
  }

  @Get('invoice/:invoiceId')
  @ApiOperation({ summary: 'Get all payments by invoice ID' })
  @ApiResponse({ status: 200, description: 'Return payments' })
  findByInvoiceId(@Param('invoiceId', ParseIntPipe) invoiceId: number) {
    return this.paymentsService.findByInvoiceId(invoiceId);
  }

  @Get('invoice/:invoiceId/total')
  @ApiOperation({ summary: 'Get total paid amount for an invoice' })
  @ApiResponse({ status: 200, description: 'Return total amount' })
  getTotalByInvoice(@Param('invoiceId', ParseIntPipe) invoiceId: number) {
    return this.paymentsService.getTotalByInvoice(invoiceId);
  }

  @Get('report')
  @ApiOperation({ summary: 'Get payment report by method and date range' })
  @ApiQuery({ name: 'startDate', example: '2025-10-01' })
  @ApiQuery({ name: 'endDate', example: '2025-10-31' })
  @ApiResponse({ status: 200, description: 'Return payment report' })
  getPaymentReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.paymentsService.getPaymentReport(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by id' })
  @ApiResponse({ status: 200, description: 'Return the payment' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiResponse({ status: 200, description: 'Payment updated successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @ApiResponse({ status: 409, description: 'Payment code already exists' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiResponse({ status: 204, description: 'Payment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.remove(id);
  }

  @Patch(':id/confirm')
  @ApiOperation({ summary: 'Confirm a payment' })
  @ApiResponse({ status: 200, description: 'Payment confirmed successfully' })
  @ApiResponse({ status: 400, description: 'Payment cannot be confirmed' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  confirmPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() confirmPaymentDto: ConfirmPaymentDto,
  ) {
    return this.paymentsService.confirmPayment(id, confirmPaymentDto);
  }

  @Patch(':id/refund')
  @ApiOperation({ summary: 'Refund a payment' })
  @ApiResponse({ status: 200, description: 'Payment refunded successfully' })
  @ApiResponse({ status: 400, description: 'Payment cannot be refunded' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  refundPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() refundPaymentDto: RefundPaymentDto,
  ) {
    return this.paymentsService.refundPayment(id, refundPaymentDto);
  }

  @Patch(':id/fail')
  @ApiOperation({ summary: 'Mark payment as failed' })
  @ApiResponse({ status: 200, description: 'Payment marked as failed' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  markAsFailed(
    @Param('id', ParseIntPipe) id: number,
    @Body('reason') reason: string,
  ) {
    return this.paymentsService.markAsFailed(id, reason);
  }
}