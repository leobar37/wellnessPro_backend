import { DetailInscription } from "../entity/DetailInscription";
import { Inscription } from "../entity/Inscription";
import { Pool } from "../entity/Poll";
import { Requirement } from "../entity/Requiremtent";
import { User } from "../entity/User";

export interface IError {
  ok?: false;
  code?: number;
  message: string;
  metadata?: string;
}

export interface Iuser {
  id?: string;
  user?: string;
  name: string;
  confirm?: boolean;
  lastNaue: string;
  edad?: Date;
  direccion?: string;
  phone?: string;
  dni?: string;
  email: string;
  isUser?: boolean;
  password: string;
  inscriptions?: [];
}

export interface IProduct {
  id?: number;
  name?: string;
  stock?: number;
  priceUnit?: number;
  files?: string;
  pricePayment?: number;
  detailsParment?: [];
}
export interface IInscription {
  id?: number;
  name: string;
  realPrice: number;
  ofertPrice: number;
  create?: Date;
  expiration?: Date;
  amount?: number;
  description?: string;
  detailsInscriptions?: DetailInscription[];
  valid?: boolean;
  pools?: [];
  requeriments?: Requirement[];
}

export interface IPayment {
  id: string;
  amount: number;
  created: Date;
  metadata: string;
  description: string;
  Inscription: IInscription;
  detailsPayment: [];
}

export interface IForm {
  id?: number;
  created?: Date;
  name?: string;
  desciption?: string;
  public?: boolean;
  questions?: [];
}
export interface IPool {
  id?: number;
  response?: string;
  inscription?: IInscription;
  isInscription?: string;
  idQuestion?: number;
}

export interface IQuestion {
  id?: number;
  question?: string;
  options?: string;
  required?: boolean;
  pools?: [];
  form?: IForm;
  idForm?: number;
}
export interface IRequeriment {
  id?: number;
  idProduct?: number;
  type?: string;
  description?: string;
  detailsInscription?: [];
  inscription?: IInscription;
}
export interface IDetailInscription {
  id?: number;
  idInscription?: number;
  idPago?: string;
  status?: boolean;
  metadata?: string;
  user?: User;
  pools?: [];
  idUser?: string;
  inscription?: IInscription;
  requirements?: Array<IRequeriment>;
}
