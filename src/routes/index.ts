import { Request, Response, Router } from "express";
import UserRoutes from "./User";
export const router = Router();
router.use(UserRoutes);
export default router;
