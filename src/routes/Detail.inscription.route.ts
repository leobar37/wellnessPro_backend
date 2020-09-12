import { Request, Response, Router } from "express";
const router = Router();
import { getCustomRepository } from "typeorm";
import { DetailInscriptionController } from "../controllers/DetailInscription";
import { DetailInscription } from "../entity/DetailInscription";
import { IDetailInscription } from "../models/interfaces";
import { isTokenValid } from "../middlewares/isAhutenticate";
import { ManageCodes } from "../helpers/ManageCodes";

router.post("/detailnscription", async (req: Request, res: Response) => {
  const pro: IDetailInscription = req.body;
  const resp = await getCustomRepository(
    DetailInscriptionController
  ).createDetailInscription(pro);
  if (resp instanceof DetailInscription) {
    return res.status(200).json({ ok: true, resp: resp });
  } else {
    return res.status(400).json(resp);
  }
});

router.put(
  "/detailInscription/:id",
  [isTokenValid],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNum = Number(id);
    const pro: IDetailInscription = req.body;
    const resp = await getCustomRepository(
      DetailInscriptionController
    ).updateDetailInscription(pro, idNum);
    if (resp instanceof DetailInscription) {
      return res.status(200).json({ ok: true, resp });
    } else {
      return res.status(500).json(resp);
    }
  }
);

/**
 * @param tipo de inscripcion : ?  = determina que tipo de inscripcion desea
 * @param idUser =  obligatorio para crear la inscripcion
 */
router.post("/insconsult", async (req, res) => {
  const { idUser } = req.body;
  if (!idUser) return res.status(400).json(ManageCodes.searchErrors(35));
  const resp = await getCustomRepository(
    DetailInscriptionController
  ).consultInscription({ idUser });
  res.status(200).json({ ok: true, resp: resp });
});
router.delete(
  "/detailInscription/:id",
  [isTokenValid],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNum = Number(id);
    const resp = await getCustomRepository(
      DetailInscriptionController
    ).deleteDetailInscription(idNum);
    if (resp instanceof DetailInscription) {
      return res.status(200).json({ ok: true, resp });
    } else {
      return res.status(500).json(resp);
    }
  }
);
/**
 * @param user :  strins to seach an inscription

 */
router.get(
  "/detailInscription",
  [isTokenValid],
  async (req: Request, res: Response) => {
    const { user, ...params } = req.query;
    const resp = await getCustomRepository(
      DetailInscriptionController
    ).searchDetailInscription(params, { user });
    if (resp instanceof Array) {
      return res.status(200).json({ ok: true, resp });
    } else {
      return res.status(500).json(resp);
    }
  }
);
export default router;
