# Denied Modal UI Patterns

This document summarizes the recent changes to the denied-detail modal and extracts reusable design patterns to apply elsewhere in the app.

## Goals
- Make denial status unmistakable at first glance.
- Clarify the primary user action for denied records.
- Reduce cognitive load using progressive disclosure.
- Separate primary actions from optional workflows.

## What Changed
### 1) Status emphasis and primary action
- Added a top banner for denied records with a clear label ("Denied - Action Required").
- Included the appeal deadline in the banner for urgency.
- Moved the primary CTA ("Start Resubmission") into the banner.
- Suppressed the floating status badge for denied records to avoid ambiguity.

### 2) Progressive disclosure for dense sections
- Converted the resubmission checklist into a collapsed summary with a "View checklist" toggle.
- Converted the dispute call script into a collapsed optional section with a "View script" toggle.

### 3) Visual hierarchy inside the optional section
- Avoided reusing the parent header styling for nested headers.
- Used a smaller, darker subheader ("Call script") that reads as a header but is visually subordinate.
- Reduced emphasis on the phone action by removing its outline and adding a phone icon.

### 4) Footer removal
- Removed the footer row (including the Download button) to reduce competing actions.

## Progressive Disclosure Pattern
Use this pattern when a section contains more than 3-4 items or when it is optional.

**Default view**
- Show a short summary line.
- Provide a clear toggle action (e.g., "View checklist").

**Expanded view**
- Reveal the full list or script.
- Keep the toggle visible to collapse again.

## Visual Hierarchy Rules
- Primary actions appear early (top of modal) and use the strongest styling.
- Optional actions appear later and use softer emphasis.
- Nested headers should not reuse the same uppercase style as their parent header.

## Reuse Checklist
- Use a banner for the critical status + primary CTA.
- Collapse dense lists or scripts behind a toggle.
- Add a short, explanatory sentence before optional sections.
- Use icon + text links for supporting actions instead of outlined buttons.
- Remove footers that only repeat or dilute the primary action.

## Implementation Notes
- File: `src/views/DashboardView.jsx`
- Denied banner: top section in the denied modal.
- Checklist and script toggles: controlled by local state (`showChecklist`, `showDisputeScript`).
- Phone CTA: link with `IconPhone` and no border to avoid button confusion.
