'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import CreateTournamentForm from '@/components/CreateTournamentForm'
import EditTournamentForm from '@/components/EditTournamentForm'
import styles from './organizer.module.css'

type Tournament = {
  id: string
  name: string
  sport: string
  event_type: string
  country: string
  city: string
  dates: string
  status: string
  created_at: string
  age_group: string
  price: number
  duration: string
  meals_included: boolean
  extra: string
  logo_url: string
  category: string
}

export default function OrganizerDashboard() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<'create' | 'my-tournaments' | 'applicants'>('my-tournaments')
  const [tournaments, setTournaments] = useState<Tournament[]>([])

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user && activeSection === 'my-tournaments') {
      loadTournaments()
    }
  }, [user, activeSection])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/login')
      return
    }

    setUser(session.user)
    setLoading(false)
  }

  async function loadTournaments() {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setTournaments(data)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>SportDesk</h2>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeSection === 'my-tournaments' ? styles.navItemActive : ''}`}
            onClick={() => setActiveSection('my-tournaments')}
          >
            <span className={styles.navIcon}>📋</span>
            Мои турниры
          </button>

          <button
            className={`${styles.navItem} ${activeSection === 'create' ? styles.navItemActive : ''}`}
            onClick={() => setActiveSection('create')}
          >
            <span className={styles.navIcon}>➕</span>
            Создать турнир
          </button>

          <button
            className={`${styles.navItem} ${activeSection === 'applicants' ? styles.navItemActive : ''}`}
            onClick={() => setActiveSection('applicants')}
          >
            <span className={styles.navIcon}>👥</span>
            Заявки
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className={styles.navIcon}>🚪</span>
            Выйти
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <h1 className={styles.mainTitle}>
            {activeSection === 'my-tournaments' && 'Мои турниры'}
            {activeSection === 'create' && 'Создать турнир'}
            {activeSection === 'applicants' && 'Заявки участников'}
          </h1>
        </div>

        <div className={styles.content}>
          {activeSection === 'my-tournaments' && (
            <MyTournamentsSection tournaments={tournaments} />
          )}

          {activeSection === 'create' && (
            <CreateTournamentSection onSuccess={loadTournaments} />
          )}

          {activeSection === 'applicants' && (
            <ApplicantsSection tournaments={tournaments} />
          )}
        </div>
      </main>
    </div>
  )
}

function MyTournamentsSection({ tournaments }: { tournaments: Tournament[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const groupedTournaments = tournaments.reduce((acc, tournament) => {
    const key = `${tournament.sport}_${tournament.event_type}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(tournament)
    return acc
  }, {} as Record<string, Tournament[]>)

  const sportLabels: Record<string, string> = {
    football: '⚽ Футбол',
    hockey: '🏒 Хоккей',
    basketball: '🏀 Баскетбол',
    tennis: '🎾 Теннис',
    mma: '🥊 ММА'
  }

  const eventTypeLabels: Record<string, string> = {
    tournament: 'Турниры',
    team_training: 'Командные тренировки',
    player_training: 'Индивидуальные тренировки',
    player_tryout: 'Просмотры игроков'
  }

  if (editingId) {
    const tournament = tournaments.find(t => t.id === editingId)
    if (tournament) {
      return (
        <EditTournamentSection
          tournament={tournament}
          onCancel={() => setEditingId(null)}
          onSuccess={() => setEditingId(null)}
        />
      )
    }
  }

  return (
    <div className={styles.tournamentsGrid}>
      {Object.keys(groupedTournaments).length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>У вас пока нет созданных турниров</p>
          <p className={styles.emptyHint}>Нажмите "Создать турнир" чтобы добавить первый</p>
        </div>
      ) : (
        Object.entries(groupedTournaments).map(([key, items]) => {
          const [sport, eventType] = key.split('_')
          return (
            <div key={key} className={styles.tournamentGroup}>
              <h3 className={styles.groupHeader}>
                {sportLabels[sport]} → {eventTypeLabels[eventType]}
              </h3>
              <div className={styles.tournamentList}>
                {items.map((tournament) => (
                  <div key={tournament.id} className={styles.tournamentCard}>
                    <div className={styles.tournamentCardHeader}>
                      <h4 className={styles.tournamentName}>{tournament.name}</h4>
                      <div className={styles.cardActions}>
                        <span className={`${styles.statusBadge} ${styles[`status_${tournament.status}`]}`}>
                          {tournament.status === 'draft' && 'Черновик'}
                          {tournament.status === 'published' && 'Опубликован'}
                          {tournament.status === 'deleted' && 'Удален'}
                        </span>
                        <button
                          className={styles.editBtn}
                          onClick={() => setEditingId(tournament.id)}
                          title="Редактировать"
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                    <div className={styles.tournamentMeta}>
                      <span>📍 {tournament.city}, {tournament.country}</span>
                      <span>📅 {tournament.dates}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

function CreateTournamentSection({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className={styles.createSection}>
      <CreateTournamentForm onSuccess={onSuccess} />
    </div>
  )
}

function ApplicantsSection({ tournaments }: { tournaments: Tournament[] }) {
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>('')
  const [applicants, setApplicants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (selectedTournamentId) {
      loadApplicants(selectedTournamentId)
    }
  }, [selectedTournamentId])

  async function loadApplicants(tournamentId: string) {
    setLoading(true)
    const { data, error } = await supabase
      .from('applicants')
      .select('*')
      .eq('tournament_id', tournamentId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setApplicants(data)
    }
    setLoading(false)
  }

  function exportToCSV() {
    if (applicants.length === 0) return

    const headers = ['Имя родителя', 'Email', 'Телефон', 'Имя ребенка', 'Возраст', 'Доп. информация', 'Дата заявки']
    const rows = applicants.map(app => [
      app.parent_name,
      app.parent_email,
      app.parent_phone,
      app.child_name,
      app.child_age,
      app.additional_info || '',
      new Date(app.created_at).toLocaleString('ru-RU')
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `applicants_${selectedTournamentId}_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const publishedTournaments = tournaments.filter(t => t.status === 'published')

  return (
    <div className={styles.applicantsSection}>
      <div className={styles.applicantsHeader}>
        <h2 className={styles.sectionTitle}>Заявки на турниры</h2>
        {selectedTournamentId && applicants.length > 0 && (
          <button className={styles.exportBtn} onClick={exportToCSV}>
            📥 Экспортировать в CSV
          </button>
        )}
      </div>

      <div className={styles.tournamentSelector}>
        <label className={styles.selectorLabel}>Выберите турнир:</label>
        <select
          className={styles.selectorSelect}
          value={selectedTournamentId}
          onChange={(e) => setSelectedTournamentId(e.target.value)}
        >
          <option value="">-- Выберите турнир --</option>
          {publishedTournaments.map(tournament => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name} ({tournament.city}, {tournament.dates})
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className={styles.loadingText}>Загрузка заявок...</p>
      )}

      {!loading && selectedTournamentId && applicants.length === 0 && (
        <div className={styles.emptyApplicants}>
          <p className={styles.emptyText}>На этот турнир пока нет заявок</p>
        </div>
      )}

      {!loading && applicants.length > 0 && (
        <div className={styles.applicantsTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Имя родителя</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Имя ребенка</th>
                <th>Возраст</th>
                <th>Дополнительно</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>{applicant.parent_name}</td>
                  <td>{applicant.parent_email}</td>
                  <td>{applicant.parent_phone}</td>
                  <td>{applicant.child_name}</td>
                  <td>{applicant.child_age}</td>
                  <td>{applicant.additional_info || '—'}</td>
                  <td>{new Date(applicant.created_at).toLocaleDateString('ru-RU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function EditTournamentSection({
  tournament,
  onCancel,
  onSuccess
}: {
  tournament: Tournament
  onCancel: () => void
  onSuccess: () => void
}) {
  async function handleSuccess() {
    onSuccess()
    onCancel()
  }

  return (
    <div className={styles.editSection}>
      <div className={styles.editHeader}>
        <h2 className={styles.editTitle}>Редактирование турнира</h2>
        <button className={styles.cancelBtn} onClick={onCancel}>
          ← Назад к списку
        </button>
      </div>
      <EditTournamentForm
        tournament={tournament}
        onSuccess={handleSuccess}
        onCancel={onCancel}
      />
    </div>
  )
}
