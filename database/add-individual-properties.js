import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function addIndividualProperties() {
    console.log('Adding new properties to Properties Bought Individually portfolio...');
    
    try {
        // Get the current max image_order for the portfolio
        const maxOrderResult = await sql`
            SELECT MAX(image_order) as max_order 
            FROM portfolio_images 
            WHERE portfolio_id = 'mdrr1ao2s5kczyxn5vs'
        `;
        
        const startOrder = (maxOrderResult[0].max_order || -1) + 1;
        console.log(`Starting image order from: ${startOrder}`);
        
        // New properties to add
        const newProperties = [
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043485/82_grange_sJHUDn_gnfawl.jpg',
                alt: '82 Grange Road, Chessington',
                address: '82 Grange Road, Chessington'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043487/499a_Ckrv5c_e7tfnr.jpg',
                alt: '499a Upper Brentwood Road, Romford',
                address: '499a Upper Brentwood Road, Romford'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043486/18_weston_ave_sJHUDn_vk8z4r.jpg',
                alt: '18 Weston Avenue, Tividale',
                address: '18 Weston Avenue, Tividale'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043483/123_berridge_Ckrv5c_u6umll.jpg',
                alt: '123 Berridge Road, Sheerness',
                address: '123 Berridge Road, Sheerness'
            }
        ];
        
        // Add each property
        for (let i = 0; i < newProperties.length; i++) {
            const property = newProperties[i];
            await sql`
                INSERT INTO portfolio_images (
                    portfolio_id,
                    url,
                    alt,
                    address,
                    image_order
                ) VALUES (
                    'mdrr1ao2s5kczyxn5vs',
                    ${property.url},
                    ${property.alt},
                    ${property.address},
                    ${startOrder + i}
                )
            `;
            console.log(`✓ Added: ${property.address}`);
        }
        
        // Get total count
        const countResult = await sql`
            SELECT COUNT(*) as total 
            FROM portfolio_images 
            WHERE portfolio_id = 'mdrr1ao2s5kczyxn5vs'
        `;
        
        console.log(`\n✓ Successfully added ${newProperties.length} properties!`);
        console.log(`Total properties in portfolio: ${countResult[0].total}`);
        
    } catch (error) {
        console.error('Failed to add properties:', error);
        process.exit(1);
    }
}

// Run
addIndividualProperties();