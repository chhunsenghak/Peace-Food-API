import { Router } from "express";
import authRoutes from "./_auth.routes";
import userRoutes from "./_user.routes";
import queueRoutes from "./_queue.routes";
import visitorRoutes from "./_visitor.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use(userRoutes);
router.use(queueRoutes);
router.use(visitorRoutes);

export default router;
