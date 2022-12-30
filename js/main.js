$(function() {
  const navItems = $(".menu-links li");
  const menuIcon = $(".menu .icon");
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $("header").outerHeight();
  const progressLine = $("#progress-line span");
  const header = $("header");
  const footer = $("footer");

  // enable ANM Plugin
  anm.on();
  // WOW JS
  wow = new WOW({
    mobile: false
  }).init();

  // Progress Line
  // $(window).scroll(() => {
  //   let offset = $(window).scrollTop(),
  //     windowHeight = $(window).height(),
  //     height = $(document).height();
  //   let progress = offset / (height - windowHeight) * 100;
  //   progressLine.css("width", `${progress + "%"}`);
  // });

  // Hide Header on scroll down
  $(window).scroll(() => {
    didScroll = true;
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

  // Add Space to hero Section for Fixed Header
  $("#home").css("margin-top", `${header.innerHeight()}px`);
  console.log(footer.innerHeight());

  // Menu Icon Animation
  $(".menu .icon").on("click", () => {
    $(".menu .icon").toggleClass("active");
    $(".menu-links").toggleClass("active");

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

  // Hero Section Circle Animation
  $(".home .col-12.col-lg-10 * ").on("mouseenter", () => {
    $(".home h1, .home p").addClass("text-white");
    $(".home-circle").addClass("active");
  });
  $(".home .col-12.col-lg-10").on("mouseleave", () => {
    $(".home h1, .home p").removeClass("text-white");
    $(".home-circle").removeClass("active");
  });

  // Accordion Animation For Footer
  if (window.innerWidth <= 992) {
    $("footer ul:not(.first-list)").slideUp();
    $("footer .footer-accordion").on("click", function() {
      $(this).parent().find("ul").slideToggle();
    });
  }

  // Prevent Scroll when menu Is active on mobile
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

  // Type Writer Effect
  if ($("#typeWriterEn").length > 0) {
    new TypeIt("#typeWriterEn", {
      strings: [ "Professional", "Great", "Interesting", "Attractive" ],
      cursor: true,
      cursorChar: "|",
      cursorSpeed: 1000,
      deleteSpeed: null,
      breakLines: false,
      breakDelay: 550,
      speed: 200,
      startDelay: 250,
      startDelete: false,
      nextStringDelay: 3000,
      loop: true,
      loopDelay: 500,
      lifeLike: true,
      waitUntilVisible: true
    }).go();
  }

  if ($("#testimonialContent").length > 0) {
    // Testimonial
    new TypeIt("#testimonialContent", {
      strings: [
        "We are happy to work with Nishan ® and greatfull for good result.",
        "it's incredible. I would like to personally thank you for your outstanding product. I will let my mum know about this, she could really make use of Branding!"
      ],
      cursor: true,
      cursorChar: "|",
      // cursorSpeed: 000,
      deleteSpeed: null,
      breakLines: false,
      breakDelay: 550,
      speed: 100,
      startDelay: 250,
      startDelete: false,
      nextStringDelay: 3000,
      loop: true,
      loopDelay: 500,
      lifeLike: true,
      waitUntilVisible: true,
      beforeString: () => {
        console.log("Start A single String");
        $("#testimonialAuthor span").removeClass("hidden");
        $("#testimonialPosition span").removeClass("hidden");
        // Will fire before each string in the queue.
      },
      afterString: () => {
        console.log("Finish A single String");
        $("#testimonialAuthor span").addClass("hidden");
        $("#testimonialPosition span").addClass("hidden");
        // Will fire after each string in the queue,
        // including those added by the `.type()` instance method.
      }
    }).go();
  }

  // Fixed Footer Feature
  $("main.page-content").css("margin-bottom", `${footer.innerHeight()}px`);
});

// Custom Cursor
const $c = $("[data-custom-cursor]");
const $h = $(" .nishan-icon");

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
