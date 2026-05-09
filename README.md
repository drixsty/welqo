# Welqo — Airbnb Concierge Platform

> Transparency for property owners. Excellence for guests.

## Applications

| App                | Description                     | URL (dev)             |
| ------------------ | ------------------------------- | --------------------- |
| `web-storefront`   | Public website + direct booking | http://localhost:3000 |
| `web-dashboard`    | Owner + Admin + Ops dashboard   | http://localhost:3002 |
| `mobile-dashboard` | React Native app (V2)           | —                     |
| `mobile-tenant`    | Tenant mobile app (V2)          | —                     |
| `api`              | NestJS REST API                 | http://localhost:3001 |

## Quick Start

```bash
# Install
npm install

# Start infrastructure
docker-compose up -d postgres redis

# Migrate database
npm run db:migrate

# Start all apps
npm run dev
```

## Documentation

- [Contributing Guide](./CONTRIBUTING.md)
- [Architecture Decisions](./docs/adr/)
- [PRD — Product Requirements](./docs/PRD_Welqo_V1.md)
- [API Docs](http://localhost:3001/docs) (Swagger, dev only)

## Commit Convention

```
feat(api): US-B03 stripe payment confirmation flow
fix(web-storefront): handle calendar sync error state
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full convention.
