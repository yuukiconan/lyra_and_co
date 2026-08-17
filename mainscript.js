import LyraUI from "./scripts/framework.js";

const lyra = LyraUI ? new LyraUI("1.1", "Lyra & Co.") : null;
window.lyra = lyra;

const icon = document.createElement('link');
icon.rel = 'website icon';
icon.href = '/assets/images/lyra.png';
document.head.appendChild(icon);

const iconCdn = document.createElement('link');
iconCdn.rel = 'stylesheet';
iconCdn.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.9.0/fonts/remixicon.css';
document.head.appendChild(iconCdn);

history.scrollRestoration = 'manual';

const lenis = new Lenis({
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    duration: 1.2,
    smooth: true,
    autoRaf: false,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

window.lenis = lenis;

gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll", () => {
    ScrollTrigger.update();
});

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (hamburgerMenu) {
        if (!hamburgerMenu.classList.contains('hidden')) {
            lenis.stop();
        } else {
            lenis.start();
        }
        
    }
    
    const peopleCards = document.querySelectorAll('.ui-card-people');
    if (!peopleCards) return;

    const root = document.documentElement;
    
    const circle = document.createElement('div');
    const circleText = document.createElement('span');
    circle.className = 'acrylic';
    circleText.className = 'circle-text';
    peopleCards.forEach(el => {
        el.setAttribute('data-circle-text', 'Enter');
        el.setAttribute('tabIndex', '0');

        function redirectToPerson() {
            if (el.dataset.person) {
                const personId = el.dataset.person;
                const targetLink = `/about/${personId}.html`;

                window.location.href = targetLink;
            }
        }

        el.addEventListener('click', redirectToPerson);
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                redirectToPerson();
            }
        })
    });
    
    const texts = document.querySelectorAll('[data-circle-text]');
    texts.forEach(el => {
        el.addEventListener('pointerenter', () => {
            if (e.pointerType !== 'mouse') {
                circleText.classList.remove('visible');
                circle.classList.remove('visible');
                return;
            }
            circleText.textContent = el.dataset.circleText;
            circle.classList.add('visible');
            circleText.classList.add('visible');
        });
        el.addEventListener('pointerleave', () => {
            circleText.classList.remove('visible');
            circle.classList.remove('visible');
        })
    })

    circle.appendChild(circleText);
    root.appendChild(circle);
    
    let mouseX = 0;
    let mouseY = 0;
    let raf = null;

    function updateCirclePosition() {
        circle.style.setProperty('--cursor-x', `${mouseX}px`);
        circle.style.setProperty('--cursor-y', `${mouseY}px`);

        raf = null;
    }
    
    window.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') {
            circleText.classList.remove('visible');
            circle.classList.remove('visible');
            return;
        }
        
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!raf) {
            raf = requestAnimationFrame(updateCirclePosition);
        }

    })
    

    root.addEventListener('pointerleave', () => {
        circle.classList.remove('visible');
    })

    const hero = document.querySelector('.ui-hero-section');
    if (!hero) return;
    if (!hero.classList.contains('loaded')) lenis.stop();

    let timeout = setTimeout(() => {
        hero.classList.add('loaded')
        lenis.start();

        hero.addEventListener('transitionend', () => {
            ScrollTrigger.refresh();
        })
    }, 2000)
    
    const isEntrance = document.querySelector('.ui-hero-section.isEntrance');
    if (isEntrance) {
        setTimeout(() => {
            isEntrance.style.height = '0svh';
        }, 2600);
    }

    document.addEventListener('hero:loadComplete', () => {
        clearTimeout(timeout);
        timeout = null;
    })
    
    window.addEventListener('scroll', () => {
        if (window.scrollY <= 0) {
            setTimeout(() => {
                hero.classList.remove('loaded');
                hero.classList.add('backToPos');
            }, 200);
        }
        if (hero.classList.contains('backToPos') && window.scrollY > 10) {
            hero.classList.remove('backToPos');
            hero.classList.add('loaded');
        }
    }, {passive: true});

    document.fonts.ready.then(() => {
        const split = new SplitText(".hero-content h1", { type: "words" });
        
        gsap.from(split.words, {
            duration: 0.6,
            y: 35,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-content",
                scrub: false,
                markers: false,
            }
        });
    });

    // Dialog handler
    function openDialog(className) {
        document.querySelector(`.${className}`)?.showModal();
    }

    document.addEventListener('click', (e) => {
        const dialogOpen = e.target.closest('[data-dialog-open]');
        if (dialogOpen) {
            openDialog(dialogOpen.dataset.dialogOpen);
            root.classList.add('noscroll');
            lenis.stop();
        }

        const closeBtn = e.target.closest('[data-dialog-close]');
        const dialog = closeBtn?.closest('dialog');
        if (closeBtn) {
            requestAnimationFrame(() => {
                dialog.style.animation = `fadeOut 350ms cubic-bezier(0.5, 0, 0.75, 0)`;
                dialog.addEventListener('animationend', () => {
                    closeBtn.closest('dialog')?.close();
                    dialog.style.animation = '';
                    root.classList.remove('noscroll');
                    lenis.start();
                }, {once: true});
            })
        }
    });
})