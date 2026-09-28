'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import styles from './Tabs.module.css'

type EventType = 'tournament' | 'team_training' | 'player_training' | 'player_tryout'
type Sport = 'football' | 'hockey' | 'basketball' | 'tennis' | 'mma'

const EVENT_TABS: { key: 'tournaments' | 'teamTraining' | 'playerTraining' | 'playerTryout'; value: EventType }[] = [
  { key: 'tournaments', value: 'tournament' },
  { key: 'teamTraining', value: 'team_training' },
  { key: 'playerTraining', value: 'player_training' },
  { key: 'playerTryout', value: 'player_tryout' },
]

const SPORT_TABS: { key: 'football' | 'hockey' | 'basketball' | 'tennis' | 'mma'; value: Sport }[] = [
  { key: 'football', value: 'football' },
  { key: 'hockey', value: 'hockey' },
  { key: 'basketball', value: 'basketball' },
  { key: 'tennis', value: 'tennis' },
  { key: 'mma', value: 'mma' },
]

export default function Tabs({
  currentEventType,
  currentSport
}: {
  currentEventType?: EventType
  currentSport?: Sport
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  const activeEventType = currentEventType || 'tournament'
  const activeSport = currentSport || 'football'

  const handleEventTypeClick = (eventType: EventType) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('event_type', eventType)
    router.push(`/?${params.toString()}`)
  }

  const handleSportClick = (sport: Sport) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sport', sport)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.eventTabs}>
        {EVENT_TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.eventTab} ${activeEventType === tab.value ? styles.active : ''}`}
            onClick={() => handleEventTypeClick(tab.value)}
          >
            {t(tab.key)}
          </button>
        ))}
      </div>

      <div className={styles.sportTabs}>
        {SPORT_TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.sportTab} ${activeSport === tab.value ? styles.active : ''}`}
            onClick={() => handleSportClick(tab.value)}
          >
            {t(tab.key)}
          </button>
        ))}
      </div>
    </div>
  )
}
