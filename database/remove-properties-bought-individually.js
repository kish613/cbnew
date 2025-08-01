import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function removePropertiesBoughtIndividually() {
    console.log('Removing Properties Bought Individually from database...');
    
    try {
        const portfolioId = 'mdrr1ao2s5kczyxn5vs';
        
        // Get portfolio info
        const portfolio = await sql`
            SELECT title FROM portfolios WHERE portfolio_id = ${portfolioId}
        `;
        
        if (portfolio.length === 0) {
            console.log('Properties Bought Individually portfolio not found in database.');
            return;
        }
        
        console.log(`Found portfolio: ${portfolio[0].title}`);
        
        // Delete portfolio images
        const deletedImages = await sql`
            DELETE FROM portfolio_images 
            WHERE portfolio_id = ${portfolioId}
            RETURNING *
        `;
        console.log(`✓ Deleted ${deletedImages.length} images`);
        
        // Delete portfolio details
        const deletedDetails = await sql`
            DELETE FROM portfolio_details 
            WHERE portfolio_id = ${portfolioId}
            RETURNING *
        `;
        console.log(`✓ Deleted ${deletedDetails.length} details`);
        
        // Delete the portfolio
        const deletedPortfolio = await sql`
            DELETE FROM portfolios 
            WHERE portfolio_id = ${portfolioId}
            RETURNING *
        `;
        console.log(`✓ Deleted portfolio: ${deletedPortfolio[0].title}`);
        
        console.log('\n✓ Successfully removed Properties Bought Individually from database!');
        
        // Show remaining residential portfolios
        const remainingPortfolios = await sql`
            SELECT title FROM portfolios 
            WHERE category = 'residential' 
            ORDER BY display_order
        `;
        
        console.log('\nRemaining residential portfolios:');
        remainingPortfolios.forEach(p => console.log(`  - ${p.title}`));
        
    } catch (error) {
        console.error('Failed to remove portfolio:', error);
        process.exit(1);
    }
}

// Run
removePropertiesBoughtIndividually();