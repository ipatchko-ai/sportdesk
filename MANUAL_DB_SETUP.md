# Manual Database Setup Instructions

Since automated migration didn't work, follow these steps:

## Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com/dashboard/project/ydnmberrpebsebtpunoi
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

## Step 2: Run Migration SQL

Copy and paste the entire content from `supabase/migrations/001_initial_schema.sql` into the SQL editor and click "Run".

**File location:** `supabase/migrations/001_initial_schema.sql`

This will create:
- `tournaments` table with all fields and constraints
- `profiles` table for users
- Indexes for performance
- Row Level Security policies

## Step 3: Run Seed Data

After the migration succeeds, copy and paste the content from `supabase/seed.sql` and click "Run".

**File location:** `supabase/seed.sql`

This will insert 10 tournaments:
- 4 from original site (Senica, Prague, Ružomberok, Jablonec)
- 6 additional tournaments for variety

## Step 4: Verify

Run this query to verify:

```sql
SELECT COUNT(*) FROM tournaments;
-- Should return: 10

SELECT * FROM tournaments LIMIT 3;
-- Should show tournament data
```

## Alternative: Use Supabase Dashboard

1. Go to "Table Editor"
2. Click "Create a new table"
3. Name it `tournaments`
4. Add columns manually (see schema in migration file)

---

**Next:** After tables are created, we can test the Next.js app with `npm run dev`
