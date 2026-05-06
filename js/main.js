import { initSkillsToggle } from './skills.js';
import { loadManifest, loadRepositories } from './github.js';
import { normalizeProjects, renderProjects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    initSkillsToggle();
    loadProjects();
});

async function loadProjects() {
    const statusElement = document.getElementById('project-status');
    const featuredGrid = document.getElementById('featured-projects-grid');
    const otherGrid = document.getElementById('other-projects-grid');
    const otherToggle = document.getElementById('other-projects-toggle');
    const featuredSection = document.getElementById('featured-projects');
    const otherSection = document.getElementById('other-projects');

    if (!statusElement || !featuredGrid || !otherGrid || !featuredSection || !otherSection) {
        return;
    }

    try {
        const [manifest, repositories] = await Promise.all([
            loadManifest(),
            loadRepositories(),
        ]);

        const projects = normalizeProjects(repositories, manifest);
        const featuredProjects = projects.filter((project) => project.featured);
        const otherProjects = projects.filter((project) => !project.featured);
        const initialOtherCount = 6;
        let showAllOther = false;

        const updateOtherProjects = () => {
            const visibleOther = showAllOther
                ? otherProjects
                : otherProjects.slice(0, initialOtherCount);

            renderProjects(otherGrid, visibleOther);

            if (otherToggle) {
                const shouldShowToggle = otherProjects.length > initialOtherCount;
                otherToggle.classList.toggle('is-hidden', !shouldShowToggle);
                otherToggle.textContent = showAllOther ? 'View less' : 'View more';
                otherToggle.setAttribute('aria-expanded', showAllOther ? 'true' : 'false');
            }
        };

        renderProjects(featuredGrid, featuredProjects);
        updateOtherProjects();

        if (otherToggle) {
            otherToggle.addEventListener('click', () => {
                showAllOther = !showAllOther;
                updateOtherProjects();
            });
        }

        featuredSection.classList.toggle('is-hidden', featuredProjects.length === 0);
        otherSection.classList.toggle('is-hidden', otherProjects.length === 0);
        statusElement.textContent = projects.length > 0
            ? 'GitHub projects loaded successfully.'
            : 'No public GitHub projects found yet.';
    } catch (error) {
        console.error('Unable to load GitHub projects:', error);
        statusElement.textContent = 'GitHub projects could not be loaded right now.';
        featuredSection.classList.add('is-hidden');
        otherSection.classList.add('is-hidden');
    }
}