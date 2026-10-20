// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// CLOSE MOBILE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    } catch (error) {
      alert('Oops! There was a problem submitting your form.');
    }
  });
}// ==========================
// DARK MODE TOGGLE LOGIC
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved user preference in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});


/* ==========================================
   BLUSH MAGIC WAND CURSOR
   Bright Sparkles + Hearts + Click Magic
========================================== */

(function startAuraCursor() {
  function initializeAuraCursor() {
    if (document.getElementById("aura-cursor")) return;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cursor = document.createElement("div");
    cursor.id = "aura-cursor";
    cursor.setAttribute("aria-hidden", "true");

    // Wand tip points toward the mouse position.
    const wand = document.createElement("div");
    wand.className = "aura-wand";

    wand.innerHTML = `
      <svg viewBox="0 0 38 48" width="38" height="48"
           xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wandRoseGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFF1F8"/>
            <stop offset="45%" stop-color="#E8A3BF"/>
            <stop offset="100%" stop-color="#B85F88"/>
          </linearGradient>
          <linearGradient id="wandGem" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="45%" stop-color="#F8D5E5"/>
            <stop offset="100%" stop-color="#D982A8"/>
          </linearGradient>
        </defs>

        <!-- Slender rose-gold wand shaft -->
        <path d="M33 4 L9 42"
          stroke="#B85F88" stroke-width="4"
          stroke-linecap="round" fill="none"/>
        <path d="M33 4 L9 42"
          stroke="url(#wandRoseGold)" stroke-width="2"
          stroke-linecap="round" fill="none"/>

        <!-- Decorative handle bands -->
        <path d="M13 35 L17 37.5 M11 38 L15 40.5"
          stroke="#FFF1F8" stroke-width="1.5"
          stroke-linecap="round"/>

        <!-- Heart-shaped gem -->
        <path d="M32 1
          C28 -3 21 0 23 5
          C24 8 29 11 32 13
          C35 10 40 6 39 3
          C38 -1 34 -2 32 1 Z"
          transform="translate(-5 4)"
          fill="url(#wandGem)"
          stroke="#FFF1F8" stroke-width="1"/>

        <!-- Gem highlight -->
        <path d="M27 4 Q30 1 32 5"
          transform="translate(-4 4)"
          stroke="#FFFFFF" stroke-width="1.2"
          fill="none" stroke-linecap="round"/>

        <!-- Tiny star at the wand tip -->
        <path d="M33 0 L34.5 3 L38 4.5 L34.5 6 L33 9
                 L31.5 6 L28 4.5 L31.5 3 Z"
          fill="#FFFFFF" stroke="#F8D5E5" stroke-width=".6"/>
      </svg>
    `;

    const aura = document.createElement("div");
    aura.className = "aura-wand-aura";

    cursor.appendChild(aura);
    cursor.appendChild(wand);
    document.body.appendChild(cursor);

    document.documentElement.classList.add("aura-cursor-active");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;

    let lastTrailX = -100;
    let lastTrailY = -100;
    let lastTrailTime = 0;

    const sparkleSpacing = 12;
    const sparkleInterval = 18;
    const maxSparkles = 65;

    // Create a bright, fading star or heart.
    function createSparkle(x, y, forceHeart = false) {
      const sparkle = document.createElement("span");
      sparkle.className = "aura-sparkle";

      const symbols = forceHeart
        ? ["♥", "♡", "✦"]
        : ["✦", "✧", "⋆", "✧", "♥"];

      sparkle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      const isHeart = sparkle.textContent === "♥" ||
                      sparkle.textContent === "♡";

      const size = isHeart
        ? 11 + Math.random() * 9
        : 10 + Math.random() * 13;

      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";
      sparkle.style.fontSize = size + "px";

      sparkle.style.setProperty(
        "--sparkle-drift-x",
        ((Math.random() - 0.5) * 54) + "px"
      );

      sparkle.style.setProperty(
        "--sparkle-drift-y",
        ((Math.random() - 0.5) * 54) + "px"
      );

      document.body.appendChild(sparkle);

      sparkle.addEventListener("animationend", () => {
        sparkle.remove();
      }, { once: true });

      while (document.querySelectorAll(".aura-sparkle").length > maxSparkles) {
        document.querySelector(".aura-sparkle")?.remove();
      }
    }

    function handlePointerMove(event) {
      if (event.pointerType === "touch") return;

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!visible) {
        ringX = mouseX;
        ringY = mouseY;
        visible = true;
        cursor.classList.add("is-visible");
      }

      if (reducedMotion) return;

      const now = performance.now();
      const dx = mouseX - lastTrailX;
      const dy = mouseY - lastTrailY;
      const distance = Math.hypot(dx, dy);

      if (
        distance >= sparkleSpacing &&
        now - lastTrailTime >= sparkleInterval
      ) {
        // Two particles per movement for a brighter trail.
        createSparkle(
          mouseX + (Math.random() - 0.5) * 12,
          mouseY + (Math.random() - 0.5) * 12
        );

        if (Math.random() > 0.35) {
          createSparkle(
            mouseX + (Math.random() - 0.5) * 22,
            mouseY + (Math.random() - 0.5) * 22
          );
        }

        lastTrailX = mouseX;
        lastTrailY = mouseY;
        lastTrailTime = now;
      }
    }

    function handlePointerLeave() {
      visible = false;
      cursor.classList.remove("is-visible");
    }

    function animateCursor() {
      if (visible) {
        const easing = reducedMotion ? 1 : 0.28;

        ringX += (mouseX - ringX) * easing;
        ringY += (mouseY - ringY) * easing;

        cursor.style.transform =
          `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(animateCursor);
    }

    // Interactive hover effects
    const hoverTargets = [
      "a", "button", "[role='button']",
      "input[type='button']", "input[type='submit']",
      "select", ".skill", ".project-card", ".social-link"
    ].join(",");

    document.addEventListener("pointerover", event => {
      if (event.target.closest(hoverTargets)) {
        cursor.classList.add("is-hovering");
      }
    });

    document.addEventListener("pointerout", event => {
      if (
        event.target.closest(hoverTargets) &&
        !event.relatedTarget?.closest?.(hoverTargets)
      ) {
        cursor.classList.remove("is-hovering");
      }
    });

    // Extra magical burst when clicking
    document.addEventListener("click", event => {
      if (reducedMotion) return;

      for (let i = 0; i < 7; i++) {
        const angle = (Math.PI * 2 * i) / 7;
        const radius = 10 + Math.random() * 20;

        createSparkle(
          event.clientX + Math.cos(angle) * radius,
          event.clientY + Math.sin(angle) * radius,
          i === 0
        );
      }
    });

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    animateCursor();
  }

  // START AURA CURSOR AFTER BODY IS AVAILABLE
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAuraCursor, {
      once: true
    });
  } else {
    initializeAuraCursor();
  }
})();
