// src/messages/dto/create-message.dto.ts
import { IsString, IsIn, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  body: string;

  @IsIn(['sent', 'received'])
  status_message: 'sent' | 'received';

  @IsIn(['text', 'document', 'audio', 'video', 'sticker', 'image', 'template'])
  type_message: string;

  @IsString()
  wamid: string;

  @IsIn(['contact', 'agent'])
  sender_type: 'contact' | 'agent';

  @IsOptional()
  @IsString()
  externalid?: string;
}
