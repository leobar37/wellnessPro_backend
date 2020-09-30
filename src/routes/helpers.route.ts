import { Request, Response, Router } from "express";
import app from "./Setting";
const router = Router();
import { getRepository } from "typeorm";
import { User } from "../entity/User";

app.use("/verifyemail/:id", async (req, res) => {
  const { id } = req.params;
  const repository = getRepository(User);
  const use = await repository.findOne({ id });
  if (use) {
    let useMod = { ...use };
    useMod.confirm = true;
    await repository.update(use.id, useMod);
    res.render("refs/confirm", { use });
  }
});

export default router;
