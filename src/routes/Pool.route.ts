import { Request, Response, Router } from "express";
const router = Router();
import { getCustomRepository } from "typeorm";
import { PoolController } from "../controllers/PoolController";
import { Tparams } from "../models/types";
import { Pool } from "../entity/Poll";
import { IPool } from "../models/interfaces";
import { verifyPropertys } from "../helpers/helpers";

router.post("/Pool", async (req: Request, res: Response) => {
  const pros: IPool[] = req.body;
  let results = [];
  if (pros) {
    try {
      for (const pro of pros) {
        const resp = await getCustomRepository(PoolController).createPool(pro);
        //pool convertida en interface
        if (resp instanceof Pool) {
          const t = verifyPropertys(Object.assign({} as IPool, resp));
          results.push(t);
        }
      }
      return res.status(200).json({ ok: true, resp: results });
    } catch (error) {
      return res.status(400).json(error);
    }
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

router.get("/pool", async (req: Request, res: Response) => {
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
