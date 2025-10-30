# Sports Attendance PWA

Eine Progressive Web App zur Verwaltung von Sportveranstaltungen mit Teilnehmerverwaltung und Equipment-Tracking.

## 🚀 Features

### User Features
- **Event Übersicht**: Matrix-Ansicht aller Events und Spieler
- **Zu-/Absagen**: Einfache Anmeldung per Klick mit Status (grün/rot)
- **Zusätzliche Spieler**: Angabe von Begleitpersonen (+1, +2, +3)
- **Equipment Management**: Auswahl mitgebrachter Utensilien (Ball, Pumpe, Überzieher)
- **Kommentare**: Optional Notizen zur Anmeldung hinzufügen
- **Teilnehmerzahl**: Automatische Berechnung inkl. zusätzlicher Spieler

### Admin Features
- **Event-Verwaltung**: Events erstellen, bearbeiten und löschen
- **Spieler-Verwaltung**: Spieler aktivieren/blockieren
- **Equipment-Übersicht**: Wer bringt was zu welchem Event mit
- **Echtzeit-Updates**: Alle Änderungen sofort sichtbar

### Technische Features
- **Progressive Web App**: Installierbar auf Smartphone und Desktop
- **Offline-Support**: Service Worker für grundlegende Offline-Funktionalität
- **Responsive Design**: Optimiert für Mobile und Desktop
- **Sichere Authentifizierung**: JWT-basiertes Login-System

## 📋 Tech Stack

### Backend
- Node.js + Express
- TypeScript
- Supabase (PostgreSQL)
- JWT Authentication
- bcrypt für Password Hashing

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- date-fns (Datum-Formatierung)
- Lucide Icons

## 🛠️ Installation & Setup

### 1. Supabase Setup

1. Erstelle einen Account auf [Supabase](https://supabase.com)
2. Erstelle ein neues Projekt
3. Gehe zum SQL Editor und führe das Schema aus:

```bash
# SQL Schema befindet sich in:
backend/supabase-schema.sql
```

4. Notiere dir folgende Werte aus den Project Settings:
   - Project URL
   - Anon Key
   - Service Role Key

### 2. Backend Setup

```bash
cd backend

# Dependencies installieren
npm install

# Environment Variables konfigurieren
cp .env.example .env

# .env bearbeiten und folgende Werte eintragen:
# SUPABASE_URL=dein_supabase_url
# SUPABASE_ANON_KEY=dein_anon_key
# SUPABASE_SERVICE_ROLE_KEY=dein_service_role_key
# JWT_SECRET=ein_sicheres_random_secret

# Development Server starten
npm run dev

# Für Production Build
npm run build
npm start
```

### 3. Frontend Setup

```bash
cd frontend

# Dependencies installieren
npm install

# Environment Variables konfigurieren
cp .env.local.example .env.local

# .env.local bearbeiten:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Development Server starten
npm run dev

# Für Production Build
npm run build
npm start
```

## 🚢 Deployment

### Backend auf Vercel

1. Pushe den Code zu GitHub
2. Verbinde das Backend-Repository mit Vercel
3. Konfiguriere Environment Variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `FRONTEND_URL` (deine Frontend URL)

4. Deploy!

### Frontend auf Vercel

1. Verbinde das Frontend-Repository mit Vercel
2. Konfiguriere Environment Variables:
   - `NEXT_PUBLIC_API_URL` (deine Backend URL)

3. Deploy!

## 📱 PWA Installation

### Mobile (iOS/Android)
1. Öffne die App im Browser
2. Klicke auf "Zum Startbildschirm hinzufügen"
3. Die App ist jetzt wie eine native App nutzbar

### Desktop (Chrome/Edge)
1. Öffne die App im Browser
2. Klicke auf das Install-Icon in der Adressleiste
3. Die App wird als Desktop-App installiert

## 🔐 Default Admin Account

Nach dem Setup des Schemas ist ein Admin-Account verfügbar:
- **E-Mail**: admin@sports.com
- **Passwort**: admin123

⚠️ **WICHTIG**: Ändere das Passwort nach dem ersten Login!

## 📊 Datenbank Schema

### Tables

**users**
- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- is_admin (Boolean)
- is_active (Boolean)

**events**
- id (UUID, Primary Key)
- title (String)
- date (Date)
- time_from (Time)
- time_to (Time)
- location (String)
- created_by (UUID, Foreign Key → users)

**attendances**
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key → users)
- event_id (UUID, Foreign Key → events)
- status (Enum: 'confirmed' | 'declined')
- additional_players (Integer)
- comment (Text, Optional)

**equipment**
- id (UUID, Primary Key)
- attendance_id (UUID, Foreign Key → attendances)
- type (Enum: 'ball' | 'pump' | 'overboots')

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Neuen User registrieren
- `POST /api/auth/login` - Einloggen
- `GET /api/auth/me` - Aktuellen User abrufen

### Users (Admin only)
- `GET /api/users` - Alle User abrufen
- `PATCH /api/users/:userId/status` - User aktivieren/blockieren

### Events
- `GET /api/events` - Alle Events mit Attendances
- `POST /api/events` - Event erstellen (Admin)
- `PATCH /api/events/:eventId` - Event bearbeiten (Admin)
- `DELETE /api/events/:eventId` - Event löschen (Admin)
- `GET /api/events/:eventId/equipment` - Equipment-Übersicht

### Attendance
- `POST /api/attendance/:eventId` - Attendance erstellen/aktualisieren
- `DELETE /api/attendance/:eventId` - Attendance löschen

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle einen Pull Request.

## 📄 License

MIT License

## 🐛 Bekannte Probleme / Todos

- [ ] E-Mail Benachrichtigungen bei neuen Events
- [ ] Export-Funktion für Teilnehmerlisten
- [ ] Recurring Events
- [ ] Calendar-Integration
- [ ] Push Notifications

## 💡 Tipps

### PWA-Manifest anpassen
Die PWA-Konfiguration findest du in:
```
frontend/public/manifest.json
```

### Icons ersetzen
Platziere deine eigenen Icons in:
```
frontend/public/icon-192.png
frontend/public/icon-512.png
frontend/public/favicon.ico
```

### Styling anpassen
Die Tailwind-Config befindet sich in:
```
frontend/tailwind.config.js
```

## 📞 Support

Bei Fragen oder Problemen öffne ein Issue auf GitHub.
