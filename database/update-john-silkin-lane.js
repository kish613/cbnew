import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateJohnSilkinLane() {
    console.log('Updating John Silkin Lane property details...');
    
    try {
        // Update the portfolio location and description
        const updatedPortfolio = await sql`
            UPDATE portfolios 
            SET 
                location = 'Deptford, South East London',
                type = 'Premium Residential Block',
                address = 'John Silkin Lane, Deptford, London, SE8 5DG',
                description = ${"A Premium Residential Portfolio in the Heart of Deptford\n\nWe're proud to showcase one of our most impressive assets - a commanding residential block of 16 flats perfectly positioned on John Silkin Lane in vibrant Deptford. This substantial property represents the caliber of investment opportunities we identify and develop within London's most promising neighborhoods.\n\nThe Numbers That Matter\nOur John Silkin Lane portfolio generates robust annual rental income of approximately £150,000, demonstrating the strength of our asset selection and management expertise. This exceptional yield reflects both the quality of the accommodation and our deep understanding of the South East London rental market.\n\nStrategic Location Excellence\nWe secured this prime position knowing that location drives long-term value. The property sits at the heart of Deptford's transformation story, with unparalleled transport links including Deptford Station's direct connections to London Bridge and the City. Our tenants enjoy seamless access to Central London while benefiting from the authentic character and growing cultural scene that makes Deptford increasingly desirable.\n\nInvestment Vision Realized\nThis acquisition exemplifies our investment philosophy - identifying emerging areas before they reach peak popularity. We recognized Deptford's potential early, positioning ourselves in a neighborhood that continues to attract young professionals, creatives, and families seeking quality accommodation with excellent connectivity.\n\nPortfolio Performance\nThe consistent rental performance and strong tenant demand at John Silkin Lane validates our expertise in London's residential market. This property stands as a testament to our ability to build and maintain premium residential assets that deliver both immediate returns and long-term capital appreciation."}
            WHERE portfolio_id = 'john-silkin-lane'
            RETURNING *
        `;
        
        if (updatedPortfolio.length === 0) {
            console.error('Portfolio not found!');
            process.exit(1);
        }
        
        console.log('✓ Updated portfolio location to:', updatedPortfolio[0].location);
        console.log('✓ Updated portfolio address to:', updatedPortfolio[0].address);
        console.log('✓ Added detailed description');
        
        // Update all image addresses
        const updatedImages = await sql`
            UPDATE portfolio_images 
            SET 
                address = 'John Silkin Lane, Deptford, London, SE8 5DG',
                alt = CASE 
                    WHEN alt LIKE '%Leeds%' THEN REPLACE(alt, 'Leeds', 'Deptford')
                    ELSE alt
                END
            WHERE portfolio_id = 'john-silkin-lane'
            RETURNING *
        `;
        
        console.log(`✓ Updated ${updatedImages.length} image addresses`);
        
        // Update portfolio details
        const updatedDetails = await sql`
            UPDATE portfolio_details 
            SET text = CASE 
                WHEN text LIKE '%Leeds%' THEN 'John Silkin Lane, Deptford, SE8 5DG'
                WHEN icon = 'building-o' THEN '16 Premium Flats'
                WHEN icon = 'home' THEN '£150,000 Annual Income'
                ELSE text
            END
            WHERE portfolio_id = 'john-silkin-lane'
            RETURNING *
        `;
        
        console.log(`✓ Updated ${updatedDetails.length} portfolio details`);
        
        // Also update the icon types to match the standard format
        await sql`
            UPDATE portfolio_details 
            SET icon = CASE 
                WHEN icon = 'building-o' THEN 'ri-building-line'
                WHEN icon = 'map-marker' THEN 'ri-map-pin-line'
                WHEN icon = 'home' THEN 'ri-money-pound-circle-line'
                ELSE icon
            END
            WHERE portfolio_id = 'john-silkin-lane'
        `;
        
        console.log('✓ Updated portfolio detail icons');
        
        console.log('\n✓ Successfully updated John Silkin Lane property!');
        console.log('Location: Deptford, South East London');
        console.log('Address: John Silkin Lane, Deptford, London, SE8 5DG');
        
    } catch (error) {
        console.error('Failed to update property:', error);
        process.exit(1);
    }
}

// Run
updateJohnSilkinLane();