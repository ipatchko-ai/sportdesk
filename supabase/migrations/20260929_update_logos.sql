-- Update logos for football and MMA tournaments

-- Football tournaments: use close-up soccer ball image
UPDATE tournaments
SET logo_url = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop'
WHERE sport = 'football';

-- MMA tournaments: use octagon cage image
UPDATE tournaments
SET logo_url = 'https://images.unsplash.com/photo-1545191050-96042d612b1f?w=200&h=200&fit=crop'
WHERE sport = 'mma';
