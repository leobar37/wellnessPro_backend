import Server from "./classes/server";

const server = Server.instance;

server.start(async () => {
  console.log("listen on port: " + server.port);
});
