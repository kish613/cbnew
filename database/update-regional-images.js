import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateRegionalImages() {
    console.log('Updating Midlands and North West portfolios with all 10 images...\n');
    
    try {
        // Update Midlands Portfolio Images
        console.log('Updating Midlands Portfolio...');
        
        // First delete existing images
        await sql`DELETE FROM portfolio_images WHERE portfolio_id = 'midlands-portfolio-2025'`;
        
        // Add all 10 images
        const midlandsImages = [
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
        ];
        
        for (let i = 0; i < midlandsImages.length; i++) {
            const img = midlandsImages[i];
            await sql`
                INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
                VALUES ('midlands-portfolio-2025', ${img.url}, ${img.alt}, ${img.address}, ${i})
            `;
        }
        console.log(`Added ${midlandsImages.length} images to Midlands Portfolio`);
        
        // Update North West Portfolio Images
        console.log('\nUpdating North West Portfolio...');
        
        // First delete existing images
        await sql`DELETE FROM portfolio_images WHERE portfolio_id = 'north-west-portfolio-2025'`;
        
        // Add all 10 images
        const northwestImages = [
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
        ];
        
        for (let i = 0; i < northwestImages.length; i++) {
            const img = northwestImages[i];
            await sql`
                INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
                VALUES ('north-west-portfolio-2025', ${img.url}, ${img.alt}, ${img.address}, ${i})
            `;
        }
        console.log(`Added ${northwestImages.length} images to North West Portfolio`);
        
        console.log('\nDone! Both portfolios now have 10 images each.');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

updateRegionalImages();