import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { BarChart3, BookOpen, ChevronDown, FlaskConical, Menu, Search, Sparkles, UserCircle, X } from 'lucide-react'
import './App.css'
import './print-styles.css'
import './recipe-premium.css'
import { catalogCocktails, type CatalogCocktail } from './data/catalog'
import {
  createStorageBackup,
  defaultState,
  loadStoredState,
  parseStorageBackup,
  resetStoredState,
  saveStoredState,
  toggleItem,
  uniquePush,
  STORAGE_SCHEMA_VERSION,
  type StoredState,
} from './storage'
import {
  fullIngredientCoverage,
  fallbackPhotoCredit,
  defaultSearchFilters,
  starterCustom,
  type View,
  type Tab,
  type SearchSort,
  type SearchFilters,
  type CustomDraft,
} from './types'
import {
  ingredientCoverage,
  filterCocktails,
  buildSearchOptions,
  getTabContent,
  normalizeCocktailName,
  slugify,
  parseDraftAmount,
  splitSteps,
  fallbackPhotoUrl,
  formatDateTime,
  mergeList,
} from './utils'
import { Sidebar } from './components/Sidebar'
import { RandomizerModal } from './components/RandomizerModal'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

// View imports
import HomeViewDefault from './views/HomeView'
import SearchViewDefault from './views/SearchView'
import RecipeDetailDefault from './views/RecipeDetail'
import RiffsViewDefault from './views/RiffsView'
import InventoryViewDefault from './views/InventoryView'
import BatchPlannerViewDefault from './views/BatchPlannerView'
import PartyModeViewDefault from './views/PartyModeView'
import CollectionsViewDefault from './views/CollectionsView'
import TroubleshootViewDefault from './views/TroubleshootView'
import PracticeLabViewDefault from './views/PracticeLabView'

// ─── Constants ───

const navItems: { label: View }[] = [
  { label: 'Home / Command' },
  { label: 'Search' },
  { label: 'Recipes' },
  { label: 'Riffs & Variations' },
  { label: 'Inventory' },
  { label: 'Batch Planner' },
  { label: 'Party Mode' },
  { label: 'Collections' },
  { label: 'Practice Lab' },
  { label: 'Troubleshoot' },
]

// ─── Helpers ───

function initialView(): View {
  const hash = window.location.hash.replace(/^#/, '').split('/')[0].replace(/-/g, ' ').toLowerCase()
  return navItems.find((item) => item.label.toLowerCase() === hash)?.label || 'Home / Command'
}

function initialSelectedIdFromHash(): string {
  return window.location.hash.replace(/^#/, '').split('/')[1]
}

// ─── App Component ───

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
  const [metric, setMetric] = useState(true)
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showRandomizer, setShowRandomizer] = useState(false)
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

  const missingForSelected = useMemo(
    () => (coverageById.get(selected.id) ?? fullIngredientCoverage).missing,
    [coverageById, selected.id],
  )

  const tabContent = getTabContent(selected, activeTab)

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
      ingredients: ingredients as any,
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
        schemaVersion: STORAGE_SCHEMA_VERSION,
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

  useKeyboardShortcuts({
    onNewRecipe: () => {
      setActiveView('Home / Command')
      setCustomDraft(starterCustom)
    },
    onSave: () => { if (customDraft.name.trim()) saveCustomCocktail() },
    onRandomizer: () => setShowRandomizer(true),
    onExport: () => exportBackup(),
    onInventory: () => setActiveView('Inventory'),
    onPracticeLab: () => setActiveView('Practice Lab'),
    onSearch: () => document.querySelector<HTMLInputElement>('[aria-label="Search anything"]')?.focus(),
  })

  return (
    <main className={`app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="edge-hover-zone" aria-hidden="true" />
      <Sidebar
        activeView={activeView}
        collectionCount={stored.collectionIds.length}
        savedCount={stored.savedIds.length}
        shoppingCount={stored.shoppingList.length}
        setActiveView={(view) => {
          navigate(view)
          setSidebarOpen(false)
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <section className="workspace">
        <header className="topbar">
          <button
            className="sidebar-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
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
            <button aria-label="Go to cocktail lab" onClick={() => setActiveView('Practice Lab')}>
              <FlaskConical size={17} />
              <span>Cocktail Lab</span>
            </button>
            <button aria-label="Go to collections" onClick={() => setActiveView('Collections')}>
              <BookOpen size={17} />
              <span>Collections</span>
            </button>
            <button aria-label="Go to stats" onClick={() => setActiveView('Home / Command')}>
              <BarChart3 size={17} />
              <span>Stats</span>
            </button>
            <button className="profile-action" aria-label="Open profile" onClick={() => setActiveView('Home / Command')}>
              <UserCircle size={28} />
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        {activeView === 'Home / Command' && (
          <HomeViewDefault
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
          <SearchViewDefault
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
          <RecipeDetailDefault
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
          <RiffsViewDefault
            cocktails={cocktails.filter((cocktail) => cocktail.variations.length > 0)}
            eyebrow="Riffs & Variations"
            onOpen={openCocktail}
            title="Compare families, branches, and house riff candidates"
          />
        )}

        {activeView === 'Inventory' && (
          <InventoryViewDefault
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
          <BatchPlannerViewDefault
            cocktails={cocktails}
            selected={selected}
            servings={servings}
            setServings={setServings}
            updateStored={updateStored}
          />
        )}

        {activeView === 'Party Mode' && (
          <PartyModeViewDefault
            cocktails={cocktails}
            inventory={stored.inventory}
            inventoryLevels={stored.inventoryLevels}
            onOpen={openCocktail}
            partyMenu={stored.partyMenu}
            updateStored={updateStored}
          />
        )}

        {activeView === 'Collections' && (
          <CollectionsViewDefault
            collectionCocktails={collectionCocktails}
            onOpen={openCocktail}
            savedCocktails={savedCocktails}
          />
        )}

        {activeView === 'Troubleshoot' && (
          <TroubleshootViewDefault
            cocktails={cocktails}
            notes={stored.notes}
            selected={selected}
            setTrouble={setTrouble}
            trouble={trouble}
            updateStored={updateStored}
          />
        )}

        {activeView === 'Practice Lab' && (
          <PracticeLabViewDefault
            cocktails={cocktails}
            selected={selected}
            state={stored}
            updateStored={updateStored}
          />
        )}
      </section>

      {showRandomizer && (
        <RandomizerModal
          cocktails={cocktails}
          onOpen={openCocktail}
          onClose={() => setShowRandomizer(false)}
        />
      )}
    </main>
  )
}

export default App
