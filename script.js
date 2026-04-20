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
});
