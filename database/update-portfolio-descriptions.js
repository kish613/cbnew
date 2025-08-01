import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updatePortfolioDescriptions() {
    console.log('Updating portfolio descriptions...');
    
    try {
        // Update John Silkin Lane
        await sql`
            UPDATE portfolios
            SET description = 'Premium residential development featuring modern homes with contemporary design and high-quality finishes.'
            WHERE portfolio_id = 'john-silkin-lane'
        `;
        console.log('✓ Updated John Silkin Lane description');
        
        // Update New North East Portfolio
        await sql`
            UPDATE portfolios
            SET description = 'Strategic residential portfolio comprising quality properties across key North East locations.'
            WHERE portfolio_id = 'new-north-east-portfolio'
        `;
        console.log('✓ Updated New North East Portfolio description');
        
        console.log('\n✓ Successfully updated portfolio descriptions!');
        
    } catch (error) {
        console.error('Failed to update descriptions:', error);
        process.exit(1);
    }
}

// Run
updatePortfolioDescriptions();