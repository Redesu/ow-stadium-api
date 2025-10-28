import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { updater } from "../sync/updater.js";

const router = Router();

router.post('/', protect, updater);

export default router;