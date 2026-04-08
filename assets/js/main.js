/**
 * Main JavaScript File
 * Handles UI interactions and scroll animations (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {

    // Set Current Year in Footer
    const yearEls = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    yearEls.forEach(el => el.textContent = currentYear);

    // Navbar Scrolled State
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        const checkScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
                navbar.style.paddingTop = "0.5rem";
                navbar.style.paddingBottom = "0.5rem";
            } else {
                if(document.body.classList.contains('pt-custom')) {
                     navbar.classList.add('shadow-sm'); // keep shadow on subpages
                } else {
                     navbar.classList.remove('shadow-sm');
                }
                navbar.style.paddingTop = "1rem";
                navbar.style.paddingBottom = "1rem";
            }
        };

        // Initial check
        checkScroll();
        // Add scroll event listener
        window.addEventListener('scroll', checkScroll);
    }

    // Scroll Animation Observer (Replaces Framer Motion logic)
    const initScrollAnimations = () => {
        // Find all elements that should animate on scroll
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up'
        );

        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add class to trigger CSS transition
                        entry.target.classList.add('is-visible');
                        // Stop observing once animated
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            animatedElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            animatedElements.forEach(el => el.classList.add('is-visible'));
        }
    };

    // Initialize animations immediately for elements currently in DOM
    initScrollAnimations();

    // Trigger animations for elements that are already in viewport on load
    setTimeout(() => {
        const evt = new Event('scroll');
        window.dispatchEvent(evt);

        // Ensure hero elements fade in immediately on load
        document.querySelectorAll('.hero .fade-in-up').forEach(el => {
            el.classList.add('is-visible');
        });
    }, 100);
});