// Admin Portal JavaScript - API Version
const ADMIN_PASSWORD = '34Hillcrest!';
const AUTH_KEY = 'crestbourne_admin_auth';
const API_BASE = '/api/portfolios';

// Portfolio data structure
let portfolioData = {
    residential: [],
    commercial: []
};

// Current state
let currentTab = 'residential';
let editingPortfolio = null;
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeEventListeners();
});

// Authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
    if (isAuthenticated) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadPortfolios();
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        showDashboard();
    } else {
        errorMessage.textContent = 'Invalid password';
        document.getElementById('password').value = '';
    }
});

// Logout
function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
}

// Initialize event listeners
function initializeEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPortfolios();
        });
    });

    // Portfolio form submission
    document.getElementById('portfolioForm').addEventListener('submit', (e) => {
        e.preventDefault();
        savePortfolio();
    });
}

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_PASSWORD}`
        }
    };
    
    const response = await fetch(endpoint, { ...defaultOptions, ...options });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
}

// Load portfolios from API
async function loadPortfolios() {
    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading portfolios...</div>';
    
    try {
        const data = await apiRequest(API_BASE);
        portfolioData = data;
        
        const portfolios = portfolioData[currentTab];
        portfolioList.innerHTML = '';
        
        if (portfolios.length === 0) {
            portfolioList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">No portfolios found. Click "Add New Portfolio" to create one.</div>';
            return;
        }
        
        portfolios.forEach((portfolio, index) => {
            const portfolioItem = createPortfolioItem(portfolio, index);
            portfolioList.appendChild(portfolioItem);
        });
    } catch (error) {
        console.error('Error loading portfolios:', error);
        portfolioList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #e74c3c;">Error loading portfolios. Please try again.</div>';
    }
}

// Create portfolio item element
function createPortfolioItem(portfolio, index) {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.draggable = true;
    item.dataset.index = index;
    item.dataset.portfolioId = portfolio.id;
    
    // Get the featured image based on featured_image_order
    const featuredImageIndex = portfolio.featured_image_order || 0;
    const featuredImage = portfolio.images && portfolio.images.length > 0 ? 
        portfolio.images[Math.min(featuredImageIndex, portfolio.images.length - 1)] : 
        null;
    
    item.innerHTML = `
        <div class="portfolio-thumbnail">
            ${featuredImage ? 
                `<img src="${featuredImage.url}" alt="${featuredImage.alt}">
                 <span class="image-count">${portfolio.images.length} images</span>` :
                '<div style="background: #ddd; height: 100%; display: flex; align-items: center; justify-content: center; color: #999;">No Image</div>'
            }
        </div>
        <div class="portfolio-info">
            <h3>${portfolio.title}</h3>
            <div class="portfolio-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${portfolio.location}</span>
                ${portfolio.type ? `<span><i class="fas fa-tag"></i> ${portfolio.type}</span>` : ''}
            </div>
            <p class="portfolio-description">${portfolio.description}</p>
            <div class="portfolio-details">
                ${portfolio.details.map(detail => 
                    `<span><i class="${detail.icon}"></i> ${detail.text}</span>`
                ).join('')}
            </div>
        </div>
        <div class="portfolio-actions">
            <button class="btn-primary" onclick="editPortfolio(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-danger" onclick="deletePortfolio('${portfolio.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
            <button class="btn-move" onclick="movePortfolio(${index}, -1)" ${index === 0 ? 'disabled' : ''}>
                <i class="fas fa-arrow-up"></i>
            </button>
            <button class="btn-move" onclick="movePortfolio(${index}, 1)" ${index === portfolioData[currentTab].length - 1 ? 'disabled' : ''}>
                <i class="fas fa-arrow-down"></i>
            </button>
        </div>
    `;
    
    // Add drag and drop functionality
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
    
    return item;
}

// Modal functions
function openAddPortfolioModal() {
    editingPortfolio = null;
    document.getElementById('modalTitle').textContent = 'Add New Portfolio';
    document.getElementById('portfolioForm').reset();
    document.getElementById('portfolioCategory').value = currentTab;
    document.getElementById('imageList').innerHTML = '';
    document.getElementById('portfolioModal').classList.add('active');
}

function editPortfolio(index) {
    editingPortfolio = index;
    const portfolio = portfolioData[currentTab][index];
    
    document.getElementById('modalTitle').textContent = 'Edit Portfolio';
    document.getElementById('portfolioId').value = portfolio.id;
    document.getElementById('portfolioIndex').value = index;
    document.getElementById('portfolioTitle').value = portfolio.title;
    document.getElementById('portfolioCategory').value = portfolio.category;
    document.getElementById('portfolioLocation').value = portfolio.location;
    document.getElementById('portfolioType').value = portfolio.type || '';
    document.getElementById('portfolioAddress').value = portfolio.address || '';
    document.getElementById('portfolioDescription').value = portfolio.description;
    
    // Load details
    if (portfolio.details && portfolio.details.length > 0) {
        document.getElementById('portfolioDetail1Icon').value = portfolio.details[0]?.icon || '';
        document.getElementById('portfolioDetail1Text').value = portfolio.details[0]?.text || '';
        document.getElementById('portfolioDetail2Icon').value = portfolio.details[1]?.icon || '';
        document.getElementById('portfolioDetail2Text').value = portfolio.details[1]?.text || '';
        document.getElementById('portfolioDetail3Icon').value = portfolio.details[2]?.icon || '';
        document.getElementById('portfolioDetail3Text').value = portfolio.details[2]?.text || '';
    }
    
    // Load images
    loadImages(portfolio.images || []);
    
    document.getElementById('portfolioModal').classList.add('active');
}

function closeModal() {
    document.getElementById('portfolioModal').classList.remove('active');
    editingPortfolio = null;
}

// Image management
function loadImages(images) {
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = '';
    
    images.forEach((image, index) => {
        addImageInput(image.url, image.alt, image.address);
    });
    
    // Update featured image selector
    updateFeaturedImageSelector();
}

function addImageInput(url = '', alt = '', address = '') {
    const imageList = document.getElementById('imageList');
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    
    const showAddressField = document.getElementById('portfolioTitle').value === "Properties Bought Individually";
    
    imageItem.innerHTML = `
        <input type="text" placeholder="Image URL (Cloudinary)" value="${url}" class="image-url" onchange="updateFeaturedImageSelector()">
        <input type="text" placeholder="Alt text" value="${alt}" class="image-alt">
        ${showAddressField ? 
            `<input type="text" placeholder="Address (for overlay)" value="${address || ''}" class="image-address">` : 
            ''
        }
        <button type="button" class="btn-move-image" onclick="moveImage(this, -1)">
            <i class="fas fa-arrow-up"></i>
        </button>
        <button type="button" class="btn-move-image" onclick="moveImage(this, 1)">
            <i class="fas fa-arrow-down"></i>
        </button>
        <button type="button" class="btn-remove-image" onclick="removeImage(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    imageList.appendChild(imageItem);
    updateFeaturedImageSelector();
}

function removeImage(button) {
    button.closest('.image-item').remove();
    updateFeaturedImageSelector();
}

function moveImage(button, direction) {
    const item = button.closest('.image-item');
    const sibling = direction === -1 ? item.previousElementSibling : item.nextElementSibling;
    
    if (sibling) {
        if (direction === -1) {
            item.parentNode.insertBefore(item, sibling);
        } else {
            item.parentNode.insertBefore(sibling, item);
        }
    }
    updateFeaturedImageSelector();
}

// Update featured image selector
function updateFeaturedImageSelector() {
    const selector = document.getElementById('featuredImageSelector');
    const imageItems = document.querySelectorAll('.image-item');
    selector.innerHTML = '';
    
    if (imageItems.length === 0) {
        selector.innerHTML = '<p style="color: #666; font-size: 0.875rem;">Add images to select a featured image</p>';
        return;
    }
    
    const currentFeaturedIndex = editingPortfolio !== null ? 
        (portfolioData[currentTab][editingPortfolio].featured_image_order || 0) : 0;
    
    imageItems.forEach((item, index) => {
        const urlInput = item.querySelector('.image-url');
        const altInput = item.querySelector('.image-alt');
        
        if (urlInput.value) {
            const option = document.createElement('label');
            option.className = 'featured-image-option';
            if (index === currentFeaturedIndex) {
                option.classList.add('selected');
            }
            
            option.innerHTML = `
                <input type="radio" name="featuredImage" value="${index}" 
                    ${index === currentFeaturedIndex ? 'checked' : ''}
                    onchange="selectFeaturedImage(${index})">
                <img src="${urlInput.value}" alt="${altInput.value || 'Portfolio image'}" 
                    onerror="this.src='https://via.placeholder.com/150x120?text=Invalid+Image'">
                <span class="featured-image-label">
                    ${index === 0 ? 'Default' : `Image ${index + 1}`}
                </span>
            `;
            
            selector.appendChild(option);
        }
    });
}

// Select featured image
function selectFeaturedImage(index) {
    document.querySelectorAll('.featured-image-option').forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Save portfolio
async function savePortfolio() {
    const submitBtn = document.querySelector('#portfolioForm button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';
    
    try {
        const formData = {
            id: document.getElementById('portfolioId').value || generateId(),
            title: document.getElementById('portfolioTitle').value,
            category: document.getElementById('portfolioCategory').value,
            location: document.getElementById('portfolioLocation').value,
            type: document.getElementById('portfolioType').value,
            address: document.getElementById('portfolioAddress').value,
            description: document.getElementById('portfolioDescription').value,
            details: [],
            images: [],
            featured_image_order: document.querySelector('input[name="featuredImage"]:checked')?.value || 0
        };
        
        // Collect details
        const detail1Icon = document.getElementById('portfolioDetail1Icon').value;
        const detail1Text = document.getElementById('portfolioDetail1Text').value;
        if (detail1Icon && detail1Text) {
            formData.details.push({ icon: detail1Icon, text: detail1Text });
        }
        
        const detail2Icon = document.getElementById('portfolioDetail2Icon').value;
        const detail2Text = document.getElementById('portfolioDetail2Text').value;
        if (detail2Icon && detail2Text) {
            formData.details.push({ icon: detail2Icon, text: detail2Text });
        }
        
        const detail3Icon = document.getElementById('portfolioDetail3Icon').value;
        const detail3Text = document.getElementById('portfolioDetail3Text').value;
        if (detail3Icon && detail3Text) {
            formData.details.push({ icon: detail3Icon, text: detail3Text });
        }
        
        // Collect images
        const imageItems = document.querySelectorAll('.image-item');
        imageItems.forEach(item => {
            const url = item.querySelector('.image-url').value;
            const alt = item.querySelector('.image-alt').value;
            const addressInput = item.querySelector('.image-address');
            if (url && alt) {
                const imageData = { url, alt };
                if (addressInput) {
                    imageData.address = addressInput.value;
                }
                formData.images.push(imageData);
            }
        });
        
        // Save via API
        if (editingPortfolio !== null) {
            // Update existing
            await apiRequest(API_BASE, {
                method: 'PUT',
                body: JSON.stringify({ portfolio: formData })
            });
        } else {
            // Create new
            await apiRequest(API_BASE, {
                method: 'POST',
                body: JSON.stringify({ portfolio: formData })
            });
        }
        
        // Reload portfolios
        await loadPortfolios();
        closeModal();
    } catch (error) {
        console.error('Error saving portfolio:', error);
        alert('Error saving portfolio. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Portfolio';
    }
}

// Delete portfolio
async function deletePortfolio(portfolioId) {
    if (!confirm('Are you sure you want to delete this portfolio?')) {
        return;
    }
    
    try {
        await apiRequest(`${API_BASE}?id=${portfolioId}`, {
            method: 'DELETE'
        });
        
        // Reload portfolios
        await loadPortfolios();
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        alert('Error deleting portfolio. Please try again.');
    }
}

// Move portfolio up/down
async function movePortfolio(index, direction) {
    const portfolios = portfolioData[currentTab];
    const newIndex = index + direction;
    
    if (newIndex >= 0 && newIndex < portfolios.length) {
        // Swap portfolios
        [portfolios[index], portfolios[newIndex]] = [portfolios[newIndex], portfolios[index]];
        
        // Update order via API
        try {
            const portfolioIds = portfolios.map(p => p.id);
            await apiRequest(`${API_BASE}/reorder`, {
                method: 'POST',
                body: JSON.stringify({ portfolioIds, category: currentTab })
            });
            
            // Reload to show updated order
            await loadPortfolios();
        } catch (error) {
            console.error('Error reordering portfolios:', error);
            alert('Error reordering portfolios. Please try again.');
            // Reload to restore original order
            await loadPortfolios();
        }
    }
}

// Drag and drop handlers
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

async function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const draggedIndex = parseInt(draggedElement.dataset.index);
        const targetIndex = parseInt(this.dataset.index);
        
        const portfolios = portfolioData[currentTab];
        const draggedPortfolio = portfolios[draggedIndex];
        
        // Remove from old position
        portfolios.splice(draggedIndex, 1);
        
        // Insert at new position
        if (draggedIndex < targetIndex) {
            portfolios.splice(targetIndex - 1, 0, draggedPortfolio);
        } else {
            portfolios.splice(targetIndex, 0, draggedPortfolio);
        }
        
        // Update order via API
        try {
            const portfolioIds = portfolios.map(p => p.id);
            await apiRequest(`${API_BASE}/reorder`, {
                method: 'POST',
                body: JSON.stringify({ portfolioIds, category: currentTab })
            });
            
            // Reload to show updated order
            await loadPortfolios();
        } catch (error) {
            console.error('Error reordering portfolios:', error);
            alert('Error reordering portfolios. Please try again.');
            // Reload to restore original order
            await loadPortfolios();
        }
    }
    
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Close modal on outside click
document.getElementById('portfolioModal').addEventListener('click', (e) => {
    if (e.target.id === 'portfolioModal') {
        closeModal();
    }
});