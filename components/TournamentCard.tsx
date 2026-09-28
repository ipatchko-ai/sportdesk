'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { Tournament } from '@/lib/types'
import styles from './TournamentCard.module.css'

export default function TournamentCard({
  tournament,
  onClick
}: {
  tournament: Tournament
  onClick: () => void
}) {
  const { t } = useLanguage()

  return (
    <div
      className={`${styles.card} ${tournament.promoted ? styles.promoted : ''}`}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <div className={styles.cardCity}>
            📍 {tournament.country}, {tournament.city}
          </div>
          <h3 className={styles.cardTitle}>{tournament.name}</h3>
        </div>

        <img
          src={tournament.logo_url || '/default-logo.svg'}
          alt={tournament.name}
          className={styles.cardLogo}
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = '/default-logo.svg'
          }}
        />
      </div>

      <div className={styles.cardPrice}>€{tournament.price}</div>

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specValue}>{tournament.age_group} {t('years')}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specValue}>{tournament.dates}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specValue}>{tournament.duration}</span>
        </div>
        {tournament.meals_included && (
          <div className={styles.spec}>
            <span className={styles.specValue}>✓ {t('mealsIncluded')}</span>
          </div>
        )}
        {tournament.extra && (
          <div className={styles.spec}>
            <span className={styles.specValue}>+ {tournament.extra}</span>
          </div>
        )}
      </div>

      {tournament.promoted && (
        <div className={styles.badge}>{t('featured')}</div>
      )}
    </div>
  )
}
