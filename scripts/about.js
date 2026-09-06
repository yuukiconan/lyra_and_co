import LyraUI from "./framework.js";

const lyra = new LyraUI("1.1", "Lyra & Co.");
lyra.animateOnScroll('.people-grid', {
    target: '.ui-card-people',
    stagger: 0.2,
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
})

// const container = document.querySelector('.horizontal-gallery-wrapper');
// const track = document.querySelector('.horizontal-track')
// const sections = gsap.utils.toArray('.ui-gallery-view');
// const distance = () => track.scrollWidth - window.innerWidth + 160;

// var scrollTween = gsap.to(track, {
//     x: () => -distance(),
//     ease: "none",
//     scrollTrigger: {
//         trigger: container,
//         pin: true,
//         start: "top top",
//         scrub: 1,
//         invalidateOnRefresh: true,
//         snap: {
//             snapTo: 1 / (sections.length - 1),
//             duration: 0.6,
//             ease: "power1.inOut"
//         },
//         end: () => "+=" + distance()
//     }
// });