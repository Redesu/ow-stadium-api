import db from "../../config/db.js";
import Hero from "../../models/hero.js";
import { buildPartialUpdateQuery } from "../../utils/queryBuilder.js";

export const updateHero = async (req, res, next) => {
    try {
        const { name, role } = req.body;
        const hero = new Hero(name, role);

        const { query, params } = buildPartialUpdateQuery('heroes', hero);
        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Hero not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};