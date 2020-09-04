"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroment_1 = require("../globals/enviroment");
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("../routes/index");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket = __importStar(require("../sockets/socket"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = enviroment_1.PORT_SERVER;
        this.confiExpres();
        this.serveHttp = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.serveHttp);
        this.escucharSockets();
    }
    static get instance() { return this._instance || (this._instance = new Server()); }
    confiExpres() {
        //middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        //rutas
        this.app.use(index_1.router);
    }
    escucharSockets() {
        this.io.on('connection', cliente => {
            //conectar client
            socket.conectarCliente(cliente);
            //flujo de mensajes
            //desconeccion de los sockets
            socket.desconectar(cliente);
        });
    }
    start(resolve) {
        this.serveHttp.listen(this.port, resolve);
    }
}
exports.default = Server;
