'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import styles from './CreateTournamentForm.module.css'

type FormData = {
  name: string
  sport: 'football' | 'hockey' | 'basketball' | 'tennis' | 'mma'
  event_type: 'tournament' | 'team_training' | 'player_training' | 'player_tryout'
  country: string
  city: string
  dates: string
  age_group: string
  price: string
  duration: string
  meals_included: boolean
  extra: string
  logo_url: string
  promoted: boolean
  status: 'draft' | 'published'
}

export default function CreateTournamentForm({ onSuccess }: { onSuccess: () => void }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sport: 'football',
    event_type: 'tournament',
    country: 'Czech Republic',
    city: '',
    dates: '',
    age_group: '',
    price: '',
    duration: '',
    meals_included: false,
    extra: '',
    logo_url: '',
    promoted: false,
    status: 'draft'
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent, submitStatus: 'draft' | 'published') {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setError('You must be logged in')
        setLoading(false)
        return
      }

      const dataToSave = {
        ...formData,
        status: submitStatus,
        user_id: session.user.id,
        category: formData.sport,
        logo_url: formData.logo_url || getDefaultLogoUrl(formData.sport)
      }

      const { error: insertError } = await supabase
        .from('tournaments')
        .insert([dataToSave])

      if (insertError) {
        console.error('Insert error:', insertError)
        setError('Error saving tournament')
        setLoading(false)
        return
      }

      // Reset form
      setFormData({
        name: '',
        sport: 'football',
        event_type: 'tournament',
        country: 'Czech Republic',
        city: '',
        dates: '',
        age_group: '',
        price: '',
        duration: '',
        meals_included: false,
        extra: '',
        logo_url: '',
        promoted: false,
        status: 'draft'
      })

      onSuccess()
      setLoading(false)
    } catch (err) {
      console.error('Submit error:', err)
      setError('An error occurred')
      setLoading(false)
    }
  }

  function getDefaultLogoUrl(sport: string): string {
    const logos: Record<string, string> = {
      football: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=100&auto=format&fit=crop',
      hockey: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=100&auto=format&fit=crop',
      basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop',
      tennis: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=100&auto=format&fit=crop',
      mma: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=100&auto=format&fit=crop'
    }
    return logos[sport] || logos.football
  }

  return (
    <form className={styles.form}>
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Tournament Name *</label>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Summer Cup 2026"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Sport *</label>
          <select
            name="sport"
            className={styles.select}
            value={formData.sport}
            onChange={handleChange}
            required
          >
            <option value="football">⚽ Football</option>
            <option value="hockey">🏒 Hockey</option>
            <option value="basketball">🏀 Basketball</option>
            <option value="tennis">🎾 Tennis</option>
            <option value="mma">🥊 MMA</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Event Type *</label>
          <select
            name="event_type"
            className={styles.select}
            value={formData.event_type}
            onChange={handleChange}
            required
          >
            <option value="tournament">Tournament</option>
            <option value="team_training">Team Training</option>
            <option value="player_training">Individual Training</option>
            <option value="player_tryout">Player Tryout</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Country *</label>
          <select
            name="country"
            className={styles.select}
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="Czech Republic">Czech Republic</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Latvia">Latvia</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>City *</label>
          <input
            type="text"
            name="city"
            className={styles.input}
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="e.g., Prague"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Dates *</label>
          <input
            type="text"
            name="dates"
            className={styles.input}
            value={formData.dates}
            onChange={handleChange}
            required
            placeholder="e.g., July 15-17, 2026"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Age Group *</label>
          <input
            type="text"
            name="age_group"
            className={styles.input}
            value={formData.age_group}
            onChange={handleChange}
            required
            placeholder="e.g., 10-12 years"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Price *</label>
          <input
            type="text"
            name="price"
            className={styles.input}
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g., 5000 CZK"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Duration</label>
          <input
            type="text"
            name="duration"
            className={styles.input}
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3 days"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Logo URL</label>
        <input
          type="text"
          name="logo_url"
          className={styles.input}
          value={formData.logo_url}
          onChange={handleChange}
          placeholder="https://..."
        />
        <p className={styles.hint}>Leave empty to use default logo</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Additional Information</label>
        <textarea
          name="extra"
          className={styles.textarea}
          value={formData.extra}
          onChange={handleChange}
          rows={4}
          placeholder="Additional details about the tournament..."
        />
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="meals_included"
            checked={formData.meals_included}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <span>Meals included</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="promoted"
            checked={formData.promoted}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <span>Promote on homepage</span>
        </label>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.draftBtn}
          onClick={(e) => handleSubmit(e, 'draft')}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          type="button"
          className={styles.publishBtn}
          onClick={(e) => handleSubmit(e, 'published')}
          disabled={loading}
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </form>
  )
}
