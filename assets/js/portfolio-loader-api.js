// Portfolio Loader - API Version
(function() {
    const API_BASE = '/api/portfolios';
    
    // Load portfolio data from API
    async function loadPortfolioData() {
        try {
            const response = await fetch(API_BASE);
            if (!response.ok) {
                throw new Error('Failed to fetch portfolio data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            return null;
        }
    }
    
    // Initialize portfolio loading
    document.addEventListener('DOMContentLoaded', async () => {
        const portfolioData = await loadPortfolioData();
        
        // If no API data exists or error occurred, use the existing HTML structure
        if (!portfolioData) {
            console.log('No API data found, using default portfolio structure');
            return;
        }
        
        console.log('Loading portfolio data from API');
        
        // Update residential portfolios
        const residentialGrid = document.querySelector('#residential .portfolio-grid');
        if (residentialGrid && portfolioData.residential) {
            updatePortfolioSection(residentialGrid, portfolioData.residential, 'residential');
        }
        
        // Update commercial portfolios
        const commercialGrid = document.querySelector('#commercial .portfolio-grid');
        if (commercialGrid && portfolioData.commercial) {
            updatePortfolioSection(commercialGrid, portfolioData.commercial, 'commercial');
        }
    });
    
    function updatePortfolioSection(gridElement, portfolios, category) {
        // Clear existing portfolios
        gridElement.innerHTML = '';
        
        // Add portfolios from API data
        portfolios.forEach(portfolio => {
            const portfolioItem = createPortfolioItem(portfolio, category);
            gridElement.appendChild(portfolioItem);
        });
    }
    
    function createPortfolioItem(portfolio, category) {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.setAttribute('data-category', category);
        
        // Add click handler to open modal
        item.addEventListener('click', function(e) {
            // Don't open modal if clicking on read more button
            if (!e.target.classList.contains('portfolio-item__read-more')) {
                if (window.openPortfolioModal) {
                    window.openPortfolioModal(portfolio);
                }
            }
        });
        
        // Check if this is the "Properties Bought Individually" portfolio
        const isIndividualProperties = portfolio.title === "Properties Bought Individually";
        
        // Reorder images based on featured_image_order
        const displayImages = window.reorderImagesForDisplay ? 
            window.reorderImagesForDisplay(portfolio.images, portfolio.featured_image_order) : 
            portfolio.images;
        
        // Create image gallery HTML
        let galleryHTML = '';
        if (displayImages && displayImages.length > 0) {
            if (displayImages.length > 1) {
                // Multi-image gallery - matching the original HTML structure
                if (isIndividualProperties || portfolio.title === "Newlands Croft") {
                    // Special galleries with portfolio-gallery class
                    const galleryClass = isIndividualProperties ? 'portfolio-gallery portfolio-gallery--with-address' : 'portfolio-gallery';
                    galleryHTML = `<div class="${galleryClass}">`;
                    
                    displayImages.forEach((img, index) => {
                        galleryHTML += `<img src="${img.url}" alt="${img.alt}" loading="lazy"${index > 0 ? ' style="display: none;"' : ''}>`;
                    });
                    
                    // Add address overlays if needed
                    if (isIndividualProperties) {
                        galleryHTML += '<div class="gallery-address-overlays">';
                        displayImages.forEach((img, index) => {
                            const address = img.address || '';
                            galleryHTML += `<span class="gallery-address${index === 0 ? ' active' : ''}">${address}</span>`;
                        });
                        galleryHTML += '</div>';
                    }
                    
                    // Add navigation dots
                    galleryHTML += '<div class="gallery-nav">';
                    displayImages.forEach((img, index) => {
                        galleryHTML += `<span class="gallery-dot${index === 0 ? ' active' : ''}" data-slide="${index}"></span>`;
                    });
                    galleryHTML += '</div></div>';
                } else {
                    // Standard gallery with images directly in portfolio-item__image
                    displayImages.forEach((img, index) => {
                        galleryHTML += `<img src="${img.url}" alt="${img.alt}" loading="lazy"${index === 0 ? ' class="active"' : ''}>`;
                    });
                    
                    // Add portfolio-gallery-indicators
                    galleryHTML += '<div class="portfolio-gallery-indicators">';
                    displayImages.forEach((img, index) => {
                        galleryHTML += `<span class="portfolio-gallery-indicator${index === 0 ? ' active' : ''}" data-slide="${index}"></span>`;
                    });
                    galleryHTML += '</div>';
                }
            } else {
                // Single image
                galleryHTML = `<img src="${displayImages[0].url}" alt="${displayImages[0].alt}" loading="lazy">`;
            }
        }
        
        // Determine if this should have gallery class
        const hasGallery = displayImages && displayImages.length > 1;
        const imageClass = hasGallery ? 'portfolio-item__image portfolio-item__image--gallery' : 'portfolio-item__image';
        
        item.innerHTML = `
            <div class="${imageClass}">
                ${galleryHTML}
                <div class="portfolio-item__overlay">
                    <div class="portfolio-item__info">
                        <h3 class="portfolio-item__title">${portfolio.title}</h3>
                        <p class="portfolio-item__location">${portfolio.location}</p>
                        ${portfolio.type ? `<span class="portfolio-item__type">${portfolio.type}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="portfolio-item__content">
                <h3 class="portfolio-item__title">${portfolio.title}</h3>
                <p class="portfolio-item__location">${portfolio.address || portfolio.location}</p>
                <p class="portfolio-item__description">${portfolio.description || ''}</p>
                <a href="#" class="portfolio-item__read-more">Read more</a>
                <div class="portfolio-item__details">
                    ${portfolio.details.map(detail => 
                        `<span class="portfolio-item__detail">
                            <i class="${detail.icon}"></i>
                            ${detail.text}
                        </span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        return item;
    }
})();