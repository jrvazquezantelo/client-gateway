import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards( AuthGuard )
  @Get('verify')
  verifyToken( @User() user: CurrentUser, @Token() token: string  ) {
    return { user, token }
  }
}