import { useState, useEffect, useMemo, useRef } from 'react'
import { Check, Save, Star } from 'lucide-react'
import { type CatalogCocktail } from '../data/catalog'
import { type PracticeFocus, type PracticeTechnique, type PracticeLog, type StoredState } from '../types'
import '../storage'
import { cocktailPhoto, titleize } from '../utils'
import { ViewHeader } from '../components/ViewHeader'

export default function PracticeLabView({
  cocktails,
  selected,
  state,
  updateStored,
}: {
  cocktails: CatalogCocktail[]
  selected: CatalogCocktail
  state: StoredState
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  const [cocktailSearch, setCocktailSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [focus, setFocus] = useState<PracticeFocus>('balance')
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerMode, setTimerMode] = useState<'countdown' | 'countup'>('countdown')
  const [timerDuration, setTimerDuration] = useState(12)
  const [timerMax, setTimerMax] = useState(12)

  const defaultTechnique = useMemo<PracticeTechnique>(() => {
    const method = (selected.method || '').toLowerCase()
    if (method.includes('shake')) return 'shake'
    if (method.includes('stir')) return 'stir'
    if (method.includes('swizzle')) return 'swizzle'
    if (method.includes('build')) return 'build'
    return 'none'
  }, [selected])

  const [technique, setTechnique] = useState<PracticeTechnique>(defaultTechnique)

  useEffect(() => {
    setTechnique(defaultTechnique)
  }, [defaultTechnique])

  const getPresetDuration = (tech: PracticeTechnique) => {
    if (tech === 'shake') return 12
    if (tech === 'stir') return 30
    if (tech === 'swizzle') return 20
    return 0
  }

  useEffect(() => {
    const dur = getPresetDuration(technique)
    setTimerDuration(dur)
    setTimerMax(dur || 1)
    setTimerMode(dur > 0 ? 'countdown' : 'countup')
    setTimerRunning(false)
  }, [technique])

  useEffect(() => {
    let intervalId: any = null
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimerDuration((prev) => {
          if (timerMode === 'countdown') {
            if (prev <= 1) {
              setTimerRunning(false)
              playBeep()
              return 0
            }
            return prev - 1
          } else {
            return prev + 1
          }
        })
      }, 1000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [timerRunning, timerMode])

  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch (e) {
      console.warn('AudioContext beep failed', e)
    }
  }

  const [rating, setRating] = useState(3)
  const [tastingNotes, setTastingNotes] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setChecklist({})
  }, [selected])

  const handleSaveLog = () => {
    const elapsedSeconds = timerMode === 'countdown' ? (timerMax - timerDuration) : timerDuration
    const newLog: PracticeLog = {
      id: 'practice-' + Date.now(),
      cocktailId: selected.id,
      cocktailName: selected.name,
      date: new Date().toISOString(),
      focus,
      technique,
      durationSeconds: technique === 'build' || technique === 'none' ? 0 : elapsedSeconds,
      notes: tastingNotes,
      rating,
    }

    updateStored((s) => ({
      ...s,
      practiceLogs: [newLog, ...(s.practiceLogs || [])],
    }))

    setToastMessage('Practice session logged successfully!')
    setTastingNotes('')
    setRating(3)
    setChecklist({})
    setTimeout(() => setToastMessage(''), 3000)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredCocktails = useMemo(() => {
    if (!cocktailSearch.trim()) return cocktails.slice(0, 8)
    const clean = cocktailSearch.toLowerCase()
    return cocktails
      .filter((c) => c.name.toLowerCase().includes(clean) || c.family.toLowerCase().includes(clean))
      .slice(0, 8)
  }, [cocktails, cocktailSearch])

  const selectedLogs = useMemo(() => {
    return (state.practiceLogs || []).filter((log) => log.cocktailId === selected.id)
  }, [state.practiceLogs, selected.id])

  const focusGuidelines = {
    balance: {
      title: 'Balance Focus',
      description: 'Train your palate to identify sugar, acid, spirit, and water harmony. Measure ingredients strictly using a jigger.',
      tip: 'Tip: Dip a clean straw into the shaker/mixing glass before icing to taste the pre-dilution balance.',
    },
    dilution: {
      title: 'Dilution Focus',
      description: 'Dilution opens up high-proof esters and controls chill. Test the difference between 10s and 20s stirring.',
      tip: 'Tip: Use large, solid cubes. Wet, melting ice adds unregulated water that makes drinks watery.',
    },
    speed: {
      title: 'Speed Focus',
      description: 'Build efficiency through mise en place. Place bottles, tools, and glassware in standardized positions.',
      tip: 'Tip: Pour with your non-dominant hand holding the jigger, base spirit first to minimize bottle changes.',
    },
    aroma: {
      title: 'Aroma Focus',
      description: 'Over 80% of flavor is smell. Focus on oil expression, fresh garnishes, and glass rim wiping.',
      tip: 'Tip: Pinch the peel skin-side-down over the drink. A mist should settle on the surface without oil droplets in the eye.',
    },
    garnish: {
      title: 'Garnish Focus',
      description: 'Visual appeal is the first sip. Practice clean channel cuts, rim notches, and matching skewered garnishes.',
      tip: 'Tip: Garnish should touch the liquid slightly to release aromatics but not drown or get sticky.',
    },
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="page view-page">
      <ViewHeader eyebrow="Practice Lab" title="Refine technique & track structured tasting sessions" />

      {toastMessage && (
        <div className="diag-toast-alert success">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <section className="split-grid practice-lab-grid">
        <div className="panel studio-left-pane">
          <div className="cocktail-swap-selector" ref={dropdownRef}>
            <label className="section-label">Select Cocktail to Practice</label>
            <div className="selector-input-wrap">
              <input
                type="text"
                placeholder={`Currently: ${selected.name} (Type to change...)`}
                value={cocktailSearch}
                onChange={(e) => {
                  setCocktailSearch(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && (
                <div className="selector-dropdown">
                  {filteredCocktails.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        updateStored((s) => ({ ...s, selectedId: c.id }))
                        setCocktailSearch('')
                        setShowDropdown(false)
                      }}
                      className={c.id === selected.id ? 'active' : ''}
                    >
                      <span>{c.name}</span>
                      <small>{c.family} · {c.baseSpirit}</small>
                    </button>
                  ))}
                  {filteredCocktails.length === 0 && (
                    <div className="dropdown-no-results">No matches found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="studio-cocktail-preview">
            <img alt={selected.name} src={cocktailPhoto(selected)} />
            <div>
              <strong>{selected.name}</strong>
              <span>{selected.family} · {selected.baseSpirit}</span>
            </div>
          </div>

          <div className="practice-focus-section">
            <label className="section-label">Choose Practice Focus</label>
            <div className="focus-cards-grid">
              {(['balance', 'dilution', 'speed', 'aroma', 'garnish'] as PracticeFocus[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`focus-card ${focus === f ? 'active' : ''}`}
                  onClick={() => setFocus(f)}
                >
                  <strong>{titleize(f)}</strong>
                </button>
              ))}
            </div>
            <div className="focus-guideline-box">
              <h3>{focusGuidelines[focus].title}</h3>
              <p>{focusGuidelines[focus].description}</p>
              <small>{focusGuidelines[focus].tip}</small>
            </div>
          </div>

          <div className="build-coach-section">
            <label className="section-label">Build Coach Checklist</label>
            <div className="coach-checklist">
              <label className={`checklist-item ${checklist.glass ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checklist.glass || false}
                  onChange={() => setChecklist((prev) => ({ ...prev, glass: !prev.glass }))}
                />
                <span>Prep Glassware: <strong>{selected.glassware}</strong> with <strong>{selected.ice || 'no ice'}</strong></span>
              </label>
              <label className={`checklist-item ${checklist.mise ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checklist.mise || false}
                  onChange={() => setChecklist((prev) => ({ ...prev, mise: !prev.mise }))}
                />
                <span>Mise en Place: Gather {selected.ingredients.map(i => titleize(i.name)).join(', ')}</span>
              </label>
              <label className={`checklist-item ${checklist.measure ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checklist.measure || false}
                  onChange={() => setChecklist((prev) => ({ ...prev, measure: !prev.measure }))}
                />
                <span>Measure & Combine: Pour modifiers first, then spirits. <em>Jigger strictly!</em></span>
              </label>
              <label className={`checklist-item ${checklist.technique ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checklist.technique || false}
                  onChange={() => setChecklist((prev) => ({ ...prev, technique: !prev.technique }))}
                />
                <span>Execute Technique: <strong>{titleize(selected.method || 'build')}</strong> (Run timer on the right)</span>
              </label>
              <label className={`checklist-item ${checklist.garnish ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checklist.garnish || false}
                  onChange={() => setChecklist((prev) => ({ ...prev, garnish: !prev.garnish }))}
                />
                <span>Finish & Garnish: Express & set <strong>{selected.garnish || 'no garnish'}</strong></span>
              </label>
            </div>
          </div>
        </div>

        <div className="panel studio-right-pane">
          <div className="technique-timer-section">
            <label className="section-label">Technique Timer</label>
            <div className="technique-tabs">
              {(['shake', 'stir', 'swizzle', 'build'] as PracticeTechnique[]).map((tech) => (
                <button
                  key={tech}
                  className={`tech-tab ${technique === tech ? 'active' : ''}`}
                  onClick={() => setTechnique(tech)}
                >
                  {titleize(tech)}
                </button>
              ))}
            </div>

            <div className="timer-display-card">
              <div className="timer-dial">
                <svg className="timer-ring" width="120" height="120">
                  <circle
                    className="timer-ring-bg"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="6"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                  />
                  <circle
                    className="timer-ring-bar"
                    stroke="var(--accent)"
                    strokeWidth="6"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={
                      timerMode === 'countdown' && timerMax > 0
                        ? (2 * Math.PI * 52) * (1 - timerDuration / timerMax)
                        : 0
                    }
                  />
                </svg>
                <div className="timer-text">
                  <strong>{formatTime(timerDuration)}</strong>
                  <span>{timerMode === 'countdown' ? 'Remaining' : 'Elapsed'}</span>
                </div>
              </div>

              <div className="timer-controls">
                {timerMode === 'countdown' && (
                  <button
                    className="timer-offset-btn"
                    onClick={() => {
                      setTimerDuration((prev) => prev + 5)
                      setTimerMax((prev) => prev + 5)
                    }}
                  >
                    +5s
                  </button>
                )}
                <button
                  className={`timer-play-btn ${timerRunning ? 'running' : ''}`}
                  onClick={() => setTimerRunning(!timerRunning)}
                >
                  {timerRunning ? 'Pause' : 'Start'}
                </button>
                {timerMode === 'countdown' && (
                  <button
                    className="timer-offset-btn"
                    disabled={timerDuration <= 5}
                    onClick={() => {
                      setTimerDuration((prev) => Math.max(0, prev - 5))
                      setTimerMax((prev) => Math.max(5, prev - 5))
                    }}
                  >
                    -5s
                  </button>
                )}
                <button
                  className="timer-reset-btn"
                  onClick={() => {
                    setTimerRunning(false)
                    setTimerDuration(getPresetDuration(technique))
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="tasting-logger-section">
            <label className="section-label">Log Tasting & Session Results</label>
            <div className="rating-selector-block">
              <span>Your Rating:</span>
              <div className="stars-interactive">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="star-btn"
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={24}
                      fill={star <= rating ? 'var(--accent)' : 'none'}
                      stroke={star <= rating ? 'var(--accent)' : 'var(--muted)'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="tasting-notes-input"
              placeholder="Describe results (e.g. aroma, texture, balance, dilution levels)..."
              value={tastingNotes}
              onChange={(e) => setTastingNotes(e.target.value)}
              rows={3}
            />

            <button
              className="save-log-btn"
              onClick={handleSaveLog}
              disabled={!tastingNotes.trim()}
            >
              <Save size={16} />
              Save Tasting Session
            </button>
          </div>

          <div className="practice-history-section">
            <label className="section-label">Practice Logs for {selected.name}</label>
            <div className="logs-timeline">
              {selectedLogs.map((log) => (
                <div key={log.id} className="log-timeline-card">
                  <div className="log-header">
                    <span className="log-focus-tag">{log.focus}</span>
                    <span className="log-date">{new Date(log.date).toLocaleDateString()}</span>
                  </div>
                  <div className="log-meta">
                    <span>Tech: <strong>{log.technique}</strong></span>
                    {log.durationSeconds > 0 && (
                      <span>Time: <strong>{log.durationSeconds}s</strong></span>
                    )}
                    <span className="log-rating">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={11}
                          fill={idx < log.rating ? 'var(--accent)' : 'none'}
                          stroke={idx < log.rating ? 'var(--accent)' : 'var(--muted)'}
                        />
                      ))}
                    </span>
                  </div>
                  <p className="log-notes">{log.notes}</p>
                </div>
              ))}
              {selectedLogs.length === 0 && (
                <div className="logs-empty">No practice sessions logged for {selected.name} yet. Make a batch and log!</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}