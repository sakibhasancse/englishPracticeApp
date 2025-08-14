# English Writing Practice App

This is a full-stack application to help users practice English writing skills, featuring AI-generated prompts, feedback, and progress tracking.

## Features
- User registration & login (JWT authentication)
- Daily writing practice with AI-generated prompts
- AI feedback: grammar, vocabulary, fluency, and scoring
- Writing history and progress dashboard
- Free and guided writing modes
- Clean React.js frontend (TailwindCSS/Material UI)
- Node.js/Express.js backend with MongoDB
- OpenAI GPT API integration
- Dockerized frontend & backend

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Docker & Docker Compose
- MongoDB Atlas or local MongoDB
- OpenAI API Key (or compatible alternative)

### Environment Variables
Create `.env` files in both `/backend` and `/frontend` (see `.env.example` in each folder).

### Local Development
1. **Backend**
   ```sh
   cd backend
   npm install
   npm run seed # Creates a test user
   npm run dev
   ```
2. **Frontend**
   ```sh
   cd frontend
   npm install
   npm start
   ```

### Docker Deployment
1. Copy `.env.example` to `.env` in both `/backend` and `/frontend` and fill in your values.
2. From the project root:
   ```sh
   docker-compose up --build
   ```

### Seed Script
- Run `npm run seed` in `/backend` to create a test user.

## Folder Structure
- `/backend` - Express.js API, MongoDB, JWT, OpenAI integration
- `/frontend` - React.js app, TailwindCSS/Material UI

## AI Prompt for Feedback
> "Act as a professional English tutor. Provide constructive feedback, grammar corrections, vocabulary suggestions, and a score. Do not rewrite the whole text; instead, highlight mistakes and explain how to improve."

---

For more details, see the README files in `/backend` and `/frontend`.
# englishPracticeApp
