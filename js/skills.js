export function initSkillsToggle() {
    const expand = document.getElementById('expand-skills');
    if (!expand) {
        return;
    }

    const revealSkills = () => {
        document.querySelectorAll('.extra-skill').forEach((item) => {
            item.style.display = 'inline-block';
        });
        expand.style.display = 'none';
    };

    expand.addEventListener('click', revealSkills);
    expand.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            revealSkills();
        }
    });
}