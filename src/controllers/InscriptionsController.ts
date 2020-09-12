import {
  EntityRepository,
  AbstractRepository,
  Like,
  getManager,
  ManyToOne,
} from "typeorm";
import { Inscription } from "../entity/Inscription";
import { IInscription, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
import { ManageCodes } from "../helpers/ManageCodes";

@EntityRepository(Inscription)
export class InscriptionController extends AbstractRepository<Inscription> {
  async createInscription(
    inscription: IInscription
  ): Promise<Inscription | IError> {
    try {
      let inscr = this.repository.create(inscription);
      return await this.repository.save(inscr);
    } catch (error) {
      return ManageCodes.searchErrors(error.code);
    }
  }
  ///delete Inscription
  async deleteInscription(id: number): Promise<Inscription | IError> {
    const pro = await this.repository.findOne({ id });
    if (pro) {
      try {
        const res = await this.repository.delete(id);
        return pro;
      } catch (error) {
        return ManageCodes.searchErrors(error.code);
      }
    }
    return ManageCodes.searchErrors(33);
  }
  //update Inscription
  async updateInscription(
    pro: IInscription,
    id: number
  ): Promise<Inscription | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return ManageCodes.searchErrors(33);
    try {
      const res = await this.repository.update(id, proValidate);
      return proValidate;
    } catch (error) {
      return ManageCodes.searchErrors(error.code);
    }
  }
  //list Inscription && get Inscription
  async searchInscrition(params: Tparams): Promise<Inscription[] | IError> {
    if (params.id) return this.repository.find({ id: params.id });
    try {
      return this.repository.find({ ...params });
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
}
