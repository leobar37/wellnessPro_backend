import { Router, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
const router = Router();
import { IProduct } from "../models/interfaces";
import { ProductController } from "../controllers/ProductController";
import { Product } from "../entity/Product";
import { Tparams } from "../models/types";
router.post("/product", async (req: Request, res: Response) => {
  const pro: IProduct = req.body;
  const resp = await getCustomRepository(ProductController).createProduct(pro);
  if (resp instanceof Product) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.put("/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const pro: IProduct = req.body;
  const resp = await getCustomRepository(ProductController).updateProduct(
    pro,
    idNum
  );
  if (resp instanceof Product) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.delete("/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const resp = await getCustomRepository(ProductController).deleteProduct(
    idNum
  );
  if (resp instanceof Product) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

router.get("/product", async (req: Request, res: Response) => {
  const params: Tparams = req.query;
  const resp = await getCustomRepository(ProductController).searchProduc(
    params
  );
  if (resp instanceof Array) {
    return res.status(200).json({ ok: true, resp });
  } else {
    return res.status(500).json(resp);
  }
});

export default router;
