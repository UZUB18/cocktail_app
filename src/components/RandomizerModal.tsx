import { useState } from 'react'
import { Shuffle, X, ChevronRight, Sparkles } from 'lucide-react'
import { cocktailPhoto, titleize } from '../utils'
import type { CatalogCocktail } from '../data/catalog'

type Props = {
  cocktails: CatalogCocktail[]
  onOpen: (cocktail: CatalogCocktail) => void
  onClose: () => void
}

export function RandomizerModal({ cocktails, onOpen, onClose }: Props) {
  const [current, setCurrent] = useState<CatalogCocktail>(() =>
    cocktails[Math.floor(Math.random() * cocktails.length)]
  )
  const [spinning, setSpinning] = useState(false)

  function pickRandom() {
    if (spinning) return
    setSpinning(true)
    let count = 0
    const interval = setInterval(() => {
      const random = cocktails[Math.floor(Math.random() * cocktails.length)]
      setCurrent(random)
      count++
      if (count >= 10) {
        clearInterval(interval)
        setSpinning(false)
      }
    }, 70)
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #141428, #0f0f1a)',
          border: '1px solid #2a2a4a',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '440px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            background: 'rgba(255,255,255,0.05)', border: '1px solid #2a2a4a',
            borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#8888b0', cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>

        <div style={{ marginBottom: '0.5rem' }}>
          <Sparkles size={24} style={{ color: '#ffbe0b' }} />
        </div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.1rem', fontWeight: 700, color: '#f0f0ff',
          margin: '0 0 0.25rem', letterSpacing: '0.02em',
        }}>
          Tonight's Pick
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#8888b0', margin: '0 0 1.5rem' }}>
          Let fate decide
        </p>

        <div
          style={{
            width: '180px', height: '180px', margin: '0 auto 1.25rem',
            borderRadius: '16px', overflow: 'hidden',
            border: '2px solid rgba(0,245,212,0.15)',
            background: '#0a0a12',
          }}
        >
          <img
            src={cocktailPhoto(current)}
            alt={current.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.8rem', fontWeight: 900,
          background: 'linear-gradient(135deg, #00f5d4, #ff006e)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 0.25rem',
        }}>
          {current.name}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#8888b0', margin: '0 0 0.75rem' }}>
          {titleize(current.baseSpirit)} · {current.family} · {current.prepTime}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={pickRandom}
            disabled={spinning}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.2rem', borderRadius: '10px',
              border: '1px solid #2a2a4a', background: '#141428',
              color: '#00f5d4', cursor: spinning ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem', fontWeight: 600, opacity: spinning ? 0.6 : 1,
            }}
          >
            <Shuffle size={16} /> {spinning ? 'Shuffling...' : 'Try Again'}
          </button>
          <button
            onClick={() => { onOpen(current); onClose() }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.2rem', borderRadius: '10px',
              border: 'none', background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
            }}
          >
            Open Recipe <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}