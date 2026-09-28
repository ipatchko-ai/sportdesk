-- Update country names from Russian to English

UPDATE tournaments SET country = 'Slovakia' WHERE country = 'Словакия';
UPDATE tournaments SET country = 'Czech Republic' WHERE country = 'Чехия';

-- Verify changes
SELECT DISTINCT country FROM tournaments;
