function waitForElement(selector, callback) {
  const check = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(check);
      callback(el);
    }
  }, 50);
}

waitForElement(".owl-carousel", (carousel) => {
  $(carousel).owlCarousel({
    dots: true,
    loop: true,
    nav: true,
    items: 1,
    margin: 16,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
  });
});
