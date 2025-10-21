import db from "../../config/db";
import Item from "../../models/item";

export const updateItem = async (req, res, next) => {
    try {
        const item = new Item(req.body);

        const errors = item.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name description, price are required' });
        }

        const result = await db.query(
            `UPDATE items SET rarity = $1, name = $2, description = $3, price = $4, hero_id = $5 WHERE id = $6 RETURNING *`,
            [item.rarity, item.name, item.description, item.price, item.hero_id, req.params.id]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}