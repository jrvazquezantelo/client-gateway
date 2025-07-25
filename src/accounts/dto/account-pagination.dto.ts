
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class AccountPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  phone_number_id?: string;

  @IsOptional()
  @IsString()
  account_key?: string;

  @IsOptional()
  @IsString()
  api_version?: string;
}
