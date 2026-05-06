export const CONFIG = {
    githubUser: 'brewern5',
    manifestUrl: 'github-manifest.json',
    cacheKey: 'brewern5.github.repos.v1',
    cacheTtlMs: 60 * 60 * 1000,
    defaultWeight: 50,
    apiUrl() {
        return `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated&direction=desc`;
    },
};