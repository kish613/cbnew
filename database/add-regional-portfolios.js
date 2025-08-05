import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function addRegionalPortfolios() {
  try {
    console.log('Adding regional portfolios to database...');
    
    // Define the portfolios to add
    const portfolios = [
      {
        portfolio_id: 'london-portfolio-' + Date.now(),
        title: 'London Portfolio',
        category: 'residential',
        location: 'Greater London',
        type: 'Regional Portfolio',
        address: 'Croydon, Edmonton, Walthamstow, Romford & More',
        description: 'Strategic residential properties across Greater London including Croydon, Edmonton, Walthamstow, and Romford. Each property carefully selected for strong rental yields and capital growth potential.',
        display_order: 5,
        featured_image_order: 0,
        details: [
          { icon: 'ri-building-line', text: '10 Properties' },
          { icon: 'ri-map-pin-line', text: 'Prime Locations' },
          { icon: 'ri-line-chart-line', text: 'High Yield' }
        ],
        images: [
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg', alt: '38 Ladbrook Road, London', address: '38 Ladbrook Road, London, SE25 6QD' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/1_swez7b.jpg', alt: '3 Tranmere Road, Edmonton', address: '3 Tranmere Road, Edmonton, London, N9 9EJ' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/2_whspyj.jpg', alt: '78 Long Lane, Addiscombe', address: '78 Long Lane, Addiscombe, London, CR0 7AP' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/3_s0ye02.jpg', alt: '30 Pitchford Street', address: '30 Pitchford Street, London, E15 4RX' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/4_vdq81a.jpg', alt: '3 Ulverston Road, Walthamstow', address: '3 Ulverston Road, Walthamstow, London, E17 4BN' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/5_oayrve.jpg', alt: '677A London Road, Thornton Heath', address: '677A London Road, Thornton Heath, CR7 6AZ' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/6_rrjhnu.jpg', alt: '183 Kempton Road', address: '183 Kempton Road, London, E6 2PD' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/7_vjfynr.jpg', alt: '119 Boston Road, Croydon', address: '119 Boston Road, Croydon, CR0 3EH' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/8_fia5z5.jpg', alt: '11 Salisbury Road', address: '11 Salisbury Road, London, E4 6TA' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056355/9_pficfj.jpg', alt: '44 Retford Road, Romford', address: '44 Retford Road, Romford, RM3 9NB' }
        ]
      },
      {
        portfolio_id: 'midlands-portfolio-' + Date.now() + '1',
        title: 'Midlands Portfolio',
        category: 'residential',
        location: 'West Midlands',
        type: 'Regional Portfolio',
        address: 'Birmingham, Wednesbury, Dudley & Stoke-on-Trent',
        description: 'Carefully selected properties across the Midlands region in key urban areas. Strong rental demand from local employment centers and excellent transport links to major cities.',
        display_order: 6,
        featured_image_order: 0,
        details: [
          { icon: 'ri-home-4-line', text: 'Residential Properties' },
          { icon: 'ri-map-pin-line', text: 'Strategic Locations' },
          { icon: 'ri-community-line', text: 'Community Focus' }
        ],
        images: [
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg', alt: '98 Condover Road, Birmingham', address: '98 Condover Road, Birmingham, West Midlands, B31 3QX' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/1_ziknpn.jpg', alt: '89 Honiton Crescent, Birmingham', address: '89 Honiton Crescent, Birmingham, West Midlands, B31' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/2_lf47ji.jpg', alt: '197 Field Road, Bloxwich', address: '197 Field Road, Bloxwich, Walsall, West Midlands, WS3 3NA' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/3_hdv15s.jpg', alt: '106 Cheverton Road, Birmingham', address: '106 Cheverton Road, Birmingham, West Midlands, B31 1RT' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/4_srljfn.jpg', alt: '4 Rowland Gardens, Walsall', address: '4 Rowland Gardens, WALSALL, West Midlands, WS2 8UL' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/5_b1udmb.jpg', alt: '25 Lower Valley Road, Brierley Hill', address: '25 Lower Valley Road, Brierley Hill, West Midlands, DY5 3NP' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/6_o6zvhg.jpg', alt: '70 Rutherford Road, Walsall', address: '70 Rutherford Road, Beechdale, Walsall, West Midlands, WS2 7JQ' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056404/7_tweooh.jpg', alt: '210 Jiggins Lane, Birmingham', address: '210 Jiggins Lane, Birmingham, West Midlands, B32 3ER' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/8_k79nsu.jpg', alt: '16 Tipton Road, Dudley', address: '16 Tipton Road, DUDLEY, West Midlands, DY1 4SH' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/9_cbc41k.jpg', alt: '11 Wills Avenue, West Bromwich', address: '11 Wills Avenue, West Bromwich, West Midlands, B71 2QS' }
        ]
      },
      {
        portfolio_id: 'north-west-portfolio-' + Date.now() + '2',
        title: 'North West Portfolio',
        category: 'residential',
        location: 'North West England',
        type: 'Regional Portfolio',
        address: 'Manchester, Blackpool, Leeds, Bradford & Liverpool',
        description: 'Strong performing residential properties across major North West cities. Benefiting from urban regeneration schemes and growing rental markets in key employment hubs.',
        display_order: 7,
        featured_image_order: 0,
        details: [
          { icon: 'ri-building-line', text: 'Urban Properties' },
          { icon: 'ri-map-pin-line', text: 'Major Cities' },
          { icon: 'ri-line-chart-line', text: 'Growth Markets' }
        ],
        images: [
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg', alt: '48 Worsley Road North, Manchester', address: '48 Worsley Road North, Manchester, M28 3GW' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg', alt: '5 Bela Grove, Blackpool', address: '5 Bela Grove, Blackpool, FY1 5JZ' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/16_sissons_sJHUDn_as8ryp.jpg', alt: '16 Sissons Crescent, Leeds', address: '16 Sissons Crescent, Leeds, LS10 4LN' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972565/12_bright_sJHUDn_hqp51y.jpg', alt: '12 Bright Street, Bradford', address: '12 Bright Street, Bradford, BD15 7QT' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056356/Liverpool-Property-_1_.jpg', alt: '81 Grane Road, Liverpool', address: '81 Grane Road, Liverpool, BB4 4LR' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/DJI_20220721_160904_038_lvb2kk.jpg', alt: 'North West Properties - Aerial View', address: 'North West Properties - Regional Overview' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753869661/IMG_2934_w4r7nn.jpg', alt: 'North West Properties - Street View', address: 'North West Properties - Urban Development' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220810_133732_Original_2_lr7xen.jpg', alt: 'North West Properties - Property View', address: 'North West Properties - Investment Opportunity' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056407/10_vusklp.jpg', alt: 'North West Properties - Manchester Area', address: 'North West Properties - Manchester Region' },
          { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056408/11_iwhdlp.jpg', alt: 'North West Properties - Liverpool Area', address: 'North West Properties - Liverpool Region' }
        ]
      }
    ];

    // Insert each portfolio
    for (const portfolio of portfolios) {
      console.log(`\nAdding ${portfolio.title}...`);
      
      // Insert portfolio
      await sql`
        INSERT INTO portfolios (
          portfolio_id, title, category, location, type, address, 
          description, display_order, featured_image_order
        )
        VALUES (
          ${portfolio.portfolio_id}, ${portfolio.title}, ${portfolio.category}, 
          ${portfolio.location}, ${portfolio.type}, ${portfolio.address}, 
          ${portfolio.description}, ${portfolio.display_order}, ${portfolio.featured_image_order}
        )
      `;
      
      // Insert details
      for (let i = 0; i < portfolio.details.length; i++) {
        const detail = portfolio.details[i];
        await sql`
          INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order)
          VALUES (${portfolio.portfolio_id}, ${detail.icon}, ${detail.text}, ${i})
        `;
      }
      
      // Insert images
      for (let i = 0; i < portfolio.images.length; i++) {
        const image = portfolio.images[i];
        await sql`
          INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
          VALUES (${portfolio.portfolio_id}, ${image.url}, ${image.alt}, ${image.address || null}, ${i})
        `;
      }
      
      console.log(`✓ Successfully added ${portfolio.title} with ${portfolio.images.length} images`);
    }
    
    console.log('\n✅ All regional portfolios added successfully!');
    
  } catch (error) {
    console.error('Error adding regional portfolios:', error);
    throw error;
  }
}

// Run the migration
addRegionalPortfolios()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });