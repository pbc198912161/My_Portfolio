/*
  Portfolio - script.js
  P Bharath Chowdary
  Features: Typing effect, scroll animations,
            navbar scroll, hamburger menu, contact form
*/

// ---- TYPING EFFECT ----
var roles = [
  "BCA Undergraduate Student",
  "Frontend Developer",
  "Startup Founder",
  "Prompt Engineer",
  "Cybersecurity Learner",
  "Published Poet",
  "Tech Community Leader"
];

var roleIndex  = 0;
var charIndex  = 0;
var isDeleting = false;
var typedEl    = document.getElementById("typed-text");

function type() {
  var current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    roleIndex   = (roleIndex + 1) % roles.length;
    setTimeout(type, 400);
    return;
  }

  var speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

setTimeout(type, 800);


// ---- NAVBAR SCROLL EFFECT ----
var navbar = document.getElementById("navbar");

window.addEventListener("scroll", function() {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  var backBtn = document.getElementById("back-to-top");
  backBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});


// ---- HAMBURGER MENU ----
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("nav-links").classList.remove("open");
  document.getElementById("hamburger").classList.remove("active");
}


// ---- SCROLL FADE-IN ANIMATIONS ----
var fadeElements = document.querySelectorAll(".fade-in");

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -40px 0px"
});

fadeElements.forEach(function(el) {
  observer.observe(el);
});


// ---- BACK TO TOP ----
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ---- CONTACT FORM ----
function handleFormSubmit(e) {
  e.preventDefault();

  var name    = document.getElementById("name").value;
  var email   = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  var successMsg = document.getElementById("form-success");
  successMsg.classList.remove("hidden");

  document.getElementById("contact-form").reset();

  setTimeout(function() {
    successMsg.classList.add("hidden");
  }, 5000);
}


// ---- ACTIVE NAV LINK ON SCROLL ----
var sections   = document.querySelectorAll("section[id]");
var navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function() {
  var scrollPos = window.scrollY + 120;

  sections.forEach(function(section) {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navAnchors.forEach(function(a) {
        a.classList.remove("active-link");
      });

      var activeLink = document.querySelector(
        '.nav-links a[href="#' + section.id + '"]'
      );
      if (activeLink) activeLink.classList.add("active-link");
    }
  });
});