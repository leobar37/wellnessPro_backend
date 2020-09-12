import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { SettingController } from "../controllers/SettingController";
const app = Router();

app.get("/setting", async (req, res) => {
  const { key } = req.query;
  if (typeof key != "undefined") {
    const resp = await getCustomRepository(SettingController).searchSetting(
      key
    );
    return res.status(200).json(resp);
  } else {
    const resp = await getCustomRepository(SettingController).allSettings();
    return res.status(200).json(resp);
  }
});

app.post("/setting", async (req, res) => {
  const setting: { key: string; value: string } = req.body;
  try {
    const rp = await getCustomRepository(SettingController).createSetting(
      setting
    );
    res.status(200).json({ ok: true, resp: rp });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

export default app;
