// Hamburger Menu (All Pages)
function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  // Only initialize if elements exist
  if (!hamburger || !navMenu) return;

  // Toggle menu on hamburger click
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
}

// About Page: First Visit Animation & Prefetch
function initAboutPage() {
  // Check if on about page
  const isAboutPage = window.location.pathname.includes('/about');
  
  if (!isAboutPage) return;

  // Prefetch likely next pages during idle time
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      const links = ["/about/", "/projects/", "/blog/", "/contact/"];
      links.forEach((link) => {
        const linkEl = document.createElement("link");
        linkEl.rel = "prefetch";
        linkEl.href = link;
        document.head.appendChild(linkEl);
      });
    });
  }

  // First visit animation
  const hasVisited = sessionStorage.getItem("hasVisited");
  
  if (!hasVisited) {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.classList.add("first-load");
    }
    sessionStorage.setItem("hasVisited", "true");
  }
}

// Contact Page: Form Reset
function initContactPage() {
  // Check if on contact page
  const contactForm = document.getElementById("contactForm");
  
  if (!contactForm) return;

  // Reset form fields when page loads
  contactForm.reset();
}

document.addEventListener("DOMContentLoaded", function () {
  initHamburgerMenu();
  initAboutPage();
  initContactPage();
});

// Also run on window load for contact form reset
window.addEventListener("load", function () {
  initContactPage();
});