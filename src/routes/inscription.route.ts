import { Request, Response, Router } from "express";
const router = Router();
import { getCustomRepository } from "typeorm";
import { InscriptionController } from "../controllers/InscriptionsController";
import { Inscription } from "../entity/Inscription";
import { IInscription } from "../models/interfaces";
import { isTokenValid } from "../middlewares/isAhutenticate";
// router.use(isTokenValid);
router.post(
  "/inscription",
  [isTokenValid],
  async (req: Request, res: Response) => {
    const pro: IInscription = req.body;
    console.log(pro);

    const resp = await getCustomRepository(
      InscriptionController
    ).createInscription(pro);
    if (resp instanceof Inscription) {
      return res.status(200).json({ ok: true, resp });
    } else {
      return res.status(500).json(resp);
    }
  }
);

router.put(
  "/inscription/:id",
  [isTokenValid],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNum = Number(id);
    const pro: IInscription = req.body;
    const resp = await getCustomRepository(
      InscriptionController
    ).updateInscription(pro, idNum);
    if (resp instanceof Inscription) {
      return res.status(200).json({ ok: true, resp });
    } else {
      return res.status(500).json(resp);
    }
  }
);

router.delete(
  "/inscription/:id",
  [isTokenValid],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNum = Number(id);
    const resp = await getCustomRepository(
      InscriptionController
    ).deleteInscription(idNum);
    if (resp instanceof Inscription) {
      return res.status(200).json({ ok: true, resp });
    } else {
      return res.status(500).json(resp);
    }
  }
);
router.get(
  "/inscription",
  [isTokenValid],
  async (req: Request, res: Response) => {
    const { user, ...params } = req.query;
    const resp = await getCustomRepository(
      InscriptionController
    ).searchInscrition(params, { user });
    if (resp instanceof Array) {
      return res.status(200).json({ ok: true, resp });
    } else {
      return res.status(500).json(resp);
    }
  }
);

export default router;
