import db from "../../config/db.js";

export const getPowersByHeroName = async (req, res, next) => {
    try {
        const { heroName } = req.params;
        const { image_url } = req.query;


        if (!heroName) {
            return res.status(400).json({ message: 'Hero name is required' });
        }

        const selectedFilters = [
            'h.name as Hero',
            'p.name',
            'p.description',
        ]

        if (image_url === 'true') selectedFilters.push('p.image_url');

        const result = await db.query(`
            SELECT ${selectedFilters.join(', ')}
            FROM POWERS p
            INNER JOIN HEROES h ON p.hero_id = h.id
            WHERE h.name ILIKE $1`, [heroName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Power or hero not found' });
        }


        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
}