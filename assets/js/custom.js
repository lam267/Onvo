jQuery(function ($) {
  const thumbSwiper = new Swiper(".onvo-thumbSwiper", {
    spaceBetween: 17,
    slidesPerView: 2,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".onvo-portfolio-next",
      prevEl: ".onvo-portfolio-prev",
    },
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 41,
      },
    },
  });

  const mainSwiper = new Swiper(".onvo-mainSwiper", {
    spaceBetween: 10,
    thumbs: {
      swiper: thumbSwiper,
    },
  });

  $(".custom-video").each(function () {
    const $wrapper = $(this);
    const $video = $wrapper.find(".video-element");
    const $playBtn = $wrapper.find(".play-btn");

    $playBtn.on("click", function () {
      $video.get(0).play();
      $(this).hide();
      $video.attr("controls", "controls");
      $wrapper.addClass("playing");
    });

    $video.on("pause ended", function () {
      $wrapper.removeClass("playing");
    });
  });
});
