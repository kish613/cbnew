import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function addNewNorthEastImages() {
    console.log('Adding new images to New North East Portfolio...');
    
    const newImages = [
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754393929/35_edited_wukbeb.png',
            alt: 'New North East Portfolio - Property 1',
            address: 'Horden & Hartlepool, County Durham'
        },
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754393930/34_edited_k7nard.png',
            alt: 'New North East Portfolio - Property 2',
            address: 'Horden & Hartlepool, County Durham'
        },
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754393933/32_edited_nas2lo.png',
            alt: 'New North East Portfolio - Property 3',
            address: 'Horden & Hartlepool, County Durham'
        },
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754393935/23_edited_hzq7lc.png',
            alt: 'New North East Portfolio - Property 4',
            address: 'Horden & Hartlepool, County Durham'
        },
        {
            url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754393937/22_edited_zp8e9l.jpg',
            alt: 'New North East Portfolio - Property 5',
            address: 'Horden & Hartlepool, County Durham'
        }
    ];
    
    try {
        // First get the current highest image_order for this portfolio
        const currentImages = await sql`
            SELECT MAX(image_order) as max_order 
            FROM portfolio_images 
            WHERE portfolio_id = 'new-north-east-portfolio'
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
                    'new-north-east-portfolio',
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
            WHERE portfolio_id = 'new-north-east-portfolio'
        `;
        
        console.log(`\n✓ Successfully added ${newImages.length} new images!`);
        console.log(`Total images for New North East Portfolio: ${totalImages[0].count}`);
        
    } catch (error) {
        console.error('Failed to add images:', error);
        process.exit(1);
    }
}

// Run
addNewNorthEastImages();