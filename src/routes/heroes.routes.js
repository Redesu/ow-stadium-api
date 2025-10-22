import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addHero, searchHeroes, updateHero } from "../controllers/index.js";

const router = Router();

router.post('/', protect, addHero);
router.get('/', searchHeroes);
router.put('/', protect, updateHero);

export default router;

