export interface IError {
  ok: false;
  message: string;
  metadata?: string;
}

export interface Iuser {
  id?: string;
  user?: string;
  name: string;
  lastName: string;
  direccion?: string;
  phone?: string;
  dni?: string;
  email: string;
  pasword?: string;
  inscriptions?: [];
}
