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

\## Real-time Updates (Socket.IO)

The API also exposes a Socket.IO server on the same port.

\### Events emitted by the server

When your REST endpoints create/update/delete records, the backend emits:

- `visitor:created` / `visitor:deleted` (to the `visitors` room)
- `queue:created` / `queue:updated` / `queue:deleted` (to the `queues` room)

Each event payload looks like:

```json
{ "data": { /* the created/updated/deleted document */ } }
```

\### Example client (Node.js)

Install a client (in your frontend project):

```bash
npm i socket.io-client
```

Then connect + subscribe:

```ts
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
	withCredentials: true,
});

socket.on("connect", () => {
	console.log("connected", socket.id);

	// Subscribe to live updates
	socket.emit("visitors:subscribe");
	socket.emit("queues:subscribe");
});

socket.on("visitor:created", ({ data }) => {
	console.log("New visitor:", data);
});

socket.on("visitor:deleted", ({ data }) => {
	console.log("Visitor deleted:", data);
});

socket.on("queue:created", ({ data }) => {
	console.log("New queue:", data);
});

socket.on("queue:updated", ({ data }) => {
	console.log("Queue updated:", data);
});

socket.on("queue:deleted", ({ data }) => {
	console.log("Queue deleted:", data);
});
```

\## Scripts

- `npm run dev` — start dev server with auto-reload
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled server from `dist/`

\## Project Structure

```text
src/
	config/        # database config 
	controllers/   # request handlers
	dao/		   # Data Access Object
	dto/           # Data Transfter Object 
	middleware/    # express middleware
	models/        # mongoose models
	service/       # business login
	routes/        # express routes + swagger annotations
```

\## Author

SENGHAK_COD