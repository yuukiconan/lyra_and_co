document.fonts.ready.then(() => {
    setTimeout(() => {
        SplitText.create(".entrance-header h1", {
            type: "lines",
            autoSplit: true,
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    y: -20,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1
                })
            }
        });
        
        SplitText.create(".ui-entrance-index p", {
            type: "lines",
            autoSplit: true,
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    y: -20,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".ui-entrance-index",
                        start: "top 100%",
                        end: "bottom top"
                    }
                })
            }
        })
    }, 1900);
});

const container = document.querySelector('.horizontal-gallery-wrapper');
const track = document.querySelector('.horizontal-track')
const sections = gsap.utils.toArray('.ui-gallery-view');
const distance = () => track.scrollWidth - window.innerWidth + 160;

var scrollTween = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.6,
            ease: "power1.inOut"
        },
        end: () => "+=" + distance()
    }
});

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
})


