# ToolShare - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Flutter 3.10+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

## Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

API will be available at: `http://localhost:3000`

## Mobile Setup

```bash
cd mobile
flutter pub get
flutter run
```

## Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

Admin panel will be available at: `http://localhost:3001`

## Docker Setup

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- Backend on port 3000

## Database Migration

```bash
psql -h localhost -U toolshare -d toolshare -f database/schema.sql
```

## Default Credentials

- **Database User**: toolshare
- **Database Password**: toolshare_secure_password_123
- **Redis Password**: toolshare_redis_pass_123

⚠️ **Change these in production!**
