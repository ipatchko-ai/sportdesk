'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Tournament } from '@/lib/types'
import styles from './TournamentForm.module.css'

interface TournamentFormProps {
  tournament: Tournament | null
  onClose: () => void
}

export default function TournamentForm({ tournament, onClose }: TournamentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'tournament' as 'tournament' | 'gathering' | 'campus',
    country: 'Slovakia',
    city: '',
    price: 0,
    age_group: '8-12',
    dates: '',
    duration: 'Weekend' as '1 day' | 'Weekend' | 'Week',
    meals_included: false,
    extra: '',
    logo_url: '',
    promoted: false,
  })

  useEffect(() => {
    if (tournament) {
      setFormData({
        name: tournament.name,
        category: tournament.category,
        country: tournament.country,
        city: tournament.city,
        price: tournament.price,
        age_group: tournament.age_group,
        dates: tournament.dates,
        duration: tournament.duration,
        meals_included: tournament.meals_included,
        extra: tournament.extra || '',
        logo_url: tournament.logo_url || '',
        promoted: tournament.promoted,
      })
    }
  }, [tournament])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      ...formData,
      extra: formData.extra || null,
      logo_url: formData.logo_url || null,
    }

    if (tournament) {
      // Update
      const { error } = await supabase
        .from('tournaments')
        .update(data)
        .eq('id', tournament.id)

      if (!error) {
        alert('Tournament updated!')
        onClose()
      } else {
        alert('Error updating tournament: ' + error.message)
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('tournaments')
        .insert(data)

      if (!error) {
        alert('Tournament created!')
        onClose()
      } else {
        alert('Error creating tournament: ' + error.message)
      }
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{tournament ? 'Edit Tournament' : 'Add Tournament'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              >
                <option value="tournament">Tournament</option>
                <option value="gathering">Gathering</option>
                <option value="campus">Campus</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Country *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="Slovakia">Slovakia</option>
                <option value="Czech Republic">Czech Republic</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Price (€) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Age Group *</label>
              <select
                value={formData.age_group}
                onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
              >
                <option value="8-12">8-12</option>
                <option value="10-14">10-14</option>
                <option value="14-18">14-18</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Dates *</label>
              <input
                type="text"
                value={formData.dates}
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                placeholder="e.g. November"
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Duration *</label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value as any })}
            >
              <option value="1 day">1 day</option>
              <option value="Weekend">Weekend</option>
              <option value="Week">Week</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Extra Info</label>
            <input
              type="text"
              value={formData.extra}
              onChange={(e) => setFormData({ ...formData, extra: e.target.value })}
              placeholder="e.g. Stadium Tour, Swimming Pool"
            />
          </div>

          <div className={styles.field}>
            <label>Logo URL</label>
            <input
              type="url"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className={styles.checkboxes}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.meals_included}
                onChange={(e) => setFormData({ ...formData, meals_included: e.target.checked })}
              />
              <span>Meals Included</span>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.promoted}
                onChange={(e) => setFormData({ ...formData, promoted: e.target.checked })}
              />
              <span>Featured</span>
            </label>
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {tournament ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
