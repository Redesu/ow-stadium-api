import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addHero, getPowersByHeroName, searchHeroes, updateHero } from "../controllers/index.js";
import { getItemsByHeroName } from "../controllers/items/getItemsByHeroName.js";

const router = Router();

router.post('/', protect, addHero);
router.get('/', searchHeroes);
router.get('/:heroName/powers', getPowersByHeroName);
router.get('/:heroName/items', getItemsByHeroName);
router.put('/', protect, updateHero);

export default router;

