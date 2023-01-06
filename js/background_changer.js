// gsap.registerPlugin(ScrollTrigger);

// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector(".amk"),
//     smooth: true
// });

// ScrollTrigger.scrollerProxy(".amk", {
//     scrollTop(value) {
//         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//     },
//     getBoundingClientRect() {
//         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//     },
//     pinType: document.querySelector(".amk").style.transform ? "transform" : "fixed"
// });


// gsap.to("body", {
//     backgroundColor: "red",
//     scrollTrigger: {
//         trigger: ".amk-section",
//         scroller: ".amk",
//         scrub: true
//     }
// });


// locoScroll.on("scroll", ScrollTrigger.update);
// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// ScrollTrigger.refresh();

// // gsap.to(".amk", {
// //     scrollTrigger: ".amk-section", // start the animation when ".section" enters the viewport (once)
// //     backgroundColor: 'red'
// // });

gsap.registerPlugin(ScrollTrigger);



/* COLOR CHANGER */
window.addEventListener("load", function () {
    const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
    scrollColorElems.forEach((colorSection, i) => {
        const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
        const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

        ScrollTrigger.create({
            trigger: colorSection,
            scroller: ".amk",
            start: "top 50%",
            onEnter: () =>
                gsap.to(".amk section", {
                    backgroundColor: colorSection.dataset.bgcolor,
                    color: colorSection.dataset.textcolor,
                    overwrite: "auto"
                }),
            onLeaveBack: () =>
                gsap.to(".amk secton", {
                    backgroundColor: prevBg,
                    color: prevText,
                    overwrite: "auto"
                })
        });
    });
});
