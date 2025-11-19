console.log("Script loaded!");

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
      const links = ["/about/", "/coding-projects/", "/multimedia-projects/", "/blog/", "/contact/"];
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

// Video Carousel
let currentVideoIndex = 0;
const videoData = [
  {
    title: "Mustafa Syed - Reel 1",
    subtitle: "Instagram Reels | Video Editing | Adobe Premiere Pro",
    src: "/assets/Mustafa Reel - 10.webm",
    thumbnailTime: 0
  },
  {
    title: "Mustafa Syed - Reel 2",
    subtitle: "Instagram Reels | Video Editing | Adobe Premiere Pro",
    src: "/assets/Mustafa Reel - 8.webm",
    thumbnailTime: 0
  },
  {
    title: "KKC Classroom - Logo Intro",
    subtitle: "Motion Graphics | Brand Identity | Blender",
    src: "/assets/KKC Classroom Logo Intro Animation.webm",
    thumbnailTime: 0
  },
  {
    title: "KKC Classroom - Logo Outro",
    subtitle: "Motion Graphics | Brand Identity | Blender",
    src: "/assets/KKC Classroom Logo Outro Animation.webm",
    thumbnailTime: 0
  },
  {
    title: "Poppi AD - Commercial",
    subtitle: "Commercial Production | Video Editing | Blender | Adobe Premiere Pro",
    src: "/assets/Poppi AD.webm",
    thumbnailTime: 0
  },
  {
    title: "RTX 5090 FE Animation",
    subtitle: "3D Animation | Product Visualization | Blender | Adobe Premiere Pro",
    src: "/assets/RTX 5090 FE Animation.webm",
    thumbnailTime: 0
  },
  {
    title: "Walter White - Edit",
    subtitle: "TV/Movie Edit | Adobe Premiere Pro",
    src: "/assets/ww.webm",
    thumbnailTime: 0
  }
];

// Function to set video thumbnail time
function setVideoThumbnail(video, thumbnailTime) {
  if (video.readyState >= 2) { // HAVE_CURRENT_DATA or better
    video.currentTime = thumbnailTime;
  } else {
    video.addEventListener('loadeddata', function() {
      video.currentTime = thumbnailTime;
    });
  }
  
  // Ensure video stays paused at thumbnail time
  video.addEventListener('timeupdate', function thumbnailTimeUpdate() {
    if (video.currentTime >= thumbnailTime && video.paused) {
      video.removeEventListener('timeupdate', thumbnailTimeUpdate);
    }
  });
}

function updateCarousel() {
  const items = document.querySelectorAll('.video-carousel-item');
  const totalVideos = items.length;
  
  items.forEach((item, index) => {
    item.classList.remove('active', 'prev', 'next', 'hidden');
    
    if (index === currentVideoIndex) {
      item.classList.add('active');
      const video = item.querySelector('video');
      // Set thumbnail time for active video
      if (video) {
        const thumbnailTime = videoData[index].thumbnailTime || 4;
        setVideoThumbnail(video, thumbnailTime);
      }
      // Auto-play current video
      if (video && !video.paused) {
        // Keep playing if it was playing
      } else {
        video.currentTime = videoData[index].thumbnailTime || 4;
      }
    } else if (index === (currentVideoIndex - 1 + totalVideos) % totalVideos) {
      item.classList.add('prev');
      const video = item.querySelector('video');
      if (video) {
        const thumbnailTime = videoData[index].thumbnailTime || 4;
        setVideoThumbnail(video, thumbnailTime);
      }
      video.pause();
    } else if (index === (currentVideoIndex + 1) % totalVideos) {
      item.classList.add('next');
      const video = item.querySelector('video');
      if (video) {
        const thumbnailTime = videoData[index].thumbnailTime || 4;
        setVideoThumbnail(video, thumbnailTime);
      }
      video.pause();
    } else {
      item.classList.add('hidden');
      const video = item.querySelector('video');
      if (video) {
        const thumbnailTime = videoData[index].thumbnailTime || 4;
        setVideoThumbnail(video, thumbnailTime);
      }
      video.pause();
    }
  });
  
  // Update text content
  updateVideoInfo();
  updatePlayButton();
  
  // Setup time tracking for new video
  setupVideoTimeTracking();
}

function updateVideoInfo() {
  const data = videoData[currentVideoIndex];
  document.getElementById('video-title').textContent = data.title;
  document.getElementById('video-subtitle').textContent = data.subtitle;
  document.getElementById('video-description').textContent = data.description;
}

function nextVideo() {
  const totalVideos = document.querySelectorAll('.video-carousel-item').length;
  currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
  updateCarousel();
}

function previousVideo() {
  const totalVideos = document.querySelectorAll('.video-carousel-item').length;
  currentVideoIndex = (currentVideoIndex - 1 + totalVideos) % totalVideos;
  updateCarousel();
}

function getCurrentVideo() {
  const activeItem = document.querySelector('.video-carousel-item.active');
  return activeItem ? activeItem.querySelector('video') : null;
}

function togglePlayCurrent() {
  const video = getCurrentVideo();
  const button = event.target;
  
  if (!video) return;
  
  if (video.paused) {
    video.play();
    button.textContent = '⏸';
  } else {
    video.pause();
    button.textContent = '▶';
  }
}

function changeVolumeCurrent(value) {
  const video = getCurrentVideo();
  if (!video) return;
  
  video.volume = value / 100;
  video.muted = false;
  updateVolumeIconCurrent(value);
}

function toggleMuteCurrent() {
  const video = getCurrentVideo();
  if (!video) return;
  
  video.muted = !video.muted;
  
  const volumeSlider = document.getElementById('volumeSlider');
  updateVolumeIconCurrent(video.muted ? 0 : volumeSlider.value);
}

function updateVolumeIconCurrent(value) {
  const video = getCurrentVideo();
  if (!video) return;
  
  const icon = document.querySelector('.video-volume-icon');
  
  if (video.muted || value == 0) {
    icon.textContent = '🔇';
  } else if (value < 50) {
    icon.textContent = '🔉';
  } else {
    icon.textContent = '🔊';
  }
}

function updatePlayButton() {
  const video = getCurrentVideo();
  const button = document.querySelector('.video-play-button');
  
  if (!video || !button) return;
  
  button.textContent = video.paused ? '▶' : '⏸';
}

// Video time tracking
function setupVideoTimeTracking() {
  const video = getCurrentVideo();
  if (!video) return;
  
  const timeSlider = document.getElementById('timeSlider');
  const timeDisplay = document.getElementById('timeDisplay');
  
  if (!timeSlider || !timeDisplay) return;
  
  // Remove old event listeners by cloning
  const newTimeSlider = timeSlider.cloneNode(true);
  timeSlider.parentNode.replaceChild(newTimeSlider, timeSlider);
  
  // Update slider and display as video plays
  video.addEventListener('timeupdate', () => {
    if (!newTimeSlider.dataset.seeking) {
      const progress = (video.currentTime / video.duration) * 100;
      newTimeSlider.value = progress || 0;
      updateTimeDisplay();
    }
  });
  
  // Handle slider input
  newTimeSlider.addEventListener('input', (e) => {
    newTimeSlider.dataset.seeking = 'true';
    const time = (e.target.value / 100) * video.duration;
    video.currentTime = time;
    updateTimeDisplay();
  });
  
  newTimeSlider.addEventListener('change', () => {
    delete newTimeSlider.dataset.seeking;
  });
  
  // Initial display update
  updateTimeDisplay();
}

function updateTimeDisplay() {
  const video = getCurrentVideo();
  const timeDisplay = document.getElementById('timeDisplay');
  
  if (!video || !timeDisplay) return;
  
  const current = formatTime(video.currentTime);
  const duration = formatTime(video.duration);
  
  timeDisplay.textContent = `${current} / ${duration}`;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function seekVideo(value) {
  const video = getCurrentVideo();
  if (!video) return;
  
  const time = (value / 100) * video.duration;
  video.currentTime = time;
  updateTimeDisplay();
}

// Initialize all video thumbnails on page load
function initializeVideoThumbnails() {
  const videos = document.querySelectorAll('.video-carousel-item video');
  videos.forEach((video, index) => {
    const thumbnailTime = videoData[index]?.thumbnailTime || 4;
    setVideoThumbnail(video, thumbnailTime);
  });
}

// SINGLE DOMContentLoaded EVENT LISTENER
document.addEventListener("DOMContentLoaded", function () {
  initHamburgerMenu();
  initAboutPage();
  initContactPage();
  
  // Animate project selection buttons
  const projectSelection = document.querySelector('.projectsPage-selection');
  if (projectSelection) {
    projectSelection.style.opacity = '0';
    projectSelection.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      projectSelection.classList.add('fade-in-animate');
    }, 400);
  }
  
  // Initialize carousel if present
  if (document.querySelector('.video-carousel')) {
    initializeVideoThumbnails();
    updateCarousel();
    setupVideoTimeTracking();
  }
});

// Also run on window load for contact form reset
window.addEventListener("load", function () {
  initContactPage();
});