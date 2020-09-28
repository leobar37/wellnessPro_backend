import { Router } from "express";
import { JWT } from "../helpers/jwt";
import { Iuser } from "../models/interfaces";
const route = Router();

route.get("/token/:token", (req, res) => {
  const { token } = req.params;

  const obj = JWT.verify(token);
  if (obj) {
    return res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
});

export default route;
