'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import styles from './EditTournamentForm.module.css'

type Tournament = {
  id: string
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
  status: 'draft' | 'published' | 'deleted'
}

type FormData = Omit<Tournament, 'id'>

export default function EditTournamentForm({
  tournament,
  onSuccess,
  onCancel
}: {
  tournament: Tournament
  onSuccess: () => void
  onCancel: () => void
}) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: tournament.name || '',
    sport: tournament.sport || 'football',
    event_type: tournament.event_type || 'tournament',
    country: tournament.country || 'Czech Republic',
    city: tournament.city || '',
    dates: tournament.dates || '',
    age_group: tournament.age_group || '',
    price: tournament.price || '',
    duration: tournament.duration || '',
    meals_included: tournament.meals_included || false,
    extra: tournament.extra || '',
    logo_url: tournament.logo_url || '',
    promoted: tournament.promoted || false,
    status: tournament.status || 'draft'
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

  async function handleSubmit(e: React.FormEvent, submitStatus: 'draft' | 'published' | 'deleted') {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const dataToUpdate = {
        ...formData,
        status: submitStatus,
        category: formData.sport
      }

      const { error: updateError } = await supabase
        .from('tournaments')
        .update(dataToUpdate)
        .eq('id', tournament.id)

      if (updateError) {
        console.error('Update error:', updateError)
        setError('Ошибка при обновлении турнира')
        setLoading(false)
        return
      }

      onSuccess()
      setLoading(false)
    } catch (err) {
      console.error('Submit error:', err)
      setError('Произошла ошибка')
      setLoading(false)
    }
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
          <label className={styles.label}>Название турнира *</label>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Например: Летний кубок 2026"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Вид спорта *</label>
          <select
            name="sport"
            className={styles.select}
            value={formData.sport}
            onChange={handleChange}
            required
          >
            <option value="football">⚽ Футбол</option>
            <option value="hockey">🏒 Хоккей</option>
            <option value="basketball">🏀 Баскетбол</option>
            <option value="tennis">🎾 Теннис</option>
            <option value="mma">🥊 ММА</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Тип мероприятия *</label>
          <select
            name="event_type"
            className={styles.select}
            value={formData.event_type}
            onChange={handleChange}
            required
          >
            <option value="tournament">Турнир</option>
            <option value="team_training">Командная тренировка</option>
            <option value="player_training">Индивидуальная тренировка</option>
            <option value="player_tryout">Просмотр игроков</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Страна *</label>
          <select
            name="country"
            className={styles.select}
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="Czech Republic">Чехия</option>
            <option value="Slovakia">Словакия</option>
            <option value="Latvia">Латвия</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Город *</label>
          <input
            type="text"
            name="city"
            className={styles.input}
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Например: Прага"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Даты проведения *</label>
          <input
            type="text"
            name="dates"
            className={styles.input}
            value={formData.dates}
            onChange={handleChange}
            required
            placeholder="Например: 15-17 июля 2026"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Возрастная группа *</label>
          <input
            type="text"
            name="age_group"
            className={styles.input}
            value={formData.age_group}
            onChange={handleChange}
            required
            placeholder="Например: 10-12 лет"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Цена *</label>
          <input
            type="text"
            name="price"
            className={styles.input}
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Например: 5000 CZK"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Продолжительность</label>
          <input
            type="text"
            name="duration"
            className={styles.input}
            value={formData.duration}
            onChange={handleChange}
            placeholder="Например: 3 дня"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>URL логотипа</label>
        <input
          type="text"
          name="logo_url"
          className={styles.input}
          value={formData.logo_url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Дополнительная информация</label>
        <textarea
          name="extra"
          className={styles.textarea}
          value={formData.extra}
          onChange={handleChange}
          rows={4}
          placeholder="Дополнительные детали о турнире..."
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
          <span>Питание включено</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="promoted"
            checked={formData.promoted}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <span>Продвигать на главной странице</span>
        </label>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
          disabled={loading}
        >
          Отменить
        </button>
        <button
          type="button"
          className={styles.draftBtn}
          onClick={(e) => handleSubmit(e, 'draft')}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить как черновик'}
        </button>
        <button
          type="button"
          className={styles.publishBtn}
          onClick={(e) => handleSubmit(e, 'published')}
          disabled={loading}
        >
          {loading ? 'Публикация...' : 'Опубликовать'}
        </button>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={(e) => handleSubmit(e, 'deleted')}
          disabled={loading}
        >
          {loading ? 'Удаление...' : 'Удалить'}
        </button>
      </div>
    </form>
  )
}
