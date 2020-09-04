import "reflect-metadata";
import Server from "./classes/server";
import { createConnection } from "typeorm";
const server = Server.instance;

server.start(async () => {
  await createConnection();
  console.log("listen on port: " + server.port);
});
