# Portfolio Project System — Features & Requirements

---

## F1 — Project Card Display

### R1 — Dynamic Card Generation
- [x] Pull repositories from GitHub API
- [x] Generate cards from merged data (API + manifest)

### R2 — Card Content
Each card should display:
- [x] Repository name
- [x] Short description uses `manifest.shortDescription` when present; falls back to GitHub description
- [x] Primary language or top topic
- [x] Last updated date
- [x] Optional stars
- Featured Card reference: ![Featured Card](.\imgs\featured_card_example.png)
- Generic Card reference: ![Generic Card](.\imgs\generic_card_example.png)

### R3 — Navigation
- [ ] Card click opens the repository on GitHub or `linkOverride` when defined
- [x] CTA opens the repository on GitHub or `linkOverride` when defined

---

## F2 — GitHub API Integration

### R1 — Data Retrieval
- [ ] Fetch all public repositories from the linked GitHub account

### R2 — Caching
- [x] Cache response in local storage
- [x] Cache lifetime: ~1 hour
- [x] If API fails, fall back to cached data

### R3 — Security
- [x] No authentication required for public repos
- [x] Do not expose tokens in frontend

---

## F3 — Manifest (Manual Overrides)

### R1 — Purpose
- [x] Provide control over presentation without modifying GitHub repos

### R2 — Attributes (per repo)
- [x] `weight: number (1–100)`
- [x] `hidden: boolean`
- [x] `featured: boolean`
- [x] `shortDescription: string`
- [x] `linkOverride: string (optional)`

### R3 — Behavior Rules
- [x] `hidden === true` → exclude from all displays
- [x] `weight === 0` → exclude from all displays
- [x] Missing manifest entry → include with default behavior
- [x] `shortDescription` overrides GitHub description when present

### R4 — Default Values
- [x] `defaultWeight = 50`
- [x] Missing manifest entry assigns `weight = defaultWeight`
- [x] Manifest entry without weight assigns `weight = defaultWeight`

### R5 — Ownership
- [x] Manifest is local to the project and only editable by site owner

---

## F4 — Project Ordering & Filtering

### R1 — Ordering
- [x] Projects sorted by `weight` (descending)

### R2 — Filtering
Exclude:
- [x] `hidden === true`
- [x] `weight === 0`

---

## F5 — Featured vs Other Projects (UI Logic Only)

### R1 — Featured Section
- [x] Display projects where `featured === true`
- [x] Positioned at top of page
- [x] Uses larger / emphasized card layout

### R2 — Other Projects Section
- [x] Display all remaining projects (`featured !== true`)
- [x] Uses standard card layout

### R3 — Separation Rule
- [x] A project marked `featured` appears only in featured section
- [x] Featured projects are excluded from “other projects”

---

## F6 — Resume Integration

### R1 — Identification
- [ ] Resume repo identified via manifest (e.g., `type: "resume"` or `hidden: true` + separate handling)

### R2 — Behavior
- [ ] Excluded from project card lists
- [ ] Display PDF on site
- [ ] Provide download link