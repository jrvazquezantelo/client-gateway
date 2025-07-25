import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisProvider } from 'src/common/providers/redis.provider';

@Module({
  controllers: [ContactsController],
  exports: [RedisProvider],
  imports: [NatsModule, AuthModule],
  providers: [RedisProvider],
})
export class ContactsModule {}
