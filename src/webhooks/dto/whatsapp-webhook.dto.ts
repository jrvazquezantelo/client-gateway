import { IsString, IsArray, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class WhatsAppWebhookDTO {
  @IsString()
  object: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntryDTO)
  entry: EntryDTO[];
}

class EntryDTO {
  @IsString()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChangeDTO)
  changes: ChangeDTO[];
}

class ChangeDTO {
  @IsObject()
  value: {
    messaging_product: string;
    metadata: {
      display_phone_number: string;
      phone_number_id: string;
    };
    contacts: ContactDTO[];
    messages: MessageDTO[];
  };

  @IsString()
  field: string;
}

class ContactDTO {
  @IsObject()
  profile: {
    name: string;
  };
  wa_id: string;
}

class MessageDTO {
  @IsString()
  from: string;

  @IsString()
  id: string;

  @IsString()
  timestamp: string;

  @IsObject()
  text: {
    body: string;
  };

  @IsString()
  type: string;
}
