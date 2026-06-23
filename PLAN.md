# Tauth — Authentication System for T Ecosystem

Tauth is the central identity provider for all Tapps (TchaT, Tmail, Tadmin, etc).

It handles:
- User accounts
- App registration (Tapps)
- Authentication (login/logout)
- OAuth-style tokens
- Permissions / scopes
- Session management

---

# 1. Architecture Overview

## Components

Tapps (frontend + backend)
        ↓
     Tauth API
        ↓
 PostgreSQL (via Drizzle ORM)

## Key idea
- Tapps NEVER directly access the database
- Only Tauth manages users + permissions
- Tapps only receive tokens

---

# 2. Tech Stack

## Backend
- Node.js (or Next.js API routes / Express)
- Drizzle ORM
- PostgreSQL (Docker for dev)

## Auth
- JWT access tokens
- Refresh tokens
- OAuth-style flow (simplified)

## DB
- PostgreSQL (primary)
- SQLite optional for local experiments

---

# 3. Database Schema (Drizzle)

## Users
- id
- username
- email
- passwordHash
- createdAt

## Apps (Tapps)
- id
- name
- clientId (public)
- clientSecretHash (private)
- allowedScopes

## Sessions
- id
- userId
- appId
- refreshTokenHash
- expiresAt

## Permissions / Scopes
- userId
- appId
- scopes[]

---

# 4. Security Model

## Secrets
- clientSecret ONLY stored in Tauth DB (hashed)
- NEVER exposed to frontend
- ONLY used in backend server-to-server auth

## App ID
- Public
- Safe to expose in frontend
- Used to identify which Tapp is requesting login

## Tokens
JWT contains:
- userId
- appId
- scopes

---

# 5. Authentication Flow

## Step 1 — Login request
Frontend (Tapp):

redirect → https://tauth/login?client_id=tchat

---

## Step 2 — User logs in
User enters credentials in Tauth UI.

---

## Step 3 — Redirect back
https://tchat.com/callback?code=abc123

---

## Step 4 — Backend exchange
Tchat backend:

POST /oauth/token
client_id
client_secret
code

Tauth validates:
- app exists
- secret matches
- code is valid

Returns:
- accessToken
- refreshToken

---

## Step 5 — API usage
Authorization: Bearer <accessToken>

Tauth verifies:
- user
- app
- scopes

---

# 6. Permissions System (Scopes)

Default scopes:
- profile:read

Optional scopes:
- email:read
- profile:update
- messages:write
- files:write
- admin:*

Rule:
- Tauth decides allowed scopes per app
- User consents at login

---

# 7. App Registration System

Each Tapp must register in Tauth:

clientId: tchat
name: TchaT
allowedScopes:
  - profile:read
  - email:read

Generate:
- clientSecret (stored hashed)
- redirect URIs
- metadata

---

# 8. Database Setup (Dev)

## Docker PostgreSQL

postgres:
  image: postgres:17
  ports:
    - 5432:5432

Connection:
postgresql://postgres:devpassword@localhost:5432/tauth

---

# 9. Drizzle Setup

Install:
- drizzle-orm
- pg
- drizzle-kit

Flow:
schema.ts → drizzle-kit generate → migrate → DB ready

---

# 10. Folder Structure

tauth/
├── src/
│   ├── auth/
│   ├── users/
│   ├── apps/
│   ├── permissions/
│   ├── sessions/
│   │
│   ├── db/
│   │   ├── schema.ts
│   │   ├── index.ts
│   │
│   ├── routes/
│   │   ├── login.ts
│   │   ├── oauth.ts
│   │   ├── users.ts
│   │
│   └── server.ts
│
├── drizzle.config.ts
├── docker-compose.yml
└── .env

---

# 11. Security Rules

NEVER:
- store plaintext passwords
- expose client secrets to frontend
- allow apps to modify other apps’ permissions
- trust frontend for auth decisions

ALWAYS:
- hash passwords (argon2/bcrypt)
- hash client secrets
- validate scopes server-side
- treat JWT as read-only identity

---

# 12. Future Upgrades

- OAuth2 full compliance
- PKCE support for SPA/mobile apps
- Multi-factor authentication
- Admin dashboard
- Rate limiting per app
- Audit logs
- SSO across all Tapps

---

# 13. Goal

One login system for all Tapps:

- TchaT
- Tmail
- Tadmin
- Tany future Tapp

Single identity, multiple apps, strict permissions.
