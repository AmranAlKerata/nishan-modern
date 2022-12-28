$(function() {
  const navItems = $(".menu-links li");
  const menuIcon = $(".menu .icon");
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $("header").outerHeight();

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
        $(this).css("pointer-events", "auto");
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
  //   anm.on();

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

  // WOW JS

  //   wow = new WOW({
  //     mobile: false
  //   });
  //   wow.init();
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
