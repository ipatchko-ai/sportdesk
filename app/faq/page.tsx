'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { faqData } from '@/lib/faqData'
import styles from './page.module.css'

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('gettingStarted')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const categories = [
    { id: 'gettingStarted', title: 'Getting Started', icon: '🚀' },
    { id: 'searchingBooking', title: 'Searching & Booking', icon: '🔍' },
    { id: 'tournamentInfo', title: 'Tournament Info', icon: '⚽' },
    { id: 'accountLanguage', title: 'Account & Language', icon: '👤' },
    { id: 'technicalSupport', title: 'Technical & Support', icon: '💬' }
  ]

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  const currentCategory = faqData[activeCategory as keyof typeof faqData]

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>Find answers to common questions about SportDesk</p>
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <nav className={styles.nav}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.navItem} ${activeCategory === category.id ? styles.navItemActive : ''}`}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setExpandedQuestion(null)
                  }}
                >
                  <span className={styles.navIcon}>{category.icon}</span>
                  <span className={styles.navText}>{category.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className={styles.main}>
            <h2 className={styles.categoryTitle}>{currentCategory.title}</h2>

            <div className={styles.questions}>
              {currentCategory.questions.map((item) => (
                <div key={item.id} className={styles.questionItem}>
                  <button
                    className={styles.questionButton}
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <span className={styles.questionText}>{item.question}</span>
                    <span className={styles.questionIcon}>
                      {expandedQuestion === item.id ? '−' : '+'}
                    </span>
                  </button>

                  {expandedQuestion === item.id && (
                    <div className={styles.answer}>
                      <p className={styles.answerText}>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
