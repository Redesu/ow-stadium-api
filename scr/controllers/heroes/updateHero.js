import db from "../../config/db";

export const updateHero = async (req, res) => {
    try {
        const hero = new Hero(req.body);

        const errors = hero.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and role are required' });
        }

        const result = await db.query(
            `UPDATE heroes
        SET name = $1, role = $2
        WHERE id = $3
        RETURNING *`,
            [hero.name, hero.role, req.params.id]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};