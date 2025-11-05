# ow-stadium-api

A back-end RESTful API for managing Overwatch-style heroes, powers, and items. Built with **Node.js**, **Express**, and **PostgreSQL**. Includes **Swagger** for live API documentation and **Redis** for caching.

-----

## You can find the live API documentation [HERE](https://ow-stadium-api.redesu.com.br/)
## This project features a Discord Bot, invite to your server [HERE](https://discord.com/api/oauth2/authorize?client_id=1434270244523872276&scope=bot&permissions=51200)

> [!WARNING]  
> The API currently limits requests to 50 requests per 15 minutes. This limit may be increased in the future.

*(Port may vary based on your `.env` configuration)*

## Features

  - **Hero, Power, & Item Management:** Full CRUD (Create, Read, Update, Delete) operations for all core database models.
  - **Dynamic Search Engine:** Utilizes dynamic query builders to allow searching for any resource based on multiple combinations of query parameters (e.g., find heroes by `role`, items by `rarity` and `price`).
  - **Patch Note Sync:** A unique endpoint (`/api/sync`) designed to receive patch note changes (e.g., "Increased by 0.2s") and automatically find and update the correct numerical values in an item or power's description.
  - **Live API Documentation:** Integrates `swagger-ui-express` to provide a live, interactive documentation page for all API endpoints.
  - **Protected Admin Routes:** Secures all `POST`, `PUT`, and `sync` endpoints using a simple bearer token, reserving create/update operations for administrators.

-----

## Project Structure

```
.
├── src/
│   ├── config/             # Database (db.js), Redis (redis.js) and app (config.js) configuration
│   ├── controllers/        # Request handling logic for each resource
│   │   ├── heroes/
│   │   ├── items/
│   │   └── powers/
│   ├── middleware/         # Custom middleware (auth.middleware.js, cache.middleware.js, errorHandler.js)
│   ├── models/             # Data models (Hero, Item, Power)
│   ├── routes/             # API route definitions (heroes.routes.js, etc.)
│   ├── sync/               # Logic for the /api/sync endpoint (updater.js)
│   └── utils/              # Utility functions (queryBuilder.js)
├── .env.example            # Example environment variables
├── .gitignore
├── src/app.js              # Main Express app setup
├── eslint.config.js
├── src/index.js            # Application entry point
├── package.json
├── schema.sql              # PostgreSQL database schema
└── swagger.js              # Swagger/OpenAPI configuration
```

-----

## Prerequisites

  - **Node.js** (v18+ recommended)
  - **npm** (or yarn, pnpm, bun)
  - **PostgreSQL** instance (Cloud or local)
  - **Redis** instance (Cloud or local)

-----

## Getting Started

### 1\. Clone the repository

```sh
git clone https://github.com/Redesu/ow-stadium-api.git
cd ow-stadium-api
```

### 2\. Install dependencies

```sh
npm install
```

### 3\. Configure Environment Variables

Create a `.env` file in the root of the project. You can copy `.env.example` if it exists, or create it manually:

**Required Environment Variables (`.env`):**

```
# Application
PORT=7000
NODE_ENV=development

# Database
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# Security
ADMIN_TOKEN=your_secret_bearer_token
```

### 4\. Setup the Database

Run the `schema.sql` file against your PostgreSQL database to create the necessary tables (`heroes`, `powers`, `items`, etc.).

### 5\. Run the development server

```sh
npm run dev
```

-----

## Usage

  - Open [http://localhost:7000/api/docs](http://localhost:7000/api/docs) (or your configured port) with your browser to see the live Swagger documentation.
  - Use the Swagger UI to test all available endpoints.
  - To test protected (admin) routes, click the "Authorize" button and enter your `ADMIN_TOKEN` value as a Bearer token.

-----

## API Endpoints

All endpoints are prefixed with `/api`.

**Hero Endpoints (`/heroes`)**

  - `GET /`: Search for heroes by `name` or `role`.
  - `POST /`: (Protected) Create a new hero.
  - `PUT /`: (Protected) Update an existing hero.
  - `GET /{heroName}/powers`: Get all powers associated with a specific hero.
  - `GET /{heroName}/items`: Get all items associated with a specific hero.

**Item Endpoints (`/items`)**

  - `GET /`: Search for items by `rarity`, `name`, `description`, `price`, etc.
  - `POST /`: (Protected) Create a new item.
  - `PUT /`: (Protected) Update an existing item.

**Power Endpoints (`/powers`)**

  - `GET /`: Search for powers by `name`, `description`, or `hero_id`.
  - `POST /`: (Protected) Create a new power.
  - `PUT /`: (Protected) Update an existing power.

**Sync Endpoint (`/sync`)**

  - `POST /`: (Protected) Syncs an item or power description. Takes a `name` and `description` (the patch note) in the body.

-----

## Contributing

Pull requests are welcome\! For major changes, please open an issue first to discuss what you would like to change.
If you find wrong information, please open an issue or contact me on Discord (@redesu).

-----

## Credits

All data is provided by the [Overwatch Wiki](https://overwatch.fandom.com/wiki/Overwatch_Wiki).

-----

## License

[MIT](https://mit-license.org/)