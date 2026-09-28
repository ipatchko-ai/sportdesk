# Database Setup Instructions

⚠️ **Automated migration failed.** Please apply manually:

## Step 1: Open Supabase SQL Editor

Go to: https://supabase.com/dashboard/project/ydnmberrpebsebtpunoi/editor

Click **"New Query"** or **"SQL Editor"**

## Step 2: Copy and Run Migration

**Copy this entire SQL block:**

```sql
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
```

**Paste into SQL Editor and click "RUN"** (or press Ctrl+Enter)

## Step 3: Run Seed Data

After migration succeeds, run this SQL:

```sql
INSERT INTO tournaments (name, category, country, city, price, age_group, dates, duration, meals_included, extra, logo_url, promoted) VALUES
  ('Senica Youth Weekend', 'tournament', 'Словакия', 'Senica', 77, '8-12', 'November', 'Weekend', false, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Bohemians Prague 1905', 'tournament', 'Чехия', 'Prague', 180, '10-14', 'December', 'Week', true, 'Stadium Tour', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true),
  ('Ružomberok Mountain ID', 'tournament', 'Словакия', 'Ružomberok', 165, '10-14', 'September', 'Weekend', true, 'Hiking', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Jablonec Northern Stars', 'tournament', 'Чехия', 'Jablonec', 135, '8-12', 'August', 'Weekend', true, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Sparta Prague Youth Cup', 'tournament', 'Чехия', 'Prague', 220, '14-18', 'July', 'Week', true, 'Stadium Tour', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true),
  ('Trenčín Summer Camp', 'gathering', 'Словакия', 'Trenčín', 150, '10-14', 'June', 'Week', true, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Brno Soccer Campus', 'campus', 'Чехия', 'Brno', 195, '8-12', 'August', 'Week', true, 'Swimming Pool', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Košice Elite Training', 'gathering', 'Словакия', 'Košice', 145, '14-18', 'July', 'Weekend', false, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false),
  ('Ostrava Football Academy', 'campus', 'Чехия', 'Ostrava', 210, '10-14', 'September', 'Week', true, 'Gym Access', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', true),
  ('Nitra One Day Cup', 'tournament', 'Словакия', 'Nitra', 45, '8-12', 'October', '1 day', false, null, 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', false);
```

## Step 4: Verify

Run this query to check:

```sql
SELECT COUNT(*) FROM tournaments;
-- Should return: 10

SELECT name, category, price FROM tournaments LIMIT 5;
-- Should show tournament data
```

## After Completion

Once you've run both SQL blocks in Supabase Dashboard, run this command to verify from Node.js:

```bash
node tools/verify-db.js
```

---

**Next:** After database is ready, we'll create Next.js pages and components (Phase 5)
