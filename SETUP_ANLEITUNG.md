# 🚀 SETUP ANLEITUNG - Sports Attendance PWA

## Schritt-für-Schritt Installation

### 1️⃣ Supabase Setup (Datenbank)

1. **Supabase Account erstellen**
   - Gehe zu https://supabase.com
   - Erstelle einen kostenlosen Account
   - Erstelle ein neues Projekt

2. **Datenbank Schema ausführen**
   - Öffne den SQL Editor in Supabase (linkes Menü)
   - Öffne die Datei `backend/supabase-schema.sql`
   - Kopiere den gesamten SQL Code
   - Füge ihn im SQL Editor ein und führe ihn aus (RUN)

3. **API Keys notieren**
   - Gehe zu Project Settings → API
   - Notiere dir:
     - `Project URL` (z.B. https://xxxxx.supabase.co)
     - `anon public key`
     - `service_role key` (geheim!)

---

### 2️⃣ GitHub Repository erstellen

1. **Erstelle ein neues GitHub Repository**
   - Gehe zu https://github.com/new
   - Name: `sports-attendance-pwa` (oder wie du möchtest)
   - Private oder Public
   - NICHT initialisieren mit README/gitignore

2. **Code hochladen**
   ```bash
   cd sports-attendance-pwa
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/sports-attendance-pwa.git
   git push -u origin main
   ```

---

### 3️⃣ Backend auf Vercel deployen

1. **Vercel Account erstellen**
   - Gehe zu https://vercel.com
   - Registriere dich mit GitHub

2. **Backend deployen**
   - Klicke auf "Add New..." → "Project"
   - Wähle dein `sports-attendance-pwa` Repository
   - **WICHTIG**: Setze "Root Directory" auf `backend`
   - Gehe zu "Environment Variables"
   - Füge folgende Variablen hinzu:

   ```
   SUPABASE_URL = deine_supabase_url
   SUPABASE_ANON_KEY = dein_anon_key
   SUPABASE_SERVICE_ROLE_KEY = dein_service_role_key
   JWT_SECRET = ein_langes_zufälliges_passwort_mindestens_32_zeichen
   NODE_ENV = production
   FRONTEND_URL = https://deine-frontend-url.vercel.app
   ```

   > ⚠️ Für `FRONTEND_URL` kannst du erstmal einen Platzhalter nehmen, wir aktualisieren das später

3. **Deploy klicken!**
   - Notiere dir die Backend URL (z.B. https://sports-attendance-backend.vercel.app)

---

### 4️⃣ Frontend auf Vercel deployen

1. **Neues Projekt in Vercel**
   - Klicke wieder auf "Add New..." → "Project"
   - Wähle das **gleiche** Repository
   - **WICHTIG**: Setze "Root Directory" auf `frontend`
   - Gehe zu "Environment Variables"
   - Füge hinzu:

   ```
   NEXT_PUBLIC_API_URL = https://deine-backend-url.vercel.app/api
   ```

2. **Deploy klicken!**
   - Notiere dir die Frontend URL

3. **Backend FRONTEND_URL aktualisieren**
   - Gehe zurück zum Backend-Projekt in Vercel
   - Settings → Environment Variables
   - Editiere `FRONTEND_URL` mit deiner echten Frontend URL
   - Redeploy das Backend (Deployments → ... → Redeploy)

---

### 5️⃣ Erste Schritte in der App

1. **Admin Login**
   - Öffne deine Frontend URL
   - Login mit:
     - E-Mail: `admin@sports.com`
     - Passwort: `admin123`

2. **Passwort ändern** (empfohlen!)
   - Im Supabase Dashboard → Table Editor → users
   - Finde den Admin User
   - Ändere das Passwort (muss mit bcrypt gehashed sein)
   - Oder erstelle einen neuen Admin über SQL

3. **Erstes Event erstellen**
   - Klicke auf das Settings-Icon (oben rechts)
   - Gehe zu "Events verwalten"
   - Klicke "Neues Event"
   - Fülle die Daten aus und speichere

4. **Spieler hinzufügen**
   - Neue Spieler können sich selbst registrieren
   - Oder du erstellst sie manuell in Supabase

---

### 6️⃣ PWA Installation (optional)

#### Auf dem Smartphone:
1. Öffne die App im Browser
2. Klicke auf "Zum Startbildschirm hinzufügen" (iOS) oder "Installieren" (Android)
3. Die App erscheint wie eine native App

#### Auf dem Desktop:
1. Öffne die App in Chrome/Edge
2. Klicke auf das Install-Icon in der Adressleiste
3. Die App wird installiert

---

## 🔧 Lokale Entwicklung (optional)

Falls du lokal entwickeln möchtest:

### Backend lokal

```bash
cd backend
npm install
cp .env.example .env
# .env mit deinen Supabase-Daten füllen
npm run dev
```

Läuft auf http://localhost:3001

### Frontend lokal

```bash
cd frontend
npm install
cp .env.local.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
npm run dev
```

Läuft auf http://localhost:3000

---

## 🎨 Customization

### Icons anpassen
Ersetze folgende Dateien:
- `frontend/public/icon-192.png` (192x192 px)
- `frontend/public/icon-512.png` (512x512 px)
- `frontend/public/favicon.ico`

### App-Name ändern
- `frontend/public/manifest.json` → `name` und `short_name`
- `frontend/src/pages/_document.tsx` → Meta-Tags

### Farben anpassen
- `frontend/tailwind.config.js` → `theme.extend.colors`

---

## 🐛 Troubleshooting

### Backend startet nicht
- Überprüfe alle Environment Variables in Vercel
- Schaue in die Deployment Logs (Vercel)
- JWT_SECRET muss gesetzt sein

### Frontend kann Backend nicht erreichen
- Überprüfe `NEXT_PUBLIC_API_URL` (muss /api am Ende haben)
- Überprüfe CORS-Einstellungen im Backend
- `FRONTEND_URL` im Backend muss stimmen

### Login funktioniert nicht
- Überprüfe ob das Supabase Schema ausgeführt wurde
- Überprüfe die Supabase Credentials im Backend
- Default Admin: admin@sports.com / admin123

### Datenbank-Fehler
- Überprüfe ob alle Tables existieren (Supabase → Table Editor)
- RLS Policies müssen aktiviert sein
- Service Role Key muss korrekt sein

---

## 📞 Support

Bei Problemen:
1. Schaue in die Vercel Deployment Logs
2. Überprüfe Browser Console (F12)
3. Überprüfe Supabase Logs

---

## ✅ Checkliste

- [ ] Supabase Projekt erstellt
- [ ] SQL Schema ausgeführt
- [ ] API Keys notiert
- [ ] GitHub Repository erstellt
- [ ] Backend auf Vercel deployed
- [ ] Frontend auf Vercel deployed
- [ ] FRONTEND_URL im Backend aktualisiert
- [ ] App getestet und funktioniert
- [ ] Admin-Passwort geändert (empfohlen)
- [ ] Erste Events erstellt
- [ ] PWA installiert (optional)

---

## 🎉 Fertig!

Deine Sports Attendance App ist jetzt live und einsatzbereit!

Viel Spaß beim Organisieren deiner Sportevents! ⚽🏀🎾
