-- Find any portfolio with the problematic description
SELECT portfolio_id, title, description 
FROM portfolios 
WHERE description LIKE '%carefully curated selection%' 
   OR description LIKE '%Select Individual Property%'
   OR title LIKE '%Individual%'
   OR title = 'Regional Properties';

-- Delete any portfolio containing individual property listings
DELETE FROM portfolio_images 
WHERE portfolio_id IN (
    SELECT portfolio_id FROM portfolios 
    WHERE description LIKE '%carefully curated selection%' 
       OR description LIKE '%Select Individual Property%'
       OR title LIKE '%Individual%'
       OR title = 'Regional Properties'
);

DELETE FROM portfolio_details 
WHERE portfolio_id IN (
    SELECT portfolio_id FROM portfolios 
    WHERE description LIKE '%carefully curated selection%' 
       OR description LIKE '%Select Individual Property%'
       OR title LIKE '%Individual%'
       OR title = 'Regional Properties'
);

DELETE FROM portfolios 
WHERE description LIKE '%carefully curated selection%' 
   OR description LIKE '%Select Individual Property%'
   OR title LIKE '%Individual%'
   OR title = 'Regional Properties';