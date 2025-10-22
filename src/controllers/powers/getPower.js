import db from "../../config/db.js";
import { buildDynamicQuery } from "../../utils/queryBuilder.js";

export const searchPowers = async (req, res, next) => {
    try {
        const power = new Power(req.query);

        const { query, params } = buildDynamicQuery('powers', power);
        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Power not found' });
        }

        res.status(201).json(result.rows);
    } catch (err) {
        next(err);
    }
}