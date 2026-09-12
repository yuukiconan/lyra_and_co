import LyraUI from "./framework.js";

const lyra = new LyraUI("1.1", "Lyra & Co.");
lyra.animateOnScroll('.people-grid', {
    target: '.ui-card-people',
    stagger: 0.2,
    threshold: 0.5,
    rootMargin: '0px 0px -200px 0px'
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

/* Fetch members JSON to HTML */
async function fetchMembers(targetId) {
    try {
        const response = await fetch('/scripts/json/members_lyraco.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const memberName = document.querySelector('.ui-person-panel h1');
        const memberRole = document.querySelector('.ui-person-panel span');
        const memberAvatar = document.querySelector('.ui-person-panel img');
        // Process the fetched data and update the HTML

        const matchUser = data.find(user => user.id === targetId);

        memberName.textContent = matchUser.name;
        memberRole.textContent = matchUser.role;
        memberAvatar.src = matchUser.avatar_url;

    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

const peopleCards = document.querySelectorAll('.ui-card-people');
const personPanel =  document.querySelector('.ui-person-panel');
const closePanelBtn =  document.querySelector('.ui-person-panel .close-btn');
peopleCards.forEach(people => {
    people.addEventListener('click', (e) => {
        personPanel.classList.remove('hidden');
        fetchMembers(e.currentTarget.dataset.person);
    })
})

closePanelBtn.addEventListener('click', () => {
    personPanel.classList.add('hidden');
})