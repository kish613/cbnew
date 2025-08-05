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
        
        // Reinitialize filters and other functionality after loading
        setTimeout(() => {
            if (window.initializePortfolioFilters) {
                window.initializePortfolioFilters();
            }
            if (window.initializeSeeMoreButtons) {
                window.initializeSeeMoreButtons();
            }
            if (window.initializePortfolioImageClicks) {
                window.initializePortfolioImageClicks();
            }
            if (window.initializePortfolioGalleries) {
                window.initializePortfolioGalleries();
            }
        }, 100);
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
        
        // Modify titles and descriptions for regional portfolios
        let displayTitle = portfolio.title;
        let displayDescription = portfolio.description;
        
        // Custom titles for regional portfolios
        if (portfolio.title === "London Portfolio") {
            displayTitle = "London Properties";
            displayDescription = "These properties represent just a small selection from the thousands of individual acquisitions we've made across London's diverse boroughs and neighborhoods. " + portfolio.description;
        } else if (portfolio.title === "Midlands Portfolio") {
            displayTitle = "Midlands Properties";
            displayDescription = "Featured here are a handful of examples from our portfolio of several thousand properties purchased individually throughout the Midlands region. " + portfolio.description;
        } else if (portfolio.title === "North West Portfolio") {
            displayTitle = "Northwest Properties";
            displayDescription = "This collection showcases a few representative properties from the thousands of strategic acquisitions we've completed across the North West. " + portfolio.description;
        }
        
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
                        // Check if this is a commercial portfolio with label enabled
                        const showLabel = category === 'commercial' && img.show_label && img.address;
                        
                        if (showLabel) {
                            galleryHTML += `<div class="portfolio-image-wrapper${index === 0 ? ' active' : ''}" style="${index > 0 ? 'display: none;' : ''}">
                                <img src="${img.url}" alt="${img.alt}" loading="lazy">
                                <div class="portfolio-image-label">${img.address}</div>
                            </div>`;
                        } else {
                            galleryHTML += `<img src="${img.url}" alt="${img.alt}" loading="lazy"${index === 0 ? ' class="active"' : ''}>`; 
                        }
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
                        <h3 class="portfolio-item__title">${displayTitle}</h3>
                        <p class="portfolio-item__location">${portfolio.location}</p>
                        ${portfolio.type ? `<span class="portfolio-item__type">${portfolio.type}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="portfolio-item__content">
                <h3 class="portfolio-item__title">${displayTitle}</h3>
                <p class="portfolio-item__location">${portfolio.address || portfolio.location}</p>
                <p class="portfolio-item__description">${displayDescription || ''}</p>
                <div class="portfolio-item__details">
                    ${portfolio.details.map(detail => 
                        `<span class="portfolio-item__detail">
                            <i class="${detail.icon}"></i>
                            ${detail.text}
                        </span>`
                    ).join('')}
                </div>
                <div class="portfolio-item__see-more">
                    <button class="portfolio-item__see-more-btn">
                        See More
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add see more button handler to expand description
        const seeMoreBtn = item.querySelector('.portfolio-item__see-more-btn');
        if (seeMoreBtn) {
            seeMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const portfolioItem = this.closest('.portfolio-item');
                const description = portfolioItem.querySelector('.portfolio-item__description');
                
                if (description) {
                    // Toggle the expanded class on both elements
                    description.classList.toggle('expanded');
                    portfolioItem.classList.toggle('expanded');
                    
                    // Update button text
                    const buttonText = description.classList.contains('expanded') ? 'See Less' : 'See More';
                    this.innerHTML = `${buttonText} <i class="ri-arrow-${description.classList.contains('expanded') ? 'up' : 'right'}-line"></i>`;
                }
            });
        }
        
        // Add click handler to image to open modal
        const imageContainer = item.querySelector('.portfolio-item__image');
        if (imageContainer) {
            imageContainer.style.cursor = 'pointer';
            imageContainer.addEventListener('click', function(e) {
                // Don't trigger if clicking on a button
                if (e.target.closest('button')) return;
                
                if (window.openPortfolioModal) {
                    window.openPortfolioModal(portfolio);
                }
            });
        }
        
        return item;
    }
})();