# Sports Attendance Backend

Node.js/Express Backend mit Supabase-Integration.

## Setup

```bash
npm install
cp .env.example .env
# .env mit deinen Supabase-Credentials ausfüllen
npm run dev
```

## Environment Variables

Benötigte Variablen in `.env`:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Vercel Deployment

1. Push zu GitHub
2. Verbinde Repository mit Vercel
3. Setze Environment Variables in Vercel Settings
4. Deploy!

## Database Schema

Führe `supabase-schema.sql` in deinem Supabase SQL Editor aus.
