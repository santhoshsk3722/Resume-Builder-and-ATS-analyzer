# How to Run the Project locally

## Prerequisites
- **Node.js**: v18 or higher
- **Docker Desktop**: For running PostgreSQL and Redis

## Quick Start

### 1. Start Infrastructure (Postgres & Redis)
Make sure Docker Desktop is running, then run:
```bash
docker-compose up -d
```
*Note: If this fails, ensure you have no other services running on ports 5432 or 6379.*

### 2. Start the Backend (API)
Open a new terminal configuration:
```bash
cd apps/api
npm install # if not already installed
npm run start:dev
```
The API will be available at `http://localhost:3000`.

### 3. Start the Frontend (Web)
Open a new terminal:
```bash
cd apps/web
npm install # if not already installed
npm run dev
```
The Frontend will be available at `http://localhost:5173`.

## Troubleshooting

### Database Connection Error
If the API fails to connect to the database:
1. Check if Docker containers are running: `docker ps`
2. Ensure the credentials in `apps/api/src/app.module.ts` match `docker-compose.yml`.
   - Host: `localhost`
   - Port: `5432`
   - User: `postgres`
   - Password: `postgres_password`
   - DB: `resume_builder`

### Frontend API Calls
Ensure the proxy or CORS is configured if you experience network errors when calling the API from the frontend.
