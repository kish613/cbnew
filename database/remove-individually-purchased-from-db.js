import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function removeIndividuallyPurchasedFromDB() {
    console.log('Removing Individually Purchased Properties from database...');
    
    try {
        // First, find the portfolio ID
        const portfolio = await sql`
            SELECT portfolio_id, title 
            FROM portfolios 
            WHERE portfolio_id LIKE 'individually-purchased-%'
        `;
        
        if (portfolio.length === 0) {
            console.log('No Individually Purchased Properties portfolio found in database.');
            return;
        }
        
        const portfolioId = portfolio[0].portfolio_id;
        console.log(`Found portfolio: ${portfolio[0].title} (ID: ${portfolioId})`);
        
        // Delete portfolio images first (due to foreign key constraint)
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
        
        // Finally, delete the portfolio itself
        const deletedPortfolio = await sql`
            DELETE FROM portfolios 
            WHERE portfolio_id = ${portfolioId}
            RETURNING *
        `;
        console.log(`✓ Deleted portfolio: ${deletedPortfolio[0].title}`);
        
        console.log('\n✓ Successfully removed Individually Purchased Properties from database!');
        console.log('The properties are now only displayed in the static HTML "Individually Purchased" section.');
        
    } catch (error) {
        console.error('Failed to remove portfolio:', error);
        process.exit(1);
    }
}

// Run
removeIndividuallyPurchasedFromDB();