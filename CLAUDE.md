# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TennisMx is a Next.js application for connecting tennis players in Mexico. Built on the ShipFast boilerplate, it combines a SaaS platform foundation with tennis-specific matchmaking functionality.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Dual auth system
  - NextAuth for SaaS/Stripe features (`/api/auth`)
  - Custom JWT auth for tennis features (`/api-tennis/auth`)
- **Styling**: Tailwind CSS + DaisyUI
- **Maps**: Leaflet + React-Leaflet
- **Payment**: Stripe
- **Email**: Resend

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Linting
npm run lint

# Generate sitemap (runs automatically after build)
npm run postbuild
```

## Architecture

### Dual Application Structure

The codebase supports two distinct applications:

1. **ShipFast SaaS** (legacy/original)
   - Routes: `/dashboard`, `/blog`, `/tos`, `/privacy-policy`
   - Auth: NextAuth (`/api/auth/[...nextauth]`)
   - Models: `User`, `Lead`
   - Stripe integration for payments

2. **TennisMx Platform** (primary)
   - Routes: `/`, `/matchmaking`, `/create-post`
   - Auth: Custom JWT (`/api-tennis/auth`)
   - Models: `UserTennis`, `Post`
   - Tennis-specific matchmaking features

### Directory Structure

- **`/app`**: Next.js App Router pages and API routes
  - `/api`: ShipFast SaaS API routes (NextAuth, Stripe, leads)
  - `/api-tennis`: Tennis platform API routes (auth, posts)
  - Main pages: Home (`page.js`), matchmaking, create-post

- **`/components`**: React components
  - `/auth`: Authentication components (supports both auth systems)
  - `/tennis`: Tennis-specific UI components
  - `/sections`: Page sections (MapSection, MatchmakingSection, etc.)
  - `/home`: Homepage sections (HeroSection, StatsSection, FeaturesSection)
  - `/map`, `/players`: Map and player-related components
  - Legacy ShipFast components (ButtonCheckout, Pricing, etc.)

- **`/models`**: Mongoose schemas
  - `UserTennis`: Tennis users (location, skill level, availability, stats)
  - `Post`: Match requests (game details, location, responses)
  - `User`: ShipFast users (for SaaS features)
  - `Lead`: Email leads

- **`/libs`**: Utility libraries
  - `/tennis`: Tennis-specific utilities
    - `auth.js`: JWT token generation/verification
    - `mongodb.js`: MongoDB connection for tennis features
    - `/services`: Business logic (overpassService, playersService)
  - ShipFast libs: `stripe.js`, `next-auth.js`, `seo.js`, `resend.js`, etc.

- **`/config.js`**: Central configuration (app settings, Stripe plans, auth URLs, email)

### Database Models

**UserTennis Schema**:
- Authentication: email/password or Google OAuth
- Profile: name, avatar, location with 2dsphere coordinates
- Tennis info: level (Principiante/Intermedio/Avanzado/Profesional), play style, experience, availability schedule
- Preferences: max distance, preferred levels, notifications
- Stats: matches played, rating, wins/losses

**Post Schema**:
- Match details: title, description, level, preferred time
- Game specifics: court type, game type (Individual/Dobles), duration
- Location: address, city, coordinates (2dsphere indexed)
- Communication: chat/WhatsApp options
- Status: active/paused/completed/expired (auto-expires after 7 days)
- Responses array for interested players

### Authentication Flow

**Tennis Auth** (`/api-tennis/auth`):
- Register: POST `/api-tennis/auth/register` (email/password)
- Login: POST `/api-tennis/auth/login` (email/password)
- Google OAuth: GET `/api-tennis/auth/google` → callback with code/state
- Returns JWT token (30-day expiry)
- Token stored in localStorage, sent as Bearer token in requests

**ShipFast Auth** (`/api/auth/[...nextauth]`):
- NextAuth configuration in `/libs/next-auth.js`
- Google OAuth provider
- MongoDB adapter for session storage

### Key Features

1. **Map-based Player Discovery**: Uses Leaflet to show tennis players and courts on a map
2. **Matchmaking Posts**: Users create posts to find tennis partners with specific criteria
3. **Location Services**: Uses Overpass API to find tennis courts (libs/tennis/services/overpassService.js)
4. **Player Matching**: Proximity-based matching using MongoDB 2dsphere indexes

## Environment Variables

Required in `.env.local`:
- `NEXTAUTH_URL`: App URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET`: NextAuth secret
- `GOOGLE_ID`, `GOOGLE_SECRET`: Google OAuth credentials
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret for tennis auth
- `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`: Stripe keys
- `RESEND_API_KEY`: Email API key

## Testing Strategy

When testing tennis features:
1. Use `/matchmaking` route to view posts
2. Create posts via `/create-post` route
3. Test authentication with both email/password and Google OAuth flows
4. Verify location-based queries work with 2dsphere indexes
5. Check post expiration logic (7-day TTL)

## Important Notes

- The app uses client-side components extensively (`"use client"` directives)
- Home page (`/`) handles Google OAuth callback with query params (code, state)
- MongoDB indexes on coordinates fields are critical for location queries
- Posts auto-expire after 7 days using MongoDB TTL indexes
- Two separate user models exist - ensure you're using the correct one (UserTennis vs User)
