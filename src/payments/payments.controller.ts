import { Body, Controller, Get, Post, All, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto';
import { Request, Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('session/create')
  @MessagePattern('payments.session.create')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    console.log(
      '🚀 ~ PaymentsController ~ createPaymentSession ~ paymentSessionDto:',
      paymentSessionDto,
    );
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  paymentSuccess() {
    return {
      ok: true,
      message: 'Payment successfully',
    };
  }

  @Get('cancel')
  paymentCancel() {
    return {
      ok: false,
      message: 'Payment cancel',
    };
  }

  @All('webhook')
  async paymentWeebhook(@Req() req: Request, @Res() res: Response) {
    return await this.paymentsService.paymentWebhook(req, res);
  }
}
