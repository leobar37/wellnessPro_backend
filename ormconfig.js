const fs = require("fs");
module.exports = {
  name: "default",
  type: "postgres",
  host: "bdwellnesspro-do-user-8083783-0.b.db.ondigitalocean.com",
  port: 25060,
  username: "doadmin",
  password: "t2wjk0zl36egrmg4",
  database: "defaultdb",
  ssl: {
    ca: fs.readFileSync("./ca-certificate.crt").toString(),
  },
  synchronize: true,
  logging: false,
  entities: ["dist/entity/**/*.js", "dist/controllers/**/*.js"],
};
