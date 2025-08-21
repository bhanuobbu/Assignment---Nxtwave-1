-- Sample seed rows for quick testing (Postgres)
INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
VALUES
('American', 'Classic Pancakes', 4.5, 10, 15, 25, 'Fluffy pancakes', '{"calories":"350 kcal","fatContent":"10 g","proteinContent":"8 g"}', '4'),
('Italian', 'Spaghetti Carbonara', 4.7, 15, 20, 35, 'Creamy carbonara', '{"calories":"600 kcal","fatContent":"25 g","proteinContent":"20 g"}', '3');
