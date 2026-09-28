-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tournament', 'gathering', 'campus')),
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  price INTEGER NOT NULL,
  age_group TEXT NOT NULL,
  dates TEXT NOT NULL,
  duration TEXT NOT NULL CHECK (duration IN ('1 day', 'Weekend', 'Week')),
  meals_included BOOLEAN DEFAULT false,
  extra TEXT,
  logo_url TEXT,
  promoted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tournaments_category ON tournaments(category);
CREATE INDEX IF NOT EXISTS idx_tournaments_country ON tournaments(country);
CREATE INDEX IF NOT EXISTS idx_tournaments_price ON tournaments(price);
CREATE INDEX IF NOT EXISTS idx_tournaments_created_at ON tournaments(created_at);

-- Enable Row Level Security
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to tournaments
CREATE POLICY "Allow public read access"
  ON tournaments FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to insert tournaments (for future admin panel)
CREATE POLICY "Allow authenticated insert"
  ON tournaments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update tournaments
CREATE POLICY "Allow authenticated update"
  ON tournaments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create profiles table for users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
