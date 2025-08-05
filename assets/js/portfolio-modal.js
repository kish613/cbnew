// Portfolio Modal Gallery
(function() {
    let currentPortfolioData = null;
    
    // Initialize modal functionality
    function initPortfolioModal() {
        const modal = document.getElementById('portfolioModal');
        const modalTitle = modal.querySelector('.portfolio-modal__title');
        const modalLocation = modal.querySelector('.portfolio-modal__location');
        const modalGrid = modal.querySelector('.portfolio-modal__grid');
        const closeBtn = modal.querySelector('.portfolio-modal__close');
        
        // Close modal functionality
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalGrid.innerHTML = '';
        }
        
        // Close on button click
        closeBtn.addEventListener('click', closeModal);
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Open modal with portfolio data
        window.openPortfolioModal = function(portfolioData) {
            currentPortfolioData = portfolioData;
            
            // Set header info
            modalTitle.textContent = portfolioData.title;
            modalLocation.textContent = portfolioData.location || portfolioData.address;
            
            // Clear existing images
            modalGrid.innerHTML = '';
            
            // Reorder images based on featured_image_order
            const displayImages = window.reorderImagesForDisplay ? 
                window.reorderImagesForDisplay(portfolioData.images, portfolioData.featured_image_order) : 
                portfolioData.images;
            
            // Add all images
            if (displayImages && displayImages.length > 0) {
                console.log('Portfolio:', portfolioData.title);
                console.log('Images data:', displayImages);
                
                displayImages.forEach((image, index) => {
                    console.log(`Image ${index}:`, image);
                    const imageItem = document.createElement('div');
                    imageItem.className = 'portfolio-modal__item';
                    
                    // Create wrapper for image and label if needed
                    if (image.show_label && image.address) {
                        console.log(`Adding label for image ${index}: ${image.address}`);
                        const wrapper = document.createElement('div');
                        wrapper.className = 'portfolio-modal__image-wrapper';
                        
                        const img = document.createElement('img');
                        img.src = image.url;
                        img.alt = image.alt || `${portfolioData.title} - Image ${index + 1}`;
                        img.loading = 'lazy';
                        
                        const label = document.createElement('div');
                        label.className = 'portfolio-modal__address-label';
                        label.textContent = image.address;
                        
                        wrapper.appendChild(img);
                        wrapper.appendChild(label);
                        imageItem.appendChild(wrapper);
                    } else {
                        const img = document.createElement('img');
                        img.src = image.url;
                        img.alt = image.alt || `${portfolioData.title} - Image ${index + 1}`;
                        img.loading = 'lazy';
                        imageItem.appendChild(img);
                    }
                    
                    // Click to view full size
                    imageItem.addEventListener('click', function() {
                        window.open(image.url, '_blank');
                    });
                    
                    modalGrid.appendChild(imageItem);
                });
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    }
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', initPortfolioModal);
})();