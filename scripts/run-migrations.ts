import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

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

async function runMigration(filename: string) {
  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', filename)

  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ Migration file not found: ${filename}`)
    return false
  }

  const sql = fs.readFileSync(migrationPath, 'utf-8')

  try {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql })

    if (error) {
      console.error(`❌ Error running ${filename}:`, error.message)
      return false
    }

    console.log(`✅ Migration ${filename} completed successfully`)
    return true
  } catch (err) {
    console.error(`❌ Unexpected error running ${filename}:`, err)
    return false
  }
}

async function runAllMigrations() {
  console.log('🚀 Running migrations...\n')

  const migrations = [
    '003_add_status_column.sql',
    '004_create_applicants_table.sql'
  ]

  for (const migration of migrations) {
    await runMigration(migration)
  }

  console.log('\n✅ All migrations completed')
}

runAllMigrations()
