import db from "../../config/db.js";
import Hero from "../../models/hero.js"
import { buildDynamicHeroesQuery } from "../../utils/queryBuilder.js";

export const searchHeroes = async (req, res, next) => {
    try {
        const name = req.query.name;
        const role = req.query.role;
        const hero = new Hero(name, role);

        const { query, params } = buildDynamicHeroesQuery(hero);
        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Hero or Heroes not found' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
}