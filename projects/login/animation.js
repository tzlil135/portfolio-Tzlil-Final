export const ImagesAnimation = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    if (mediaQuery.matches) {
        // Reduced movement for mobile
        gsap.to("#cheese", {
            x: 20,
            y: -10,
            duration: 1
        });

        gsap.to("#burger", {
            x: -50,
            y: 25,
            duration: 1
        });

        gsap.to("#noodles", {
            x: 20,
            y: -55,
            duration: 1
        });
    } else {
        // Original desktop animation
        gsap.to("#cheese", {
            x: 50,
            y: -20,
            duration: 1
        });

        gsap.to("#burger", {
            x: -100,
            y: 50,
            duration: 1
        });

        gsap.to("#noodles", {
            x: 40,
            y: -110,
            duration: 1
        });
    }

    // Quotes animation remains the same
    gsap.to("#quote1", {
        opacity: 1,
        duration: 1,
        delay: 1
    });

    gsap.to("#quote2", {
        opacity: 1,
        duration: 1,
        delay: 2
    });
};
