export class MessageTypeBuilder {
  static build(dto: any) {
    switch (dto.type_message) {
      case 'text':
        return this.text(dto);
      case 'image':
        return this.image(dto);
      case 'audio':
        return this.audio(dto);
      case 'video':
        return this.video(dto);
      case 'document':
        return this.document(dto);
      case 'sticker':
        return this.sticker(dto);
      case 'template':
        return this.template(dto);
      default:
        return this.text(dto);
    }
  }

  static text(body: any) {
    return {
      messaging_product: 'whatsapp',
      to: body.phone_number,
      text: { body: body.body },
    };
  }

  static document(body: any) {
    return {
      messaging_product: 'whatsapp',
      to: body.phone_number,
      type: 'document',
      document: {
        link: process.env.PUBLIC_LAMBDA_FILE + body.body,
        filename: body.title_file,
      },
    };
  }

  static image(body: any) {
    return {
      messaging_product: 'whatsapp',
      to: body.phone_number,
      type: 'image',
      image: {
        link: process.env.PUBLIC_LAMBDA_FILE + body.body,
      },
    };
  }

  static audio(body: any) {
    return {
      messaging_product: 'whatsapp',
      to: body.phone_number,
      type: 'audio',
      audio: {
        link: process.env.PUBLIC_LAMBDA_FILE + body.body,
      },
    };
  }

  static video(body: any) {
    return {
      messaging_product: 'whatsapp',
      to: body.phone_number,
      type: 'video',
      video: {
        link: process.env.PUBLIC_LAMBDA_FILE + body.body,
        caption: body.title_file,
      },
    };
  }

  static sticker(body: any) {
    return {
      messaging_product: 'whatsapp',
      to: body.phone_number,
      type: 'sticker',
      sticker: {
        link: process.env.PUBLIC_LAMBDA_FILE + body.body,
      },
    };
  }

  static template(body: any) {
    return {
      messaging_product: 'whatsapp',
      to: body.phone_number,
      type: 'template',
      template: {
        name: body.body,
        language: { code: 'en_US' },
      },
    };
  }
}
