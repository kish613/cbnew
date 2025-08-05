import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateLongRow() {
    console.log('Updating Long Row Nottingham with income...');
    
    try {
        await sql`
            UPDATE portfolios 
            SET description = 'Premium retail units on Nottingham''s historic Long Row generating £130,000 annually. The city''s main shopping thoroughfare featuring period architecture with modern retail spaces.'
            WHERE portfolio_id = 'mdrr1ao2qagw5xx1tji'
        `;
        
        console.log('Long Row Nottingham updated successfully!');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

updateLongRow();