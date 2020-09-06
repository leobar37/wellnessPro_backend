import { Request, Response, NextFunction, json } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../globals/enviroment";
export const isTokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("access-token");
  if (token) {
    try {
      const decode: any = jwt.verify(token, SECRET);
      if (decode.idAdmin == true) {
        next();
      } else {
        res.status(400).json({ ok: false, message: "not is admin" });
      }
    } catch (error) {
      res.status(400).json({ ok: false, message: "invalid toke" });
    }
  }
};

export const tokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("access-token");
  if (token) {
    try {
      const decode = jwt.verify(token, SECRET);
      console.log(decode);
      next();
    } catch (error) {
      res.status(400).json({ ok: false, message: error.message });
    }
    res.status(400).json({ ok: false, message: "invalid token" });
  }
};
