-- Check the portfolios table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'portfolios'
ORDER BY ordinal_position;

-- Check if featured_image_order column exists
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'portfolios' AND column_name = 'featured_image_order';

-- Show existing portfolios
SELECT portfolio_id, title, category FROM portfolios WHERE category = 'residential';

-- Check portfolio_images table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'portfolio_images'
ORDER BY ordinal_position;

-- Check portfolio_details table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'portfolio_details'
ORDER BY ordinal_position;