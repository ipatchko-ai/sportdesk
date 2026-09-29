-- Rename player_tryout to player_trials in event_type column

-- Update all existing records
UPDATE tournaments
SET event_type = 'player_trials'
WHERE event_type = 'player_tryout';

-- Drop old constraint
ALTER TABLE tournaments
DROP CONSTRAINT IF EXISTS event_type_check;

-- Add new constraint with updated value
ALTER TABLE tournaments
ADD CONSTRAINT event_type_check
CHECK (event_type IN ('tournament', 'team_training', 'player_training', 'player_trials'));
