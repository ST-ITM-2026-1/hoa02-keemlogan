document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        updateToggleText();
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        localStorage.setItem("theme", theme);
        updateToggleText();
    });

    function updateToggleText() {
        const label = document.querySelector(".theme-toggle-label");
        if (label) label.textContent = document.body.classList.contains("dark-theme") ? "Dark" : "Light";
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-group");

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const filter = e.currentTarget.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove("active"));
            e.currentTarget.classList.add("active");

            projects.forEach(project => {
                if (filter === "all" || project.dataset.category.includes(filter)) {
                    project.classList.remove("hidden");
                } else {
                    project.classList.add("hidden");
                }
            });
        });
    });

});

async function fetchGitHubData() {
    const username = 'keemlogan';
    const profileDiv = document.getElementById('github-profile');
    const reposDiv = document.getElementById('github-repos');

    if (!profileDiv) return;
    try {
        const resProfile = await fetch(`https://api.github.com/users/${username}`);
        const profile = await resProfile.json();

        profileDiv.innerHTML = `
            <img src="${profile.avatar_url}" alt="avatar" style="width:100px; border-radius:50%; margin-bottom:10px;">
            <h2>${profile.name || username}</h2>
            <p>${profile.bio || 'Bio가 없습니다.'}</p>
            <p><strong>Followers:</strong> ${profile.followers} | <strong>Following:</strong> ${profile.following} | <strong>Public Repos:</strong> ${profile.public_repos}</p>
        `;

        const resRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        const repos = await resRepos.json();

        reposDiv.innerHTML = repos.map(repo => `
            <div class="project-group">
                <h3><a href="${repo.html_url}" target="_blank" style="color:var(--accent);">${repo.name}</a></h3>
                <p style="margin: 8px 0;">${repo.description || '설명이 없습니다.'}</p>
                <div class="tags">
                    <span class="tag">언어: ${repo.language || 'N/A'}</span>
                    <span class="tag">⭐ Stars: ${repo.stargazers_count}</span>
                    <span class="tag">🍴 Forks: ${repo.forks_count}</span>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('API Error:', error);
        profileDiv.innerHTML = `<p>데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.</p>`;
    }
}

fetchGitHubData();
