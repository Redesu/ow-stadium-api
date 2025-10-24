import { protect } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { addItem, searchItems, updateItem } from "../controllers/index.js";

const router = Router();

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tracer
 *               role:
 *                 type: string
 *                 example: damage
 *     responses:
 *       201:
 *         description: Hero created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */
router.post('/', protect, addItem);

router.get('/', searchItems);
router.put('/', protect, updateItem);

export default router;