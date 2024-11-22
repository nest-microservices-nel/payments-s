import { Inject, Injectable, Logger } from '@nestjs/common';
import { envs, NATS_SERVICE } from '../config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto';
import { Request, Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecret);
  private readonly logger = new Logger('Payment-ms-service');

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          orderId: paymentSessionDto.orderId,
        },
      },

      line_items: paymentSessionDto.items.map((item) => {
        return {
          price_data: {
            currency: paymentSessionDto.currency,
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      }),

      mode: 'payment',
      success_url: envs.stripeSuccessUrl,
      cancel_url: envs.stripeCancelUrl,
    });

    return {
      url: session.url,
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
    };
  }

  async paymentWebhook(req: Request, res: Response) {
    const signature = req.headers['stripe-signature'];
    const endpointSecret = envs.stripeSingingWebhook;
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object;

        const payload = {
          stripePaymentId: chargeSucceeded.id,
          orderId: chargeSucceeded.metadata.orderId,
          receiptUrl: chargeSucceeded.receipt_url,
        };

        this.logger.log({ payload });

        this.client.emit('payment.succeeded', payload);

        break;

      default:
        break;
    }
    return req.headers['stripe-signature'];
  }
}
