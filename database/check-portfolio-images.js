import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkPortfolioImages() {
    console.log('Checking Midlands and North West portfolio images...\n');
    
    try {
        // Check Midlands
        const midlands = await sql`
            SELECT p.title, p.portfolio_id, COUNT(pi.id) as image_count
            FROM portfolios p
            LEFT JOIN portfolio_images pi ON p.portfolio_id = pi.portfolio_id
            WHERE p.title = 'Midlands Portfolio'
            GROUP BY p.portfolio_id, p.title
        `;
        
        console.log('Midlands Portfolio:');
        midlands.forEach(p => {
            console.log(`  ID: ${p.portfolio_id}`);
            console.log(`  Images: ${p.image_count}`);
        });
        
        // Check North West
        const northwest = await sql`
            SELECT p.title, p.portfolio_id, COUNT(pi.id) as image_count
            FROM portfolios p
            LEFT JOIN portfolio_images pi ON p.portfolio_id = pi.portfolio_id
            WHERE p.title = 'North West Portfolio'
            GROUP BY p.portfolio_id, p.title
        `;
        
        console.log('\nNorth West Portfolio:');
        northwest.forEach(p => {
            console.log(`  ID: ${p.portfolio_id}`);
            console.log(`  Images: ${p.image_count}`);
        });
        
        // Get actual images for Midlands
        console.log('\nMidlands Portfolio Images:');
        const midlandsImages = await sql`
            SELECT url, alt FROM portfolio_images 
            WHERE portfolio_id = 'midlands-portfolio-2025'
            ORDER BY image_order
        `;
        midlandsImages.forEach((img, i) => {
            console.log(`  ${i + 1}. ${img.alt}`);
        });
        
        // Get actual images for North West
        console.log('\nNorth West Portfolio Images:');
        const northwestImages = await sql`
            SELECT url, alt FROM portfolio_images 
            WHERE portfolio_id = 'north-west-portfolio-2025'
            ORDER BY image_order
        `;
        northwestImages.forEach((img, i) => {
            console.log(`  ${i + 1}. ${img.alt}`);
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

checkPortfolioImages();