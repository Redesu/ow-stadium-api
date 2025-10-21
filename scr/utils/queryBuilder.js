import Hero from "../models/hero.js";

export const buildDynamicQuery = (baseQuery, filters) => {
    let query = baseQuery;
    const params = [];
    let paramCount = 1;
    Object.keys(filters).forEach((key) => {
        if (filters[key]) {
            query += ` AND ${key} = $${paramCount}`;
            params.push(filters[key]);
            paramCount++;
        }
    });
    return { query, params };
}

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

//testing buildUpdateQuery

const hero = new Hero(1, 'name', 'role');
const { query, params } = buildUpdateQuery('heroes', hero, 1);
console.log(query, params);