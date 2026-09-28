const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
const envFile = fs.readFileSync(envPath, 'utf-8')
const envVars = {}
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    envVars[key.trim()] = value.trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!')
  process.exit(1)
}

// Create client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function applyMigrations() {
  console.log('🗄️  Applying database migrations...\n')

  const migrationFile = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql')
  const migrationSQL = fs.readFileSync(migrationFile, 'utf-8')

  console.log('📄 Migration SQL:\n')
  console.log(migrationSQL)
  console.log('\n' + '='.repeat(80) + '\n')

  // Try using Supabase REST API to execute raw SQL
  const { data, error } = await supabase.rpc('exec', { sql: migrationSQL })

  if (error) {
    console.error('❌ Error applying migration:', error.message)
    console.log('\n⚠️  The migration failed. Please apply it manually:')
    console.log('1. Go to: https://supabase.com/dashboard/project/ydnmberrpebsebtpunoi/editor')
    console.log('2. Open SQL Editor')
    console.log('3. Copy the SQL from: supabase/migrations/001_initial_schema.sql')
    console.log('4. Paste and run it\n')
    return false
  }

  console.log('✅ Migration applied successfully!\n')
  return true
}

async function insertSeedData() {
  console.log('📊 Inserting seed data...\n')

  const tournaments = [
    { name: 'Senica Youth Weekend', category: 'tournament', country: 'Словакия', city: 'Senica', price: 77, age_group: '8-12', dates: 'November', duration: 'Weekend', meals_included: false, extra: null, logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false },
    { name: 'Bohemians Prague 1905', category: 'tournament', country: 'Чехия', city: 'Prague', price: 180, age_group: '10-14', dates: 'December', duration: 'Week', meals_included: true, extra: 'Stadium Tour', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true },
    { name: 'Ružomberok Mountain ID', category: 'tournament', country: 'Словакия', city: 'Ružomberok', price: 165, age_group: '10-14', dates: 'September', duration: 'Weekend', meals_included: true, extra: 'Hiking', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false },
    { name: 'Jablonec Northern Stars', category: 'tournament', country: 'Чехия', city: 'Jablonec', price: 135, age_group: '8-12', dates: 'August', duration: 'Weekend', meals_included: true, extra: null, logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false },
    { name: 'Sparta Prague Youth Cup', category: 'tournament', country: 'Чехия', city: 'Prague', price: 220, age_group: '14-18', dates: 'July', duration: 'Week', meals_included: true, extra: 'Stadium Tour', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true },
    { name: 'Trenčín Summer Camp', category: 'gathering', country: 'Словакия', city: 'Trenčín', price: 150, age_group: '10-14', dates: 'June', duration: 'Week', meals_included: true, extra: null, logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false },
    { name: 'Brno Soccer Campus', category: 'campus', country: 'Чехия', city: 'Brno', price: 195, age_group: '8-12', dates: 'August', duration: 'Week', meals_included: true, extra: 'Swimming Pool', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false },
    { name: 'Košice Elite Training', category: 'gathering', country: 'Словакия', city: 'Košice', price: 145, age_group: '14-18', dates: 'July', duration: 'Weekend', meals_included: false, extra: null, logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false },
    { name: 'Ostrava Football Academy', category: 'campus', country: 'Чехия', city: 'Ostrava', price: 210, age_group: '10-14', dates: 'September', duration: 'Week', meals_included: true, extra: 'Gym Access', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true },
    { name: 'Nitra One Day Cup', category: 'tournament', country: 'Словакия', city: 'Nitra', price: 45, age_group: '8-12', dates: 'October', duration: '1 day', meals_included: false, extra: null, logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false },
  ]

  const { data, error } = await supabase
    .from('tournaments')
    .insert(tournaments)
    .select()

  if (error) {
    console.error('❌ Error inserting seed data:', error.message)
    console.log('Details:', error)
    return false
  }

  console.log(`✅ Inserted ${data.length} tournaments\n`)
  return true
}

async function verifySetup() {
  console.log('🔍 Verifying database setup...\n')

  const { data, error, count } = await supabase
    .from('tournaments')
    .select('*', { count: 'exact' })

  if (error) {
    console.error('❌ Error querying tournaments:', error.message)
    return false
  }

  console.log(`✅ Found ${count} tournaments in database`)

  if (data && data.length > 0) {
    console.log('\n📋 Sample tournaments:')
    data.slice(0, 3).forEach(t => {
      console.log(`  - ${t.name} (${t.category}) - €${t.price}`)
    })
  }

  return true
}

async function main() {
  console.log('🚀 Database Setup Script\n')

  // Try to apply migration
  const migrationSuccess = await applyMigrations()

  if (!migrationSuccess) {
    console.log('\n⏸️  Skipping seed data insertion until migration is applied manually\n')
    return
  }

  // Insert seed data
  const seedSuccess = await insertSeedData()

  if (!seedSuccess) {
    console.log('\n⚠️  Seed data insertion failed\n')
    return
  }

  // Verify everything works
  await verifySetup()

  console.log('\n🎉 Database setup complete!\n')
  console.log('Next step: Run `npm run dev` to start the development server\n')
}

main().catch(err => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
