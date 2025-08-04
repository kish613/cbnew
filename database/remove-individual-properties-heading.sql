-- Update the Properties Bought Individually portfolio to remove the unwanted text
UPDATE portfolios 
SET title = 'Regional Properties',
    description = 'Strategic individual property acquisitions across key UK markets.'
WHERE title = 'Properties Bought Individually';