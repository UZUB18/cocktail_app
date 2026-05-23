import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  BottleWine,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  FlaskConical,
  Gauge,
  Home,
  Martini,
  Minus,
  MoreHorizontal,
  Plus,
  Save,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Wine,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './App.css'
import { catalogCocktails, type CatalogCocktail, type CatalogIngredient } from './data/catalog'
import {
  allCocktails,
  defaultState,
  findCocktail,
  loadStoredState,
  resetStoredState,
  saveStoredState,
  toggleItem,
  uniquePush,
  type StoredState,
} from './storage'

const tabs = [
  'Recipe',
  'Why it works',
  'Common mistakes',
  'Home-bar notes',
  'Substitutions',
  'Variations',
  'Batching',
] as const

const navItems = [
  { label: 'Home / Command', icon: Home },
  { label: 'Search', icon: Search },
  { label: 'Recipes', icon: Martini },
  { label: 'Riffs & Variations', icon: Shuffle },
  { label: 'Inventory', icon: BottleWine },
  { label: 'Batch Planner', icon: FlaskConical },
  { label: 'Collections', icon: BookOpen },
  { label: 'Troubleshoot', icon: Wrench },
] as const

type Tab = (typeof tabs)[number]
type View = (typeof navItems)[number]['label']

const troubleFixes: Record<string, string[]> = {
  'Too sweet': [
    'Add acid first if the family supports it: 1 barspoon lime or lemon, then retaste.',
    'For stirred drinks, add proof, dry vermouth, bitter aperitif, or more dilution before adding more bitters.',
    'A small saline dose can make sweetness feel more focused without changing the ratio.',
  ],
  'Too sour': [
    'Add syrup in barspoon increments; do not overcorrect.',
    'If the citrus is harsh, add body with gomme, liqueur, or a richer sweetener.',
    'For highballs, lengthen with colder soda instead of only adding sugar.',
  ],
  Watery: [
    'Use colder, harder ice and shorten the shake/stir slightly.',
    'Increase proof or modifier density if the drink has to sit on rocks.',
    'For batches, reduce pre-dilution and rely more on service ice.',
  ],
  Flat: [
    'Add contrast: acid, saline, bitter snap, carbonation, or a sharper garnish.',
    'Check old citrus, oxidized vermouth, and tired syrups before changing the whole spec.',
    'If balance is right but boring, add aroma before adding sweetness.',
  ],
  'Too bitter': [
    'Add sugar or citrus oil aroma; do not bury bitterness with random juice.',
    'For Campari drinks, saline and cold temperature can soften blunt bitterness.',
    'If the bitter element is too dominant, rebuild with a split bitter or lower ratio.',
  ],
  Hot: [
    'Add controlled dilution and chill harder.',
    'Use a lower-proof split or add fortified wine to soften the structure.',
    'Avoid fixing heat with sugar alone; it becomes hot and sweet.',
  ],
}

const starterCustom = {
  name: '',
  family: 'Sour',
  baseSpirit: '',
  ingredients: '',
  method: '',
}

const fallbackPhotoCredit = 'TheCocktailDB related cocktail-photo fallback'
const fallbackPhotoPool = [
  'https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg',
  'https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg',
  'https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg',
  'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg',
  'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
  'https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg',
  'https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg',
  'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
  'https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg',
  'https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg',
  'https://www.thecocktaildb.com/images/media/drink/7cll921606854636.jpg',
  'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
  'https://www.thecocktaildb.com/images/media/drink/k0508k1668422436.jpg',
  'https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg',
  'https://www.thecocktaildb.com/images/media/drink/7dozeg1582578095.jpg',
  'https://www.thecocktaildb.com/images/media/drink/hrxfbl1606770327.jpg',
  'https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg',
  'https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg',
  'https://www.thecocktaildb.com/images/media/drink/ggx0lv1613942306.jpg',
]

function fallbackPhotoUrl(seed: string) {
  let hash = 0
  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }
  return fallbackPhotoPool[hash % fallbackPhotoPool.length]
}

function cocktailPhoto(cocktail: Pick<CatalogCocktail, 'id' | 'name' | 'imageUrl'>) {
  return cocktail.imageUrl || fallbackPhotoUrl(cocktail.id || cocktail.name)
}

function App() {
  const [stored, setStored] = useState<StoredState>(() => loadStoredState())
  const [activeView, setActiveView] = useState<View>('Recipes')
  const [activeTab, setActiveTab] = useState<Tab>('Recipe')
  const [scale, setScale] = useState(1)
  const [metric, setMetric] = useState(false)
  const [query, setQuery] = useState('')
  const [servings, setServings] = useState(10)
  const [inventoryEntry, setInventoryEntry] = useState('')
  const [shoppingEntry, setShoppingEntry] = useState('')
  const [trouble, setTrouble] = useState('Too sweet')
  const [customDraft, setCustomDraft] = useState(starterCustom)

  useEffect(() => saveStoredState(stored), [stored])

  const cocktails = useMemo(() => allCocktails(stored), [stored])
  const selected = useMemo(() => findCocktail(stored, stored.selectedId), [stored])
  const savedCocktails = useMemo(
    () => cocktails.filter((cocktail) => stored.savedIds.includes(cocktail.id)),
    [cocktails, stored.savedIds],
  )
  const collectionCocktails = useMemo(
    () => cocktails.filter((cocktail) => stored.collectionIds.includes(cocktail.id)),
    [cocktails, stored.collectionIds],
  )
  const searchResults = useMemo(
    () => filterCocktails(cocktails, query).slice(0, query ? 40 : 18),
    [cocktails, query],
  )
  const inventoryMatches = useMemo(
    () =>
      cocktails
        .map((cocktail) => ({ cocktail, missing: missingIngredients(cocktail, stored.inventory) }))
        .filter((match) => match.missing.length <= 2)
        .sort((a, b) => a.missing.length - b.missing.length)
        .slice(0, 12),
    [cocktails, stored.inventory],
  )

  function updateStored(updater: (state: StoredState) => StoredState) {
    setStored((current) => updater(current))
  }

  function openCocktail(cocktail: CatalogCocktail) {
    setActiveView('Recipes')
    setActiveTab('Recipe')
    updateStored((state) => ({ ...state, selectedId: cocktail.id }))
  }

  function submitSearch(value = query) {
    const clean = value.trim()
    setActiveView('Search')
    if (clean.length > 1) {
      updateStored((state) => ({
        ...state,
        recentSearches: [clean, ...state.recentSearches.filter((item) => item !== clean)].slice(0, 8),
      }))
    }
  }

  function saveCustomCocktail() {
    const name = customDraft.name.trim()
    if (!name) return
    const custom: CatalogCocktail = {
      id: `custom-${slugify(name)}-${Date.now()}`,
      name,
      aliases: [],
      family: customDraft.family.trim() || 'House',
      style: 'custom house spec',
      baseSpirit: customDraft.baseSpirit.trim() || 'flexible',
      ingredients: parseIngredients(customDraft.ingredients),
      method: customDraft.method.trim() || 'Build, shake, or stir to taste.',
      methodSteps: splitSteps(customDraft.method.trim() || 'Build, shake, or stir to taste.'),
      glassware: 'house choice',
      ice: 'as needed',
      garnish: 'to taste',
      flavorProfile: {
        sweetness: 'tune',
        acidity: 'tune',
        bitterness: 'tune',
        booziness: 'tune',
        dilution: 'tune',
        texture: 'tune',
        aroma: 'tune',
      },
      difficulty: 'custom',
      prepTime: '5 minutes',
      historyNotes: 'User-created local recipe.',
      whyItWorks: 'Add your tasting notes after a test round.',
      commonMistakes: ['Taste after dilution before changing the spec.'],
      homeBarNotes: ['Stored locally in this browser.'],
      variations: [],
      substitutions: [],
      batchingNotes: 'Use the batch planner to scale this local recipe.',
      imageUrl: fallbackPhotoUrl(name),
      imageCredit: fallbackPhotoCredit,
      source: 'custom',
    }
    updateStored((state) => ({
      ...state,
      customCocktails: [...state.customCocktails, custom],
      selectedId: custom.id,
      savedIds: uniquePush(state.savedIds, custom.id),
    }))
    setCustomDraft(starterCustom)
    setActiveView('Recipes')
  }

  const tabContent = getTabContent(selected, activeTab)
  const missingForSelected = missingIngredients(selected, stored.inventory)
  const batchRows = batchIngredients(selected, servings)

  return (
    <main className="app-shell">
      <Sidebar
        activeView={activeView}
        collectionCount={stored.collectionIds.length}
        savedCount={stored.savedIds.length}
        shoppingCount={stored.shoppingList.length}
        setActiveView={setActiveView}
      />

      <section className="workspace">
        <header className="topbar">
          <div className="greeting">
            <Sparkles size={25} />
            <div>
              <strong>Good evening, Alex.</strong>
              <span>{cocktails.length} cocktails available locally</span>
            </div>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input
              aria-label="Search anything"
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setActiveView('Search')}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitSearch()
              }}
              placeholder="Search cocktails, ingredients, families..."
              value={query}
            />
            <kbd>⌘K</kbd>
          </label>
          <div className="top-actions">
            <button aria-label="Go to batch planner" onClick={() => setActiveView('Batch Planner')}>
              <BarChart3 size={20} />
            </button>
            <button aria-label="Go to shopping list" onClick={() => setActiveView('Inventory')}>
              <Bell size={20} />
            </button>
            <button aria-label="Go to settings" onClick={() => setActiveView('Home / Command')}>
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </header>

        {activeView === 'Home / Command' && (
          <HomeView
            cocktails={cocktails}
            customDraft={customDraft}
            inventoryCount={stored.inventory.length}
            onCreate={saveCustomCocktail}
            onOpen={openCocktail}
            recentSearches={stored.recentSearches}
            resetLocalData={() => {
              resetStoredState()
              setStored(defaultState)
            }}
            savedCount={stored.savedIds.length}
            setActiveView={setActiveView}
            setCustomDraft={setCustomDraft}
            setQuery={setQuery}
            submitSearch={submitSearch}
          />
        )}

        {activeView === 'Search' && (
          <SearchView
            inventory={stored.inventory}
            onAddMissing={(cocktail) =>
              updateStored((state) => ({
                ...state,
                shoppingList: mergeList(state.shoppingList, missingIngredients(cocktail, state.inventory)),
              }))
            }
            onOpen={openCocktail}
            onToggleSave={(id) =>
              updateStored((state) => ({ ...state, savedIds: toggleItem(state.savedIds, id) }))
            }
            query={query}
            recentSearches={stored.recentSearches}
            results={searchResults}
            savedIds={stored.savedIds}
            setQuery={setQuery}
            submitSearch={submitSearch}
          />
        )}

        {activeView === 'Recipes' && (
          <RecipeDetail
            activeTab={activeTab}
            collectionIds={stored.collectionIds}
            metric={metric}
            missingForSelected={missingForSelected}
            notes={stored.notes}
            savedIds={stored.savedIds}
            scale={scale}
            selected={selected}
            setActiveTab={setActiveTab}
            setActiveView={setActiveView}
            setMetric={setMetric}
            setScale={setScale}
            tabContent={tabContent}
            updateStored={updateStored}
          />
        )}

        {activeView === 'Riffs & Variations' && (
          <ListView
            cocktails={cocktails.filter((cocktail) => cocktail.variations.length > 0)}
            eyebrow="Riffs & Variations"
            onOpen={openCocktail}
            title="Compare families, branches, and house riff candidates"
          />
        )}

        {activeView === 'Inventory' && (
          <InventoryView
            inventoryEntry={inventoryEntry}
            matches={inventoryMatches}
            onAddInventory={() => {
              updateStored((state) => ({ ...state, inventory: uniquePush(state.inventory, inventoryEntry) }))
              setInventoryEntry('')
            }}
            onAddShopping={() => {
              updateStored((state) => ({
                ...state,
                shoppingList: uniquePush(state.shoppingList, shoppingEntry),
              }))
              setShoppingEntry('')
            }}
            onOpen={openCocktail}
            removeInventory={(item) =>
              updateStored((state) => ({
                ...state,
                inventory: state.inventory.filter((entry) => entry !== item),
              }))
            }
            removeShopping={(item) =>
              updateStored((state) => ({
                ...state,
                shoppingList: state.shoppingList.filter((entry) => entry !== item),
              }))
            }
            setInventoryEntry={setInventoryEntry}
            setShoppingEntry={setShoppingEntry}
            shoppingEntry={shoppingEntry}
            state={stored}
          />
        )}

        {activeView === 'Batch Planner' && (
          <BatchPlannerView
            batchRows={batchRows}
            selected={selected}
            servings={servings}
            setServings={setServings}
            updateStored={updateStored}
          />
        )}

        {activeView === 'Collections' && (
          <CollectionsView
            collectionCocktails={collectionCocktails}
            onOpen={openCocktail}
            savedCocktails={savedCocktails}
          />
        )}

        {activeView === 'Troubleshoot' && (
          <TroubleshootView
            selected={selected}
            setTrouble={setTrouble}
            trouble={trouble}
            updateStored={updateStored}
          />
        )}
      </section>
    </main>
  )
}

function Sidebar({
  activeView,
  collectionCount,
  savedCount,
  setActiveView,
  shoppingCount,
}: {
  activeView: View
  collectionCount: number
  savedCount: number
  setActiveView: (view: View) => void
  shoppingCount: number
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Martini size={34} strokeWidth={1.6} />
        <div>
          <span>Cocktail</span>
          <span>Colleague</span>
        </div>
      </div>

      <nav className="nav-list" aria-label="Primary">
        {navItems.map((item) => (
          <button
            className={`nav-item ${activeView === item.label ? 'active' : ''}`}
            key={item.label}
            onClick={() => setActiveView(item.label)}
          >
            <item.icon size={20} strokeWidth={1.7} />
            <span>{item.label}</span>
            {item.label === 'Collections' && collectionCount > 0 && <b>{collectionCount}</b>}
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <button className="nav-item muted" onClick={() => setActiveView('Inventory')}>
        <ShoppingBag size={19} strokeWidth={1.7} />
        <span>Shopping List</span>
        <b>{shoppingCount}</b>
      </button>
      <button className="nav-item muted" onClick={() => setActiveView('Home / Command')}>
        <Settings size={19} strokeWidth={1.7} />
        <span>Local Storage</span>
      </button>

      <div className="profile-card">
        <span className="avatar">AJ</span>
        <div>
          <strong>Alex</strong>
          <span>{savedCount} saved specs</span>
        </div>
        <ChevronRight size={16} />
      </div>

      <div className="today-card">
        <span>Local DB</span>
        <strong>Browser storage</strong>
        <div className="mini-drink" />
      </div>
    </aside>
  )
}

function HomeView({
  cocktails,
  customDraft,
  inventoryCount,
  onCreate,
  onOpen,
  recentSearches,
  resetLocalData,
  savedCount,
  setActiveView,
  setCustomDraft,
  setQuery,
  submitSearch,
}: {
  cocktails: CatalogCocktail[]
  customDraft: typeof starterCustom
  inventoryCount: number
  onCreate: () => void
  onOpen: (cocktail: CatalogCocktail) => void
  recentSearches: string[]
  resetLocalData: () => void
  savedCount: number
  setActiveView: (view: View) => void
  setCustomDraft: (draft: typeof starterCustom) => void
  setQuery: (query: string) => void
  submitSearch: (query: string) => void
}) {
  return (
    <div className="page view-page">
      <section className="command-grid">
        <div className="panel command-panel">
          <span className="eyebrow">Local-first cocktail workspace</span>
          <h1>Build, search, save, and batch from your home bar.</h1>
          <p>
            The app ships with {catalogCocktails.length} cocktail specs and stores your own recipes,
            inventory, notes, collections, and shopping list in this browser.
          </p>
          <div className="command-actions">
            {['bitter tiki', 'rye campari', 'party batch', 'zero proof'].map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setQuery(preset)
                  submitSearch(preset)
                }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
        <div className="panel storage-panel">
          <h2>Storage Status</h2>
          <div className="storage-stats">
            <StatBlock label="Catalog" value={`${cocktails.length}`} />
            <StatBlock label="Saved" value={`${savedCount}`} />
            <StatBlock label="Inventory" value={`${inventoryCount}`} />
          </div>
          <button className="danger-button" onClick={resetLocalData}>
            Reset local data
          </button>
        </div>
      </section>

      <section className="split-grid">
        <div className="panel">
          <h2>Recent Searches</h2>
          <div className="chip-list">
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
        </div>
        <CustomCocktailForm
          customDraft={customDraft}
          onCreate={onCreate}
          setCustomDraft={setCustomDraft}
        />
      </section>

      <ListView
        cocktails={cocktails.slice(0, 8)}
        eyebrow="Recommended starting points"
        onOpen={onOpen}
        title="Open a detail page and start editing your local workspace"
      />

      <div className="footer-actions">
        <button onClick={() => setActiveView('Inventory')}>Manage inventory</button>
        <button onClick={() => setActiveView('Batch Planner')}>Plan a batch</button>
        <button onClick={() => setActiveView('Collections')}>Open collection</button>
      </div>
    </div>
  )
}

function SearchView({
  inventory,
  onAddMissing,
  onOpen,
  onToggleSave,
  query,
  recentSearches,
  results,
  savedIds,
  setQuery,
  submitSearch,
}: {
  inventory: string[]
  onAddMissing: (cocktail: CatalogCocktail) => void
  onOpen: (cocktail: CatalogCocktail) => void
  onToggleSave: (id: string) => void
  query: string
  recentSearches: string[]
  results: CatalogCocktail[]
  savedIds: string[]
  setQuery: (query: string) => void
  submitSearch: (query: string) => void
}) {
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
            missing={missingIngredients(cocktail, inventory)}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  )
}

function RecipeDetail({
  activeTab,
  collectionIds,
  metric,
  missingForSelected,
  notes,
  savedIds,
  scale,
  selected,
  setActiveTab,
  setActiveView,
  setMetric,
  setScale,
  tabContent,
  updateStored,
}: {
  activeTab: Tab
  collectionIds: string[]
  metric: boolean
  missingForSelected: string[]
  notes: Record<string, string>
  savedIds: string[]
  scale: number
  selected: CatalogCocktail
  setActiveTab: (tab: Tab) => void
  setActiveView: (view: View) => void
  setMetric: (metric: boolean) => void
  setScale: (scale: number | ((current: number) => number)) => void
  tabContent: string[]
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  const isSaved = savedIds.includes(selected.id)
  const isCollected = collectionIds.includes(selected.id)
  const imageUrl = cocktailPhoto(selected)

  return (
    <div className="page">
      <div className="page-actions">
        <button className="back-button" onClick={() => setActiveView('Search')}>
          <ArrowLeft size={18} />
          Back to search
        </button>
        <div className="utility-row">
          <button
            onClick={() =>
              updateStored((state) => ({ ...state, savedIds: toggleItem(state.savedIds, selected.id) }))
            }
          >
            <Save size={17} /> {isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={() =>
              updateStored((state) => ({
                ...state,
                collectionIds: toggleItem(state.collectionIds, selected.id),
              }))
            }
          >
            <Plus size={17} /> {isCollected ? 'In Collection' : 'Add to Collection'}
          </button>
          <button
            onClick={() =>
              navigator.clipboard?.writeText(`${selected.name}: ${selected.ingredients.map(formatPlainIngredient).join(', ')}`)
            }
          >
            <Share2 size={17} /> Copy Spec
          </button>
          <button aria-label="More actions">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <section className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{selected.source === 'custom' ? 'Local house spec' : selected.family}</span>
          <h1>
            {selected.name}
            <span>◌</span>
          </h1>
          <p className="subtitle">
            {selected.style || selected.family} - {selected.difficulty || 'balanced'}
          </p>
          <div className="meta-strip">
            <Meta icon={BottleWine} label="Base Spirit" value={titleize(selected.baseSpirit)} />
            <Meta icon={Martini} label="Family" value={selected.family} />
            <Meta icon={Gauge} label="Difficulty" value={titleize(selected.difficulty)} />
            <Meta icon={Clock3} label="Prep Time" value={selected.prepTime} />
          </div>
          <p className="description">{selected.whyItWorks || selected.historyNotes}</p>
          <div className="tag-row">
            {[selected.family, selected.baseSpirit, selected.style, selected.ice, selected.glassware]
              .filter(Boolean)
              .slice(0, 5)
              .map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
          </div>
        </div>

        <figure className="drink-visual">
          <img alt={`${selected.name} cocktail`} referrerPolicy="no-referrer" src={imageUrl} />
          <figcaption>{selected.imageCredit || fallbackPhotoCredit}</figcaption>
          <button onClick={() => window.open(imageUrl, '_blank', 'noopener,noreferrer')}>View fullscreen</button>
        </figure>

        <aside className="action-rail">
          <div className="rating-card">
            <strong>{selected.source === 'custom' ? 'Local' : '4.7'}</strong>
            <span className="stars" aria-label="Rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star fill="currentColor" key={index} />
              ))}
            </span>
            <small>{selected.source === 'custom' ? '' : '(128)'}</small>
            <em>{selected.source === 'custom' ? 'Your stored recipe' : 'Rate this recipe'}</em>
          </div>
          <div className="scale-card">
            <span>Scale Recipe</span>
            <button onClick={() => setScale((current) => Math.max(1, current - 1))}>
              <Minus size={16} />
            </button>
            <strong>{scale}x</strong>
            <button onClick={() => setScale((current) => Math.min(20, current + 1))}>
              <Plus size={16} />
            </button>
            <button className="reset" onClick={() => setScale(1)}>
              Reset
            </button>
          </div>
          <button className="rail-link" onClick={() => setActiveView('Batch Planner')}>
            <FlaskConical />
            <span>
              Batch This Recipe
              <small>Make for a crowd</small>
            </span>
            <ChevronRight />
          </button>
          <button
            className="rail-link"
            onClick={() =>
              updateStored((state) => ({ ...state, shoppingList: mergeList(state.shoppingList, missingForSelected) }))
            }
          >
            <ShoppingBag />
            <span>
              Add Missing
              <small>{missingForSelected.length ? missingForSelected.join(', ') : 'You can make this'}</small>
            </span>
            <ChevronRight />
          </button>
        </aside>
      </section>

      <section className="recipe-card">
        <div className="tabs" role="tablist" aria-label="Recipe detail sections">
          {tabs.map((tab) => (
            <button
              className={activeTab === tab ? 'active' : ''}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Recipe' ? (
          <div className="recipe-grid">
            <section className="panel ingredients-panel">
              <header>
                <h2>Ingredients</h2>
                <label className="metric-toggle">
                  <span>Metric</span>
                  <input
                    checked={metric}
                    onChange={(event) => setMetric(event.target.checked)}
                    type="checkbox"
                  />
                </label>
              </header>
              <div className="ingredient-list">
                {selected.ingredients.map((ingredient, index) => (
                  <div className="ingredient-row" key={`${ingredient.name}-${index}`}>
                    <strong>{formatIngredient(ingredient, scale, metric)}</strong>
                    <BottleWine size={18} />
                    <span>
                      {titleize(ingredient.name)}
                      <small>{ingredient.unit || selected.family}</small>
                    </span>
                    <MoreHorizontal size={16} />
                  </div>
                ))}
              </div>
              <button
                className="add-row"
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
                <Plus size={17} /> Add Ingredients to Shopping
              </button>
              <button
                className="copy-row"
                onClick={() => navigator.clipboard?.writeText(selected.ingredients.map(formatPlainIngredient).join('\n'))}
              >
                <Copy size={17} /> Copy Ingredients
              </button>
            </section>

            <section className="panel method-panel">
              <h2>Method</h2>
              <ol>
                {(selected.methodSteps.length ? selected.methodSteps : [selected.method]).map((step, index) => (
                  <li key={`${step}-${index}`}>
                    <span>{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="quick-stats">
                <h3>Quick Stats</h3>
                <div>
                  <Stat label="Glassware" value={selected.glassware} />
                  <Stat label="Garnish" value={selected.garnish} />
                  <Stat label="Ice" value={selected.ice} />
                  <Stat label="Dilution" value={estimateDilution(selected)} />
                </div>
              </div>
            </section>

            <FlavorPanel selected={selected} />
          </div>
        ) : (
          <div className="panel tab-panel">
            <h2>{activeTab}</h2>
            <div className="tab-content">
              {tabContent.map((item) => (
                <p key={item}>{item}</p>
              ))}
              {!tabContent.length && <p>No notes yet. Add this as a local custom variation.</p>}
            </div>
            {activeTab === 'Variations' && (
              <div className="variation-grid">
                {selected.variations.map((variation) => (
                  <article key={variation}>
                    <strong>{variation}</strong>
                    <span>Variation</span>
                    <p>Use search to open or build this riff as a local cocktail.</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        <footer className="pro-tip">
          <div>
            <Sparkles size={20} />
            <strong>Local Notes</strong>
            <textarea
              aria-label="Local notes"
              onChange={(event) =>
                updateStored((state) => ({
                  ...state,
                  notes: { ...state.notes, [selected.id]: event.target.value },
                }))
              }
              placeholder="Add tasting notes, bottle choices, or party prep notes..."
              value={notes[selected.id] ?? ''}
            />
          </div>
          <blockquote>
            “Balance is not something you find, it’s something you build.”
            <span>House note</span>
          </blockquote>
        </footer>
      </section>
    </div>
  )

}

function FlavorPanel({ selected }: { selected: CatalogCocktail }) {
  const meters = flavorMeters(selected)
  return (
    <>
      <section className="panel glance-panel">
        <h2>At a Glance</h2>
        {meters.map((meter) => (
          <div className="meter-row" key={meter.label}>
            <span>{meter.label}</span>
            <div>
              {Array.from({ length: 9 }).map((_, index) => (
                <i className={index < meter.value ? 'filled' : ''} key={index} />
              ))}
            </div>
          </div>
        ))}
        <p>Strength: {titleize(selected.flavorProfile.booziness || selected.difficulty)}</p>
        <div className="strength-line">
          <span style={{ width: `${Math.max(22, meters[3]?.value * 9 || 34)}%` }} />
        </div>
      </section>

      <section className="panel flavor-panel">
        <h2>Flavor Highlights</h2>
        <div>
          {highlightTerms(selected).map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      </section>
    </>
  )
}

function ListView({
  cocktails,
  eyebrow,
  onOpen,
  title,
}: {
  cocktails: CatalogCocktail[]
  eyebrow: string
  onOpen: (cocktail: CatalogCocktail) => void
  title: string
}) {
  return (
    <div className="page view-page">
      <ViewHeader eyebrow={eyebrow} title={title} />
      <div className="card-grid">
        {cocktails.map((cocktail) => (
          <CocktailCard cocktail={cocktail} key={cocktail.id} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

function InventoryView({
  inventoryEntry,
  matches,
  onAddInventory,
  onAddShopping,
  onOpen,
  removeInventory,
  removeShopping,
  setInventoryEntry,
  setShoppingEntry,
  shoppingEntry,
  state,
}: {
  inventoryEntry: string
  matches: { cocktail: CatalogCocktail; missing: string[] }[]
  onAddInventory: () => void
  onAddShopping: () => void
  onOpen: (cocktail: CatalogCocktail) => void
  removeInventory: (item: string) => void
  removeShopping: (item: string) => void
  setInventoryEntry: (value: string) => void
  setShoppingEntry: (value: string) => void
  shoppingEntry: string
  state: StoredState
}) {
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
          <PillList items={state.inventory} onRemove={removeInventory} />
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
      <ViewHeader eyebrow="Makeable now" title="Best matches from your current inventory" />
      <div className="card-grid">
        {matches.map(({ cocktail, missing }) => (
          <CocktailCard cocktail={cocktail} key={cocktail.id} missing={missing} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

function BatchPlannerView({
  batchRows,
  selected,
  servings,
  setServings,
  updateStored,
}: {
  batchRows: string[]
  selected: CatalogCocktail
  servings: number
  setServings: (servings: number) => void
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  const water = Math.round(estimatedWaterMl(selected, servings))
  return (
    <div className="page view-page">
      <ViewHeader eyebrow="Batch Planner" title={`Scale ${selected.name} for a real service plan`} />
      <section className="split-grid">
        <div className="panel batch-control">
          <h2>Servings</h2>
          <div className="serving-stepper">
            <button onClick={() => setServings(Math.max(1, servings - 1))}>
              <Minus size={16} />
            </button>
            <strong>{servings}</strong>
            <button onClick={() => setServings(Math.min(80, servings + 1))}>
              <Plus size={16} />
            </button>
          </div>
          <p>Add about {water} ml water if this will be served directly from the bottle.</p>
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
            Add batch ingredients to shopping
          </button>
        </div>
        <div className="panel">
          <h2>Batch Sheet</h2>
          <div className="batch-list">
            {batchRows.map((row) => (
              <div key={row}>{row}</div>
            ))}
            <div>Measured water: {water} ml</div>
          </div>
        </div>
      </section>
      <div className="panel prep-notes">
        <h2>Service Notes</h2>
        <p>{selected.batchingNotes || 'Batch stable ingredients; keep citrus, bubbles, and texture to service.'}</p>
        <p>Keep the bottle cold, label it, and taste after dilution before guests arrive.</p>
      </div>
    </div>
  )
}

function CollectionsView({
  collectionCocktails,
  onOpen,
  savedCocktails,
}: {
  collectionCocktails: CatalogCocktail[]
  onOpen: (cocktail: CatalogCocktail) => void
  savedCocktails: CatalogCocktail[]
}) {
  return (
    <div className="page view-page">
      <ViewHeader eyebrow="Collections" title="Saved specs and party candidates stored locally" />
      <section className="split-grid">
        <div>
          <h2 className="section-label">Saved</h2>
          <div className="mini-list">
            {savedCocktails.map((cocktail) => (
              <button key={cocktail.id} onClick={() => onOpen(cocktail)}>
                <strong>{cocktail.name}</strong>
                <span>{cocktail.family}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="section-label">Collection</h2>
          <div className="mini-list">
            {collectionCocktails.map((cocktail) => (
              <button key={cocktail.id} onClick={() => onOpen(cocktail)}>
                <strong>{cocktail.name}</strong>
                <span>{cocktail.style}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function TroubleshootView({
  selected,
  setTrouble,
  trouble,
  updateStored,
}: {
  selected: CatalogCocktail
  setTrouble: (trouble: string) => void
  trouble: string
  updateStored: (updater: (state: StoredState) => StoredState) => void
}) {
  return (
    <div className="page view-page">
      <ViewHeader eyebrow="Troubleshoot" title={`Fix a flawed ${selected.name} or any similar drink`} />
      <section className="split-grid">
        <div className="panel">
          <h2>Failure Mode</h2>
          <select value={trouble} onChange={(event) => setTrouble(event.target.value)}>
            {Object.keys(troubleFixes).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <div className="tab-content">
            {troubleFixes[trouble].map((fix) => (
              <p key={fix}>{fix}</p>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2>Save Fix Note</h2>
          <p>Attach this diagnosis to the selected recipe so it is available next time.</p>
          <button
            onClick={() =>
              updateStored((state) => ({
                ...state,
                notes: {
                  ...state.notes,
                  [selected.id]: `${state.notes[selected.id] || ''}\n${trouble}: ${troubleFixes[trouble][0]}`.trim(),
                },
              }))
            }
          >
            Save to local notes
          </button>
        </div>
      </section>
    </div>
  )
}

function CustomCocktailForm({
  customDraft,
  onCreate,
  setCustomDraft,
}: {
  customDraft: typeof starterCustom
  onCreate: () => void
  setCustomDraft: (draft: typeof starterCustom) => void
}) {
  return (
    <div className="panel custom-form">
      <h2>Add Local Cocktail</h2>
      <input
        onChange={(event) => setCustomDraft({ ...customDraft, name: event.target.value })}
        placeholder="Name"
        value={customDraft.name}
      />
      <div className="two-inputs">
        <input
          onChange={(event) => setCustomDraft({ ...customDraft, family: event.target.value })}
          placeholder="Family"
          value={customDraft.family}
        />
        <input
          onChange={(event) => setCustomDraft({ ...customDraft, baseSpirit: event.target.value })}
          placeholder="Base spirit"
          value={customDraft.baseSpirit}
        />
      </div>
      <textarea
        onChange={(event) => setCustomDraft({ ...customDraft, ingredients: event.target.value })}
        placeholder={'Ingredients, one per line\n2 oz rye\n0.75 oz lemon juice'}
        value={customDraft.ingredients}
      />
      <textarea
        onChange={(event) => setCustomDraft({ ...customDraft, method: event.target.value })}
        placeholder="Method"
        value={customDraft.method}
      />
      <button onClick={onCreate}>
        <Plus size={16} /> Save local cocktail
      </button>
    </div>
  )
}

function CocktailCard({
  action,
  cocktail,
  missing = [],
  onOpen,
}: {
  action?: ReactNode
  cocktail: CatalogCocktail
  missing?: string[]
  onOpen: (cocktail: CatalogCocktail) => void
}) {
  return (
    <article className="result-card">
      <button className="result-main" onClick={() => onOpen(cocktail)}>
        <img
          alt={`${cocktail.name} cocktail`}
          className="result-thumb"
          loading="lazy"
          referrerPolicy="no-referrer"
          src={cocktailPhoto(cocktail)}
        />
        <span>{cocktail.family}</span>
        <strong>{cocktail.name}</strong>
        <p>{cocktail.style || cocktail.whyItWorks}</p>
        <small>
          {cocktail.baseSpirit} · {cocktail.prepTime}
        </small>
      </button>
      {missing.length > 0 ? (
        <div className="missing-line">Missing: {missing.slice(0, 3).join(', ')}</div>
      ) : (
        <div className="missing-line success">Inventory match</div>
      )}
      {action && <div className="card-actions">{action}</div>}
    </article>
  )
}

function ViewHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="view-header">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
    </header>
  )
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-block">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function InlineAdder({
  onAdd,
  placeholder,
  setValue,
  value,
}: {
  onAdd: () => void
  placeholder: string
  setValue: (value: string) => void
  value: string
}) {
  return (
    <label className="inline-adder">
      <input
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onAdd()
        }}
        placeholder={placeholder}
        value={value}
      />
      <button onClick={onAdd}>
        <Plus size={16} />
      </button>
    </label>
  )
}

function PillList({ items, onRemove }: { items: string[]; onRemove: (item: string) => void }) {
  return (
    <div className="pill-list">
      {items.map((item) => (
        <span key={item}>
          {item}
          <button aria-label={`Remove ${item}`} onClick={() => onRemove(item)}>
            <Trash2 size={13} />
          </button>
        </span>
      ))}
    </div>
  )
}

function Meta({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="meta-item">
      <Icon size={22} strokeWidth={1.7} />
      <span>{label}</span>
      <strong>{value || 'Flexible'}</strong>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <Wine size={18} />
      <span>{label}</span>
      <strong>{value || 'House choice'}</strong>
    </div>
  )
}

function formatIngredient(ingredient: CatalogIngredient, scale: number, metric: boolean) {
  if (typeof ingredient.amount !== 'number') return `${ingredient.amount} ${ingredient.unit}`.trim()
  const amount = ingredient.amount * scale
  if (metric && ingredient.unit.toLowerCase() === 'oz') return `${Math.round(amount * 30)} ml`
  return `${formatOz(amount)} ${ingredient.unit}`.trim()
}

function formatPlainIngredient(ingredient: CatalogIngredient) {
  return `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`.trim()
}

function formatOz(value: number) {
  const whole = Math.floor(value)
  const fraction = value - whole
  const eighths = Math.round(fraction * 8)
  const fractions: Record<number, string> = {
    0: '',
    1: '1/8',
    2: '1/4',
    3: '3/8',
    4: '1/2',
    5: '5/8',
    6: '3/4',
    7: '7/8',
    8: '',
  }
  if (eighths === 8) return `${whole + 1}`
  if (!whole && eighths > 0) return fractions[eighths]
  if (whole && eighths > 0) return `${whole} ${fractions[eighths]}`
  return `${whole || value}`
}

function filterCocktails(cocktails: CatalogCocktail[], query: string) {
  const clean = query.trim().toLowerCase()
  if (!clean) return cocktails
  return cocktails.filter((cocktail) => searchableText(cocktail).includes(clean))
}

function searchableText(cocktail: CatalogCocktail) {
  return [
    cocktail.name,
    cocktail.family,
    cocktail.style,
    cocktail.baseSpirit,
    ...cocktail.aliases,
    ...cocktail.ingredients.map((ingredient) => ingredient.name),
    ...cocktail.variations,
  ]
    .join(' ')
    .toLowerCase()
}

function normalizeIngredient(value: string) {
  return value
    .toLowerCase()
    .replace(/fresh|juice|syrup|rich|simple|1:1|2:1|or|and|aged|white|dark|blanco/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function missingIngredients(cocktail: CatalogCocktail, inventory: string[]) {
  const normalizedInventory = inventory.map(normalizeIngredient)
  return cocktail.ingredients
    .map((ingredient) => ingredient.name)
    .filter((ingredient) => {
      const normalized = normalizeIngredient(ingredient)
      if (!normalized) return false
      return !normalizedInventory.some((owned) => owned && (normalized.includes(owned) || owned.includes(normalized)))
    })
}

function mergeList(current: string[], additions: string[]) {
  return additions.reduce((items, item) => uniquePush(items, item), current)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseIngredients(value: string): CatalogIngredient[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([\d./]+)\s+([a-zA-Z]+)\s+(.+)$/)
      if (!match) return { name: line, amount: '', unit: '' }
      return {
        amount: Number(match[1]) || match[1],
        unit: match[2],
        name: match[3],
      }
    })
}

function splitSteps(value: string) {
  return value
    .split(/(?<=[.!?])\s+|\n+/)
    .map((step) => step.trim())
    .filter(Boolean)
}

function getTabContent(cocktail: CatalogCocktail, activeTab: Tab) {
  if (activeTab === 'Why it works') return [cocktail.whyItWorks]
  if (activeTab === 'Common mistakes') return cocktail.commonMistakes
  if (activeTab === 'Home-bar notes') return cocktail.homeBarNotes
  if (activeTab === 'Substitutions') return cocktail.substitutions
  if (activeTab === 'Variations') return cocktail.variations
  if (activeTab === 'Batching') return [cocktail.batchingNotes]
  return []
}

function flavorMeters(cocktail: CatalogCocktail) {
  const map: Record<string, number> = { none: 0, low: 2, 'low-medium': 3, medium: 5, 'medium-low': 4, 'medium-high': 6, high: 7, 'very high': 8 }
  return [
    { label: 'Sweet', value: map[cocktail.flavorProfile.sweetness] ?? 5 },
    { label: 'Sour', value: map[cocktail.flavorProfile.acidity] ?? 4 },
    { label: 'Bitter', value: map[cocktail.flavorProfile.bitterness] ?? 3 },
    { label: 'Spirit Forward', value: map[cocktail.flavorProfile.booziness] ?? 5 },
  ]
}

function highlightTerms(cocktail: CatalogCocktail) {
  return [
    cocktail.flavorProfile.aroma,
    cocktail.flavorProfile.texture,
    cocktail.flavorProfile.bitterness && `${cocktail.flavorProfile.bitterness} bitter`,
    cocktail.baseSpirit,
    cocktail.garnish,
  ]
    .filter(Boolean)
    .map((item) => titleize(String(item).split(',')[0]))
    .slice(0, 5)
}

function titleize(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function estimateDilution(cocktail: CatalogCocktail) {
  const family = cocktail.family.toLowerCase()
  if (family.includes('negroni') || family.includes('martini') || family.includes('manhattan')) return '20-25%'
  if (family.includes('tiki')) return '20-30%'
  if (family.includes('highball') || family.includes('spritz')) return 'Built'
  return '25%'
}

function estimatedWaterMl(cocktail: CatalogCocktail, servings: number) {
  const oz = cocktail.ingredients.reduce((sum, ingredient) => {
    if (typeof ingredient.amount === 'number' && ingredient.unit.toLowerCase() === 'oz') {
      return sum + ingredient.amount
    }
    return sum
  }, 0)
  const dilution = estimateDilution(cocktail) === '20-25%' ? 0.22 : 0.25
  return oz * 30 * servings * dilution
}

function batchIngredients(cocktail: CatalogCocktail, servings: number) {
  return cocktail.ingredients.map((ingredient) => {
    if (typeof ingredient.amount === 'number' && ingredient.unit.toLowerCase() === 'oz') {
      return `${Math.round(ingredient.amount * servings * 30)} ml ${titleize(ingredient.name)}`
    }
    if (typeof ingredient.amount === 'number') {
      return `${ingredient.amount * servings} ${ingredient.unit} ${titleize(ingredient.name)}`.trim()
    }
    return `${ingredient.amount} ${ingredient.unit} ${titleize(ingredient.name)}`.trim()
  })
}

export default App
