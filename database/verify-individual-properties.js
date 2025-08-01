import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function verifyProperties() {
    // Get all images for the portfolio
    const images = await sql`
        SELECT url, alt, address, image_order 
        FROM portfolio_images 
        WHERE portfolio_id = 'mdrr1ao2s5kczyxn5vs'
        ORDER BY image_order
    `;
    
    console.log(`Total Properties in "Properties Bought Individually": ${images.length}`);
    console.log('\nAll properties:');
    images.forEach((img, index) => {
        console.log(`${index + 1}. ${img.address || img.alt}`);
        console.log(`   URL: ${img.url.substring(0, 80)}...`);
    });
}

verifyProperties();