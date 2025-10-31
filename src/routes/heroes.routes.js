import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addHero, getPowersByHeroName, searchHeroes, updateHero } from "../controllers/index.js";
import { getItemsByHeroName } from "../controllers/items/getItemsByHeroName.js";
import { cacheMiddleware } from "../middleware/cache.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/heroes:
 *   post:
 *     summary: Create a new hero
 *     tags: [Heroes]
 *     security:
 *      - bearerAuth: [admin]
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
router.post('/', protect, addHero);

/**
 * @swagger
 * /api/heroes:
 *   get:
 *     summary: List of Heroes IDs, names and roles
 *     tags: [Heroes]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *         type: string
 *         description: The Hero name
 *       - in: query
 *         name: role
 *         schema:
 *          type: string
 *         description: The Hero or Heroes role (Tank, Damage, Support)
 *     responses:
 *       200:
 *         description: Found Hero/Heroes
 *       404:
 *         description: Hero not found
 */
router.get('/', cacheMiddleware, searchHeroes);

/**
 * @swagger
 * /api/heroes/{heroName}/powers:
 *   get:
 *     summary: List a Hero powers
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: heroName
 *         schema:
 *         type: string
 *         required: true
 *         description: The Hero name
 *     responses:
 *       200:
 *         description: Found Hero/Heroes
 *       400:
 *         description: Hero name is required!
 *       404:
 *         description: Power or hero not found
 */
router.get('/:heroName/powers', cacheMiddleware, getPowersByHeroName);

/**
 * @swagger
 * /api/heroes/{heroName}/items:
 *   get:
 *     summary: List a Hero Items
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: heroName
 *         schema:
 *         type: string
 *         required: true
 *         description: The Hero name
 *     responses:
 *       200:
 *         description: Found Hero/Heroes
 *       400:
 *         description: Hero name is required
 *       404:
 *         description: Items or Hero not found
 */
router.get('/:heroName/items', cacheMiddleware, getItemsByHeroName);

/**
 * @swagger
 * /api/heroes:
 *   put:
 *     summary: Updates a hero
 *     tags: [Heroes]
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
 *                 example: Doomfist
 *               role:
 *                 type: string
 *                 example: damage
 *     responses:
 *       200:
 *         description: Hero updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */
router.put('/', protect, updateHero);

export default router;

