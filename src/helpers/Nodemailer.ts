import nodemailer, {
  createTransport,
  SendMailOptions,
  TransportOptions,
} from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { reject } from "underscore";
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
  static async emailSend(template: any, email: string, subject: string) {
    return new Promise((resolve, reject) => {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "usatloqueando@gmail.com",
          pass: "182alfk3458",
        },
      } as TransportOptions);
      let mailOptions = {
        from: "leonardito3458@gmail.com",
        to: email,
        subject: subject,
        html: template,
      } as SendMailOptions;
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          return reject(err);
        }
        resolve(info);
      });
    });
  }
}

export type TransPorterType = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};
