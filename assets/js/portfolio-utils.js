// Portfolio utility functions

// Reorder images array based on featured_image_order
function reorderImagesForDisplay(images, featuredImageOrder = 0) {
    if (!images || images.length === 0 || featuredImageOrder === 0) {
        return images;
    }
    
    // Ensure the featured index is within bounds
    const featuredIndex = Math.min(featuredImageOrder, images.length - 1);
    
    // Create a new array with the featured image first
    const reorderedImages = [];
    
    // Add the featured image first
    reorderedImages.push(images[featuredIndex]);
    
    // Add remaining images in their original order
    for (let i = 0; i < images.length; i++) {
        if (i !== featuredIndex) {
            reorderedImages.push(images[i]);
        }
    }
    
    return reorderedImages;
}

// Export for use in other scripts
window.reorderImagesForDisplay = reorderImagesForDisplay;