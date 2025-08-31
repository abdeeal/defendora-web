function waitForElement(selector, callback) {
  const check = setInterval(() => {
    if (document.querySelector(selector)) {
      clearInterval(check);
      callback(document.querySelector(selector));
    }
  }, 50);
}

gsap.registerPlugin(ScrollTrigger, SplitText);

const sections = document.querySelector("#section-wrapper");

function getScrollAmount() {
  let sectionWidth = sections.scrollWidth;
  return -(sectionWidth - window.innerWidth);
}

const tween = gsap.to(sections, {
  x: getScrollAmount,
  duration: 3,
  ease: "none",
});

// ScrollTrigger.create({
//   trigger: "#scroll-container",
//   start: "top top",
//   end: () => `+=${getScrollAmount() * -1}`,
//   pin: "#scroll-container",
//   animation: tween,
//   scrub: 1,
//   invalidateOnRefresh: true,
// });

let horizontal;

function initScrollTrigger() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    createScrollTriggerMD();
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    createScrollTriggerXL();
  } else {
    createScrollTrigger();
  }
}

function createScrollTriggerMD() {
  horizontal = ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: "#scroll-container",
    animation: tween,
    scrub: 1,
    onUpdate: (e) => {
      let scale;
      let y;
      if (e.progress <= 0.5) {
        scale = gsap.utils.mapRange(0, 0.5, 1, 0.6, e.progress);
        y = gsap.utils.mapRange(0, 0.5, 0, -150, e.progress);
      } else {
        scale = gsap.utils.mapRange(0.5, 1, 0.6, 1, e.progress);
        y = gsap.utils.mapRange(0.5, 1, -150, -150, e.progress);
      }

      gsap.to("#red-bubble", {
        y,
        scale,
        x: `-${e.progress * 40}%`,
        overwrite: "auto",
        duration: 0.1,
      });
    },
    invalidateOnRefresh: true,
  });
}

function createScrollTriggerXL() {
  horizontal = ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: "#scroll-container",
    animation: tween,
    scrub: 1,
    onUpdate: (e) => {
      let scale;
      let y;
      if (e.progress <= 0.5) {
        scale = gsap.utils.mapRange(0, 0.5, 1, 0.7, e.progress);
        y = gsap.utils.mapRange(0, 0.5, 0, -50, e.progress);
      } else {
        scale = gsap.utils.mapRange(0.5, 1, 0.7, 1, e.progress);
        y = gsap.utils.mapRange(0.5, 1, -50, -50, e.progress);
      }

      gsap.to("#red-bubble", {
        scale,
        y,
        x: `-${e.progress * 50}%`,
        overwrite: "auto",
        duration: 0.1,
      });
    },
    invalidateOnRefresh: true,
  });
}

function createScrollTrigger() {
  horizontal = ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: "#scroll-container",
    animation: tween,
    scrub: 1,
    onUpdate: (e) => {
      let scale;
      let y;
      if (e.progress <= 0.5) {
        scale = gsap.utils.mapRange(0, 0.5, 1, 0.6, e.progress);
        y = gsap.utils.mapRange(0, 0.5, 0, 85, e.progress);
      } else {
        scale = gsap.utils.mapRange(0.5, 1, 0.6, 1, e.progress);
        y = gsap.utils.mapRange(0.5, 1, 85, 85, e.progress);
      }

      gsap.to("#red-bubble", {
        y,
        scale,
        x: `-${e.progress * 75}%`,
        overwrite: "auto",
        duration: 0.1,
      });
    },
    invalidateOnRefresh: true,
  });
}

initScrollTrigger();

window.addEventListener("resize", () => {
  horizontal.kill();
  initScrollTrigger();
});

// light navbar
const nav = document.querySelector("#navbar");
const navWrapper = document.querySelector(".navbar-wrapper");
const textLogo = document.querySelector("#defendora");
const btnLogin = document.querySelector(".btn-login");
const burgerIcon = document.querySelector(".burger-icon");
const registerLink = document.querySelector("#register-link");

function getNavScroll() {
  return navWrapper.offsetHeight;
}

const navMdl = document.querySelector("#nav-modal");
let navC = false; // state navModalChange
let newTrigger, oldTrigger;

// listen custom event
document.addEventListener("navModalChange", (e) => {
  navC = e.detail;
  applyNavState(newTrigger, oldTrigger);
});

function getEndValue() {
  if (window.matchMedia("(max-width: 47rem)").matches) {
    return "+=3500px";
  } else {
    return "+=5000px";
  }
}

function setDark() {
  nav.classList.add("navbar");
  nav.classList.remove("navbar-light");
  textLogo.classList.add("defendora");
  textLogo.classList.remove("defendora-light");
  burgerIcon.classList.add("burger-icon");
  burgerIcon.classList.remove("burger-icon-light");
  registerLink.classList.remove("register-link-light");
  registerLink.classList.add("register-link");
}

function setLight() {
  nav.classList.remove("navbar");
  nav.classList.add("navbar-light");
  textLogo.classList.remove("defendora");
  textLogo.classList.add("defendora-light");
  burgerIcon.classList.remove("burger-icon");
  burgerIcon.classList.add("burger-icon-light");
  registerLink.classList.add("register-link-light");
  registerLink.classList.remove("register-link");
}

function applyNavState(newTrigger, oldTrigger) {
  if (oldTrigger && oldTrigger.isActive) {
    // Prioritas paling tinggi
    navMdl.classList.add("nav-modal-light");
    setLight();
    return;
  } else {
    if (!newTrigger || !newTrigger.isActive) {
      // Belum masuk area trigger baru
      navMdl.classList.remove("nav-modal-light");
      setDark();
      return;
    }

    // Udah masuk area trigger baru
    if (navC) {
      navMdl.classList.add("nav-modal-light");
      setLight();
    } else {
      navMdl.classList.remove("nav-modal-light");
      setDark();
    }
  }
}

// simpan posisi oldTrigger sekali aja
const oldStart = getNavScroll();

function initTriggers() {
  // kill biar gak numpuk
  if (oldTrigger) oldTrigger.kill();
  if (newTrigger) newTrigger.kill();

  const oldStart = getNavScroll();

  // trigger baru
  newTrigger = ScrollTrigger.create({
    trigger: ".light-wrapper",
    start: "top 534px",

    onEnter: (self) => applyNavState(self, oldTrigger),
    onLeaveBack: (self) => applyNavState(self, oldTrigger),
  });

  // trigger lama
  oldTrigger = ScrollTrigger.create({
    trigger: ".light-wrapper",
    start: `top ${oldStart}`,
    end: () => getEndValue(),
    onEnter: (self) => applyNavState(newTrigger, self),
    onLeaveBack: (self) => applyNavState(newTrigger, self),
  });
}

// pertama kali
initTriggers();

// setiap resize
window.addEventListener("resize", () => {
  initTriggers();
  oldTrigger.refresh();
  newTrigger.refresh();
});

waitForElement(".lock-img", () => {
  gsap.to(".lock-img", {
    y: -20,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
});

waitForElement(".hero-title", () => {
  const tl = gsap.timeline();

  // Hero Title
  const heroTitle = document.querySelectorAll(".hero-title");
  const tg = document.querySelector(".tagline");
  const splitTg = new SplitText(tg, { type: "words" });
  heroTitle.forEach((title) => {
    const splitHero = new SplitText(title, { type: "words" });

    tl.from(
      splitHero.words,
      {
        y: 100,
        opacity: 0,
        filter: "blur(4px)",
        duration: 1,
        stagger: 0.03,
        ease: "back.out",
      },
      0
    );
  });

  tl.from(
    ".hero-text",
    {
      y: 100,
      opacity: 0,
      filter: "blur(4px)",
      duration: 1,
      ease: "back.out",
    },
    "0"
  );
  tl.from(
    ".cta-wrapper",
    {
      y: 100,
      opacity: 0,
      filter: "blur(4px)",
      duration: 1,
      ease: "back.out",
    },
    "0.2"
  );

  tl.from(
    splitTg.words,
    {
      y: 50,
      opacity: 0,
      filter: "blur(4px)",
      duration: 1,
      ease: "back.out",
      stagger: 0,
    },
    1.5
  );

  tl.from(
    ".lock-img",
    {
      opacity: 0,
      duration: 1,
      ease: "power2.in",
    },
    0.5
  );
});

const tl2 = gsap.timeline();
tl2.from(
  ".defendora",
  {
    opacity: 0,
    filter: "blur(4px)",
    duration: 1,
    ease: "none",
    immediateRender: false,
  },
  0
);

tl2
  .from(".nav-items", {
    width: 0,
    opacity: 0,
    duration: 1.5,
    ease: "back.out",
    filter: "blur(4px)",
  })
  .from(
    "#links-home",
    {
      opacity: 0,
      y: 50,
      filter: "blur(4px)",
      ease: "power2.out",
      duration: 0.5,
    },
    1
  )
  .from(
    "#links-facts",
    {
      opacity: 0,
      y: 50,
      filter: "blur(4px)",
      ease: "power2.out",
      duration: 0.5,
    },
    1.2
  )
  .from(
    "#links-pricing",
    {
      opacity: 0,
      y: 50,
      filter: "blur(4px)",
      ease: "power2.out",
      duration: 0.5,
    },
    1.4
  );

tl2.from(
  "#links-reg",
  {
    y: -50,
    opacity: 0,
    filter: "blur(4px)",
    duration: 1,
    ease: "none",
  },
  0
);

tl2.from(
  "#links-login",
  {
    y: -50,
    opacity: 0,
    filter: "blur(4px)",
    duration: 1,
    ease: "none",
  },
  0.5
);

waitForElement(".heading-threats", () => {
  const header = document.querySelector(".heading-threats");
  const splitH = new SplitText(header, { type: "words" });

  const tlwf = gsap.timeline({
    scrollTrigger: {
      trigger: header,
      start: "top 60%",
    },
  });

  tlwf
    .from(splitH.words, {
      y: 50,
      opacity: 0,
      filter: "blur(12px)",
      duration: 2,
      stagger: 0.1,
      ease: "back.out",
    })
    .from(
      ".virus-bg",
      {
        filter: "blur(4px)",
        opacity: 0,
        duration: 1,
      },
      "<+=0.5"
    );

  const floatBubbles = document.querySelectorAll(".float-bubble");
  floatBubbles.forEach((bubble, i) => {
    tlwf.from(
      bubble,
      {
        opacity: 0,
        duration: 1,
      },
      `<+=0.75`
    );
  });
});

waitForElement(".modern-heading", () => {
  const header = document.querySelector(".modern-heading");
  const splitH = new SplitText(header, { type: "words" });

  const hero = document.querySelector(".modern-paragraph");
  const splitHero = new SplitText(hero, { type: "lines" });

  const tlt = gsap.timeline({
    scrollTrigger: {
      trigger: header,
      start: "top 60%",
    },
  });

  tlt.from(splitH.words, {
    y: 50,
    opacity: 0,
    filter: "blur(12px)",
    duration: 2,
    stagger: 0.1,
    ease: "power3.out",
  });

  const tlp = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top 70%", // bisa atur beda dari header
    },
  });

  tlp.from(splitHero.lines, {
    y: 80,
    opacity: 0,
    filter: "blur(8px)",
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.out",
  });

  const threats = document.querySelectorAll(".up-threats");
  threats.forEach((threat, i) => {
    tlp.from(
      threat,
      {
        y: 80,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
      },
      `${i == 0 ? "<+=1" : "<+=0.15"}`
    );
  });

  tlp.from(
    ".sub-threats",
    {
      y: 80,
      opacity: 0,
      filter: "blur(8px)",
      duration: 1,
      ease: "power3.out",
    },
    `<+=0.15`
  );

  tlp.from(
    ".threats-mobile-card",
    {
      opacity: 0,
      filter: "blur(8px)",
      duration: 1,
    },
    1
  );
});

waitForElement(".heading-plan", () => {
  const header = document.querySelector(".heading-plan");
  const splitH = new SplitText(header, { type: "words" });

  const tlt = gsap.timeline({
    scrollTrigger: {
      trigger: header,
      start: "top 60%",
    },
  });

  tlt.from(splitH.words, {
    y: 50,
    opacity: 0,
    filter: "blur(12px)",
    duration: 2,
    stagger: 0.1,
    ease: "power3.out",
  });
});

const evolve = document.querySelector(".evolve-text");
const splitEvolve = new SplitText(evolve, { type: "words" });
const target = document.querySelector(".evolve-text");

let hasPassed = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasPassed) {
        waitForElement(".evolve-text", () => {
          evolve.style.opacity = "1";
          gsap.from(splitEvolve.words, {
            y: 50,
            opacity: 0,
            filter: "blur(12px)",
            duration: 2,
            stagger: 0.1,
            ease: "power3.out",
          });
        });
        hasPassed = true;
      } else {
        if (!hasPassed) {
          evolve.style.opacity = "0";
        }
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-50% 0px -50% 0px",
  }
);

observer.observe(document.querySelector(".evolve-text"));
