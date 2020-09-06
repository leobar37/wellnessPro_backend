import multer, { diskStorage, FileFilterCallback, MulterError } from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
const extensions = ["png", "gif", "jpg", "webp"];
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
export default multer({
  storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    ext = ext.replace(".", "");
    const isValid = extensions.some((exti) => exti == ext);
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("extension not valid"));
    }
  },
});
