// Create database tables
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function createTables() {
    console.log('Creating database tables...');
    
    try {
        // Create portfolios table
        await sql`
            CREATE TABLE IF NOT EXISTS portfolios (
                id SERIAL PRIMARY KEY,
                portfolio_id VARCHAR(50) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(50) NOT NULL CHECK (category IN ('residential', 'commercial')),
                location VARCHAR(255) NOT NULL,
                type VARCHAR(255),
                address VARCHAR(500),
                description TEXT,
                display_order INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✓ Created portfolios table');

        // Create portfolio details table
        await sql`
            CREATE TABLE IF NOT EXISTS portfolio_details (
                id SERIAL PRIMARY KEY,
                portfolio_id VARCHAR(50) REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
                icon VARCHAR(100),
                text VARCHAR(255),
                detail_order INTEGER NOT NULL DEFAULT 0
            )
        `;
        console.log('✓ Created portfolio_details table');

        // Create portfolio images table
        await sql`
            CREATE TABLE IF NOT EXISTS portfolio_images (
                id SERIAL PRIMARY KEY,
                portfolio_id VARCHAR(50) REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
                url TEXT NOT NULL,
                alt VARCHAR(500),
                address VARCHAR(500),
                image_order INTEGER NOT NULL DEFAULT 0
            )
        `;
        console.log('✓ Created portfolio_images table');

        // Create indexes
        await sql`CREATE INDEX IF NOT EXISTS idx_portfolios_category ON portfolios(category)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_portfolios_display_order ON portfolios(display_order)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_portfolio_details_portfolio_id ON portfolio_details(portfolio_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_portfolio_images_portfolio_id ON portfolio_images(portfolio_id)`;
        console.log('✓ Created indexes');

        // Create update trigger
        await sql`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql'
        `;
        
        await sql`
            DROP TRIGGER IF EXISTS update_portfolios_updated_at ON portfolios
        `;
        
        await sql`
            CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE
            ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
        `;
        console.log('✓ Created update trigger');

        console.log('\nAll database tables created successfully!');
        console.log('You can now run: node database/migrate-all-portfolios.js');
        
    } catch (error) {
        console.error('Failed to create tables:', error);
        process.exit(1);
    }
}

// Run
createTables();