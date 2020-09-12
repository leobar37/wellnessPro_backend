import { codes } from "../globals/codes";
import { IError } from "../models/interfaces";
export class ManageCodes {
  static searchError(code: number) {
    const res = codes.find((dat) => dat.code == code);
    return res
      ? { code: res.codeRes, message: res.message }
      : {
          code: 80,
          message:
            "Error desconocido, vuelva intantarlo o comuniquese con nosotros",
        };
  }
  static searchErrors(code: number): IError {
    const res = codes.find((dat) => dat.code == code);
    return res
      ? ({ message: res.message, code: res.code } as IError)
      : ({ code: 80, message: "uknown error" } as IError);
  }
}
