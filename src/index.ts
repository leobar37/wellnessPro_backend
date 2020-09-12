import "reflect-metadata";
import Server from "./classes/server";
import { createConnection, getCustomRepository, getManager } from "typeorm";
import { InscriptionController } from "./controllers/InscriptionsController";
createConnection().then((data) => {
  const server = Server.instance;
  server.start(async () => {
    console.log("listen on port: " + server.port);
  });
  // getCustomRepository(InscriptionController).haveInscriptions(
  //   "acae05fc-1814-45b8-91b6-0b28230fd72e"
  // );
});
