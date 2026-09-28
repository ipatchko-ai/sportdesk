import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
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

async function runMigration() {
  try {
    console.log('📦 Running migration: 002_add_sport_type.sql')

    // Step 1: Check if columns exist
    const { data: columns } = await supabase
      .from('tournaments')
      .select('*')
      .limit(1)

    console.log('➡️  Current columns:', columns ? Object.keys(columns[0] || {}) : [])

    // Step 2: Update existing records (using the JS client API)
    console.log('➡️  Updating existing tournament records...')
    await supabase.from('tournaments').update({ sport: 'football', event_type: 'tournament' }).eq('category', 'tournament')

    console.log('➡️  Updating existing gathering records...')
    await supabase.from('tournaments').update({ sport: 'football', event_type: 'team_training' }).eq('category', 'gathering')

    console.log('➡️  Updating existing campus records...')
    await supabase.from('tournaments').update({ sport: 'football', event_type: 'player_training' }).eq('category', 'campus')

    console.log('✅ Migration completed successfully!')
    console.log('Note: Run the SQL migration directly in Supabase dashboard for schema changes (ALTER TABLE, constraints, indexes)')

  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

runMigration()
