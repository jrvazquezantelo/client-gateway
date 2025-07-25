import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  contact_fullname?: string;

  @IsOptional()
  @IsString()
  contact_dni?: string;

  @IsOptional()
  @IsString()
  contact_email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;
}
