-- List ALL tables in the database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Find any table with 'individual' in the name
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND LOWER(table_name) LIKE '%individual%';