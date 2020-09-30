import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { readFile, writeFile } from "fs";
import { Nodemailer } from "../helpers/Nodemailer";

const readHtml = (path: string, callback: (err: any, html: any) => void) => {
  readFile(path, { encoding: "utf-8" }, (err, html) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, html);
    }
  });
};
export const sendEmailWithTemplate = (data: {
  template: string;
  email: string;
  subject: string;
  data: any;
}) => {
  readHtml(
    __dirname + `../../../public/emails/${data.template}.hbs`,
    (err, html) => {
      const template = handlebars.compile(html);
      let htmlsend = template(data.data);
      /// * send email
      Nodemailer.emailSend(htmlsend, data.email, data.subject)
        .then((res) => {
          console.log(res);
          console.log(res);

          return res;
        })
        .catch((err) => {
          console.log(err);

          return err;
        });
    }
  );
};
