import db from "../../config/db.js";
import Power from "../../models/power.js";
import { buildInsertQuery } from "../../utils/queryBuilder.js";

export const addPower = async (req, res, next) => {
    try {
        const { name, description, hero_id, image_url } = req.body;
        const power = new Power(name, description, hero_id, image_url);

        const errors = power.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const { query, params } = buildInsertQuery('powers', power);

        const result = await db.query(query, params);

        res.status(201).json(result.rows[0]);

    } catch (err) {
        next(err);
    }
}