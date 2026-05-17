# Payment Management App

Vendor payment and accounts payable platform prototype for multi-location businesses, built with Next.js, TypeScript, Firebase-ready hosting, and Genkit AI workflow foundations.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-React-blue)
![Firebase](https://img.shields.io/badge/Firebase-App%20Hosting-orange)
![AI](https://img.shields.io/badge/AI-Genkit%20Workflow-0f766e)

## Live Demo / Website / Related Links

No live demo is currently published for this repository.

- Repository: https://github.com/Arungharami/Payment-Management-app
- Lead.AI: https://www.lead-ai.us
- GitHub: https://github.com/Arungharami
- Hugging Face: https://huggingface.co/arun-gharami
- Lead.AI Labs: https://huggingface.co/lead-ai-labs
- Google Scholar: https://scholar.google.com/citations?user=uy4i5soAAAAJ&hl=en

## Overview

Payment Management App is a Next.js product prototype for vendor payments, invoices, approvals, documents, alerts, analytics, and AI-assisted accounts payable operations. The current UI is branded as **LedgerFlow** and is structured for retail stores, wholesalers, pharmacies, liquor stores, grocery stores, and multi-location operators.

The repository is best understood as a portfolio-ready frontend and product architecture prototype. It includes typed mock domain data, a polished dashboard experience, Firebase App Hosting configuration, CI workflow, and a Genkit-based fraud detection flow foundation.

## Problem Solved

Small and mid-sized businesses often manage vendor payments through spreadsheets, paper invoices, emails, and disconnected bank workflows. That creates operational risk: missed due dates, duplicate payments, weak approval control, poor cash-flow visibility, and limited audit history.

This prototype demonstrates how an accounts payable platform could organize vendor records, invoice queues, payment readiness, approval status, document tracking, alerts, analytics, and AI-supported payment review in one command center.

## Key Features

| Feature | Description |
| --- | --- |
| Executive dashboard | Shows payable metrics, invoice queues, upcoming payments, approval bottlenecks, and cash-flow snapshots |
| Vendor management | Models vendor profiles, payment terms, payment methods, risk levels, balances, notes, and tags |
| Invoice tracking | Represents draft, pending, approved, scheduled, paid, overdue, partial, and cancelled invoice states |
| Payment operations | Models ACH, wire, card, and check workflows with scheduled, processing, completed, and failed statuses |
| Approval workflow | Includes approver roles, comments, submitted dates, due dates, and approval status |
| Document management | Organizes invoices, contracts, receipts, tax documents, payment confirmations, and internal records |
| AI assistant concept | Provides a UI surface for AP questions, overdue analysis, approval summaries, and prioritization prompts |
| Fraud detection flow | Includes a Genkit flow for vendor payment fraud assessment using structured input/output schemas |
| Analytics and alerts | Includes store health, spending trends, payment method mix, notifications, activity, and audit log concepts |
| CI workflow | GitHub Actions runs install, type-check, and production build on PRs and main pushes |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15, App Router |
| Language | TypeScript |
| UI | React, Radix UI primitives, shadcn/ui-style components |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Forms and validation | React Hook Form, Zod |
| AI workflow | Genkit, `@genkit-ai/google-genai`, Gemini model configuration |
| Hosting foundation | Firebase App Hosting config in `apphosting.yaml` |
| Data layer | Typed local/mock data in `src/lib/platform-data.ts` |
| CI | GitHub Actions |

## Architecture / Folder Structure

```text
Payment-Management-app/
|-- .github/
|   `-- workflows/
|       `-- ci.yml
|-- docs/
|   `-- blueprint.md
|-- src/
|   |-- ai/
|   |   |-- flows/
|   |   |-- dev.ts
|   |   `-- genkit.ts
|   |-- app/
|   |   |-- (auth)/
|   |   |-- (main)/
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- dashboard/
|   |   |-- history/
|   |   |-- layout/
|   |   |-- platform/
|   |   |-- stores/
|   |   |-- ui/
|   |   `-- vendors/
|   |-- hooks/
|   `-- lib/
|-- apphosting.yaml
|-- package.json
|-- tailwind.config.ts
|-- tsconfig.json
`-- README.md
```

Important files:

- `src/app/page.tsx` contains the public LedgerFlow landing page.
- `src/app/(main)/dashboard/page.tsx` contains the financial command center.
- `src/lib/platform-data.ts` defines the typed mock domain model and sample data.
- `src/app/(main)/assistant/page.tsx` contains the AP assistant product surface.
- `src/ai/flows/fraud-detection.ts` defines the Genkit vendor payment fraud assessment flow.
- `.github/workflows/ci.yml` runs install, type-check, and build.

## Setup Instructions

Prerequisites:

- Node.js 20 or newer
- npm

Install dependencies:

```bash
git clone https://github.com/Arungharami/Payment-Management-app.git
cd Payment-Management-app
npm install
```

Run the local development server:

```bash
npm run dev
```

Open the local URL printed by Next.js, commonly:

```text
http://localhost:3000
```

Run the Genkit developer server:

```bash
npm run genkit:dev
```

Run Genkit in watch mode:

```bash
npm run genkit:watch
```

Build for production:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

Type-check the project:

```bash
npm run typecheck
```

## Usage Flow

1. Open `/` to review the LedgerFlow product landing page.
2. Use `/login`, `/signup`, and `/forgot-password` to review the auth screens.
3. Open `/dashboard` to review payable exposure, invoice queues, upcoming payments, and approval status.
4. Review `/vendors`, `/invoices`, `/payments`, `/approvals`, `/documents`, `/stores`, `/history`, and `/analytics` for AP workflow coverage.
5. Open `/assistant` to review the AI assistant concept and quick AP prompts.
6. Review `/notifications`, `/settings`, and `/profile` for supporting operations screens.
7. Inspect `src/lib/platform-data.ts` to understand the current mock data model before adding a real backend.

## Screenshots Section

Screenshots are not currently included in the repository.

Recommended future screenshot paths:

```text
assets/screenshots/
|-- landing-page.png
|-- dashboard.png
|-- vendors.png
|-- invoices.png
|-- approvals.png
|-- payments.png
|-- assistant.png
`-- analytics.png
```

## Results / Metrics / Model Notes

This repository is an AI-enabled product prototype, not a trained model benchmark repository.

Current AI/model status:

- `src/ai/genkit.ts` configures Genkit with the Google AI plugin and `googleai/gemini-2.5-flash`.
- `src/ai/flows/fraud-detection.ts` defines a structured fraud assessment flow for vendor payments.
- The assistant page currently presents a product UI concept using local mock data and prompt examples.
- No production payment processor, bank API, database, authentication provider, or live AI deployment is documented in the repository.

Before real financial use, this project would need a secure backend, role-based access control, payment provider integration, audit logging, approval controls, data retention rules, and compliance review.

## Security Notes

- Do not commit `.env` files, API keys, Firebase service accounts, Genkit/Gemini credentials, payment processor secrets, bank credentials, or customer financial records.
- Keep AI provider, payment, bank, and Firebase admin credentials server-side.
- Treat vendor bank details, tax documents, invoices, payment confirmations, and audit logs as sensitive financial data.
- Use tokenized payment methods and least-privilege access control for real integrations.
- Keep human approval controls around AI-assisted payment or fraud recommendations.
- The current repository uses mock/demo data and should not be used for real payment processing without production security work.

## Roadmap

- Add repository-owned screenshots and a hosted demo link.
- Add environment variable documentation for future Genkit/Firebase setup.
- Replace mock data with a secure backend or Firebase persistence layer.
- Add authentication and role-based access control.
- Add audit log persistence for vendor, invoice, approval, and payment changes.
- Integrate payment processor or banking APIs only after security review.
- Add invoice OCR and document ingestion workflows.
- Connect AI assistant responses to controlled business data retrieval.
- Add explainable fraud/payment prioritization notes and human review safeguards.
- Expand CI with linting and end-to-end tests.

## Author / Contact

**Arun Kumar Gharami**

AI Engineer | Applied Researcher | QA Automation Engineer

- Lead.AI: https://www.lead-ai.us
- GitHub: https://github.com/Arungharami
- Hugging Face: https://huggingface.co/arun-gharami
- Lead.AI Labs: https://huggingface.co/lead-ai-labs
- Google Scholar: https://scholar.google.com/citations?user=uy4i5soAAAAJ&hl=en

## License Note

No license file was confirmed during this documentation pass. Add a license before external reuse, distribution, or collaboration.
