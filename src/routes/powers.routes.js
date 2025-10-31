import { protect } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { addPower, searchPowers, updatePower } from "../controllers/index.js";
import { cacheMiddleware } from "../middleware/cache.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/powers:
 *   post:
 *     summary: Create a new power
 *     tags: [Powers]
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
 *               - hero_id
 *               - image_url
 *             properties:
 *               name:
 *                 type: string
 *                 description: The power name
 *                 example: Hyperloop
 *               description:
 *                 type: string
 *                 description: The power description
 *                 example: Hyperspheres direct hits reduce the cooldown of [Accretion] by 0.8s.
 *               hero_id:
 *                 type: number
 *                 description: The hero id
 *                 example: 258
 *               image_url:
 *                 type: string
 *                 description: The power image url
 *                 example: https://example.com/image.jpg
 *     responses:
 *       201:
 *         description: Hero created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 * 
 * 
 */
router.post('/', protect, addPower);

/** 
 * @swagger
 * /api/powers:
 *   get:
 *     summary: List of Powers and their attributes
 *     tags: [Powers]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *         type: string
 *         description: The Power name
 *       - in: query
 *         name: description
 *         schema:
 *          type: string
 *         description: The Power description
 *       - in: query
 *         name: image_url
 *         schema:
 *          type: boolean
 *         description: Determine if it should return the image url or not, default is false
 *       - in: query
 *         name: hero_id
 *         schema:
 *          type: number
 *         description: The Hero id
 *     responses:
 *       200:
 *         description: Found Power/Powers
 *       404:
 *         description: Power not found
 */
router.get('/', cacheMiddleware, searchPowers);

/**
 * @swagger
 * /api/powers:
 *   put:
 *     summary: Updates a power
 *     tags: [Powers]
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: The power name
 *                 example: Hyperloop
 *               description:
 *                 type: string
 *                 description: The power description
 *                 example: Hyperspheres direct hits reduce the cooldown of [Accretion] by 0.8s.
 *               hero_id:
 *                 type: number
 *                 description: The hero id
 *                 example: 258
 *               image_url:
 *                 type: string
 *                 description: The power image url
 *                 example: https://example.com/image.jpg
 *     responses:
 *       200:
 *         description: Power updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */
router.put('/', protect, updatePower);

export default router;