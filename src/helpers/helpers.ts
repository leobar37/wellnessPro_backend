/*
 elimina las propiedad  undefined de un objeto evitando de que se presenten 
 en el objeto
 author :  yo
*/
import { readFile } from "fs";
export const verifyPropertys = (obj: any) => {
  for (let iterator of Object.entries(obj)) {
    if (iterator[1] instanceof Number) {
      if (isNaN(Number(iterator[1]))) {
        delete obj[iterator[0]];
      }
    }
    if (!iterator[1]) {
      delete obj[iterator[0]];
    }
    if (typeof iterator[1] == "undefined" || iterator[1] == null) {
      delete obj[iterator[0]];
    }
  }

  return obj;
};

export const readHtml = (
  path: string,
  callback: (err: any, html: any) => void
) => {
  readFile(path, { encoding: "utf-8" }, (err, html) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, html);
    }
  });
};
