import db from "../../config/db.js";
import Hero from "../../models/hero.js"
import { buildDynamicQuery } from "../../utils/queryBuilder.js";

export const searchHeroes = async (req, res, next) => {
    try {
        const name = req.query.name;
        const className = req.query.class;
        const hero = new Hero(name, className);

        const { query, params } = buildDynamicQuery('heroes', hero);
        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Hero not found' });
        }

        res.status(201).json(result.rows);
    } catch (err) {
        next(err);
    }
}