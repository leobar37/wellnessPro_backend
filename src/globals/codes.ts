export interface Icode {
  code?: number;
  message?: string;
  codeRes?: number;
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
];
