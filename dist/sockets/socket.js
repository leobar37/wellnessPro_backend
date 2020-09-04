"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectarCliente = (cliente) => {
};
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
    });
};
