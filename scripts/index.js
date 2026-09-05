document.addEventListener('DOMContentLoaded', () => {
    const firstGlance = document.querySelector('.hero-first-glance');
    const circle = document.querySelector('.circle-cursor');
    const circleText = circle.querySelector('.circle-text');

    firstGlance.addEventListener('mouseleave', () => {
        circleText.classList.remove('visible');
        circleText.textContent = '';
    })

    const hero = document.querySelector('.ui-hero-section');
    if (!hero) return;
    
    const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: "power2.out" }
    });
    
    document.fonts.ready.then(() => {
        const splitHeading = new SplitText(".hero-heading", { type: "chars" });
        const splitSmallHeading = new SplitText(".parallax-heading-small", { type: "chars" });
        const splitSlogan = new SplitText(".hero-content h1.right", { type: "chars" });
        
        tl.from(splitHeading.chars, {
            duration: 0.5,
            x: -40,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
        }).from(splitSmallHeading.chars, {
            duration: 0.5,
            y: 40,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
        }).from(splitSlogan.chars, {
            duration: 0.5,
            x: 40,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
        }).from('.hero-first-glance .hero-footer', {
            y: -20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        })
    });

});