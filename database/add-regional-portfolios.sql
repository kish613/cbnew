-- Add London Portfolio
INSERT INTO portfolios (
  portfolio_id, title, category, location, type, address, 
  description, display_order, featured_image_order
)
VALUES (
  'london-portfolio-2025', 
  'London Portfolio', 
  'residential', 
  'Greater London', 
  'Regional Portfolio', 
  'Croydon, Edmonton, Walthamstow, Romford & More', 
  'Strategic residential properties across Greater London including Croydon, Edmonton, Walthamstow, and Romford. Each property carefully selected for strong rental yields and capital growth potential.', 
  5, 
  0
);

-- Add London Portfolio details
INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order) VALUES
('london-portfolio-2025', 'ri-building-line', '10 Properties', 0),
('london-portfolio-2025', 'ri-map-pin-line', 'Prime Locations', 1),
('london-portfolio-2025', 'ri-line-chart-line', 'High Yield', 2);

-- Add London Portfolio images
INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) VALUES
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg', '38 Ladbrook Road, London', '38 Ladbrook Road, London, SE25 6QD', 0),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/1_swez7b.jpg', '3 Tranmere Road, Edmonton', '3 Tranmere Road, Edmonton, London, N9 9EJ', 1),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/2_whspyj.jpg', '78 Long Lane, Addiscombe', '78 Long Lane, Addiscombe, London, CR0 7AP', 2),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/3_s0ye02.jpg', '30 Pitchford Street', '30 Pitchford Street, London, E15 4RX', 3),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/4_vdq81a.jpg', '3 Ulverston Road, Walthamstow', '3 Ulverston Road, Walthamstow, London, E17 4BN', 4),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/5_oayrve.jpg', '677A London Road, Thornton Heath', '677A London Road, Thornton Heath, CR7 6AZ', 5),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/6_rrjhnu.jpg', '183 Kempton Road', '183 Kempton Road, London, E6 2PD', 6),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/7_vjfynr.jpg', '119 Boston Road, Croydon', '119 Boston Road, Croydon, CR0 3EH', 7),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/8_fia5z5.jpg', '11 Salisbury Road', '11 Salisbury Road, London, E4 6TA', 8),
('london-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056355/9_pficfj.jpg', '44 Retford Road, Romford', '44 Retford Road, Romford, RM3 9NB', 9);

-- Add Midlands Portfolio
INSERT INTO portfolios (
  portfolio_id, title, category, location, type, address, 
  description, display_order, featured_image_order
)
VALUES (
  'midlands-portfolio-2025', 
  'Midlands Portfolio', 
  'residential', 
  'West Midlands', 
  'Regional Portfolio', 
  'Birmingham, Wednesbury, Dudley & Stoke-on-Trent', 
  'Carefully selected properties across the Midlands region in key urban areas. Strong rental demand from local employment centers and excellent transport links to major cities.', 
  6, 
  0
);

-- Add Midlands Portfolio details
INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order) VALUES
('midlands-portfolio-2025', 'ri-home-4-line', 'Residential Properties', 0),
('midlands-portfolio-2025', 'ri-map-pin-line', 'Strategic Locations', 1),
('midlands-portfolio-2025', 'ri-community-line', 'Community Focus', 2);

-- Add Midlands Portfolio images
INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) VALUES
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972554/110_hillaries_sJHUDn_anrvh2.jpg', '110 Hillaries Road, Birmingham', '110 Hillaries Road, Birmingham, B23 7QT', 0),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972553/1_booth_sJHUDn_jlke5x.jpg', '1 Booth Road, Wednesbury', '1 Booth Road, Wednesbury, WS10 0EN', 1),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972566/68_stourbridge_sJHUDn_qvef0w.jpg', '68 Stourbridge Road, Dudley', '68 Stourbridge Road, Dudley, DY1 2DF', 2),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056355/13_ksblfe.jpg', '42 Walford Street, Stoke-on-Trent', '42 Walford Street, Stoke-on-Trent, ST6 3HR', 3);

-- Add North West Portfolio
INSERT INTO portfolios (
  portfolio_id, title, category, location, type, address, 
  description, display_order, featured_image_order
)
VALUES (
  'north-west-portfolio-2025', 
  'North West Portfolio', 
  'residential', 
  'North West England', 
  'Regional Portfolio', 
  'Manchester, Blackpool, Leeds, Bradford & Liverpool', 
  'Strong performing residential properties across major North West cities. Benefiting from urban regeneration schemes and growing rental markets in key employment hubs.', 
  7, 
  0
);

-- Add North West Portfolio details
INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order) VALUES
('north-west-portfolio-2025', 'ri-building-line', 'Urban Properties', 0),
('north-west-portfolio-2025', 'ri-map-pin-line', 'Major Cities', 1),
('north-west-portfolio-2025', 'ri-line-chart-line', 'Growth Markets', 2);

-- Add North West Portfolio images
INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) VALUES
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg', '48 Worsley Road North, Manchester', '48 Worsley Road North, Manchester, M28 3GW', 0),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg', '5 Bela Grove, Blackpool', '5 Bela Grove, Blackpool, FY1 5JZ', 1),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/16_sissons_sJHUDn_as8ryp.jpg', '16 Sissons Crescent, Leeds', '16 Sissons Crescent, Leeds, LS10 4LN', 2),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972565/12_bright_sJHUDn_hqp51y.jpg', '12 Bright Street, Bradford', '12 Bright Street, Bradford, BD15 7QT', 3),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056356/Liverpool-Property-_1_.jpg', '81 Grane Road, Liverpool', '81 Grane Road, Liverpool, BB4 4LR', 4);