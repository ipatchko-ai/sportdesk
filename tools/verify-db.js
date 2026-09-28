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
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyDatabase() {
  console.log('🔍 Verifying database setup...\n')

  // Check tournaments table exists and has data
  const { data, error, count } = await supabase
    .from('tournaments')
    .select('*', { count: 'exact' })

  if (error) {
    console.error('❌ Error querying tournaments:', error.message)
    console.log('\n⚠️  Database is not ready. Please follow instructions in DB_SETUP_INSTRUCTIONS.md\n')
    process.exit(1)
  }

  console.log(`✅ Found ${count} tournaments in database\n`)

  if (data && data.length > 0) {
    console.log('📋 Sample tournaments:')
    data.slice(0, 5).forEach(t => {
      console.log(`  - ${t.name} (${t.category}, ${t.country}) - €${t.price}`)
    })
    console.log()
  }

  // Test filtering
  console.log('🧪 Testing filters...\n')

  const { data: czTournaments } = await supabase
    .from('tournaments')
    .select('name, country')
    .eq('country', 'Чехия')

  console.log(`✅ Filter by country (Чехия): ${czTournaments?.length || 0} results`)

  const { data: weekendTournaments } = await supabase
    .from('tournaments')
    .select('name, duration')
    .eq('duration', 'Weekend')

  console.log(`✅ Filter by duration (Weekend): ${weekendTournaments?.length || 0} results`)

  const { data: withMeals } = await supabase
    .from('tournaments')
    .select('name, meals_included')
    .eq('meals_included', true)

  console.log(`✅ Filter by meals: ${withMeals?.length || 0} results`)

  console.log('\n🎉 Database is ready!\n')
  console.log('Next step: Run `npm run dev` to start development server\n')
}

verifyDatabase().catch(err => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
