'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { Tournament } from '@/lib/types'
import styles from './TournamentModal.module.css'

export default function TournamentModal({
  tournament,
  onClose,
}: {
  tournament: Tournament
  onClose: () => void
}) {
  const { t } = useLanguage()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Booking request sent!\n\nTournament: ${tournament.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}${formData.name ? `\nName: ${formData.name}` : ''}`)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <img
            src={tournament.logo_url || '/default-logo.svg'}
            alt={tournament.name}
            className={styles.logo}
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = '/default-logo.svg'
            }}
          />
          <div className={styles.headerInfo}>
            <div className={styles.city}>
              📍 {tournament.country}, {tournament.city}
            </div>
            <h2 className={styles.title}>{tournament.name}</h2>
          </div>
        </div>

        <div className={styles.price}>€{tournament.price}</div>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>{t('category')}:</span>
            <span className={styles.detailValue}>
              {t(tournament.category as any)}
            </span>
          </div>

          <div className={styles.detail}>
            <span className={styles.detailLabel}>{t('ageGroup')}:</span>
            <span className={styles.detailValue}>{tournament.age_group} {t('years')}</span>
          </div>

          <div className={styles.detail}>
            <span className={styles.detailLabel}>{t('dates')}:</span>
            <span className={styles.detailValue}>{tournament.dates}</span>
          </div>

          <div className={styles.detail}>
            <span className={styles.detailLabel}>{t('duration')}:</span>
            <span className={styles.detailValue}>{tournament.duration}</span>
          </div>

          <div className={styles.detail}>
            <span className={styles.detailLabel}>{t('meals')}:</span>
            <span className={styles.detailValue}>
              {tournament.meals_included ? `✓ ${t('included')}` : `✗ ${t('notIncluded')}`}
            </span>
          </div>

          {tournament.extra && (
            <div className={styles.detail}>
              <span className={styles.detailLabel}>{t('extra')}:</span>
              <span className={styles.detailValue}>{tournament.extra}</span>
            </div>
          )}
        </div>

        {tournament.promoted && (
          <div className={styles.badge}>{t('featuredTournament')}</div>
        )}

        {!showBookingForm ? (
          <button
            className={styles.bookBtn}
            onClick={() => setShowBookingForm(true)}
          >
            {t('bookNow')}
          </button>
        ) : (
          <form onSubmit={handleSubmit} className={styles.bookingForm}>
            <h3 className={styles.formTitle}>{t('bookYourSpot')}</h3>

            <div className={styles.formField}>
              <label htmlFor="name" className={styles.formLabel}>
                {t('name')} ({t('optional')})
              </label>
              <input
                type="text"
                id="name"
                className={styles.formInput}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('name')}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="email" className={styles.formLabel}>
                {t('email')} *
              </label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone" className={styles.formLabel}>
                {t('phone')} *
              </label>
              <input
                type="tel"
                id="phone"
                className={styles.formInput}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div className={styles.formButtons}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowBookingForm(false)}
              >
                {t('cancel')}
              </button>
              <button type="submit" className={styles.submitBtn}>
                {t('sendRequest')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
