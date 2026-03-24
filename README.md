# LedgerFlow

LedgerFlow is a production-shaped vendor payment management and accounts payable platform built with Next.js, TypeScript, and Tailwind CSS.

## What’s included

- Premium SaaS landing page and auth flow
- Dashboard, vendors, invoices, payments, approvals, documents, AI assistant, analytics, notifications, stores, and settings modules
- Typed mock business data designed for later API, Supabase, or Firebase integration
- Reusable UI primitives and chart components
- Deployment-ready Next.js configuration with CI checks

## Local development

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Local preview: `http://localhost:3000`

## Environment setup

Copy `.env.example` to `.env.local` and fill values as needed.

## Publish / deploy

### Vercel

1. Import the repository into Vercel.
2. Framework preset: `Next.js`
3. Install command: `npm install`
4. Build command: `npm run build`
5. Output setting: leave default, or use the generated standalone build if you deploy to your own container target.

### Firebase App Hosting

1. Connect this repo to Firebase App Hosting.
2. Use the existing [`apphosting.yaml`](/Users/arun/Desktop/App/Payment%20mangement/Payment-Management-app/apphosting.yaml).
3. Set the same environment variables you use in `.env.local`.
4. Deploy after `npm run build` succeeds in CI.

## CI

GitHub Actions is configured in [ci.yml](/Users/arun/Desktop/App/Payment%20mangement/Payment-Management-app/.github/workflows/ci.yml) to run install, typecheck, and production build on pushes and pull requests.

## Notes

- Core mock domain data lives in [`src/lib/platform-data.ts`](/Users/arun/Desktop/App/Payment%20mangement/Payment-Management-app/src/lib/platform-data.ts).
- Reusable app components live under [`src/components/platform`](/Users/arun/Desktop/App/Payment%20mangement/Payment-Management-app/src/components/platform).
- The build no longer ignores type or lint problems during publish-time compilation.
