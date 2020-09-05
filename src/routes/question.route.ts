import { Request, Response, Router } from "express";
const router = Router();
import { getCustomRepository } from "typeorm";
import { QuestionController } from "../controllers/QuestionController";
import { Tparams } from "../models/types";
import { Question } from "../entity/Question";
import { IQuestion } from "../models/interfaces";

router.post("/question", async (req: Request, res: Response) => {
  const pro: IQuestion = req.body;
  const resp = await getCustomRepository(QuestionController).createQuestion(
    pro
  );
  if (resp instanceof Question) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.put("/Question/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const pro: IQuestion = req.body;
  const resp = await getCustomRepository(QuestionController).updateQuestion(
    pro,
    idNum
  );
  if (resp instanceof Question) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.delete("/Question/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const resp = await getCustomRepository(QuestionController).deleteQuestion(
    idNum
  );
  if (resp instanceof Question) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.get("/question", async (req: Request, res: Response) => {
  const { idform, ...params } = req.query;
  console.log(idform, params);
  const resp = await getCustomRepository(QuestionController).searchQuestion(
    params,
    Number(idform)
  );
  if (resp instanceof Array) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

export default router;
