document.addEventListener('DOMContentLoaded', () => {
    fetch('../elements/header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.querySelector('header').innerHTML = data;

        const header = document.querySelector('header');
        const headerContent = header.querySelector('.header-left h1');
        
        let lastScrollY = window.scrollY;
        const threshold = 30;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            
            if (Math.abs(delta) < threshold) return;
            
            headerContent.classList.toggle('hide', delta > 0);
            
            lastScrollY = currentScrollY;
        }); 


        const hamburger = document.querySelector('.hamburger');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const staggerElements = hamburgerMenu.querySelectorAll('.stagger-element');
        const root = document.documentElement;
        const lenis = window.lenis;

        function menuFadeIn() {
            hamburgerMenu.style.animation = `inUpDynamic .7s cubic-bezier(.83,.41,.11,.99)`;
        }
        
        function openMenu() {
            hamburgerMenu.classList.remove('hidden');
            hamburger.disabled = true;
            hamburger.classList.add('active');

            requestAnimationFrame(() => {
                menuFadeIn();

                setTimeout(() => {
                    staggerElements.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.classList.add('visible');
                        }, index * 40)
                        
                        btn.addEventListener('transitionend', () => {
                            hamburger.disabled = false;
                        }, {once: true})
                    })
                }, 500);
            });
        }

        function menuFadeOut() {
            hamburgerMenu.style.animation = 'outUpDynamic .8s cubic-bezier(.83,.41,.11,.99)';

            hamburgerMenu.addEventListener('animationend', () => {
                if (hamburgerMenu.style.animation.includes('outUpDynamic')) {
                    hamburgerMenu.style.animation = '';
                    hamburgerMenu.classList.add('hidden');
                    hamburger.classList.remove('active');
                    hamburger.disabled = false;
                }
            });
        }

        function closeMenu() {
            hamburger.disabled = true;
            requestAnimationFrame(() => {
                const array = Array.from(staggerElements).reverse();

                array.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.classList.remove('visible');
                    }, index * 0)
                });

                setTimeout(() => {
                    menuFadeOut();
                }, 420)
            });
        }

        function toggleMenuVisibility() {
            if (hamburgerMenu.classList.contains('hidden')) {
                root.classList.add('noscroll');
                lenis.stop();
                openMenu();
            } else {
                lenis.start();
                root.classList.remove('noscroll');
                closeMenu();
            }
        }

        hamburger.addEventListener('click', toggleMenuVisibility);

        // Dark & Light mode handler
        const themeToggle = document.querySelector('.theme-toggle');
        const theme = localStorage.getItem('theme') === 'true';

        if (theme) {
            root.classList.toggle('light-mode', theme);
            themeToggle.textContent = theme ? "Theme: Light" : "Theme: Dark";
        }

        themeToggle.addEventListener('click', () => {
            const isClick = root.classList.toggle('light-mode');
            
            localStorage.setItem('theme', isClick);
            themeToggle.textContent = isClick ? "Theme: Light" : "Theme: Dark";
        });
    })
    .catch(err => {
        console.error(err);
    });
})