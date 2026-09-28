-- Create applicants table for tracking tournament applications
-- Each tournament can have multiple applicants

CREATE TABLE IF NOT EXISTS applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);

-- Index for faster queries by tournament
CREATE INDEX IF NOT EXISTS idx_applicants_tournament_id ON applicants(tournament_id);

-- Index for filtering by creation date
CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON applicants(created_at DESC);
