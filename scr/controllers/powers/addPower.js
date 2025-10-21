export const getPower = async (req, res) => {
    try {
        const power = new Power(req.body);

        const errors = power.validate();
        if (!errors) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const result = await db.query(
            `INSERT INTO powers (name, description, price, hero_id)`,
            [power.name, power.description, power.price, power.hero_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        next(err);
    }
}