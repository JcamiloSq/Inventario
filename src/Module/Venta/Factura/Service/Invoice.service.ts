import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';
import { FileService } from './file.service';

@Injectable()
export class InvoiceService {
  constructor(
    private mailService: MailService,
    private fileService: FileService,
  ) {}

  async sendInvoice(id: number) {
    const email = 'pruebacorreosfactura@gmail.com';
    const fileBuffer = await this.fileService.sendDataFactura(id);
    const attachments = [{ filename: 'factura.csv', content: fileBuffer }];
    await this.mailService.sendMail(
      email,
      'Factura genereada',
      'Factura de venta realizada, se adjunta doucmento con su informacion',
      attachments,
    );
  }
}
