import { Pool } from "pg";
import 'dotenv/config.js'

const pool = new Pool({
    connectionString: process.env.DB_HOST,
    ssl: true
});

export default {
    query: (text, params) => pool.query(text, params)
}