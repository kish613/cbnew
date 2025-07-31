// Fix portfolio images to match actual HTML content
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function fixPortfolioImages() {
    console.log('Fixing portfolio images...');
    
    try {
        // Fix Newlands Croft - add missing images
        const newlandsCroft = await sql`
            SELECT portfolio_id FROM portfolios WHERE title = 'Newlands Croft'
        `;
        
        if (newlandsCroft.length > 0) {
            const portfolioId = newlandsCroft[0].portfolio_id;
            
            // Add the missing images
            const missingImages = [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg", alt: "Newlands Croft - Bromley London Development" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954162/10_wkcxlm.jpg", alt: "Newlands Croft - Bromley London" }
            ];
            
            // Get current max order
            const maxOrder = await sql`
                SELECT MAX(image_order) as max_order FROM portfolio_images WHERE portfolio_id = ${portfolioId}
            `;
            
            let currentOrder = (maxOrder[0].max_order || -1) + 1;
            
            for (const img of missingImages) {
                // Check if image already exists
                const exists = await sql`
                    SELECT id FROM portfolio_images WHERE portfolio_id = ${portfolioId} AND url = ${img.url}
                `;
                
                if (exists.length === 0) {
                    await sql`
                        INSERT INTO portfolio_images (portfolio_id, url, alt, image_order)
                        VALUES (${portfolioId}, ${img.url}, ${img.alt}, ${currentOrder})
                    `;
                    currentOrder++;
                    console.log(`Added image: ${img.alt}`);
                }
            }
        }
        
        // Remove extra images from Cobbler/Northampton Portfolio
        const cobbler = await sql`
            SELECT portfolio_id FROM portfolios WHERE title = 'Cobbler/Northampton Portfolio'
        `;
        
        if (cobbler.length > 0) {
            const portfolioId = cobbler[0].portfolio_id;
            
            // Keep only the first 3 images
            await sql`
                DELETE FROM portfolio_images 
                WHERE portfolio_id = ${portfolioId} 
                AND image_order > 2
            `;
            console.log('Removed extra images from Cobbler/Northampton Portfolio');
        }
        
        // Remove extra images from Spire Portfolio
        const spire = await sql`
            SELECT portfolio_id FROM portfolios WHERE title = 'Spire Portfolio'
        `;
        
        if (spire.length > 0) {
            const portfolioId = spire[0].portfolio_id;
            
            // Keep only the first 2 images
            await sql`
                DELETE FROM portfolio_images 
                WHERE portfolio_id = ${portfolioId} 
                AND image_order > 1
            `;
            console.log('Removed extra images from Spire Portfolio');
        }
        
        console.log('\nPortfolio images fixed successfully!');
    } catch (error) {
        console.error('Failed to fix images:', error);
        process.exit(1);
    }
}

// Run fix
fixPortfolioImages();