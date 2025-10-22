import db from "../../config/db.js";
import Item from "../../models/item.js";
import { buildDynamicQuery } from "../../utils/queryBuilder.js";

export const searchItems = async (req, res, next) => {
    try {
        const item = new Item(req.query);

        const { query, params } = buildDynamicQuery('items', item);
        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(201).json(result.rows);
    } catch (err) {
        next(err);
    }
};