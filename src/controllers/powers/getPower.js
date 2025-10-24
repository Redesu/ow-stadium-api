import db from "../../config/db.js";
import Power from "../../models/power.js";
import { buildDynamicQuery } from "../../utils/queryBuilder.js";

export const searchPowers = async (req, res, next) => {
    try {
        const { name, description, hero_id, image_url } = req.query;
        const power = new Power(name, description, hero_id, image_url);

        const { query, params } = buildDynamicQuery('powers', power);
        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Power not found' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
}