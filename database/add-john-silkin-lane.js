import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function addJohnSilkinLane() {
    console.log('Adding John Silkin Lane property to database...');
    
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
                'john-silkin-lane',
                'John Silkin Lane',
                'residential',
                'Leeds',
                'Residential Development',
                'John Silkin Lane, Leeds',
                'Modern residential development in Leeds',
                999
            )
            RETURNING *
        `;
        
        console.log('✓ Added portfolio:', portfolio[0].title);
        
        // Add portfolio images
        const imageUrls = [
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040939/0_pkrmmf.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040939/1_izn5od.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040939/2_gl1esz.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040939/3_do8tqn.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040939/5_qfkjj8.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040939/6_ycxjvk.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040939/7_bvu72e.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040940/8_culbi6.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040940/9_foxid6.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040940/10_mzj0ub.jpg',
            'https://res.cloudinary.com/dmns9ystn/image/upload/v1754040940/11_zvsdki.jpg'
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
                    'john-silkin-lane',
                    ${imageUrls[i]},
                    ${`John Silkin Lane - Image ${i + 1}`},
                    'John Silkin Lane, Leeds',
                    ${i}
                )
            `;
        }
        
        console.log(`✓ Added ${imageUrls.length} images`);
        
        // Add portfolio details
        const details = [
            { icon: 'building-o', text: 'Modern Residential Development' },
            { icon: 'map-marker', text: 'John Silkin Lane, Leeds' },
            { icon: 'home', text: 'Multiple Units' }
        ];
        
        for (let i = 0; i < details.length; i++) {
            await sql`
                INSERT INTO portfolio_details (
                    portfolio_id,
                    icon,
                    text,
                    detail_order
                ) VALUES (
                    'john-silkin-lane',
                    ${details[i].icon},
                    ${details[i].text},
                    ${i}
                )
            `;
        }
        
        console.log(`✓ Added ${details.length} details`);
        
        console.log('\n✓ Successfully added John Silkin Lane property to the database!');
        
    } catch (error) {
        console.error('Failed to add property:', error);
        process.exit(1);
    }
}

// Run
addJohnSilkinLane();