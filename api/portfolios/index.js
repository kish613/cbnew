import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Helper function to verify admin password
function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.substring(7);
  return token === process.env.ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Public endpoint - no auth required for reading
        return await getPortfolios(req, res);
      
      case 'POST':
        // Requires authentication
        if (!verifyAuth(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        return await createPortfolio(req, res);
      
      case 'PUT':
        // Requires authentication
        if (!verifyAuth(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        return await updatePortfolio(req, res);
      
      case 'DELETE':
        // Requires authentication
        if (!verifyAuth(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        return await deletePortfolio(req, res);
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPortfolios(req, res) {
  const { category } = req.query;
  
  let query = `
    SELECT 
      p.*,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'icon', pd.icon,
            'text', pd.text,
            'order', pd.detail_order
          )
        ) FILTER (WHERE pd.id IS NOT NULL), 
        '[]'
      ) as details,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'url', pi.url,
            'alt', pi.alt,
            'address', pi.address,
            'order', pi.image_order
          )
        ) FILTER (WHERE pi.id IS NOT NULL), 
        '[]'
      ) as images
    FROM portfolios p
    LEFT JOIN portfolio_details pd ON p.portfolio_id = pd.portfolio_id
    LEFT JOIN portfolio_images pi ON p.portfolio_id = pi.portfolio_id
  `;
  
  const params = [];
  if (category) {
    query += ' WHERE p.category = $1';
    params.push(category);
  }
  
  query += ' GROUP BY p.id ORDER BY p.display_order, p.created_at';
  
  const portfolios = await sql(query, params);
  
  // Format the response
  const formatted = portfolios.map(p => ({
    id: p.portfolio_id,
    title: p.title,
    category: p.category,
    location: p.location,
    type: p.type,
    address: p.address,
    description: p.description,
    details: p.details.sort((a, b) => a.order - b.order).map(d => ({ icon: d.icon, text: d.text })),
    images: p.images.sort((a, b) => a.order - b.order).map(i => ({ url: i.url, alt: i.alt, address: i.address }))
  }));
  
  // Group by category
  const result = {
    residential: formatted.filter(p => p.category === 'residential'),
    commercial: formatted.filter(p => p.category === 'commercial')
  };
  
  res.status(200).json(result);
}

async function createPortfolio(req, res) {
  const { portfolio } = req.body;
  
  if (!portfolio) {
    return res.status(400).json({ error: 'Portfolio data required' });
  }
  
  // Start transaction
  try {
    // Insert portfolio
    const [newPortfolio] = await sql`
      INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order)
      VALUES (${portfolio.id}, ${portfolio.title}, ${portfolio.category}, ${portfolio.location}, 
              ${portfolio.type || null}, ${portfolio.address || null}, ${portfolio.description}, 
              (SELECT COALESCE(MAX(display_order), -1) + 1 FROM portfolios WHERE category = ${portfolio.category}))
      RETURNING *
    `;
    
    // Insert details
    if (portfolio.details && portfolio.details.length > 0) {
      for (let i = 0; i < portfolio.details.length; i++) {
        const detail = portfolio.details[i];
        await sql`
          INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order)
          VALUES (${portfolio.id}, ${detail.icon}, ${detail.text}, ${i})
        `;
      }
    }
    
    // Insert images
    if (portfolio.images && portfolio.images.length > 0) {
      for (let i = 0; i < portfolio.images.length; i++) {
        const image = portfolio.images[i];
        await sql`
          INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
          VALUES (${portfolio.id}, ${image.url}, ${image.alt}, ${image.address || null}, ${i})
        `;
      }
    }
    
    res.status(201).json({ success: true, portfolio: newPortfolio });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
}

async function updatePortfolio(req, res) {
  const { portfolio } = req.body;
  
  if (!portfolio || !portfolio.id) {
    return res.status(400).json({ error: 'Portfolio data with ID required' });
  }
  
  try {
    // Update portfolio
    const [updatedPortfolio] = await sql`
      UPDATE portfolios 
      SET title = ${portfolio.title},
          category = ${portfolio.category},
          location = ${portfolio.location},
          type = ${portfolio.type || null},
          address = ${portfolio.address || null},
          description = ${portfolio.description}
      WHERE portfolio_id = ${portfolio.id}
      RETURNING *
    `;
    
    if (!updatedPortfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    // Delete existing details and images
    await sql`DELETE FROM portfolio_details WHERE portfolio_id = ${portfolio.id}`;
    await sql`DELETE FROM portfolio_images WHERE portfolio_id = ${portfolio.id}`;
    
    // Insert new details
    if (portfolio.details && portfolio.details.length > 0) {
      for (let i = 0; i < portfolio.details.length; i++) {
        const detail = portfolio.details[i];
        await sql`
          INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order)
          VALUES (${portfolio.id}, ${detail.icon}, ${detail.text}, ${i})
        `;
      }
    }
    
    // Insert new images
    if (portfolio.images && portfolio.images.length > 0) {
      for (let i = 0; i < portfolio.images.length; i++) {
        const image = portfolio.images[i];
        await sql`
          INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order)
          VALUES (${portfolio.id}, ${image.url}, ${image.alt}, ${image.address || null}, ${i})
        `;
      }
    }
    
    res.status(200).json({ success: true, portfolio: updatedPortfolio });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
}

async function deletePortfolio(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Portfolio ID required' });
  }
  
  try {
    const result = await sql`
      DELETE FROM portfolios WHERE portfolio_id = ${id} RETURNING *
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
}