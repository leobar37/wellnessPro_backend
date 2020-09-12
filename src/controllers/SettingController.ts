import { Entity, AbstractRepository } from "typeorm";

import { EntityRepository } from "typeorm";
import { Setting } from "../entity/Setting";
import { IError } from "../models/interfaces";
import { verifyPropertys } from "../helpers/helpers";

@EntityRepository(Setting)
export class SettingController extends AbstractRepository<Setting> {
  async createSetting(setting: {
    key: string;
    value: string;
  }): Promise<boolean | IError> {
    const sett = await this.repository.findOne({ key: setting.key });
    if (typeof sett == "undefined") {
      const s = this.repository.create(setting);
      await this.repository.save(s);
      return true;
    } else {

      return Promise.reject({
        message: "esta configuracion ya existe",
      } as IError);
    }
  }
  async searchSetting(key: string) {
    return await this.repository.findOne({ key });
  }
  async allSettings() {
    return await this.repository.find();
  }
}
