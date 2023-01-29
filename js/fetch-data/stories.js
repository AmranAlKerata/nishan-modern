let url = "https://demo2.bynishan.com/api/stories-en";
let loading = true;
const storiesContainer = $(".projects");

storiesContainer.html(
  `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
);

const fetchData = async () => {
  loading = true;

  try {
    const data = await fetch(url);
    const resp = await data.json();

    const stories = resp.data;

    storiesContainer.html(`
        <div class="horizontal projects-section">
        <div class="pin-wrap">
            <div class="animation-wrap to-right">
                <div class="project more">
                    <a href="#" class="">
                        <h2
                            class=" w-100 h-100 mb-0 d-flex align-items-center justify-content-center flex-row gap-3 ">
                            More <span class="nishan-icon">w</span>
                        </h2>
                    </a>
                </div>
            </div>
        </div>
     </div>
    `);

    stories.forEach(story => {
      const { id, title, cover } = story;
      storiesContainer.find(".animation-wrap").prepend(
        `<div class="project">
        <a href="#">
            <div class="project-name">
                <h3>${title}</h3>
                <div class="arrow-icon">
                    <span class="nishan-icon">w</span>
                </div>
            </div>
            <img src="${cover}" alt="" class="project-img">
        </a>
    </div>
      `
      );
    });

    // GSAP Horizontal Scroll

    const projects = gsap.utils.toArray(".projects .horizontal");

    projects.forEach(function(sec, i) {
      var thisPinWrap = sec.querySelector(".pin-wrap");
      var thisAnimWrap = thisPinWrap.querySelector(".animation-wrap");

      var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

      gsap.fromTo(
        thisAnimWrap,
        {
          x: () =>
            thisAnimWrap.classList.contains("to-right") ? 0 : getToValue()
        },
        {
          x: () =>
            thisAnimWrap.classList.contains("to-right") ? getToValue() : 0,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
            pin: thisPinWrap,
            invalidateOnRefresh: true, //anticipatePin: 1,
            scrub: true
          }
        }
      );
      //markers: true,
    });

    // Add Gray filter for stories on touch  [Mobile]
    if (window.innerWidth <= 991) {
      $(".project, .project-img").on("touchmove", function() {
        $(this).addClass("active");
      });
      $(".project, .project-img").on("touchend", function() {
        $(this).removeClass("active");
      });
    }

    loading = false;
  } catch (error) {
    loading = false;
    throw new Error(error);
  }
};

fetchData();
