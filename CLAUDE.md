# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Tennis Connect México" - a Next.js web application for connecting tennis players in Mexico. The platform allows users to find tennis courts, create posts to find playing partners, and connect with other players in their area.

## Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Frontend**: React 19.1.0, Tailwind CSS, Framer Motion for animations
- **Backend**: Next.js API routes with MongoDB/Mongoose
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with Google OAuth integration
- **Maps**: Leaflet with React-Leaflet for interactive maps
- **External APIs**: Overpass API for tennis court data
- **Styling**: Tailwind CSS with PostCSS

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Structure

### Core Directories

- `/app` - Next.js App Router pages and API routes
- `/components` - Reusable React components organized by feature
- `/lib` - Utilities, database models, and services
- `/public` - Static assets including tennis court images

### Key Architecture Components

**Database Models** (`/lib/models/`):
- `User.js` - Complete user profile with tennis-specific fields (level, availability, location)
- `Post.js` - Tennis match posts with location, game details, and expiration

**Services** (`/lib/services/`):
- `overpassService.js` - Tennis court data fetching with fallback to mock data
- `playersService.js` - Player matching and discovery logic

**Authentication** (`/lib/auth.js`):
- JWT token generation and verification
- Integration with Google OAuth

**Database Connection** (`/lib/mongodb.js`):
- MongoDB connection with caching for serverless environments

### Component Organization

**Layout Components** (`/components/layout/`):
- `Header.jsx` - Main navigation with authentication modals
- `Footer.jsx` - Site footer

**Feature Components**:
- `/components/auth/` - Login/register modals and Google OAuth callback
- `/components/map/` - Interactive tennis court maps
- `/components/players/` - Player cards and post management
- `/components/sections/` - Main page sections (hero, features, etc.)

### API Routes

All located in `/app/api/`:
- `/auth/` - User registration, login, and Google OAuth
- `/posts/` - CRUD operations for tennis match posts

## Environment Variables Required

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- Google OAuth credentials for authentication

## Key Features

1. **Tennis Court Discovery**: Uses Overpass API to find tennis courts with intelligent fallback to mock data
2. **Player Matching**: Location-based matching with tennis skill levels and preferences
3. **Post System**: Users can create posts to find tennis partners with detailed game preferences
4. **Interactive Maps**: Leaflet-based maps showing tennis courts and player locations
5. **Responsive Design**: Mobile-first design with Tailwind CSS

## Development Notes

- All pages use Spanish locale (`es_MX`)
- MongoDB indexes are set up for geospatial queries on user and post locations
- The Overpass service includes retry logic and caching for reliability
- Google Fonts (Geist) are preloaded for performance
- Critical tennis court images are preloaded based on device size

## Database Design

Users have comprehensive tennis profiles including skill level, play style, availability schedules, and location preferences. Posts include detailed game information (court type, duration, skill level) and automatic expiration after 7 days.