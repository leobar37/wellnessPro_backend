import { throws } from "assert";
import jwt from "jsonwebtoken";
import { SECRET, EXPIRESTOKEN } from "../globals/enviroment";
import { IError } from "../models/interfaces";
export class JWT {
  static verifyToken<T>(enconde: string): T | IError {
    try {
      const decode = jwt.verify(enconde, SECRET);
      return Object.assign({} as T, decode);
    } catch (error) {
      return { message: "not valid token" } as IError;
    }
  }
  static verify(enconde: string): boolean | IError {
    try {
      const decode = jwt.verify(enconde, SECRET);
      return decode ? true : false;
    } catch (error) {
      return false;
    }
  }
  static getToken(payload: any): string | IError {
    try {
      const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRESTOKEN });

      return token;
    } catch (error) {
      return { message: "error with token" } as IError;
    }
  }
  //refresh token
}
