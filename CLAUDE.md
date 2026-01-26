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

### Component + Styling Map (index.html line refs)

Line numbers below are from the current `index.html` snapshot and will shift if code moves.

- **HTML shell + root mount**: lines 1-25 (CDN scripts, minimal CSS reset in `<style>`)
- **Global CSS reset**: lines 11-20 (box-sizing + body margin/padding)
- **Data constants**:
  - `initialAuthRecords`: lines 28-84
  - `documentQuestions`: lines 86-90
- **UI subcomponents (inline styling in JSX)**:
  - `StatusBadge`: lines 92-119
  - `LoadingSpinner`: lines 121-133 (includes `@keyframes spin` in a `<style>` tag)
  - `ChatMessage`: lines 135-155 (includes `@keyframes fadeIn` in a `<style>` tag)
  - `TypingIndicator`: lines 157-189 (includes `@keyframes bounce` in a `<style>` tag)
  - `DocumentSection`: lines 191-227
- **`PriorAuthDemo` main component**: lines 229-821
  - State, refs, effects, handlers: lines 229-425
  - **Dashboard view** render: lines 426-571
    - Font import (`Playfair Display`, `Inter`): line 429
    - Header + stats cards + record list: lines 430-477
    - Detail modal shell: lines 479-568
      - Denial detail view: lines 490-528
      - Peer-to-peer detail view: lines 530-565
  - **New Auth view** render: lines 573-819
    - Font import + `@keyframes spin`: lines 575-578
    - Stepper header: lines 580-598
    - Step 1 (Upload): lines 602-648
    - Step 2 (Insurance): lines 651-677
    - Step 3 (Details split view):
      - Chat panel: lines 680-708
      - Document preview: lines 709-742 (uses `DocumentSection`)
    - Step 3 (Review/results): lines 746-816 (summary cards + submit)
- **React mount**: line 823

## Deployment

The `.gitignore` includes `.vercel`, indicating Vercel deployment. The single HTML file can be deployed to any static hosting.
