-- First, let's check if any of these already exist and remove them
DELETE FROM portfolio_images WHERE portfolio_id IN ('london-portfolio-2025', 'midlands-portfolio-2025', 'north-west-portfolio-2025');
DELETE FROM portfolio_details WHERE portfolio_id IN ('london-portfolio-2025', 'midlands-portfolio-2025', 'north-west-portfolio-2025');
DELETE FROM portfolios WHERE portfolio_id IN ('london-portfolio-2025', 'midlands-portfolio-2025', 'north-west-portfolio-2025');

-- Add London Portfolio
INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order, featured_image_order)
VALUES ('london-portfolio-2025', 'London Portfolio', 'residential', 'Greater London', 'Regional Portfolio', 'Croydon, Edmonton, Walthamstow, Romford & More', 'Strategic residential properties across Greater London including Croydon, Edmonton, Walthamstow, and Romford. Each property carefully selected for strong rental yields and capital growth potential.', 5, 0);

-- Add London details
INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order) VALUES
('london-portfolio-2025', 'ri-building-line', '10 Properties', 0),
('london-portfolio-2025', 'ri-map-pin-line', 'Prime Locations', 1),
('london-portfolio-2025', 'ri-line-chart-line', 'High Yield', 2);

-- Add London images
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
INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order, featured_image_order)
VALUES ('midlands-portfolio-2025', 'Midlands Portfolio', 'residential', 'West Midlands', 'Regional Portfolio', 'Birmingham, Wednesbury, Dudley & Stoke-on-Trent', 'Carefully selected properties across the Midlands region in key urban areas. Strong rental demand from local employment centers and excellent transport links to major cities.', 6, 0);

-- Add Midlands details
INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order) VALUES
('midlands-portfolio-2025', 'ri-home-4-line', 'Residential Properties', 0),
('midlands-portfolio-2025', 'ri-map-pin-line', 'Strategic Locations', 1),
('midlands-portfolio-2025', 'ri-community-line', 'Community Focus', 2);

-- Add Midlands images
INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) VALUES
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg', '98 Condover Road, Birmingham', '98 Condover Road, Birmingham, West Midlands, B31 3QX', 0),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/1_ziknpn.jpg', '89 Honiton Crescent, Birmingham', '89 Honiton Crescent, Birmingham, West Midlands, B31', 1),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/2_lf47ji.jpg', '197 Field Road, Bloxwich', '197 Field Road, Bloxwich, Walsall, West Midlands, WS3 3NA', 2),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/3_hdv15s.jpg', '106 Cheverton Road, Birmingham', '106 Cheverton Road, Birmingham, West Midlands, B31 1RT', 3),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/4_srljfn.jpg', '4 Rowland Gardens, Walsall', '4 Rowland Gardens, WALSALL, West Midlands, WS2 8UL', 4),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/5_b1udmb.jpg', '25 Lower Valley Road, Brierley Hill', '25 Lower Valley Road, Brierley Hill, West Midlands, DY5 3NP', 5),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/6_o6zvhg.jpg', '70 Rutherford Road, Walsall', '70 Rutherford Road, Beechdale, Walsall, West Midlands, WS2 7JQ', 6),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056404/7_tweooh.jpg', '210 Jiggins Lane, Birmingham', '210 Jiggins Lane, Birmingham, West Midlands, B32 3ER', 7),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/8_k79nsu.jpg', '16 Tipton Road, Dudley', '16 Tipton Road, DUDLEY, West Midlands, DY1 4SH', 8),
('midlands-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/9_cbc41k.jpg', '11 Wills Avenue, West Bromwich', '11 Wills Avenue, West Bromwich, West Midlands, B71 2QS', 9);

-- Add North West Portfolio
INSERT INTO portfolios (portfolio_id, title, category, location, type, address, description, display_order, featured_image_order)
VALUES ('north-west-portfolio-2025', 'North West Portfolio', 'residential', 'North West England', 'Regional Portfolio', 'Manchester, Blackpool, Leeds, Bradford & Liverpool', 'Strong performing residential properties across major North West cities. Benefiting from urban regeneration schemes and growing rental markets in key employment hubs.', 7, 0);

-- Add North West details
INSERT INTO portfolio_details (portfolio_id, icon, text, detail_order) VALUES
('north-west-portfolio-2025', 'ri-building-line', 'Urban Properties', 0),
('north-west-portfolio-2025', 'ri-map-pin-line', 'Major Cities', 1),
('north-west-portfolio-2025', 'ri-line-chart-line', 'Growth Markets', 2);

-- Add North West images
INSERT INTO portfolio_images (portfolio_id, url, alt, address, image_order) VALUES
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg', '48 Worsley Road North, Manchester', '48 Worsley Road North, Manchester, M28 3GW', 0),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg', '5 Bela Grove, Blackpool', '5 Bela Grove, Blackpool, FY1 5JZ', 1),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/16_sissons_sJHUDn_as8ryp.jpg', '16 Sissons Crescent, Leeds', '16 Sissons Crescent, Leeds, LS10 4LN', 2),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753972565/12_bright_sJHUDn_hqp51y.jpg', '12 Bright Street, Bradford', '12 Bright Street, Bradford, BD15 7QT', 3),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056356/Liverpool-Property-_1_.jpg', '81 Grane Road, Liverpool', '81 Grane Road, Liverpool, BB4 4LR', 4),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/DJI_20220721_160904_038_lvb2kk.jpg', 'North West Properties - Aerial View', 'North West Properties - Regional Overview', 5),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753869661/IMG_2934_w4r7nn.jpg', 'North West Properties - Street View', 'North West Properties - Urban Development', 6),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220810_133732_Original_2_lr7xen.jpg', 'North West Properties - Property View', 'North West Properties - Investment Opportunity', 7),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056407/10_vusklp.jpg', 'North West Properties - Manchester Area', 'North West Properties - Manchester Region', 8),
('north-west-portfolio-2025', 'https://res.cloudinary.com/dmns9ystn/image/upload/v1754056408/11_iwhdlp.jpg', 'North West Properties - Liverpool Area', 'North West Properties - Liverpool Region', 9);

-- Verify all three portfolios were added
SELECT p.portfolio_id, p.title, 
       (SELECT COUNT(*) FROM portfolio_images pi WHERE pi.portfolio_id = p.portfolio_id) as image_count,
       (SELECT COUNT(*) FROM portfolio_details pd WHERE pd.portfolio_id = p.portfolio_id) as detail_count
FROM portfolios p 
WHERE p.portfolio_id IN ('london-portfolio-2025', 'midlands-portfolio-2025', 'north-west-portfolio-2025');