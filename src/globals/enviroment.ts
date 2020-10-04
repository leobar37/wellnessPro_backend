export const PORT_SERVER: number = Number(process.env.PORT) || 5000;
export const SECRET: string =
  process.env.SECRET || "wellnesprosecretpassworbackendleobar";

export const EXPIRESTOKEN: string = process.env.EXPIRESTOKEN || "2h";
export const SALTPASSWORD: number = Number(process.env.SALTPASSWORD) || 10;
export const CLIENTIDPAYPAL =
  "Ad9LKTak4sIpx0n8c-sYxbKbGklVKVT-K7htPY6ePqjjBslCeujkytIgWD4634YespisyWS5Lm4Vqnqv";
export const CLIENTSECRETPAYPAL =
  "EGffBosul4FW3t0Q-hlXySCt8qPUiIzzh-nqHDFzi7Z9dcsAS1TMLEPvXmcscpcbYX6eCKCc4PJLCqlu";

export const HostFrotend = "lo";

export const EMAILPRINCIPAL = {
  email: "wellnesspro.contacto@gmail.com",
  password: "UYkiUlCT6SAN",
};
let host = "https://www.wellnessproapi.com";
// let host = "http://localhost:5000";
let env = process.argv[2] || "dev";
// switch (env) {
//   case "dev":
//     // Setup development config
//     host = "http://localhost:5000";
//     break;
//   case "prod":
//     // Setup production config
//     break;
// }
export const HOST = host;
