import { codes } from "../globals/codes";
export class ManageCodes {
  static searchError(code: number) {
    const res = codes.find((dat) => dat.code);
    return res
      ? { code: res.codeRes, message: res.message }
      : { code: 80, message: "uknown error" };
  }
}
