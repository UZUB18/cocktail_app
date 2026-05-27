import { useState, useMemo } from 'react'
import { Sparkles, ChevronRight } from 'lucide-react'
import type { CatalogCocktail } from '../data/catalog'
import type { IngredientCoverage } from '../types'
import { cocktailPhoto, titleize } from '../utils'

type Props = {
  matches: { cocktail: CatalogCocktail; coverage: IngredientCoverage }[]
  onOpen: (cocktail: CatalogCocktail) => void
}

export function CoverageHeatmap({ matches, onOpen }: Props) {
  const [filter, setFilter] = useState<'all' | 'makeable' | 'missing-1' | 'missing-2+'>('all')
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'family'>('score')

  const filtered = useMemo(() => {
    let items = [...matches]
    
    if (filter === 'makeable') items = items.filter((m) => m.coverage.score >= 80)
    else if (filter === 'missing-1') items = items.filter((m) => m.coverage.score >= 40 && m.coverage.score < 80)
    else if (filter === 'missing-2+') items = items.filter((m) => m.coverage.score < 40)

    if (sortBy === 'score') items.sort((a, b) => b.coverage.score - a.coverage.score)
    else if (sortBy === 'name') items.sort((a, b) => a.cocktail.name.localeCompare(b.cocktail.name))
    else if (sortBy === 'family') items.sort((a, b) => a.cocktail.family.localeCompare(b.cocktail.family))

    return items
  }, [matches, filter, sortBy])

  const counts = useMemo(() => ({
    all: matches.length,
    makeable: matches.filter((m) => m.coverage.score >= 80).length,
    missing1: matches.filter((m) => m.coverage.score >= 40 && m.coverage.score < 80).length,
    missing2: matches.filter((m) => m.coverage.score < 40).length,
  }), [matches])

  function scoreColor(score: number): string {
    if (score >= 80) return '#22c55e'
    if (score >= 40) return '#eab308'
    return '#ef4444'
  }

  function scoreBg(score: number): string {
    if (score >= 80) return 'rgba(34,197,94,0.06)'
    if (score >= 40) return 'rgba(234,179,8,0.06)'
    return 'rgba(239,68,68,0.06)'
  }

  const filterPills: { key: typeof filter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'makeable', label: '✓ Makeable', count: counts.makeable },
    { key: 'missing-1', label: '~ Missing 1', count: counts.missing1 },
    { key: 'missing-2+', label: '✗ Missing 2+', count: counts.missing2 },
  ]

  return (
    <section className="panel" style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#d1b48f', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', color: '#e5933a' }} />
          Coverage Heatmap
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {filterPills.map((pill) => (
          <button
            key={pill.key}
            onClick={() => setFilter(pill.key)}
            style={{
              padding: '4px 10px', borderRadius: '999px', border: '1px solid var(--line)',
              background: filter === pill.key ? 'rgba(229,147,58,0.15)' : 'transparent',
              color: filter === pill.key ? 'var(--accent)' : 'var(--muted)',
              fontSize: '11px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            {pill.label} <span style={{ opacity: 0.6 }}>({pill.count})</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em' }}>Sort:</span>
        {(['score', 'name', 'family'] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setSortBy(opt)}
            style={{
              padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--line)',
              background: sortBy === opt ? 'rgba(0,245,212,0.1)' : 'transparent',
              color: sortBy === opt ? 'var(--cyan)' : 'var(--muted)',
              fontSize: '10px', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'all 150ms ease',
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '8px', maxHeight: '480px', overflowY: 'auto',
      }}>
        {filtered.map(({ cocktail, coverage }) => (
          <button
            key={cocktail.id}
            onClick={() => onOpen(cocktail)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px',
              border: '1px solid var(--line)',
              borderLeft: `4px solid ${scoreColor(coverage.score)}`,
              background: scoreBg(coverage.score),
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--cyan)'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            <img
              src={cocktailPhoto(cocktail)}
              alt={cocktail.name}
              style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'contain', background: '#0a0a12', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <strong style={{ fontSize: '12px', color: 'var(--text)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cocktail.name}
                </strong>
                <span style={{ fontSize: '10px', fontWeight: 700, color: scoreColor(coverage.score), marginLeft: 'auto' }}>
                  {coverage.score}%
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
                {cocktail.family} · {titleize(cocktail.baseSpirit)}
              </div>
            </div>
            <ChevronRight size={14} style={{ color: 'var(--muted)', flexShrink: 0 }} />
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '12px', padding: '24px 0' }}>
          No cocktails match this filter.
        </p>
      )}

      <div style={{ display: 'flex', gap: '16px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line)', fontSize: '10px', color: 'var(--muted)' }}>
        <span><span style={{ color: '#22c55e', fontWeight: 700 }}>●</span> Ready ({counts.makeable})</span>
        <span><span style={{ color: '#eab308', fontWeight: 700 }}>●</span> Missing 1 ({counts.missing1})</span>
        <span><span style={{ color: '#ef4444', fontWeight: 700 }}>●</span> Missing 2+ ({counts.missing2})</span>
      </div>
    </section>
  )
}