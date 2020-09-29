// import "reflect-metadata";
// import Server from "./classes/server";
// import { createConnection, getCustomRepository, getManager } from "typeorm";
// import { InscriptionController } from "./controllers/InscriptionsController";
// createConnection().then((data) => {
//   const server = Server.instance;
//   server.start(async () => {
//     console.log("listen on port: " + server.port);
//   });
// });
import { template } from "./globals/testemplate";
import nodemailer, { TransportOptions, SendMailOptions } from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "usatloqueando@gmail.com",
    pass: "182alfk3458",
  },
} as TransportOptions);

let mailOptions = {
  from: "leonardito3458@gmail.com",
  to: "usatloqueando@gmail.com",
  subject: "hello world",
  html: template,
} as SendMailOptions;

transport.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  }
  console.log(info);
});
