const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const menu = document.getElementById("menu");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
}, { passive: true });

menu.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
}));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll("#navLinks a")];
const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
        }
    });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(s => activeObserver.observe(s));