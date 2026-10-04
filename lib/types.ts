export type Category = 'tournament' | 'gathering' | 'campus'
export type EventType = 'tournament' | 'team_training' | 'player_training' | 'player_trials'
export type Sport = 'football' | 'hockey' | 'basketball' | 'tennis' | 'mma'
export type Duration = '1 day' | 'Weekend' | 'Week'

export interface Tournament {
  id: number
  name: string
  category: Category
  event_type: EventType
  sport: Sport
  country: string
  city: string
  price: number
  age_group: string
  dates: string
  duration: Duration
  meals_included: boolean
  extra: string | null
  logo_url: string | null
  promoted: boolean
  created_at: string
  updated_at: string
}

export interface SearchParams {
  category?: Category
  event_type?: EventType
  sport?: Sport
  country?: string
  age?: string
  age_min?: string
  age_max?: string
  sort_by?: 'price_asc' | 'price_desc'
  duration?: string | string[]
  meals?: 'on'
}

export interface User {
  id: string
  username: string
  email: string
  created_at: string
}
