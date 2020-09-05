import { EntityRepository, AbstractRepository, Like } from "typeorm";
import { Product } from "../entity/Product";
import { IProduct, IError } from "../models/interfaces";
import { Tparams } from "../models/types";
@EntityRepository(Product)
export class ProductController extends AbstractRepository<Product> {
  async createProduct(product: IProduct): Promise<Product | IError> {
    try {
      const prod = this.repository.create(product);
      return await this.repository.save(prod);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  ///delete product
  async deleteProduct(id: number): Promise<Product | IError> {
    const pro = await this.repository.findOne({ id });
    if (pro) {
      try {
        const res = await this.repository.delete(id);
        return res.affected ? pro : ({ message: "error bd" } as IError);
      } catch (error) {
        return { message: "error bd", metadata: error.message } as IError;
      }
    }
    return { message: "product not exists" } as IError;
  }
  //update product
  async updateProduct(pro: IProduct, id: number): Promise<Product | IError> {
    pro.id = id;
    const proValidate = await this.repository.findOne({ id });
    if (proValidate) this.repository.merge(proValidate, pro);
    else return { message: "not foun product" } as IError;
    try {
      const res = await this.repository.update(id, proValidate);

      return proValidate;
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
  //list product && get product
  async searchProduc(params: Tparams): Promise<Product[] | IError> {
    if (params.id) return this.repository.find({ id: params.id });
    try {
      if (params.name) params.name = Like(`${params.name}%`);
      return this.repository.find(params);
    } catch (error) {
      return { message: "error bd", metadata: error.message } as IError;
    }
  }
}
