
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Preload next likely pages
    const links = ["/about/", "/projects/", "/blog/", "/contact/"];
    links.forEach((link) => {
      const linkEl = document.createElement("link");
      linkEl.rel = "prefetch";
      linkEl.href = link;
      document.head.appendChild(linkEl);
    });
  });
}

// Check if this is the first page load
const hasVisited = sessionStorage.getItem("hasVisited");

if (!hasVisited) {
  // First visit - add animation class
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("nav").classList.add("first-load");
    sessionStorage.setItem("hasVisited", "true");
  });
}

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});