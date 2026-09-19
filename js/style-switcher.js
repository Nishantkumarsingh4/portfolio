const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

/*------------------- theme colors -------------------  */
const alternateStyle = document.querySelectorAll(".alternate-style");

const themeColors = {
    "color-1": "#fb839e",
    "color-2": "#ec9412",
    "color-3": "#1fc586",
    "color-4": "#2eb1ed",
    "color-5": "#cc3a3b"
};

function setActiveStyle(color) {
    // 1. Instantly set the CSS variable on :root
    if (themeColors[color]) {
        document.documentElement.style.setProperty("--skin-color", themeColors[color]);
    }

    // 2. Toggle alternate stylesheets using both IDL property and attribute
    alternateStyle.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
            style.disabled = false;
        } else {
            style.setAttribute("disabled", "true");
            style.disabled = true;
        }
    });

    // 3. Highlight selected color circle
    document.querySelectorAll(".style-switcher .colors span").forEach((span) => {
        if (span.classList.contains(color)) {
            span.classList.add("active");
        } else {
            span.classList.remove("active");
        }
    });

    // 4. Save preference
    localStorage.setItem("theme-color", color);
}

// Ensure globally accessible
window.setActiveStyle = setActiveStyle;

// Restore saved color on load
window.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem("theme-color") || "color-1";
    setActiveStyle(savedColor);
});

/*------------------- dark mode -------------------  */
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme-mode", "dark");
    } else {
        localStorage.setItem("theme-mode", "light");
    }
});

window.addEventListener("load", () => {
    const savedMode = localStorage.getItem("theme-mode");
    if (savedMode === "light") {
        document.body.classList.remove("dark");
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    } else if (savedMode === "dark" || document.body.classList.contains("dark")) {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
    }
});