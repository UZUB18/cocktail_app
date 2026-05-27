import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft, BottleWine, ChevronRight, ClipboardList, Clock3, Copy, FlaskConical, Gauge,
  Martini, Minus, MoreHorizontal, Plus, Save, Share2, ShoppingBag, Star, Trophy, Wine, Wrench,
} from 'lucide-react'
import type { Tab, StoredState, View } from '../types'
import { tabs } from '../types'
import type { CatalogCocktail } from '../data/catalog'
import {
  cocktailPhoto, titleize, formatIngredient, formatPlainIngredient,
  flavorMeters, highlightTerms, estimateDilution, findVariationCocktail,
  mergeList, getSubstitutionDetails,
} from '../utils'
import { toggleItem } from '../storage'

export default function RecipeDetail({
  activeTab, collectionIds, metric, missingForSelected, savedIds,
  scale, selected, setActiveTab, setActiveView, setMetric, setScale,
  tabContent, updateStored,
}: {
  activeTab: Tab; collectionIds: string[]; metric: boolean; missingForSelected: string[]
  notes: Record<string, string>; savedIds: string[]; scale: number
  selected: CatalogCocktail
  setActiveTab: (tab: Tab) => void; setActiveView: (view: View) => void
  setMetric: (metric: boolean) => void
  setScale: (scale: number | ((current: number) => number)) => void
  tabContent: string[]
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  const isSaved = savedIds.includes(selected.id)
  const isCollected = collectionIds.includes(selected.id)
  const imageUrl = cocktailPhoto(selected)
  const methodSteps = buildDisplayMethodSteps(selected)
  const [openSubstIngredient, setOpenSubstIngredient] = useState<string | null>(null)

  return (
    <div className="recipe-page">
      <div className="recipe-detail-shell">
        <main className="recipe-detail-main">
          <div className="recipe-hero">
            <figure className="recipe-hero-photo">
              <img alt={selected.name} referrerPolicy="no-referrer" src={imageUrl} />
            </figure>

            <div className="recipe-actions recipe-hero-actions">
              <button className={`recipe-action-btn ${isSaved ? 'saved' : ''}`}
                onClick={() => updateStored((s) => ({ ...s, savedIds: toggleItem(s.savedIds, selected.id) }))}>
                <Save size={13} /> {isSaved ? 'Saved' : 'Save'}
              </button>
              <button className={`recipe-action-btn ${isCollected ? 'saved' : ''}`}
                onClick={() => updateStored((s) => ({ ...s, collectionIds: toggleItem(s.collectionIds, selected.id) }))}>
                <Plus size={13} /> Collect
              </button>
              <button className="recipe-action-btn"
                onClick={() => navigator.clipboard?.writeText(`${selected.name}: ${selected.ingredients.map(formatPlainIngredient).join(', ')}`)}>
                <Share2 size={13} /> Copy
              </button>
            </div>

            <div className="recipe-hero-content">
              <span className="recipe-hero-family">
                {selected.source === 'custom' ? 'Local spec' : selected.family}
              </span>
              <div className="recipe-title-row">
                <h1 className="recipe-hero-name">{selected.name}</h1>
                <button className={`recipe-title-icon ${isSaved ? 'active' : ''}`} aria-label={isSaved ? 'Unsave recipe' : 'Save recipe'}
                  onClick={() => updateStored((s) => ({ ...s, savedIds: toggleItem(s.savedIds, selected.id) }))}>
                  <Star size={18} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
                <button className="recipe-title-icon" aria-label="More recipe actions"><MoreHorizontal size={18} /></button>
              </div>
              <p className="recipe-hero-subtitle">
                {selected.style || selected.family} &middot; {selected.difficulty || 'balanced'}
              </p>
              <p className="recipe-hero-desc">{selected.whyItWorks || selected.historyNotes}</p>

              <div className="recipe-meta-inline">
                <MetaChip icon={BottleWine} label="Spirit" value={titleize(selected.baseSpirit)} />
                <MetaChip icon={Martini} label="Style" value={selected.style || selected.family} />
                <MetaChip icon={Gauge} label="Difficulty" value={titleize(selected.difficulty)} />
                <MetaChip icon={Clock3} label="Prep" value={selected.prepTime} />
              </div>

              <div className="recipe-tags">
                {[selected.family, selected.baseSpirit, selected.style, selected.ice, selected.glassware]
                  .filter(Boolean).slice(0, 5)
                  .map((t) => <span className="recipe-tag" key={t}>{t}</span>)}
              </div>
            </div>
          </div>

          <section className="recipe-main-card">
            <div className="recipe-tabs" role="tablist">
              {tabs.map((tab) => (
                <button className={`recipe-tab ${activeTab === tab ? 'active' : ''}`} key={tab}
                  onClick={() => setActiveTab(tab as Tab)} role="tab" type="button">{tab}</button>
              ))}
            </div>

            {activeTab === 'Recipe' ? (
              <div className="recipe-content-grid">
                <section className="recipe-ingredients-panel">
              <div className="recipe-ingredients-header">
                <h2>Ingredients</h2>
                <label style={{ fontSize: '9px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--muted)' }}>
                  <span>Metric</span>
                  <input checked={metric} onChange={(e) => setMetric(e.target.checked)} type="checkbox" style={{ accentColor: 'var(--accent)' }} />
                </label>
              </div>
              {selected.ingredients.map((ing, i) => {
                const isMissing = missingForSelected.includes(ing.name.toLowerCase())
                const substDetails = isMissing ? getSubstitutionDetails(ing.name) : []
                return (
                  <div key={`${ing.name}-${i}`}>
                    <div className={`recipe-ingredient-row ${isMissing ? 'missing' : ''}`}
                      onClick={() => isMissing && setOpenSubstIngredient(openSubstIngredient === ing.name ? null : ing.name)}>
                      <strong className="recipe-ingredient-amount">{formatIngredient(ing, scale, metric)}</strong>
                      <BottleWine size={13} className="recipe-ingredient-icon" />
                      <span className="recipe-ingredient-name">
                        {titleize(ing.name)}{isMissing && <small>Tap for subs</small>}
                      </span>
                      {isMissing ? <Wrench size={12} style={{ color: 'var(--accent)' }} /> : <MoreHorizontal size={12} style={{ color: 'var(--faint)' }} />}
                    </div>
                    {isMissing && openSubstIngredient === ing.name && (
                      <div className="subst-expanded-drawer">
                        <span className="subst-drawer-title">Alternatives</span>
                        <div className="subst-chips-list">
                          {substDetails.map((sub) => (
                            <span key={sub.name} className="subst-chip detailed">
                              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: sub.color, border: '1px solid rgba(255,255,255,0.15)', marginRight: '4px', flexShrink: 0 }} />
                              <span style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                <strong style={{ fontSize: '10px' }}>{titleize(sub.name)}</strong>
                                <span style={{ display: 'flex', gap: '4px', fontSize: '8px', opacity: 0.7 }}>
                                  <span>{sub.abvDisplay}</span><span>{sub.sweetnessDelta}</span><span>{sub.matchScore}%</span>
                                </span>
                              </span>
                            </span>
                          ))}
                          {!substDetails.length && <span className="subst-none-message">No exact substitutes.</span>}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
              <div className="recipe-list-actions">
                <button className="recipe-list-action" onClick={() =>
                  updateStored((s) => ({ ...s, shoppingList: mergeList(s.shoppingList, selected.ingredients.map((i) => i.name)) }))
                }><Plus size={12} /> Shopping</button>
                <button className="recipe-list-action" onClick={() =>
                  navigator.clipboard?.writeText(selected.ingredients.map(formatPlainIngredient).join('\n'))
                }><Copy size={12} /> Copy</button>
              </div>
                </section>

                <section className="recipe-method-panel">
              <h2>Method</h2>
              <ol className="recipe-method-list">
                {methodSteps.map((step, i) => (
                  <li className="recipe-method-step" key={`${step}-${i}`}><span>{i + 1}</span>{step}</li>
                ))}
              </ol>
              <div className="recipe-quick-stats">
                <h3>Quick Stats</h3>
                <div className="recipe-quick-stats-grid">
                  <Stat label="Glassware" value={selected.glassware} />
                  <Stat label="Garnish" value={selected.garnish} />
                  <Stat label="Ice" value={selected.ice} />
                  <Stat label="Dilution" value={estimateDilution(selected)} />
                </div>
              </div>
                  <div className="recipe-pro-tip">
                    <Trophy size={15} />
                    <div>
                      <strong>Pro Tip</strong>
                      <span>Use quality lime juice and a clean, crisp rum to let the balance shine.</span>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className="recipe-tab-panel">
                <h2>{activeTab}</h2>
                {activeTab === 'Variations' ? (
                  <VariationPanel
                    onOpenVariation={(c) => { updateStored((s) => ({ ...s, selectedId: c.id })); setActiveTab('Recipe') }}
                    variations={selected.variations}
                  />
                ) : (
                  <div className="recipe-tab-content">
                    {tabContent.map((item) => <p key={item}>{item}</p>)}
                    {!tabContent.length && <p>No notes yet.</p>}
                  </div>
                )}
              </div>
            )}
          </section>
        </main>

        <RecipeSideRail selected={selected} />
      </div>

      <footer className="recipe-bottom-bar">
        <button className="recipe-bottom-btn" onClick={() => setActiveView('Search')}>
          <ArrowLeft size={15} /> Back to Recipes
        </button>
        <div className="recipe-bottom-actions">
          <button className="recipe-bottom-btn" onClick={() => setActiveView('Practice Lab')}>
            <ClipboardList size={15} /> Practice This Recipe
          </button>
          <button className="recipe-bottom-btn" onClick={() => setActiveView('Batch Planner')}>
            <FlaskConical size={15} /> Batch <small>New</small>
          </button>
          <button className="recipe-bottom-btn"
            onClick={() => updateStored((s) => ({ ...s, shoppingList: mergeList(s.shoppingList, missingForSelected) }))}>
            <ShoppingBag size={15} /> Shop ({missingForSelected.length})
          </button>
          <div className="recipe-scale-chip">
            <span>Scale</span>
            <button aria-label="Decrease scale" onClick={() => setScale((c) => Math.max(1, c - 1))}><Minus size={12} /></button>
            <strong>{scale}x</strong>
            <button aria-label="Increase scale" onClick={() => setScale((c) => Math.min(20, c + 1))}><Plus size={12} /></button>
          </div>
        </div>
        <div className="recipe-bottom-actions compact">
          <button className="recipe-icon-btn" aria-label="Copy recipe notes"
            onClick={() => navigator.clipboard?.writeText(selected.ingredients.map(formatPlainIngredient).join('\n'))}>
            <Copy size={16} />
          </button>
          <button className="recipe-icon-btn" aria-label="Share recipe"
            onClick={() => navigator.clipboard?.writeText(`${selected.name}: ${selected.ingredients.map(formatPlainIngredient).join(', ')}`)}>
            <Share2 size={16} />
          </button>
        </div>
      </footer>
    </div>
  )
}

function MetaChip({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return <span className="recipe-meta-chip"><Icon size={12} /> {label}: <strong>{value || 'Flexible'}</strong></span>
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: '0 6px', alignItems: 'center' }}>
      <Wine size={12} style={{ gridRow: 'span 2', color: 'var(--accent)' }} />
      <span style={{ fontSize: '9px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
      <strong style={{ fontSize: '10px', color: 'var(--text)', fontWeight: 500 }}>{value || 'House choice'}</strong>
    </div>
  )
}

function buildDisplayMethodSteps(selected: CatalogCocktail): string[] {
  const steps = selected.methodSteps.length ? selected.methodSteps : [selected.method]
  if (steps.length > 1) return steps
  const primary = steps[0] || selected.method || 'Build to taste.'
  const hasStrain = /strain/i.test(primary)
  const hasGarnish = /garnish/i.test(primary)
  return [
    primary,
    hasStrain ? `Strain into a chilled ${selected.glassware || 'glass'}.` : `Serve in a ${selected.glassware || 'glass'} with ${selected.ice || 'appropriate ice'}.`,
    hasGarnish ? `Finish with ${selected.garnish || 'the listed garnish'}.` : `Garnish with ${selected.garnish || 'the listed garnish'}.`,
  ]
}

function RecipeSideRail({ selected }: { selected: CatalogCocktail }) {
  return (
    <aside className="recipe-side-rail">
      <div className="recipe-rating-block">
        <div className="recipe-rating-medal"><Trophy size={32} /></div>
        <div>
          <strong>{selected.source === 'custom' ? 'Local' : '4.7'}</strong>
          <span>{selected.source === 'custom' ? 'Private spec' : '(128 ratings)'}</span>
        </div>
      </div>

      <div className="recipe-user-rating">
        <span>Your Rating</span>
        <div>
          {Array.from({ length: 5 }).map((_, i) => <Star size={19} key={i} />)}
        </div>
      </div>

      <div className="recipe-rail-facts">
        <RailFact icon={Martini} label="Glassware" value={selected.glassware} />
        <RailFact icon={Wine} label="Garnish" value={selected.garnish} />
        <RailFact icon={ShoppingBag} label="Ice" value={selected.ice} />
        <RailFact icon={BottleWine} label="Dilution" value={estimateDilution(selected)} />
      </div>

      <FlavorPanel selected={selected} />
    </aside>
  )
}

function RailFact({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="recipe-rail-fact">
      <Icon size={16} />
      <div>
        <span>{label}</span>
        <strong>{value || 'House choice'}</strong>
      </div>
    </div>
  )
}

function VariationPanel({ onOpenVariation, variations }: {
  onOpenVariation: (c: CatalogCocktail) => void; variations: string[]
}) {
  const links = variations.map((v) => ({ name: v, cocktail: findVariationCocktail(v) }))
  const linked = links.filter((i): i is { name: string; cocktail: CatalogCocktail } => Boolean(i.cocktail))
  const unavailable = links.filter((i) => !i.cocktail).map((i) => i.name)

  return (
    <div>
      {linked.length > 0 && (
        <div className="recipe-variation-section">
          <span className="section-label">Available recipes</span>
          <div className="recipe-variation-grid">
            {linked.map(({ cocktail }) => (
              <button className="recipe-variation-btn" key={cocktail.id} onClick={() => onOpenVariation(cocktail)}>
                <img alt={cocktail.name} src={cocktailPhoto(cocktail)} />
                <span><strong>{cocktail.name}</strong><small>{cocktail.family} &middot; {cocktail.baseSpirit}</small></span>
                <ChevronRight size={12} style={{ marginLeft: 'auto', color: 'var(--muted)' }} />
              </button>
            ))}
          </div>
        </div>
      )}
      {unavailable.length > 0 && (
        <div className="recipe-variation-section">
          <span className="section-label">Not in catalog</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {unavailable.map((v) => <span key={v} style={{ padding: '2px 6px', borderRadius: '999px', border: '1px solid var(--line)', fontSize: '9px', color: 'var(--muted)' }}>{v}</span>)}
          </div>
        </div>
      )}
      {!variations.length && <p style={{ fontSize: '11px', color: 'var(--muted)' }}>No variations listed.</p>}
    </div>
  )
}

function FlavorPanel({ selected }: { selected: CatalogCocktail }) {
  const meters = flavorMeters(selected)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current || !(window as any).Chart) return
    const Chart = (window as any).Chart
    if (chartRef.current) chartRef.current.destroy()
    chartRef.current = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: ['Sweet', 'Sour', 'Bitter', 'Spirit Forward'],
        datasets: [{
          label: selected.name,
          data: [meters[0].value, meters[1].value, meters[2].value, meters[3].value],
          backgroundColor: 'rgba(229, 147, 58, 0.12)',
          borderColor: 'rgba(229, 147, 58, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: '#e5933a',
          pointBorderColor: '#f0d1ad',
          pointBorderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 5,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: true, animation: { duration: 500 },
        scales: {
          r: {
            beginAtZero: true, max: 8,
            ticks: { display: false, stepSize: 2 },
            grid: { color: 'rgba(255,255,255,0.04)' },
            angleLines: { color: 'rgba(255,255,255,0.06)' },
            pointLabels: { color: '#a88c69', font: { size: 9, family: 'Outfit, sans-serif', weight: '600' as any } },
          }
        },
        plugins: {
          tooltip: { enabled: true, callbacks: { label: (ctx: any) => `${['Sweetness','Acidity','Bitterness','Spirit'][ctx.dataIndex]}: ${ctx.parsed.r}/8` } },
          legend: { display: false },
        }
      }
    })
    return () => { if (chartRef.current) chartRef.current.destroy() }
  }, [selected, meters])

  return (
    <section className="recipe-flavor-panel">
      <h2>Tasting Balance</h2>
      <canvas ref={canvasRef} />
      <div className="recipe-meter-list">
        {meters.map((meter) => (
          <div className="recipe-meter-row" key={meter.label}>
            <span>{meter.label}</span>
            <div>
              {Array.from({ length: 8 }).map((_, i) => (
                <span className={i < meter.value ? 'filled' : ''} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="recipe-highlight-tags">
        {highlightTerms(selected).map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
    </section>
  )
}
