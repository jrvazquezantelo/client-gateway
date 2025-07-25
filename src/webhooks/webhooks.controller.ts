import { Controller, Post, Body, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { WhatsAppWebhookDTO } from './dto/whatsapp-webhook.dto';
import { firstValueFrom } from 'rxjs';

@Controller('webhooks')
export class WebhooksController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('whatsapp')
  async create(
    @Body() body: WhatsAppWebhookDTO,
    @Query('hub.challenge') hubChallenge?: string,
  ) {
    const challenge = hubChallenge || '';

    try {
      await firstValueFrom(this.client.send('webhook.whatsapp', body));
    } catch (error) {
      // Silenciar error, pero podrías loguearlo
    }

    return challenge;
  }
}
