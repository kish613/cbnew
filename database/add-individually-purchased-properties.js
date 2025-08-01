import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function addIndividuallyPurchasedProperties() {
    console.log('Creating new Individually Purchased Properties portfolio...');
    
    try {
        // First, create the new portfolio entry
        const portfolioId = 'individually-purchased-' + Date.now();
        
        await sql`
            INSERT INTO portfolios (
                portfolio_id,
                title,
                category,
                location,
                type,
                description,
                display_order
            ) VALUES (
                ${portfolioId},
                'Individually Purchased Properties',
                'residential',
                'London, West Midlands & North West',
                'Strategic Individual Acquisitions',
                'A carefully curated portfolio of individual property acquisitions across three key regions. Our collection features strategic residential properties in London, West Midlands, and North West England. Each property has been selected for its rental yield potential and long-term capital appreciation prospects.',
                35
            )
        `;
        
        console.log(`✓ Created portfolio with ID: ${portfolioId}`);
        
        // Add portfolio details
        const details = [
            { icon: 'ri-building-line', text: '3 Regional Collections', order: 0 },
            { icon: 'ri-map-pin-line', text: '20+ Properties', order: 1 },
            { icon: 'ri-home-4-line', text: 'Individual Acquisitions', order: 2 }
        ];
        
        for (const detail of details) {
            await sql`
                INSERT INTO portfolio_details (
                    portfolio_id,
                    icon,
                    text,
                    detail_order
                ) VALUES (
                    ${portfolioId},
                    ${detail.icon},
                    ${detail.text},
                    ${detail.order}
                )
            `;
        }
        
        console.log('✓ Added portfolio details');
        
        // London properties
        const londonProperties = [
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg',
                alt: '38 Ladbrook Road, London',
                address: '38 Ladbrook Road, London, SE25 6QD'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/1_swez7b.jpg',
                alt: '3 Tranmere Road, Edmonton',
                address: '3 Tranmere Road, Edmonton, London, N9 9EJ'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/2_whspyj.jpg',
                alt: '78 Long Lane, Addiscombe',
                address: '78 Long Lane, Addiscombe, London, CR0 7AP'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/3_s0ye02.jpg',
                alt: '30 Pitchford Street',
                address: '30 Pitchford Street, London, E15 4RX'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/4_vdq81a.jpg',
                alt: '3 Ulverston Road, Walthamstow',
                address: '3 Ulverston Road, Walthamstow, London, E17 4BN'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/5_oayrve.jpg',
                alt: '677A London Road, Thornton Heath',
                address: '677A London Road, Thornton Heath, CR7 6AZ'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/6_rrjhnu.jpg',
                alt: '183 Kempton Road',
                address: '183 Kempton Road, London, E6 2PD'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/7_vjfynr.jpg',
                alt: '119 Boston Road, Croydon',
                address: '119 Boston Road, Croydon, CR0 3EH'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/8_fia5z5.jpg',
                alt: '11 Salisbury Road',
                address: '11 Salisbury Road, London, E4 6TA'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056355/9_pficfj.jpg',
                alt: '44 Retford Road, Romford',
                address: '44 Retford Road, Romford, RM3 9NB'
            }
        ];
        
        // West Midlands properties
        const westMidlandsProperties = [
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg',
                alt: '98 Condover Road, Birmingham',
                address: '98 Condover Road, Birmingham, West Midlands, B31 3QX'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/1_ziknpn.jpg',
                alt: '89 Honiton Crescent, Birmingham',
                address: '89 Honiton Crescent, Birmingham, West Midlands, B31'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/2_lf47ji.jpg',
                alt: '197 Field Road, Bloxwich',
                address: '197 Field Road, Bloxwich, Walsall, West Midlands, WS3 3NA'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/3_hdv15s.jpg',
                alt: '106 Cheverton Road, Birmingham',
                address: '106 Cheverton Road, Birmingham, West Midlands, B31 1RT'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/4_srljfn.jpg',
                alt: '4 Rowland Gardens, Walsall',
                address: '4 Rowland Gardens, WALSALL, West Midlands, WS2 8UL'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/5_b1udmb.jpg',
                alt: '25 Lower Valley Road, Brierley Hill',
                address: '25 Lower Valley Road, Brierley Hill, West Midlands, DY5 3NP'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/6_o6zvhg.jpg',
                alt: '70 Rutherford Road, Walsall',
                address: '70 Rutherford Road, Beechdale, Walsall, West Midlands, WS2 7JQ'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056404/7_tweooh.jpg',
                alt: '210 Jiggins Lane, Birmingham',
                address: '210 Jiggins Lane, Birmingham, West Midlands, B32 3ER'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/8_k79nsu.jpg',
                alt: '16 Tipton Road, Dudley',
                address: '16 Tipton Road, DUDLEY, West Midlands, DY1 4SH'
            },
            {
                url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/9_cbc41k.jpg',
                alt: '11 Wills Avenue, West Bromwich',
                address: '11 Wills Avenue, West Bromwich, West Midlands, B71 2QS'
            }
        ];
        
        // Add all properties with proper ordering
        let imageOrder = 0;
        
        console.log('\nAdding London properties...');
        for (const property of londonProperties) {
            await sql`
                INSERT INTO portfolio_images (
                    portfolio_id,
                    url,
                    alt,
                    address,
                    image_order
                ) VALUES (
                    ${portfolioId},
                    ${property.url},
                    ${property.alt},
                    ${property.address},
                    ${imageOrder++}
                )
            `;
            console.log(`✓ Added: ${property.address}`);
        }
        
        console.log('\nAdding West Midlands properties...');
        for (const property of westMidlandsProperties) {
            await sql`
                INSERT INTO portfolio_images (
                    portfolio_id,
                    url,
                    alt,
                    address,
                    image_order
                ) VALUES (
                    ${portfolioId},
                    ${property.url},
                    ${property.alt},
                    ${property.address},
                    ${imageOrder++}
                )
            `;
            console.log(`✓ Added: ${property.address}`);
        }
        
        // Add placeholder for North West
        console.log('\nAdding North West placeholder...');
        await sql`
            INSERT INTO portfolio_images (
                portfolio_id,
                url,
                alt,
                address,
                image_order
            ) VALUES (
                ${portfolioId},
                'https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/DJI_20220721_160904_038_lvb2kk.jpg',
                'North West Properties Coming Soon',
                'North West Properties Coming Soon',
                ${imageOrder++}
            )
        `;
        
        console.log(`\n✓ Successfully created Individually Purchased Properties portfolio!`);
        console.log(`Portfolio ID: ${portfolioId}`);
        console.log(`Total properties added: ${imageOrder}`);
        console.log(`  - London: ${londonProperties.length}`);
        console.log(`  - West Midlands: ${westMidlandsProperties.length}`);
        console.log(`  - North West: 1 (placeholder)`);
        
    } catch (error) {
        console.error('Failed to create portfolio:', error);
        process.exit(1);
    }
}

// Run
addIndividuallyPurchasedProperties();