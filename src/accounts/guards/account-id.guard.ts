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
export class AccountIdGuard implements CanActivate {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accountId = request.params.id_account;

    if (!accountId) {
      throw new UnauthorizedException('No se proporcionó account_id');
    }

    const redisKey = `account:exists:${accountId}`;

    // Verificar en caché
    const cached = await this.redis.get(redisKey);
    if (cached === '1') {
      return true;
    }

    // Consultar microservicio
    try {
      const account = await firstValueFrom(
        this.client.send('accountFindOne', { id: accountId }).pipe(
          catchError((err) => throwError(() => new RpcException(err))),
        ),
      );

      if (!account) {
        throw new NotFoundException('Cuenta no encontrada');
      }

      // Guardar en Redis SIN expiración (TTL infinito)
      await this.redis.set(redisKey, '1');

      return true;
    } catch (error) {
      throw new RpcException(error.message || 'Error validando cuenta');
    }
  }
}
