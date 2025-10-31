export const buildDynamicHeroesQuery = (filters) => {
    let query = `SELECT h.name as Hero, h.role, 
    p.name as Passive, p.description FROM heroes 
    h LEFT JOIN passives p ON p.hero_id = h.id WHERE 1 = 1`;
    const params = [];
    let paramCount = 1;

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            query += ` AND h.${key} ILIKE $${paramCount}`;
            params.push(value);
            paramCount++;
        }
    });
    return { query, params };
};

export const buildDynamicPowersQuery = (filters) => {
    console.log('filters:', filters.image_url)
    const includeImage = filters.image_url === 'true';
    console.log(includeImage)

    const selectedFilters = [
        'h.name as Hero',
        'p.name',
        'p.description'
    ]

    if (includeImage) selectedFilters.push('p.image_url');

    let query = `SELECT ${selectedFilters.join(', ')} FROM POWERS p
            INNER JOIN heroes h ON p.hero_id = h.id WHERE 1 = 1`
    const params = [];
    let paramCount = 1;

    const numeric_fields = ['hero_id'];
    const string_fields = ['name', 'description'];

    Object.entries(filters).forEach(([key, value]) => {
        if (key === 'image_url') return;
        if (numeric_fields.includes(key) && value !== undefined && value !== null) {
            query += ` AND p.${key} = $${paramCount}`;
            params.push(value);
            paramCount++;
        } else if (string_fields.includes(key) && value !== undefined && value !== null) {
            query += ` AND p.${key} ILIKE $${paramCount}`;
            params.push(value);
            paramCount++;
        }
    });

    return { query, params };
}

export const buildDynamicItemsQuery = (filters) => {

    const includeImage = filters.image_url === 'true';

    const selectedFilters = [
        'i.rarity',
        'i.name',
        's.stat_type',
        's.stat_value',
        's.stat_unit',
        's.stat_modifier',
        'i.description',
        'i.type',
        'i.price'
    ]

    if (includeImage) selectedFilters.push('i.image_url');

    let query = `SELECT ${selectedFilters.join(', ')} FROM ITEMS i
            INNER JOIN ITEMS_STATS s ON i.id = s.item_id WHERE 1 = 1`;
    const params = [];
    let paramCount = 1;

    const numeric_fields = ['price', 'hero_id'];
    const string_fields = ['rarity', 'name', 'description', 'type'];

    Object.entries(filters).forEach(([key, value]) => {
        if (key === 'image_url') return;
        if (numeric_fields.includes(key) && value !== undefined && value !== null) {
            query += ` AND ${key} = $${paramCount}`;
            params.push(value);
            paramCount++;
        } else if (string_fields.includes(key) && value !== undefined && value !== null) {
            query += ` AND ${key} ILIKE $${paramCount}`;
            params.push(value);
            paramCount++;
        }
    });
    return { query, params };
}

export const buildInsertQuery = (tableName, data) => {
    const columns = [];
    const params = [];
    const values = [];

    Object.keys(data).forEach((key, index) => {
        columns.push(key);
        params.push(`$${index + 1}`);
        values.push(data[key]);
    });

    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${params.join(', ')}) RETURNING *`;
    return { query, params: values };

}

export const buildPartialUpdateQuery = (tableName, data, identifierColumn = 'name') => {
    const updates = [];
    const values = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
        if (key !== identifierColumn && value !== undefined) {
            updates.push(`${key} = $${paramCount}`);
            values.push(value);
            paramCount++;
        }
    });

    values.push(data[identifierColumn]);

    const query = `
        UPDATE ${tableName} 
        SET ${updates.join(', ')} 
        WHERE ${identifierColumn} = $${paramCount} 
        RETURNING *`;

    return { query, params: values };
}