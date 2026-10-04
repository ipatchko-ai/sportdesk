import { Tournament, SearchParams } from './types'
import { supabase } from './supabase'

export async function fetchTournaments(params: SearchParams): Promise<Tournament[]> {
  let query = supabase
    .from('tournaments')
    .select('*')
    .eq('status', 'published')

  // Filter by event type (new primary filter)
  if (params.event_type) {
    query = query.eq('event_type', params.event_type)
  }

  // Filter by sport (new secondary filter)
  if (params.sport) {
    query = query.eq('sport', params.sport)
  }

  // Legacy category filter (for backward compatibility)
  if (params.category) {
    query = query.eq('category', params.category)
  }

  // Filter by country
  if (params.country && params.country !== 'Any') {
    query = query.eq('country', params.country)
  }

  // Filter by age - slider has priority over dropdown
  if (params.age_min && params.age_max) {
    // Age range slider is active - filter by numeric range
    // Parse age_group field (e.g., "8-12" -> min=8, max=12)
    // We'll use a more flexible approach: check if age_group overlaps with the range
    const minAge = parseInt(params.age_min)
    const maxAge = parseInt(params.age_max)

    // This will be handled by filtering in-memory since Supabase doesn't easily parse string ranges
    // We'll fetch all and filter below
  } else if (params.age && params.age !== 'All Ages') {
    // Dropdown is active
    query = query.eq('age_group', params.age)
  }

  // Filter by duration
  if (params.duration) {
    const durations = Array.isArray(params.duration)
      ? params.duration
      : params.duration.split(',')
    query = query.in('duration', durations)
  }

  // Filter by meals
  if (params.meals === 'on') {
    query = query.eq('meals_included', true)
  }

  // Sort by price
  if (params.sort_by === 'price_asc') {
    query = query.order('price', { ascending: true })
  } else if (params.sort_by === 'price_desc') {
    query = query.order('price', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tournaments:', error)
    return []
  }

  let tournaments = data || []

  // Apply age range slider filter in-memory if active
  if (params.age_min && params.age_max) {
    const minAge = parseInt(params.age_min)
    const maxAge = parseInt(params.age_max)

    tournaments = tournaments.filter(tournament => {
      const ageGroup = tournament.age_group
      if (!ageGroup) return false

      // Parse age_group formats like "8-12", "10-14", "6-8 years", "14-18"
      const match = ageGroup.match(/(\d+)-(\d+)/)
      if (match) {
        const groupMin = parseInt(match[1])
        const groupMax = parseInt(match[2])

        // Check if ranges overlap
        return groupMin <= maxAge && groupMax >= minAge
      }

      // If age_group doesn't match expected format, try single number
      const singleMatch = ageGroup.match(/(\d+)/)
      if (singleMatch) {
        const age = parseInt(singleMatch[1])
        return age >= minAge && age <= maxAge
      }

      return false
    })
  }

  return tournaments
}
