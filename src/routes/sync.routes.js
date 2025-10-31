import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { updater } from "../sync/updater.js";

const router = Router();

/** 
 * @swagger
 * /api/sync:
 *   post:
 *     summary: Syncs Items and powers based on the patch notes balances changes
 *     tags: [Sync]
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
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The power/item name
 *                 example: Hyperloop
 *               description:
 *                 type: string
 *                 description: The power/item balance changes
 *                 example: Increased by 0.2s
 *     responses:
 *       200:
 *         description: Database synced
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Power/Item not found
 */
router.post('/', protect, updater);

export default router;