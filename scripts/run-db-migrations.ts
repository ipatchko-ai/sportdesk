import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigrations() {
  console.log('🚀 Running migrations...\n')

  try {
    // Migration 1: Add status column
    console.log('📝 Adding status column...')
    const { error: statusError } = await supabase.rpc('exec', {
      sql: `
        ALTER TABLE tournaments
        ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';

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

        ALTER TABLE tournaments
        ADD COLUMN IF NOT EXISTS user_id UUID;

        UPDATE tournaments SET status = 'published' WHERE status IS NULL;
      `
    })

    if (statusError) {
      console.error('❌ Error adding status column:', statusError.message)
    } else {
      console.log('✅ Status column added successfully')
    }

    // Migration 2: Create applicants table
    console.log('📝 Creating applicants table...')
    const { error: applicantsError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS applicants (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_applicants_tournament_id ON applicants(tournament_id);
        CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON applicants(created_at DESC);
      `
    })

    if (applicantsError) {
      console.error('❌ Error creating applicants table:', applicantsError.message)
    } else {
      console.log('✅ Applicants table created successfully')
    }

    console.log('\n✅ All migrations completed')
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

runMigrations()
