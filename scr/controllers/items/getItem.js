import db from "../../config/db";

export const addItem = async (req, res) => {
    try {
        const item = new Items(req.body);

        const errors = item.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const result = await db.query(
            `SELECT * FROM items
            WHERE rarity = $1 AND name = $2 AND description = $3 AND price = $4 AND hero_id = $5`,
            [item.rarity, item.name, item.description, item.price, item.hero_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        next(err);
    }
};