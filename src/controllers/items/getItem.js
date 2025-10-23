import db from "../../config/db.js";
import Item from "../../models/item.js";
import { buildDynamicItemsQuery } from "../../utils/queryBuilder.js";

export const searchItems = async (req, res, next) => {
    try {
        const { rarity, name, description, price, image_url, hero_id } = req.query;
        const item = new Item(rarity, name, description, price, image_url, hero_id);

        const { query, params } = buildDynamicItemsQuery(item);

        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};