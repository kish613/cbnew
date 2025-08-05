import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function removePropertiesBought() {
    console.log('Removing Properties Bought Individually portfolio...');
    
    try {
        // Find the portfolio
        const result = await sql`
            SELECT portfolio_id FROM portfolios 
            WHERE title = 'Properties Bought Individually'
        `;
        
        if (result.length > 0) {
            const portfolioId = result[0].portfolio_id;
            console.log(`Found portfolio with ID: ${portfolioId}`);
            
            // Delete related data first
            await sql`DELETE FROM portfolio_images WHERE portfolio_id = ${portfolioId}`;
            await sql`DELETE FROM portfolio_details WHERE portfolio_id = ${portfolioId}`;
            await sql`DELETE FROM portfolios WHERE portfolio_id = ${portfolioId}`;
            
            console.log('Successfully removed Properties Bought Individually portfolio');
        } else {
            console.log('Portfolio not found');
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

removePropertiesBought();