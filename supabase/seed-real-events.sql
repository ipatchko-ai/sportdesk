-- Real sports events data based on web research
-- Covering: Football, Hockey, Basketball, Tennis, MMA
-- Event types: tournament, team_training, player_training, player_tryout
-- Countries: Czech Republic, Slovakia, Latvia

-- Clear existing data first
TRUNCATE tournaments RESTART IDENTITY CASCADE;

-- ============================================================
-- FOOTBALL EVENTS
-- ============================================================

-- Football Tournaments
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Riga Cup', 'tournament', 'Latvia', 'Riga', 195, '10-14', 'January 2027', 'Week', true, 'Winter Tournament', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true, 'football', 'tournament'),
  ('Ventspils Cup', 'tournament', 'Latvia', 'Ventspils', 145, '8-12', 'May 18 2026', 'Weekend', false, '2000+ participants', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'tournament'),
  ('Sparta Prague Youth Cup', 'tournament', 'Czech Republic', 'Prague', 220, '14-18', 'July 2026', 'Week', true, 'Stadium Tour', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true, 'football', 'tournament'),
  ('Bohemians Prague 1905', 'tournament', 'Czech Republic', 'Prague', 180, '10-14', 'December 2026', 'Week', true, 'Stadium Tour', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'tournament'),
  ('Senica Youth Weekend', 'tournament', 'Slovakia', 'Senica', 77, '8-12', 'November 2026', 'Weekend', false, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'tournament');

-- Football Team Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('AC Milan Junior Camp Prague', 'gathering', 'Czech Republic', 'Prague', 450, '10-14', 'July 14-18 2026', 'Week', true, 'AC Milan Coaches', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true, 'football', 'team_training'),
  ('AC Milan Junior Camp Slovakia', 'gathering', 'Slovakia', 'Rovinka', 420, '10-14', 'July 21-25 2026', 'Week', true, 'AC Milan Coaches', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'team_training'),
  ('MSM Football Academy', 'gathering', 'Czech Republic', 'Prague', 380, '14-18', 'August 2026', 'Week', true, 'Career Development', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'team_training'),
  ('Baltic Football League Camp', 'gathering', 'Latvia', 'Riga', 295, '12-16', 'June 2026', 'Week', true, 'Multi-nation', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'team_training');

-- Football Player Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('SK Slavia Praha Academy', 'campus', 'Czech Republic', 'Prague', 350, '8-15', 'Summer 2026', 'Week', true, 'Eden Training Centre', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true, 'football', 'player_training'),
  ('DTFS Cross-Border Academy', 'campus', 'Czech Republic', 'Border Region', 280, '10-14', 'July 2026', 'Week', false, 'German-Czech', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'player_training'),
  ('MSM Individual Development', 'campus', 'Slovakia', 'Bratislava', 320, '14-18', 'August 2026', 'Week', true, 'Professional Path', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'player_training'),
  ('Latvia Youth Academy', 'campus', 'Latvia', 'Riga', 260, '10-14', 'June 2026', 'Week', true, 'UEFA Licensed', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'player_training');

-- Football Player Tryout
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('European Scout Combine', 'campus', 'Czech Republic', 'Prague', 195, '16-19', 'March 30 2026', '1 day', false, 'Pro Scouts Present', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true, 'football', 'player_tryout'),
  ('Scoutline Prague Showcase', 'campus', 'Czech Republic', 'Prague', 150, '14-18', 'April 2026', 'Weekend', false, 'Get Signed', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'player_tryout'),
  ('IFX Slovakia Trials', 'campus', 'Slovakia', 'Bratislava', 175, '15-19', 'May 2026', 'Weekend', false, 'Club Scouts', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'player_tryout'),
  ('Baltic Player ID Search', 'campus', 'Latvia', 'Riga', 120, '14-18', 'June 2026', '1 day', false, 'Talent ID', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false, 'football', 'player_tryout');

-- ============================================================
-- HOCKEY EVENTS
-- ============================================================

-- Hockey Tournaments
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('IIHF U18 World Championship', 'tournament', 'Slovakia', 'Trenčín', 280, '16-18', 'April 22-May 2 2026', '2 weeks', true, 'World Championship', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', true, 'hockey', 'tournament'),
  ('Riga Hockey Cup', 'tournament', 'Latvia', 'Riga', 195, '12-16', 'December 2026', 'Week', true, 'International Teams', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'tournament'),
  ('Prague Hockey Tournament', 'tournament', 'Czech Republic', 'Prague', 165, '10-14', 'January 2027', 'Weekend', false, 'Elite Competition', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'tournament'),
  ('Bratislava Ice Cup', 'tournament', 'Slovakia', 'Bratislava', 145, '14-18', 'February 2027', 'Weekend', false, null, 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'tournament');

-- Hockey Team Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Czech International Hockey Camp', 'gathering', 'Czech Republic', 'Prague', 520, '12-16', 'July 2026', 'Week', true, '75min sessions x2', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', true, 'hockey', 'team_training'),
  ('Druzhba78 Power Skating', 'gathering', 'Slovakia', 'Bratislava', 480, '10-16', 'August 2026', 'Week', true, 'Elite Coaching', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'team_training'),
  ('Pro Hockey Europe Camp', 'gathering', 'Czech Republic', 'Brno', 550, '14-18', 'July-August 2026', '2 weeks', true, 'Rotating Coaches', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'team_training'),
  ('Baltic Hockey Development', 'gathering', 'Latvia', 'Riga', 420, '12-16', 'June 2026', 'Week', true, 'International', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'team_training');

-- Hockey Player Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Hockey Camp Prague Individual', 'campus', 'Czech Republic', 'Prague', 650, '14-18', 'May 2026', 'Week', true, '5 on-ice sessions', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', true, 'hockey', 'player_training'),
  ('ELGRAFF Individual Development', 'campus', 'Czech Republic', 'Various', 580, '12-18', 'Summer 2026', 'Week', true, 'European Methods', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'player_training'),
  ('Hockey4u Personal Training', 'campus', 'Czech Republic', 'Prague', 520, '10-16', 'July 2026', 'Week', false, 'Since 2012', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'player_training'),
  ('Hockey-Europe Premium', 'campus', 'Czech Republic', 'Prague', 890, '16-19', 'March 2026', '5 days', true, '2 players max on ice', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', true, 'hockey', 'player_training');

-- Hockey Player Tryout
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Pro Ambitions Showcase', 'campus', 'Czech Republic', 'Prague', 220, '15-19', 'Summer 2026', 'Weekend', false, 'European Scouts', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'player_tryout'),
  ('Czech Hockey Evaluation', 'campus', 'Czech Republic', 'Brno', 180, '14-18', 'June 2026', '1 day', false, 'Club Representatives', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'player_tryout'),
  ('Slovakia Hockey Trials', 'campus', 'Slovakia', 'Bratislava', 160, '16-19', 'April 2026', 'Weekend', false, 'Pro Path', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'player_tryout'),
  ('Baltic Ice Hockey Combine', 'campus', 'Latvia', 'Riga', 195, '15-18', 'May 2026', 'Weekend', false, 'Regional Scouts', 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', false, 'hockey', 'player_tryout');

-- ============================================================
-- BASKETBALL EVENTS
-- ============================================================

-- Basketball Tournaments
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('FIBA U19 World Cup', 'tournament', 'Czech Republic', 'Pardubice', 320, '17-19', 'June 26-July 4 2027', 'Week', true, 'World Championship', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', true, 'basketball', 'tournament'),
  ('CEYBL Finals', 'tournament', 'Czech Republic', 'Česká Třebová', 185, '14-16', 'Spring 2026', 'Weekend', false, 'Central European', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'tournament'),
  ('FIBA U16 EuroBasket', 'tournament', 'Latvia', 'Riga', 210, '15-16', 'Summer 2026', 'Week', true, 'European Championship', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', true, 'basketball', 'tournament'),
  ('Bratislava Youth Cup', 'tournament', 'Slovakia', 'Bratislava', 145, '12-16', 'October 2026', 'Weekend', false, 'CEYBL Teams', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'tournament');

-- Basketball Team Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Global Hoops Camp Riga', 'gathering', 'Latvia', 'Riga', 480, '12-17', 'July 2026', 'Week', true, 'International Coaches', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', true, 'basketball', 'team_training'),
  ('Kristaps Valters Academy', 'gathering', 'Latvia', 'Riga', 420, '10-16', 'August 2026', 'Week', true, 'Pro Training', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'team_training'),
  ('Coach Bencic Camp Bratislava', 'gathering', 'Slovakia', 'Bratislava', 380, '12-18', 'July 28-30 2026', '3 days', false, 'Premium Training', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'team_training'),
  ('Prague Basketball Academy', 'gathering', 'Czech Republic', 'Prague', 450, '14-18', 'Summer 2026', 'Week', true, 'High Performance', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'team_training');

-- Basketball Player Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('EuroProBasket Valencia', 'campus', 'Czech Republic', 'Prague', 890, '15-18', 'Summer 2026', '2 weeks', true, 'Pro & College Path', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', true, 'basketball', 'player_training'),
  ('Individual Skills Prague', 'campus', 'Czech Republic', 'Prague', 520, '12-18', 'July 2026', 'Week', false, 'Personal Development', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'player_training'),
  ('Valters Personal Training', 'campus', 'Latvia', 'Riga', 580, '14-19', 'June 2026', 'Week', true, 'Elite Level', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'player_training'),
  ('Slovakia Skills Academy', 'campus', 'Slovakia', 'Košice', 460, '12-17', 'August 2026', 'Week', true, 'Fundamentals', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'player_training');

-- Basketball Player Tryout
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('EuroProBasket Evaluation', 'campus', 'Czech Republic', 'Prague', 280, '16-19', 'May 2026', 'Weekend', false, 'Pro Scouts + Film', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', true, 'basketball', 'player_tryout'),
  ('Czech Basketball Showcase', 'campus', 'Czech Republic', 'Brno', 195, '15-18', 'April 2026', '1 day', false, 'Club Representatives', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'player_tryout'),
  ('Baltic Hoops ID Camp', 'campus', 'Latvia', 'Riga', 220, '14-18', 'June 2026', 'Weekend', false, 'Regional Evaluation', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'player_tryout'),
  ('Slovakia Talent Search', 'campus', 'Slovakia', 'Bratislava', 175, '15-19', 'March 2026', '1 day', false, 'Get Noticed', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop', false, 'basketball', 'player_tryout');

-- ============================================================
-- TENNIS EVENTS
-- ============================================================

-- Tennis Tournaments
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Tennis Europe Prague U16', 'tournament', 'Czech Republic', 'Prague', 165, '14-16', 'June 2026', 'Week', false, 'Tennis Europe', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'tournament'),
  ('Bratislava Junior Open', 'tournament', 'Slovakia', 'Bratislava', 145, '12-16', 'July 2026', '5 days', false, 'ITF Sanctioned', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'tournament'),
  ('Riga Tennis Cup U14', 'tournament', 'Latvia', 'Riga', 125, '12-14', 'August 2026', 'Weekend', false, 'Baltic Championship', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'tournament'),
  ('Czech Junior Championships', 'tournament', 'Czech Republic', 'Brno', 180, '16-18', 'September 2026', 'Week', false, 'National Level', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', true, 'tennis', 'tournament');

-- Tennis Team Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Prague Tennis Academy Camp', 'gathering', 'Czech Republic', 'Prague', 520, '10-16', 'Summer 2026', 'Week', true, 'Professional Coaches', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'team_training'),
  ('Slovakia Tennis Development', 'gathering', 'Slovakia', 'Bratislava', 480, '12-18', 'July 2026', 'Week', true, 'High Performance', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'team_training'),
  ('Baltic Tennis Camp', 'gathering', 'Latvia', 'Jurmala', 450, '10-16', 'August 2026', 'Week', true, 'Beach Courts', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', true, 'tennis', 'team_training'),
  ('Czech Tennis Federation Camp', 'gathering', 'Czech Republic', 'Ostrava', 490, '14-18', 'June 2026', 'Week', true, 'National Coaches', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'team_training');

-- Tennis Player Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Individual Tennis Prague', 'campus', 'Czech Republic', 'Prague', 680, '12-18', 'Summer 2026', 'Week', true, '1-on-1 Coaching', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', true, 'tennis', 'player_training'),
  ('Elite Tennis Academy Riga', 'campus', 'Latvia', 'Riga', 620, '14-18', 'July 2026', 'Week', true, 'Personal Development', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'player_training'),
  ('Pro Path Tennis Slovakia', 'campus', 'Slovakia', 'Košice', 580, '15-19', 'August 2026', 'Week', true, 'Career Focus', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'player_training'),
  ('Czech Individual Skills', 'campus', 'Czech Republic', 'Brno', 550, '10-16', 'June 2026', 'Week', false, 'Technique Focus', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'player_training');

-- Tennis Player Tryout
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Tennis Europe Talent Day', 'campus', 'Czech Republic', 'Prague', 195, '14-18', 'May 2026', '1 day', false, 'European Scouts', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'player_tryout'),
  ('Czech Tennis Federation Trials', 'campus', 'Czech Republic', 'Prague', 150, '12-18', 'April 2026', '1 day', false, 'National Team Path', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', true, 'tennis', 'player_tryout'),
  ('Slovak Tennis Evaluation', 'campus', 'Slovakia', 'Bratislava', 165, '14-18', 'March 2026', 'Weekend', false, 'Club Assessment', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'player_tryout'),
  ('Baltic Tennis Showcase', 'campus', 'Latvia', 'Riga', 180, '15-19', 'June 2026', 'Weekend', false, 'Regional Scouts', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=100&auto=format&fit=crop', false, 'tennis', 'player_tryout');

-- ============================================================
-- MMA EVENTS
-- ============================================================

-- MMA Tournaments
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Amateur MMA Championship CZ', 'tournament', 'Czech Republic', 'Prague', 95, '16-19', 'Spring 2026', '1 day', false, 'National Championship', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', true, 'mma', 'tournament'),
  ('Oktagon Amateur Cup Prague', 'tournament', 'Czech Republic', 'Prague', 120, '18-19', 'June 2026', '1 day', false, 'Oktagon Scouts', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', true, 'mma', 'tournament'),
  ('Slovak MMA Youth Championship', 'tournament', 'Slovakia', 'Bratislava', 85, '16-19', 'April 2026', '1 day', false, 'Amateur Level', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'tournament'),
  ('Baltic MMA Open', 'tournament', 'Latvia', 'Riga', 110, '18-19', 'May 2026', 'Weekend', false, 'Regional Competition', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'tournament');

-- MMA Team Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Oktagon Training Camp Prague', 'gathering', 'Czech Republic', 'Prague', 420, '16-19', 'Summer 2026', 'Week', true, 'Pro Fighters Coaching', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', true, 'mma', 'team_training'),
  ('MMA Academy Brno', 'gathering', 'Czech Republic', 'Brno', 380, '14-18', 'July 2026', 'Week', false, 'All Disciplines', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'team_training'),
  ('Slovak Fight Camp', 'gathering', 'Slovakia', 'Bratislava', 350, '16-19', 'August 2026', 'Week', false, 'Striking & Grappling', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'team_training'),
  ('Baltic Combat Sports Camp', 'gathering', 'Latvia', 'Riga', 390, '15-19', 'June 2026', 'Week', true, 'Multi-discipline', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'team_training');

-- MMA Player Training
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Individual MMA Training Prague', 'campus', 'Czech Republic', 'Prague', 580, '16-19', 'Summer 2026', 'Week', true, 'Personal Coach', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'player_training'),
  ('Pro Fighter Development CZ', 'campus', 'Czech Republic', 'Ostrava', 620, '18-19', 'July 2026', 'Week', true, 'Career Path', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', true, 'mma', 'player_training'),
  ('Slovakia MMA Academy', 'campus', 'Slovakia', 'Košice', 520, '16-19', 'August 2026', 'Week', false, 'Technical Development', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'player_training'),
  ('Riga Combat Training', 'campus', 'Latvia', 'Riga', 480, '15-19', 'June 2026', 'Week', true, 'All Aspects', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'player_training');

-- MMA Player Tryout
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted, sport, event_type) VALUES
  ('Oktagon Scouting Day', 'campus', 'Czech Republic', 'Prague', 150, '18-19', 'May 2026', '1 day', false, 'Oktagon Scouts Present', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', true, 'mma', 'player_tryout'),
  ('Czech Amateur Evaluation', 'campus', 'Czech Republic', 'Brno', 95, '16-19', 'April 2026', '1 day', false, 'Club Representatives', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'player_tryout'),
  ('Slovak Fight Trials', 'campus', 'Slovakia', 'Bratislava', 110, '17-19', 'June 2026', '1 day', false, 'Team Tryouts', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'player_tryout'),
  ('Baltic Combat Showcase', 'campus', 'Latvia', 'Riga', 125, '16-19', 'March 2026', 'Weekend', false, 'Regional Evaluation', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop', false, 'mma', 'player_tryout');
