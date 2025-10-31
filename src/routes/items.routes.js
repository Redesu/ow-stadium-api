import { protect } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { addItem, searchItems, updateItem } from "../controllers/index.js";
import { cacheMiddleware } from "../middleware/cache.middleware.js";

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
 *               - rarity
 *               - name
 *               - type
 *               - description
 *               - price
 *             properties:
 *               rarity:
 *                 type: string.
 *                 description: The item rarity
 *                 example: epic
 *               name:
 *                 type: string
 *                 description: The item name
 *                 example: Eye of the Spider
 *               type:
 *                 type: string
 *                 description: The item type
 *                 example: Hero Item (Weapon)
 *               description:
 *                 type: string
 *                 description: The item description
 *                 example: Deal 10% increased damage to enemies below 30% Life.
 *               price:
 *                 type: number
 *                 description: The item price
 *                 example: 14000
 *               image_url:
 *                 type: string
 *                 description: The item image url (optional)
 *                 example: https://example.com/image.jpg
 *               hero_id:
 *                 type: number
 *                 description: The hero id (optional)
 *                 example: 276
 *     responses:
 *       201:
 *         description: Hero created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */
router.post('/', protect, addItem);

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: List of Items and their attributes
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: rarity
 *         schema:
 *         type: string
 *         description: The Item rarity
 *       - in: query
 *         name: name
 *         schema:
 *          type: string
 *         description: The Item name
 *       - in: query
 *         name: type
 *         schema:
 *          type: string
 *         description: The Item type (gadget, Hero Item (Survival), Hero Item (Weapon), Hero Item (Ability))
 *       - in: query
 *         name: description
 *         schema:
 *          type: string
 *         description: The Item description
 *       - in: query
 *         name: price
 *         schema:
 *          type: number
 *         description: The Item price
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
 *         description: Found Item/Items
 *       404:
 *         description: Item not found
 */
router.get('/', cacheMiddleware, searchItems);

/**
 * @swagger
 * /api/items: 
 *   put: 
 *    summary: Updates an item
 *    tags: [Items] 
 *    security: 
 *      - bearerAuth: [] 
 *    requestBody: 
 *      required: true 
 *      content: 
 *        application/json: 
 *          schema: 
 *            type: object 
 *            required: 
 *              - name
 *            properties: 
 *              id: 
 *                type: number
 *                description: The item id
 *                example: 1
 *              rarity: 
 *                type: string
 *                description: The item rarity
 *                example: epic
 *              name: 
 *                type: string
 *                description: The item name
 *                example: Eye of the Spider
 *              description: 
 *                type: string
 *                description: The item description
 *                example: Deal 10% increased damage to enemies below 30% Life.
 *              price: 
 *                type: number
 *                description: The item price
 *                example: 14000
 *              image_url: 
 *                type: string
 *                description: The item image url (optional)
 *                example: https://example.com/image.jpg
 *              hero_id: 
 *                type: number
 *                description: The hero id (optional)
 *                example: 276
 *    responses: 
 *      200: 
 *        description: Item updated successfully
 *      401: 
 *        description: Unauthorized
 *      400: 
 *        description: Invalid input
 * */
router.put('/', protect, updateItem);

export default router;