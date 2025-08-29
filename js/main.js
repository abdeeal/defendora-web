// Paksa selalu mulai dari atas setiap reload
if (history.scrollRestoration) {
  history.scrollRestoration = "manual"; // biar browser ga restore posisi lama
}

window.addEventListener("beforeunload", () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0); // reset native scroll
  gsap.set("#section-wrapper", { clearProps: "x" }); // hapus transform x
  ScrollTrigger.refresh(); // sync ulang GSAP
});

function loadSection(id, file) {
  fetch(`sections/${file}`)
    .then((res) => res.text())
    .then((html) => (document.getElementById(id).innerHTML = html))
    .catch((err) => console.error(`Gagal memuat ${file}:`, err));
}

loadSection("home", "home.html");
loadSection("features", "features.html");
loadSection("facts", "facts.html");
loadSection("light-section", "world-facts.html");
loadSection("threats", "threats.html");
loadSection("pricing", "pricing.html");

// navbar modal
let navModal = false;
const navOverlay = document.querySelector("#nav-modal");
const navModalWrapper = document.querySelector("#nav-wrapper");

function toggleModal() {
  if (!navModal) {
    navOverlay.classList.add("nav-modal-active");
    document.body.style.overflow = "hidden";

    navModalWrapper.style.height = "fit-content";
    const targetHeight = navModalWrapper.scrollHeight;
    navModalWrapper.style.height = "0px";
    gsap.to(navModalWrapper, {
      height: targetHeight,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        navModalWrapper.style.height = targetHeight; // biar bisa resize isi
      },
    });

    navModal = true;
    const event = new CustomEvent("navModalChange", { detail: true });
    document.dispatchEvent(event);
  } else {
    gsap.to(navModalWrapper, {
      height: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        navOverlay.classList.remove("nav-modal-active");
      },
    });
    navModal = false;
    const event = new CustomEvent("navModalChange", { detail: false });
    document.dispatchEvent(event);
  }
}

navOverlay.addEventListener("click", (e) => {
  if (navModal && !navModalWrapper.contains(e.target)) {
    toggleModal();
  }
});
