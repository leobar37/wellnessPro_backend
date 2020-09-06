import fs from "fs";
import pa from "path";
export class FileHelper {
  //delete files
  static deleteFile(name: string, path?: string): boolean {
    const ruote = path || "public/uploads";
    try {
      fs.unlinkSync(ruote.concat(`/${name}`));
      return true;
    } catch {
      return false;
    }
  }
  static existFile(name: string, path?: string): boolean | string {
    let ruote = path || "public/uploads";
    try {
      ruote = `${ruote}/${name}`;

      return fs.existsSync(ruote) ? pa.resolve(ruote) : false;
    } catch {
      return false;
    }
  }
  //exists file
}
