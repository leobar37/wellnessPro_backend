import {
  EntityRepository,
  AbstractRepository,
  Like,
  getManager,
} from "typeorm";
import { Question } from "../entity/Question";
import { IQuestion, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
import { Form } from "../entity/Form";
@EntityRepository(Question)
export class QuestionController extends AbstractRepository<Question> {
  async createQuestion(question: IQuestion): Promise<Question | IError> {
    try {
      if (typeof question.idForm == "undefined")
        return { message: "form not foun" } as IError;
      const form = await getManager().findOne(Form, { id: question.idForm });
      if (!form) return { message: "form not foun" } as IError;
      const prod = this.repository.create(question);
      prod.form = form;
      return await this.repository.save(prod);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  ///delete Question
  async deleteQuestion(id: number): Promise<Question | IError> {
    const pro = await this.repository.findOne({ id });
    if (pro) {
      try {
        const res = await this.repository.delete(id);
        return res.affected ? pro : ({ message: "error bd" } as IError);
      } catch (error) {
        return { message: "error bd", metadata: error.message } as IError;
      }
    }
    return { message: "Question not exists" } as IError;
  }
  //update Question
  async updateQuestion(pro: IQuestion, id: number): Promise<Question | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return { message: "not foun Question" } as IError;
    try {
      const res = await this.repository.update(id, proValidate);

      return proValidate;
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  //list Question && get Question
  async searchQuestion(
    params: Tparams,
    idForm: number
  ): Promise<Question[] | IError> {
  
    try {
      if (params.id) return this.repository.find({ id: params.id });
      if (params.name) params.name = Like(`${params.name}%`);
      return this.repository.find({ where: [{ form: idForm }], ...params });
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
}
