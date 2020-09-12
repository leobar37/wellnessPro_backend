export interface Icode {
  code?: number;
  message?: string;
  codeRes?: number;
  type?: string;
}

enum types {
  inscrtiption = "INSCRIPTION",
  general = "GENERAL",
}
export const codes: Icode[] = [
  {
    code: 23505,
    message: "este registro ya existe",
    codeRes: 5,
  },
  {
    code: 31,
    message: "El registro que esta buscando no existe",
  },
  {
    code: 30,
    message: "ya tiene una suscripción en curso",
  },
  {
    code: 32,
    message: "EL usuario no existe",
  },
  {
    code: 33,
    message: "La inscripcion no existe",
    type: types.inscrtiption,
  },
  {
    code: 34,
    message: "no existe un desafio en curso",
    type: types.inscrtiption,
  },
  {
    code: 35,
    message: "datos obligatorios incompletos",
    type: types.general,
  },
];
