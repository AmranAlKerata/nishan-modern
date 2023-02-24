$(function() {
  const lang = $("html").attr("lang");
  const navItems = $(".menu-links li");
  const menuIcon = $(".menu .icon");
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $("header").outerHeight();
  const progressLine = $("#progress-line span");
  const header = $("header");
  const select2Select = $(".select-2-select");
  let url;

  lang === "en"
    ? (url = "https://demo2.bynishan.com/api/testimonialsEn")
    : (url = "https://demo2.bynishan.com/api/testimonialsAr");

  // enable ANM Plugin
  if ($(".anm").length > 0) {
    anm.on();
  }

  if ($(".wow").length > 0) {
    // WOW JS
    wow = new WOW().init();
  }
  // Cookie button
  if ($("#cookie-agree").length > 0) {
    $("#cookie-agree").on("click", () => {
      $(".cookie-wrapper").fadeOut();
      const timeout = setTimeout(() => {
        $(".cookie-wrapper").remove();
        clearTimeout(timeout);
      }, 1000);
    });
  }

  // Progress Line
  $(window).scroll(() => {
    let offset = $(window).scrollTop(),
      windowHeight = $(window).height(),
      height = $(document).height();
    let progress = offset / (height - windowHeight) * 100;
    progressLine.css("width", `${progress + "%"}`);
  });

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
    if (st > lastScrollTop && st > navbarHeight + $("header").outerHeight()) {
      // Scroll Down
      $("header").removeClass("nav-down").addClass("nav-up");
    } else {
      // Scroll Up
      if (
        st + $(window).height() + $("header").outerHeight() <
        $(document).height()
      ) {
        $("header").removeClass("nav-up").addClass("nav-down");
      }
    }

    lastScrollTop = st;
  };

  // Check if we have Client List Notification
  if ($(".client-list").length > 0) {
    $("main").css("margin-top", `${$(".client-list").innerHeight()}px`);
    $("header").css("top", `${$(".client-list").innerHeight()}px`);
  }
  // Remove client list after click on the button
  $("#gotIt").on("click", function() {
    $(".client-list").fadeOut();
    $("main").css("margin-top", 0);
    $("header").css("top", 0);
  });

  // Menu Icon Animation
  $(".menu .icon").on("click", () => {
    $(".menu .icon").toggleClass("active");
    $(".menu-links").toggleClass("active");
    if (window.innerWidth > 991) {
      if ($(".menu .icon").hasClass("active")) {
        $(".lang-btn").fadeIn();
      } else {
        $(".lang-btn").fadeOut();
      }
    }

    navItems.each(function(index) {
      if ($(".menu-links").hasClass("active")) {
        $(this).attr("class", `delay-${index + 1}`);
        $(this).attr("class", `animate animate__fadeInUp delay-${index + 1}`);
        $(this).css("pointer-events", "auto");
      } else {
        $(this).attr("class", `finish`);
        $(this).attr("class", `animate animate__fadeOutUp`);

        $(this).css("pointer-events", "none");

        const timeout = setTimeout(() => {
          $(this).attr("class", "");
          $(this).find(".container").attr("class", "container");
          clearTimeout(timeout);
          return;
        }, 1000);
      }
    });
  });

  const is_touch_enabled = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  // Hero Section Circle Animation
  if (!is_touch_enabled()) {
    $(".first-section .col-12 * ").on("mouseenter", () => {
      $(".has-circle *").addClass("text-white");
      $(".circle").addClass("active");
    });
    $(".first-section .col-12").on("mouseleave", () => {
      $(".has-circle *").removeClass("text-white");
      $(".circle").removeClass("active");
    });
  } else {
    document.addEventListener(
      "touchmove",
      function() {
        $(".has-circle * ").addClass("text-white");
        $(".circle").addClass("active");
      },
      false
    );
    document.addEventListener(
      "touchend",
      function() {
        $(".has-circle *").removeClass("text-white");
        $(".circle").removeClass("active");
      },
      false
    );
  }
  if ($(".first-section").length > 0) {
    $(window).on("scroll", () => {
      $(".first-section");
      if ($(window).scrollTop() >= $(".first-section").offset().top + 500) {
        $("header").addClass("active-bg");
      }
      if ($(window).scrollTop() <= $(".first-section").offset().top) {
        $("header").removeClass("active-bg");
      }
    });
  }

  // Remove Circle Animation From Mobile
  if (window.innerWidth <= 991) {
    $(".first-section .col-12 * ").on("mouseenter mouseleave", () => {
      $(".has-circle *").removeClass("text-white");
      $(".circle").removeClass("active");
    });
    document.addEventListener(
      "touchmove",
      function() {
        $(".has-circle *").removeClass("text-white");
        $(".circle").removeClass("active");
      },
      false
    );
  }

  // Add Gray filter for stories & insight on touch  [Mobile]
  if (window.innerWidth <= 991) {
    $(
      ".project, .project-img, .swiper-wrapper .insight-card .img"
    ).on("touchmove", function() {
      $(this).addClass("active");
    });
    $(
      ".project, .project-img,  .swiper-wrapper .insight-card .img"
    ).on("touchend", function() {
      $(this).removeClass("active");
    });
  }

  // Accordion Animation For Footer
  if (window.innerWidth <= 991) {
    $("footer ul:not(.first-list)").slideUp();
    $("footer .footer-accordion").on("click", function() {
      $(this).parent().find("ul").slideToggle();
    });
  }
  // Fix Header Layout on Mobile

  $(".menu-links .container").css({
    height: `calc(100vh - ${header.innerHeight()}px)`,
    marginTop: `${header.innerHeight()}px`
  });

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
  if ($("#typeWriter").length > 0) {
    new Typed("#typeWriter", {
      strings:
        lang === "en"
          ? [ "Professional", "Great", "Interesting", "Attractive" ]
          : [ "إحترافية", "رائعة", "ممتعة", "جذابة" ],
      typeSpeed: 60,
      backSpeed: 60,
      loop: true
    });
  }

  if ($("#testimonialContent").length > 0) {
    const fetchData = async () => {
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        let strings = [];

        let names = [];
        let companies = [];
        let current = 0;
        const response = data.data;
        response.map((t) => {
          strings.push(t.description);
          names.push(t.name);
          companies.push(t.company);
          return response;
        });
        // Testimonial
        new TypeIt("#testimonialContent", {
          strings: strings,
          cursor: true,
          cursorChar: "|",
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
            $("#testimonialAuthor span").addClass("hidden");
            $("#testimonialPosition span").addClass("hidden");
          },
          afterString: () => {
            $("#testimonialAuthor span")
              .removeClass("hidden")
              .text(names[current]);
            $("#testimonialPosition span")
              .removeClass("hidden")
              .text(companies[current]);

            if (current < strings.length) {
              current = current + 1;
            }
            if (current === strings.length) {
              current = 0;
            }
          }
        }).go();
        return;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  if ($(".play-button").length > 0) {
    // Fancy Box
    $(".play-button").fancybox({
      animationEffect: "zoom-in-out",
      transitionEffect: "circular",
      maxWidth: 1000,
      maxHeight: 800,
      youtube: {
        controls: 1
      }
    });
  }
  if ($(".swiper-slide").length > 0) {
    const projects = new Swiper("#porjectsSlider", {
      slidesPerView: 1,
      slidesPerView: "auto",
      speed: 1000,
      disableOnInteraction: true,

      breakpoints: {
        766: {
          slidesPerView: 1
        },
        767: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 2
        }
      }
    });
    const insight = new Swiper("#insightSwiper", {
      slidesPerView: 1,
      slidesPerView: "auto",
      speed: 1000,
      disableOnInteraction: true,
      spaceBetween: 20,
      breakpoints: {
        766: {
          slidesPerView: 1
        },
        767: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 2
        }
      }
    });
    const productSwiper = new Swiper("#productSwiper", {
      slidesPerView: 1,
      speed: 1000,
      disableOnInteraction: true,
      speed: 1000,
      loop: true,
      clickabel: true,
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }

  // Change Background Color on Scroll
  if ($(".has-changing-color").length > 0) {
    $(window).on("scroll", () => {
      if ($(window).scrollTop() >= $(".trigger-section").offset().top - 500) {
        $(".section-changing-color *").addClass("text-white");
        $(".section-changing-color").css("background-color", "#000");
      }
      if ($(window).scrollTop() <= $(".trigger-section").offset().top - 500) {
        $(".section-changing-color *").removeClass("text-white");
        $(".section-changing-color").css("background-color", "#fff");
      }
      if ($(window).scrollTop() >= $(".end-changing-color").offset().top) {
        $(".section-changing-color *").removeClass("text-white");
        $(".section-changing-color").css("background-color", "#fff");
      }
    });
  }

  // Contact Page Animation Logic
  const choicesForms = $(".choices-forms");
  $(".choices-container .choice").on("click", function() {
    const choiceNum = $(this).attr("data-choice");

    const choiceForm = $(`[data-form="${choiceNum}"]`);

    // Toggle Active Class
    $(this).addClass("active").siblings().removeClass("active");

    // Show & Scroll two the selected from
    choiceForm.siblings().fadeOut();
    choicesForms.css("height", "0");

    choiceForm.fadeIn();
    choicesForms.css("height", `100%`);
    $("html, body").animate(
      { scrollTop: $(".choices-forms").offset().top },
      100
    );
  });

  // Date Picker
  if ($(".custom-date").length > 0) {
    $(".custom-date").each(function(el) {
      new AirDatepicker(`#${$(this)[0].id}`, {
        isMobile: true,
        autoClose: true,
        timepicker: true,
        timeFormat: "hh:mm AA",
        onSelect: ({ date, formattedDate, datepicker }) => {
          $(`#${datepicker.$el.id}`).addClass("active");
        }
      });
    });
  }

  $("form button[type='submit']").on("click", function() {
    const submitedForm = $(this).attr("data-form-submit");

    $(submitedForm).validate({
      errorPlacement: function errorPlacement(error, element) {
        if (element[0].type === "checkbox") {
          element.parent().after(error);
        } else {
          element.after(error);
        }
      },
      ignore: null,
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        },
        userAddress: {
          required: true
        }
      },
      messages: {
        name: {
          required:
            lang === "en" ? "Please enter your name" : "يرجى إدخال إسمك",
          minlength:
            lang === "en"
              ? "Your name must consist of at least 2 characters"
              : "يجب أن يتكون اسمك من حرفين على الأقل"
        },
        phone:
          lang === "en" ? "Please enter you phone" : "الرجاء إدخال رقم هاتفك",
        email: {
          required:
            lang === "en"
              ? "Please enter you email"
              : "يرجى إدخال البريد الإلكتروني الخاص بك",
          email:
            lang === "en"
              ? "Please write a correct email ex: username@provider.com"
              : "يرجى كتابة بريد إلكتروني صحيح على سبيل المثال: username@provider.com"
        },
        userAddress: {
          required:
            lang === "en"
              ? "Please select your address."
              : "الرجاء تحديد عنوانك."
        }
      }
    });
  });

  $("#client-form").validate({
    errorPlacement: function errorPlacement(error, element) {
      if (element[0].type === "checkbox") {
        element.parent().after(error);
      } else {
        element.after(error);
      }
    }
  });

  // Textarea animated border & Shuffle filter input
  $("textarea, .js-shuffle-search").on("change", function() {
    if ($(this).val().length > 0) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });

  // Select 2
  if (select2Select.length > 0) {
    // Make sure to add "select-2-select" class to any select box
    select2Select.select2();

    select2Select.on("select2:select", function(e) {
      $(this).parent().find(".select2-selection__rendered").addClass("active");
      $(this).parent().find('div[id*="-error"]').remove();
    });

    // Add Placeholder  to search field
    $(".select2-container").on("click", () =>
      $(".select2-search__field").attr("placeholder", "Search")
    );
    // Change search filter color after select
    select2Select.on("change", function() {
      $(this).parent().find(".select2-container").addClass("active");
    });
  }
  // Show uploaded file name
  const customUpload = $(".custom-upload");
  if (customUpload.length > 0) {
    customUpload.on("change", function() {
      const fileName = $(this).find(".custom-upload__input").val();
      const customUploadButton = $(this).find(".custom-upload__button");
      fileName === ""
        ? "Upload attachment"
        : customUploadButton.text(fileName.replace("C:\\fakepath\\", ""));
    });
  }

  // Copy Note link
  let clickabel = true;
  $(document).on("click", function(e) {
    if (clickabel) {
      if (e.target.classList.contains("copy-icon")) {
        /* Get the text field */
        let noteLink = e.target.parentElement.parentElement.href;
        if (e.target.parentElement.classList.contains("page")) {
          noteLink = window.location.href;
        }
        const currentLink = noteLink;

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(currentLink);

        // Create Link Copied Text
        const span = document.createElement("span");
        span.textContent = lang === "en" ? "Link copied" : "تم نسخ الرابط";

        // Show Link Copied Alert
        if (e.target.parentElement.classList.contains("page")) {
          e.target.parentElement.append(span);
        } else {
          e.target.parentElement.prepend(span);
        }

        clickabel = false;

        const timeout = setTimeout(() => {
          e.target.parentElement.querySelector("span").remove();
          clickabel = true;
          clearTimeout(timeout);
        }, 5000);
      }
    }
  });

  // Text Counter
  if ($(".max-length").length > 0) {
    $(function() {
      $(".max-length").simpleTxtCounter({
        maxLength: 6500
      });
    });
  }

  // Scroll to the top of position form
  $(".positions-item").on("shown.bs.collapse", function(e) {
    const offset = $(this).find(".collapse.show");
    console.log(offset);
    $("html,body").animate(
      {
        scrollTop: offset.offset().top - 400
      },
      10
    );
  });

  // validate positions form
  if ($(".submit-position").length > 0) {
    $(".submit-position").on("click", function() {
      const dataForm = $(this).parent().parent().attr("data-form");
      console.log($(`.position-form form[data-form="${dataForm}"]`));
      $(`.position-form form[data-form="${dataForm}"]`).validate();
    });
  }

  // Store Details Box [Change Content]
  $(".agreement-details .tab").on("click", function() {
    const dataTab = $(this).attr("data-tab");
    // Change active class
    $(this).addClass("active").siblings().removeClass("active");
    $(".client-box")
      .find(`#${dataTab}`)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});

// Custom Cursor
const $c = $("[data-custom-cursor]");
const $h = $(" .nishan-icon, header .menu .icon, .copy-icon");

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
