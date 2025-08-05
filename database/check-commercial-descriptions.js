import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function checkCommercialDescriptions() {
    console.log('Checking commercial portfolio descriptions in database...\n');
    
    try {
        const commercialPortfolios = await sql`
            SELECT portfolio_id, title, description 
            FROM portfolios 
            WHERE category = 'commercial'
            ORDER BY title
        `;
        
        commercialPortfolios.forEach(p => {
            console.log(`${p.title}:`);
            console.log(`  ID: ${p.portfolio_id}`);
            console.log(`  Description: ${p.description.substring(0, 100)}...`);
            console.log(`  Has income? ${p.description.includes('£') ? 'YES' : 'NO'}`);
            console.log();
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

checkCommercialDescriptions();