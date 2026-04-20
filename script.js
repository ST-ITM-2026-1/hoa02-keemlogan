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
