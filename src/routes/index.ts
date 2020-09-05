import { Request, Response, Router } from "express";
import UserRoutes from "./User";
import ProductRoutes from "./Product";
import FormRoute from "./Form.route";
import questionRoute from "./question.route";
import inscriptionRoute from "./inscription.route";
import PoolRoute from "./Pool.route";
export const router = Router();
router.use(UserRoutes);
router.use(ProductRoutes);
router.use(FormRoute);
router.use(PoolRoute);
router.use(inscriptionRoute);
router.use(questionRoute);
export default router;
