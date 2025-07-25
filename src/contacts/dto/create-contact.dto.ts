import { IsString, IsOptional, IsPhoneNumber, IsEmail, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  contact_fullname: string;

  @IsOptional()
  @IsString()
  contact_dni?: string;

  @IsOptional()
  @IsEmail()
  contact_email?: string;
}
