import "reflect-metadata";
import Server from "./classes/server";
import { createConnection, getCustomRepository, getManager } from "typeorm";

createConnection().then((data) => {
  const server = Server.instance;
  server.start(async () => {
    console.log("listen on port: " + server.port);
  });
});
// import { template } from "./globals/testemplate";
// import nodemailer, { TransportOptions, SendMailOptions } from "nodemailer";

// import "./classes/nodemailer";
