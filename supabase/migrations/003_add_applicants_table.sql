-- Add applicants table for tracking tournament applications
CREATE TABLE IF NOT EXISTS applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index for faster lookups by tournament
CREATE INDEX IF NOT EXISTS idx_applicants_tournament_id ON applicants(tournament_id);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_applicants_email ON applicants(parent_email);
