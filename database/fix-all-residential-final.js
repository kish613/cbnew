// FINAL fix for ALL residential portfolio images - using exact URLs from HTML
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function fixAllResidentialFinal() {
    console.log('FINAL FIX: Updating ALL residential portfolio images with exact HTML content...\n');
    
    // First, remove any duplicate portfolios
    console.log('Removing duplicate portfolios...');
    const duplicates = await sql`
        DELETE FROM portfolios 
        WHERE id IN (
            SELECT id FROM (
                SELECT id, 
                       ROW_NUMBER() OVER (PARTITION BY title ORDER BY id) as rn
                FROM portfolios
                WHERE category = 'residential'
            ) t
            WHERE t.rn > 1
        )
    `;
    
    const portfolios = [
        {
            title: "Spire Portfolio",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png", alt: "Spire Portfolio - Chesterfield and Mansfield Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421153/spire_4_rksn9r.png", alt: "Spire Portfolio - Chesterfield and Mansfield Properties" }
            ]
        },
        {
            title: "Cobbler/Northampton Portfolio",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.16.26_qwtdl9.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421149/Screenshot_2025-06-06_at_18.10.19_vwowlh.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" }
            ]
        },
        {
            title: "Newlands Croft",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg", alt: "Newlands Croft - Bromley London Development" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954162/10_wkcxlm.jpg", alt: "Newlands Croft - Bromley London" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954161/9_cotwuf.jpg", alt: "Newlands Croft - Development View" },
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
            title: "London Portfolio",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869655/20220831_164644_rsfmck.jpg", alt: "London Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869650/20220907_121505_m6corj.jpg", alt: "London Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/dji_mimo_20220913_124418_16_1663597550044_photo_jmswwh.jpg", alt: "London Portfolio - Residential Properties" }
            ]
        },
        {
            title: "Midlands Portfolio",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869654/20220831_124356_sqnqj2.jpg", alt: "Midlands Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869653/20220830_154535_aywhp5.jpg", alt: "Midlands Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869651/20221007_135159_ljgp7y.jpg", alt: "Midlands Portfolio - Residential Properties" }
            ]
        },
        {
            title: "North West Portfolio",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/DJI_20220721_160904_038_lvb2kk.jpg", alt: "North West Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869661/IMG_2934_w4r7nn.jpg", alt: "North West Portfolio - Residential Properties" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220810_133732_Original_2_lr7xen.jpg", alt: "North West Portfolio - Residential Properties" }
            ]
        },
        {
            title: "Properties Bought Individually",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972554/110_hillaries_sJHUDn_anrvh2.jpg", alt: "110 Hillaries Road, Birmingham", address: "110 Hillaries Road, Birmingham, B23 7QT" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972564/16_berryfield_2_sJHUDn_ii39ya.jpg", alt: "16 Berryfield Park, Melksham", address: "16 Berryfield Park, Melksham, SN12 6ED" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972553/1_booth_sJHUDn_jlke5x.jpg", alt: "1 Booth Road, Wednesbury", address: "1 Booth Road, Wednesbury, WS10 0EN" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972572/6_welland_sJHUDn_qebjhf.jpg", alt: "6 Welland Court, Kettering", address: "6 Welland Court, Kettering, NN15 5ST" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972566/68_stourbridge_sJHUDn_qvef0w.jpg", alt: "68 Stourbridge Road, Dudley", address: "68 Stourbridge Road, Dudley, DY1 2DF" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg", alt: "48 Worsley Road North, Manchester", address: "48 Worsley Road North, Manchester, M28 3GW" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg", alt: "5 Bela Grove, Blackpool", address: "5 Bela Grove, Blackpool, FY1 5JZ" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/16_sissons_sJHUDn_as8ryp.jpg", alt: "16 Sissons Crescent, Leeds", address: "16 Sissons Crescent, Leeds, LS10 4LN" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972565/12_bright_sJHUDn_hqp51y.jpg", alt: "12 Bright Street, Bradford", address: "12 Bright Street, Bradford, BD15 7QT" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972568/15_harvey_sJHUDn_cf6z5f.jpg", alt: "15 Harvey Court, Chesterfield", address: "15 Harvey Court, Chesterfield, S44 6SJ" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972569/8_essex_sJHUDn_fbqhrz.jpg", alt: "8 Essex Drive, Stoke-on-Trent", address: "8 Essex Drive, Stoke-on-Trent, ST7 1HE" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972575/8_keens_rd_sJHUDn_rbil7y.jpg", alt: "8 Keens Road, Croydon", address: "8 Keens Road, Croydon, CR0 1AH" }
            ]
        }
    ];
    
    try {
        let totalImagesUpdated = 0;
        
        for (const portfolio of portfolios) {
            console.log(`\nUpdating ${portfolio.title}...`);
            
            // Get portfolio ID
            const result = await sql`
                SELECT portfolio_id FROM portfolios 
                WHERE title = ${portfolio.title} 
                AND category = 'residential'
            `;
            
            if (result.length === 0) {
                console.log(`  ⚠️  Portfolio not found: ${portfolio.title}`);
                continue;
            }
            
            const portfolioId = result[0].portfolio_id;
            
            // Delete ALL existing images for this portfolio
            await sql`DELETE FROM portfolio_images WHERE portfolio_id = ${portfolioId}`;
            console.log(`  - Deleted existing images`);
            
            // Insert ALL new images in correct order
            for (let i = 0; i < portfolio.images.length; i++) {
                const img = portfolio.images[i];
                await sql`
                    INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
                    VALUES (${portfolioId}, ${img.url}, ${img.alt}, ${img.address || null}, ${i})
                `;
            }
            
            console.log(`  ✓ Added ${portfolio.images.length} images`);
            totalImagesUpdated += portfolio.images.length;
        }
        
        console.log(`\n✅ FINAL FIX COMPLETE!`);
        console.log(`Total residential images updated: ${totalImagesUpdated}`);
        console.log(`\nResidential portfolio image counts:`);
        console.log(`- Spire Portfolio: 2 images`);
        console.log(`- Cobbler/Northampton Portfolio: 3 images`);
        console.log(`- Newlands Croft: 10 images`);
        console.log(`- London Portfolio: 3 images`);
        console.log(`- Midlands Portfolio: 3 images`);
        console.log(`- North West Portfolio: 3 images`);
        console.log(`- Properties Bought Individually: 12 images`);
        
    } catch (error) {
        console.error('Failed to update residential images:', error);
        process.exit(1);
    }
}

// Run the final fix
fixAllResidentialFinal();