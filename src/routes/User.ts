import { Router, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
const router = Router();
import { UserRepository } from "../controllers/UserController";
import { Iuser } from "../models/interfaces";

import { User } from "../entity/User";
// const repoUser = getCustomRepository(UserRepository);

router.post("/user", async (req: Request, res: Response) => {
  const us: Iuser = req.body;
  const token = await getCustomRepository(UserRepository).createUser(us);
  return typeof token == "string"
    ? res.status(200).json({ ok: true, token })
    : res.status(400).json({ ok: false, err: token });
});

router.get("/user", async (req: Request, res: Response) => {
  const user = await getCustomRepository(UserRepository).getUsers(req.params);
  return res.status(200).json({ ok: true, user });
});
router.put("/user/:id", async (req: Request, res: Response) => {
  const us: Iuser = req.body;
  const { id } = req.params;
  const userUpdate = await getCustomRepository(UserRepository).updateUser(
    id,
    us
  );
  if (userUpdate instanceof User) {
    return res.status(200).json({ ok: true, userUpdate });
  } else {
    return res.status(500).json(userUpdate);
  }
});

export default router;
