\# PeaceFood API

REST API for an Peace Food platform, built with **Node.js + Express (TypeScript)** and **MongoDB (Mongoose)**.

\## Features

- TypeScript + Express server
- MongoDB via Mongoose
- Request validation with Zod
- Swagger/OpenAPI docs via `swagger-jsdoc` + `swagger-ui-express`

\## Prerequisites

- Node.js 20+
- MongoDB (local) **or** Docker Desktop
- Package manager: `npm` (works out of the box). `pnpm` also works (lockfile included).

\## Getting Started (Local)

\### 1) Install dependencies

```bash
npm install
```

\### 2) Configure environment variables

Copy the example file:

```bash
cp ".env example" .env
```

Edit `.env` as needed:

```env
PROJECT_NAME=PeaceFood
PORT=3000

# Local MongoDB example (recommended for local dev)
MONGO_URL=mongodb://localhost:27017/peacefood
```

\### 3) Run the API

Development (auto-reload):

```bash
npm run dev
```

Build + run production:

```bash
npm run build
npm start
```

\## Getting Started (Docker)

This repo includes `docker-compose.yml` for running the API + MongoDB.

\### 1) Create `.env`

```bash
cp ".env example" .env
```

For Docker Compose, set `MONGO_URL` to the Mongo service:

```env
MONGO_URL=mongodb://mongo:27017/peacefood
```

\### 2) Start containers

```bash
docker compose up --build
```

\## API URLs

- Health/welcome: `GET /`
- Swagger UI: `GET /api`
- Base API prefix: `/api`

Default URL (if `PORT=3000`):

- API: `http://localhost:3000/`
- Swagger UI: `http://localhost:3000/api`

\## Scripts

- `npm run dev` — start dev server with auto-reload
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled server from `dist/`

\## Project Structure

```text
src/
	config/        # database config
	controllers/   # request handlers
	dto/           # zod schemas
	middleware/    # express middleware
	models/        # mongoose models
	routes/        # express routes + swagger annotations
```

\## Author

SENGHAK_COD