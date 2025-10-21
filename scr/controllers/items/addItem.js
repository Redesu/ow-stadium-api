import db from "../../config/db";
import Item from "../../models/item";

export const addItem = async (req, res, next) => {
    try {
        const item = new Item(req.body);

        const errors = item.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const result = await db.query(
            `INSERT INTO items (rarity, name, description, price, hero_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
            [item.rarity, item.name, item.description, item.price, item.hero_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}
