export const PORT_SERVER: number = Number(process.env.PORT) || 5000;
export const SECRET: string =
  process.env.SECRET || "wellnesprosecretpassworbackendleobar";

export const EXPIRESTOKEN: string = process.env.EXPIRESTOKEN || "2h";
export const SALTPASSWORD: number = Number(process.env.SALTPASSWORD) || 10;
export const CLIENTIDPAYPAL =
  "AUEEc8VanjbcryNbf57htXTtTF49Gg-PfDyd8UM1v3Jfcod7wkD00Rx6_XtMZk7Lf7YF5vVwlinhQ6YA";
export const CLIENTSECRETPAYPAL =
  "ENr68wWDpA4Y2TqmWgVzAXYEk0XI4MR9sb24JP5cYxvL-8tWXN_LXKSXF0Ge3mOTXlv1oidzZOGxlEqh";

export const HostFrotend = "lo";

let host = "https://www.wellnessproapi.com";
let env = process.argv[2] || "dev";
switch (env) {
  case "dev":
    // Setup development config
    host = "http://localhost:5000";
    break;
  case "prod":
    // Setup production config
    break;
}

export const HOST = host;
