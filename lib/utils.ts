import { Tournament, SearchParams } from './types'
import { supabase } from './supabase'

export async function fetchTournaments(params: SearchParams): Promise<Tournament[]> {
  let query = supabase
    .from('tournaments')
    .select('*')

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

  // Filter by age
  if (params.age && params.age !== 'All Ages') {
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

  return data || []
}
