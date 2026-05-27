import { useState, useMemo } from 'react'
import { BottleWine, ChevronRight, Clock3, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react'
import type { CatalogCocktail } from '../data/catalog'
import type { StoredState } from '../types'
import { uniquePush } from '../storage'
import { mergeList } from '../utils'
import { cocktailPhoto, titleize, defaultDilutionPercent, buildBatchPlan, hasEggTexture, batchShelfLife, batchCaution, estimatedPrepTime, formatBatchVolume, formatBatchRowVolume } from '../utils'

export default function BatchPlannerView({
  cocktails,
  selected,
  servings,
  setServings,
  updateStored,
}: {
  cocktails: CatalogCocktail[]
  selected: CatalogCocktail
  servings: number
  setServings: (servings: number) => void
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'us'>('metric')
  const [dilutionPercent, setDilutionPercent] = useState(defaultDilutionPercent(selected))
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    chill: true,
    verify: true,
    mix: true,
    label: false,
    taste: false,
  })
  const plan = useMemo(
    () => buildBatchPlan(selected, servings, dilutionPercent),
    [selected, servings, dilutionPercent],
  )
  const isMetric = unitSystem === 'metric'
  const hasEgg = hasEggTexture(selected)
  const shelfLife = batchShelfLife(selected)
  const caution = batchCaution(selected)

  function chooseCocktail(id: string) {
    updateStored((state) => ({ ...state, selectedId: id }))
    setDilutionPercent(defaultDilutionPercent(cocktails.find((cocktail) => cocktail.id === id) || selected))
  }

  function toggleChecklist(key: string) {
    setChecklist((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div className="page batch-page">
      <div className="batch-topline">
        <div>
          <span className="eyebrow">Batch Planner / {selected.name}</span>
          <h1>Scale {selected.name} for a real service plan</h1>
          <p>Pick any cocktail, set the yield and dilution, then use the batch sheet for prep.</p>
        </div>
        <div className="batch-actions">
          <button onClick={() => updateStored((state) => ({ ...state, savedIds: uniquePush(state.savedIds, selected.id) }))}>
            Save as draft
          </button>
          <button
            className="save-batch"
            onClick={() =>
              updateStored((state) => ({
                ...state,
                shoppingList: mergeList(
                  state.shoppingList,
                  selected.ingredients.map((ingredient) => ingredient.name),
                ),
                collectionIds: uniquePush(state.collectionIds, selected.id),
              }))
            }
          >
            Save batch
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <section className="batch-selector panel">
        <img alt={`${selected.name} cocktail`} src={cocktailPhoto(selected)} />
        <label>
          Cocktail
          <select value={selected.id} onChange={(event) => chooseCocktail(event.target.value)}>
            {cocktails.map((cocktail) => (
              <option key={cocktail.id} value={cocktail.id}>
                {cocktail.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          <span>Family</span>
          <strong>{selected.family}</strong>
        </div>
        <div>
          <span>Base</span>
          <strong>{titleize(selected.baseSpirit)}</strong>
        </div>
      </section>

      <section className="batch-layout">
        <div className="panel batch-calculator">
          <div className="batch-panel-title">
            <span>1</span>
            <h2>Batch calculator</h2>
          </div>
          <div className="batch-controls-grid">
            <div>
              <span>Target servings</span>
              <div className="serving-stepper">
                <button onClick={() => setServings(Math.max(1, servings - 1))}>
                  <Minus size={16} />
                </button>
                <strong>{servings}</strong>
                <button onClick={() => setServings(Math.min(300, servings + 1))}>
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div>
              <span>Per serve</span>
              <strong>{formatBatchVolume(plan.perServeMl, isMetric)}</strong>
            </div>
            <div>
              <span>Total batch volume</span>
              <strong>{formatBatchVolume(plan.totalMl, isMetric)}</strong>
            </div>
            <div>
              <span>Unit system</span>
              <div className="segmented-control">
                <button className={isMetric ? 'active' : ''} onClick={() => setUnitSystem('metric')}>
                  Metric (ml)
                </button>
                <button className={!isMetric ? 'active' : ''} onClick={() => setUnitSystem('us')}>
                  US (fl oz)
                </button>
              </div>
            </div>
            <div>
              <span>Dilution</span>
              <div className="segmented-control">
                {[0, 0.15, 0.25, 0.3].map((amount) => (
                  <button
                    className={dilutionPercent === amount ? 'active' : ''}
                    key={amount}
                    onClick={() => setDilutionPercent(amount)}
                  >
                    {amount === 0 ? 'Straight (0%)' : `${Math.round(amount * 100)}%`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span>Bottles needed</span>
              <strong>{plan.bottlesNeeded} bottles (750 ml)</strong>
            </div>
            <div>
              <span>Batch strength (est.)</span>
              <strong>{plan.strength}% ABV</strong>
            </div>
          </div>

          <div className="batch-table">
            <div className="batch-row batch-head">
              <span>Ingredients</span>
              <span>Per serve</span>
              <span>% of batch</span>
              <span>Total</span>
            </div>
            {plan.rows.map((row) => (
              <div className="batch-row" key={row.name}>
                <span>
                  <BottleWine size={17} />
                  {row.name}
                </span>
                <span>{formatBatchRowVolume(row, 'perServeMl', isMetric)}</span>
                <span>{row.percent}%</span>
                <span>{formatBatchRowVolume(row, 'totalMl', isMetric)}</span>
              </div>
            ))}
            <div className="batch-row batch-water-row">
              <span>
                <Sparkles size={17} />
                Measured water from dilution
              </span>
              <span>{formatBatchVolume(plan.waterPerServeMl, isMetric)}</span>
              <span>{plan.waterPercent}%</span>
              <span>{formatBatchVolume(plan.waterMl, isMetric)}</span>
            </div>
            <div className="batch-row batch-total-row">
              <span>Total</span>
              <span>{formatBatchVolume(plan.perServeMl, isMetric)}</span>
              <span>100%</span>
              <span>{formatBatchVolume(plan.totalMl, isMetric)}</span>
            </div>
          </div>
          <p className="batch-footnote">
            Dilution is calculated from the drink volume before service ice. Shake-only texture, bubbles, and fresh garnish
            should still be handled at service.
          </p>
        </div>

        <div className="panel service-workspace">
          <div className="batch-panel-title">
            <span>2</span>
            <h2>Service workspace</h2>
          </div>
          <div className="service-grid">
            <div className="service-card batch-sheet-card">
              <h3>Batch sheet</h3>
              {plan.rows.map((row) => (
                <div key={row.name}>
                  <span>{row.name}</span>
                  <strong>{formatBatchRowVolume(row, 'totalMl', isMetric)}</strong>
                </div>
              ))}
              <div>
                <span>Measured water</span>
                <strong>{formatBatchVolume(plan.waterMl, isMetric)}</strong>
              </div>
              <div className="batch-sheet-total">
                <span>Total batch</span>
                <strong>{formatBatchVolume(plan.totalMl, isMetric)}</strong>
              </div>
            </div>

            <div className="service-card">
              <h3>Storage & shelf life</h3>
              <p>{shelfLife}</p>
              <p>Keep cold, label the bottle, and avoid temperature swings.</p>
            </div>

            <div className="service-card checklist-card">
              <h3>Prep checklist</h3>
              {[
                ['chill', 'Chill bottle in freezer or fridge'],
                ['verify', hasEgg ? 'Keep egg white separate and measure it to order' : 'Verify citrus, brine, or syrup intensity'],
                ['mix', 'Dilute and mix thoroughly'],
                ['label', 'Label with name, yield, dilution, and date'],
                ['taste', hasEgg ? 'Dry shake or foam each serve at pickup' : 'Taste after dilution'],
              ].map(([key, label]) => (
                <label key={key}>
                  <input checked={checklist[key]} onChange={() => toggleChecklist(key)} type="checkbox" />
                  {label}
                </label>
              ))}
            </div>

            <div className="service-card caution-card">
              <h3>Batch caution</h3>
              <p>{caution}</p>
              <strong>Taste after dilution and before service. Adjust if needed.</strong>
            </div>

            <div className="service-card notes-card">
              <h3>Service notes</h3>
              <p>{selected.batchingNotes || 'Batch stable ingredients; keep citrus, bubbles, and texture to service.'}</p>
              {hasEgg && (
                <p>
                  Egg white should not live in the storage bottle. Batch the liquid base, then add egg white or
                  aquafaba per drink and dry shake during service.
                </p>
              )}
              <button
                onClick={() =>
                  updateStored((state) => ({
                    ...state,
                    notes: {
                      ...state.notes,
                      [selected.id]: `${state.notes[selected.id] || ''}\nBatch: ${servings} serves, ${formatBatchVolume(plan.totalMl, true)}, ${Math.round(dilutionPercent * 100)}% dilution.`.trim(),
                    },
                  }))
                }
              >
                Add note
              </button>
            </div>
          </div>
          <p className="batch-footnote">
            Label example: {selected.name} - {servings} serves - {formatBatchVolume(plan.totalMl, true)} -{' '}
            {Math.round(dilutionPercent * 100)}% dilution.
          </p>
        </div>
      </section>

      <section className="batch-impact panel">
        <div>
          <ShoppingBag size={28} />
          <span>Shopping list impact</span>
          <strong>{selected.ingredients.length} items</strong>
          <button
            onClick={() =>
              updateStored((state) => ({
                ...state,
                shoppingList: mergeList(
                  state.shoppingList,
                  selected.ingredients.map((ingredient) => ingredient.name),
                ),
              }))
            }
          >
            Add ingredients
          </button>
        </div>
        <div>
          <Clock3 size={28} />
          <span>Service timing</span>
          <strong>{estimatedPrepTime(servings)} min</strong>
          <button
            onClick={() =>
              updateStored((state) => ({
                ...state,
                notes: {
                  ...state.notes,
                  [selected.id]: `${state.notes[selected.id] || ''}\nPrep timing: chill, batch, dilute, label, and taste before guests arrive.`.trim(),
                },
              }))
            }
          >
            Save timeline
          </button>
        </div>
      </section>
    </div>
  )
}