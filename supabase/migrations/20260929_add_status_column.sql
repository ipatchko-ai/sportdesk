-- Add status column to tournaments table
ALTER TABLE tournaments
ADD COLUMN status TEXT NOT NULL DEFAULT 'draft'
CHECK (status IN ('draft', 'published', 'deleted'));

-- Create index for faster filtering
CREATE INDEX idx_tournaments_status ON tournaments(status);

-- Update existing records to 'published' so they appear on the site
UPDATE tournaments SET status = 'published' WHERE status = 'draft';
