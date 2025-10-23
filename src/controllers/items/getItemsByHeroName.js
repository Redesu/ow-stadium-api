import db from "../../config/db.js";

export const getItemsByHeroName = async (req, res, next) => {
    try {
        const { heroName } = req.params;

        const result = await db.query(`SELECT * FROM ITEMS i
            INNER JOIN HEROES h ON i.hero_id = h.id
            WHERE h.name ILIKE $1`, [heroName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(201).json(result.rows);
    } catch (err) {
        next(err);
    }
}