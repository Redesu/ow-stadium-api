import db from "../../config/db.js";
import Item from "../../models/item.js";
import { buildPartialUpdateQuery } from "../../utils/queryBuilder.js";

export const updateItem = async (req, res, next) => {
    try {
        const { rarity, name, type, description, price, image_url, hero_id } = req.body;

        if (!name || name.trim() === "") {
          return res.status(400).json({ message: "Item name is required!" });
        }
        
        const item = new Item(rarity, name, type, description, price, image_url, hero_id);

        const { query, params } = buildPartialUpdateQuery('items', item);
        const result = await db.query(query, params);

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}