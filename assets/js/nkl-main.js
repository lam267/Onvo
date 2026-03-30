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