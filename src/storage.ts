import { catalogCocktails, type CatalogCocktail } from './data/catalog'

export const STORAGE_SCHEMA_VERSION = 3

export type StockStatus = 'full' | 'low' | 'empty'

export type PartyMenuItem = {
  id: string
  servings: number
}

export type PracticeFocus = 'balance' | 'dilution' | 'speed' | 'aroma' | 'garnish'
export type PracticeTechnique = 'shake' | 'stir' | 'build' | 'swizzle' | 'none'

export type PracticeLog = {
  id: string
  cocktailId: string
  cocktailName: string
  date: string
  focus: PracticeFocus
  technique: PracticeTechnique
  durationSeconds: number
  notes: string
  rating: number
}

export type StorageMeta = {
  schemaVersion: number
  lastBackupAt?: string
  lastImportAt?: string
  lastResetAt?: string
}

export type StoredState = {
  savedIds: string[]
  collectionIds: string[]
  inventory: string[]
  inventoryLevels: Record<string, StockStatus>
  shoppingList: string[]
  customCocktails: CatalogCocktail[]
  recentSearches: string[]
  notes: Record<string, string>
  partyMenu: PartyMenuItem[]
  practiceLogs: PracticeLog[]
  storageMeta: StorageMeta
  selectedId: string
}

const STORAGE_KEY = 'cocktail-colleague-local-db-v1'
const defaultInventory = ['dark rum', 'campari', 'pineapple juice', 'fresh lime juice', 'demerara syrup']

export const defaultState: StoredState = {
  savedIds: ['jungle-bird', 'negroni', 'mai-tai'],
  collectionIds: ['jungle-bird'],
  inventory: defaultInventory,
  inventoryLevels: Object.fromEntries(defaultInventory.map((item) => [item, 'full' as StockStatus])),
  shoppingList: ['sweet vermouth', 'blanco tequila', 'agave syrup'],
  customCocktails: [],
  recentSearches: ['bitter tiki', 'party batch', 'mezcal lime'],
  notes: {
    'jungle-bird': 'Try 1 oz Jamaican + 0.5 oz blackstrap for the party batch.',
  },
  partyMenu: [
    { id: 'jungle-bird', servings: 12 },
    { id: 'negroni', servings: 12 },
    { id: 'margarita', servings: 12 },
  ],
  practiceLogs: [],
  storageMeta: {
    schemaVersion: STORAGE_SCHEMA_VERSION,
  },
  selectedId: 'jungle-bird',
}

export type StorageBackup = {
  app: 'cocktail-colleague'
  schemaVersion: number
  exportedAt: string
  state: StoredState
}

export function loadStoredState(): StoredState {
  if (typeof window === 'undefined') return defaultState

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return normalizeStoredState(JSON.parse(raw) as Partial<StoredState>)
  } catch {
    return defaultState
  }
}

export function saveStoredState(state: StoredState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function resetStoredState() {
  window.localStorage.removeItem(STORAGE_KEY)
}

export function normalizeStoredState(parsed: Partial<StoredState>): StoredState {
  const inventory = cleanStringArray(parsed.inventory, defaultState.inventory)
  const stockLevels = parsed.inventoryLevels && typeof parsed.inventoryLevels === 'object' ? parsed.inventoryLevels : {}
  const rawLogs = Array.isArray(parsed.practiceLogs) ? parsed.practiceLogs : []
  const practiceLogs = rawLogs.map((log: any) => {
    if (!log || typeof log !== 'object') return null
    return {
      id: typeof log.id === 'string' ? log.id : 'practice-' + Math.random(),
      cocktailId: typeof log.cocktailId === 'string' ? log.cocktailId : '',
      cocktailName: typeof log.cocktailName === 'string' ? log.cocktailName : '',
      date: typeof log.date === 'string' ? log.date : new Date().toISOString(),
      focus: ['balance', 'dilution', 'speed', 'aroma', 'garnish'].includes(log.focus) ? log.focus : 'balance',
      technique: ['shake', 'stir', 'build', 'swizzle', 'none'].includes(log.technique) ? log.technique : 'none',
      durationSeconds: typeof log.durationSeconds === 'number' ? log.durationSeconds : 0,
      notes: typeof log.notes === 'string' ? log.notes : '',
      rating: typeof log.rating === 'number' ? Math.max(1, Math.min(5, log.rating)) : 3,
    }
  }).filter(Boolean) as PracticeLog[]

  return {
    ...defaultState,
    ...parsed,
    savedIds: cleanStringArray(parsed.savedIds, defaultState.savedIds),
    collectionIds: cleanStringArray(parsed.collectionIds, defaultState.collectionIds),
    inventory,
    inventoryLevels: inventory.reduce<Record<string, StockStatus>>((levels, item) => {
      const level = stockLevels[item]
      levels[item] = level === 'low' || level === 'empty' || level === 'full' ? level : 'full'
      return levels
    }, {}),
    shoppingList: cleanStringArray(parsed.shoppingList, defaultState.shoppingList),
    customCocktails: Array.isArray(parsed.customCocktails) ? parsed.customCocktails : defaultState.customCocktails,
    recentSearches: cleanStringArray(parsed.recentSearches, defaultState.recentSearches),
    notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : defaultState.notes,
    partyMenu: normalizePartyMenu(parsed.partyMenu),
    practiceLogs,
    storageMeta: {
      schemaVersion: STORAGE_SCHEMA_VERSION,
      lastBackupAt: parsed.storageMeta?.lastBackupAt,
      lastImportAt: parsed.storageMeta?.lastImportAt,
      lastResetAt: parsed.storageMeta?.lastResetAt,
    },
    selectedId: typeof parsed.selectedId === 'string' ? parsed.selectedId : defaultState.selectedId,
  }
}

export function createStorageBackup(state: StoredState, exportedAt = new Date().toISOString()): StorageBackup {
  return {
    app: 'cocktail-colleague',
    schemaVersion: STORAGE_SCHEMA_VERSION,
    exportedAt,
    state: normalizeStoredState(state),
  }
}

export function parseStorageBackup(raw: string): StoredState {
  const parsed = JSON.parse(raw) as Partial<StorageBackup> | Partial<StoredState>
  const candidate = 'state' in parsed ? parsed.state : parsed
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Backup does not contain a valid Cocktail Colleague state object.')
  }
  return normalizeStoredState(candidate as Partial<StoredState>)
}

export function storageSummary(state: StoredState) {
  return {
    saved: state.savedIds.length,
    collections: state.collectionIds.length,
    inventory: state.inventory.length,
    shopping: state.shoppingList.length,
    custom: state.customCocktails.length,
    notes: Object.keys(state.notes).length,
    partyDrinks: state.partyMenu.length,
    practiceLogs: state.practiceLogs.length,
  }
}

export function allCocktails(state: StoredState) {
  return [...catalogCocktails, ...state.customCocktails]
}

export function findCocktail(state: StoredState, id: string) {
  return allCocktails(state).find((cocktail) => cocktail.id === id) ?? catalogCocktails[0]
}

export function uniquePush(items: string[], item: string) {
  const clean = item.trim()
  if (!clean) return items
  if (items.some((existing) => existing.toLowerCase() === clean.toLowerCase())) return items
  return [...items, clean]
}

export function toggleItem(items: string[], item: string) {
  return items.includes(item) ? items.filter((existing) => existing !== item) : [...items, item]
}

function cleanStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback
  return value.filter((item): item is string => typeof item === 'string')
}

function normalizePartyMenu(value: unknown): PartyMenuItem[] {
  if (!Array.isArray(value)) return defaultState.partyMenu
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const candidate = item as Partial<PartyMenuItem>
      if (typeof candidate.id !== 'string') return null
      return {
        id: candidate.id,
        servings: Math.min(300, Math.max(1, Math.round(Number(candidate.servings) || 12))),
      }
    })
    .filter((item): item is PartyMenuItem => Boolean(item))
    .slice(0, 6)
}

