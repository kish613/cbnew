-- First delete all images for Properties Bought Individually
DELETE FROM portfolio_images 
WHERE portfolio_id IN (
    SELECT portfolio_id FROM portfolios WHERE title = 'Properties Bought Individually'
);

-- Delete all details for Properties Bought Individually
DELETE FROM portfolio_details 
WHERE portfolio_id IN (
    SELECT portfolio_id FROM portfolios WHERE title = 'Properties Bought Individually'
);

-- Finally delete the portfolio itself
DELETE FROM portfolios 
WHERE title = 'Properties Bought Individually';