import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function loadRealEvents() {
  console.log('🗑️  Clearing existing tournaments...')

  // Delete all existing tournaments
  const { error: deleteError } = await supabase
    .from('tournaments')
    .delete()
    .neq('id', 0) // Delete all rows

  if (deleteError) {
    console.error('Error deleting tournaments:', deleteError)
    throw deleteError
  }

  console.log('✅ Existing data cleared\n')

  const events = [
    // ============================================================
    // FOOTBALL EVENTS (17 events)
    // ============================================================

    // Football Tournaments (5)
    { name: 'Riga Cup', category: 'tournament', country: 'Latvia', city: 'Riga', price: 195, age_group: '10-14', dates: 'January 2027', duration: 'Week', meals_included: true, extra: 'Winter Tournament', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'football', event_type: 'tournament' },
    { name: 'Ventspils Cup', category: 'tournament', country: 'Latvia', city: 'Ventspils', price: 145, age_group: '8-12', dates: 'May 18 2026', duration: 'Weekend', meals_included: false, extra: '2000+ participants', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'tournament' },
    { name: 'Sparta Prague Youth Cup', category: 'tournament', country: 'Czech Republic', city: 'Prague', price: 220, age_group: '14-18', dates: 'July 2026', duration: 'Week', meals_included: true, extra: 'Stadium Tour', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'football', event_type: 'tournament' },
    { name: 'Bohemians Prague 1905', category: 'tournament', country: 'Czech Republic', city: 'Prague', price: 180, age_group: '10-14', dates: 'December 2026', duration: 'Week', meals_included: true, extra: 'Stadium Tour', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'tournament' },
    { name: 'Senica Youth Weekend', category: 'tournament', country: 'Slovakia', city: 'Senica', price: 77, age_group: '8-12', dates: 'November 2026', duration: 'Weekend', meals_included: false, extra: null, logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'tournament' },

    // Football Team Training (4)
    { name: 'AC Milan Junior Camp Prague', category: 'gathering', country: 'Czech Republic', city: 'Prague', price: 450, age_group: '10-14', dates: 'July 14-18 2026', duration: 'Week', meals_included: true, extra: 'AC Milan Coaches', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'football', event_type: 'team_training' },
    { name: 'AC Milan Junior Camp Slovakia', category: 'gathering', country: 'Slovakia', city: 'Rovinka', price: 420, age_group: '10-14', dates: 'July 21-25 2026', duration: 'Week', meals_included: true, extra: 'AC Milan Coaches', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'team_training' },
    { name: 'MSM Football Academy', category: 'gathering', country: 'Czech Republic', city: 'Prague', price: 380, age_group: '14-18', dates: 'August 2026', duration: 'Week', meals_included: true, extra: 'Career Development', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'team_training' },
    { name: 'Baltic Football League Camp', category: 'gathering', country: 'Latvia', city: 'Riga', price: 295, age_group: '12-16', dates: 'June 2026', duration: 'Week', meals_included: true, extra: 'Multi-nation', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'team_training' },

    // Football Player Training (4)
    { name: 'SK Slavia Praha Academy', category: 'campus', country: 'Czech Republic', city: 'Prague', price: 350, age_group: '8-15', dates: 'Summer 2026', duration: 'Week', meals_included: true, extra: 'Eden Training Centre', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'football', event_type: 'player_training' },
    { name: 'DTFS Cross-Border Academy', category: 'campus', country: 'Czech Republic', city: 'Border Region', price: 280, age_group: '10-14', dates: 'July 2026', duration: 'Week', meals_included: false, extra: 'German-Czech', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'player_training' },
    { name: 'MSM Individual Development', category: 'campus', country: 'Slovakia', city: 'Bratislava', price: 320, age_group: '14-18', dates: 'August 2026', duration: 'Week', meals_included: true, extra: 'Professional Path', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'player_training' },
    { name: 'Latvia Youth Academy', category: 'campus', country: 'Latvia', city: 'Riga', price: 260, age_group: '10-14', dates: 'June 2026', duration: 'Week', meals_included: true, extra: 'UEFA Licensed', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'player_training' },

    // Football Player Tryout (4)
    { name: 'European Scout Combine', category: 'campus', country: 'Czech Republic', city: 'Prague', price: 195, age_group: '16-19', dates: 'March 30 2026', duration: '1 day', meals_included: false, extra: 'Pro Scouts Present', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'football', event_type: 'player_tryout' },
    { name: 'Scoutline Prague Showcase', category: 'campus', country: 'Czech Republic', city: 'Prague', price: 150, age_group: '14-18', dates: 'April 2026', duration: 'Weekend', meals_included: false, extra: 'Get Signed', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'player_tryout' },
    { name: 'IFX Slovakia Trials', category: 'campus', country: 'Slovakia', city: 'Bratislava', price: 175, age_group: '15-19', dates: 'May 2026', duration: 'Weekend', meals_included: false, extra: 'Club Scouts', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'player_tryout' },
    { name: 'Baltic Player ID Search', category: 'campus', country: 'Latvia', city: 'Riga', price: 120, age_group: '14-18', dates: 'June 2026', duration: '1 day', meals_included: false, extra: 'Talent ID', logo_url: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'football', event_type: 'player_tryout' },

    // ============================================================
    // HOCKEY EVENTS (16 events)
    // ============================================================

    // Hockey Tournaments (4)
    { name: 'IIHF U18 World Championship', category: 'tournament', country: 'Slovakia', city: 'Trenčín', price: 280, age_group: '16-18', dates: 'April 22-May 2 2026', duration: '2 weeks', meals_included: true, extra: 'World Championship', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'hockey', event_type: 'tournament' },
    { name: 'Riga Hockey Cup', category: 'tournament', country: 'Latvia', city: 'Riga', price: 195, age_group: '12-16', dates: 'December 2026', duration: 'Week', meals_included: true, extra: 'International Teams', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'tournament' },
    { name: 'Prague Hockey Tournament', category: 'tournament', country: 'Czech Republic', city: 'Prague', price: 165, age_group: '10-14', dates: 'January 2027', duration: 'Weekend', meals_included: false, extra: 'Elite Competition', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'tournament' },
    { name: 'Bratislava Ice Cup', category: 'tournament', country: 'Slovakia', city: 'Bratislava', price: 145, age_group: '14-18', dates: 'February 2027', duration: 'Weekend', meals_included: false, extra: null, logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'tournament' },

    // Hockey Team Training (4)
    { name: 'Czech International Hockey Camp', category: 'gathering', country: 'Czech Republic', city: 'Prague', price: 520, age_group: '12-16', dates: 'July 2026', duration: 'Week', meals_included: true, extra: '75min sessions x2', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'hockey', event_type: 'team_training' },
    { name: 'Druzhba78 Power Skating', category: 'gathering', country: 'Slovakia', city: 'Bratislava', price: 480, age_group: '10-16', dates: 'August 2026', duration: 'Week', meals_included: true, extra: 'Elite Coaching', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'team_training' },
    { name: 'Pro Hockey Europe Camp', category: 'gathering', country: 'Czech Republic', city: 'Brno', price: 550, age_group: '14-18', dates: 'July-August 2026', duration: '2 weeks', meals_included: true, extra: 'Rotating Coaches', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'team_training' },
    { name: 'Baltic Hockey Development', category: 'gathering', country: 'Latvia', city: 'Riga', price: 420, age_group: '12-16', dates: 'June 2026', duration: 'Week', meals_included: true, extra: 'International', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'team_training' },

    // Hockey Player Training (4)
    { name: 'Hockey Camp Prague Individual', category: 'campus', country: 'Czech Republic', city: 'Prague', price: 650, age_group: '14-18', dates: 'May 2026', duration: 'Week', meals_included: true, extra: '5 on-ice sessions', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'hockey', event_type: 'player_training' },
    { name: 'ELGRAFF Individual Development', category: 'campus', country: 'Czech Republic', city: 'Various', price: 580, age_group: '12-18', dates: 'Summer 2026', duration: 'Week', meals_included: true, extra: 'European Methods', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'player_training' },
    { name: 'Hockey4u Personal Training', category: 'campus', country: 'Czech Republic', city: 'Prague', price: 520, age_group: '10-16', dates: 'July 2026', duration: 'Week', meals_included: false, extra: 'Since 2012', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'player_training' },
    { name: 'Hockey-Europe Premium', category: 'campus', country: 'Czech Republic', city: 'Prague', price: 890, age_group: '16-19', dates: 'March 2026', duration: '5 days', meals_included: true, extra: '2 players max on ice', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: true, sport: 'hockey', event_type: 'player_training' },

    // Hockey Player Tryout (4)
    { name: 'Pro Ambitions Showcase', category: 'campus', country: 'Czech Republic', city: 'Prague', price: 220, age_group: '15-19', dates: 'Summer 2026', duration: 'Weekend', meals_included: false, extra: 'European Scouts', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'player_tryout' },
    { name: 'Czech Hockey Evaluation', category: 'campus', country: 'Czech Republic', city: 'Brno', price: 180, age_group: '14-18', dates: 'June 2026', duration: '1 day', meals_included: false, extra: 'Club Representatives', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'player_tryout' },
    { name: 'Slovakia Hockey Trials', category: 'campus', country: 'Slovakia', city: 'Bratislava', price: 160, age_group: '16-19', dates: 'April 2026', duration: 'Weekend', meals_included: false, extra: 'Pro Path', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'player_tryout' },
    { name: 'Baltic Ice Hockey Combine', category: 'campus', country: 'Latvia', city: 'Riga', price: 195, age_group: '15-18', dates: 'May 2026', duration: 'Weekend', meals_included: false, extra: 'Regional Scouts', logo_url: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop', promoted: false, sport: 'hockey', event_type: 'player_tryout' },
  ]

  console.log(`📥 Inserting ${events.length} events into database...`)

  // Insert in batches of 10
  for (let i = 0; i < events.length; i += 10) {
    const batch = events.slice(i, i + 10)
    const { data, error } = await supabase
      .from('tournaments')
      .insert(batch)
      .select()

    if (error) {
      console.error(`Error inserting batch ${i / 10 + 1}:`, error)
      throw error
    }

    console.log(`✅ Inserted batch ${i / 10 + 1} (${data.length} events)`)
  }

  console.log(`\n🎉 Successfully loaded ${events.length} real events!`)
  console.log('\n📊 Summary:')
  console.log('   - Football: 17 events')
  console.log('   - Hockey: 16 events')
  console.log('   - Basketball: 16 events (in next batch)')
  console.log('   - Tennis: 16 events (in next batch)')
  console.log('   - MMA: 16 events (in next batch)')
}

loadRealEvents()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
