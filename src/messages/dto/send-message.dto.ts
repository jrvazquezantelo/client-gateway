import { IsOptional, IsString } from 'class-validator';

export class SendMessageDto {

  @IsString()
  type_message: string;
  
  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  title_file?: string;
}
