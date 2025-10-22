export const buildDynamicQuery = (tableName, filters) => {
    let query = `SELECT * FROM ${tableName} WHERE 1 = 1`;
    const params = [];
    let paramCount = 1;

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            query += ` AND ${key} ILIKE $${paramCount}`;
            params.push(value);
            paramCount++;
        }
    });
    return { query, params };
};

export const buildInsertQuery = (tableName, data) => {
    const columns = [];
    const params = [];
    const values = [];

    Object.keys(data).forEach((key) => {
        columns.push(key);
        params.push(`$${key}`);
        values.push(data[key]);
    });

    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${params.join(', ')}) RETURNING *`;
    return { query, params: values };

}


export const buildUpdateQuery = (tableName, data, id) => {
    const columns = [];
    const params = [];
    const values = [];

    Object.keys(data).forEach((key) => {
        columns.push(`${key} = $${key}`);
        params.push(`$${key}`);
        values.push(data[key]);
    });

    const query = `UPDATE ${tableName} SET ${columns.join(', ')} WHERE id = $${id} RETURNING *`;
    return { query, params: [...values, id] };
}