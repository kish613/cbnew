import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function removeDuplicateRegionalPortfolios() {
    console.log('Removing duplicate London, Midlands, and North West portfolios from database...');
    
    try {
        // List of portfolio IDs to remove (these should only be in Individually Purchased section)
        const portfoliosToRemove = [
            'mdrr1ao2mj94s6706kl', // London Portfolio
            'mdrr1ao2a4cze6kxbib', // Midlands Portfolio
            'mdrr1ao2qagg4vwpj78'  // North West Portfolio
        ];
        
        for (const portfolioId of portfoliosToRemove) {
            // Get portfolio name for logging
            const portfolio = await sql`
                SELECT title FROM portfolios WHERE portfolio_id = ${portfolioId}
            `;
            
            if (portfolio.length === 0) {
                console.log(`Portfolio ${portfolioId} not found, skipping...`);
                continue;
            }
            
            const title = portfolio[0].title;
            console.log(`\nRemoving ${title}...`);
            
            // Delete portfolio images
            const deletedImages = await sql`
                DELETE FROM portfolio_images 
                WHERE portfolio_id = ${portfolioId}
                RETURNING *
            `;
            console.log(`  ✓ Deleted ${deletedImages.length} images`);
            
            // Delete portfolio details
            const deletedDetails = await sql`
                DELETE FROM portfolio_details 
                WHERE portfolio_id = ${portfolioId}
                RETURNING *
            `;
            console.log(`  ✓ Deleted ${deletedDetails.length} details`);
            
            // Delete the portfolio
            await sql`
                DELETE FROM portfolios 
                WHERE portfolio_id = ${portfolioId}
            `;
            console.log(`  ✓ Deleted portfolio: ${title}`);
        }
        
        console.log('\n✓ Successfully removed duplicate regional portfolios!');
        console.log('These portfolios are now only in the Individually Purchased section.');
        
        // Show remaining residential portfolios
        const remainingPortfolios = await sql`
            SELECT title FROM portfolios 
            WHERE category = 'residential' 
            ORDER BY display_order
        `;
        
        console.log('\nRemaining residential portfolios:');
        remainingPortfolios.forEach(p => console.log(`  - ${p.title}`));
        
    } catch (error) {
        console.error('Failed to remove portfolios:', error);
        process.exit(1);
    }
}

// Run
removeDuplicateRegionalPortfolios();