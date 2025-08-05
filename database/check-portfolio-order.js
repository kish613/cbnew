import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkPortfolioOrder() {
    console.log('Checking portfolio featured_image_order...\n');
    
    try {
        // Get all portfolios with their featured_image_order
        const portfolios = await sql`
            SELECT 
                p.portfolio_id,
                p.title,
                p.category,
                p.featured_image_order,
                COUNT(pi.id) as total_images
            FROM portfolios p
            LEFT JOIN portfolio_images pi ON p.portfolio_id = pi.portfolio_id
            WHERE p.category IN ('residential', 'commercial')
            GROUP BY p.portfolio_id, p.title, p.category, p.featured_image_order
            ORDER BY p.category, p.title
        `;
        
        console.log('Portfolio Image Orders:\n');
        
        for (const portfolio of portfolios) {
            console.log(`${portfolio.title}:`);
            console.log(`  Total images: ${portfolio.total_images}`);
            console.log(`  Featured order: ${portfolio.featured_image_order || 'NULL'}`);
            
            if (portfolio.featured_image_order) {
                const orderArray = JSON.parse(portfolio.featured_image_order);
                console.log(`  Order array length: ${orderArray.length}`);
                
                if (orderArray.length > portfolio.total_images) {
                    console.log(`  ⚠️  WARNING: Order array (${orderArray.length}) is longer than total images (${portfolio.total_images})!`);
                    console.log(`  Order indices: ${orderArray.join(', ')}`);
                }
            }
            console.log('');
        }
        
    } catch (error) {
        console.error('Failed to check portfolio order:', error);
        process.exit(1);
    }
}

// Run
checkPortfolioOrder();