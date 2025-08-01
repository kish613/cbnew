import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateSpireDescription() {
    console.log('Updating Spire Portfolio description...');
    
    const newDescription = `The Spire Portfolio: Premium Residential Investment in the East Midlands

Portfolio Overview
The Spire Portfolio represents a substantial residential investment comprising 68 three-bedroom houses strategically located across two key East Midlands towns: Chesterfield and Mansfield. This fully-let reversionary portfolio offers an impressive blend of traditional and non-traditional construction properties, providing stable income with significant growth potential.

Strategic Locations
Chesterfield Properties (50 Houses)
Located in the village of Brimington, just 3.5 miles from Chesterfield town centre, these properties benefit from:
• Excellent transport links via the M1 motorway (Junctions 29, 29a, and 30)
• Direct rail connections to major cities including Sheffield (12 minutes), Nottingham (35 minutes), and London St Pancras (1 hour 48 minutes)
• Proximity to Chesterfield's £340 million town centre regeneration project, "Chesterfield Waterside"
• Mix of 44 semi-detached and 6 terraced houses

Mansfield Properties (18 Houses)
Situated in the village of Nether Langwith, 7.5 miles north of Mansfield, offering:
• Easy access to the East Midlands railway network via Langwith-Whaley Thorns station
• Strong connectivity to the M1 motorway
• Located near Mansfield's major regeneration initiatives, including £12 million Towns Fund investment
• Combination of 9 semi-detached and 9 terraced houses

Property Details
Construction Types
The portfolio showcases diverse construction methods:
• Traditional Construction: 13 properties
• Non-Traditional Construction: 55 properties
  - REEMA houses: 32 units
  - Wimpey No-Fines houses: 23 units

Current Performance
• 100% Occupancy: All 68 properties are currently let
• Annual Income: £435,564 per annum
• Significant Reversionary Potential: Estimated Rental Value of approximately £487,500 per annum
• Diverse Tenancy Mix: Including Assured Shorthold Tenancies, Assured Periodic Tenancies, and Regulated Tenancies

Investment Highlights
This portfolio offers investors:
• Geographic Diversification: Properties spread across two thriving East Midlands locations
• Strong Rental Demand: Both locations benefit from excellent transport links and ongoing regeneration
• Growth Potential: Considerable opportunity for rental increases to market rates
• Stable Income: Fully occupied portfolio with established tenant base
• Professional Management Ready: All properties maintained in tenantable condition

Regional Growth Drivers
Both Chesterfield and Mansfield are experiencing significant investment and regeneration:
• Chesterfield's Waterside development bringing new offices, hotels, restaurants, and public spaces
• Mansfield's Town Centre Masterplan supported by government funding
• Strong employment opportunities and transport infrastructure supporting rental demand
• Growing populations in both towns (Chesterfield: 105,000, Mansfield: 110,000)`;
    
    try {
        // Update the Spire Portfolio description
        await sql`
            UPDATE portfolios
            SET description = ${newDescription}
            WHERE title = 'Spire Portfolio'
        `;
        console.log('✓ Updated Spire Portfolio description');
        
        console.log('\n✓ Successfully updated Spire Portfolio description!');
        
    } catch (error) {
        console.error('Failed to update description:', error);
        process.exit(1);
    }
}

// Run
updateSpireDescription();