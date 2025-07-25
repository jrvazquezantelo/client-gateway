// src/common/providers/redis.provider.ts
import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from 'src/config';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: envs.redis.host,
      port: envs.redis.port,
    });
  },
};
