import { useState } from 'react'
import {
  AlertTriangle, Check, ChevronRight, ClipboardList, FileDown, FileUp, FlaskConical,
  Martini, Plus, RotateCcw, Save, Search, ShoppingBag, Sparkles, Trash2, Users, Wine,
} from 'lucide-react'
import type { CatalogCocktail } from '../data/catalog'
import type {
  CustomDraft, CustomIngredientDraft, StoredState, View,
} from '../types'
import { storageSummary } from '../storage'
import {
  cocktailPhoto, byName, countMatches, normalizeCocktailName, titleize, formatDateTime,
} from '../utils'
import { SectionTitle } from '../components/SectionTitle'
import { StatBlock } from '../components/StatBlock'

export default function HomeView({
  cocktails,
  customDraft,
  customMessage,
  inventoryCount,
  onExportBackup,
  onCreate,
  onImportBackup,
  onOpen,
  onResetStorage,
  recentSearches,
  savedCount,
  savedIds,
  selected,
  setActiveView,
  setCustomDraft,
  setQuery,
  shoppingCount,
  state,
  storageMessage,
  submitSearch,
  toggleSave,
}: {
  cocktails: CatalogCocktail[]
  customDraft: CustomDraft
  customMessage: string
  inventoryCount: number
  onExportBackup: () => void
  onCreate: () => void
  onImportBackup: (file: File) => void
  onOpen: (cocktail: CatalogCocktail) => void
  onResetStorage: () => void
  recentSearches: string[]
  savedCount: number
  savedIds: string[]
  selected: CatalogCocktail
  setActiveView: (view: View) => void
  setCustomDraft: (draft: CustomDraft) => void
  setQuery: (query: string) => void
  shoppingCount: number
  state: StoredState
  storageMessage: string
  submitSearch: (query: string) => void
  toggleSave: (id: string) => void
}) {
  const [activeMenu, setActiveMenu] = useState<'explore' | 'shelf' | 'creator' | 'data'>('explore')
  const heroCocktail = byName(cocktails, 'Manhattan') || cocktails[0]
  const continueCocktail = selected || heroCocktail
  const featuredCocktails = ['Jungle Bird', 'Negroni', 'Margarita', 'Whiskey Smash']
    .map((name) => byName(cocktails, name))
    .filter(Boolean) as CatalogCocktail[]
  const lowStock = Math.max(shoppingCount, 0)
  const wellStocked = Math.max(inventoryCount - lowStock, 0)
  const runningLow = Math.max(Math.min(lowStock, inventoryCount), 0)
  const outOfStock = Math.max(lowStock - runningLow, 0)
  const activityItems = [
    {
      icon: Check,
      title: `You opened ${continueCocktail.name}`,
      detail: recentSearches[0] ? `Recent search: ${recentSearches[0]}` : 'Ready to keep editing',
    },
    {
      icon: Save,
      title: savedCount > 0 ? `You saved ${savedCount} specs` : 'No saved specs yet',
      detail: savedCount > 0 ? 'Favorites are stored locally' : 'Bookmark cocktails from any card',
    },
    {
      icon: ShoppingBag,
      title: lowStock > 0 ? `${lowStock} items need restocking` : 'Shopping list is clear',
      detail: inventoryCount > 0 ? `${inventoryCount} ingredients in inventory` : 'Start by adding your bottles',
    },
  ]
  const collectionTiles = [
    { label: 'Bitter Tiki', query: 'bitter tiki', icon: Martini, count: countMatches(cocktails, 'tiki bitter') },
    { label: 'Rye & Campari', query: 'rye campari', icon: Wine, count: countMatches(cocktails, 'rye campari') },
    { label: 'Party Batches', query: 'punch batch', icon: FlaskConical, count: countMatches(cocktails, 'punch batch') },
    { label: 'Zero-Proof', query: 'NA zero proof', icon: Sparkles, count: countMatches(cocktails, 'NA zero proof') },
  ]
  const baseOptions = ['Gin', 'Rum', 'Whiskey', 'Tequila', 'Mezcal', 'Brandy', 'Vodka', 'No spirit']
  const summary = storageSummary(state)
  const duplicateCustom = customDraft.name.trim()
    ? cocktails.find((cocktail) => normalizeCocktailName(cocktail.name) === normalizeCocktailName(customDraft.name))
    : null

  function runPresetSearch(value: string) {
    setQuery(value)
    submitSearch(value)
  }

  function updateCustomIngredient(index: number, key: keyof CustomIngredientDraft, value: string) {
    setCustomDraft({
      ...customDraft,
      ingredients: customDraft.ingredients.map((ingredient, currentIndex) =>
        currentIndex === index ? { ...ingredient, [key]: value } : ingredient,
      ),
    })
  }

  function updateCustomStep(index: number, value: string) {
    setCustomDraft({
      ...customDraft,
      methodSteps: customDraft.methodSteps.map((step, currentIndex) => (currentIndex === index ? value : step)),
    })
  }

  return (
    <div className="home-page">
      <div className="home-left-column">
        <div className="home-welcome">
          <span className="eyebrow">Local-first · Private · Serverless</span>
          <h1>Your cocktail library, beautifully organized.</h1>
        </div>

        <nav className="home-menu-nav">
          <button
            className={`home-menu-btn ${activeMenu === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveMenu('explore')}
          >
            <span className="menu-num">01</span>
            <span className="menu-label">Explore Catalog</span>
          </button>
          <button
            className={`home-menu-btn ${activeMenu === 'shelf' ? 'active' : ''}`}
            onClick={() => setActiveMenu('shelf')}
          >
            <span className="menu-num">02</span>
            <span className="menu-label">Barshelf & Stock</span>
          </button>
          <button
            className={`home-menu-btn ${activeMenu === 'creator' ? 'active' : ''}`}
            onClick={() => setActiveMenu('creator')}
          >
            <span className="menu-num">03</span>
            <span className="menu-label">Recipe Creator</span>
          </button>
          <button
            className={`home-menu-btn ${activeMenu === 'data' ? 'active' : ''}`}
            onClick={() => setActiveMenu('data')}
          >
            <span className="menu-num">04</span>
            <span className="menu-label">Data Center</span>
          </button>
        </nav>

        <div className="home-menu-content">
          {activeMenu === 'explore' && (
            <div className="menu-pane-fade">
              <div className="search-bar-sim" onClick={() => setActiveView('Search')}>
                <Search size={18} />
                <span>Search cocktail names, ingredients, families...</span>
              </div>
              
              <div className="collections-row">
                {collectionTiles.map((tile) => (
                  <button className="mini-collection-chip" key={tile.label} onClick={() => runPresetSearch(tile.query)}>
                    <tile.icon size={15} />
                    <span>{tile.label}</span>
                    <small>{tile.count}</small>
                  </button>
                ))}
              </div>

              <div className="featured-home-section">
                <SectionTitle action="Browse all" onAction={() => setActiveView('Search')} title="Featured Cocktails" />
                <div className="featured-home-grid">
                  {featuredCocktails.map((cocktail) => (
                    <article className="featured-home-card" key={cocktail.id}>
                      <button onClick={() => onOpen(cocktail)}>
                        <img alt={`${cocktail.name} cocktail`} loading="lazy" src={cocktailPhoto(cocktail)} />
                        <span>
                          <strong>{cocktail.name}</strong>
                          <small>{[cocktail.family, cocktail.difficulty, cocktail.style].filter(Boolean).slice(0, 3).join(' - ')}</small>
                        </span>
                      </button>
                      <button aria-label={`Save ${cocktail.name}`} onClick={() => toggleSave(cocktail.id)}>
                        <Save fill={savedIds.includes(cocktail.id) ? 'currentColor' : 'none'} size={17} />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'shelf' && (
            <div className="menu-pane-fade">
              <div className="shelf-stats-row">
                <div className="shelf-stat">
                  <strong>{inventoryCount}</strong>
                  <span>Ingredients</span>
                </div>
                <div className="shelf-stat">
                  <strong>{wellStocked}</strong>
                  <span>Well Stocked</span>
                </div>
                <div className="shelf-stat">
                  <strong>{shoppingCount}</strong>
                  <span>Missing / Low</span>
                </div>
              </div>

              <div className="home-panel inventory-snapshot" style={{ margin: '16px 0 24px 0', border: '1px solid var(--line)', background: 'var(--panel-soft)' }}>
                <SectionTitle action="Manage" onAction={() => setActiveView('Inventory')} title="Inventory Snapshot" />
                <div className="inventory-bar" aria-label="Inventory status">
                  <span style={{ flex: Math.max(wellStocked, 1), background: 'var(--green)' }} />
                  <span style={{ flex: Math.max(runningLow, 1), background: 'var(--accent)' }} />
                  <span style={{ flex: Math.max(outOfStock, lowStock > 0 ? 1 : 0.35) }} />
                </div>
                <div className="inventory-legend">
                  <span>Well stocked <b>{wellStocked}</b></span>
                  <span>Running low <b>{runningLow}</b></span>
                  <span>Out of stock <b>{outOfStock}</b></span>
                </div>
              </div>

              <div className="recommendations-panel" style={{ background: 'transparent', border: 0, padding: 0 }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--heading)' }}>
                  Bar Intelligence <Sparkles size={16} />
                </h3>
                <div className="rec-grid">
                  <button className="rec-action-item" onClick={() => setActiveView('Inventory')}>
                    <ShoppingBag size={18} />
                    <div>
                      <strong>Low on {lowStock} ingredients</strong>
                      <span>View restock list</span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                  <button className="rec-action-item" onClick={() => setActiveView('Batch Planner')}>
                    <FlaskConical size={18} />
                    <div>
                      <strong>Try a batch recipe</strong>
                      <span>Scale cocktail specs for 8+ guests</span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                  <button className="rec-action-item" onClick={() => setActiveView('Party Mode')}>
                    <Users size={18} />
                    <div>
                      <strong>Party menu planner</strong>
                      <span>Aggregate prep list and glass counts</span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                  <button className="rec-action-item" onClick={() => setActiveView('Practice Lab')}>
                    <ClipboardList size={18} />
                    <div>
                      <strong>Practice Lab technique workbook</strong>
                      <span>Train on balance, dilution, and timing</span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'creator' && (
            <div className="menu-pane-fade">
              <section className="home-panel quick-add-panel" style={{ border: '1px solid var(--line)', background: 'var(--panel-soft)' }}>
                <div className="panel-heading-row">
                  <h2>Structured Recipe Editor</h2>
                  <button onClick={onCreate}>Save Recipe</button>
                </div>
                <div className="custom-editor-grid">
                  <input
                    aria-label="Cocktail name"
                    onChange={(event) => setCustomDraft({ ...customDraft, name: event.target.value })}
                    placeholder="Cocktail name"
                    value={customDraft.name}
                  />
                  <input
                    aria-label="Family"
                    onChange={(event) => setCustomDraft({ ...customDraft, family: event.target.value })}
                    placeholder="Family"
                    value={customDraft.family}
                  />
                  <select
                    aria-label="Base spirit"
                    onChange={(event) => setCustomDraft({ ...customDraft, baseSpirit: event.target.value })}
                    value={customDraft.baseSpirit}
                  >
                    <option value="">Base spirit</option>
                    {baseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    aria-label="Style"
                    onChange={(event) => setCustomDraft({ ...customDraft, style: event.target.value })}
                    placeholder="Style"
                    value={customDraft.style}
                  />
                  <input
                    aria-label="Glassware"
                    onChange={(event) => setCustomDraft({ ...customDraft, glassware: event.target.value })}
                    placeholder="Glassware"
                    value={customDraft.glassware}
                  />
                  <input
                    aria-label="Ice"
                    onChange={(event) => setCustomDraft({ ...customDraft, ice: event.target.value })}
                    placeholder="Ice"
                    value={customDraft.ice}
                  />
                  <input
                    aria-label="Garnish"
                    onChange={(event) => setCustomDraft({ ...customDraft, garnish: event.target.value })}
                    placeholder="Garnish"
                    value={customDraft.garnish}
                  />
                  <input
                    aria-label="Prep time"
                    onChange={(event) => setCustomDraft({ ...customDraft, prepTime: event.target.value })}
                    placeholder="Prep time"
                    value={customDraft.prepTime}
                  />
                </div>
                {duplicateCustom && (
                  <div className="editor-warning">
                    <AlertTriangle size={16} />
                    {duplicateCustom.name} already exists. Rename this recipe before saving.
                  </div>
                )}
                <div className="structured-editor-block">
                  <span>Ingredients</span>
                  {customDraft.ingredients.map((ingredient, index) => (
                    <div className="ingredient-editor-row" key={index}>
                      <input
                        aria-label={`Ingredient ${index + 1} amount`}
                        onChange={(event) => updateCustomIngredient(index, 'amount', event.target.value)}
                        placeholder="2"
                        value={ingredient.amount}
                      />
                      <input
                        aria-label={`Ingredient ${index + 1} unit`}
                        onChange={(event) => updateCustomIngredient(index, 'unit', event.target.value)}
                        placeholder="oz"
                        value={ingredient.unit}
                      />
                      <input
                        aria-label={`Ingredient ${index + 1} name`}
                        onChange={(event) => updateCustomIngredient(index, 'name', event.target.value)}
                        placeholder="Ingredient"
                        value={ingredient.name}
                      />
                      <button
                        aria-label={`Remove ingredient ${index + 1}`}
                        onClick={() =>
                          setCustomDraft({
                            ...customDraft,
                            ingredients:
                              customDraft.ingredients.length > 1
                                ? customDraft.ingredients.filter((_, currentIndex) => currentIndex !== index)
                                : customDraft.ingredients,
                          })
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="inline-editor-action"
                    onClick={() =>
                      setCustomDraft({
                        ...customDraft,
                        ingredients: [...customDraft.ingredients, { amount: '', unit: 'oz', name: '' }],
                      })
                    }
                  >
                    <Plus size={16} /> Add ingredient row
                  </button>
                </div>
                <div className="structured-editor-block">
                  <span>Method steps</span>
                  {customDraft.methodSteps.map((step, index) => (
                    <div className="method-editor-row" key={index}>
                      <input
                        aria-label={`Method step ${index + 1}`}
                        onChange={(event) => updateCustomStep(index, event.target.value)}
                        placeholder={`Step ${index + 1}`}
                        value={step}
                      />
                      <button
                        aria-label={`Remove method step ${index + 1}`}
                        onClick={() =>
                          setCustomDraft({
                            ...customDraft,
                            methodSteps:
                              customDraft.methodSteps.length > 1
                                ? customDraft.methodSteps.filter((_, currentIndex) => currentIndex !== index)
                                : customDraft.methodSteps,
                          })
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="inline-editor-action"
                    onClick={() => setCustomDraft({ ...customDraft, methodSteps: [...customDraft.methodSteps, ''] })}
                  >
                    <Plus size={16} /> Add method step
                  </button>
                </div>
                <div className="structured-editor-block">
                  <span>Flavor profile</span>
                  <div className="flavor-editor-grid">
                    {['sweetness', 'acidity', 'bitterness', 'booziness', 'dilution'].map((key) => (
                      <label key={key}>
                        {titleize(key)}
                        <select
                          value={customDraft.flavorProfile[key]}
                          onChange={(event) =>
                            setCustomDraft({
                              ...customDraft,
                              flavorProfile: { ...customDraft.flavorProfile, [key]: event.target.value },
                            })
                          }
                        >
                          {['low', 'medium-low', 'medium', 'medium-high', 'high'].map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                  <textarea
                    aria-label="Why this recipe works"
                    onChange={(event) => setCustomDraft({ ...customDraft, whyItWorks: event.target.value })}
                    placeholder="Why it works, intended balance, or tasting note..."
                    value={customDraft.whyItWorks}
                  />
                </div>
                {customMessage && <p className="status-message">{customMessage}</p>}
              </section>
            </div>
          )}

          {activeMenu === 'data' && (
            <div className="menu-pane-fade">
              <section className="home-panel storage-control-panel" style={{ border: '1px solid var(--line)', background: 'var(--panel-soft)' }}>
                <div className="panel-heading-row">
                  <h2>Local Data Center</h2>
                  <button onClick={onExportBackup}>
                    <FileDown size={16} /> Export JSON
                  </button>
                </div>
                <div className="storage-stats compact">
                  <StatBlock label="Saved" value={`${summary.saved}`} />
                  <StatBlock label="Custom" value={`${summary.custom}`} />
                  <StatBlock label="Inventory" value={`${summary.inventory}`} />
                  <StatBlock label="Party menu" value={`${summary.partyDrinks}`} />
                  <StatBlock label="Practice logs" value={`${summary.practiceLogs ?? 0}`} />
                </div>
                <div className="storage-meta-grid">
                  <span>Last backup <b>{state.storageMeta.lastBackupAt ? formatDateTime(state.storageMeta.lastBackupAt) : 'Never'}</b></span>
                  <span>Last import <b>{state.storageMeta.lastImportAt ? formatDateTime(state.storageMeta.lastImportAt) : 'Never'}</b></span>
                </div>
                <div className="storage-actions">
                  <label>
                    <FileUp size={16} />
                    Import JSON
                    <input
                      accept="application/json,.json"
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        if (file) onImportBackup(file)
                        event.currentTarget.value = ''
                      }}
                      type="file"
                    />
                  </label>
                  <button className="danger-button" onClick={onResetStorage}>
                    <RotateCcw size={16} /> Reset Starter Data
                  </button>
                </div>
                {storageMessage && <p className="status-message">{storageMessage}</p>}
              </section>

              <section className="home-panel activity-panel" style={{ marginTop: '16px', border: '1px solid var(--line)', background: 'var(--panel-soft)' }}>
                <SectionTitle action="View Search" onAction={() => setActiveView('Search')} title="Recent Activity" />
                <div className="activity-list">
                  {activityItems.map((item) => (
                    <div className="activity-item" key={item.title}>
                      <span>
                        <item.icon size={16} />
                      </span>
                      <div>
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      <div className="showcase-container">
        <div className="showcase-card">
          <div className="showcase-image-wrap">
            <img
              alt={`${continueCocktail.name} cocktail`}
              className="showcase-img"
              src={cocktailPhoto(continueCocktail)}
            />
            <div className="showcase-gradient-overlay" />
          </div>
          <div className="showcase-details">
            <div className="showcase-header">
              <span className="showcase-eyebrow">{continueCocktail.family}</span>
              <h2 className="showcase-title">{continueCocktail.name}</h2>
            </div>
            
            <p className="showcase-description">
              {continueCocktail.style || continueCocktail.whyItWorks}
            </p>
            
            <div className="showcase-meta">
              <div className="showcase-meta-item">
                <span>Spirit</span>
                <strong>{continueCocktail.baseSpirit}</strong>
              </div>
              <div className="showcase-meta-item">
                <span>Prep</span>
                <strong>{continueCocktail.prepTime}</strong>
              </div>
              <div className="showcase-meta-item">
                <span>Glass</span>
                <strong>{continueCocktail.glassware}</strong>
              </div>
            </div>

            <div className="showcase-footer">
              <button className="showcase-action-btn" onClick={() => onOpen(continueCocktail)}>
                Open Spec
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}