'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Tournament } from '@/lib/types'
import TournamentForm from '@/components/admin/TournamentForm'
import styles from './admin.module.css'

export default function AdminPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setTournaments(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tournament?')) return

    const { error } = await supabase
      .from('tournaments')
      .delete()
      .eq('id', id)

    if (!error) {
      setTournaments(tournaments.filter(t => t.id !== id))
    }
  }

  const handleEdit = (tournament: Tournament) => {
    setEditingTournament(tournament)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingTournament(null)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTournament(null)
    fetchTournaments()
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tournament Management</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          + Add Tournament
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Country</th>
                <th>City</th>
                <th>Price (€)</th>
                <th>Age Group</th>
                <th>Dates</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament) => (
                <tr key={tournament.id}>
                  <td>{tournament.name}</td>
                  <td>{tournament.category}</td>
                  <td>{tournament.country}</td>
                  <td>{tournament.city}</td>
                  <td>€{tournament.price}</td>
                  <td>{tournament.age_group}</td>
                  <td>{tournament.dates}</td>
                  <td>{tournament.duration}</td>
                  <td>
                    {tournament.promoted && (
                      <span className={styles.promoted}>Featured</span>
                    )}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(tournament)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(tournament.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <TournamentForm
          tournament={editingTournament}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}
