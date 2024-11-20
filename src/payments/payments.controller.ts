import { Body, Controller, Get, Post, All } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { createPaymentSessionDto } from './dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('session/create')
  createPaymentSession(@Body() createPaymentSession: createPaymentSessionDto) {
    return createPaymentSession;
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
  paymentWeebhook() {
    return {
      ok: false,
      message: 'Payment cancel',
    };
  }
}
