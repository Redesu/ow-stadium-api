import db from "../../config/db.js";
import Power from "../../models/power.js";
import { buildUpdateQuery } from "../../utils/queryBuilder.js";

export const updatePower = async (req, res, next) => {
    try {
        const power = new Power(req.body);

        const errors = power.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const { query, params } = buildUpdateQuery('powers', power, req.params.id);
        const result = await db.query(query, params);

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}