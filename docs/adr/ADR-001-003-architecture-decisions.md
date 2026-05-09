# ADR-001 — Turborepo Monorepo Structure

**Date:** 2025-05  
**Status:** Accepted  
**Deciders:** Kevin (Founder + Lead Dev)

---

## Context

Welqo requires multiple applications (storefront, dashboard web, mobile apps, API) that share significant business logic, TypeScript types, and UI components. The question is how to organize this codebase.

## Decision

Use a **Turborepo monorepo** with the following workspace structure:

```
apps/           → Deployable applications (Next.js, NestJS, React Native)
packages/       → Shared libraries (@welqo/types, @welqo/ui, etc.)
```

## Rationale

- **DRY types:** `@welqo/types` is the single source of truth for all TypeScript interfaces — consumed by API, web apps, and mobile apps
- **Turborepo cache:** Build cache (local + remote) means only affected packages rebuild on each commit — critical for solo dev velocity
- **Atomic commits:** A breaking change to a shared type shows up immediately across all consumers in the same PR
- **Simplicity over microservices:** One repo, one CI pipeline, one `docker-compose up`

## Consequences

- All apps must be compatible with Node 20+
- Package versions are managed at the root `package.json` level
- Adding a new app requires adding it to the `turbo.json` pipeline

---

# ADR-002 — NestJS Modular Monolith (Gateway-Ready)

**Date:** 2025-05  
**Status:** Accepted

## Context

The PRD defines 5 bounded contexts: Property, Booking, Payment, Owner, Sync. The question is whether to implement these as separate microservices or as a single modular application.

## Decision

Single **NestJS modular monolith** with clear domain module boundaries, structured to allow future extraction to microservices.

## Rationale

- **Solo dev constraint:** Microservices require infrastructure overhead (message broker, service discovery, distributed tracing) that is premature for a solo founder-dev
- **Bounded contexts are clear:** The 5 contexts are well-defined — extracting to microservices in V3 will be straightforward because domain boundaries are respected from day one
- **Gateway-ready structure:** Each module exposes a clean service interface — adding an API Gateway in front is a configuration change, not a rewrite

## Migration path to microservices (V3)

```
V1: apps/api (monolith, 5 modules)
V3: apps/api-gateway + apps/api-booking + apps/api-payment + ...
```

---

# ADR-003 — Beds24 as Source of Truth for Calendar

**Date:** 2025-05  
**Status:** Accepted

## Context

Calendar availability and bookings need to be consistent between Welqo and Beds24 (PMS). Should Welqo's PostgreSQL database or Beds24 be the source of truth?

## Decision

**Beds24 is the source of truth** for calendar availability and booking status. Welqo's DB is a read-optimized cache synced every 10 minutes via CRON + immediately via Beds24 webhooks.

## Rationale

- Beds24 also syncs with Airbnb and Booking.com — it has the complete picture
- Avoids double-booking risk from having two authoritative sources
- Simplifies the reconciliation job

## Consequence

- All booking creation must write to Beds24 FIRST, then to Welqo DB
- Welqo DB booking records have a `beds24BookingId` foreign key
- A reconciliation job detects and fixes payment/booking state mismatches
