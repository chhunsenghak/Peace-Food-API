import { Router } from "express";
import authRoutes from "./_auth.routes";
import userRoutes from "./_user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use(userRoutes);

export default router;
