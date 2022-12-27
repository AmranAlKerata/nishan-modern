$(function() {
  const navItems = $(".menu-links li");
  const menuIcon = $(".menu .icon");
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $("header").outerHeight();

  // Remove Preloader after 500 ms, you can change the period by editing the number below, NOTE: 1000 means 1 Second

  // setTimeout(() => {
  //   $("body").removeClass("is-loading");
  //   $(".preloader").fadeOut("slow", function() {
  //     $(this).remove();
  //   });
  // }, 500);

  // Menu

  $(".menu .icon").on("click", () => {
    $(".menu .icon").toggleClass("active");
    $(".menu-links").toggleClass("active");
    // Hide Header on scroll down
    $(window).scroll(() => {
      didScroll = true;
      //  Show or hide go up button depended on widnow scroll Y.
      window.scrollY >= window.innerHeight - $("#home").innerHeight
        ? $(".go-up").addClass("active")
        : $(".go-up").removeClass("active");
    });

    setInterval(() => {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    const hasScrolled = () => {
      let st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta) return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight + $("#home").outerHeight()) {
        // Scroll Down
        $("header").removeClass("nav-down").addClass("nav-up");
      } else {
        // Scroll Up
        if (
          st + $(window).height() + $("#home").outerHeight() <
          $(document).height()
        ) {
          $("header").removeClass("nav-up").addClass("nav-down");
        }
      }

      lastScrollTop = st;
    };

    navItems.each(function(index) {
      if ($(".menu-links").hasClass("active")) {
        $(this).attr("class", `delay-${index + 1}`);
        $(this)
          .find(".container")
          .attr(
            "class",
            `container animate animate__fadeInUp delay-${index + 1}`
          );
      } else {
        $(this).attr("class", `finish delay-${index + 1}`);
        $(this)
          .find(".container")
          .attr("class", `container animate animate__fadeOutDown`);

        $(this).css("pointer-events", "none");

        const timeout = setTimeout(() => {
          $(this).attr("class", "");
          $(this).find(".container").attr("class", "container");
          clearTimeout(timeout);
          return;
        }, 1500);
      }
    });
  });
  // enable the plugin
  anm.on();

  // $(".home .col-12.col-lg-10 * ").on("mouseenter", () => {
  //   $(".home h1, .home p").addClass("text-white");
  //   $(".home-circle").addClass("active");
  // });
  // $(".home .col-12.col-lg-10").on("mouseleave", () => {
  //   $(".home h1, .home p").removeClass("text-white");
  //   $(".home-circle").removeClass("active");
  // });

  // must be an array, could have only one element
  let visibilityIds = [ "#counters_1", "#counters_2", "#counters_3" ];

  // default counter class
  let counterClass = ".counter";

  // default animation speed
  let defaultSpeed = 3000;

  if (window.innerWidth <= 992) {
    $("footer ul:not(.first-list)").slideUp();
    $("footer .footer-accordion").on("click", function() {
      $(this).parent().find("ul").slideToggle();
    });
  }

  // // Hide Header on scroll down
  // $(window).scroll(() => {
  //   didScroll = true;
  //   //  Show or hide go up button depended on widnow scroll Y.
  //   window.scrollY >= window.innerHeight - $("#home").innerHeight
  //     ? $(".go-up").addClass("active")
  //     : $(".go-up").removeClass("active");
  // });

  // setInterval(() => {
  //   if (didScroll) {
  //     hasScrolled();
  //     didScroll = false;
  //   }
  // }, 250);

  // const hasScrolled = () => {
  //   let st = $(this).scrollTop();

  //   // Make sure they scroll more than delta
  //   if (Math.abs(lastScrollTop - st) <= delta) return;

  //   // If they scrolled down and are past the navbar, add class .nav-up.
  //   // This is necessary so you never see what is "behind" the navbar.
  //   if (st > lastScrollTop && st > navbarHeight + $("#home").outerHeight()) {
  //     // Scroll Down
  //     $("header").removeClass("nav-down").addClass("nav-up");
  //   } else {
  //     // Scroll Up
  //     if (
  //       st + $(window).height() + $("#home").outerHeight() <
  //       $(document).height()
  //     ) {
  //       $("header").removeClass("nav-up").addClass("nav-down");
  //     }
  //   }

  //   lastScrollTop = st;
  // };

  // Prevent Scroll when you click on menu Icon on mobile

  menuIcon.on("click", () => {
    if ($(".menu .icon").hasClass("active")) {
      $("body").css({
        height: "100vh",
        overflowY: "hidden"
      });
    } else {
      $("body").css({
        height: "auto",
        overflowY: "scroll"
      });
    }
  });

  // Close Sidebar menu when you click on a link
  $(".menu-links a").on("click", () => {
    menuIcon.click();
  });

  // Swiper Js Settings

  // const booksSwiper = new Swiper("#booksSwiper", {
  //   disableOnInteraction: true,
  //   loop: true,
  //   speed: 800,
  //   delay: 3000,
  //   autoplay: true
  // });

  // WOW JS

  wow = new WOW({
    mobile: false
  });
  wow.init();

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function() {
    $(".go-up").on("click", function(e) {
      $("html, body").stop().animate(
        {
          scrollTop: 0
        },
        100
      );
      e.preventDefault();
    });
  });
});
const $c = $("[data-custom-cursor]");
const $h = $("a, button, h1, h2, h3,h4, .nishan-icon");
const $i = $("img");

$(window).on("mousemove", function(e) {
  x = e.clientX;
  y = e.clientY;
  $c.css("transform", "matrix(1, 0, 0, 1, " + x + "," + y + ")");
});

$h.on("mouseenter", function(e) {
  $c.addClass("custom-cursor-active");
});

$h.on("mouseleave", function(e) {
  $c.removeClass("custom-cursor-active");
});

$i.on("mouseenter", function(e) {
  $c.addClass("custom-cursor-active-img");
});
$i.on("mouseleave", function(e) {
  $c.removeClass("custom-cursor-active-img");
});
