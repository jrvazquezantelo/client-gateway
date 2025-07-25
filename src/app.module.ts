import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { NatsModule } from './transports/nats.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    AccountsModule,
    NatsModule,
    ContactsModule,
    AuthModule,
    MessagesModule,
    WebhooksModule,
  ],
})
export class AppModule {}
