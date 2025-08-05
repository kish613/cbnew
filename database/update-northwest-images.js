import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateNorthWestImages() {
    console.log('Updating North West Portfolio with new images...\n');
    
    try {
        // First delete existing images
        await sql`DELETE FROM portfolio_images WHERE portfolio_id = 'north-west-portfolio-2025'`;
        
        // Add new images (11 provided, will use first 10)
        const northwestImages = [
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043487/499a_Ckrv5c_e7tfnr.jpg', alt: 'North West Property', address: 'North West Properties' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043486/18_weston_ave_sJHUDn_vk8z4r.jpg', alt: '18 Weston Avenue', address: '18 Weston Avenue' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043486/499a_sJHUDn_ntxhwp.jpg', alt: 'North West Property', address: 'North West Properties' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754043483/123_berridge_Ckrv5c_u6umll.jpg', alt: '123 Berridge', address: '123 Berridge' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972575/8_keens_rd_sJHUDn_rbil7y.jpg', alt: '8 Keens Road', address: '8 Keens Road' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg', alt: '5 Bela Grove, Blackpool', address: '5 Bela Grove, Blackpool, FY1 5JZ' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972572/6_welland_sJHUDn_qebjhf.jpg', alt: '6 Welland', address: '6 Welland' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg', alt: '48 Worsley Road North, Manchester', address: '48 Worsley Road North, Manchester, M28 3GW' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972569/8_essex_sJHUDn_fbqhrz.jpg', alt: '8 Essex', address: '8 Essex' },
            { url: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972568/15_harvey_sJHUDn_cf6z5f.jpg', alt: '15 Harvey', address: '15 Harvey' }
        ];
        
        for (let i = 0; i < northwestImages.length; i++) {
            const img = northwestImages[i];
            await sql`
                INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
                VALUES ('north-west-portfolio-2025', ${img.url}, ${img.alt}, ${img.address}, ${i})
            `;
        }
        console.log(`Successfully updated North West Portfolio with ${northwestImages.length} new images`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

updateNorthWestImages();