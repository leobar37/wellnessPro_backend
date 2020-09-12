import { EntityRepository, AbstractRepository, getManager } from "typeorm";
import { DetailInscription } from "../entity/DetailInscription";
import { IDetailInscription, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
import { ManageCodes } from "../helpers/ManageCodes";
import { User } from "../entity/User";
import { Setting } from "../entity/Setting";
import { Inscription } from "../entity/Inscription";
@EntityRepository(DetailInscription)
export class DetailInscriptionController extends AbstractRepository<
  DetailInscription
> {
  async createDetailInscription(
    detailInscription: IDetailInscription
  ): Promise<DetailInscription | IError> {
    try {
      if (typeof detailInscription.idUser == "undefined")
        return ManageCodes.searchErrors(32);
      // buscar el usuario y buscar si este no tiene una suscripcion
      const use = await getManager().findOne(User, detailInscription.idUser);
      // usuario listo ahora busca si no tiene una inscricion en curso
      // el usuario no puede estar una inscripcion
      if (!use) return ManageCodes.searchErrors(31);
      const existDetailInscription = await this.haveDetailInscriptions(use?.id);
      if (existDetailInscription) return ManageCodes.searchErrors(30);
      let inscr = this.repository.create(detailInscription);
      inscr.user = use;
      return await this.repository.save(inscr);
    } catch (error) {
      return ManageCodes.searchErrors(error.code || -1);
    }
  }
  /**
   *
   * @param type :  tipo de la inscripcion
   */
  async consultInscription(opt: {
    typeinscription?: string;
    idUser: string;
  }): Promise<IError | DetailInscription> {
    /**
     * buscar la inscripcion en curso
     * crea un detalle de inscripcion
     * con el participante
     * pero pendiente a pago
     */
    opt.typeinscription = opt.typeinscription || "DESAFIO";

    try {
      const idInscription = await this.manager
        .createQueryBuilder()
        .from(Setting, "setting")
        .where("setting.key = :key", { key: opt.typeinscription })
        .getOne();
      const ins = await this.manager.findOne(Inscription, idInscription);
      if (typeof ins == "undefined") {
        return Promise.reject(ManageCodes.searchErrors(34));
      }
      // id de la inscripcion en curso
      const detailInscription = await this.createDetailInscription({
        idUser: opt.idUser,
        inscription: ins,
        status: false,
      });
      if (detailInscription instanceof DetailInscription) {
        delete detailInscription?.user;
        return detailInscription;
      }
    } catch (error) {
      Promise.reject(error.code);
    }
    return ManageCodes.searchErrors(-1);
  }
  async haveDetailInscriptions(idUser: string): Promise<boolean> {
    /* hasta aqui se ha hecho un select a users
        y se le ha renombrado con user
      */
    try {
      const query = await this.manager
        .createQueryBuilder()
        .from(User, "user")
        .select("user.id")
        .addSelect("ins.id")
        .innerJoin("user.detailInscriptions", "ins")
        .where(
          (qb) => {
            return "user.id = :id and ins.status = :valid";
          },
          { id: idUser, valid: true }
        )
        .getCount();
      return query > 0 ? true : false;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  ///delete DetailInscription
  async deleteDetailInscription(
    id: number
  ): Promise<DetailInscription | IError> {
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
  //update DetailInscription
  async updateDetailInscription(
    pro: IDetailInscription,
    id: number
  ): Promise<DetailInscription | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return { message: "not foun DetailInscription" } as IError;
    try {
      const res = await this.repository.update(id, proValidate);
      return proValidate;
    } catch (error) {
      return ManageCodes.searchErrors(error.code);
    }
  }
  //list DetailInscription && get DetailInscription
  async searchDetailInscription(
    params: Tparams,
    opt: { user: string }
  ): Promise<DetailInscription[] | IError> {
    if (params.id) return this.repository.find({ id: params.id });
    try {
      if (typeof opt.user != "undefined")
        return this.repository.find({ where: [opt], ...params });
      return this.repository.find({ ...params });
    } catch (error) {
      return ManageCodes.searchErrors(error.code);
    }
  }
}
