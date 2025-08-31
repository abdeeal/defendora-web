function initParticleCanvas(containerSelector, canvasId) {
  const container = document.querySelector(containerSelector);
  const canvas = document.getElementById(canvasId);
  if (!container || !canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = container.getBoundingClientRect().width;
  canvas.height = container.getBoundingClientRect().height;

  let particles = [];
  let particleCount;

  function updateParticleCount() {
    const width = window.innerWidth;
    if (width <= 576) {
      particleCount = 20;
    } else if (width <= 1024) {
      particleCount = 30;
    } else {
      particleCount = 40;
    }
    generateParticles();
  }

  function generateParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(134, 23, 23, ${p.opacity})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }

  updateParticleCount();
  window.addEventListener("resize", () => {
    canvas.width = container.getBoundingClientRect().width;
    canvas.height = container.getBoundingClientRect().height;
    updateParticleCount();
  });

  animate();
}

initParticleCanvas(".side-auth", "canvasRight");
initParticleCanvas(".side-auth-mobile", "canvas-mobile");

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

// auth change
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("form-login");
  const registerForm = document.getElementById("form-register");
  const goRegister = document.getElementById("goRegister");
  const goLogin = document.getElementById("goLogin");

  if (!loginForm || !registerForm) {
    console.error("form-login atau form-register tidak ditemukan di DOM.");
    return;
  }
  if (typeof gsap === "undefined") {
    console.error("GSAP tidak ditemukan. Pastikan sudah include GSAP.");
    return;
  }

  const container = loginForm.parentElement;
  if (container) {
    container.style.position = container.style.position || "relative";
    container.style.overflow = container.style.overflow || "hidden";
  }

  [loginForm, registerForm].forEach((el) => {
    Object.assign(el.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      margin: "0",
    });
  });

  let isAnimating = false;

  function setInitialState() {
    const section = new URLSearchParams(window.location.search).get("s");
    if (section === "reg") {
      gsap.set(registerForm, {
        x: "0%",
        opacity: 1,
        pointerEvents: "auto",
        zIndex: 2,
      });
      gsap.set(loginForm, {
        x: "-100%",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 1,
      });
    } else {
      gsap.set(loginForm, {
        x: "0%",
        opacity: 1,
        pointerEvents: "auto",
        zIndex: 2,
      });
      gsap.set(registerForm, {
        x: "100%",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 1,
      });
    }
  }

  function animateTo(targetSection) {
    if (isAnimating) return;
    isAnimating = true;

    let fromEl, toEl, direction;
    if (targetSection === "reg") {
      fromEl = loginForm;
      toEl = registerForm;
      direction = "left";
    } else {
      fromEl = registerForm;
      toEl = loginForm;
      direction = "right";
    }

    const toStartX = direction === "left" ? "10%" : "-10%";
    const fromEndX = direction === "left" ? "-10%" : "10%";

    gsap.set(toEl, {
      x: toStartX,
      opacity: 0,
      pointerEvents: "none",
      zIndex: 3,
    });
    gsap.set(fromEl, { zIndex: 2 });

    const tl = gsap.timeline({
      defaults: { duration: 0.55, ease: "power2.out" },
      onComplete: () => {
        gsap.set(toEl, {
          x: "0%",
          opacity: 1,
          pointerEvents: "auto",
          zIndex: 2,
        });
        gsap.set(fromEl, {
          x: fromEndX,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1,
        });
        isAnimating = false;
      },
    });

    tl.to(fromEl, { x: fromEndX, opacity: 0 }).fromTo(
      toEl,
      { x: toStartX, opacity: 0 },
      { x: "0%", opacity: 1 },
      "0.4"
    );
  }

  if (goRegister) {
    goRegister.addEventListener("click", (e) => {
      e.preventDefault();
      if (new URLSearchParams(window.location.search).get("s") === "reg")
        return;
      history.pushState(null, "", "?s=reg");
      animateTo("reg");
    });
  }

  if (goLogin) {
    goLogin.addEventListener("click", (e) => {
      e.preventDefault();
      if (new URLSearchParams(window.location.search).get("s") !== "reg")
        return;
      history.pushState(null, "", "?s=login");
      animateTo("login");
    });
  }

  window.addEventListener("popstate", () => {
    const section = new URLSearchParams(window.location.search).get("s");
    animateTo(section === "reg" ? "reg" : "login");
  });

  setInitialState();
});

function login() {
  const u = document.querySelector("#username").value;
  const p = document.querySelector("#password").value;
  const erl = document.querySelector(".errmsgL");

  if (u && p) {
    loading(1000);
    setTimeout(() => {
      localStorage.setItem("login", "John Doe");
      window.location.href = "overview.html";
    }, 1000);
  } else {
    erl.innerHTML = "Username atau password tidak boleh kosong.";
  }
}

function gLogin(e) {
  loading(3000);
  setTimeout(() => {
    e.preventDefault();
    e.stopPropagation();

    localStorage.setItem("login", "John Doe");
    window.location.href = "overview.html";
  }, 2000);
}

function register() {
  const u = document.querySelector("#usernameReg").value;
  const p = document.querySelector("#passwordReg").value;
  const err = document.querySelector(".errmsgR");

  if (u && p) {
    loading(1000);
    setTimeout(() => {
      window.location.href = "auth.html";
    }, 1000);
  } else {
    err.innerHTML = "Username atau password tidak boleh kosong.";
  }
}
