import db from "../../config/db.js";
import Power from "../../models/power.js";
import { buildPartialUpdateQuery } from "../../utils/queryBuilder.js";

export const updatePower = async (req, res, next) => {
    try {

        const { name, description, hero_id, image_url } = req.body;
        const power = new Power(name, description, hero_id, image_url);

        const { query, params } = buildPartialUpdateQuery('powers', power);
        const result = await db.query(query, params);

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}