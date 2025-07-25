import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccountPaginationDto } from './dto/account-pagination.dto';

@Controller('accounts')
export class AccountsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateAccountDto) {
    return this.client.send('accountCreate', dto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() paginationDto: AccountPaginationDto) {
    return this.client.send('accountFindAll', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.client.send('accountFindOne', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.client.send('accountDelete', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
    return this.client.send('accountUpdate', { id, dto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
