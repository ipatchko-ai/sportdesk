import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateDurationConstraint() {
  console.log('🔧 Updating duration constraint...')

  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      ALTER TABLE tournaments DROP CONSTRAINT IF EXISTS tournaments_duration_check;
      ALTER TABLE tournaments ADD CONSTRAINT tournaments_duration_check CHECK (duration IN ('1 day', 'Weekend', 'Week', '2 weeks', '3 days', '5 days'));
    `
  })

  if (error) {
    console.error('Error updating constraint:', error)
    console.log('\n📝 Please run this SQL manually in Supabase Dashboard SQL Editor:')
    console.log(`
ALTER TABLE tournaments DROP CONSTRAINT IF EXISTS tournaments_duration_check;
ALTER TABLE tournaments ADD CONSTRAINT tournaments_duration_check CHECK (duration IN ('1 day', 'Weekend', 'Week', '2 weeks', '3 days', '5 days'));
    `)
    return false
  }

  console.log('✅ Duration constraint updated')
  return true
}

updateDurationConstraint()
  .then((success) => {
    if (success) {
      console.log('\n✨ Done!')
    } else {
      console.log('\n⚠️  Please update manually and then run load-real-events.ts')
    }
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
