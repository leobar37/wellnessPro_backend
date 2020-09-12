import { Request, Response, Router } from "express";
import UserRoutes from "./User";
import ProductRoutes from "./Product";
import FormRoute from "./Form.route";
import questionRoute from "./question.route";
import inscriptionRoute from "./inscription.route";
import PoolRoute from "./Pool.route";
import FileRoute from "./files.route";
import SettingRoutes from "./Setting";
import detailInscriptionRoute from "./Detail.inscription.route";
const router = Router();
router.use(detailInscriptionRoute);
router.use(UserRoutes);
router.use(FileRoute);
router.use(ProductRoutes);
router.use(SettingRoutes);
router.use(FormRoute);
router.use(PoolRoute);
router.use(inscriptionRoute);
router.use(questionRoute);
export default router;
