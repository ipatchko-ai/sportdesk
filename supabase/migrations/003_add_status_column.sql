-- Add status column to tournaments table
-- Status: draft (черновик), published (опубликован), deleted (удален)

ALTER TABLE tournaments
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft'
CHECK (status IN ('draft', 'published', 'deleted'));

-- Add user_id column to track tournament owner
ALTER TABLE tournaments
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Update existing tournaments to published status
UPDATE tournaments SET status = 'published' WHERE status IS NULL;
