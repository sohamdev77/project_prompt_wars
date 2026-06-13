/**
 * Security Profile:
 * - Strict mode enabled to prevent implicit globals and silent errors.
 * - DOM manipulation limited to layout geometry and class toggling.
 * - Zero usage of eval(), Function(), or innerHTML to prevent DOM-based XSS.
 * - Secure event listener attachments.
 */
"use strict";

const AppController = (function() {
    
    /**
     * Initializes the scroll reveal animation utilizing the IntersectionObserver API.
     * This provides high-performance tracking without blocking the main thread.
     */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        if (!revealElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.12 // Trigger when 12% of the element is visible
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve element after it's revealed to free memory
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    };

    /**
     * Initializes the dynamic spotlight effect on the main artwork.
     * Uses CSS variables to update the gradient position securely.
     */
    const initSpotlightEffect = () => {
        const container = document.getElementById('artwork-container');
        
        if (!container) return;

        // Uses pointer events to gracefully handle both mouse and touch input
        container.addEventListener('pointermove', (event) => {
            // Use requestAnimationFrame to debounce layout thrashing
            window.requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                // Set CSS variables for the overlay mask
                container.style.setProperty('--x', `${x}px`);
                container.style.setProperty('--y', `${y}px`);
            });
        }, { passive: true });
    };

    // Public API
    return {
        init: () => {
            initScrollReveal();
            initSpotlightEffect();
        }
    };
})();

// Initialize application when the DOM is fully constructed
document.addEventListener('DOMContentLoaded', () => {
    AppController.init();
});