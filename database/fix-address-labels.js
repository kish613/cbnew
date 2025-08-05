import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function fixAddressLabels() {
    console.log('Fixing address labels for all portfolios...');
    
    try {
        // First, let's see what images we have
        const images = await sql`
            SELECT 
                pi.id,
                pi.portfolio_id,
                pi.url,
                pi.alt,
                pi.address,
                pi.show_label,
                p.title,
                p.category
            FROM portfolio_images pi
            JOIN portfolios p ON pi.portfolio_id = p.portfolio_id
            WHERE p.category IN ('residential', 'commercial')
            ORDER BY p.title, pi.image_order
        `;
        
        console.log(`Found ${images.length} images in residential and commercial portfolios`);
        
        // Update all images to ensure they have show_label = true and proper addresses
        for (const image of images) {
            if (!image.address || image.address.trim() === '') {
                console.log(`Image ${image.id} in ${image.title} has no address`);
                continue;
            }
            
            // Enable show_label for all images with addresses
            await sql`
                UPDATE portfolio_images 
                SET show_label = true
                WHERE id = ${image.id} AND address IS NOT NULL AND address != ''
            `;
        }
        
        console.log('✓ Updated all images with addresses to show labels');
        
        // Verify the updates
        const verifyImages = await sql`
            SELECT 
                COUNT(*) as total,
                COUNT(CASE WHEN pi.show_label = true THEN 1 END) as with_labels,
                COUNT(CASE WHEN pi.address IS NOT NULL AND pi.address != '' THEN 1 END) as with_addresses
            FROM portfolio_images pi
            JOIN portfolios p ON pi.portfolio_id = p.portfolio_id
            WHERE p.category IN ('residential', 'commercial')
        `;
        
        console.log('\nVerification:');
        console.log(`Total images: ${verifyImages[0].total}`);
        console.log(`Images with labels enabled: ${verifyImages[0].with_labels}`);
        console.log(`Images with addresses: ${verifyImages[0].with_addresses}`);
        
    } catch (error) {
        console.error('Failed to fix address labels:', error);
        process.exit(1);
    }
}

// Run
fixAddressLabels();