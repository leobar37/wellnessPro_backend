/*
 elimina las propiedad  undefined de un objeto evitando de que se presenten 
 en el objeto
 author :  yo
*/
export const verifyPropertys = (obj: any) => {
  for (let iterator of Object.entries(obj)) {
    if (typeof iterator[1] == "undefined" || isNaN(Number(iterator[1]))) {
      delete obj[iterator[0]];
    }
  }
  console.log(obj);

  return obj;
};
