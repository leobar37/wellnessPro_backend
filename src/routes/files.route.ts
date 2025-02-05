import { Request, Response, Router, request } from "express";
import multer from "../middlewares/multer";
import { FileHelper } from "../helpers/Files.helper";
const router = Router();

router.post(
  "/file",
  [multer.array("images")],
  (req: Request, res: Response) => {
    if (req.files instanceof Array) {
      const names = req.files.map((fiel) => {
        return fiel.filename;
      });
      res.status(200).json({ ok: true, files: names });
    }
  }
);

router.get("/file/:image", (req: Request, res: Response) => {
  const { image } = req.params;
  const resp = FileHelper.existFile(image);
  if (typeof resp == "string") {
    res.sendFile(resp);
  } else {
    res.status(404).json({ ok: false, err: "not file" });
  }
});
export default router;
