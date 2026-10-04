'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AgeRangeSlider.module.css'
import { translations, Language } from '@/lib/translations'

interface AgeRangeSliderProps {
  min: number
  max: number
  currentMin: number
  currentMax: number
  onChange: (min: number, max: number) => void
  onReset: () => void
  isActive: boolean
  language: Language
}

export default function AgeRangeSlider({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
  onReset,
  isActive,
  language
}: AgeRangeSliderProps) {
  const t = translations[language]
  const [minVal, setMinVal] = useState(currentMin)
  const [maxVal, setMaxVal] = useState(currentMax)
  const minValRef = useRef(currentMin)
  const maxValRef = useRef(currentMax)
  const range = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMinVal(currentMin)
    setMaxVal(currentMax)
    minValRef.current = currentMin
    maxValRef.current = currentMax
  }, [currentMin, currentMax])

  const getPercent = (value: number) =>
    Math.round(((value - min) / (max - min)) * 100)

  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, maxVal, min, max])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1)
    setMinVal(value)
    minValRef.current = value
    onChange(value, maxVal)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1)
    setMaxVal(value)
    maxValRef.current = value
    onChange(minVal, value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>{t.age}</span>
        {isActive && (
          <button
            type="button"
            className={styles.resetBtn}
            onClick={onReset}
            title="Reset"
          >
            ×
          </button>
        )}
      </div>

      <div className={styles.valueDisplay}>
        {minVal === min && maxVal === max
          ? `${minVal}-${maxVal} ${t.years}`
          : `${minVal}-${maxVal} ${t.years}`}
      </div>

      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className={`${styles.thumb} ${styles.thumbLeft}`}
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />

        <div className={styles.slider}>
          <div className={styles.sliderTrack} />
          <div ref={range} className={styles.sliderRange} />
        </div>
      </div>
    </div>
  )
}
