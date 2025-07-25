import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { RedisProvider } from 'src/common/providers/redis.provider';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [MessagesController],
  exports: [RedisProvider],
  imports: [NatsModule, MessagesModule],
  providers: [RedisProvider],
})
export class MessagesModule {}
