'use client'

import { useState } from 'react'
import { Tournament } from '@/lib/types'
import TournamentCard from './TournamentCard'
import TournamentModal from './TournamentModal'
import styles from './TournamentGrid.module.css'

export default function TournamentGrid({ tournaments }: { tournaments: Tournament[] }) {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  return (
    <>
      <div className={styles.grid}>
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onClick={() => setSelectedTournament(tournament)}
          />
        ))}
      </div>

      {tournaments.length === 0 && (
        <div className={styles.empty}>
          <p>No tournaments found matching your criteria.</p>
        </div>
      )}

      {selectedTournament && (
        <TournamentModal
          tournament={selectedTournament}
          onClose={() => setSelectedTournament(null)}
        />
      )}
    </>
  )
}
