import db from "../../config/db";
import Item from "../../models/item";
import { buildDynamicQuery } from "../../utils/queryBuilder";

export const searchItems = async (req, res, next) => {
    try {
        const item = new Item(req.body);

        const errors = item.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const { query, params } = buildDynamicQuery(`SELECT * FROM items WHERE 1=1`, item);
        const result = await db.query(query, params);
        res.status(201).json(result.rows[0]);

    } catch (err) {
        next(err);
    }
};