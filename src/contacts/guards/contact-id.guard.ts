import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, catchError, throwError } from 'rxjs';
import Redis from 'ioredis';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class ContactIdGuard implements CanActivate {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const contactId = request.params.id_contact;
    const accountId = request.params.id_account;

    if (!contactId || !accountId) {
      throw new UnauthorizedException('Faltan parámetros: id_account o id_contact');
    }

    const redisKey = `contact:${accountId}:${contactId}`;

    // ✅ Verificar en Redis
    const cached = await this.redis.get(redisKey);
    if (cached) {
      const contact = JSON.parse(cached);
      if (contact?.id_account === accountId) return true;
    }

    // ✅ Consultar microservicio de contactos
    try {
      const contact = await firstValueFrom(
        this.client.send('contactFindOne', { id_account: accountId, id: contactId }).pipe(
          catchError((err) => throwError(() => new RpcException(err))),
        ),
      );

      if (!contact) {
        throw new NotFoundException('Contacto no encontrado');
      }

      if (contact.id_account !== accountId) {
        throw new UnauthorizedException('El contacto no pertenece a la cuenta');
      }

      // ✅ Guardar en caché
      await this.redis.set(redisKey, JSON.stringify(contact));

      return true;
    } catch (error) {
      throw new RpcException(error.message || 'Error validando contacto');
    }
  }
}
