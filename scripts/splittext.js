document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const percent = document.querySelector('.percentage');
    const uiPeoples = document.querySelectorAll('.stagger-element');
    
    const timer = setInterval(() => {
        let currentPercent = parseInt(percent.textContent);
        
        if (currentPercent < 100) {
            percent.textContent = `${currentPercent + 2}%`;
        } else {
            clearInterval(timer);

            hero.classList.add('willDisappear');
            hero.classList.add('loaded');
            lenis.start();
            document.dispatchEvent(new Event('hero:loadComplete'));
            hero.addEventListener('transitionend', () => {
                ScrollTrigger.refresh();
            });
            uiPeoples.forEach((uiPeople, index) => {
                setTimeout(() => {
                    uiPeople.classList.add('active');
                }, index * 500);
            });
        }
    }, 20);
    
    document.fonts.ready.then(() => {
        const split = new SplitText(".info-box p", { type: "lines" });
        
        gsap.from(split.lines, {
            duration: 0.5,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".info-box",
                start: "top 150%",
                end: "bottom 130%",
                scrub: false,
                markers: false
            }
        });
    });
});

window.addEventListener('load', () => {
    const container = document.querySelector('.horizontal-gallery-wrapper');
    const track = document.querySelector('.horizontal-track')
    if (!container || !track) return;
    const sections = gsap.utils.toArray('.ui-gallery-view');
    const distance = () => track.scrollWidth - window.innerWidth;

    var scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            pin: true,
            start: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            snap: {
                snapTo: 1 / (sections.length - 1),
                duration: 0.6,
                ease: "power1.inOut"
            },
            end: () => `+=${distance()}`
        }
    });

    ScrollTrigger.refresh();
})


