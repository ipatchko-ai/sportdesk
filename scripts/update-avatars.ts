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

async function updateAvatars() {
  try {
    // Update football sport images with thematic football photos
    const footballResult = await supabase
      .from('tournaments')
      .update({ logo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=100&auto=format&fit=crop' })
      .eq('sport', 'football')

    if (footballResult.error) {
      console.error('Error updating football avatars:', footballResult.error.message)
    } else {
      console.log('✅ Football avatars updated')
    }

    // Update MMA sport images with fighting octagon photo
    const mmaResult = await supabase
      .from('tournaments')
      .update({ logo_url: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop' })
      .eq('sport', 'mma')

    if (mmaResult.error) {
      console.error('Error updating MMA avatars:', mmaResult.error.message)
    } else {
      console.log('✅ MMA avatars updated')
    }

    console.log('✅ All sport avatars updated successfully')
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

updateAvatars()
