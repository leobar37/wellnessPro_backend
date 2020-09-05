import { FindOperator } from "typeorm";

export type Tparams = {
  take?: number;
  skip?: number;
  name?: string | FindOperator<any>;
  id?: any;
};
