import LyraUI from "./framework.js";

const lyra = new LyraUI("1.1", "Lyra & Co.");
lyra.animateOnScroll('.ui-card-people', {
    threshold: 0.2,
    stagger: 0.5
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

const tl = gsap.timeline({
    defaults: { duration: 0.7, ease: "power2.out" }
});
const headlines = gsap.utils.toArray('.ui-hero__line');
const galleries = gsap.utils.toArray('.ui-gallery__panel');

document.fonts.ready.then(() => {
    setTimeout(() => {
        headlines.forEach(hl => {
            const splitHeroHeading = new SplitText(hl, {type: "words"});
            tl.from(splitHeroHeading.words, {
                duration: 0.3,
                x: -40,
                opacity: 0,
                stagger: 0.1,
                ease: "power1.inOut"
            });
        })
        galleries.forEach((gl) => {
            tl.from(gl, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.5
            });
        })
        const fSplit = new SplitText(".ui-hero__sub", {type: "lines"});
        gsap.from(fSplit.lines, {
            duration: 0.8,
            opacity: 0,
            y: 40,
            stagger: 0.05,
            scrollTrigger: {
                trigger: '.ui-hero__grid',
                start: 'top 80%',
                end: 'top 34%',
            }
        });
    }, 2000)
});
