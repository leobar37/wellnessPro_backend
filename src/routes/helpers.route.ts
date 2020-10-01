import { Request, Response, Router } from "express";
import app from "./Setting";
const router = Router();
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import {} from "../sockets/socket";
import { handleSocket } from "../sockets/socket";
app.use("/verifyemail/:id", async (req, res) => {
  const { id } = req.params;
  const repository = getRepository(User);
  const use = await repository.findOne({ id });
  console.log(use);

  if (use) {
    let useMod = { ...use };
    useMod.confirm = true;
    await repository.update(use.id, useMod);
    handleSocket.event.emit("emailConfirm", useMod.id);
    res.send("Confirmado");
    // res.render("refs/confirm", { use });
  }
});

export default router;
