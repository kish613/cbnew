// Setup database and migrate data
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
    console.log('Checking database setup...');
    
    try {
        // Check if tables exist
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('portfolios', 'portfolio_details', 'portfolio_images')
        `;
        
        if (tables.length < 3) {
            console.log('Creating database tables...');
            
            // Read and execute schema
            const schemaPath = path.join(__dirname, 'schema.sql');
            const schema = await fs.readFile(schemaPath, 'utf8');
            
            // Split by semicolon and execute each statement
            const statements = schema.split(';').filter(stmt => stmt.trim());
            
            for (const statement of statements) {
                if (statement.trim()) {
                    await sql([statement]);
                }
            }
            
            console.log('Database tables created successfully!');
        } else {
            console.log('Database tables already exist.');
        }
        
        // Now run the migration
        console.log('\nStarting migration...');
        
        // Import the migration script
        const { default: migrate } = await import('./migrate-all-portfolios.js');
        
    } catch (error) {
        console.error('Setup failed:', error);
        process.exit(1);
    }
}

// Run setup
setupDatabase();