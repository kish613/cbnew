// Migration script to import existing portfolio data into Neon
// Run this locally with: node database/migrate-data.js

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

// Default portfolio data (same as in admin.js)
const defaultPortfolios = {
    residential: [
        {
            id: generateId(),
            title: "Spire Portfolio",
            category: "residential",
            location: "Chesterfield and Mansfield",
            type: "Mixed Portfolio",
            address: "",
            description: "A collection of 42 residential properties across Chesterfield and Mansfield, featuring a mix of terraced houses, semi-detached homes, and apartments.",
            details: [
                { icon: "ri-building-line", text: "42 Properties" },
                { icon: "ri-map-pin-line", text: "Derbyshire" },
                { icon: "ri-home-4-line", text: "Mixed Portfolio" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png", alt: "Spire Portfolio - Chesterfield and Mansfield Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421153/spire_4_rksn9r.png", alt: "Spire Portfolio - Chesterfield and Mansfield Properties" }
            ]
        },
        {
            id: generateId(),
            title: "Cobbler Northampton Portfolio",
            category: "residential",
            location: "Northampton",
            type: "Terraced Houses",
            address: "Baker Street, Northampton, NN1",
            description: "High-quality terraced properties in Northampton, fully refurbished and managed by our in-house team. Features modern amenities and prime locations.",
            details: [
                { icon: "ri-building-line", text: "15 Houses" },
                { icon: "ri-map-pin-line", text: "Central Northampton" },
                { icon: "ri-shield-check-line", text: "Fully Managed" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.16.26_qwtdl9.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421149/Screenshot_2025-06-06_at_18.10.19_vwowlh.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" }
            ]
        },
        // Add all other portfolios here...
    ],
    commercial: [
        // Add all commercial portfolios here...
    ]
};

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function migrateData() {
    console.log('Starting migration...');
    
    try {
        // Clear existing data (optional - comment out if you want to keep existing data)
        console.log('Clearing existing data...');
        await sql`DELETE FROM portfolio_images`;
        await sql`DELETE FROM portfolio_details`;
        await sql`DELETE FROM portfolios`;
        
        // Insert portfolios
        for (const category of ['residential', 'commercial']) {
            const portfolios = defaultPortfolios[category];
            console.log(`Migrating ${portfolios.length} ${category} portfolios...`);
            
            for (let i = 0; i < portfolios.length; i++) {
                const portfolio = portfolios[i];
                console.log(`  - ${portfolio.title}`);
                
                // Insert portfolio
                await sql`
                    INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order)
                    VALUES (${portfolio.id}, ${portfolio.title}, ${portfolio.category}, ${portfolio.location}, 
                            ${portfolio.type || null}, ${portfolio.address || null}, ${portfolio.description}, ${i})
                `;
                
                // Insert details
                if (portfolio.details && portfolio.details.length > 0) {
                    for (let j = 0; j < portfolio.details.length; j++) {
                        const detail = portfolio.details[j];
                        await sql`
                            INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order)
                            VALUES (${portfolio.id}, ${detail.icon}, ${detail.text}, ${j})
                        `;
                    }
                }
                
                // Insert images
                if (portfolio.images && portfolio.images.length > 0) {
                    for (let j = 0; j < portfolio.images.length; j++) {
                        const image = portfolio.images[j];
                        await sql`
                            INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
                            VALUES (${portfolio.id}, ${image.url}, ${image.alt}, ${image.address || null}, ${j})
                        `;
                    }
                }
            }
        }
        
        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateData();