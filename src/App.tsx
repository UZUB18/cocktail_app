import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  ArrowLeft,
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  BottleWine,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  Copy,
  FileDown,
  FileUp,
  FlaskConical,
  Gauge,
  Home,
  Martini,
  Minus,
  MoreHorizontal,
  Plus,
  RotateCcw,
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
  Users,
  Wine,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './App.css'
import { catalogCocktails, type CatalogCocktail, type CatalogIngredient } from './data/catalog'
import {
  createStorageBackup,
  defaultState,
  loadStoredState,
  parseStorageBackup,
  resetStoredState,
  saveStoredState,
  storageSummary,
  toggleItem,
  uniquePush,
  type PartyMenuItem,
  type StockStatus,
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
  { label: 'Party Mode', icon: Users },
  { label: 'Collections', icon: BookOpen },
  { label: 'Troubleshoot', icon: Wrench },
] as const

type Tab = (typeof tabs)[number]
type View = (typeof navItems)[number]['label']
type SearchSort = 'relevance' | 'makeable' | 'saved' | 'fastest'
type MakeableFilter = 'any' | 'ready' | 'missing-1' | 'missing-2' | 'needs-shopping'
type SearchFilters = {
  family: string
  baseSpirit: string
  difficulty: string
  glassware: string
  makeable: MakeableFilter
}

type CustomIngredientDraft = {
  amount: string
  unit: string
  name: string
}

type CustomDraft = {
  name: string
  family: string
  baseSpirit: string
  style: string
  glassware: string
  ice: string
  garnish: string
  prepTime: string
  whyItWorks: string
  ingredients: CustomIngredientDraft[]
  methodSteps: string[]
  flavorProfile: Record<string, string>
}

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
  style: 'custom house spec',
  glassware: 'coupe',
  ice: 'served up',
  garnish: '',
  prepTime: '5 minutes',
  whyItWorks: '',
  ingredients: [{ amount: '2', unit: 'oz', name: '' }],
  methodSteps: [''],
  flavorProfile: {
    sweetness: 'medium',
    acidity: 'medium',
    bitterness: 'low',
    booziness: 'medium',
    dilution: 'medium',
    texture: 'balanced',
    aroma: 'fresh',
  },
} satisfies CustomDraft

const defaultSearchFilters: SearchFilters = {
  family: '',
  baseSpirit: '',
  difficulty: '',
  glassware: '',
  makeable: 'any',
}

const catalogByNormalizedName = new Map<string, CatalogCocktail>()
for (const cocktail of catalogCocktails) {
  for (const name of [cocktail.name, ...cocktail.aliases]) {
    catalogByNormalizedName.set(normalizeCocktailName(name), cocktail)
  }
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
  const [customDraft, setCustomDraft] = useState<CustomDraft>(starterCustom)
  const [customMessage, setCustomMessage] = useState('')
  const [storageMessage, setStorageMessage] = useState('')
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultSearchFilters)
  const [searchSort, setSearchSort] = useState<SearchSort>('relevance')
  const saveTimer = useRef<number | undefined>(undefined)
  const latestStored = useRef(stored)
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    latestStored.current = stored
  }, [stored])

  useEffect(() => {
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => saveStoredState(stored), 140)
    return () => window.clearTimeout(saveTimer.current)
  }, [stored])

  useEffect(() => {
    function flushStoredState() {
      window.clearTimeout(saveTimer.current)
      saveStoredState(latestStored.current)
    }

    function flushWhenHidden() {
      if (document.visibilityState === 'hidden') flushStoredState()
    }

    window.addEventListener('beforeunload', flushStoredState)
    document.addEventListener('visibilitychange', flushWhenHidden)
    return () => {
      window.removeEventListener('beforeunload', flushStoredState)
      document.removeEventListener('visibilitychange', flushWhenHidden)
    }
  }, [])

  const cocktails = useMemo(() => [...catalogCocktails, ...stored.customCocktails], [stored.customCocktails])
  const selected = useMemo(
    () => cocktails.find((cocktail) => cocktail.id === stored.selectedId) ?? catalogCocktails[0],
    [cocktails, stored.selectedId],
  )
  const coverageById = useMemo(
    () =>
      new Map(
        cocktails.map((cocktail) => [
          cocktail.id,
          ingredientCoverage(cocktail, stored.inventory, stored.inventoryLevels),
        ]),
      ),
    [cocktails, stored.inventory, stored.inventoryLevels],
  )
  const savedCocktails = useMemo(
    () => cocktails.filter((cocktail) => stored.savedIds.includes(cocktail.id)),
    [cocktails, stored.savedIds],
  )
  const collectionCocktails = useMemo(
    () => cocktails.filter((cocktail) => stored.collectionIds.includes(cocktail.id)),
    [cocktails, stored.collectionIds],
  )
  const searchResults = useMemo(
    () =>
      filterCocktails(cocktails, deferredQuery, searchFilters, coverageById, stored.savedIds, searchSort).slice(
        0,
        deferredQuery ? 60 : 30,
      ),
    [cocktails, coverageById, deferredQuery, searchFilters, searchSort, stored.savedIds],
  )
  const inventoryMatches = useMemo(
    () =>
      cocktails
        .map((cocktail) => ({ cocktail, coverage: coverageById.get(cocktail.id) ?? fullIngredientCoverage }))
        .filter((match) => match.coverage.score >= 58)
        .sort((a, b) => b.coverage.score - a.coverage.score)
        .slice(0, 12),
    [cocktails, coverageById],
  )
  const searchOptions = useMemo(() => buildSearchOptions(cocktails), [cocktails])

  function updateStored(updater: (state: StoredState) => StoredState) {
    setStored((current) => {
      const next = updater(current)
      latestStored.current = next
      return next
    })
  }

  function navigate(view: View) {
    setActiveView((current) => (current === view ? current : view))
  }

  function openCocktail(cocktail: CatalogCocktail) {
    navigate('Recipes')
    setActiveTab('Recipe')
    updateStored((state) => (state.selectedId === cocktail.id ? state : { ...state, selectedId: cocktail.id }))
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
    if (!name) {
      setCustomMessage('Add a cocktail name before saving.')
      return
    }
    const normalizedName = normalizeCocktailName(name)
    const duplicate = cocktails.find((cocktail) => normalizeCocktailName(cocktail.name) === normalizedName)
    if (duplicate) {
      setCustomMessage(`${duplicate.name} already exists. Open it or rename this custom spec before saving.`)
      return
    }
    const ingredients = customDraft.ingredients
      .map((ingredient) => ({
        amount: parseDraftAmount(ingredient.amount),
        unit: ingredient.unit.trim(),
        name: ingredient.name.trim(),
      }))
      .filter((ingredient) => ingredient.name)
    if (!ingredients.length) {
      setCustomMessage('Add at least one structured ingredient row before saving.')
      return
    }
    const methodSteps = customDraft.methodSteps.map((step) => step.trim()).filter(Boolean)
    const method = methodSteps.length ? methodSteps.join(' ') : 'Build, shake, or stir to taste.'
    const custom: CatalogCocktail = {
      id: `custom-${slugify(name)}-${Date.now()}`,
      name,
      aliases: [],
      family: customDraft.family.trim() || 'House',
      style: customDraft.style.trim() || 'custom house spec',
      baseSpirit: customDraft.baseSpirit.trim() || 'flexible',
      ingredients,
      method,
      methodSteps: methodSteps.length ? methodSteps : splitSteps(method),
      glassware: customDraft.glassware.trim() || 'house choice',
      ice: customDraft.ice.trim() || 'as needed',
      garnish: customDraft.garnish.trim() || 'to taste',
      flavorProfile: customDraft.flavorProfile,
      difficulty: 'custom',
      prepTime: customDraft.prepTime.trim() || '5 minutes',
      historyNotes: 'User-created local recipe.',
      whyItWorks: customDraft.whyItWorks.trim() || 'Add your tasting notes after a test round.',
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
    setCustomMessage(`Saved ${custom.name} as a local structured recipe.`)
    navigate('Recipes')
  }

  function exportBackup() {
    const now = new Date().toISOString()
    const backupState: StoredState = {
      ...stored,
      storageMeta: {
        ...stored.storageMeta,
        schemaVersion: 2,
        lastBackupAt: now,
      },
    }
    const backup = createStorageBackup(backupState, now)
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `cocktail-colleague-backup-${now.slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    latestStored.current = backupState
    setStored(backupState)
    setStorageMessage(`Backup exported at ${formatDateTime(now)}.`)
  }

  function importBackup(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const imported = parseStorageBackup(String(reader.result || ''))
        const now = new Date().toISOString()
        const nextState = {
          ...imported,
          storageMeta: {
            ...imported.storageMeta,
            lastImportAt: now,
          },
        }
        latestStored.current = nextState
        setStored(nextState)
        setStorageMessage(`Imported backup from ${file.name}.`)
      } catch (error) {
        setStorageMessage(error instanceof Error ? error.message : 'Could not import that backup file.')
      }
    }
    reader.readAsText(file)
  }

  function resetLocalData() {
    resetStoredState()
    const nextState = {
      ...defaultState,
      storageMeta: {
        ...defaultState.storageMeta,
        lastResetAt: new Date().toISOString(),
      },
    }
    latestStored.current = nextState
    setStored(nextState)
    setCustomDraft(starterCustom)
    setSearchFilters(defaultSearchFilters)
    setSearchSort('relevance')
    setStorageMessage('Local data reset to the starter Cocktail Colleague state.')
  }

  const tabContent = getTabContent(selected, activeTab)
  const missingForSelected = (coverageById.get(selected.id) ?? fullIngredientCoverage).missing

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
            customMessage={customMessage}
            inventoryCount={stored.inventory.length}
            onExportBackup={exportBackup}
            onImportBackup={importBackup}
            onCreate={saveCustomCocktail}
            onOpen={openCocktail}
            onResetStorage={resetLocalData}
            recentSearches={stored.recentSearches}
            savedCount={stored.savedIds.length}
            savedIds={stored.savedIds}
            selected={selected}
            setActiveView={setActiveView}
            setCustomDraft={setCustomDraft}
            setQuery={setQuery}
            shoppingCount={stored.shoppingList.length}
            state={stored}
            storageMessage={storageMessage}
            submitSearch={submitSearch}
            toggleSave={(id) =>
              updateStored((state) => ({ ...state, savedIds: toggleItem(state.savedIds, id) }))
            }
          />
        )}

        {activeView === 'Search' && (
          <SearchView
            coverageById={coverageById}
            filters={searchFilters}
            inventory={stored.inventory}
            inventoryLevels={stored.inventoryLevels}
            onAddMissing={(cocktail) =>
              updateStored((state) => ({
                ...state,
                shoppingList: mergeList(state.shoppingList, ingredientCoverage(cocktail, state.inventory, state.inventoryLevels).missing),
              }))
            }
            onOpen={openCocktail}
            onToggleSave={(id) =>
              updateStored((state) => ({ ...state, savedIds: toggleItem(state.savedIds, id) }))
            }
            options={searchOptions}
            query={query}
            recentSearches={stored.recentSearches}
            results={searchResults}
            savedIds={stored.savedIds}
            setFilters={setSearchFilters}
            setQuery={setQuery}
            setSort={setSearchSort}
            sort={searchSort}
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
              updateStored((state) => {
                const nextInventory = uniquePush(state.inventory, inventoryEntry)
                return {
                  ...state,
                  inventory: nextInventory,
                  inventoryLevels: {
                    ...state.inventoryLevels,
                    ...(inventoryEntry.trim() ? { [inventoryEntry.trim()]: state.inventoryLevels[inventoryEntry.trim()] ?? 'full' } : {}),
                  },
                }
              })
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
                inventoryLevels: Object.fromEntries(
                  Object.entries(state.inventoryLevels).filter(([entry]) => entry !== item),
                ),
              }))
            }
            removeShopping={(item) =>
              updateStored((state) => ({
                ...state,
                shoppingList: state.shoppingList.filter((entry) => entry !== item),
              }))
            }
            setInventoryEntry={setInventoryEntry}
            setInventoryStatus={(item, status) =>
              updateStored((state) => ({
                ...state,
                inventoryLevels: {
                  ...state.inventoryLevels,
                  [item]: status,
                },
              }))
            }
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

        {activeView === 'Party Mode' && (
          <PartyModeView
            cocktails={cocktails}
            inventory={stored.inventory}
            inventoryLevels={stored.inventoryLevels}
            onOpen={openCocktail}
            partyMenu={stored.partyMenu}
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
          <div className="panel-heading-row">
            <h2>Structured recipe editor</h2>
            <button onClick={onCreate}>Save recipe</button>
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

        <section className="home-panel storage-control-panel">
          <div className="panel-heading-row">
            <h2>Local data center</h2>
            <button onClick={onExportBackup}>
              <FileDown size={16} /> Export
            </button>
          </div>
          <div className="storage-stats compact">
            <StatBlock label="Saved" value={`${summary.saved}`} />
            <StatBlock label="Custom" value={`${summary.custom}`} />
            <StatBlock label="Inventory" value={`${summary.inventory}`} />
            <StatBlock label="Party menu" value={`${summary.partyDrinks}`} />
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
              <RotateCcw size={16} /> Reset starter data
            </button>
          </div>
          {storageMessage && <p className="status-message">{storageMessage}</p>}
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
            <button onClick={() => setActiveView('Party Mode')}>
              <Users size={18} />
              <span>
                Build a party menu
                <small>Aggregate shopping and prep</small>
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
            {activeTab === 'Variations' ? (
              <VariationPanel
                onOpenVariation={(linkedCocktail) => {
                  updateStored((state) => ({ ...state, selectedId: linkedCocktail.id }))
                  setActiveTab('Recipe')
                }}
                variations={selected.variations}
              />
            ) : (
              <div className="tab-content">
                {tabContent.map((item) => (
                  <p key={item}>{item}</p>
                ))}
                {!tabContent.length && <p>No notes yet. Add this as a local custom variation.</p>}
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
            <span>Colleague note</span>
          </blockquote>
        </footer>
      </section>
    </div>
  )
}

function VariationPanel({
  onOpenVariation,
  variations,
}: {
  onOpenVariation: (cocktail: CatalogCocktail) => void
  variations: string[]
}) {
  const variationLinks = variations.map((variation) => ({ name: variation, cocktail: findVariationCocktail(variation) }))
  const linked = variationLinks.filter((item): item is { name: string; cocktail: CatalogCocktail } => Boolean(item.cocktail))
  const unavailable = variationLinks.filter((item) => !item.cocktail).map((item) => item.name)

  return (
    <div className="variation-workspace">
      {linked.length > 0 && (
        <section>
          <span className="section-label">Available recipes</span>
          <div className="variation-grid linked-variations">
            {linked.map(({ cocktail }) => (
              <button
                className="variation-recipe-button"
                key={cocktail.id}
                onClick={() => onOpenVariation(cocktail)}
              >
                <img alt={`${cocktail.name} cocktail`} src={cocktailPhoto(cocktail)} />
                <span>
                  <strong>{cocktail.name}</strong>
                  <small>{cocktail.family} - {cocktail.baseSpirit}</small>
                </span>
                <ChevronRight size={17} />
              </button>
            ))}
          </div>
        </section>
      )}
      {unavailable.length > 0 && (
        <section>
          <span className="section-label">Named variations not in this catalog</span>
          <div className="variation-name-list">
            {unavailable.map((variation) => (
              <span key={variation}>{variation}</span>
            ))}
          </div>
        </section>
      )}
      {!variations.length && <p className="empty-variation-note">No listed variations for this recipe.</p>}
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

function PartyModeView({
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
  coverage,
  onOpen,
}: {
  action?: ReactNode
  cocktail: CatalogCocktail
  coverage?: IngredientCoverage
  onOpen: (cocktail: CatalogCocktail) => void
}) {
  const match = coverage ?? { score: 100, missing: [], substitutes: [], lowStock: [], emptyStock: [] }
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
      <div className="makeable-meter">
        <span style={{ width: `${match.score}%` }} />
      </div>
      {match.missing.length > 0 ? (
        <div className="missing-line">Missing: {match.missing.slice(0, 3).join(', ')}</div>
      ) : match.lowStock.length > 0 ? (
        <div className="missing-line warning">Low stock: {match.lowStock.slice(0, 3).join(', ')}</div>
      ) : match.substitutes.length > 0 ? (
        <div className="missing-line substitute">Substitute-ready: {match.substitutes.slice(0, 2).join(', ')}</div>
      ) : (
        <div className="missing-line success">Inventory match - {match.score}%</div>
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

function PillList({
  items,
  onRemove,
  onStatusChange,
  statuses,
}: {
  items: string[]
  onRemove: (item: string) => void
  onStatusChange?: (item: string, status: StockStatus) => void
  statuses?: Record<string, StockStatus>
}) {
  return (
    <div className="pill-list">
      {items.map((item) => (
        <span className={`pill-item ${statuses?.[item] ?? ''}`} key={item}>
          <b>{item}</b>
          {onStatusChange && (
            <select
              aria-label={`${item} stock status`}
              onChange={(event) => onStatusChange(item, event.target.value as StockStatus)}
              value={statuses?.[item] ?? 'full'}
            >
              <option value="full">Full</option>
              <option value="low">Low</option>
              <option value="empty">Empty</option>
            </select>
          )}
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

type IngredientCoverage = {
  score: number
  missing: string[]
  substitutes: string[]
  lowStock: string[]
  emptyStock: string[]
}

const fullIngredientCoverage: IngredientCoverage = {
  score: 100,
  missing: [],
  substitutes: [],
  lowStock: [],
  emptyStock: [],
}

type PartyIngredientTotal = {
  key: string
  name: string
  totalMl: number
  count: number
  drinks: string[]
  missing: boolean
  lowStock: boolean
}

const ingredientAliasGroups = [
  ['fresh lime juice', 'lime juice', 'lime'],
  ['fresh lemon juice', 'lemon juice', 'lemon'],
  ['fresh orange juice', 'orange juice', 'orange'],
  ['fresh grapefruit juice', 'grapefruit juice', 'grapefruit'],
  ['simple syrup 1:1', 'simple syrup', 'sugar syrup'],
  ['demerara syrup', 'rich demerara syrup', 'demerara'],
  ['agave syrup', 'agave nectar', 'agave'],
  ['orange liqueur', 'triple sec', 'cointreau', 'curacao', 'curaçao'],
  ['sweet vermouth', 'rosso vermouth', 'red vermouth'],
  ['dry vermouth', 'french vermouth'],
  ['sparkling wine', 'prosecco', 'champagne'],
  ['soda water', 'club soda', 'sparkling water'],
  ['ginger beer', 'ginger ale'],
]

const substitutionGroups = [
  ['white rum', 'light rum', 'silver rum'],
  ['dark rum', 'aged rum', 'blackstrap rum', 'jamaican rum'],
  ['bourbon', 'rye whiskey', 'rye', 'whiskey'],
  ['gin', 'london dry gin', 'old tom gin'],
  ['tequila', 'blanco tequila', 'reposado tequila'],
  ['mezcal', 'tequila'],
  ['campari', 'aperol', 'red bitter aperitif'],
  ['simple syrup', 'demerara syrup', 'honey syrup', 'agave syrup'],
  ['lemon juice', 'lime juice'],
]

function filterCocktails(
  cocktails: CatalogCocktail[],
  query: string,
  filters: SearchFilters = defaultSearchFilters,
  coverageById: Map<string, IngredientCoverage> = new Map(),
  savedIds: string[] = [],
  sort: SearchSort = 'relevance',
) {
  const clean = query.trim().toLowerCase()
  const ranked = cocktails
    .map((cocktail) => ({
      cocktail,
      coverage: coverageById.get(cocktail.id) ?? fullIngredientCoverage,
    }))
    .filter(({ cocktail, coverage }) => {
      if (clean === 'ready now' && coverage.missing.length > 0) return false
      if (clean === 'low stock' && coverage.lowStock.length === 0) return false
      if (clean && clean !== 'ready now' && clean !== 'low stock' && !searchableText(cocktail).includes(clean)) return false
      if (filters.family && cocktail.family !== filters.family) return false
      if (filters.baseSpirit && titleize(cocktail.baseSpirit) !== filters.baseSpirit) return false
      if (filters.difficulty && titleize(cocktail.difficulty) !== filters.difficulty) return false
      if (filters.glassware && titleize(cocktail.glassware) !== filters.glassware) return false
      if (filters.makeable === 'ready' && coverage.missing.length > 0) return false
      if (filters.makeable === 'missing-1' && coverage.missing.length > 1) return false
      if (filters.makeable === 'missing-2' && coverage.missing.length > 2) return false
      if (filters.makeable === 'needs-shopping' && coverage.missing.length === 0) return false
      return true
    })

  if (sort === 'makeable') {
    ranked.sort((a, b) => b.coverage.score - a.coverage.score || a.cocktail.name.localeCompare(b.cocktail.name))
  } else if (sort === 'saved') {
    ranked.sort((a, b) => Number(savedIds.includes(b.cocktail.id)) - Number(savedIds.includes(a.cocktail.id)))
  } else if (sort === 'fastest') {
    ranked.sort((a, b) => prepMinutes(a.cocktail.prepTime) - prepMinutes(b.cocktail.prepTime))
  }

  return ranked.map((item) => item.cocktail)
}

function buildSearchOptions(cocktails: CatalogCocktail[]) {
  return {
    families: uniqueSorted(cocktails.map((cocktail) => cocktail.family)),
    baseSpirits: uniqueSorted(cocktails.map((cocktail) => titleize(cocktail.baseSpirit))),
    difficulties: uniqueSorted(cocktails.map((cocktail) => titleize(cocktail.difficulty))),
    glassware: uniqueSorted(cocktails.map((cocktail) => titleize(cocktail.glassware))),
  }
}

function byName(cocktails: CatalogCocktail[], name: string) {
  return cocktails.find((cocktail) => cocktail.name.toLowerCase() === name.toLowerCase())
}

function findVariationCocktail(variation: string) {
  return catalogByNormalizedName.get(normalizeCocktailName(variation))
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
  const clean = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
  const aliasGroup = ingredientAliasGroups.find((group) => group.some((alias) => clean === normalizeBasic(alias)))
  if (aliasGroup) return normalizeBasic(aliasGroup[0])
  return clean
}

function ingredientCoverage(
  cocktail: CatalogCocktail,
  inventory: string[] = [],
  inventoryLevels: Record<string, StockStatus> = {},
): IngredientCoverage {
  const inventoryMatches = inventory.map((item) => ({
    item,
    normalized: normalizeIngredient(item),
    status: inventoryLevels[item] ?? 'full',
  }))
  const coverage = cocktail.ingredients.reduce(
    (result, ingredient) => {
      const normalized = normalizeIngredient(ingredient.name)
      const exact = inventoryMatches.find(
        (owned) => owned.normalized && (normalized.includes(owned.normalized) || owned.normalized.includes(normalized)),
      )
      if (exact?.status === 'empty') {
        result.missing.push(ingredient.name)
        result.emptyStock.push(exact.item)
        return result
      }
      if (exact?.status === 'low') {
        result.lowStock.push(exact.item)
        return result
      }
      if (exact) return result

      const substitute = inventoryMatches.find((owned) => canSubstitute(normalized, owned.normalized))
      if (substitute?.status === 'full') {
        result.substitutes.push(`${ingredient.name} via ${substitute.item}`)
        return result
      }
      result.missing.push(ingredient.name)
      return result
    },
    { missing: [], substitutes: [], lowStock: [], emptyStock: [] } as Omit<IngredientCoverage, 'score'>,
  )
  const penalty =
    coverage.missing.length * 20 +
    coverage.emptyStock.length * 12 +
    coverage.lowStock.length * 8 +
    coverage.substitutes.length * 5
  return {
    ...coverage,
    score: Math.max(0, Math.min(100, 100 - penalty)),
  }
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

function parseDraftAmount(value: string) {
  const clean = value.trim()
  if (!clean) return ''
  const mixed = clean.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3])
  const fraction = clean.match(/^(\d+)\/(\d+)$/)
  if (fraction) return Number(fraction[1]) / Number(fraction[2])
  return Number(clean) || clean
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

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b))
}

function prepMinutes(value: string) {
  return Number(value.match(/\d+/)?.[0] ?? 99)
}

function normalizeBasic(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function canSubstitute(target: string, owned: string) {
  return substitutionGroups.some((group) => {
    const normalizedGroup = group.map(normalizeIngredient)
    return normalizedGroup.includes(target) && normalizedGroup.includes(owned)
  })
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
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

function buildPartyPlan(
  menuItems: Array<PartyMenuItem & { cocktail: CatalogCocktail }>,
  inventory: string[],
  inventoryLevels: Record<string, StockStatus>,
) {
  const totals = new Map<string, PartyIngredientTotal>()
  const missing = new Set<string>()
  let totalBatchMl = 0

  for (const item of menuItems) {
    const batchPlan = buildBatchPlan(item.cocktail, item.servings, defaultDilutionPercent(item.cocktail))
    totalBatchMl += batchPlan.totalMl
    const coverage = ingredientCoverage(item.cocktail, inventory, inventoryLevels)
    coverage.missing.forEach((ingredient) => missing.add(ingredient))

    for (const ingredient of item.cocktail.ingredients) {
      const key = normalizeIngredient(ingredient.name)
      const current = totals.get(key) ?? {
        key,
        name: ingredient.name,
        totalMl: 0,
        count: 0,
        drinks: [],
        missing: false,
        lowStock: false,
      }
      const perServeMl = ingredientMl(ingredient)
      current.totalMl += perServeMl * item.servings
      current.count += typeof ingredient.amount === 'number' && perServeMl === 0 ? ingredient.amount * item.servings : 0
      if (!current.drinks.includes(item.cocktail.name)) current.drinks.push(item.cocktail.name)
      const itemCoverage = ingredientCoverage(
        { ...item.cocktail, ingredients: [ingredient] },
        inventory,
        inventoryLevels,
      )
      current.missing = current.missing || itemCoverage.missing.length > 0
      current.lowStock = current.lowStock || itemCoverage.lowStock.length > 0
      totals.set(key, current)
    }
  }

  return {
    aggregated: [...totals.values()].sort((a, b) => a.name.localeCompare(b.name)),
    labels: menuItems.map((item) => {
      const dilution = defaultDilutionPercent(item.cocktail)
      const batchPlan = buildBatchPlan(item.cocktail, item.servings, dilution)
      return {
        name: item.cocktail.name,
        text: `${item.cocktail.name} - ${item.servings} serves - ${formatBatchVolume(batchPlan.totalMl, true)} - ${Math.round(dilution * 100)}% dilution`,
        caution: batchCaution(item.cocktail),
      }
    }),
    missingIngredients: [...missing],
    timeline: buildPartyTimeline(menuItems),
    totalBatchMl,
    totalServes: menuItems.reduce((total, item) => total + item.servings, 0),
  }
}

function buildPartyTimeline(menuItems: Array<PartyMenuItem & { cocktail: CatalogCocktail }>) {
  const hasCitrus = menuItems.some((item) => /lime|lemon|juice|pineapple|grapefruit/i.test(searchableText(item.cocktail)))
  const hasBubbles = menuItems.some((item) => /soda|sparkling|champagne|prosecco|beer|tonic/i.test(searchableText(item.cocktail)))
  const hasFoam = menuItems.some((item) => hasEggTexture(item.cocktail))
  return [
    {
      time: '48h before',
      title: 'Confirm bottles and batch-safe ingredients',
      detail: 'Check spirits, liqueurs, syrups, labels, clean bottles, and freezer or fridge space.',
    },
    {
      time: '24h before',
      title: 'Shop fresh ingredients',
      detail: hasCitrus
        ? 'Buy citrus, garnish, and perishable juices. Keep citrus unjuiced until service day.'
        : 'Buy garnish and any missing modifiers. Chill shelf-stable batch bottles.',
    },
    {
      time: 'Service day',
      title: 'Batch stable components',
      detail: hasBubbles
        ? 'Batch still ingredients only. Keep carbonation separate and cold for pickup.'
        : 'Batch stable liquids, add measured water, chill, label, and taste.',
    },
    {
      time: '1h before',
      title: 'Taste and stage the station',
      detail: 'Verify dilution, sweetness, bitterness, ice, glassware, garnish, and service tools.',
    },
    {
      time: 'During service',
      title: 'Finish texture and volatile ingredients to order',
      detail: hasFoam
        ? 'Keep egg or aquafaba separate, then dry shake or foam each serve to order.'
        : 'Add bubbles, fresh garnish, and any last-minute citrus adjustments at pickup.',
    },
  ]
}

function formatPartyIngredientAmount(row: PartyIngredientTotal) {
  if (row.totalMl > 0) return formatBatchVolume(row.totalMl, true)
  if (row.count > 0) return `${Math.round(row.count)} each`
  return 'to taste'
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
