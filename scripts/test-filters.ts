import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function testFilters() {
  console.log('🧪 Testing filter combinations...\n')

  const testCases = [
    { event_type: 'tournament', sport: 'football', label: 'Football Tournaments' },
    { event_type: 'team_training', sport: 'football', label: 'Football Team Training' },
    { event_type: 'player_training', sport: 'hockey', label: 'Hockey Player Training' },
    { event_type: 'player_tryout', sport: 'basketball', label: 'Basketball Player Tryout' },
    { event_type: 'tournament', sport: 'tennis', label: 'Tennis Tournaments' },
    { event_type: 'team_training', sport: 'mma', label: 'MMA Team Training' },
  ]

  for (const testCase of testCases) {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('event_type', testCase.event_type)
      .eq('sport', testCase.sport)
      .order('price', { ascending: true })

    if (error) {
      console.error(`❌ ${testCase.label}: Error`, error)
      continue
    }

    console.log(`✅ ${testCase.label}: ${data.length} events`)
    if (data.length > 0) {
      console.log(`   Sample: "${data[0].name}" in ${data[0].city}, ${data[0].country} - €${data[0].price}`)
    }
    console.log('')
  }

  // Check total counts by sport
  console.log('📊 Total events by sport:')
  const sports = ['football', 'hockey', 'basketball', 'tennis', 'mma']

  for (const sport of sports) {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*', { count: 'exact', head: true })
      .eq('sport', sport)

    if (!error && data !== null) {
      console.log(`   ${sport}: ${(data as any).count || 0} events`)
    }
  }

  console.log('\n📊 Total events by type:')
  const types = ['tournament', 'team_training', 'player_training', 'player_tryout']

  for (const type of types) {
    const { count, error } = await supabase
      .from('tournaments')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', type)

    if (!error) {
      console.log(`   ${type}: ${count || 0} events`)
    }
  }

  // Total count
  const { count: totalCount } = await supabase
    .from('tournaments')
    .select('*', { count: 'exact', head: true })

  console.log(`\n🎉 Total events in database: ${totalCount}`)
}

testFilters()
  .then(() => {
    console.log('\n✨ Filter test complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
