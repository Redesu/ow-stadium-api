import db from "../../config/db";
import Hero from "../../models/hero"

export const getHero = async (req, res) => {
    try {
        const hero = new Hero(req.body);

        const errors = hero.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and role are required' });
        }

        const result = await db.query(
            `SELECT * FROM heroes
             WHERE name = $1 AND role = $2`,
            [hero.name, hero.role]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}