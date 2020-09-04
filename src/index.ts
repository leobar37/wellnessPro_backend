import "reflect-metadata";
import Server from "./classes/server";
import { createConnection } from "typeorm";
createConnection().then((data) => {
  // console.log(data);
  const server = Server.instance;
  server.start(async () => {
    console.log("listen on port: " + server.port);
  });
});
