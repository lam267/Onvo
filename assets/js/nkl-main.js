const imgSwiper = new Swiper('.cp-img-swiper', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 700,
    allowTouchMove: false,
    loop: true,
});

const contentSwiper = new Swiper('.cp-content-swiper', {
    speed: 600,
    loop: true,
    autoHeight: false,
    pagination: {
        el: '.cp-content-swiper .swiper-pagination',
        clickable: true,
    },
    on: {
        slideChange: function () {
            imgSwiper.slideToLoop(this.realIndex, 700);
        }
    }
});

new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 12,
    loop: true,
    centeredSlides: false,
    pagination: {
        el: '.gallery-swiper .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        480: { slidesPerView: 2.2, spaceBetween: 12 },
        768: { slidesPerView: 3.2, spaceBetween: 12 },
        1024: { slidesPerView: 3.8, spaceBetween: 12 },
    }
});

const track = document.getElementById('timelineTrack');
const items = Array.from(track.querySelectorAll('.timeline-item'));
let autoSpeed = 0.6;
let isPaused = false;
let rafId;

function updateActive() {
  const trackCenter = track.scrollLeft + track.clientWidth / 2;
  let closest = { idx: 0, dist: Infinity };
  items.forEach((el, i) => {
    const itemCenter = el.offsetLeft + el.offsetWidth / 2;
    const dist = Math.abs(itemCenter - trackCenter);
    if (dist < closest.dist) closest = { idx: i, dist };
  });
  items.forEach((el, i) => el.classList.toggle('is-active', i === closest.idx));
}

function autoScroll() {
  if (!isPaused) {
    track.scrollLeft += autoSpeed;
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
      track.scrollLeft = 0;
    }
    updateActive();
  }
  rafId = requestAnimationFrame(autoScroll);
}
rafId = requestAnimationFrame(autoScroll);
updateActive();

track.addEventListener('mouseenter', () => isPaused = true);
track.addEventListener('mouseleave', () => isPaused = false);
track.addEventListener('touchstart', () => isPaused = true, { passive: true });
track.addEventListener('touchend', () => {
  updateActive();
  setTimeout(() => isPaused = false, 1200);
}, { passive: true });

let isDown = false, startX, scrollLeft;
track.addEventListener('mousedown', e => {
  isDown = true;
  isPaused = true;
  track.style.cursor = 'grabbing';
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});
['mouseleave', 'mouseup'].forEach(ev => track.addEventListener(ev, () => {
  if (!isDown) return;
  isDown = false;
  track.style.cursor = 'grab';
  updateActive();
}));
track.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.2;
  updateActive();
});

const STEP = 280;
document.getElementById('tlPrev').addEventListener('click', () => {
  isPaused = true;
  track.scrollBy({ left: -STEP, behavior: 'smooth' });
  setTimeout(() => { updateActive(); isPaused = false; }, 400);
});
document.getElementById('tlNext').addEventListener('click', () => {
  isPaused = true;
  track.scrollBy({ left: STEP, behavior: 'smooth' });
  setTimeout(() => { updateActive(); isPaused = false; }, 400);
});