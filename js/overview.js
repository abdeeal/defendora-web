const isLogin = localStorage.getItem("login");
isLogin ? "" : (window.location.href = "auth.html?please-login-first");

let navModal = false;
const navProfileModal = document.querySelector("#nav-profile-modal");
const navProfileWrapper = document.querySelector("#nav-profile-wrapper");

function toggleModal() {
  if (!navModal) {
    navProfileModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    navProfileWrapper.style.height = "0px";
    gsap.to(navProfileWrapper, {
      height: "400px",
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        navProfileWrapper.style.height = "400px";
      },
    });

    navModal = true;
  } else {
    gsap.to(navProfileWrapper, {
      height: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        navProfileModal.style.display = "none";
      },
    });
    navModal = false;
  }
}

navProfileModal.addEventListener("click", (e) => {
  if (navModal && !navProfileWrapper.contains(e.target)) {
    toggleModal();
  }
});

const loader = document.getElementById("loader");
function logout() {
  document.querySelector(".hide-loader").classList.remove("hide-loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      loader.style.display = "none";
      document.body.style.overflow = "";

      localStorage.removeItem("login");
      window.location.href = "/";
    }, 600);
  }, 3000);
}

function removeThreats(id, tw) {
  const tr = document.querySelector("#" + id);

  gsap.to("#" + tw, {
    x: "10%",
    ease: "power1.in",
    onComplete: () => {
      tr.style.display = "none";
    },
  });
}
const msg = document.getElementById("threat-msg");

let lastState = null;

setInterval(() => {
  function hasVisibleChild(parentId) {
    const parent = document.getElementById(parentId);
    const children = parent.children;
    let isAny = false;

    for (let child of children) {
      if (child.id === "threat-msg") {
        continue;
      }
      const style = window.getComputedStyle(child);
      if (style.display !== "none") {
        isAny = true;
        break;
      }
    }

    return isAny;
  }

  const visible = hasVisibleChild("threat-list");

  if (visible && lastState !== "hidden") {
    msg.style.display = "none";
    lastState = "hidden";
  } else if (!visible && lastState !== "shown") {
    msg.style.display = "flex";
    lastState = "shown";
  }
}, 1000);

// loading
const vLoader = document.querySelector(".hide-loader");
function loading(dur) {
  vLoader.classList.remove("fade-out");
  vLoader.classList.remove("hide-loader");

  setTimeout(() => {
    vLoader.classList.add("fade-out");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      document.body.style.overflow = "";
      vLoader.classList.add("hide-loader");

      vLoader.classList.remove("fade-out");
    }, 600);
  }, dur);
}

// toggle
const toggleStates = {};

document.querySelectorAll(".df-toggle").forEach((toggle) => {
  const circle = toggle.querySelector(".df-toggle-circle");
  const id = toggle.dataset.toggle;
  const initialState = toggle.dataset.active === "true"; // baca dari HTML
  toggleStates[id] = initialState;

  // Set tampilan awal sesuai state
  if (initialState) {
    gsap.set(circle, { x: 38 });
    gsap.set(toggle, { backgroundColor: "#CE1C1C" });
  } else {
    gsap.set(circle, { x: 0 });
    gsap.set(toggle, { backgroundColor: "#777" });
  }

  // Event listener klik
  toggle.addEventListener("click", () => {
    toggleStates[id] = !toggleStates[id]; // ubah state

    loading(1000);
    setTimeout(() => {
      if (toggleStates[id]) {
        if (id === "1") {
          document.getElementById("df-card-1").classList.remove("df-off-card");
          document.getElementById("df-i-1").classList.remove("df-off-icon");
          document.getElementById("df-card-1").classList.add("df-on-card");
          document.getElementById("df-i-1").classList.add("df-on-icon");
          document.getElementById("df-text-1").innerText = "Protection active";
          document.getElementById("df-sub-1").innerText =
            "Your connection is secured";
        } else if (id === "2") {
          document.getElementById("df-card-2").classList.remove("df-off-card");
          document.getElementById("df-i-2").classList.remove("df-off-icon");
          document.getElementById("df-card-2").classList.add("df-on-card");
          document.getElementById("df-i-2").classList.add("df-on-icon");
          document.getElementById("df-text-2").innerText = "Protection active";
          document.getElementById("df-sub-2").innerText =
            "Your device is secured";
        } else if (id === "3") {
          document.getElementById("df-card-3").classList.remove("df-off-card");
          document.getElementById("df-i-3").classList.remove("df-off-icon");
          document.getElementById("df-card-3").classList.add("df-on-card");
          document.getElementById("df-i-3").classList.add("df-on-icon");
          document.getElementById("df-text-3").innerText = "Protection active";
          document.getElementById("df-sub-3").innerText =
            "Your device is secured";
        } else if (id === "4") {
          document.getElementById("df-text-4").innerText = ": active";
        }

        gsap.to(circle, { x: 38, duration: 0.3, ease: "power2.out" });
        gsap.to(toggle, { backgroundColor: "#CE1C1C", duration: 0.3 });
      } else {
        if (id === "1") {
          document.getElementById("df-card-1").classList.add("df-off-card");
          document.getElementById("df-i-1").classList.add("df-off-icon");
          document.getElementById("df-card-1").classList.remove("df-on-card");
          document.getElementById("df-i-1").classList.remove("df-on-icon");
          document.getElementById("df-text-1").innerText =
            "Protection inactive";
          document.getElementById("df-sub-1").innerText =
            "Your connection isn't secured";
        } else if (id === "2") {
          document.getElementById("df-card-2").classList.add("df-off-card");
          document.getElementById("df-i-2").classList.add("df-off-icon");
          document.getElementById("df-card-2").classList.remove("df-on-card");
          document.getElementById("df-i-2").classList.remove("df-on-icon");
          document.getElementById("df-text-2").innerText =
            "Protection inactive";
          document.getElementById("df-sub-2").innerText =
            "Your device isn't secured";
        } else if (id === "3") {
          document.getElementById("df-card-3").classList.add("df-off-card");
          document.getElementById("df-i-3").classList.add("df-off-icon");
          document.getElementById("df-card-3").classList.remove("df-on-card");
          document.getElementById("df-i-3").classList.remove("df-on-icon");
          document.getElementById("df-text-3").innerText =
            "Protection inactive";
          document.getElementById("df-sub-3").innerText =
            "Your device isn't secured";
        } else if (id === "4") {
          document.getElementById("df-text-4").innerText = ": inactive";
        }

        gsap.to(circle, { x: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(toggle, { backgroundColor: "#777", duration: 0.3 });
      }
    }, 1000);
  });
});

const btnProtection = document.querySelector(".ov-circle-icon");
let isProtected = true;
const circles = document.querySelectorAll(".overview-circle");

btnProtection.addEventListener("click", () => {
  if (isProtected) {
    loading(1000);
    setTimeout(() => {
      gsap.to("#shackle", {
        y: -6,
        ease: "bounce.out",
      });

      btnProtection.classList.add("ov-active");
      document.querySelector("#text-protected").innerText =
        "You're not protected";

      circles.forEach((circle) => {
        gsap.to(circle, {
          opacity: 0,
          delay: 0.5,
          duration: 2,
        });
      });
    }, 1000);
    isProtected = false;
  } else {
    loading(1000);
    setTimeout(() => {
      gsap.to("#shackle", {
        y: 0,
        ease: "bounce.in",
      });

      btnProtection.classList.remove("ov-active");
      document.querySelector("#text-protected").innerText = "You're protected";

      circles.forEach((circle) => {
        gsap.to(circle, {
          opacity: 0.7,
          delay: 0.5,
          duration: 2,
        });
      });
    }, 1000);
    isProtected = true;
  }
});
