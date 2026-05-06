import { CONFIG } from './config.js';

export async function loadManifest() {
    try {
        const response = await fetch(CONFIG.manifestUrl, { cache: 'no-store' });
        if (!response.ok) {
            return {};
        }

        return await response.json();
    } catch {
        return {};
    }
}

export async function loadRepositories() {
    const cached = readCachedRepositories();
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(CONFIG.apiUrl(), { headers: { Accept: 'application/vnd.github+json' } });
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repositories = await response.json();
        writeCachedRepositories(repositories);
        return repositories;
    } catch (error) {
        const fallback = readCachedRepositories(true);
        if (fallback) {
            return fallback;
        }

        throw error;
    }
}

function readCachedRepositories(includeExpired = false) {
    try {
        const raw = window.localStorage.getItem(CONFIG.cacheKey);
        if (!raw) {
            return null;
        }

        const cached = JSON.parse(raw);
        if (!includeExpired && Date.now() - cached.savedAt > CONFIG.cacheTtlMs) {
            return null;
        }

        return Array.isArray(cached.repositories) ? cached.repositories : null;
    } catch {
        return null;
    }
}

function writeCachedRepositories(repositories) {
    try {
        window.localStorage.setItem(CONFIG.cacheKey, JSON.stringify({
            savedAt: Date.now(),
            repositories,
        }));
    } catch {
        // Ignore cache write failures.
    }
}