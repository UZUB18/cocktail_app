
import { Search, RotateCcw, Check, Save } from 'lucide-react'
import type { CatalogCocktail } from '../data/catalog'
import type { SearchFilters, SearchSort, MakeableFilter, IngredientCoverage } from '../types'
import { defaultSearchFilters, type StockStatus } from '../types'
import { buildSearchOptions, ingredientCoverage } from '../utils'
import { ViewHeader } from '../components/ViewHeader'
import { CocktailCard } from '../components/CocktailCard'

export default function SearchView({
  coverageById,
  filters,
  inventory,
  inventoryLevels,
  onAddMissing,
  onOpen,
  onToggleSave,
  options,
  query,
  recentSearches,
  results,
  savedIds,
  setFilters,
  setQuery,
  setSort,
  sort,
  submitSearch,
}: {
  coverageById: Map<string, IngredientCoverage>
  filters: SearchFilters
  inventory: string[]
  inventoryLevels: Record<string, StockStatus>
  onAddMissing: (cocktail: CatalogCocktail) => void
  onOpen: (cocktail: CatalogCocktail) => void
  onToggleSave: (id: string) => void
  options: ReturnType<typeof buildSearchOptions>
  query: string
  recentSearches: string[]
  results: CatalogCocktail[]
  savedIds: string[]
  setFilters: (filters: SearchFilters) => void
  setQuery: (query: string) => void
  setSort: (sort: SearchSort) => void
  sort: SearchSort
  submitSearch: (query: string) => void
}) {
  const hasFilters =
    Boolean(filters.family || filters.baseSpirit || filters.difficulty || filters.glassware) || filters.makeable !== 'any'

  function updateFilter(key: keyof SearchFilters, value: string) {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="page view-page">
      <ViewHeader eyebrow="Search" title="Find drinks by name, family, base, or ingredient" />
      <div className="panel search-workbench">
        <label className="large-input">
          <Search size={20} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitSearch(query)
            }}
            placeholder="Try: pineapple rum, Negroni, sour, Campari..."
            value={query}
          />
        </label>
        <div className="chip-list">
          {['party batch', 'ready now', 'low stock', 'sour', 'spirit forward'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuery(item === 'ready now' ? '' : item)
                if (item === 'ready now') setFilters({ ...filters, makeable: 'ready' })
                submitSearch(item === 'ready now' ? '' : item)
              }}
            >
              {item}
            </button>
          ))}
          {recentSearches.map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuery(item)
                submitSearch(item)
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="search-filter-grid">
          <label>
            Family
            <select value={filters.family} onChange={(event) => updateFilter('family', event.target.value)}>
              <option value="">Any family</option>
              {options.families.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Base
            <select value={filters.baseSpirit} onChange={(event) => updateFilter('baseSpirit', event.target.value)}>
              <option value="">Any base</option>
              {options.baseSpirits.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Difficulty
            <select value={filters.difficulty} onChange={(event) => updateFilter('difficulty', event.target.value)}>
              <option value="">Any difficulty</option>
              {options.difficulties.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Glassware
            <select value={filters.glassware} onChange={(event) => updateFilter('glassware', event.target.value)}>
              <option value="">Any glass</option>
              {options.glassware.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Makeable
            <select value={filters.makeable} onChange={(event) => updateFilter('makeable', event.target.value as MakeableFilter)}>
              <option value="any">Any status</option>
              <option value="ready">Ready now</option>
              <option value="missing-1">Missing 1 item</option>
              <option value="missing-2">Missing 2 or fewer</option>
              <option value="needs-shopping">Needs shopping</option>
            </select>
          </label>
          <label>
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value as SearchSort)}>
              <option value="relevance">Catalog relevance</option>
              <option value="makeable">Best makeable score</option>
              <option value="saved">Saved first</option>
              <option value="fastest">Fastest prep</option>
            </select>
          </label>
        </div>
        <div className="search-result-summary">
          <span>{results.length} results</span>
          {hasFilters && (
            <button onClick={() => setFilters(defaultSearchFilters)}>
              <RotateCcw size={15} /> Clear filters
            </button>
          )}
        </div>
      </div>
      <div className="card-grid">
        {results.map((cocktail) => (
          <CocktailCard
            action={
              <>
                <button onClick={() => onToggleSave(cocktail.id)}>
                  {savedIds.includes(cocktail.id) ? <Check size={16} /> : <Save size={16} />}
                  {savedIds.includes(cocktail.id) ? 'Saved' : 'Save'}
                </button>
                <button onClick={() => onAddMissing(cocktail)}>Shop missing</button>
              </>
            }
            cocktail={cocktail}
            key={cocktail.id}
            coverage={coverageById.get(cocktail.id) ?? ingredientCoverage(cocktail, inventory, inventoryLevels)}
            onOpen={onOpen}
            query={query}
          />
        ))}
      </div>
    </div>
  )
}