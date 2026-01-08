import { Router } from "express";
import { cacheMiddleware } from "../middleware/cache.middleware.js";
import { search } from "../controllers/index.js";

const router = Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search entities (across items, items stats, heroes, powers)
 *     description: Search for entities across multiple collections including items, item stats, heroes, and powers. You can search by name, type, role, description, and specific item stats abbreviations.
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: Comma-separated search terms or stat abbreviations (e.g. "ap, wp")
 *         example: "ap"
 *     responses:
 *       200:
 *         description: Search results found
 *       400:
 *         description: No search parameters provided
 *       404:
 *         description: Search results not found
 */
router.get("/", cacheMiddleware, search);

export default router;
