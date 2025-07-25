import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactPaginationDto } from './dto/contact-pagination.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccountIdGuard } from 'src/accounts/guards/account-id.guard';

@Controller('accounts/:id_account/contacts')
export class ContactsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard, AccountIdGuard)
  create(@Param('id_account') id_account: string, @Body() dto: CreateContactDto) {
    return this.client.send('contactCreate', { ...dto, id_account }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard, AccountIdGuard)
  findAll(
    @Param('id_account') id_account: string,
    @Query() paginationDto: ContactPaginationDto,
  ) {
    return this.client
      .send('contactFindAll', { id_account, ...paginationDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  @UseGuards(AuthGuard, AccountIdGuard)
  findOne(@Param('id_account') id_account: string, @Param('id') id: string) {
    return this.client.send('contactFindOne', { id_account, id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AccountIdGuard)
  delete(@Param('id_account') id_account: string, @Param('id') id: string) {
    return this.client.send('contactDelete', { id_account, id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AccountIdGuard)
  patch(
    @Param('id_account') id_account: string,
    @Param('id') id: string,
    @Body() dto: UpdateContactDto,
  ) {
    return this.client
      .send('contactUpdate', { id_account, id, dto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
