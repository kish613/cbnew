// FINAL fix for ALL commercial portfolio images - using exact URLs from HTML
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function fixAllCommercialFinal() {
    console.log('FINAL FIX: Updating ALL commercial portfolio images with exact HTML content...\n');
    
    const portfolios = [
        {
            title: "Accrington Parade",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1749656100/3_ygcsf2.jpg", alt: "Accrington Parade - Lancashire Retail Development" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1749656103/BB5_2_t0etxz.jpg", alt: "Accrington Parade - Lancashire Retail Development" }
            ]
        },
        {
            title: "Brown Portfolio",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1749656104/BB5_3_mjod1a.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421133/Screenshot_2025-06-06_at_17.39.12_pcslj5.png", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421132/Screenshot_2025-06-06_at_17.38.48_ucrkci.png", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421156/Screenshot_2025-06-06_at_17.40.30_ysv5st.png", alt: "Brown Portfolio - Mixed Use Collection" }
            ]
        },
        {
            title: "Tower Bridge Quarter",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890666/portfolio_by_abby__image34_k1njkg.png", alt: "Tower Bridge Quarter - London South Bank Development" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890666/portfolio_by_abby__image4_sba74a.png", alt: "Tower Bridge Quarter - London South Bank Development" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890665/portfolio_by_abby__image12_ncrky6.png", alt: "Tower Bridge Quarter - London South Bank Development" }
            ]
        },
        {
            title: "Cheltenham Parade",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image36_qx5h2n.png", alt: "Cheltenham Parade - Town Centre Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image15_d2jw4c.png", alt: "Cheltenham Parade - Town Centre Retail" }
            ]
        },
        {
            title: "Eastbourne Parade",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890909/portfolio_by_abby__image7_cayxcj.png", alt: "Eastbourne Parade - Multi-Level Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890908/portfolio_by_abby__image21_rsvjxq.png", alt: "Eastbourne Parade - Multi-Level Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890908/portfolio_by_abby__image19_kxysqy.png", alt: "Eastbourne Parade - Multi-Level Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890908/portfolio_by_abby__image17_wrlmkc.png", alt: "Eastbourne Parade - Multi-Level Retail" }
            ]
        },
        {
            title: "Southport Parade",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421111/Cheltenham-62-RZD_yzz0xl.jpg", alt: "Southport Parade - Grade II Listed Building" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421118/0e69c0b2-953e-11ef-afc8-0242ac110002---auto--_har00y.jpg", alt: "Southport Parade - Grade II Listed Building" }
            ]
        },
        {
            title: "Barry Retail Parade",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/8.Barry-31RZD_v61kgp.jpg", alt: "Barry Retail Parade - Holton Road Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/5.Barry-13-RZD_l2kgx7.jpg", alt: "Barry Retail Parade - Holton Road Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/3.Barry-57-RZD_a3eta0.jpg", alt: "Barry Retail Parade - Holton Road Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/6.Barry-12-RZD_mxrwec.jpg", alt: "Barry Retail Parade - Holton Road Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/4.Barry-5-RZD_nnylrs.jpg", alt: "Barry Retail Parade - Holton Road Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727915/1.-Barry-28-MAIN-RZD_op2fd3.jpg", alt: "Barry Retail Parade - Holton Road Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727915/2.Barry-63-RZD_jvxb9t.jpg", alt: "Barry Retail Parade - Holton Road Prime Location" }
            ]
        },
        {
            title: "Nottingham Tesco",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727215/78e013275d371a9e8f01d3cc67d18173_t6swic.png", alt: "Nottingham Tesco - Upper Parliament Street" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727212/3fe49f017f3624049458efd5ed90b4a2_mcirbl.jpg", alt: "Nottingham Tesco - Upper Parliament Street" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727212/2ff06c90b87f1246ea3077d97a18c964_rya2ho.jpg", alt: "Nottingham Tesco - Upper Parliament Street" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727212/17482b683d08ffe498c9dc6cba204fba_q7hedc.jpg", alt: "Nottingham Tesco - Upper Parliament Street" }
            ]
        },
        {
            title: "Long Row Nottingham",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753728407/f0cca6d4-d357-11ef-9049-0242ac110002---auto--_uvqjfm.jpg", alt: "Long Row Nottingham - Prime Retail Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753728406/0e66eaec-d358-11ef-baf2-0242ac110002---auto--_evworq.jpg", alt: "Long Row Nottingham - Prime Retail Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753728405/d7fff70c-d409-11ef-a907-0242ac110002---auto--_cpiupa.jpg", alt: "Long Row Nottingham - Prime Retail Location" }
            ]
        }
    ];
    
    try {
        let totalImagesUpdated = 0;
        
        for (const portfolio of portfolios) {
            console.log(`\nUpdating ${portfolio.title}...`);
            
            // Get portfolio ID
            const result = await sql`
                SELECT portfolio_id FROM portfolios WHERE title = ${portfolio.title}
            `;
            
            if (result.length === 0) {
                console.log(`  ⚠️  Portfolio not found: ${portfolio.title}`);
                continue;
            }
            
            const portfolioId = result[0].portfolio_id;
            
            // Delete ALL existing images for this portfolio
            const deleted = await sql`DELETE FROM portfolio_images WHERE portfolio_id = ${portfolioId}`;
            console.log(`  - Deleted existing images`);
            
            // Insert ALL new images in correct order
            for (let i = 0; i < portfolio.images.length; i++) {
                const img = portfolio.images[i];
                await sql`
                    INSERT INTO portfolio_images (portfolio_id, url, alt, image_order)
                    VALUES (${portfolioId}, ${img.url}, ${img.alt}, ${i})
                `;
            }
            
            console.log(`  ✓ Added ${portfolio.images.length} images`);
            totalImagesUpdated += portfolio.images.length;
        }
        
        console.log(`\n✅ FINAL FIX COMPLETE!`);
        console.log(`Total commercial images updated: ${totalImagesUpdated}`);
        console.log(`\nCommercial portfolio image counts:`);
        console.log(`- Accrington Parade: 2 images`);
        console.log(`- Brown Portfolio: 4 images`);
        console.log(`- Tower Bridge Quarter: 3 images`);
        console.log(`- Cheltenham Parade: 2 images`);
        console.log(`- Eastbourne Parade: 4 images`);
        console.log(`- Southport Parade: 2 images`);
        console.log(`- Barry Retail Parade: 7 images`);
        console.log(`- Nottingham Tesco: 4 images`);
        console.log(`- Long Row Nottingham: 3 images`);
        
    } catch (error) {
        console.error('Failed to update commercial images:', error);
        process.exit(1);
    }
}

// Run the final fix
fixAllCommercialFinal();