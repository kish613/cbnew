import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateNewNorthEastPortfolio() {
    console.log('Updating New North East Portfolio details...');
    
    try {
        // Update the portfolio location and description
        const updatedPortfolio = await sql`
            UPDATE portfolios 
            SET 
                location = 'Horden & Hartlepool, County Durham',
                type = 'High-Yield Investment Portfolio',
                address = 'Horden & Hartlepool, County Durham',
                description = ${"24 Premium Investment Properties Across County Durham\n\nWe're proud to showcase our carefully curated portfolio of 24 high-yielding residential properties strategically positioned across two of the North East's most promising investment locations: Horden and Hartlepool.\n\nStrategic Locations, Maximum Returns\nOur portfolio spans 15 properties in Horden and 9 properties in Hartlepool, offering investors diversified exposure to County Durham's thriving rental market. These aren't just properties – they're income-generating assets in areas experiencing sustained demand and growth potential.\n\nWhy Our Portfolio Delivers\n✓ Proven Track Record - Established rental properties with consistent occupancy rates\n✓ High-Yield Focus - Target yields of 10-12% across the portfolio\n✓ Strategic Diversification - Mix of 2 and 3-bedroom properties catering to diverse tenant needs\n✓ Growth Areas - Positioned in locations benefiting from regional regeneration and transport links\n✓ Professional Management - Full end-to-end property management services"}
            WHERE portfolio_id = 'new-north-east-portfolio'
            RETURNING *
        `;
        
        if (updatedPortfolio.length === 0) {
            console.error('Portfolio not found!');
            process.exit(1);
        }
        
        console.log('✓ Updated portfolio location to:', updatedPortfolio[0].location);
        console.log('✓ Added detailed description');
        
        // Update all image addresses
        const updatedImages = await sql`
            UPDATE portfolio_images 
            SET 
                address = 'Horden & Hartlepool, County Durham',
                alt = CASE 
                    WHEN image_order < 4 THEN CONCAT('Horden Property - Image ', image_order + 1)
                    ELSE CONCAT('Hartlepool Property - Image ', image_order - 3)
                END
            WHERE portfolio_id = 'new-north-east-portfolio'
            RETURNING *
        `;
        
        console.log(`✓ Updated ${updatedImages.length} image addresses`);
        
        // Update portfolio details
        await sql`
            DELETE FROM portfolio_details 
            WHERE portfolio_id = 'new-north-east-portfolio'
        `;
        
        const newDetails = [
            { icon: 'ri-building-line', text: '24 Properties' },
            { icon: 'ri-map-pin-line', text: 'Horden (15) & Hartlepool (9)' },
            { icon: 'ri-percent-line', text: '10-12% Target Yield' }
        ];
        
        for (let i = 0; i < newDetails.length; i++) {
            await sql`
                INSERT INTO portfolio_details (
                    portfolio_id,
                    icon,
                    text,
                    detail_order
                ) VALUES (
                    'new-north-east-portfolio',
                    ${newDetails[i].icon},
                    ${newDetails[i].text},
                    ${i}
                )
            `;
        }
        
        console.log(`✓ Updated portfolio details`);
        
        console.log('\n✓ Successfully updated New North East Portfolio!');
        console.log('Location: Horden & Hartlepool, County Durham');
        console.log('Properties: 24 (15 in Horden, 9 in Hartlepool)');
        console.log('Target Yield: 10-12%');
        
    } catch (error) {
        console.error('Failed to update portfolio:', error);
        process.exit(1);
    }
}

// Run
updateNewNorthEastPortfolio();