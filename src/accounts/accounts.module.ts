import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisProvider } from 'src/common/providers/redis.provider';

@Module({
  controllers: [AccountsController],
  exports: [RedisProvider],
  imports: [NatsModule, AuthModule],
  providers: [RedisProvider],
})
export class AccountsModule {}
