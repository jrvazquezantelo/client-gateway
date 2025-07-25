import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Inject,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccountIdGuard } from 'src/accounts/guards/account-id.guard';
import { NATS_SERVICE } from 'src/config';
import { CreateMessageDto } from './dto/create-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { ContactIdGuard } from 'src/contacts/guards/contact-id.guard';

@Controller('accounts/:id_account/messages')
export class MessagesController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  // ✅ Obtener todos los mensajes de un contacto
  @Get('contact/:id_contact')
  @UseGuards(AuthGuard, AccountIdGuard, ContactIdGuard)
  findByContact(
    @Param('id_account') id_account: string,
    @Param('id_contact') id_contact: string,
  ) {
    return this.client
      .send('message.findByContact', { id_account, id_contact })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // ✅ Obtener todas las conversaciones con mensajes sin leer
  @Get('unread')
  @UseGuards(AuthGuard, AccountIdGuard)
  findUnreadConversations(@Param('id_account') id_account: string) {
    return this.client
      .send('message.findUnreadConversations', id_account)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // ✅ Guardar mensaje saliente (enviado desde sistema)
  @Post('send/:id_contact')
  @UseGuards(AuthGuard, AccountIdGuard, ContactIdGuard)
  sendMessage(
    @Param('id_account') id_account: string,
    @Param('id_contact') id_contact: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.client
      .send('message.send', { ...dto, id_account, id_contact })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post('create/:id_contact')
  @UseGuards(AuthGuard, AccountIdGuard, ContactIdGuard)
  createMessage(
    @Param('id_account') id_account: string,
    @Param('id_contact') id_contact: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.client
      .send('message.create', { ...dto, id_account, id_contact })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // ✅ Actualizar mensaje (como leido)
  @Patch('read/:id_contact')
  @UseGuards(AuthGuard, AccountIdGuard, ContactIdGuard)
  markAsRead(
    @Param('id_account') id_account: string,
    @Param('id_contact') id_contact: string,
  ) {
    return this.client
      .send('message.markAsRead', { id_account, id_contact })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

}
