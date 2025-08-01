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
            
            // Add all images
            if (portfolioData.images && portfolioData.images.length > 0) {
                portfolioData.images.forEach((image, index) => {
                    const imageItem = document.createElement('div');
                    imageItem.className = 'portfolio-modal__item';
                    
                    const img = document.createElement('img');
                    img.src = image.url;
                    img.alt = image.alt || `${portfolioData.title} - Image ${index + 1}`;
                    img.loading = 'lazy';
                    
                    const info = document.createElement('div');
                    info.className = 'portfolio-modal__item-info';
                    info.innerHTML = `<p class="portfolio-modal__item-alt">${image.alt || image.address || ''}</p>`;
                    
                    imageItem.appendChild(img);
                    imageItem.appendChild(info);
                    
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