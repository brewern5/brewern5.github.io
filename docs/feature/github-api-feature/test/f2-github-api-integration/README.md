# F2 - GitHub API Integration Tests

## Purpose
Verify public repository loading, local caching, and cache fallback behavior.

## Planned Coverage
- Fetch all public repositories from the linked GitHub account.
- Confirm cache is written after a successful fetch.
- Confirm cached data is reused while it remains valid.
- Confirm the app falls back to cached data when the API request fails.
- Confirm no authentication token is required in the frontend.

## Notes
- This milestone can be tested with integration-style behavior tests because it depends on API-observed behavior.
- When implementation starts, add the actual test files in this folder.
