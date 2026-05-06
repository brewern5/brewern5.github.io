import { CONFIG } from './config.js';
import { escapeAttribute, escapeHtml, formatUpdatedAt } from './utils.js';

export function normalizeProjects(repositories, manifest) {
    return repositories
        .map((repository) => {
            const override = manifest?.[repository.name] ?? {};
            const weight = typeof override.weight === 'number' ? override.weight : CONFIG.defaultWeight;
            return {
                name: repository.name,
                description: override.shortDescription || repository.description || 'No description provided.',
                language: repository.language || repository.topics?.[0] || 'Project',
                updatedAt: repository.updated_at,
                stars: repository.stargazers_count,
                url: override.linkOverride || repository.html_url,
                featured: Boolean(override.featured),
                hidden: Boolean(override.hidden),
                weight,
            };
        })
        .filter((project) => !project.hidden && project.weight !== 0)
        .sort((left, right) => {
            if (right.weight !== left.weight) {
                return right.weight - left.weight;
            }

            return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
        });
}

export function renderProjects(container, projects) {
    container.innerHTML = '';

    projects.forEach((project) => {
        container.appendChild(createProjectCard(project));
    });
}

export function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = project.featured ? 'project-card project-card--featured' : 'project-card';

    card.innerHTML = `
        <div class="project-card__header">
            <h3>${escapeHtml(project.name)}</h3>
            ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
        </div>
        <p class="project-card__description">${escapeHtml(project.description)}</p>
        <div class="project-card__meta">
            <span>${escapeHtml(project.language)}</span>
            <span>${escapeHtml(formatUpdatedAt(project.updatedAt))}</span>
            ${project.stars ? `<span>${project.stars} stars</span>` : ''}
        </div>
        <a class="project-card__cta" href="${escapeAttribute(project.url)}" target="_blank" rel="noreferrer">View on GitHub</a>
    `;

    return card;
}