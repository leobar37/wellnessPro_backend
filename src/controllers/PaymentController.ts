import { EntityRepository, AbstractRepository, Like } from "typeorm";
import { Payment } from "../entity/Payment";
import { IPayment, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
@EntityRepository(Payment)
export class PaymentController extends AbstractRepository<Payment> {
  async createPayment(Payment: IPayment): Promise<Payment | IError> {
    try {
      const prod = this.repository.create(Payment);
      return await this.repository.save(prod);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  ///delete Payment
  async deletePayment(id: string): Promise<Payment | IError> {
    const pro = await this.repository.findOne({ id });
    if (pro) {
      try {
        const res = await this.repository.delete(id);
        return res.affected ? pro : ({ message: "error bd" } as IError);
      } catch (error) {
        return { message: "error bd", metadata: error.message } as IError;
      }
    }
    return { message: "Payment not exists" } as IError;
  }
  //update Payment
  async updatePayment(pro: IPayment, id: string): Promise<Payment | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return { message: "not foun Payment" } as IError;
    try {
      const res = await this.repository.update(id, proValidate);

      return proValidate;
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  //list Payment && get Payment
  async searchPayment(params: Tparams): Promise<Payment[] | IError> {
    if (params.id) return this.repository.find({ id: params.id });
    try {
      if (params.name) params.name = Like(`${params.name}%`);
      return this.repository.find(params);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
}
