gsap.registerPlugin(ScrollTrigger);

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

ScrollTrigger.create({
  trigger: "#scroll-container",
  start: "top top",
  end: () => `+=${getScrollAmount() * -1}`,
  pin: "#scroll-container",
  animation: tween,
  scrub: 1,
  invalidateOnRefresh: true,
});

// light navbar
const nav = document.querySelector("#navbar");
const navWrapper = document.querySelector(".navbar-wrapper");
const textLogo = document.querySelector("#defendora");
const btnLogin = document.querySelector(".btn-login");
const burgerIcon = document.querySelector(".burger-icon");

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

function setDark() {
  nav.classList.add("navbar");
  nav.classList.remove("navbar-light");
  textLogo.classList.add("defendora");
  textLogo.classList.remove("defendora-light");
  burgerIcon.classList.add("burger-icon");
  burgerIcon.classList.remove("burger-icon-light");
}

function setLight() {
  nav.classList.remove("navbar");
  nav.classList.add("navbar-light");
  textLogo.classList.remove("defendora");
  textLogo.classList.add("defendora-light");
  burgerIcon.classList.remove("burger-icon");
  burgerIcon.classList.add("burger-icon-light");
}

function applyNavState(newTrigger, oldTrigger) {
  if (oldTrigger && oldTrigger.isActive) {
    // Prioritas paling tinggi
    navMdl.classList.add("nav-modal-light");
    setLight();
    return;
  }

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

// simpan posisi oldTrigger sekali aja
const oldStart = getNavScroll();

// bikin trigger
newTrigger = ScrollTrigger.create({
  trigger: "#light-section",
  start: "top 534px",
  // markers: true,
  onEnter: (self) => applyNavState(self, oldTrigger),
  onLeaveBack: (self) => applyNavState(self, oldTrigger),
});

oldTrigger = ScrollTrigger.create({
  trigger: "#light-section",
  start: `top ${oldStart}`,
  // end: "+=1", // kasih area kecil biar konsisten aktif
  // markers: true,
  onEnter: (self) => applyNavState(newTrigger, self),
  onLeaveBack: (self) => applyNavState(newTrigger, self),
});

ScrollTrigger.refresh();
