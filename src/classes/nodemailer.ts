import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { readFile, writeFile } from "fs";
import { Nodemailer } from "../helpers/Nodemailer";
import { readHtml } from "../helpers/helpers";
import { join, resolve } from "path";
export const sendEmailWithTemplate = async (data: {
  template: string;
  email: string;
  subject: string;
  data: any;
}) => {
  const path = resolve(
    __dirname + `../../../public/emails/${data.template}.hbs`
  );
  readHtml(path, (err, html) => {
    const template = handlebars.compile(html);
    let htmlsend = template(data.data);
    /// * send email
    Nodemailer.emailSend(htmlsend, data.email, data.subject)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  });
};
