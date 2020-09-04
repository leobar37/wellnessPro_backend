import { EntityRepository, AbstractRepository } from "typeorm";
import { User } from "../entity/User";
import { IError, Iuser } from "../models/interfaces";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async createUser(use: Iuser) {
    const user = this.repository.create(use);
    try {
      return await this.repository.save(user);
    } catch (error) {
      console.log(error.message);
      return null;
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

      console.log(res);
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

  async getUsers(data: paramsGet): Promise<User | User[]> {
    if (data.id) {
      const user = await this.repository.findOne({ id: data.id });
      return user || [];
    } else {
      return this.repository.find({});
    }
  }
}

type paramsGet = {
  id?: string;
  limit?: number;
  skip?: number;
};
