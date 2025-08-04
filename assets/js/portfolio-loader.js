// Portfolio Loader - Loads portfolio data from admin panel
(function() {
    const STORAGE_KEY = 'crestbourne_portfolios';
    
    // Check if admin data exists in localStorage
    function loadPortfolioData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error('Error loading portfolio data:', e);
                return null;
            }
        }
        return null;
    }
    
    // Initialize portfolio loading
    document.addEventListener('DOMContentLoaded', () => {
        const portfolioData = loadPortfolioData();
        
        // If no admin data exists, use the existing HTML structure
        if (!portfolioData) {
            console.log('No admin data found, using default portfolio structure');
            return;
        }
        
        console.log('Loading portfolio data from admin panel');
        
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
        
        // Initialize See More buttons after loading portfolio data
        if (typeof initializeSeeMoreButtons === 'function') {
            setTimeout(initializeSeeMoreButtons, 100);
        }
    });
    
    function updatePortfolioSection(gridElement, portfolios, category) {
        // Clear existing portfolios
        gridElement.innerHTML = '';
        
        // Add portfolios from admin data
        portfolios.forEach(portfolio => {
            const portfolioItem = createPortfolioItem(portfolio, category);
            gridElement.appendChild(portfolioItem);
        });
    }
    
    function createPortfolioItem(portfolio, category) {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.setAttribute('data-category', category);
        
        // Check if this is the "Properties Bought Individually" portfolio
        const isIndividualProperties = portfolio.title === "Properties Bought Individually";
        
        // Create image gallery HTML
        let galleryHTML = '';
        if (portfolio.images && portfolio.images.length > 0) {
            if (portfolio.images.length > 1) {
                // Multi-image gallery
                const galleryClass = isIndividualProperties ? 'portfolio-gallery portfolio-gallery--with-address' : 'portfolio-gallery';
                galleryHTML = `<div class="${galleryClass}">`;
                
                portfolio.images.forEach((img, index) => {
                    galleryHTML += `<img src="${img.url}" alt="${img.alt}" loading="lazy"${index > 0 ? ' style="display: none;"' : ''}>`;
                });
                
                // Add address overlays if needed
                if (isIndividualProperties) {
                    galleryHTML += '<div class="gallery-address-overlays">';
                    portfolio.images.forEach((img, index) => {
                        const address = img.address || '';
                        galleryHTML += `<span class="gallery-address${index === 0 ? ' active' : ''}">${address}</span>`;
                    });
                    galleryHTML += '</div>';
                }
                
                // Add navigation dots
                galleryHTML += '<div class="gallery-nav">';
                portfolio.images.forEach((img, index) => {
                    galleryHTML += `<span class="gallery-dot${index === 0 ? ' active' : ''}" data-slide="${index}"></span>`;
                });
                galleryHTML += '</div></div>';
            } else {
                // Single image
                galleryHTML = `<img src="${portfolio.images[0].url}" alt="${portfolio.images[0].alt}" loading="lazy">`;
            }
        }
        
        item.innerHTML = `
            <div class="portfolio-item__image">
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
                <p class="portfolio-item__description">${portfolio.description}</p>
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
        
        return item;
    }
})();