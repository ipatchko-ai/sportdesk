-- Update duration constraint to support more values
ALTER TABLE tournaments DROP CONSTRAINT IF EXISTS tournaments_duration_check;
ALTER TABLE tournaments ADD CONSTRAINT tournaments_duration_check CHECK (duration IN ('1 day', 'Weekend', 'Week', '2 weeks', '3 days', '5 days'));
