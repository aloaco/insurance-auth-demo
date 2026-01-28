# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prior Authorization Demo — a React application for healthcare prior authorization workflows. It simulates submitting new authorizations via a multi-step wizard, viewing a dashboard of existing records, and handling denials/peer-to-peer reviews. All data is mock (no backend).

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (default port 5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
```

No linting, testing, or formatting tools are configured.

## Tech Stack

- **React 19** with Vite 7 and `@vitejs/plugin-react`
- **Tailwind CSS 4** via PostCSS (configured in `postcss.config.js` and `tailwind.config.js`)
- **@hugeicons/react** with `@hugeicons/core-free-icons` for icons
- All styling uses Tailwind utility classes inline in JSX
- Custom animations (`fadeIn`, `typingBounce`) defined in `tailwind.config.js`

## Architecture

All state is centralized in `App.jsx` using React hooks — no external state management. `App` renders one of two views based on `currentView` state, passing all state and handlers as props.

### Views

- **DashboardView** (`src/views/DashboardView.jsx`) — Record list with status cards, stats summary, and a detail modal for denied/peer-to-peer cases
- **NewAuthWizard** (`src/views/NewAuthWizard.jsx`) — 4-step wizard:
  1. Upload — patient name + clinical document upload (simulated)
  2. Insurance — select insurance provider
  3. Details — split-pane with chat interface (system asks questions, user responds) + live document preview that highlights fields as they're completed
  4. Review — generated outputs (CPT/ICD codes, medical necessity narrative, talking points) with submit

### Shared Components (`src/components/`)

`StatusBadge`, `ChatMessage`, `DocumentSection`, `LoadingSpinner`, `TypingIndicator`

### Data & Utilities

- `src/data/authData.js` — mock authorization records (`initialAuthRecords`) and chat question definitions (`documentQuestions`). Records include nested `denial` and `peerToPeer` objects for action-needed cases.
- `src/utils/date.js` — date formatting helpers

### Key Patterns

- File uploads, document analysis, and submissions are simulated with `setTimeout` delays (no real API calls)
- The chat in step 3 collects three fields (`prior_treatment`, `diagnosis_duration`, `procedure_details`) tracked in `documentData` state, driving the document preview
- `generatedOutputs` in `App.jsx` constructs the review step content using template literals from collected form data

## Deployment

Configured for Vercel (`.vercel` in `.gitignore`). Run `npm run build` and deploy the `dist/` directory.
