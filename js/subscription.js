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

// subscription history

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".transaction-icon");

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const parent = icon.closest(".transaction-mobile");
      const details = parent.querySelector(".transaction-details");

      if (!details) return; // amanin kalau selector gagal

      const isHidden = details.classList.contains("transaction-hide");

      // toggle tampil/sembunyi
      details.classList.toggle("transaction-hide");

      // animasi rotasi ikon
      gsap.to(icon, {
        rotation: isHidden ? 180 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
});

let alertTimeline; // simpan timeline biar bisa di-reset

function preview() {
  const alert = document.querySelector(".alert-banner");
  const bar = document.querySelector(".progress-bar");

  // kalau ada animasi lama, hentikan
  if (alertTimeline) {
    alertTimeline.kill();
  }

  // reset state
  gsap.set(alert, { opacity: 1, display: "flex" });
  gsap.set(bar, { scaleX: 1, transformOrigin: "left" });

  // bikin timeline baru
  alertTimeline = gsap.timeline({
    onComplete: () => {
      gsap.set(alert, { display: "none" });
    },
  });

  alertTimeline.to(bar, {
    scaleX: 0,
    duration: 5,
    ease: "linear",
  });

  alertTimeline.to(
    alert,
    {
      opacity: 0,
      duration: 0.5,
    },
    ">"
  ); // animasi fadeOut setelah progress habis
}

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
