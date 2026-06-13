document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dynamic Page Curtain Loader Elimination
    const loaderMask = document.getElementById("gallery-loader");
    if (loaderMask) {
        window.addEventListener("load", () => {
            loaderMask.style.opacity = "0";
            loaderMask.style.visibility = "hidden";
        });
        
        // Safety Fallback (Ensures viewport visibility regardless of asset caching)
        setTimeout(() => {
            loaderMask.style.opacity = "0";
            loaderMask.style.visibility = "hidden";
        }, 1000);
    }

    // 2. High-Performance Intersection Observer for Scroll Revealing Elements
    const initializeScrollReveals = () => {
        const targetElements = document.querySelectorAll(".scroll-reveal");
        
        const observerConfig = {
            root: null, // Default browser viewport
            rootMargin: "0px",
            threshold: 0.1 // Triggers animation safely upon fractional view entrance
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                    observer.unobserve(entry.target); // Release memory footprint once element fires
                }
            });
        }, observerConfig);

        targetElements.forEach(element => {
            revealObserver.observe(element);
        });
    };
    initializeScrollReveals();

    // 3. Immersive Interactive Spotlight Mapping & Pan Zoom Dynamics
    const galleryCard = document.querySelector(".gallery-card");
    const galleryImg = document.getElementById("gallery-img");
    const spotlightBeam = document.getElementById("spotlight");

    if (galleryCard && galleryImg && spotlightBeam) {
        
        galleryCard.addEventListener("mousemove", (e) => {
            const cardRect = galleryCard.getBoundingClientRect();
            
            // Track dynamic coordinate values within element structure bounds
            const cursorX = e.clientX - cardRect.left;
            const cursorY = e.clientY - cardRect.top;

            // Compute relative positioning values normalized across center space
            const relativeX = (cursorX / cardRect.width) - 0.5;
            const relativeY = (cursorY / cardRect.height) - 0.5;

            // 3a. Update Spotlight coordinates inside frame container context
            spotlightBeam.style.opacity = "1";
            spotlightBeam.style.left = `${cursorX + 32}px`; // Accounting for wrapper frame offsets
            spotlightBeam.style.top = `${cursorY + 32}px`;

            // 3b. Coordinate subtle interactive panning transformation
            const translationX = relativeX * -30; // Max lateral movement pixel capacity
            const translationY = relativeY * -30; // Max vertical movement pixel capacity

            galleryImg.style.transform = `scale(1.07) translate(${translationX}px, ${translationY}px)`;
        });

        // Safe restoration matrix on hover end
        galleryCard.addEventListener("mouseleave", () => {
            spotlightBeam.style.opacity = "0";
            galleryImg.style.transform = "scale(1) translate(0px, 0px)";
        });
    }
});