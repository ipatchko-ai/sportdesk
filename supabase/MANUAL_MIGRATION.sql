-- Run these migrations in Supabase SQL Editor
-- Dashboard -> SQL Editor -> New Query

-- Migration 1: Add status and user_id columns to tournaments
ALTER TABLE tournaments
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';

ALTER TABLE tournaments
ADD COLUMN IF NOT EXISTS user_id UUID;

-- Add constraint for status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'tournaments_status_check'
  ) THEN
    ALTER TABLE tournaments
    ADD CONSTRAINT tournaments_status_check
    CHECK (status IN ('draft', 'published', 'deleted'));
  END IF;
END $$;

-- Update existing tournaments to published status
UPDATE tournaments SET status = 'published' WHERE status IS NULL;

-- Migration 2: Create applicants table
CREATE TABLE IF NOT EXISTS applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_applicants_tournament_id ON applicants(tournament_id);
CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON applicants(created_at DESC);
