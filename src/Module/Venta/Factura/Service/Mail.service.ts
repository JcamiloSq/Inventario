import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pruebacorreosfactura@gmail.com',
        pass: 'p b u c w w a d o c r t r u w m',
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    attachments: any[],
  ) {
    const mailOptions = {
      from: 'pruebacorreosfactura@gmail.com',
      to: to,
      subject: subject,
      text: text,
      attachments: attachments,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
