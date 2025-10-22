
import db from "../../config/db.js";
import Hero from "../../models/hero.js";
import { buildInsertQuery } from "../../utils/queryBuilder.js";

export const addHero = async (req, res, next) => {
    try {
        const hero = new Hero(req.body);

        const errors = hero.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and class are required' });
        }

        const { query, params } = buildInsertQuery('heroes', hero);

        const result = await db.query(query, params);

        res.status(201).json(result.rows[0]);

    } catch (err) {
        next(err);
    }


}