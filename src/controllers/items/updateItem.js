import db from "../../config/db.js";
import Item from "../../models/item.js";
import { buildUpdateQuery } from "../../utils/queryBuilder.js";

export const updateItem = async (req, res, next) => {
    try {
        const item = new Item(req.body);

        const errors = item.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name description, price are required' });
        }

        const { query, params } = buildUpdateQuery('items', item, req.params.id);
        const result = await db.query(query, params);

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}