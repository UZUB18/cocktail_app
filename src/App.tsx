import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
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
  findCocktail,
  loadStoredState,
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

function initialView() {
  const hash = window.location.hash.replace(/^#/, '').split('/')[0].replace(/-/g, ' ').toLowerCase()
  return navItems.find((item) => item.label.toLowerCase() === hash)?.label || 'Home / Command'
}

function initialSelectedIdFromHash() {
  return window.location.hash.replace(/^#/, '').split('/')[1]
}

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
  const [stored, setStored] = useState<StoredState>(() => {
    const loaded = loadStoredState()
    const selectedId = initialSelectedIdFromHash()
    if (!selectedId || !catalogCocktails.some((cocktail) => cocktail.id === selectedId)) return loaded
    return { ...loaded, selectedId }
  })
  const [activeView, setActiveView] = useState<View>(() => initialView())
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

  function navigate(view: View) {
    setActiveView(view)
  }

  function openCocktail(cocktail: CatalogCocktail) {
    navigate('Recipes')
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
    navigate('Recipes')
  }

  const tabContent = getTabContent(selected, activeTab)
  const missingForSelected = missingIngredients(selected, stored.inventory)

  return (
    <main className="app-shell">
      <div className="edge-hover-zone" aria-hidden="true" />
      <Sidebar
        activeView={activeView}
        collectionCount={stored.collectionIds.length}
        savedCount={stored.savedIds.length}
        shoppingCount={stored.shoppingList.length}
        setActiveView={navigate}
      />

      <section className="workspace">
        <header className="topbar">
          <div className="greeting">
            <Sparkles size={25} />
            <div>
              <strong>Good evening, Alex.</strong>
              <span>
                {cocktails.length} cocktails - {stored.savedIds.length} saved - {stored.inventory.length} in inventory
              </span>
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
            savedCount={stored.savedIds.length}
            savedIds={stored.savedIds}
            selected={selected}
            setActiveView={setActiveView}
            setCustomDraft={setCustomDraft}
            setQuery={setQuery}
            shoppingCount={stored.shoppingList.length}
            submitSearch={submitSearch}
            toggleSave={(id) =>
              updateStored((state) => ({ ...state, savedIds: toggleItem(state.savedIds, id) }))
            }
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
            cocktails={cocktails}
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
  savedCount,
  savedIds,
  selected,
  setActiveView,
  setCustomDraft,
  setQuery,
  shoppingCount,
  submitSearch,
  toggleSave,
}: {
  cocktails: CatalogCocktail[]
  customDraft: typeof starterCustom
  inventoryCount: number
  onCreate: () => void
  onOpen: (cocktail: CatalogCocktail) => void
  recentSearches: string[]
  savedCount: number
  savedIds: string[]
  selected: CatalogCocktail
  setActiveView: (view: View) => void
  setCustomDraft: (draft: typeof starterCustom) => void
  setQuery: (query: string) => void
  shoppingCount: number
  submitSearch: (query: string) => void
  toggleSave: (id: string) => void
}) {
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

  function runPresetSearch(value: string) {
    setQuery(value)
    submitSearch(value)
  }

  return (
    <div className="home-page">
      <div className="home-left-column">
        <section className="library-hero" style={{ '--hero-image': `url(${cocktailPhoto(heroCocktail)})` } as CSSProperties}>
          <span className="eyebrow">Local-first. Private. Always yours.</span>
          <h1>Your cocktail library, beautifully organized.</h1>
          <p>
            Build, search, save, and batch from your home bar. {catalogCocktails.length} cocktail specs, your recipes,
            notes, collections, and inventory right in this browser.
          </p>
          <button className="primary-home-action" onClick={() => setActiveView('Search')}>
            Browse all cocktails
            <ChevronRight size={20} />
          </button>
        </section>

        <section className="featured-section">
          <SectionTitle action="View all" onAction={() => setActiveView('Search')} title="Featured cocktails" />
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
        </section>

        <section className="collections-home">
          <SectionTitle action="View all" onAction={() => setActiveView('Collections')} title="Collections" />
          <div className="collection-tile-grid">
            {collectionTiles.map((tile) => (
              <button className="collection-tile" key={tile.label} onClick={() => runPresetSearch(tile.query)}>
                <span>
                  <tile.icon size={28} />
                </span>
                <strong>{tile.label}</strong>
                <small>{tile.count} recipes</small>
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="home-right-rail">
        <section className="home-panel at-glance">
          <SectionTitle action="Manage" onAction={() => setActiveView('Inventory')} title="At a glance" />
          <div className="glance-grid">
            <StatBlock label="Cocktails in catalog" value={`${cocktails.length}`} />
            <StatBlock label="Saved favorites" value={`${savedCount}`} />
            <StatBlock label="Ingredients in inventory" value={`${inventoryCount}`} />
            <StatBlock label="Low stock restock soon" value={`${lowStock}`} />
          </div>
        </section>

        <section className="home-panel continue-panel">
          <SectionTitle action="View all" onAction={() => setActiveView('Recipes')} title="Continue where you left off" />
          <div className="continue-card">
            <img alt={`${continueCocktail.name} cocktail`} src={cocktailPhoto(continueCocktail)} />
            <div>
              <strong>{continueCocktail.name}</strong>
              <span>{continueCocktail.source === 'custom' ? 'Local recipe' : continueCocktail.family}</span>
              <div className="progress-track">
                <i style={{ width: `${savedIds.includes(continueCocktail.id) ? 82 : 58}%` }} />
              </div>
            </div>
            <small>{savedIds.includes(continueCocktail.id) ? '82%' : '58%'}</small>
            <button onClick={() => onOpen(continueCocktail)}>Open</button>
          </div>
        </section>

        <section className="home-panel quick-add-panel">
          <h2>Quick add cocktail</h2>
          <div className="quick-add-row">
            <input
              aria-label="Cocktail name"
              onChange={(event) => setCustomDraft({ ...customDraft, name: event.target.value })}
              placeholder="Cocktail name"
              value={customDraft.name}
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
            <button onClick={onCreate}>Add</button>
          </div>
        </section>

        <div className="rail-two-column">
          <section className="home-panel activity-panel">
            <SectionTitle action="View all" onAction={() => setActiveView('Search')} title="Recent activity" />
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

          <section className="home-panel recommendations-panel">
            <h2>
              Smart recommendations
              <Sparkles size={16} />
            </h2>
            <button onClick={() => setActiveView('Inventory')}>
              <ShoppingBag size={18} />
              <span>
                Low on {lowStock} ingredients
                <small>View restock list</small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => setActiveView('Batch Planner')}>
              <FlaskConical size={18} />
              <span>
                Try a batch recipe
                <small>Make 8+ drinks at once</small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => runPresetSearch(continueCocktail.family)}>
              <Shuffle size={18} />
              <span>
                Explore similar
                <small>Based on your favorites</small>
              </span>
              <ChevronRight size={18} />
            </button>
          </section>
        </div>

        <section className="home-panel inventory-snapshot">
          <SectionTitle action="View inventory" onAction={() => setActiveView('Inventory')} title="Inventory snapshot" />
          <div className="inventory-bar" aria-label="Inventory status">
            <span style={{ flex: Math.max(wellStocked, 1) }} />
            <span style={{ flex: Math.max(runningLow, 1) }} />
            <span style={{ flex: Math.max(outOfStock, lowStock > 0 ? 1 : 0.35) }} />
          </div>
          <div className="inventory-legend">
            <span>Well stocked <b>{wellStocked}</b></span>
            <span>Running low <b>{runningLow}</b></span>
            <span>Out of stock <b>{outOfStock}</b></span>
          </div>
        </section>
      </aside>
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
                {selected.variations.map((variation) => {
                  const linkedCocktail = findVariationCocktail(variation)
                  return (
                    <article className={linkedCocktail ? 'linked' : ''} key={variation}>
                      <strong>{variation}</strong>
                      <span>{linkedCocktail ? 'Open recipe' : 'Variation'}</span>
                      {linkedCocktail ? (
                        <button
                          onClick={() => {
                            updateStored((state) => ({ ...state, selectedId: linkedCocktail.id }))
                            setActiveTab('Recipe')
                          }}
                        >
                          Go to {linkedCocktail.name}
                          <ChevronRight size={16} />
                        </button>
                      ) : (
                        <p>Use search to open or build this riff as a local cocktail.</p>
                      )}
                    </article>
                  )
                })}
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

function SectionTitle({
  action,
  onAction,
  title,
}: {
  action: string
  onAction: () => void
  title: string
}) {
  return (
    <div className="home-section-title">
      <h2>{title}</h2>
      <button onClick={onAction}>
        {action}
        <ChevronRight size={17} />
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

function byName(cocktails: CatalogCocktail[], name: string) {
  return cocktails.find((cocktail) => cocktail.name.toLowerCase() === name.toLowerCase())
}

function findVariationCocktail(variation: string) {
  const clean = normalizeCocktailName(variation)
  return catalogCocktails.find((cocktail) => {
    const names = [cocktail.name, ...cocktail.aliases]
    return names.some((name) => normalizeCocktailName(name) === clean)
  })
}

function normalizeCocktailName(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(the|cocktail|drink|riff|variation)\b/g, '')
    .replace(/[^a-z0-9]+/g, '')
}

function countMatches(cocktails: CatalogCocktail[], query: string) {
  return filterCocktails(cocktails, query).length
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
  if (activeTab === 'Batching') {
    return [
      cocktail.batchingNotes,
      ...(hasEggTexture(cocktail)
        ? [
            'Egg white or whole egg should not be stored in the batch bottle. Batch the liquid base only, keep egg/aquafaba cold and separate, then dry shake or foam each serve to order.',
          ]
        : []),
    ]
  }
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

function defaultDilutionPercent(cocktail: CatalogCocktail) {
  const text = `${cocktail.family} ${cocktail.method} ${cocktail.style}`.toLowerCase()
  if (text.includes('highball') || text.includes('spritz') || text.includes('built')) return 0
  if (text.includes('martini') || text.includes('manhattan') || text.includes('stir')) return 0.15
  if (text.includes('tiki') || text.includes('shake') || text.includes('sour')) return 0.25
  return 0.2
}

function ingredientMl(ingredient: CatalogIngredient) {
  if (typeof ingredient.amount !== 'number') return 0
  const unit = ingredient.unit.toLowerCase()
  if (unit === 'oz') return ingredient.amount * 29.5735
  if (unit === 'ml') return ingredient.amount
  if (unit === 'tsp') return ingredient.amount * 4.92892
  if (unit === 'tbsp') return ingredient.amount * 14.7868
  if (unit === 'dash' || unit === 'dashes') return ingredient.amount * 0.9
  return 0
}

function isEggIngredient(ingredient: CatalogIngredient) {
  const name = ingredient.name.toLowerCase()
  const unit = ingredient.unit.toLowerCase()
  return name.includes('egg white') || name.includes('whole egg') || unit === 'egg' || unit === 'eggs'
}

function hasEggTexture(cocktail: CatalogCocktail) {
  return cocktail.ingredients.some(isEggIngredient)
}

function ingredientAbv(ingredient: CatalogIngredient) {
  const name = ingredient.name.toLowerCase()
  if (/juice|syrup|brine|water|cream|egg|soda|cola|tonic|ginger|coconut|coffee|tea/.test(name)) return 0
  if (/vermouth|sherry|port|wine|aperol|campari|amaro|liqueur|falernum|chartreuse|benedictine|maraschino|curaçao|curacao/.test(name)) {
    return 0.18
  }
  if (/bitters/.test(name)) return 0.45
  if (/gin|vodka|rum|whiskey|whisky|rye|bourbon|brandy|cognac|tequila|mezcal|pisco|cachaca|cachaça|scotch|applejack/.test(name)) {
    return 0.4
  }
  return 0
}

function buildBatchPlan(cocktail: CatalogCocktail, servings: number, dilutionPercent: number) {
  const rows = cocktail.ingredients.map((ingredient) => {
    const serviceOnly = isEggIngredient(ingredient)
    const perServeMl = serviceOnly ? 0 : ingredientMl(ingredient)
    const totalMl = perServeMl * servings
    return {
      name: titleize(ingredient.name),
      perServeMl,
      totalMl,
      abv: ingredientAbv(ingredient),
      serviceOnly,
      percent: 0,
    }
  })
  const ingredientTotalMl = rows.reduce((sum, row) => sum + row.totalMl, 0)
  const preDilutionPerServeMl = rows.reduce((sum, row) => sum + row.perServeMl, 0)
  const waterMl = ingredientTotalMl * dilutionPercent
  const waterPerServeMl = preDilutionPerServeMl * dilutionPercent
  const totalMl = ingredientTotalMl + waterMl
  const spiritMl = rows.filter((row) => row.abv >= 0.18).reduce((sum, row) => sum + row.totalMl, 0)
  const pureAlcoholMl = rows.reduce((sum, row) => sum + row.totalMl * row.abv, 0)
  const strength = totalMl > 0 ? Math.round((pureAlcoholMl / totalMl) * 1000) / 10 : 0
  const waterPercent = totalMl > 0 ? Math.round((waterMl / totalMl) * 1000) / 10 : 0
  return {
    rows: rows.map((row) => ({
      ...row,
      percent: totalMl > 0 ? Math.round((row.totalMl / totalMl) * 1000) / 10 : 0,
    })),
    ingredientTotalMl,
    waterMl,
    waterPerServeMl,
    waterPercent,
    totalMl,
    perServeMl: totalMl / servings,
    bottlesNeeded: Math.max(1, Math.ceil(spiritMl / 750)),
    strength,
  }
}

function formatBatchVolume(ml: number, metric: boolean) {
  if (metric) {
    if (ml >= 1000) return `${(ml / 1000).toFixed(2)} L`
    return `${Math.round(ml)} ml`
  }
  return `${(ml / 29.5735).toFixed(1)} fl oz`
}

function formatBatchRowVolume(
  row: { perServeMl: number; totalMl: number; serviceOnly?: boolean },
  key: 'perServeMl' | 'totalMl',
  metric: boolean,
) {
  if (row.serviceOnly) return 'to order'
  return formatBatchVolume(row[key], metric)
}

function batchShelfLife(cocktail: CatalogCocktail) {
  const text = searchableText(cocktail)
  if (hasEggTexture(cocktail)) {
    return 'Do not store egg white or whole egg in the batch. Keep the liquid base chilled and add egg or aquafaba fresh during service.'
  }
  if (/soda|sparkling|champagne|prosecco|beer|tonic/.test(text)) {
    return 'Do not pre-batch bubbles. Batch the still ingredients and top with carbonation at service.'
  }
  if (/lime|lemon|orange juice|grapefruit|pineapple/.test(text)) {
    return 'Fresh juice batches are best the same day. Keep refrigerated and taste before service.'
  }
  if (/vermouth|sherry|port|wine/.test(text)) {
    return 'Keep refrigerated. Best quality within 1-2 weeks because fortified wine oxidizes.'
  }
  return 'Store cold. Spirit-forward batches keep well for several weeks when sealed and chilled.'
}

function batchCaution(cocktail: CatalogCocktail) {
  const text = searchableText(cocktail)
  if (hasEggTexture(cocktail)) return 'Egg foam collapses, separates, and raises food-safety concerns if stored in a batch bottle.'
  if (/brine|olive/.test(text)) return 'Brine intensity changes with temperature and dilution.'
  if (/lime|lemon|juice|pineapple|grapefruit/.test(text)) return 'Fresh citrus can sharpen or fade after batching.'
  if (/soda|sparkling|champagne|prosecco|beer|tonic/.test(text)) return 'Carbonation should be added only when serving.'
  return 'Cold temperature and dilution can hide sweetness, bitterness, and alcohol heat.'
}

function estimatedPrepTime(servings: number) {
  return Math.max(10, Math.ceil(servings / 12) * 5)
}

export default App
