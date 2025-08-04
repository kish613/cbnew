import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function addFeaturedImageField() {
  try {
    console.log('Adding featured_image_order field to portfolios table...');
    
    // Add featured_image_order column to portfolios table
    await sql`
      ALTER TABLE portfolios 
      ADD COLUMN IF NOT EXISTS featured_image_order INTEGER DEFAULT 0
    `;
    
    console.log('✓ Successfully added featured_image_order field');
    
  } catch (error) {
    console.error('Error adding featured_image_order field:', error);
    throw error;
  }
}

// Run the migration
addFeaturedImageField()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });