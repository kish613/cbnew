import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function addNewNorthEastPortfolio() {
    console.log('Adding New North East Portfolio to database...');
    
    try {
        // Insert the portfolio
        const portfolio = await sql`
            INSERT INTO portfolios (
                portfolio_id,
                title,
                category,
                location,
                type,
                address,
                description,
                display_order
            ) VALUES (
                'new-north-east-portfolio',
                'New North East Portfolio',
                'residential',
                'North East',
                'Residential Portfolio',
                'North East England',
                'New residential portfolio in the North East region',
                999
            )
            RETURNING *
        `;
        
        console.log('✓ Added portfolio:', portfolio[0].title);
        
        // Add portfolio images
        const imageUrls = [
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754044703/IMG_9055_oxVtei_mrr8o6.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754044704/IMG_9056_oxVtei_u0yomy.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754044705/IMG_9057_oxVtei_nvkoao.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754044729/IMG_9058_oxVtei_iqq3yz.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754044714/IMG_9059_oxVtei_klven9.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754044711/IMG_1550_oxVtei_f8d1rc.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754044713/IMG_1551_oxVtei_kmamjh.jpg'
        ];
        
        for (let i = 0; i < imageUrls.length; i++) {
            await sql`
                INSERT INTO portfolio_images (
                    portfolio_id,
                    url,
                    alt,
                    address,
                    image_order
                ) VALUES (
                    'new-north-east-portfolio',
                    ${imageUrls[i]},
                    ${`New North East Portfolio - Image ${i + 1}`},
                    'North East England',
                    ${i}
                )
            `;
        }
        
        console.log(`✓ Added ${imageUrls.length} images`);
        
        // Add portfolio details
        const details = [
            { icon: 'building-o', text: 'Residential Portfolio' },
            { icon: 'map-marker', text: 'North East England' },
            { icon: 'home', text: 'Multiple Properties' }
        ];
        
        for (let i = 0; i < details.length; i++) {
            await sql`
                INSERT INTO portfolio_details (
                    portfolio_id,
                    icon,
                    text,
                    detail_order
                ) VALUES (
                    'new-north-east-portfolio',
                    ${details[i].icon},
                    ${details[i].text},
                    ${i}
                )
            `;
        }
        
        console.log(`✓ Added ${details.length} details`);
        
        console.log('\n✓ Successfully added New North East Portfolio to the database!');
        
    } catch (error) {
        console.error('Failed to add portfolio:', error);
        process.exit(1);
    }
}

// Run
addNewNorthEastPortfolio();