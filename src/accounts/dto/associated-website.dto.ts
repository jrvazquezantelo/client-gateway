import { IsString, IsEmail, IsUrl } from 'class-validator';

export class AssociatedWebsiteDto {
  @IsString()
  @IsUrl()
  domain: string;

  @IsString()
  platform: string;

  @IsString()
  @IsEmail()
  contact_email: string;
}
