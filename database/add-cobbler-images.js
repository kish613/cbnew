import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function addCobblerImages() {
    console.log('Adding new images to Cobbler/Northampton Portfolio...');
    
    const newImages = [
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754403704/20221026_162504_n3vwqz.jpg',
            alt: 'Cobbler Northampton Portfolio - Property Interior 1',
            address: null
        },
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754403464/20221026_135349_esy37e.jpg',
            alt: 'Cobbler Northampton Portfolio - Property Interior 2',
            address: null
        },
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754403458/20221026_132536_ssf1hi.jpg',
            alt: 'Cobbler Northampton Portfolio - Property Interior 3',
            address: null
        }
    ];
    
    try {
        // First find the Cobbler portfolio
        const portfolio = await sql`
            SELECT portfolio_id 
            FROM portfolios 
            WHERE title = 'Cobbler/Northampton Portfolio'
        `;
        
        if (portfolio.length === 0) {
            console.error('Cobbler/Northampton Portfolio not found!');
            process.exit(1);
        }
        
        const portfolioId = portfolio[0].portfolio_id;
        console.log(`Found portfolio with ID: ${portfolioId}`);
        
        // Get the current highest image_order
        const currentImages = await sql`
            SELECT MAX(image_order) as max_order 
            FROM portfolio_images 
            WHERE portfolio_id = ${portfolioId}
        `;
        
        const startOrder = (currentImages[0].max_order || -1) + 1;
        console.log(`Starting from image order: ${startOrder}`);
        
        // Insert new images
        for (let i = 0; i < newImages.length; i++) {
            const image = newImages[i];
            const result = await sql`
                INSERT INTO portfolio_images (
                    portfolio_id,
                    url,
                    alt,
                    address,
                    image_order
                ) VALUES (
                    ${portfolioId},
                    ${image.url},
                    ${image.alt},
                    ${image.address},
                    ${startOrder + i}
                )
                RETURNING *
            `;
            console.log(`✓ Added image ${i + 1}: ${image.alt}`);
        }
        
        // Get total count
        const totalImages = await sql`
            SELECT COUNT(*) as count 
            FROM portfolio_images 
            WHERE portfolio_id = ${portfolioId}
        `;
        
        console.log(`\n✓ Successfully added ${newImages.length} new images!`);
        console.log(`Total images for Cobbler/Northampton Portfolio: ${totalImages[0].count}`);
        
    } catch (error) {
        console.error('Failed to add images:', error);
        process.exit(1);
    }
}

// Run
addCobblerImages();