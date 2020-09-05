import { Request, Response, Router } from "express";
const router = Router();
import { getCustomRepository } from "typeorm";
import { PoolController } from "../controllers/PoolController";
import { Tparams } from "../models/types";
import { Pool } from "../entity/Poll";
import { IPool } from "../models/interfaces";

router.post("/Pool", async (req: Request, res: Response) => {
  const pro: IPool = req.body;
  const resp = await getCustomRepository(PoolController).createPool(pro);
  if (resp instanceof Pool) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.put("/Pool/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const iNum = Number(id);
  const pro: IPool = req.body;
  const resp = await getCustomRepository(PoolController).updatePool(pro, iNum);
  if (resp instanceof Pool) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.delete("/Pool/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const resp = await getCustomRepository(PoolController).deletePool(idNum);
  if (resp instanceof Pool) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.get("/Pool", async (req: Request, res: Response) => {
  const { question, inscription, ...params } = req.query;
  const opt = {
    question: Number(question),
    inscription: Number(inscription),
  } as { question?: number; inscription?: number };
  const resp = await getCustomRepository(PoolController).searcPool(params, opt);
  if (resp instanceof Array) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

export default router;
