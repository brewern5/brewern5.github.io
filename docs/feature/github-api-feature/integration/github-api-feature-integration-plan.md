# GitHub API Feature Integration Plan

This plan breaks the `github-api-feature` requirements into one integration milestone per feature. The sequence follows the feature doc order so the API foundation lands before ordering, display, featured grouping, and resume handling.

This document is about base functionality first. Tests are a later verification concern and are only called out here where a milestone clearly depends on API-observed behavior or needs a follow-up check after the implementation exists.

## Milestone 1 - F2 GitHub API Integration

- [ ] Status: Complete

### Goal
Build the public-repo data source used by the portfolio.

### Scope
- Fetch all public repositories from the linked GitHub account.
- Cache the response in local storage for about 1 hour.
- Fall back to cached data if the API request fails.
- Keep the client-side implementation token-free.

### Depends On
- No earlier milestones.

### Acceptance Criteria
- [ ] Public repositories load successfully from the GitHub API.
- [x] Cached data is reused while valid.
- [x] If the API fails, the site still renders from cache when available.
- [x] No authentication token is required in the frontend.

### Verification Note
- After the API behavior exists, this milestone should be verified because it depends on GitHub API responses and cache fallback behavior.

## Milestone 2 - F3 Manifest (Manual Overrides)

- [x] Status: Complete

### Goal
Add a local manifest that controls presentation without changing GitHub repos.

### Scope
- Store the manifest as a JSON file in the feature folder.
- Treat the manifest as a flat JSON object keyed by repository name.
- Support `weight`, `hidden`, `featured`, `shortDescription`, and `linkOverride`.
- Apply the documented default weight when a repo has no explicit weight.

### Depends On
- Milestone 1.

### Acceptance Criteria
- [x] Manifest entries override display behavior when present.
- [x] Missing entries still use default behavior.
- [x] `hidden === true` excludes a repo from display.
- [x] `weight === 0` excludes a repo from display.
- [x] `shortDescription` replaces the GitHub description when present.

### Verification Note
- After the manifest logic exists, verify merge and override behavior because this milestone changes how repo data is interpreted.

## Milestone 3 - F4 Project Ordering & Filtering

- [x] Status: Complete

### Goal
Sort and filter the merged repo data before rendering.

### Scope
- Sort projects by `weight` in descending order.
- Exclude repos marked `hidden`.
- Exclude repos with `weight === 0`.

### Depends On
- Milestone 1.
- Milestone 2.

### Acceptance Criteria
- [x] Higher-weight repos appear before lower-weight repos.
- [x] Hidden repos never appear in the rendered list.
- [x] Zero-weight repos never appear in the rendered list.
- [x] Default-weight repos are included when not explicitly excluded.

### Verification Note
- After the sort and filter logic exists, verify the ordering and exclusion rules.

## Milestone 4 - F1 Project Card Display

- [ ] Status: Complete

### Goal
Render repository data as project cards on the site.

### Scope
- Pull repositories from the GitHub API and merge them with manifest data.
- Generate cards from the merged result.
- Display repository name, short description, primary language or top topic, last updated date, and optional stars.
- Route card clicks and CTAs to GitHub or `linkOverride` when defined.

### Depends On
- Milestone 1.
- Milestone 2.
- Milestone 3.

### Acceptance Criteria
- [x] Each included repository renders as a card.
- [x] Card content uses manifest overrides when present.
- [ ] Navigation opens the repo or the override link.
- [x] Card data reflects the sorted and filtered result set.

### Verification Note
- After the card rendering exists, verify the merged data flow, content selection, and navigation behavior.

## Milestone 5 - F5 Featured vs Other Projects

- [x] Status: Complete

### Goal
Separate featured projects from standard projects in the UI.

### Scope
- Display projects with `featured === true` in a featured section.
- Display all remaining projects in the other-projects section.
- Keep a featured project out of the other-projects section.

### Depends On
- Milestone 2.
- Milestone 3.
- Milestone 4.

### Acceptance Criteria
- [x] Featured projects appear first and use the emphasized layout.
- [x] Non-featured projects appear in the standard layout.
- [x] A featured project appears in only one section.

### Verification Note
- After the featured-section behavior exists, verify placement and separation rules.

## Milestone 6 - F6 Resume Integration

- [ ] Status: Complete

### Goal
Handle the resume PDF as a special repo-backed asset.

### Scope
- Identify the resume repo through the manifest.
- Exclude the resume repo from the project card lists.
- Use the resume asset to display the PDF on the site.
- Use the resume asset to provide the download link.

### Depends On
- Milestone 2.
- Milestone 4.

### Acceptance Criteria
- [ ] The resume repo is not shown as a normal project card.
- [ ] The PDF can be displayed on the site.
- [ ] The PDF can be downloaded from the site.
- [ ] Resume handling remains separate from project card rendering.

### Verification Note
- After the resume handling exists, verify that the resume repo is excluded from cards and that the PDF display/download path works.

## Integration Rules

- Keep milestone order aligned with the feature list.
- Use one milestone per feature.
- Build the implementation as a professional, modular application with clear separation of concerns, reusable components, and small single-purpose modules.
- Apply standard software design principles so data access, transformation, rendering, and interaction logic stay isolated from each other.
- Avoid monolithic or tightly coupled code paths; structure the work so it remains maintainable as the feature set grows.
- Keep tests out of the implementation plan until the related behavior exists.
- Use the feature test folder only when it is time to add verification for a milestone.
- Keep the integration plan focused on sequencing, dependency flow, and implementation points rather than implementation details.
