// ==========================================================
// Bale Kapampangan Pipanganan - script.js
// 3-image carousel: the middle image is the big one. Clicking
// an arrow rotates the list so a different image becomes the
// center. It also rotates by itself every few seconds.
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.food-carousel');
  if (!carousel) return;

  const imgLeft = carousel.querySelector('.carousel-left');
  const imgCenter = carousel.querySelector('.carousel-center');
  const imgRight = carousel.querySelector('.carousel-right');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');

  // The images in the order they were placed in the HTML (left, center, right)
  const slides = [imgLeft, imgCenter, imgRight].map((img) => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
  }));

  // `position` is the index of the slide shown in the center
  let position = 1;
  let timer = null;

  // Wrap the index so it loops: -1 becomes the last slide, etc.
  const wrap = (i) => (i + slides.length) % slides.length;

  function render() {
    const show = [
      [imgLeft, slides[wrap(position - 1)]],
      [imgCenter, slides[wrap(position)]],
      [imgRight, slides[wrap(position + 1)]],
    ];

    show.forEach(([img, slide]) => {
      img.classList.add('is-fading');
      setTimeout(() => {
        img.src = slide.src;
        img.alt = slide.alt;
        img.classList.remove('is-fading');
      }, 180);
    });
  }

  function move(step) {
    position = wrap(position + step);
    render();
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => move(1), 4500);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  prevBtn.addEventListener('click', () => {
    move(-1);
    startAuto(); // restart the timer after a manual click
  });

  nextBtn.addEventListener('click', () => {
    move(1);
    startAuto();
  });

  // Pause while the mouse is over the carousel
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  startAuto();

  // Close the mobile menu after tapping a nav link
  const navCollapse = document.getElementById('mainNav');
  document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });
});
