import { EntityRepository, AbstractRepository, Like } from "typeorm";
import { Form } from "../entity/Form";
import { IForm, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
import { response } from "express";
@EntityRepository(Form)
export class FormController extends AbstractRepository<Form> {
  async createForm(form: IForm): Promise<Form | IError> {
    try {
      const prod = this.repository.create(form);
      return await this.repository.save(prod);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  ///delete Form
  async deleteForm(id: number): Promise<Form | IError> {
    const pro = await this.repository.findOne({ id });
    if (pro) {
      try {
        const res = await this.repository.delete(id);
        return res.affected ? pro : ({ message: "error bd" } as IError);
      } catch (error) {
        return { message: "error bd", metadata: error.message } as IError;
      }
    }
    return { message: "Form not exists" } as IError;
  }
  //update Form
  async updateForm(pro: IForm, id: number): Promise<Form | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return { message: "not foun Form" } as IError;
    try {
      const res = await this.repository.update(id, proValidate);

      return proValidate;
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  //list Form && get Form
  async searchForm(params: Tparams): Promise<Form[] | IError> {
    if (params.id) return this.repository.find({ id: params.id });
    try {
      if (params.name) params.name = Like(`${params.name}%`);
      const res = await this.repository.find(params);
      return res;
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
}
