import { Suspense } from 'react'
import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import FilterSidebar from '@/components/FilterSidebar'
import TournamentGrid from '@/components/TournamentGrid'
import { fetchTournaments } from '@/lib/utils'
import { SearchParams } from '@/lib/types'
import styles from './page.module.css'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const tournaments = await fetchTournaments(params)

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Tabs
          currentEventType={params.event_type}
          currentSport={params.sport}
        />

        <div className={styles.content}>
          <FilterSidebar currentParams={params} />

          <div className={styles.resultsSection}>
            <Suspense fallback={<div>Loading...</div>}>
              <TournamentGrid tournaments={tournaments} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
