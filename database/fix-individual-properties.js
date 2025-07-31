// Fix Properties Bought Individually portfolio images
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function fixIndividualProperties() {
    console.log('Fixing Properties Bought Individually portfolio...');
    
    try {
        // Find the portfolio
        const portfolio = await sql`
            SELECT portfolio_id FROM portfolios WHERE title = 'Properties Bought Individually'
        `;
        
        if (portfolio.length === 0) {
            console.error('Portfolio not found!');
            return;
        }
        
        const portfolioId = portfolio[0].portfolio_id;
        
        // Delete existing images
        await sql`DELETE FROM portfolio_images WHERE portfolio_id = ${portfolioId}`;
        
        // Insert correct images with addresses
        const images = [
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972554/110_hillaries_sJHUDn_anrvh2.jpg", 
                alt: "110 Hillaries Road, Birmingham",
                address: "110 Hillaries Road, Birmingham, B23 7QT"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972564/16_berryfield_2_sJHUDn_ii39ya.jpg", 
                alt: "16 Berryfield Park, Melksham",
                address: "16 Berryfield Park, Melksham, SN12 6ED"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972553/1_booth_sJHUDn_jlke5x.jpg", 
                alt: "1 Booth Road, Wednesbury",
                address: "1 Booth Road, Wednesbury, WS10 0EN"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972572/6_welland_sJHUDn_qebjhf.jpg", 
                alt: "6 Welland Court, Kettering",
                address: "6 Welland Court, Kettering, NN15 5ST"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972566/68_stourbridge_sJHUDn_qvef0w.jpg", 
                alt: "68 Stourbridge Road, Dudley",
                address: "68 Stourbridge Road, Dudley, DY1 2DF"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg", 
                alt: "48 Worsley Road North, Manchester",
                address: "48 Worsley Road North, Manchester, M28 3GW"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg", 
                alt: "5 Bela Grove, Blackpool",
                address: "5 Bela Grove, Blackpool, FY1 5JZ"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/16_sissons_sJHUDn_as8ryp.jpg", 
                alt: "16 Sissons Crescent, Leeds",
                address: "16 Sissons Crescent, Leeds, LS10 4LN"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972565/12_bright_sJHUDn_hqp51y.jpg", 
                alt: "12 Bright Street, Bradford",
                address: "12 Bright Street, Bradford, BD15 7QT"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972568/15_harvey_sJHUDn_cf6z5f.jpg", 
                alt: "15 Harvey Court, Chesterfield",
                address: "15 Harvey Court, Chesterfield, S44 6SJ"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972569/8_essex_sJHUDn_fbqhrz.jpg", 
                alt: "8 Essex Drive, Stoke-on-Trent",
                address: "8 Essex Drive, Stoke-on-Trent, ST7 1HE"
            },
            { 
                url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972575/8_keens_rd_sJHUDn_rbil7y.jpg", 
                alt: "8 Keens Road, Croydon",
                address: "8 Keens Road, Croydon, CR0 1AH"
            }
        ];
        
        // Insert all images
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            await sql`
                INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
                VALUES (${portfolioId}, ${img.url}, ${img.alt}, ${img.address}, ${i})
            `;
            console.log(`Added: ${img.alt}`);
        }
        
        console.log('\nProperties Bought Individually portfolio fixed successfully!');
        console.log(`Total images: ${images.length}`);
        
    } catch (error) {
        console.error('Failed to fix portfolio:', error);
        process.exit(1);
    }
}

// Run fix
fixIndividualProperties();