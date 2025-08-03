import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateTowerBridgeImages() {
    console.log('Updating Tower Bridge Quarter images...');
    
    try {
        const portfolioId = 'mdrr1ao2wo32jc39wm';
        
        // First, delete existing images
        const deletedImages = await sql`
            DELETE FROM portfolio_images 
            WHERE portfolio_id = ${portfolioId}
            RETURNING *
        `;
        console.log(`✓ Deleted ${deletedImages.length} old images`);
        
        // New images to add
        const newImages = [
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754229584/TBR_003_l9b8s3.jpg',
                alt: 'Tower Bridge Quarter - Main View',
                order: 0
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754229585/TBR_059_rwr275.jpg',
                alt: 'Tower Bridge Quarter - Street View',
                order: 1
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754229584/TBR_002_x2fbmu.jpg',
                alt: 'Tower Bridge Quarter - Retail Spaces',
                order: 2
            }
        ];
        
        // Add new images
        for (const image of newImages) {
            await sql`
                INSERT INTO portfolio_images (
                    portfolio_id,
                    url,
                    alt,
                    image_order
                ) VALUES (
                    ${portfolioId},
                    ${image.url},
                    ${image.alt},
                    ${image.order}
                )
            `;
            console.log(`✓ Added: ${image.alt}`);
        }
        
        console.log('\n✓ Successfully updated Tower Bridge Quarter images!');
        console.log(`Total images: ${newImages.length}`);
        
    } catch (error) {
        console.error('Failed to update images:', error);
        process.exit(1);
    }
}

// Run
updateTowerBridgeImages();