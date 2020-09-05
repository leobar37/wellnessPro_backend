import { Request, Response, Router } from "express";
const router = Router();
import { getCustomRepository } from "typeorm";
import { FormController } from "../controllers/FormController";
import { Tparams } from "../models/types";
import { Form } from "../entity/Form";
import { IForm } from "../models/interfaces";
router.post("/form", async (req: Request, res: Response) => {
  const pro: IForm = req.body;
  const resp = await getCustomRepository(FormController).createForm(pro);
  if (resp instanceof Form) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.put("/Form/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const pro: IForm = req.body;
  const resp = await getCustomRepository(FormController).updateForm(pro, idNum);
  if (resp instanceof Form) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.delete("/form/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const resp = await getCustomRepository(FormController).deleteForm(idNum);
  if (resp instanceof Form) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.get("/form", async (req: Request, res: Response) => {
  const params: Tparams = req.query;
  const resp = await getCustomRepository(FormController).searchForm(params);
  if (resp instanceof Array) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

export default router;
