/// <reference lib="dom" />

export default class LyraUI {
    constructor(version, author) {
        this.version = version;
        this.author = author;
    }
    
    animateOnScroll(selector, options = {}) {
        const {
            target = null,
            animationClass = 'visible',
            stagger = 0,
            threshold = 0.4,
            once = true
            
        } = options;
        
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entries, obs) => { 
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const el = entry.target;
                
                if (target) {
                    const items = el.querySelectorAll(target);
                    
                    items.forEach((item, i) => {
                        if (stagger) {
                            item.style.transitionDelay = `${i * stagger}s`;
                        }
                        item.classList.add(animationClass);
                        
                    });
                } else {
                    el.classList.add(animationClass);
                }
                
                if (once) {
                    obs.unobserve(el);
                }
            });
        }, {threshold, rootMargin: '0px 0px -25% 0px'});
        
        elements.forEach(el => observer.observe(el));
    }
}