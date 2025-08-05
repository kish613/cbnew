import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function removeDuplicates() {
    console.log('Removing duplicate portfolios...');
    
    try {
        // First, let's see what we have
        const portfolios = await sql`
            SELECT portfolio_id, title, created_at 
            FROM portfolios 
            ORDER BY title, created_at DESC
        `;
        
        console.log(`Found ${portfolios.length} total portfolios`);
        
        // Group by title to find duplicates
        const titleGroups = {};
        portfolios.forEach(p => {
            if (!titleGroups[p.title]) {
                titleGroups[p.title] = [];
            }
            titleGroups[p.title].push(p);
        });
        
        // Remove duplicates - keep the oldest one (original)
        for (const title in titleGroups) {
            const group = titleGroups[title];
            if (group.length > 1) {
                console.log(`\nFound ${group.length} instances of "${title}"`);
                
                // Sort by created_at to keep the oldest
                group.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                
                // Keep the first (oldest), delete the rest
                for (let i = 1; i < group.length; i++) {
                    const portfolioToDelete = group[i];
                    console.log(`  - Deleting duplicate: ${portfolioToDelete.portfolio_id}`);
                    
                    // Delete related data first
                    await sql`DELETE FROM portfolio_images WHERE portfolio_id = ${portfolioToDelete.portfolio_id}`;
                    await sql`DELETE FROM portfolio_details WHERE portfolio_id = ${portfolioToDelete.portfolio_id}`;
                    await sql`DELETE FROM portfolios WHERE portfolio_id = ${portfolioToDelete.portfolio_id}`;
                }
            }
        }
        
        // Verify final count
        const finalCount = await sql`SELECT COUNT(*) as count FROM portfolios`;
        console.log(`\nDone! Final portfolio count: ${finalCount[0].count}`);
        
    } catch (error) {
        console.error('Error removing duplicates:', error);
        process.exit(1);
    }
}

// Run the cleanup
removeDuplicates();