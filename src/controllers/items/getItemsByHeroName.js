import db from "../../config/db.js";

export const getItemsByHeroName = async (req, res, next) => {
    try {
        const { heroName } = req.params;

        if (!heroName) {
            return res.status(400).json({ message: 'Hero name is required!' })
        }

        const result = await db.query(`
            SELECT i.rarity, h.name as Hero, i.name,  s.stat_type,
            s.stat_value, s.stat_unit,
            s.stat_modifier,  i.description,
            i.type, i.price, i.image_url FROM ITEMS i
            INNER JOIN ITEMS_STATS s ON i.id = s.item_id
            INNER JOIN HEROES h ON i.hero_id = h.id
            WHERE h.name ILIKE $1`,
            [heroName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
}