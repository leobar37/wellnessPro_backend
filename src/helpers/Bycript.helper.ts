import bycript, { hashSync } from "bcrypt";
import { SALTPASSWORD } from "../globals/enviroment";

export class BycriptHelper {
  static async hashPassword(planinText: string): Promise<string | false> {
    try {
      return await bycript.hash(planinText, SALTPASSWORD);
    } catch (error) {
      return false;
    }
  }
  static async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    try {
      return await bycript.compare(password, hashPassword);
    } catch {
      return false;
    }
  }
}
