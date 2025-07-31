-- Neon PostgreSQL Schema for Crestbourne Portfolio Management

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,
    portfolio_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('residential', 'commercial')),
    location VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    address VARCHAR(500),
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolio details table
CREATE TABLE IF NOT EXISTS portfolio_details (
    id SERIAL PRIMARY KEY,
    portfolio_id VARCHAR(50) REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
    icon VARCHAR(100),
    text VARCHAR(255),
    detail_order INTEGER NOT NULL DEFAULT 0
);

-- Create portfolio images table
CREATE TABLE IF NOT EXISTS portfolio_images (
    id SERIAL PRIMARY KEY,
    portfolio_id VARCHAR(50) REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt VARCHAR(500),
    address VARCHAR(500), -- For property-specific addresses (like "Properties Bought Individually")
    image_order INTEGER NOT NULL DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_display_order ON portfolios(display_order);
CREATE INDEX idx_portfolio_details_portfolio_id ON portfolio_details(portfolio_id);
CREATE INDEX idx_portfolio_images_portfolio_id ON portfolio_images(portfolio_id);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE
    ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();