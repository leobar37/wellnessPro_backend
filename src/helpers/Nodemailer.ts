import nodemailer, { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
export class Nodemailer {
  createTransporter(data: TransPorterType): Mail | false {
    try {
      return createTransport(data);
    } catch (error) {
      return false;
    }
  }
  async sendEmail(trans: Mail, opts: MailOptions) {
    try {
      await trans.sendMail(opts);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export type TransPorterType = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};
