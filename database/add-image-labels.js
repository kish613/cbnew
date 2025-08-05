import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function addImageLabels() {
    console.log('Adding image label fields to database...');
    
    try {
        // Add show_label field to portfolio_images table
        await sql`
            ALTER TABLE portfolio_images 
            ADD COLUMN IF NOT EXISTS show_label BOOLEAN DEFAULT false
        `;
        console.log('✓ Added show_label column to portfolio_images table');
        
        // Verify the column was added
        const columns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'portfolio_images' 
            AND column_name = 'show_label'
        `;
        
        if (columns.length > 0) {
            console.log('✓ Verified show_label column exists');
        } else {
            console.error('❌ Failed to verify show_label column');
        }
        
        console.log('\n✓ Successfully added image label fields!');
        
    } catch (error) {
        console.error('Failed to add image labels:', error);
        process.exit(1);
    }
}

// Run
addImageLabels();