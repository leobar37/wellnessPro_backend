import {
  EntityRepository,
  AbstractRepository,
  Like,
  getManager,
} from "typeorm";
import { Inscription } from "../entity/Inscription";
import { IInscription, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
import { ManageCodes } from "../helpers/ManageCodes";
import { User } from "../entity/User";
@EntityRepository(Inscription)
export class InscriptionController extends AbstractRepository<Inscription> {
  async createInscription(
    inscription: IInscription
  ): Promise<Inscription | IError> {
    try {
      if (typeof inscription.idUser == "undefined")
        return { message: "user not found" } as IError;
      // buscar el usuario y buscar si este no tiene una suscripcion
      const use = await getManager().findOne(User, inscription.idUser);
      // usuario listo ahora busca si no tiene una inscricion en curso
      // el usuario no puede estar una inscrip
      if (!use) return ManageCodes.searchErrors(31);

      const existInscription = await this.haveInscriptions(use?.id);
      if (existInscription) return ManageCodes.searchErrors(30);
      let inscr = this.repository.create(inscription);
      inscr.user = use;
      return await this.repository.save(inscr);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  async haveInscriptions(idUser: string): Promise<boolean> {
    /* hasta aqui se ha hecho un select a users
      y se le ha renombrado con user
    */
    try {
      const query = await this.manager
        .createQueryBuilder()
        .from(User, "user")
        .select("user.id")
        .addSelect("ins.id")
        .innerJoin("user.Inscriptions", "ins")
        .where(
          (qb) => {
            return "user.id = :id and ins.valid = :valid";
          },
          { id: idUser, valid: true }
        )
        .getCount();
      return query > 0 ? true : false;
    } catch (error) {
      return Promise.reject(error);
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
