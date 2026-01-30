
// clear form before unload
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

// burger menu toggle
const burger = document.querySelector(".burger");
const navMenu = document.querySelector("nav ul");
const overlay = document.querySelector(".nav-overlay");

if (burger && navMenu && overlay) {
  const toggleMenu = () => {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    burger.classList.toggle("active"); // ✅ animasi jadi X
    };

  burger.addEventListener("click", toggleMenu);

  // klik overlay menutup menu
  overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
  burger.classList.remove("active"); // ✅ balik jadi burger
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    burger.classList.remove("active"); // ✅ balik jadi burger
  });
});
}

const typingEl = document.getElementById("typing");

if (typingEl) {
  const words = ["Rizal Rachmat R", "Web Developer", "UI/UX Designer", "Full Stack Dev"];
  let wordIndex = 0;

  const typeWord = async (word) => {
    typingEl.textContent = "";
    for (let i = 0; i < word.length; i++) {
      typingEl.textContent += word[i];
      await new Promise((r) => setTimeout(r, 90));
    }
    await new Promise((r) => setTimeout(r, 900));
  };

  const deleteWord = async () => {
    while (typingEl.textContent.length > 0) {
      typingEl.textContent = typingEl.textContent.slice(0, -1);
      await new Promise((r) => setTimeout(r, 50));
    }
  };

  (async function loop() {
    while (true) {
      await typeWord(words[wordIndex]);
      await deleteWord();
      wordIndex = (wordIndex + 1) % words.length;
    }
  })();
}

/* =========================
   FULL SCROLL ANIMATION FLOW
   ========================= */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  // kasih delay otomatis untuk elemen dalam 1 container (stagger)
  // container ditandai dengan data-stagger
  document.querySelectorAll("[data-stagger]").forEach((wrap) => {
    const items = wrap.querySelectorAll(".reveal");
    items.forEach((el, i) => {
      const step = Number(wrap.dataset.stagger) || 80; // ms
      el.style.setProperty("--d", `${i * step}ms`);
    });
  });

  const io = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -22% 0px",
  }
);

  reveals.forEach((el) => io.observe(el));
})();

/* =========================
   PARALLAX BG (ULTRA SMOOTH)
   tempel di PALING BAWAH main.js
   ========================= */
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let latestY = 0;
  let ticking = false;

  const update = () => {
    ticking = false;
    const offset = Math.min(55, latestY * 0.06); // halus, tidak berat
    document.documentElement.style.setProperty("--bgShift", `${offset}px`);
  };

  window.addEventListener(
    "scroll",
    () => {
      latestY = window.scrollY || 0;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
})();