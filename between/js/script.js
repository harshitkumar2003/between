(function ($) {

  "use strict";

  var searchPopup = function () {
    // open search box
    $('#header-nav').on('click', '.search-button', function (e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $('#header-nav').on('click', '.btn-close-search', function (e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $(".search-popup-trigger").on("click", function (b) {
      b.preventDefault();
      $(".search-popup").addClass("is-visible"),
        setTimeout(function () {
          $(".search-popup").find("#search-popup").focus()
        }, 350)
    }),
      $(".search-popup").on("click", function (b) {
        ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function (b) {
        "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
  }

  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  $(document).ready(function () {

    searchPopup();
    initProductQty();

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      navigation: {
        nextEl: ".swiper-arrow-prev",
        prevEl: ".swiper-arrow-next",
      },
    });

    var swiper = new Swiper(".product-swiper", {
      slidesPerView: 5,
      spaceBetween: 20,
      pagination: {
        el: "#mobile-products .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        360: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        760: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1010: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1221: {
          slidesPerView: 5,
          spaceBetween: 10,
        }
      },
    });

    var swiper = new Swiper(".product-watch-swiper", {
      slidesPerView: 5,
      spaceBetween: 20,
      pagination: {
        el: "#smart-watches .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        360: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        760: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1010: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1221: {
          slidesPerView: 5,
          spaceBetween: 10,
        }
      },
    });

    var swiper = new Swiper(".testimonial-swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
      },
    });

  }); // End of a document ready

})(jQuery);


// jquery for FAQ

jQuery(document).ready(function ($) {

  var MqM = 768,
    MqL = 1024;

  var faqsSections = $('.faq-group'),
    faqTrigger = $('.trigger'),
    faqsContainer = $('.faq-items'),
    faqsCategoriesContainer = $('.categories'),
    faqsCategories = faqsCategoriesContainer.find('a'),
    closeFaqsContainer = $('.cd-close-panel');

  //select a faq section 
  faqsCategories.on('click', function (event) {
    event.preventDefault();
    var selectedHref = $(this).attr('href'),
      target = $(selectedHref);
    if ($(window).width() < MqM) {
      faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
      closeFaqsContainer.addClass('move-left');
      $('body').addClass('cd-overlay');
    } else {
      $('body,html').animate({ 'scrollTop': target.offset().top - 19 }, 200);
    }
  });

  //close faq lateral panel - mobile only
  $('body').bind('click touchstart', function (event) {
    if ($(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) {
      closePanel(event);
    }
  });
  faqsContainer.on('swiperight', function (event) {
    closePanel(event);
  });


  faqTrigger.on('click', function (event) {
    event.preventDefault();
    $(this).next('.faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
  });

  $(window).on('scroll', function () {
    if ($(window).width() > MqL) {
      (!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
    }
  });

  $(window).on('resize', function () {
    if ($(window).width() <= MqL) {
      faqsCategoriesContainer.removeClass('is-fixed').css({
        '-moz-transform': 'translateY(0)',
        '-webkit-transform': 'translateY(0)',
        '-ms-transform': 'translateY(0)',
        '-o-transform': 'translateY(0)',
        'transform': 'translateY(0)',
      });
    }
    if (faqsCategoriesContainer.hasClass('is-fixed')) {
      faqsCategoriesContainer.css({
        'left': faqsContainer.offset().left,
      });
    }
  });

  function closePanel(e) {
    e.preventDefault();
    faqsContainer.removeClass('slide-in').find('li').show();
    closeFaqsContainer.removeClass('move-left');
    $('body').removeClass('cd-overlay');
  }

  function updateCategory() {
    updateCategoryPosition();
    updateSelectedCategory();
  }

  function updateCategoryPosition() {
    var top = $('.faq').offset().top,
      height = jQuery('.faq').height() - jQuery('.categories').height(),
      margin = 20;
    if (top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop()) {
      var leftValue = faqsCategoriesContainer.offset().left,
        widthValue = faqsCategoriesContainer.width();
      faqsCategoriesContainer.addClass('is-fixed').css({
        'left': leftValue,
        'top': margin,
        '-moz-transform': 'translateZ(0)',
        '-webkit-transform': 'translateZ(0)',
        '-ms-transform': 'translateZ(0)',
        '-o-transform': 'translateZ(0)',
        'transform': 'translateZ(0)',
      });
    } else if (top - margin + height <= $(window).scrollTop()) {
      var delta = top - margin + height - $(window).scrollTop();
      faqsCategoriesContainer.css({
        '-moz-transform': 'translateZ(0) translateY(' + delta + 'px)',
        '-webkit-transform': 'translateZ(0) translateY(' + delta + 'px)',
        '-ms-transform': 'translateZ(0) translateY(' + delta + 'px)',
        '-o-transform': 'translateZ(0) translateY(' + delta + 'px)',
        'transform': 'translateZ(0) translateY(' + delta + 'px)',
      });
    } else {
      faqsCategoriesContainer.removeClass('is-fixed').css({
        'left': 0,
        'top': 0,
      });
    }
  }

  function updateSelectedCategory() {
    faqsSections.each(function () {
      var actual = $(this),
        margin = parseInt($('.faq-title').eq(1).css('marginTop').replace('px', '')),
        activeCategory = $('.categories a[href="#' + actual.attr('id') + '"]'),
        topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);

      if ((topSection - 20 <= $(window).scrollTop()) && (Math.round(actual.offset().top) + actual.height() + margin - 20 > $(window).scrollTop())) {
        activeCategory.addClass('selected');
      } else {
        activeCategory.removeClass('selected');
      }
    });
  }
});


// for blog page
let articles = document.querySelectorAll(".article");

articles.forEach(i => {
  i.addEventListener(
    "mousemove",
    e => {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      i.querySelector(".overlay")
        .style.setProperty(
          "background-image",
          `radial-gradient(circle at ${(mouseX) * 100 / -i.offsetWidth + 100}% ${(mouseY) * 100 / -i.offsetHeight + 100}%,rgba(0,0,0,0.2) 25%,rgba(0,0,0,0.33) 50%)`
        );
      i.style.setProperty("transform", `rotateY(${(((mouseX * 100) / i.offsetWidth - 50) / 100) * 3}deg) rotateX(${(((mouseY * 100) / i.offsetHeight - 50) / 100) * 3}deg) `
      )
    },
    false
  );
  i.addEventListener("mouseleave", () => {
    i.style.setProperty("transform", `rotateX(0deg) rotateY(0deg)`);

    i.querySelector(".overlay")
      .style.setProperty(
        "background-image",
        `radial-gradient(circle at 50% 50%,rgba(0,0,0,0.2) 20%,rgba(0,0,0,0.3) 50%)`
      );
  })
});
