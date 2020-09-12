import {
  EntityRepository,
  AbstractRepository,
  Like,
  getManager,
} from "typeorm";
import { Pool } from "../entity/Poll";
import { IPool, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
import { Question } from "../entity/Question";
import { Inscription } from "../entity/Inscription";
import { type } from "os";
import { verifyPropertys } from "../helpers/helpers";
@EntityRepository(Pool)
export class PoolController extends AbstractRepository<Pool> {
  async createPool(pool: IPool): Promise<Pool | IError> {
    try {
      if (
        typeof pool.idQuestion == "undefined" ||
        typeof pool.isInscription == "undefined"
      )
        return { message: "not found inscription or question" } as IError;

      const question = await getManager().findOne(Question, pool.idQuestion);
      const inscription = await getManager().findOne(
        Inscription,
        pool.isInscription
      );
      if (!question || !inscription) {
        return { message: "not found inscription or question" } as IError;
      }
      const po = this.repository.create(pool);
      po.inscription = inscription;
      po.question = question;
      return await this.repository.save(po);
    } catch (error) {
      return Promise.reject({
        message: "error bd",
        metadata: error.message,
      } as IError);
    }
  }
  ///delete Pool
  async deletePool(id: number): Promise<Pool | IError> {
    const pro = await this.repository.findOne({ id });
    if (pro) {
      try {
        const res = await this.repository.delete(id);
        return res.affected ? pro : ({ message: "error bd" } as IError);
      } catch (error) {
        return { message: "error bd", metadata: error.message } as IError;
      }
    }
    return { message: "Pool not exists" } as IError;
  }
  //update Pool
  async updatePool(pro: IPool, id: number): Promise<Pool | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return { message: "not foun Pool" } as IError;
    try {
      const res = await this.repository.update(id, proValidate);

      return proValidate;
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  //list Pool && get Pool
  async searcPool(
    params: Tparams,
    opt: { question?: number; inscription?: number }
  ): Promise<Pool[] | IError> {
    if (params.id) return this.repository.find({ id: params.id });
    try {
      if (params.name) params.name = Like(`${params.name}%`);
      opt = verifyPropertys(opt);
      if (Object.keys(opt).length > 0) {
        return await this.repository.find({
          select: ["id", "inscription", "response"],
          where: [{ ...opt }],
          ...params,
        });
      }
      return await this.repository.find({ ...params });
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
}
