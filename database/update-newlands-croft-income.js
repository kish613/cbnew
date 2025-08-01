import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateNewlandsCroftIncome() {
    console.log('Updating Newlands Croft with rental income information...');
    
    try {
        // Update the portfolio description to include rental income
        const updatedPortfolio = await sql`
            UPDATE portfolios 
            SET 
                description = 'Originally built in the 1940s as 16 flats, redeveloped into 12 spacious flats in Bromley, London. Purchased with vacant possession and now fully managed in-house by Fast Homes Investments. This premium development generates annual rental income in excess of £150,000, demonstrating strong investment performance in the South London market.'
            WHERE portfolio_id = 'mdrr1ao23ri67kq9m8x'
            RETURNING *
        `;
        
        if (updatedPortfolio.length === 0) {
            console.error('Portfolio not found!');
            process.exit(1);
        }
        
        console.log('✓ Updated portfolio description with rental income');
        
        // Check if there's already an income detail, if not add it
        const existingDetails = await sql`
            SELECT * FROM portfolio_details 
            WHERE portfolio_id = 'mdrr1ao23ri67kq9m8x'
            ORDER BY detail_order
        `;
        
        // Check if we already have an income detail
        const hasIncomeDetail = existingDetails.some(detail => 
            detail.text.includes('£') || detail.text.includes('income')
        );
        
        if (!hasIncomeDetail) {
            // Add rental income as a new detail
            const maxOrder = Math.max(...existingDetails.map(d => d.detail_order), -1);
            
            await sql`
                INSERT INTO portfolio_details (
                    portfolio_id,
                    icon,
                    text,
                    detail_order
                ) VALUES (
                    'mdrr1ao23ri67kq9m8x',
                    'ri-money-pound-circle-line',
                    '£150,000+ Annual Income',
                    ${maxOrder + 1}
                )
            `;
            
            console.log('✓ Added rental income detail');
        } else {
            // Update existing detail if it contains financial info
            await sql`
                UPDATE portfolio_details 
                SET text = '£150,000+ Annual Income'
                WHERE portfolio_id = 'mdrr1ao23ri67kq9m8x'
                AND (text LIKE '%£%' OR text LIKE '%income%' OR text LIKE '%Management%')
            `;
            
            console.log('✓ Updated existing detail with rental income');
        }
        
        console.log('\n✓ Successfully updated Newlands Croft!');
        console.log('Annual rental income: In excess of £150,000');
        
    } catch (error) {
        console.error('Failed to update portfolio:', error);
        process.exit(1);
    }
}

// Run
updateNewlandsCroftIncome();