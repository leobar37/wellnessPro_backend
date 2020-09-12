import { EntityRepository, AbstractRepository, Like } from "typeorm";
import { User } from "../entity/User";
import { IError, Iuser } from "../models/interfaces";
import { Tparams } from "../models/types";
import { BycriptHelper } from "../helpers/Bycript.helper";
import { JWT } from "../helpers/jwt";
import { verifyPropertys } from "../helpers/helpers";
import { ManageCodes } from "../helpers/ManageCodes";
@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async createUser(
    use: Iuser
  ): Promise<{ id: string; token: string } | IError> {
    if (typeof use?.password == "string") {
      const resPas = await BycriptHelper.hashPassword(use.password);
      if (typeof resPas === "string") {
        use.password = resPas;
        use.isUser = true;
      }
    }
    try {
      const user = this.repository.create(use);
      const userSave = await this.repository.save(user);
      let us = Object.assign({} as Iuser, userSave);
      if (us.password) {
        delete us.password;
      }
      us = verifyPropertys(us);
      return { id: us.id, token: JWT.getToken(us) } as {
        id: string;
        token: string;
      };
    } catch (error) {
      const rawError = ManageCodes.searchError(error.code);
      return Promise.reject({
        code: rawError.code,
        message: rawError.message,
      } as IError);
    }
  }
  async updateUser(id: string, user: Iuser): Promise<User | IError> {
    user.id = id;
    const userUpdate = await this.repository.findOne({ id });

    if (!userUpdate)
      return { message: "no exists user", metadata: "" } as IError;
    try {
      this.repository.merge(userUpdate, user);
      const res = await this.createQueryBuilder("users")
        .update()
        .set(userUpdate)
        .where("users.id = :id", { id })
        .execute();
    } catch (error) {
      return { message: "bd error", metadata: error.message } as IError;
    }
    return userUpdate;
  }
  async deleteUser(id: string) {
    const deleteUser = await this.repository.findOne({ id });
    try {
      await this.repository.delete(id);
    } catch (error) {
      return { message: "bd error", metadata: error.message } as IError;
    }
    return deleteUser
      ? deleteUser
      : ({ message: "no exists user", metadata: "" } as IError);
  }

  async getUsers(data: Tparams): Promise<User[] | IError> {
    if (data.id) {
      const user = await this.repository.find({ id: data.id });
      return user;
    } else {
      try {
        if (data.name) data.name = Like(`${data.name}%`);
        return this.repository.find(data);
      } catch (error) {
        return { message: "error bd", metadata: error.message } as IError;
      }
    }
  }
}
