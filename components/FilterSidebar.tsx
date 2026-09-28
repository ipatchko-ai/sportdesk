'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { SearchParams } from '@/lib/types'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './FilterSidebar.module.css'

export default function FilterSidebar({ currentParams }: { currentParams: SearchParams }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams(searchParams.toString())

    const sortBy = formData.get('sort_by') as string
    if (sortBy && sortBy !== 'default') {
      params.set('sort_by', sortBy)
    } else {
      params.delete('sort_by')
    }

    const durations = formData.getAll('duration')
    if (durations.length > 0) {
      params.set('duration', durations.join(','))
    } else {
      params.delete('duration')
    }

    if (formData.get('meals')) {
      params.set('meals', 'on')
    } else {
      params.delete('meals')
    }

    router.push(`/?${params.toString()}`)
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    const value = e.target.value

    if (value && value !== 'Any') {
      params.set('country', value)
    } else {
      params.delete('country')
    }

    router.push(`/?${params.toString()}`)
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    const value = e.target.value

    if (value && value !== 'All Ages') {
      params.set('age', value)
    } else {
      params.delete('age')
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topFilters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>{t('country')}</label>
          <select
            className={styles.select}
            value={currentParams.country || 'Any'}
            onChange={handleCountryChange}
          >
            <option value="Any">{t('any')}</option>
            <option value="Czech Republic">{t('czechRepublic')}</option>
            <option value="Slovakia">{t('slovakia')}</option>
            <option value="Latvia">{t('latvia')}</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>{t('childsAge')}</label>
          <select
            className={styles.select}
            value={currentParams.age || 'All Ages'}
            onChange={handleAgeChange}
          >
            <option value="All Ages">{t('allAges')}</option>
            <option value="8-12">8-12 {t('years')}</option>
            <option value="10-14">10-14 {t('years')}</option>
            <option value="14-18">14-18 {t('years')}</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.refineForm}>
        <h3 className={styles.refineTitle}>{t('refineSearch')}</h3>

        <div className={styles.filterGroup}>
          <label className={styles.label}>{t('sortByPrice')}</label>
          <select
            name="sort_by"
            className={styles.select}
            defaultValue={currentParams.sort_by || 'default'}
          >
            <option value="default">{t('default')}</option>
            <option value="price_asc">{t('priceLowToHigh')}</option>
            <option value="price_desc">{t('priceHighToLow')}</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>{t('duration')}</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="duration"
                value="1 day"
                defaultChecked={currentParams.duration?.includes('1 day')}
              />
              <span>{t('oneDay')}</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="duration"
                value="Weekend"
                defaultChecked={currentParams.duration?.includes('Weekend')}
              />
              <span>{t('weekend')}</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="duration"
                value="Week"
                defaultChecked={currentParams.duration?.includes('Week')}
              />
              <span>{t('week')}</span>
            </label>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="meals"
              defaultChecked={currentParams.meals === 'on'}
            />
            <span>{t('mealsIncluded')}</span>
          </label>
        </div>

        <button type="submit" className={styles.applyBtn}>
          {t('apply')}
        </button>
      </form>
    </aside>
  )
}
