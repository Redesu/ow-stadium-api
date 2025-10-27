import db from "../../config/db.js";
import Item from "../../models/item.js";
import { buildPartialUpdateQuery } from "../../utils/queryBuilder.js";

export const updateItem = async (req, res, next) => {
    try {
        const item = new Item(req.body);

        const { query, params } = buildPartialUpdateQuery('items', item);
        const result = await db.query(query, params);

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}