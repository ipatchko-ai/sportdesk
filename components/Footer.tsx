'use client'

import { useLanguage } from '@/lib/LanguageContext'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>SportDesk</h3>
            <p className={styles.copyright}>{t('copyright')}</p>
          </div>

          <div className={styles.links}>
            <Link href="/privacy-policy" className={styles.link}>
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className={styles.link}>
              {t('termsOfService')}
            </Link>
            <a
              href="/tourneo-presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              About Project
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
