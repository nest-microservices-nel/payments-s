import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [PaymentsModule, TestModule],
})
export class AppModule {}
