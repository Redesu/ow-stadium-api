import db from "../../config/db";

export const getPowersByHeroName = async (req, res, next) => {
    try {
        const { heroName } = req.params;

        const result = await db.query(`SELECT * FROM POWERS p
            INNER JOIN HEROES h
            WHERE h.name ILIKE $1`, [heroName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Power not found' });
        }

        res.status(201).json(result.rows);
    } catch (err) {
        next(err);
    }
}