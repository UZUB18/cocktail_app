import { useState, useMemo } from 'react'
import { AlertTriangle, CalendarDays, ChevronRight, ClipboardList, FileDown, Minus, Plus, ShoppingBag, Trash2, Users, X, Check } from 'lucide-react'
import type { CatalogCocktail } from '../data/catalog'
import type { PartyMenuItem, StockStatus, StoredState } from '../types'
import { mergeList } from '../utils'
import { cocktailPhoto, titleize, ingredientCoverage, buildPartyPlan, formatBatchVolume, formatPartyIngredientAmount } from '../utils'
import { StatBlock } from '../components/StatBlock'

export default function PartyModeView({
  cocktails,
  inventory,
  inventoryLevels,
  onOpen,
  partyMenu,
  updateStored,
}: {
  cocktails: CatalogCocktail[]
  inventory: string[]
  inventoryLevels: Record<string, StockStatus>
  onOpen: (cocktail: CatalogCocktail) => void
  partyMenu: PartyMenuItem[]
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  const [candidateId, setCandidateId] = useState(cocktails[0]?.id ?? '')
  const menuItems = partyMenu
    .map((item) => ({ ...item, cocktail: cocktails.find((cocktail) => cocktail.id === item.id) }))
    .filter((item): item is PartyMenuItem & { cocktail: CatalogCocktail } => Boolean(item.cocktail))
  const availableCocktails = cocktails.filter((cocktail) => !menuItems.some((item) => item.id === cocktail.id))
  const plan = useMemo(
    () => buildPartyPlan(menuItems, inventory, inventoryLevels),
    [menuItems, inventory, inventoryLevels],
  )
  const [hostMode, setHostMode] = useState(false)

  function updateMenu(nextMenu: PartyMenuItem[]) {
    updateStored((state) => ({ ...state, partyMenu: nextMenu.slice(0, 6) }))
  }

  function addCandidate() {
    if (!candidateId || menuItems.length >= 6 || menuItems.some((item) => item.id === candidateId)) return
    updateMenu([...menuItems.map(({ id, servings }) => ({ id, servings })), { id: candidateId, servings: 12 }])
    setCandidateId(availableCocktails.find((cocktail) => cocktail.id !== candidateId)?.id ?? '')
  }

  function updateServings(id: string, servings: number) {
    updateMenu(
      menuItems.map((item) => ({
        id: item.id,
        servings: item.id === id ? Math.min(300, Math.max(1, servings)) : item.servings,
      })),
    )
  }

  function removeMenuItem(id: string) {
    updateMenu(menuItems.filter((item) => item.id !== id).map((item) => ({ id: item.id, servings: item.servings })))
  }

  if (hostMode) {
    const [rounds, setRounds] = useState<Record<string, number>>({})
    const [startTime] = useState(Date.now())
    const [elapsed, setElapsed] = useState(0)

    // Timer effect
    useState(() => {
      const interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    })

    function formatTime(secs: number) {
      const m = Math.floor(secs / 60)
      const s = secs % 60
      return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    function completeRound(id: string, total: number) {
      setRounds((prev) => ({ ...prev, [id]: Math.min(total, (prev[id] || 0) + 1) }))
    }

    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#090908', color: '#f0e8d0',
        display: 'flex', flexDirection: 'column', overflow: 'auto',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <button
            onClick={() => setHostMode(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', padding: '0.5rem 1rem',
              color: '#f0e8d0', cursor: 'pointer', fontSize: '0.9rem',
            }}
          >
            <X size={20} /> Exit Host Mode
          </button>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', color: '#e5933a', margin: 0, letterSpacing: '0.02em' }}>
              🎉 Party Service
            </h1>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.95rem', color: '#a88c69' }}>
              {plan.totalServes} total serves · {menuItems.length} drinks · ⏱ {formatTime(elapsed)}
            </p>
          </div>
          <div style={{ width: '140px' }} />
        </div>

        {/* Drink cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem', padding: '1.5rem 2rem', flex: 1,
        }}>
          {menuItems.map((item) => {
            const completed = rounds[item.id] || 0
            const total = item.servings
            const progress = total > 0 ? (completed / total) * 100 : 0
            return (
              <div key={item.id} style={{
                background: 'linear-gradient(135deg, #141428, #0f0f1a)',
                border: '1px solid #2a2a4a', borderRadius: '16px',
                padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, margin: 0, color: '#f0e8d0' }}>
                      {item.cocktail.name}
                    </h2>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#a88c69' }}>
                      {item.cocktail.family} · {item.cocktail.baseSpirit}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '2rem', fontWeight: 700, color: '#e5933a',
                  }}>
                    {item.servings}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px',
                  overflow: 'hidden', margin: '0.25rem 0',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '999px',
                    background: 'linear-gradient(90deg, #22c55e, #eab308)',
                    width: `${progress}%`, transition: 'width 0.3s ease',
                  }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8888b0' }}>
                  <span>{completed} of {total} rounds</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <button
                  onClick={() => completeRound(item.id, total)}
                  disabled={completed >= total}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '1rem', borderRadius: '10px', border: 'none',
                    background: completed >= total
                      ? 'rgba(34,197,94,0.15)'
                      : 'linear-gradient(135deg, #e5933a, #78350f)',
                    color: completed >= total ? '#22c55e' : '#fff',
                    cursor: completed >= total ? 'default' : 'pointer',
                    fontSize: '1rem', fontWeight: 700,
                    marginTop: 'auto',
                  }}
                >
                  {completed >= total ? <Check size={20} /> : <Plus size={20} />}
                  {completed >= total ? 'All Done!' : 'Complete Round'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="page party-page">
      <div className="batch-topline">
        <div>
          <span className="eyebrow">Party Mode</span>
          <h1>Build a 3-6 drink menu with one shopping and prep plan</h1>
          <p>Pick cocktails, set serves per drink, then use the aggregated ingredient list and service timeline.</p>
        </div>
        <div className="batch-actions party-top-actions">
          <button
            onClick={() =>
              updateStored((state) => ({
                ...state,
                collectionIds: mergeList(
                  state.collectionIds,
                  menuItems.map((item) => item.id),
                ),
              }))
            }
          >
            Save to collection
          </button>
          <button
            className="save-batch"
            onClick={() => navigator.clipboard?.writeText(plan.labels.map((label) => label.text).join('\n'))}
          >
            Copy labels
            <ClipboardList size={16} />
          </button>
          <button
            onClick={() => setHostMode(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '0.5rem 1rem', borderRadius: '8px',
              border: '1px solid var(--accent)',
              background: 'linear-gradient(135deg, rgba(229,147,58,0.15), rgba(229,147,58,0.05))',
              color: 'var(--accent)', cursor: 'pointer',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em',
            }}
          >
            <Users size={16} /> Host Mode
          </button>
        </div>
      </div>

      <section className="party-layout">
        <div className="panel party-builder">
          <div className="panel-heading-row">
            <h2>Menu builder</h2>
            <span>{menuItems.length}/6 drinks</span>
          </div>
          <div className="party-add-row">
            <select value={candidateId} onChange={(event) => setCandidateId(event.target.value)}>
              {availableCocktails.map((cocktail) => (
                <option key={cocktail.id} value={cocktail.id}>
                  {cocktail.name}
                </option>
              ))}
            </select>
            <button
              disabled={menuItems.length >= 6 || !availableCocktails.length || menuItems.some((item) => item.id === candidateId)}
              onClick={addCandidate}
            >
              <Plus size={16} /> Add drink
            </button>
          </div>
          {menuItems.length < 3 && (
            <p className="editor-warning">
              <AlertTriangle size={16} />
              Party mode is most useful with at least 3 drinks.
            </p>
          )}
          <div className="party-menu-list">
            {menuItems.map((item) => {
              const coverage = ingredientCoverage(item.cocktail, inventory, inventoryLevels)
              return (
                <article key={item.id}>
                  <img alt={`${item.cocktail.name} cocktail`} src={cocktailPhoto(item.cocktail)} />
                  <div>
                    <button onClick={() => onOpen(item.cocktail)}>
                      <strong>{item.cocktail.name}</strong>
                      <ChevronRight size={16} />
                    </button>
                    <span>{item.cocktail.family} - {coverage.score}% makeable</span>
                  </div>
                  <div className="serving-stepper">
                    <button onClick={() => updateServings(item.id, item.servings - 1)}>
                      <Minus size={15} />
                    </button>
                    <strong>{item.servings}</strong>
                    <button onClick={() => updateServings(item.id, item.servings + 1)}>
                      <Plus size={15} />
                    </button>
                  </div>
                  <button className="party-remove-button" aria-label={`Remove ${item.cocktail.name}`} onClick={() => removeMenuItem(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <aside className="panel party-summary">
          <div className="panel-heading-row">
            <h2>Event totals</h2>
            <Users size={20} />
          </div>
          <div className="stock-grid">
            <StatBlock label="Menu drinks" value={`${menuItems.length}`} />
            <StatBlock label="Total serves" value={`${plan.totalServes}`} />
            <StatBlock label="Missing items" value={`${plan.missingIngredients.length}`} />
            <StatBlock label="Batch volume" value={formatBatchVolume(plan.totalBatchMl, true)} />
          </div>
          <button
            className="save-batch"
            onClick={() =>
              updateStored((state) => ({
                ...state,
                shoppingList: mergeList(state.shoppingList, plan.missingIngredients),
              }))
            }
          >
            <ShoppingBag size={16} /> Add missing to shopping
          </button>
        </aside>
      </section>

      <section className="party-grid">
        <div className="panel">
          <div className="panel-heading-row">
            <h2>Aggregated shopping run</h2>
            <span>{plan.aggregated.length} ingredient groups</span>
          </div>
          <div className="party-table">
            <div className="party-table-row party-head">
              <span>Ingredient</span>
              <span>Total</span>
              <span>Used in</span>
              <span>Status</span>
            </div>
            {plan.aggregated.map((row) => (
              <div className="party-table-row" key={row.key}>
                <span>{titleize(row.name)}</span>
                <span>{formatPartyIngredientAmount(row)}</span>
                <span>{row.drinks.join(', ')}</span>
                <span className={row.missing ? 'missing-line' : row.lowStock ? 'missing-line warning' : 'missing-line success'}>
                  {row.missing ? 'Shop' : row.lowStock ? 'Low stock' : 'Ready'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel prep-labels">
          <div className="panel-heading-row">
            <h2>Prep labels</h2>
            <FileDown size={18} />
          </div>
          {plan.labels.map((label) => (
            <article key={label.name}>
              <strong>{label.name}</strong>
              <span>{label.text}</span>
              <small>{label.caution}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel timeline-panel">
        <div className="panel-heading-row">
          <h2>Service timeline</h2>
          <CalendarDays size={18} />
        </div>
        <div className="timeline-grid">
          {plan.timeline.map((item) => (
            <article key={item.time}>
              <span>{item.time}</span>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}