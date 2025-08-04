-- STEP 1: Add London Portfolio (Run this first)
INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order, featured_image_order)
VALUES ('london-portfolio-2025', 'London Portfolio', 'residential', 'Greater London', 'Regional Portfolio', 'Croydon, Edmonton, Walthamstow, Romford & More', 'Strategic residential properties across Greater London including Croydon, Edmonton, Walthamstow, and Romford. Each property carefully selected for strong rental yields and capital growth potential.', 5, 0);

-- STEP 2: Check if London Portfolio was added
SELECT * FROM portfolios WHERE portfolio_id = 'london-portfolio-2025';

-- STEP 3: If London Portfolio exists, add its details
INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order) VALUES
('london-portfolio-2025', 'ri-building-line', '10 Properties', 0),
('london-portfolio-2025', 'ri-map-pin-line', 'Prime Locations', 1),
('london-portfolio-2025', 'ri-line-chart-line', 'High Yield', 2);

-- STEP 4: Add London images (run each INSERT separately if needed)
INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) 
VALUES ('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg', '38 Ladbrook Road, London', '38 Ladbrook Road, London, SE25 6QD', 0);

INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) 
VALUES ('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/1_swez7b.jpg', '3 Tranmere Road, Edmonton', '3 Tranmere Road, Edmonton, London, N9 9EJ', 1);

INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) 
VALUES ('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/2_whspyj.jpg', '78 Long Lane, Addiscombe', '78 Long Lane, Addiscombe, London, CR0 7AP', 2);

-- Continue with remaining London images...

-- STEP 5: Check London images were added
SELECT COUNT(*) as image_count FROM portfolio_images WHERE portfolio_id = 'london-portfolio-2025';

-- STEP 6: Add Midlands Portfolio
INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order, featured_image_order)
VALUES ('midlands-portfolio-2025', 'Midlands Portfolio', 'residential', 'West Midlands', 'Regional Portfolio', 'Birmingham, Wednesbury, Dudley & Stoke-on-Trent', 'Carefully selected properties across the Midlands region in key urban areas. Strong rental demand from local employment centers and excellent transport links to major cities.', 6, 0);

-- STEP 7: Add North West Portfolio
INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order, featured_image_order)
VALUES ('north-west-portfolio-2025', 'North West Portfolio', 'residential', 'North West England', 'Regional Portfolio', 'Manchester, Blackpool, Leeds, Bradford & Liverpool', 'Strong performing residential properties across major North West cities. Benefiting from urban regeneration schemes and growing rental markets in key employment hubs.', 7, 0);