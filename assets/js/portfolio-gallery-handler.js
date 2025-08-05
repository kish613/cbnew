// Portfolio Gallery Handler for labeled images
(function() {
    function initializePortfolioGalleries() {
        const galleries = document.querySelectorAll('.portfolio-item__image--gallery');
        
        galleries.forEach(gallery => {
            const images = gallery.querySelectorAll('img, .portfolio-image-wrapper');
            const indicators = gallery.querySelectorAll('.portfolio-gallery-indicator');
            
            if (images.length <= 1) return;
            
            let currentIndex = 0;
            
            // Function to show specific image
            function showImage(index) {
                images.forEach((img, i) => {
                    if (img.classList.contains('portfolio-image-wrapper')) {
                        img.style.display = i === index ? 'block' : 'none';
                        if (i === index) {
                            img.classList.add('active');
                        } else {
                            img.classList.remove('active');
                        }
                    } else {
                        if (i === index) {
                            img.classList.add('active');
                            img.style.display = 'block';
                        } else {
                            img.classList.remove('active');
                            img.style.display = 'none';
                        }
                    }
                });
                
                indicators.forEach((indicator, i) => {
                    if (i === index) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
                
                currentIndex = index;
            }
            
            // Add click event to indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showImage(index);
                });
            });
            
            // Auto-rotate images every 5 seconds
            let autoRotateInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                showImage(nextIndex);
            }, 5000);
            
            // Pause auto-rotate on hover
            gallery.addEventListener('mouseenter', () => {
                clearInterval(autoRotateInterval);
            });
            
            gallery.addEventListener('mouseleave', () => {
                autoRotateInterval = setInterval(() => {
                    const nextIndex = (currentIndex + 1) % images.length;
                    showImage(nextIndex);
                }, 5000);
            });
        });
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePortfolioGalleries);
    } else {
        initializePortfolioGalleries();
    }
    
    // Re-initialize when portfolios are loaded dynamically
    window.initializePortfolioGalleries = initializePortfolioGalleries;
})();