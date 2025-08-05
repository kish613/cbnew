import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function fixBrownPortfolio() {
    console.log('Fixing Brown Portfolio images...\n');
    
    const correctImages = [
        { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384332/48_v4gvu9.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
        { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384333/49_pbexac.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
        { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384320/39_qnosuc.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
        { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384311/32_srz9ju.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
        { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384305/27_bzpphg.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
        { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384278/10_vn2var.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
        { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384296/21_yci8qq.jpg", alt: "Brown Portfolio - Mixed Use Collection" }
    ];
    
    try {
        // Get the Brown portfolio
        const portfolio = await sql`
            SELECT portfolio_id 
            FROM portfolios 
            WHERE title = 'Brown Portfolio'
        `;
        
        if (portfolio.length === 0) {
            console.error('Brown Portfolio not found!');
            return;
        }
        
        const portfolioId = portfolio[0].portfolio_id;
        console.log(`Found portfolio with ID: ${portfolioId}`);
        
        // Delete existing images
        await sql`
            DELETE FROM portfolio_images 
            WHERE portfolio_id = ${portfolioId}
        `;
        console.log('Deleted existing images');
        
        // Insert correct images
        for (let i = 0; i < correctImages.length; i++) {
            const image = correctImages[i];
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
                    ${i}
                )
            `;
            console.log(`✓ Added image ${i + 1}: ${image.url.split('/').pop()}`);
        }
        
        console.log(`\n✓ Successfully fixed Brown Portfolio with ${correctImages.length} images!`);
        
    } catch (error) {
        console.error('Failed to fix portfolio:', error);
    } finally {
        // Clean up .env file
        const fs = require('fs');
        if (fs.existsSync('.env')) {
            fs.unlinkSync('.env');
        }
    }
}

// Run
fixBrownPortfolio();