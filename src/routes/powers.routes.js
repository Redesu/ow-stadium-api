import { protect } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { addPower, searchPowers, updatePower } from "../controllers/index.js";

const router = Router();

router.post('/', protect, addPower);
router.get('/', searchPowers);
router.put('/', protect, updatePower);

export default router;