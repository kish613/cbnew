// Check commercial portfolios in database
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkCommercial() {
    try {
        const commercialPortfolios = await sql`
            SELECT p.*, 
                   COUNT(DISTINCT pi.id) as image_count
            FROM portfolios p
            LEFT JOIN portfolio_images pi ON p.portfolio_id = pi.portfolio_id
            WHERE p.category = 'commercial'
            GROUP BY p.id, p.portfolio_id, p.title, p.category, p.location, p.type, p.address, p.description, p.display_order, p.created_at, p.updated_at
            ORDER BY p.display_order
        `;
        
        console.log('Commercial portfolios in database:');
        console.log('================================');
        
        for (const portfolio of commercialPortfolios) {
            console.log(`\n${portfolio.title}:`);
            console.log(`  - Images: ${portfolio.image_count}`);
            
            // Get actual images
            const images = await sql`
                SELECT url, alt FROM portfolio_images 
                WHERE portfolio_id = ${portfolio.portfolio_id}
                ORDER BY image_order
            `;
            
            if (images.length > 0) {
                console.log('  - Image URLs:');
                images.forEach((img, i) => {
                    console.log(`    ${i + 1}. ${img.url.substring(0, 80)}...`);
                });
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

checkCommercial();