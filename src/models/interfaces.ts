export interface IError {
  ok: false;
  code?: number;
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
  isUser?: boolean;
  password?: string;
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
  create?: Date;
  expiration?: Date;
  amount?: number;
  description?: string;
  valid?: boolean;
  user: Iuser;
  paymentS: [];
  pools: [];
  idUser?: string;
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
