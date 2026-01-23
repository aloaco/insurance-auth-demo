# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Prior Authorization Demo** - a single-file React application for healthcare prior authorization workflows. The entire application lives in `index.html` with no build step required.

## Development

**To run the app:** Open `index.html` directly in a browser, or serve it with any static file server:
```bash
python3 -m http.server 8000
# or
npx serve .
```

There is no build process, linting, or test suite configured.

## Architecture

The app uses React 18 loaded via CDN with Babel for in-browser JSX compilation (`<script type="text/babel">`). This pattern enables rapid prototyping without a build toolchain.

### Application Structure (index.html)

- **State Management**: All state lives in `PriorAuthDemo` component using React hooks
- **Two main views** controlled by `currentView` state:
  - `dashboard`: List of authorization records with status cards and a modal for viewing denial/peer-to-peer details
  - `newAuth`: Multi-step wizard (Upload → Insurance → Details → Review) for creating new authorizations

### Key Data Structures

- `initialAuthRecords`: Sample authorization records with nested `denial` and `peerToPeer` objects for action-needed cases
- `documentQuestions`: Fields that need to be filled via chat interface during step 3
- `documentData`: Tracks completion of required fields (`prior_treatment`, `diagnosis_duration`, `procedure_details`)

### Component Hierarchy

```
PriorAuthDemo (main component)
├── Dashboard view (record list, stats, detail modal)
└── New Auth view (4-step wizard)
    └── Step 3: Split-pane chat interface + live document preview
```

## Deployment

The `.gitignore` includes `.vercel`, indicating Vercel deployment. The single HTML file can be deployed to any static hosting.
