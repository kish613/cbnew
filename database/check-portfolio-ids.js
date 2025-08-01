import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkPortfolios() {
    const portfolios = await sql`
        SELECT portfolio_id, title 
        FROM portfolios 
        WHERE category = 'residential'
        ORDER BY title
    `;
    
    console.log('Residential Portfolios:');
    portfolios.forEach(p => {
        console.log(`- ${p.title}: ${p.portfolio_id}`);
    });
}

checkPortfolios();