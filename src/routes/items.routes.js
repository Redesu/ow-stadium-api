import { protect } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { addItem, searchItems, updateItem } from "../controllers/index.js";

const router = Router();

router.post('/', protect, addItem);
router.get('/', searchItems);
router.put('/', protect, updateItem);

export default router;