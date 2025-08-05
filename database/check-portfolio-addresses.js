import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkPortfolioAddresses() {
    console.log('Checking which portfolios have address labels...\n');
    
    try {
        const portfolios = await sql`
            SELECT 
                p.title,
                p.category,
                COUNT(pi.id) as total_images,
                COUNT(CASE WHEN pi.address IS NOT NULL AND pi.address != '' THEN 1 END) as images_with_address,
                COUNT(CASE WHEN pi.show_label = true THEN 1 END) as images_with_label_enabled
            FROM portfolios p
            LEFT JOIN portfolio_images pi ON p.portfolio_id = pi.portfolio_id
            WHERE p.category IN ('residential', 'commercial')
            GROUP BY p.portfolio_id, p.title, p.category
            ORDER BY p.category, p.title
        `;
        
        console.log('Portfolio Address Summary:');
        console.log('=========================\n');
        
        let lastCategory = '';
        for (const portfolio of portfolios) {
            if (portfolio.category !== lastCategory) {
                console.log(`\n${portfolio.category.toUpperCase()} PORTFOLIOS:`);
                console.log('-'.repeat(50));
                lastCategory = portfolio.category;
            }
            
            console.log(`${portfolio.title}:`);
            console.log(`  Total images: ${portfolio.total_images}`);
            console.log(`  Images with addresses: ${portfolio.images_with_address}`);
            console.log(`  Labels enabled: ${portfolio.images_with_label_enabled}`);
            
            if (portfolio.images_with_address > 0 && portfolio.images_with_label_enabled < portfolio.images_with_address) {
                console.log(`  ⚠️  Has addresses but labels not all enabled!`);
            }
        }
        
        // Now let's check specific portfolios that should have addresses
        console.log('\n\nChecking specific portfolios with addresses:');
        console.log('==========================================\n');
        
        const portfoliosWithAddresses = await sql`
            SELECT DISTINCT
                p.title,
                p.category,
                pi.address,
                pi.show_label
            FROM portfolios p
            JOIN portfolio_images pi ON p.portfolio_id = pi.portfolio_id
            WHERE pi.address IS NOT NULL AND pi.address != ''
            ORDER BY p.category, p.title
        `;
        
        console.log('Portfolios with address data:');
        portfoliosWithAddresses.forEach(p => {
            console.log(`- ${p.title} (${p.category}): "${p.address}" - Label enabled: ${p.show_label}`);
        });
        
    } catch (error) {
        console.error('Failed to check addresses:', error);
        process.exit(1);
    }
}

// Run
checkPortfolioAddresses();