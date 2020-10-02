import { Request, Response, Router } from "express";
import app from "./Setting";
const router = Router();
import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../entity/User";

import { handleSocket } from "../sockets/socket";
import { UserRepository } from "../controllers/UserController";
import { Iuser } from "../models/interfaces";
app.use("/verifyemail/:id", async (req, res) => {
  const { id } = req.params;
  const repository = getRepository(User);
  console.log(id);
  const use = await repository.findOne({ id });
  console.log(use);

  if (use) {
    const repository = getRepository(User);
    let useMod = { ...use };
    useMod.confirm = true;
    await repository.update(use.id, useMod);
    handleSocket.event.emit("emailConfirm", useMod.id);
    // res.send("Confirmado");
    res.render("cofirm/email");
  } else {
    res.send("error");
  }
});

app.use("/sendemailverify/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const repo = getCustomRepository(UserRepository);
    const users = await repo.getUsers({ id });
    if (users instanceof Array) {
      const user = Object.assign({} as Iuser, users[0]);
      console.log(user);
      const resp = await repo.verifyEmail(user);

      res.status(200).json({ ok: true, res: resp });
    } else {
      res.status(400).json({ ok: false });
    }
  } catch (error) {}
});
export default router;
