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
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Requires authentication
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { portfolioIds, category } = req.body;

  if (!portfolioIds || !Array.isArray(portfolioIds) || !category) {
    return res.status(400).json({ error: 'Portfolio IDs array and category required' });
  }

  try {
    // Update display_order for each portfolio
    for (let i = 0; i < portfolioIds.length; i++) {
      await sql`
        UPDATE portfolios 
        SET display_order = ${i}
        WHERE portfolio_id = ${portfolioIds[i]} AND category = ${category}
      `;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Reorder portfolios error:', error);
    res.status(500).json({ error: 'Failed to reorder portfolios' });
  }
}