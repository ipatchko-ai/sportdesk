'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Header.module.css'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.branding}>
          <h1 className={styles.title}>{t('brandName')}</h1>
          <p className={styles.tagline}>{t('tagline')}</p>
        </Link>

        <div className={styles.rightSection}>
          <LanguageSwitcher />

          <Link href="/faq" className={styles.faqButton} title="FAQ">
            <img src="/faq-icon.svg" alt="FAQ" className={styles.faqIcon} />
          </Link>

          <div className={styles.authButtons}>
            <Link href="/login" className={styles.loginBtn}>
              {t('login')}
            </Link>
            <Link href="/register" className={styles.registerBtn}>
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
