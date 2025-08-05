import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkMidlandsImages() {
    console.log('Checking Midlands Portfolio images...\n');
    
    try {
        // Get Midlands portfolio images
        const images = await sql`
            SELECT 
                pi.id,
                pi.url,
                pi.alt,
                pi.address,
                pi.show_label,
                pi.image_order
            FROM portfolio_images pi
            JOIN portfolios p ON pi.portfolio_id = p.portfolio_id
            WHERE p.title = 'Midlands Portfolio'
            ORDER BY pi.image_order
        `;
        
        console.log(`Found ${images.length} images in Midlands Portfolio:\n`);
        
        images.forEach((img, index) => {
            console.log(`Image ${index + 1} (order: ${img.image_order}):`);
            console.log(`  URL: ${img.url}`);
            console.log(`  Alt: ${img.alt || 'NO ALT TEXT'}`);
            console.log(`  Address: ${img.address || 'NO ADDRESS'}`);
            console.log(`  Show Label: ${img.show_label}`);
            console.log('');
        });
        
        // Check for any issues with URLs
        console.log('\nChecking for potential issues:');
        
        const urlIssues = images.filter(img => !img.url || img.url.trim() === '');
        if (urlIssues.length > 0) {
            console.log(`⚠️  Found ${urlIssues.length} images with empty URLs!`);
        }
        
        // Check if all URLs are valid
        const invalidUrls = images.filter(img => {
            return img.url && !img.url.startsWith('http');
        });
        
        if (invalidUrls.length > 0) {
            console.log(`⚠️  Found ${invalidUrls.length} images with invalid URLs!`);
            invalidUrls.forEach(img => {
                console.log(`  - Image ${img.id}: ${img.url}`);
            });
        }
        
    } catch (error) {
        console.error('Failed to check Midlands images:', error);
        process.exit(1);
    }
}

// Run
checkMidlandsImages();