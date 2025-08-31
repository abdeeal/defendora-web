
(function () {
  const stage = document.getElementById("stage");
  const DURATION = 5000; 
  let START_SIZE = 40;
  const SPAWN_INTERVAL = 1600;
  const OFFSET_OUT = -20; 

  function checkViewport() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      START_SIZE = 20;
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      console.log("Viewport ≤ 1024px");
      START_SIZE = 32;
    } else {
      console.log("Viewport > 1024px");
      START_SIZE = 40;
    }
  }

  checkViewport();

  window.addEventListener("resize", checkViewport);

  function getEdgePositions(count, edge) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const points = [];
    for (let i = 0; i < count; i++) {
  
      const t = count === 1 ? 0.5 : i / (count - 1);
      const x = Math.round(t * w);
      let y;
      if (edge === "top") y = -OFFSET_OUT;
      else if (edge === "bottom") y = h + OFFSET_OUT;
      else if (edge === "left") x = -OFFSET_OUT;
      points.push({ x, y });
    }
    return points;
  }

  function targetOffset(startX, startY) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = centerX - startX;
    const dy = centerY - startY;
    const factor = 0.8; 
    return {
      x: startX + dx * factor,
      y: startY + dy * factor,
    };
  }


  function spawnParticle(startX, startY, duration = DURATION) {
    const el = document.createElement("div");
    el.className = "particle";
    el.style.left = `${startX - START_SIZE / 2}px`;
    el.style.top = `${startY - START_SIZE / 2}px`;
    el.style.width = `${START_SIZE}px`;
    el.style.height = `${START_SIZE}px`;
    el.style.opacity = "1";
    el.style.backgroundColor = "#DE1B0A";
    stage.appendChild(el);

    const tgt = targetOffset(startX, startY);
    const startTime = performance.now();
    const startSize = START_SIZE;

    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration); 
      const progress = t;

      const curX = startX + (tgt.x - startX) * progress;
      const curY = startY + (tgt.y - startY) * progress;

      const curSize = Math.max(0, startSize * (1 - progress));

      let curOpacity;
      const fadeInPortion = 0.5; 
      if (t < fadeInPortion) {
        (curOpacity = t / fadeInPortion), 0.5;
      } else {
        curOpacity = 1 - (t - fadeInPortion) / (1 - fadeInPortion);
      }
      curOpacity = Math.max(0, Math.min(1, curOpacity));

      const r = Math.round(222 + (255 - 222) * progress);
      const g = Math.round(27 + (255 - 27) * progress);
      const b = Math.round(10 + (255 - 10) * progress);
      const curColor = `rgb(${r}, ${g}, ${b})`;

      el.style.left = `${curX - curSize / 2}px`;
      el.style.top = `${curY - curSize / 2}px`;
      el.style.width = `${curSize}px`;
      el.style.height = `${curSize}px`;
      el.style.opacity = `${curOpacity}`;
      el.style.backgroundColor = curColor;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.remove();
      }
    }

    requestAnimationFrame(tick);
  }


  function spawnBatch() {
    const topPts = getEdgePositions(4, "top");
    const bottomPts = getEdgePositions(4, "bottom");
    topPts.forEach((p) => spawnParticle(p.x, p.y));
    bottomPts.forEach((p) => spawnParticle(p.x, p.y));
  }

  let intervalId = null;
  function startLoop() {
    if (intervalId) return;
    spawnBatch();
    intervalId = setInterval(spawnBatch, SPAWN_INTERVAL);
  }

  function stopLoop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  window.addEventListener("resize", () => {

  });

  startLoop();
  window._particlesAPI = { start: startLoop, stop: stopLoop, spawnBatch };
})();



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
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
}
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

updateParticleCount();
window.addEventListener("resize", updateParticleCount);

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

animate();

function waitForElement(selector, callback) {
  const check = setInterval(() => {
    if (document.querySelector(selector)) {
      clearInterval(check);
      callback(document.querySelector(selector));
    }
  }, 50);
}

waitForElement(".float-bubble", () => {
  function floatBubble() {
    if (window.matchMedia("(max-width: 767px)").matches) {
      gsap.utils.toArray(".float-bubble").forEach((el, i) => {
        gsap.set(el, {
          y: `-10`,
        });

        gsap.to(el, {
          y: `10`,
          duration: `5`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 3.14 * 0.5,
        });
      });
    } else {
      gsap.utils.toArray(".float-bubble").forEach((el, i) => {
        gsap.set(el, {
          y: `-20`,
        });

        gsap.to(el, {
          y: `20`,
          duration: `5`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 3.14 * 0.5,
        });
      });
    }
  }
  floatBubble();

  window.addEventListener("resize", () => {
    floatBubble();
  });
});

waitForElement(".orbit", () => {
  gsap.utils.toArray(".orbit").forEach((orbit, i) => {
    const orbitItem = orbit.querySelector(".orbit-item");
    const textWr = orbit.querySelector(".orbit-wrapper");
    const text = orbit.querySelector(".orbit-text");

    function duration() {
      if (i == 0) {
        return 50;
      } else if (i == 1) {
        return 55;
      } else {
        return 60;
      }
    }

    gsap.to(orbit, {
      rotation: 360,
      duration,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
      onUpdate: function () {
        const currentRotation = gsap.getProperty(orbit, "rotation");
        gsap.set(orbitItem, { rotation: -currentRotation });

        gsap.set(textWr, { rotation: currentRotation });
        gsap.set(text, { rotation: -currentRotation });

      },
    });
  });
});
