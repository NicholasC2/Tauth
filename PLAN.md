# Tauth (MVP Plan)

Tauth is the central auth system for all Tapps (TchaT, Tmail, etc).

---

# 1. Core Idea

- One login system for all Tapps
- Users authenticate once → use all apps
- Apps are identified by `clientId`
- Permissions are controlled via scopes

---

# 2. Tech Stack

- Node.js backend
- Drizzle ORM
- PostgreSQL (Docker for dev)
- JWT + refresh tokens

---

# 3. Database (minimal)

## users
- id
- username
- email
- passwordHash

## apps
- id
- name
- clientId
- clientSecretHash
- allowedScopes

## sessions
- id
- userId
- appId
- refreshTokenHash
- expiresAt

---

# 4. Auth Flow (simple OAuth-style)

1. Tapp redirects user to:
   /login?client_id=tchat

2. User logs in on Tauth

3. Tauth redirects back:
   /callback?code=abc123

4. Tapp backend exchanges code:
   POST /oauth/token

5. Tauth returns:
   - accessToken (JWT)
   - refreshToken

---

# 5. Tokens

## Access token (JWT)
Contains:
- userId
- appId
- scopes

Short-lived (15m–1h)

## Refresh token
Long-lived, stored hashed in DB

---

# 6. Permissions (Scopes)

Default:
- profile:read

Optional:
- email:read
- profile:update
- messages:write

Rules:
- Tauth controls what each app is allowed to request
- User must consent to scopes

---

# 7. Security Rules

- NEVER store plaintext passwords
- NEVER expose clientSecret to frontend
- ALWAYS hash:
  - passwords
  - client secrets
  - refresh tokens

- Only Tauth talks to DB directly

---

# 8. App Model

Each Tapp must register:

- clientId (public)
- clientSecret (private)
- allowedScopes

Example:
TchaT → profile:read, messages:write

---

# 9. Dev Setup

- PostgreSQL via Docker
- Drizzle schema + migrations
- Node API server

---

# 10. Goal

A single identity system for:

- TchaT
- Tmail
- Tadmin
- future Tapps

Result:
- One login
- Shared identity
- Strict app permissions
