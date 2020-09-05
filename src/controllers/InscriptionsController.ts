import {
  EntityRepository,
  AbstractRepository,
  Like,
  getManager,
} from "typeorm";
import { Inscription } from "../entity/Inscription";
import { IInscription, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
import { User } from "../entity/User";
@EntityRepository(Inscription)
export class InscriptionController extends AbstractRepository<Inscription> {
  async createInscription(
    inscription: IInscription
  ): Promise<Inscription | IError> {
    try {
      if (typeof inscription.idUser == "undefined")
        return { message: "user not found" } as IError;
      const use = await getManager().findOne(User, inscription.idUser);
      if (!use) return { message: "user not found" } as IError;
      const ins = this.repository.create(inscription);
      console.log(use);

      ins.user = use;
      return await this.repository.save(ins);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  ///delete Inscription
  async deleteInscription(id: number): Promise<Inscription | IError> {
    const pro = await this.repository.findOne({ id });
    if (pro) {
      try {
        const res = await this.repository.delete(id);
        return res.affected ? pro : ({ message: "error bd" } as IError);
      } catch (error) {
        return { message: "error bd", metadata: error.message } as IError;
      }
    }
    return { message: "Inscription not exists" } as IError;
  }
  //update Inscription
  async updateInscription(
    pro: IInscription,
    id: number
  ): Promise<Inscription | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return { message: "not foun Inscription" } as IError;
    try {
      const res = await this.repository.update(id, proValidate);
      return proValidate;
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  //list Inscription && get Inscription
  async searchInscrition(
    params: Tparams,
    opt: { user: string }
  ): Promise<Inscription[] | IError> {
    if (params.id) return this.repository.find({ id: params.id });
    try {
      if (params.name) params.name = Like(`${params.name}%`);
      if (typeof opt.user != "undefined")
        return this.repository.find({ where: [opt], ...params });
      return this.repository.find({ ...params });
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
}
