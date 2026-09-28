-- Seed data for tournaments
-- Based on crawled data from original site

INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted) VALUES
  ('Senica Youth Weekend', 'tournament', 'Slovakia', 'Senica', 77, '8-12', 'November', 'Weekend', false, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Bohemians Prague 1905', 'tournament', 'Czech Republic', 'Prague', 180, '10-14', 'December', 'Week', true, 'Stadium Tour', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true),
  ('Ružomberok Mountain ID', 'tournament', 'Slovakia', 'Ružomberok', 165, '10-14', 'September', 'Weekend', true, 'Hiking', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Jablonec Northern Stars', 'tournament', 'Czech Republic', 'Jablonec', 135, '8-12', 'August', 'Weekend', true, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Sparta Prague Youth Cup', 'tournament', 'Czech Republic', 'Prague', 220, '14-18', 'July', 'Week', true, 'Stadium Tour', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true),
  ('Trenčín Summer Camp', 'gathering', 'Slovakia', 'Trenčín', 150, '10-14', 'June', 'Week', true, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Brno Soccer Campus', 'campus', 'Czech Republic', 'Brno', 195, '8-12', 'August', 'Week', true, 'Swimming Pool', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Košice Elite Training', 'gathering', 'Slovakia', 'Košice', 145, '14-18', 'July', 'Weekend', false, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Ostrava Football Academy', 'campus', 'Czech Republic', 'Ostrava', 210, '10-14', 'September', 'Week', true, 'Gym Access', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true),
  ('Nitra One Day Cup', 'tournament', 'Slovakia', 'Nitra', 45, '8-12', 'October', '1 day', false, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false);
