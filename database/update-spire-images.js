import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateSpireImages() {
    console.log('Updating Spire portfolio images...');
    
    try {
        // First, get the Spire portfolio ID
        const spirePortfolio = await sql`
            SELECT portfolio_id 
            FROM portfolios 
            WHERE title = 'Spire Portfolio'
        `;
        
        if (spirePortfolio.length === 0) {
            console.error('Spire Portfolio not found!');
            return;
        }
        
        const portfolioId = spirePortfolio[0].portfolio_id;
        console.log(`Found Spire Portfolio with ID: ${portfolioId}`);
        
        // Delete existing images
        await sql`
            DELETE FROM portfolio_images 
            WHERE portfolio_id = ${portfolioId}
        `;
        console.log('✓ Deleted old images');
        
        // New image URLs
        const newImages = [
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754045771/49_snrk4l.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754045793/2_e8sbtp.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754045795/3_e2tivo.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754045799/6_d8yw6o.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754045787/59_ybrtae.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754045808/11_uexlto.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754045810/12_utsprn.jpg'
        ];
        
        // Insert new images
        for (let i = 0; i < newImages.length; i++) {
            await sql`
                INSERT INTO portfolio_images (
                    portfolio_id,
                    url,
                    alt,
                    address,
                    image_order
                ) VALUES (
                    ${portfolioId},
                    ${newImages[i]},
                    ${`Spire Portfolio - Image ${i + 1}`},
                    'Spire Portfolio',
                    ${i}
                )
            `;
        }
        
        console.log(`✓ Added ${newImages.length} new images`);
        console.log('\n✓ Successfully updated Spire portfolio images!');
        
    } catch (error) {
        console.error('Failed to update images:', error);
        process.exit(1);
    }
}

// Run
updateSpireImages();