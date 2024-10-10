document.addEventListener('DOMContentLoaded', () => {
    // Global variables
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar__list');

    // Build the nav
    function buildNav() {
        sections.forEach(section => {
            const navItem = document.createElement('li');
            const sectionID = section.getAttribute('id');
            const sectionName = section.getAttribute('data-nav');
            
            navItem.innerHTML = `<a class="menu__link" href="#${sectionID}">${sectionName}</a>`;
            navbar.appendChild(navItem);
        });
    }

    // Add class 'active' to section when near top of viewport
    function setActiveSection() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= 300) {
                section.classList.add('your-active-class');
            } else {
                section.classList.remove('your-active-class');
            }
        });
    }

    // Scroll to section on link click
    function smoothScroll() {
        navbar.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    }

    // Initialize
    buildNav();
    smoothScroll();
    
    // Set sections as active while scrolling
    document.addEventListener('scroll', setActiveSection);
});
