// Migration script to import all existing portfolio data into Neon
// Run this locally with: node database/migrate-all-portfolios.js

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// All portfolio data extracted from the HTML files
const allPortfolios = {
    residential: [
        {
            id: generateId(),
            title: "Spire Portfolio",
            category: "residential",
            location: "Chesterfield & Mansfield, East Midlands",
            type: "68 Three-Bedroom Houses",
            address: "",
            description: "68 three-bedroom houses located across Chesterfield and Mansfield in the East Midlands. A significant residential portfolio offering diverse investment opportunities in a thriving regional market.",
            details: [
                { icon: "ri-building-line", text: "68 Houses" },
                { icon: "ri-map-pin-line", text: "East Midlands" },
                { icon: "ri-home-4-line", text: "Three-Bedroom Properties" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png", alt: "Spire Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_7_qklezh.png", alt: "Spire Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421154/spire_6_uxeqei.png", alt: "Spire Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421154/spire_5_slwi1r.png", alt: "Spire Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421153/spire_4_rksn9r.png", alt: "Spire Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421153/spire_3_pnuxkb.png", alt: "Spire Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/spire_2_xqypn7.png", alt: "Spire Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/spire_1_lldgla.png", alt: "Spire Portfolio Property" }
            ]
        },
        {
            id: generateId(),
            title: "Cobbler/Northampton Portfolio",
            category: "residential",
            location: "Northampton",
            type: "16 Terraced Houses",
            address: "Baker Street, Freehold Street, St Paul's Road",
            description: "16 fully refurbished terraced houses across Northampton. High-quality residential properties in prime locations, offering excellent rental yields and long-term capital growth potential.",
            details: [
                { icon: "ri-building-line", text: "16 Houses" },
                { icon: "ri-map-pin-line", text: "Central Northampton" },
                { icon: "ri-shield-check-line", text: "Fully Refurbished" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png", alt: "Cobbler Portfolio - Baker Street" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.16.26_qwtdl9.png", alt: "Cobbler Portfolio - Freehold Street" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421151/Screenshot_2025-06-06_at_18.14.23_icscjx.png", alt: "Cobbler Portfolio - St Paul's Road" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421151/Screenshot_2025-06-06_at_18.13.50_jdakvf.png", alt: "Cobbler Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421150/Screenshot_2025-06-06_at_18.12.27_xbxakn.png", alt: "Cobbler Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421149/Screenshot_2025-06-06_at_18.11.45_zlrmqf.png", alt: "Cobbler Portfolio Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421149/Screenshot_2025-06-06_at_18.10.19_vwowlh.png", alt: "Cobbler Portfolio Property" }
            ]
        },
        {
            id: generateId(),
            title: "Newlands Croft",
            category: "residential",
            location: "Bromley, London",
            type: "Block Management",
            address: "Lennard Rd, London, SE20 7LW",
            description: "Originally built in the 1940s as 16 flats, redeveloped into 12 spacious flats in Bromley, London. Purchased with vacant possession and now fully managed in-house by Fast Homes Investments.",
            details: [
                { icon: "ri-building-line", text: "12 Flats" },
                { icon: "ri-map-pin-line", text: "London SE20" },
                { icon: "ri-settings-line", text: "In-House Management" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954164/9_hy5dps.jpg", alt: "Newlands Croft - Main Building" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954160/8_xguh79.jpg", alt: "Newlands Croft - Property View" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954157/5_eokekc.jpg", alt: "Newlands Croft - Building Exterior" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954156/4_zxhnan.jpg", alt: "Newlands Croft - Residential Complex" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954155/3_wd1vmi.jpg", alt: "Newlands Croft - Building View" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954153/2_l3x89g.jpg", alt: "Newlands Croft - Property Development" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954153/1_ozefup.jpg", alt: "Newlands Croft - Flats Complex" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954153/0_ro4x2j.jpg", alt: "Newlands Croft - Bromley Development" }
            ]
        },
        {
            id: generateId(),
            title: "London Portfolio",
            category: "residential",
            location: "London",
            type: "Hundreds of Properties",
            address: "Various Locations, London",
            description: "Over the years, we've acquired hundreds of residential properties in London and we actively source to gain a strategic holding in the area. Our acquisitions number in the hundreds and we buy property in any condition.",
            details: [
                { icon: "ri-home-line", text: "Hundreds of Properties" },
                { icon: "ri-map-pin-line", text: "London Wide" },
                { icon: "ri-check-line", text: "Any Condition" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869655/20220831_164644_rsfmck.jpg", alt: "London Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869650/20220907_121505_m6corj.jpg", alt: "London Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/dji_mimo_20220913_124418_16_1663597550044_photo_jmswwh.jpg", alt: "London Portfolio - Residential Properties" }
            ]
        },
        {
            id: generateId(),
            title: "Midlands Portfolio",
            category: "residential",
            location: "Midlands",
            type: "Strategic Acquisitions",
            address: "Various Locations, Midlands",
            description: "Over the years, we have built a significant and diverse portfolio of residential properties across the Midlands, with a focus on strategic acquisition and long-term value creation. Our approach is underpinned by in-depth market knowledge and a commitment to identifying high-potential opportunities in both established and emerging locations.<br><br>We are actively expanding our footprint in the region, acquiring properties in all conditions—ranging from turnkey homes to those requiring full refurbishment. Our acquisition volume is in the hundreds, and we continue to grow through a combination of direct purchases, off-market transactions, and long-standing relationships with agents and vendors.<br><br>By maintaining a flexible and responsive acquisition strategy, we are able to adapt quickly to market dynamics and secure assets that align with our investment objectives and broader regional vision.",
            details: [
                { icon: "ri-home-line", text: "Hundreds of Properties" },
                { icon: "ri-map-pin-line", text: "Midlands Region" },
                { icon: "ri-trending-up-line", text: "Strategic Growth" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869654/20220831_124356_sqnqj2.jpg", alt: "Midlands Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869653/20220830_154535_aywhp5.jpg", alt: "Midlands Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869651/20221007_135159_ljgp7y.jpg", alt: "Midlands Portfolio - Residential Properties" }
            ]
        },
        {
            id: generateId(),
            title: "North West Portfolio",
            category: "residential",
            location: "North West",
            type: "Regional Growth",
            address: "Various Locations, North West",
            description: "Strategic expansion across the North West region with a focus on emerging growth areas and regeneration zones. Our portfolio includes residential properties in key cities and towns, positioned to benefit from infrastructure improvements and economic development initiatives.",
            details: [
                { icon: "ri-home-line", text: "Expanding Portfolio" },
                { icon: "ri-map-pin-line", text: "North West Region" },
                { icon: "ri-line-chart-line", text: "Growth Focus" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/DJI_20220721_160904_038_lvb2kk.jpg", alt: "North West Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869661/IMG_2934_w4r7nn.jpg", alt: "North West Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220810_133732_Original_2_lr7xen.jpg", alt: "North West Portfolio - Residential Properties" }
            ]
        },
        {
            id: generateId(),
            title: "Properties Bought Individually",
            category: "residential",
            location: "Various Locations",
            type: "Individual Acquisitions",
            address: "Birmingham, Melksham, Wednesbury, Kettering, Dudley, Manchester, Blackpool, Leeds, Bradford, Chesterfield, Stoke-on-Trent, Croydon",
            description: "Strategic individual property acquisitions across key UK markets. Each property is carefully selected based on location, potential yield, and long-term capital growth prospects. Our diverse geographical spread minimizes risk while maximizing opportunities across different regional markets.",
            details: [
                { icon: "ri-building-line", text: "Multiple Properties" },
                { icon: "ri-map-pin-line", text: "UK Wide" },
                { icon: "ri-check-double-line", text: "Hand-Picked Assets" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869656/20240809_161544_vvzazl.jpg", alt: "Birmingham - Individual Property", address: "Birmingham" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869661/IMG_5049_Original_2_yymikk.jpg", alt: "Melksham - Individual Property", address: "Melksham" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869661/IMG_6037_yvgjlj.jpg", alt: "Wednesbury - Individual Property", address: "Wednesbury" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869662/IMG_6223_rcqnvp.jpg", alt: "Kettering - Individual Property", address: "Kettering" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869660/IMG_4876_Original_2_oylwvq.jpg", alt: "Dudley - Individual Property", address: "Dudley" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954248/IMG_4799_kvagxr.jpg", alt: "Manchester - Individual Property", address: "Manchester" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869657/20240611_124454_wc6rwq.jpg", alt: "Blackpool - Individual Property", address: "Blackpool" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869660/IMG_1780_Original_2_yzmzud.jpg", alt: "Leeds - Individual Property", address: "Leeds" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869650/20220926_134208_zj6ewy.jpg", alt: "Bradford - Individual Property", address: "Bradford" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869659/IMG_0752_txvprb.jpg", alt: "Chesterfield - Individual Property", address: "Chesterfield" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869659/IMG_1222_Original_2_vzymu3.jpg", alt: "Stoke-on-Trent - Individual Property", address: "Stoke-on-Trent" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869662/IMG_8072_llvlqo.jpg", alt: "Croydon - Individual Property", address: "Croydon" }
            ]
        }
    ],
    commercial: [
        {
            id: generateId(),
            title: "Accrington Parade",
            category: "commercial",
            location: "Lancashire",
            type: "Retail Parade",
            address: "40-48 Broadway, Accrington, Lancashire, BB5 1EW",
            description: "A prime retail parade in the heart of Accrington. Features multiple retail units with excellent footfall and established tenants. Strategic location with strong rental yields and potential for value enhancement through active management.",
            details: [
                { icon: "ri-store-line", text: "Retail Units" },
                { icon: "ri-map-pin-line", text: "Town Centre" },
                { icon: "ri-percent-line", text: "Strong Yields" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721224/20220908_132850_u9m7zs.jpg", alt: "Accrington Parade - Retail Units" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220908_132732_Original_2_zycdnh.jpg", alt: "Accrington Parade - Street View" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753722228/20220908_131859_qgqkaw.jpg", alt: "Accrington Parade - Broadway Location" }
            ]
        },
        {
            id: generateId(),
            title: "Brown Portfolio",
            category: "commercial",
            location: "South East England",
            type: "Mixed-Use Collection",
            address: "Various South East Locations",
            description: "A diversified portfolio of commercial properties across the South East, including retail units, office spaces, and mixed-use developments. Each property strategically located in high-growth areas with strong tenant profiles and income stability.",
            details: [
                { icon: "ri-building-2-line", text: "Mixed-Use Properties" },
                { icon: "ri-map-pin-line", text: "South East Region" },
                { icon: "ri-bar-chart-line", text: "Income Producing" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869655/20220926_112228_kfsqgj.jpg", alt: "Brown Portfolio - Commercial Property" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869654/20220902_111652_qhucsg.jpg", alt: "Brown Portfolio - Retail Unit" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869653/20220830_155638_qtlzxh.jpg", alt: "Brown Portfolio - Office Space" }
            ]
        },
        {
            id: generateId(),
            title: "Tower Bridge Quarter",
            category: "commercial",
            location: "London South Bank",
            type: "Mixed-Use Development",
            address: "London's South Bank",
            description: "Premium mixed-use development in one of London's most prestigious locations. Combines retail, office, and leisure spaces with exceptional views and transport links. A flagship commercial asset with significant rental income and capital appreciation potential.",
            details: [
                { icon: "ri-building-3-line", text: "Mixed-Use Development" },
                { icon: "ri-map-pin-line", text: "South Bank" },
                { icon: "ri-vip-crown-line", text: "Premium Location" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869656/20221003_162336_prkjvg.jpg", alt: "Tower Bridge Quarter - Development View" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869652/20220810_150942_k0o9tl.jpg", alt: "Tower Bridge Quarter - Street Level" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869656/20220906_115227_clyjvu.jpg", alt: "Tower Bridge Quarter - Building Facade" }
            ]
        },
        {
            id: generateId(),
            title: "Cheltenham Parade",
            category: "commercial",
            location: "Cheltenham",
            type: "Retail & Office",
            address: "Central Cheltenham",
            description: "Prime commercial property in the heart of Cheltenham's bustling town center. Features ground floor retail units with office spaces above. Benefits from excellent footfall in this affluent spa town and strong covenant tenants.",
            details: [
                { icon: "ri-store-2-line", text: "Retail & Office" },
                { icon: "ri-map-pin-line", text: "Town Centre" },
                { icon: "ri-group-line", text: "High Footfall" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220715_111723_2_bmk4pq.jpg", alt: "Cheltenham Parade - Street View" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721218/20220715_110703_Original_2_snjrww.jpg", alt: "Cheltenham Parade - Retail Units" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869659/IMG_0799_oo2okf.jpg", alt: "Cheltenham Parade - Building Exterior" }
            ]
        },
        {
            id: generateId(),
            title: "Eastbourne Parade",
            category: "commercial",
            location: "Eastbourne",
            type: "Multi-Level Retail",
            address: "Eastbourne",
            description: "Multi-level retail complex in Eastbourne town center. Features a variety of retail units across multiple floors with modern facilities and excellent visibility. Strong tourist footfall supplements local trade, ensuring consistent income streams.",
            details: [
                { icon: "ri-building-4-line", text: "Multi-Level Complex" },
                { icon: "ri-map-pin-line", text: "Eastbourne Centre" },
                { icon: "ri-sun-line", text: "Tourist Location" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869651/20220819_111737_Original_2_uhbf8f.jpg", alt: "Eastbourne Parade - Main Entrance" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869652/20220819_111918_uekxpe.jpg", alt: "Eastbourne Parade - Retail Level" }
            ]
        },
        {
            id: generateId(),
            title: "Southport Parade",
            category: "commercial",
            location: "Southport",
            type: "Grade II Listed",
            address: "Lord Street near Nevill Street, Southport",
            description: "Prestigious Grade II listed commercial property on Southport's famous Lord Street. This historic parade combines architectural heritage with modern retail requirements. Features period details while offering contemporary retail spaces with strong rental income.",
            details: [
                { icon: "ri-government-line", text: "Grade II Listed" },
                { icon: "ri-map-pin-line", text: "Lord Street" },
                { icon: "ri-star-line", text: "Heritage Property" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721231/20220901_142606_aay1bi.jpg", alt: "Southport Parade - Historic Facade" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721230/20220901_142532_egmcmd.jpg", alt: "Southport Parade - Lord Street View" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721229/20220901_142409_Original_2_wcw7t8.jpg", alt: "Southport Parade - Architectural Detail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869663/IMG_E2636_Original_2_rqv8uu.jpg", alt: "Southport Parade - Street Level" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869663/IMG_E2659_zzn8to.jpg", alt: "Southport Parade - Building Entrance" }
            ]
        },
        {
            id: generateId(),
            title: "Barry Retail Parade",
            category: "commercial",
            location: "Barry, South Glamorgan",
            type: "Prime Retail Parade",
            address: "117-151 Holton Road, Barry, CF63 4HP",
            description: "Extensive retail parade on Barry's main shopping street. Multiple retail units with diverse tenant mix including national chains and local businesses. Strong footfall from local population and proximity to Barry Island tourist destination. Significant asset with stable income and enhancement opportunities.",
            details: [
                { icon: "ri-store-3-line", text: "Multiple Units" },
                { icon: "ri-map-pin-line", text: "Holton Road" },
                { icon: "ri-money-pound-circle-line", text: "Income Producing" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721228/20220824_113531_Original_2_rwfatr.jpg", alt: "Barry Retail Parade - Holton Road View" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721226/20220824_113121_Original_2_jvkrax.jpg", alt: "Barry Retail Parade - Retail Units" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721225/20220824_112842_oyktkj.jpg", alt: "Barry Retail Parade - Street Frontage" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220824_113213_Original_2_qfhavr.jpg", alt: "Barry Retail Parade - Corner Unit" }
            ]
        },
        {
            id: generateId(),
            title: "Nottingham Tesco",
            category: "commercial",
            location: "Nottingham City Centre",
            type: "Supermarket Investment",
            address: "19-25 Upper Parliament Street, Nottingham NG1 2AP",
            description: "Prime city center Tesco Express investment with long-term lease to a blue-chip covenant. Located on Upper Parliament Street in the heart of Nottingham's retail core. Secure income stream from one of the UK's leading retailers with regular rent reviews.",
            details: [
                { icon: "ri-shopping-cart-line", text: "Tesco Express" },
                { icon: "ri-map-pin-line", text: "City Centre" },
                { icon: "ri-shield-check-line", text: "Blue-Chip Tenant" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721233/20220909_134534_Original_2_smtdng.jpg", alt: "Nottingham Tesco - Store Front" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721234/20220909_134616_Original_2_xnx1f7.jpg", alt: "Nottingham Tesco - Upper Parliament Street" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721233/20220909_134423_Original_2_c1s9my.jpg", alt: "Nottingham Tesco - Building View" }
            ]
        },
        {
            id: generateId(),
            title: "Long Row Nottingham",
            category: "commercial",
            location: "Nottingham City Centre",
            type: "Freehold Retail",
            address: "4/5 Long Row, Nottingham",
            description: "Prestigious freehold retail property on Nottingham's historic Long Row. Prime location in the pedestrianized shopping heart of the city. Features multiple retail units with excellent visibility and footfall from the main shopping thoroughfare.",
            details: [
                { icon: "ri-building-line", text: "Freehold Property" },
                { icon: "ri-map-pin-line", text: "Long Row" },
                { icon: "ri-walk-line", text: "Pedestrianized Zone" }
            ],
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721220/20220909_134032_Original_2_f5bmbh.jpg", alt: "Long Row Nottingham - Building Facade" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220909_134102_ujigur.jpg", alt: "Long Row Nottingham - Street View" }
            ]
        }
    ]
};

async function migrateData() {
    console.log('Starting migration...');
    
    try {
        // Clear existing data (optional - comment out if tables don't exist)
        // console.log('Clearing existing data...');
        // await sql`DELETE FROM portfolio_images`;
        // await sql`DELETE FROM portfolio_details`;
        // await sql`DELETE FROM portfolios`;
        
        // Insert portfolios
        for (const category of ['residential', 'commercial']) {
            const portfolios = allPortfolios[category];
            console.log(`\nMigrating ${portfolios.length} ${category} portfolios...`);
            
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
        
        console.log('\nMigration completed successfully!');
        console.log(`Total portfolios migrated: ${allPortfolios.residential.length + allPortfolios.commercial.length}`);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateData();