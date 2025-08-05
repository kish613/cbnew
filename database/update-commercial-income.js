import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function updateCommercialIncome() {
    console.log('Updating commercial portfolio descriptions with income...\n');
    
    const updates = [
        {
            id: 'mdrr1ao2wo32jc39wm',
            title: 'Tower Bridge Quarter',
            description: 'Prestigious mixed-use development near Tower Bridge featuring retail, office, and residential units generating £899,875 annually. Prime location with views of the Thames.'
        },
        {
            id: 'mdrr1ao2l64w0i0zpe',
            title: 'Accrington Parade',
            description: 'Comprehensive retail development comprising five retail units and a substation in a prime Lancashire location generating £57,000 annually with excellent footfall and accessibility.'
        },
        {
            id: 'mdrr1ao2el76jkfn86u',
            title: 'Brown Portfolio',
            description: 'Freehold, mixed-use collection of eight properties comprising industrial, leisure, and retail assets generating £455,156 annually. Nearly 80% of income secured against national tenants including Tesco, Toolstation, and Stonegate Pub Company.'
        },
        {
            id: 'mdrr1ao2im4x60epchl',
            title: 'Cheltenham Parade',
            description: 'Extensive 11 unit Town Centre retail parade with office upper floors in a popular trading location in central Cheltenham generating £187,500 annually with excellent footfall and visibility.'
        },
        {
            id: 'mdrr1ao2rn80vkyrna',
            title: 'Eastbourne Parade',
            description: 'Attractive mid-terraced retail parade of seven units arranged over basement, ground, first and second floors totalling 36,508 sq ft of retail accommodation generating £310,400 annually.'
        },
        {
            id: 'mdrr1ao2iztubtj1xb',
            title: 'Southport Parade',
            description: 'Grade II listed building in a prime spot on Lord Street generating £98,000 annually, surrounded by major retailers including Caffe Nero, HSBC, and Prezzo in this prestigious shopping destination.'
        },
        {
            id: 'mdrr1ao26wmppxpr4b6',
            title: 'Barry Retail Parade',
            description: 'Extensive retail parade on Barry\'s main shopping street generating £401,550 annually. Multiple retail units with diverse tenant mix including national chains and local businesses. Strong footfall from local population and proximity to Barry Island tourist destination. Significant asset with stable income and enhancement opportunities.'
        },
        {
            id: 'mdrr1ao2vk94rfc50a',
            title: 'Nottingham Tesco',
            description: 'Prime city center Tesco Express investment generating £109,029 annually with long-term lease to a blue-chip covenant. Located on Upper Parliament Street in the heart of Nottingham\'s retail core. Secure income stream from one of the UK\'s leading retailers with regular rent reviews.'
        }
    ];
    
    try {
        for (const update of updates) {
            console.log(`Updating ${update.title}...`);
            await sql`
                UPDATE portfolios 
                SET description = ${update.description}
                WHERE portfolio_id = ${update.id}
            `;
        }
        
        console.log('\nAll commercial portfolios updated with income information!');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

updateCommercialIncome();