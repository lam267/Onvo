jQuery(function ($) {
    function setFillSize($btn) {
    var width = $btn.outerWidth();
    var height = $btn.outerHeight();
    var size = Math.sqrt(width * width + height * height) * 2;
    $btn.css('--fill-size', size + 'px');
    }

    $('.btn').each(function () {
    setFillSize($(this));
    });

    $('.btn').on('mousemove', function (e) {
    var $btn = $(this);
    var offset = $btn.offset();
    var width = $btn.outerWidth();
    var height = $btn.outerHeight();

    $btn.css('--x', ((e.pageX - offset.left) / width) * 100 + '%');
    $btn.css('--y', ((e.pageY - offset.top) / height) * 100 + '%');
    });

    $(window).on('resize', function () {
    $('.btn').each(function () {
        setFillSize($(this));
    });
    });

    $('.video-box').each(function () {
        var $box = $(this);
        var $video = $box.find('video');
        var $overlay = $box.find('.video-overlay');

        $overlay.on('click', function () {
            $video.get(0).play();
            $overlay.fadeOut();
        });

        $video.on('pause ended', function () {
            $overlay.fadeIn();
        });
    });

    $('.information-item').removeClass('active');
    $('.information-item').first().addClass('active');

    $('.information-item').on('click', function () {
      $('.information-item').removeClass('active');
      $(this).addClass('active');
    });

});

window.addEventListener("DOMContentLoaded", () => {
  try {
    const tp1 = document.getElementById("tp1");
    const tp2 = document.getElementById("tp2");
    const tp3 = document.getElementById("tp3");
    const textA = document.getElementById("textA");

    const speed = 0.8;
    const gap = 30;
    const textLength = textA.getComputedTextLength();
    const unit = textLength + gap;

    let offset = 0;

    function animate() {
      offset += speed;

      const x1 = -offset;
      const x2 = x1 + unit;
      const x3 = x2 + unit;

      if (x1 < -unit) {
        offset = 0;
      }

      tp1.setAttribute("startOffset", x1);
      tp2.setAttribute("startOffset", x2);
      tp3.setAttribute("startOffset", x3);

      requestAnimationFrame(animate);
    }

    animate();
  } catch (err) {
    console.error(err);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const swiperEl = document.querySelector('.slide-image');

  if (!swiperEl || typeof Swiper === 'undefined' || swiperEl.swiper) return;

  new Swiper(swiperEl, {
    loop: true,
    spaceBetween: 12,
    slidesPerView: 'auto',
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    speed: 800,
  });

});

$(document).ready(function () {
		$("#menu-icon").on("click", function () {
			$(this).toggleClass("active");
			$(this).closest(".header-container").find(".header-menu-mb").stop(true, true).slideToggle(300);
		});
	});

