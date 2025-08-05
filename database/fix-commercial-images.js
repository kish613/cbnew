// Fix all commercial portfolio images to match HTML
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function fixCommercialImages() {
    console.log('Fixing commercial portfolio images...\n');
    
    const fixes = [
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
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384332/48_v4gvu9.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384333/49_pbexac.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384320/39_qnosuc.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384311/32_srz9ju.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384305/27_bzpphg.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384278/10_vn2var.jpg", alt: "Brown Portfolio - Mixed Use Collection" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384296/21_yci8qq.jpg", alt: "Brown Portfolio - Mixed Use Collection" }
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
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384175/4_dquvnu.jpg", alt: "Eastbourne Parade - Multi-Level Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384175/3_shzqxz.jpg", alt: "Eastbourne Parade - Multi-Level Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384186/12_ptus5z.jpg", alt: "Eastbourne Parade - Multi-Level Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384258/23_c23095.jpg", alt: "Eastbourne Parade - Multi-Level Retail" }
            ]
        },
        {
            title: "Southport Parade",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890999/portfolio_by_abby__image26_gybx5f.png", alt: "Southport Parade - Grade II Listed" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890997/portfolio_by_abby__image2_muvlwv.png", alt: "Southport Parade - Grade II Listed" }
            ]
        },
        {
            title: "Barry Retail Parade",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891083/portfolio_by_abby__image35_k7fjjt.png", alt: "Barry Retail Parade - Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891083/portfolio_by_abby__image33_p7pqr3.png", alt: "Barry Retail Parade - Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891081/portfolio_by_abby__image11_p7eltu.png", alt: "Barry Retail Parade - Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891081/portfolio_by_abby__image9_wcwvoz.png", alt: "Barry Retail Parade - Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891081/portfolio_by_abby__image6_vdvtwq.png", alt: "Barry Retail Parade - Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891081/portfolio_by_abby__image10_qghilb.png", alt: "Barry Retail Parade - Prime Location" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891080/portfolio_by_abby__image5_hf0gve.png", alt: "Barry Retail Parade - Prime Location" }
            ]
        },
        {
            title: "Nottingham Tesco",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891219/portfolio_by_abby__image29_u5mnqc.png", alt: "Nottingham Tesco - City Centre Investment" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891220/portfolio_by_abby__image31_s6xhvd.png", alt: "Nottingham Tesco - City Centre Investment" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891219/portfolio_by_abby__image25_ozguua.png", alt: "Nottingham Tesco - City Centre Investment" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891219/portfolio_by_abby__image27_g0ulr2.png", alt: "Nottingham Tesco - City Centre Investment" }
            ]
        },
        {
            title: "Long Row Nottingham",
            images: [
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891335/portfolio_by_abby__image23_ow0vv2.png", alt: "Long Row Nottingham - Historic Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891337/portfolio_by_abby__image30_twaqcb.png", alt: "Long Row Nottingham - Historic Retail" },
                { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751891335/portfolio_by_abby__image20_tybfzf.png", alt: "Long Row Nottingham - Historic Retail" }
            ]
        }
    ];
    
    try {
        for (const fix of fixes) {
            console.log(`Fixing ${fix.title}...`);
            
            // Get portfolio ID
            const portfolio = await sql`
                SELECT portfolio_id FROM portfolios WHERE title = ${fix.title}
            `;
            
            if (portfolio.length === 0) {
                console.log(`  ⚠️  Portfolio not found: ${fix.title}`);
                continue;
            }
            
            const portfolioId = portfolio[0].portfolio_id;
            
            // Delete existing images
            await sql`DELETE FROM portfolio_images WHERE portfolio_id = ${portfolioId}`;
            
            // Insert new images
            for (let i = 0; i < fix.images.length; i++) {
                const img = fix.images[i];
                await sql`
                    INSERT INTO portfolio_images (portfolio_id, url, alt, image_order)
                    VALUES (${portfolioId}, ${img.url}, ${img.alt}, ${i})
                `;
            }
            
            console.log(`  ✓ Updated with ${fix.images.length} images`);
        }
        
        console.log('\nAll commercial portfolio images fixed successfully!');
        
    } catch (error) {
        console.error('Failed to fix commercial images:', error);
        process.exit(1);
    }
}

// Run fix
fixCommercialImages();