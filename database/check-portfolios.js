import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkPortfolios() {
    const portfolios = await sql`
        SELECT portfolio_id, title, category, created_at 
        FROM portfolios 
        ORDER BY category, title
    `;
    
    console.log(`Total portfolios: ${portfolios.length}\n`);
    
    console.log('Residential:');
    portfolios.filter(p => p.category === 'residential').forEach(p => {
        console.log(`  - ${p.title} (${p.portfolio_id})`);
    });
    
    console.log('\nCommercial:');
    portfolios.filter(p => p.category === 'commercial').forEach(p => {
        console.log(`  - ${p.title} (${p.portfolio_id})`);
    });
}

checkPortfolios();