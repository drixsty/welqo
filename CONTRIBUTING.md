# Contributing to Welqo

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Monorepo | Turborepo               |
| API      | NestJS + TypeScript     |
| Web      | Next.js 14 (App Router) |
| Mobile   | React Native (Expo)     |
| Database | PostgreSQL 16 + Prisma  |
| Cache    | Redis 7                 |
| Payments | Stripe                  |
| PMS      | Beds24 API v2           |
| Infra    | Docker + Docker Compose |
| CI/CD    | GitHub Actions          |

---

## Setup

```bash
# Prerequisites: Node 20+, Docker Desktop

git clone https://github.com/your-org/welqo.git
cd welqo

# Install all dependencies
npm install

# Copy env files
cp .env.example .env
# Fill in: DATABASE_URL, REDIS_URL, STRIPE_SECRET_KEY, BEDS24_API_KEY

# Start infrastructure (postgres + redis)
docker-compose up -d postgres redis

# Run migrations
npm run db:migrate

# Start all apps in dev mode
npm run dev
```

**Running services:**

- API: http://localhost:3001
- API Docs (Swagger): http://localhost:3001/docs
- Storefront: http://localhost:3000
- Dashboard: http://localhost:3002
- Prisma Studio: `npm run db:studio`

---

## Git Branching Strategy

```
main          ← Production. Protected. Requires PR + CI pass.
develop       ← Integration branch. All features merge here first.
feature/*     ← Feature branches (e.g. feature/US-B03-stripe-payment)
fix/*         ← Bug fixes (e.g. fix/api-double-booking)
release/*     ← Release candidates (e.g. release/v1.1.0)
hotfix/*      ← Emergency production fixes
```

### Branch naming

```bash
# Feature (reference the PRD US-ID)
git checkout -b feature/US-B03-stripe-payment

# Bug fix
git checkout -b fix/api-double-booking-race-condition

# Chore
git checkout -b chore/deps-update-prisma-5
```

---

## Commit Convention (Conventional Commits)

All commits MUST follow this format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer: Closes #123]
```

### Types

| Type       | Use                              |
| ---------- | -------------------------------- |
| `feat`     | New feature                      |
| `fix`      | Bug fix                          |
| `docs`     | Documentation only               |
| `refactor` | No behavior change               |
| `perf`     | Performance improvement          |
| `test`     | Tests only                       |
| `chore`    | Build, deps, config              |
| `ci`       | CI/CD pipeline                   |
| `wip`      | Work in progress (never on main) |

### Scopes

`api` · `web-storefront` · `web-dashboard` · `mobile-dashboard` · `mobile-tenant` · `types` · `ui` · `beds24-client` · `stripe-client` · `config` · `infra` · `ci` · `docs` · `deps`

### Examples

```bash
feat(api): add stripe webhook handler for payment confirmation
fix(web-storefront): handle beds24 sync failure gracefully on calendar
refactor(types): extract BookingKpis to separate interface
test(api): add integration tests for booking creation flow
chore(deps): upgrade prisma to 5.13.0
ci(ci): add codecov coverage upload step
docs(api): document beds24 sync reconciliation job
```

---

## Pull Request Workflow

1. **Branch from `develop`** (never from `main` except hotfixes)
2. **One PR = one user story** (reference the PRD US-ID in title)
3. **PR title must follow commit convention:** `feat(api): US-B03 stripe payment flow`
4. **Fill the PR template** completely — acceptance criteria checklist is mandatory
5. **CI must pass** before merge (lint + type-check + tests + build)
6. **Squash merge** into `develop` to keep history clean

---

## Running Tests

```bash
# All tests (affected packages only, uses Turbo cache)
npm run test

# Specific app
npx turbo run test --filter=api

# Watch mode
cd apps/api && npx jest --watch

# E2E (requires running Docker stack)
npm run test:e2e --filter=api
```

---

## Dev Tracking — Linking PRD to Code

Every feature branch and PR title MUST reference a PRD user story ID.

| PRD ID  | Feature               | Branch pattern                    |
| ------- | --------------------- | --------------------------------- |
| US-A01  | Homepage              | `feature/US-A01-homepage`         |
| US-A02  | Property detail       | `feature/US-A02-property-detail`  |
| US-B01  | Calendar availability | `feature/US-B01-calendar`         |
| US-B02  | Booking form          | `feature/US-B02-booking-form`     |
| US-B03  | Stripe payment        | `feature/US-B03-stripe-payment`   |
| US-B04  | Cancellation          | `feature/US-B04-cancellation`     |
| US-C01  | Auth                  | `feature/US-C01-owner-auth`       |
| US-C02  | KPI dashboard         | `feature/US-C02-kpi-dashboard`    |
| US-C03  | Owner calendar        | `feature/US-C03-owner-calendar`   |
| US-C04  | Financials            | `feature/US-C04-financials`       |
| TECH-01 | Beds24 sync           | `feature/TECH-01-beds24-sync`     |
| TECH-02 | Stripe webhooks       | `feature/TECH-02-stripe-webhooks` |
| TECH-03 | Reconciliation job    | `feature/TECH-03-reconciliation`  |
| TECH-04 | Transactional emails  | `feature/TECH-04-emails`          |
| TECH-05 | 404 + error pages     | `feature/TECH-05-error-pages`     |

---

## Environment Variables

| Variable                             | Required | Description                                    |
| ------------------------------------ | -------- | ---------------------------------------------- |
| `DATABASE_URL`                       | ✅       | PostgreSQL connection string                   |
| `REDIS_URL`                          | ✅       | Redis connection string                        |
| `JWT_SECRET`                         | ✅       | JWT signing secret (min 32 chars)              |
| `STRIPE_SECRET_KEY`                  | ✅       | Stripe secret key (sk*test*... or sk*live*...) |
| `STRIPE_WEBHOOK_SECRET`              | ✅       | Stripe webhook signing secret                  |
| `BEDS24_API_KEY`                     | ✅       | Beds24 API v2 token                            |
| `NEXT_PUBLIC_API_URL`                | ✅       | API base URL for Next.js apps                  |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅       | Stripe publishable key                         |
| `SYNC_INTERVAL_MS`                   | ❌       | Beds24 sync interval (default: 600000)         |
