'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { Language } from '@/lib/translations'
import styles from './LanguageSwitcher.module.css'

const languages: { code: Language; name: string; display: string }[] = [
  { code: 'en', name: 'English', display: 'ENG' },
  { code: 'cs', name: 'Čeština', display: 'CZ' },
  { code: 'sk', name: 'Slovenčina', display: 'SK' },
  { code: 'lv', name: 'Latviešu', display: 'LV' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find(l => l.code === language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code: Language) => {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className={styles.switcher} ref={dropdownRef}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.code}>{currentLang.display}</span>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.option} ${language === lang.code ? styles.active : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className={styles.name}>{lang.display}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
