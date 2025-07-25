import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [WebhooksController],
  providers: [],
  imports: [NatsModule]
})
export class WebhooksModule {}
