document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.video');
    const firstGlance = document.querySelector('.hero-first-glance');
    const isVideoPlayed = document.getElementById('isVideoPlayed');
    const circle = document.querySelector('.acrylic');
    const circleText = circle.querySelector('.circle-text');

    video.currentTime = 7.9;

    firstGlance.addEventListener('mouseenter', () => {
        if (isVideoPlayed.checked) {
            circleText.textContent = firstGlance.dataset.circleTextAfter;
        } else {
            circleText.textContent = firstGlance.dataset.circleText;
        }
    });

    firstGlance.addEventListener('click', () => {
        isVideoPlayed.click();

        isVideoPlayed.addEventListener('change', (e) => {
            if (e.target.checked) {
                video.pause();
                circleText.textContent = firstGlance.dataset.circleTextAfter;
            } else {
                video.play();
                circleText.textContent = firstGlance.dataset.circleText;
            }
        });
    })

    firstGlance.addEventListener('mouseleave', () => {
        circleText.classList.remove('visible');
        circleText.textContent = '';
    })

    const hero = document.querySelector('.ui-hero-section');
    if (!hero) return;
    
    const tl = gsap.timeline({
        defaults: { duration: 0.7, ease: "power2.out" }
    });
    
    gsap.from('.hero-content img', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    });

    setTimeout(() => {
        gsap.to('.hero-content img', {
            scale: 0,
            opacity: 0,
            duration: 1.1,
            ease: "power1.inOut"
        })
        
        document.fonts.ready.then(() => {
        const splitHeading = new SplitText(".hero-heading", { type: "chars" });
        const splitSmallHeading = new SplitText(".parallax-heading-small", { type: "chars" });
        const splitSlogan = new SplitText(".hero-content h1.right", { type: "chars" });
        
        tl.from('.hero-first-glance .video', {
            scale: 0.7,
            opacity: 0,
            duration: 0.8,
            ease: "power3"
        }).from('.hero-first-glance .video-frame-subtext', {
            scale: 0.7,
            opacity: 0,
            duration: 0.8,
            ease: "power3"
        }).from(splitHeading.chars, {
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
    }, 2000)

    gsap.fromTo('.light-section', {
        opacity: 0,
    }, {
        backgroundColor: '#f1f1f1',
        opacity: 1,
        duration: 0.3,
        ease: "none",
        scrollTrigger: {
            pin: true,
            trigger: '.light-section',
            start: 'top 0%',
            end: '+=400',
            scrub: true,
        }
    })

    gsap.to('.light-section *', {
        color: '#000',
        scrollTrigger: {
            trigger: '.light-section',
            start: 'top bottom',
            end: '+=200',
            scrub: true
        }
    })
});