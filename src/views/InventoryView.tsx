import type { CatalogCocktail } from '../data/catalog'
import type { StockStatus, StoredState, IngredientCoverage } from '../types'
import { ViewHeader } from '../components/ViewHeader'
import { InlineAdder } from '../components/InlineAdder'
import { PillList } from '../components/PillList'
import { StatBlock } from '../components/StatBlock'
import { CocktailCard } from '../components/CocktailCard'
import { CoverageHeatmap } from '../components/CoverageHeatmap'

export default function InventoryView({
  inventoryEntry,
  matches,
  onAddInventory,
  onAddShopping,
  onOpen,
  removeInventory,
  removeShopping,
  setInventoryEntry,
  setInventoryStatus,
  setShoppingEntry,
  shoppingEntry,
  state,
}: {
  inventoryEntry: string
  matches: { cocktail: CatalogCocktail; coverage: IngredientCoverage }[]
  onAddInventory: () => void
  onAddShopping: () => void
  onOpen: (cocktail: CatalogCocktail) => void
  removeInventory: (item: string) => void
  removeShopping: (item: string) => void
  setInventoryEntry: (value: string) => void
  setInventoryStatus: (item: string, status: StockStatus) => void
  setShoppingEntry: (value: string) => void
  shoppingEntry: string
  state: StoredState
}) {
  const stockCounts = state.inventory.reduce(
    (counts, item) => {
      const status = state.inventoryLevels[item] ?? 'full'
      counts[status] += 1
      return counts
    },
    { full: 0, low: 0, empty: 0 } as Record<StockStatus, number>,
  )
  const substitutionMatches = matches.reduce((total, match) => total + match.coverage.substitutes.length, 0)

  return (
    <div className="page view-page">
      <ViewHeader eyebrow="Inventory" title="Track what you own and what you need" />
      <section className="split-grid">
        <div className="panel">
          <h2>Home Bar</h2>
          <InlineAdder
            onAdd={onAddInventory}
            placeholder="Add bottle, syrup, citrus..."
            setValue={setInventoryEntry}
            value={inventoryEntry}
          />
          <PillList
            items={state.inventory}
            onRemove={removeInventory}
            onStatusChange={setInventoryStatus}
            statuses={state.inventoryLevels}
          />
        </div>
        <div className="panel">
          <h2>Shopping List</h2>
          <InlineAdder
            onAdd={onAddShopping}
            placeholder="Add missing ingredient..."
            setValue={setShoppingEntry}
            value={shoppingEntry}
          />
          <PillList items={state.shoppingList} onRemove={removeShopping} />
        </div>
      </section>
      <section className="inventory-intelligence panel">
        <div className="panel-heading-row">
          <h2>Ingredient intelligence</h2>
          <span>{substitutionMatches} substitution matches in current recommendations</span>
        </div>
        <div className="stock-grid">
          <StatBlock label="Full stock" value={`${stockCounts.full}`} />
          <StatBlock label="Low stock" value={`${stockCounts.low}`} />
          <StatBlock label="Empty" value={`${stockCounts.empty}`} />
          <StatBlock label="Shopping gaps" value={`${state.shoppingList.length}`} />
        </div>
        <p>
          Inventory matching now understands common aliases and substitutions, then lowers makeable scores for low or empty
          stock instead of treating every saved bottle equally.
        </p>
      </section>
      <ViewHeader eyebrow="Makeable now" title="Best matches from your current inventory" />
      <div className="card-grid">
        {matches.map(({ cocktail, coverage }) => (
          <CocktailCard cocktail={cocktail} coverage={coverage} key={cocktail.id} onOpen={onOpen} />
        ))}
      </div>
      <CoverageHeatmap matches={matches} onOpen={onOpen} />
    </div>
  )
}