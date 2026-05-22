# VedaAI Assessment Creator

A full-stack web application for creating and managing AI-powered assessments using Next.js frontend and Node.js/Express backend.

## Project Structure

```
vedaai-assessment-creator/
├── backend/          # Node.js + Express API server
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── models/   # Database models
│   │   ├── routes/   # API routes
│   │   ├── services/ # Business logic
│   │   ├── sockets/  # WebSocket handlers
│   │   ├── queues/   # Job queues (BullMQ)
│   │   ├── workers/  # Background workers
│   │   ├── utils/    # Utility functions
│   │   └── index.ts  # Entry point
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/         # Next.js React application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utilities and helpers
│   ├── public/       # Static assets
│   ├── tsconfig.json
│   └── package.json
│
└── .gitignore
```

## Tech Stack

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Cache/Queue:** Redis (ioredis)
- **Job Queue:** BullMQ
- **Real-time:** Socket.io
- **AI:** Google Generative AI (Gemini)
- **Dev Tool:** tsx (TypeScript executor)

### Frontend
- **Framework:** Next.js 16
- **Language:** TypeScript + React 19
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Forms:** React Hook Form + Zod
- **State Management:** Zustand
- **Real-time:** Socket.io-client
- **Notifications:** Sonner

## Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB instance (local or cloud)
- Redis instance (local or cloud)
- Google Generative AI API key

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd vedaai-assessment-creator
```

### 2. Setup Environment Variables

#### Backend
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and add:
- `MONGODB_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection URL
- `GEMINI_API_KEY` - Google Generative AI API key
- `CLIENT_URL` - Frontend URL (default: http://localhost:3000)
- `PORT` - Backend port (default: 5000)

#### Frontend
```bash
cp frontend/.env.example frontend/.env.local
```

Edit `frontend/.env.local` if needed for API endpoints.

### 3. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 4. Run Development Servers

**Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Frontend (in a new terminal):**
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:3000`

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Documentation

API endpoints are organized under `/src/routes/`

- Base URL: `http://localhost:5000`

## Database

- **MongoDB:** Schemas defined in `/src/models/`
- **Redis:** Used for caching and job queues

## Real-time Features

WebSocket events are handled in `/src/sockets/`

Connect to `http://localhost:5000` via Socket.io for real-time updates.

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Submit a pull request

## License

ISC

## Contact

For questions or support, please contact the development team.
