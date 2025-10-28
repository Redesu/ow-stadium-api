import 'dotenv/config.js'

const config = {
    port: process.env.PORT || 3000,
    url: process.env.URL,
    env: process.env.NODE_ENV,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT || 5432
}

export default config