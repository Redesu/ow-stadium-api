import db from "../../config/db.js";
import Item from "../../models/item.js";
import { buildInsertQuery } from "../../utils/queryBuilder.js";

export const addItem = async (req, res, next) => {
    try {
        const item = new Item(req.body);

        const errors = item.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const { query, params } = buildInsertQuery('items', item);

        const result = await db.query(query, params);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}
