-- Add sport and event_type columns to tournaments table

ALTER TABLE tournaments
ADD COLUMN sport TEXT NOT NULL DEFAULT 'football',
ADD COLUMN event_type TEXT NOT NULL DEFAULT 'tournament';

-- Add check constraints
ALTER TABLE tournaments
ADD CONSTRAINT sport_check CHECK (sport IN ('football', 'hockey', 'basketball', 'tennis', 'mma'));

ALTER TABLE tournaments
ADD CONSTRAINT event_type_check CHECK (event_type IN ('tournament', 'team_training', 'player_training', 'player_tryout'));

-- Update existing records
UPDATE tournaments SET sport = 'football', event_type = 'tournament' WHERE category = 'tournament';
UPDATE tournaments SET sport = 'football', event_type = 'team_training' WHERE category = 'gathering';
UPDATE tournaments SET sport = 'football', event_type = 'player_training' WHERE category = 'campus';

-- Create indexes for better query performance
CREATE INDEX idx_tournaments_sport ON tournaments(sport);
CREATE INDEX idx_tournaments_event_type ON tournaments(event_type);
