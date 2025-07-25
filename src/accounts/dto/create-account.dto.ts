import { IsString, IsIn, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AssociatedWebsiteDto } from './associated-website.dto';

export class CreateAccountDto {
  @IsString()
  phone_number_id: string;

  @IsString()
  account_key: string;

  @IsString()
  api_version: string;

  @IsString()
  token: string;

  @IsString()
  display_phone_number: string;

  @IsIn(['active', 'paused'])
  status: 'active' | 'paused';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssociatedWebsiteDto)
  associated_websites: AssociatedWebsiteDto[];
}
