# Portfolio Project System — Features & Requirements

---

## F1 — Project Card Display

### R1 — Dynamic Card Generation
- Pull repositories from GitHub API
- Generate cards from merged data (API + manifest)

### R2 — Card Content
Each card should display:
- Repository name
- Short description  
  - Use `manifest.shortDescription` if present  
  - Fallback to GitHub description
- Primary language or top topic
- Last updated date
- Optional: stars

### R3 — Navigation
Clicking a card or CTA should:
- Open the repository on GitHub
- OR use `linkOverride` if defined in manifest

---

## F2 — GitHub API Integration

### R1 — Data Retrieval
- Fetch all public repositories from the linked GitHub account

### R2 — Caching
- Cache response in local storage
- Cache lifetime: ~1 hour
- If API fails, fall back to cached data

### R3 — Security
- No authentication required for public repos
- Do not expose tokens in frontend

---

## F3 — Manifest (Manual Overrides)

### R1 — Purpose
- Provide control over presentation without modifying GitHub repos

### R2 — Attributes (per repo)
- `weight: number (1–100)`
- `hidden: boolean`
- `featured: boolean`
- `shortDescription: string`
- `linkOverride: string (optional)`

### R3 — Behavior Rules
- `hidden === true` → exclude from all displays
- `weight === 0` → exclude from all displays
- Missing manifest entry → include with default behavior
- `shortDescription` overrides GitHub description when present

### R4 — Default Values
- `defaultWeight = 50`
- If a repo has no manifest entry:
  - Assign `weight = defaultWeight`
- If a repo has a manifest entry but no weight:
  - Assign `weight = defaultWeight`

### R5 — Ownership
- Manifest is local to the project and only editable by site owner

---

## F4 — Project Ordering & Filtering

### R1 — Ordering
- Projects sorted by `weight` (descending)

### R2 — Filtering
Exclude:
- `hidden === true`
- `weight === 0`

---

## F5 — Featured vs Other Projects (UI Logic Only)

### R1 — Featured Section
Display projects where:
- `featured === true`

Behavior:
- Positioned at top of page
- Uses larger / emphasized card layout

### R2 — Other Projects Section
Display:
- All remaining projects (`featured !== true`)

Behavior:
- Uses standard card layout

### R3 — Separation Rule
- A project marked `featured`:
  - Appears only in featured section
  - Is excluded from “other projects”

---

## F6 — Resume Integration

### R1 — Identification
- Resume repo identified via manifest  
  - Example approaches:
    - `type: "resume"` (preferred)
    - OR `hidden: true` + separate handling

### R2 — Behavior
- Excluded from project card lists
- Used to:
  - Display PDF on site
  - Provide download link