import { Socket, Server } from "socket.io";
import { EventEmitter } from "events";
// export const conectarCliente = (cliente: Socket) => {};
// export const desconectar = (cliente: Socket) => {
//   cliente.on("disconnect", () => {});
// };

export class handleSocket {
  static event: EventEmitter = new EventEmitter();
}
