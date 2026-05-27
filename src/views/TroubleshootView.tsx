import { useState, useEffect, useMemo, useRef } from 'react'
import { Check, Save } from 'lucide-react'
import { type CatalogCocktail } from '../data/catalog'
import { troubleFixes, type StoredState } from '../types'
import { cocktailPhoto } from '../utils'
import { ViewHeader } from '../components/ViewHeader'

export default function TroubleshootView({
  cocktails,
  notes,
  selected,
  setTrouble,
  trouble,
  updateStored,
}: {
  cocktails: CatalogCocktail[]
  notes: Record<string, string>
  selected: CatalogCocktail
  setTrouble: (trouble: string) => void
  trouble: string
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  const [cocktailSearch, setCocktailSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [customNote, setCustomNote] = useState('')
  const [appliedFixes, setAppliedFixes] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setCustomNote(`Troubleshoot (${trouble}): ${troubleFixes[trouble]?.[0] || ''}`)
    setAppliedFixes(new Set())
  }, [trouble, selected])

  const filteredCocktails = useMemo(() => {
    if (!cocktailSearch.trim()) return cocktails.slice(0, 8)
    const clean = cocktailSearch.toLowerCase()
    return cocktails
      .filter((c) => c.name.toLowerCase().includes(clean) || c.family.toLowerCase().includes(clean))
      .slice(0, 8)
  }, [cocktails, cocktailSearch])

  const toggleFix = (fix: string) => {
    setAppliedFixes((prev) => {
      const next = new Set(prev)
      if (next.has(fix)) {
        next.delete(fix)
      } else {
        next.add(fix)
      }
      return next
    })
  };

  const handleSaveNote = () => {
    updateStored((state) => ({
      ...state,
      notes: {
        ...state.notes,
        [selected.id]: `${state.notes[selected.id] || ''}\n${customNote}`.trim(),
      },
    }))
    setToastMessage(`Diagnosis saved to ${selected.name}!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const getFailureDescription = (mode: string) => {
    switch (mode) {
      case 'Too sweet': return 'Sugar overload'
      case 'Too sour': return 'Citrus imbalance'
      case 'Watery': return 'Over-diluted / Flat'
      case 'Flat': return 'Lacks crisp contrast'
      case 'Too bitter': return 'Dominant bitterness'
      case 'Hot': return 'High alcohol burn'
      default: return 'Flawed balance'
    }
  }

  const currentNotes = notes[selected.id] || ''

  return (
    <div className="page view-page">
      <ViewHeader eyebrow="Troubleshoot Studio" title="Diagnose & refine your cocktails" />
      
      {toastMessage && (
        <div className="diag-toast-alert">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <section className="split-grid troubleshoot-studio">
        <div className="panel studio-left-pane">
          <div className="cocktail-swap-selector" ref={dropdownRef}>
            <label className="section-label">Selected Cocktail</label>
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
                        updateStored((state) => ({ ...state, selectedId: c.id }))
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

          <div className="failure-modes-section">
            <label className="section-label">Select Failure Mode</label>
            <div className="failure-modes-grid">
              {Object.keys(troubleFixes).map((item) => {
                const isActive = trouble === item
                return (
                  <button
                    key={item}
                    type="button"
                    className={`failure-mode-card ${isActive ? 'active' : ''}`}
                    onClick={() => setTrouble(item)}
                  >
                    <strong>{item}</strong>
                    <span>{getFailureDescription(item)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="panel studio-right-pane">
          <div className="fixes-diagnostic-block">
            <label className="section-label">Recommended Corrective Actions</label>
            <div className="fixes-list">
              {troubleFixes[trouble].map((fix) => {
                const isChecked = appliedFixes.has(fix)
                return (
                  <label key={fix} className={`fix-checkbox-item ${isChecked ? 'applied' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFix(fix)}
                    />
                    <span>{fix}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="note-builder-block">
            <label className="section-label">Customize Diagnosis Note</label>
            <textarea
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Describe what went wrong and how you resolved it..."
              rows={3}
            />
            <button className="save-diag-btn" onClick={handleSaveNote}>
              <Save size={16} />
              Save to Recipe Notes
            </button>
          </div>

          {currentNotes && (
            <div className="studio-saved-notes-block">
              <label className="section-label">Existing Notes for {selected.name}</label>
              <div className="existing-notes-content">
                {currentNotes.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}