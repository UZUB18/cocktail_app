import { catalogCocktails, type CatalogCocktail } from './data/catalog'

export type StoredState = {
  savedIds: string[]
  collectionIds: string[]
  inventory: string[]
  shoppingList: string[]
  customCocktails: CatalogCocktail[]
  recentSearches: string[]
  notes: Record<string, string>
  selectedId: string
}

const STORAGE_KEY = 'cocktail-colleague-local-db-v1'

export const defaultState: StoredState = {
  savedIds: ['jungle-bird', 'negroni', 'mai-tai'],
  collectionIds: ['jungle-bird'],
  inventory: ['dark rum', 'campari', 'pineapple juice', 'fresh lime juice', 'demerara syrup'],
  shoppingList: ['sweet vermouth', 'blanco tequila', 'agave syrup'],
  customCocktails: [],
  recentSearches: ['bitter tiki', 'party batch', 'mezcal lime'],
  notes: {
    'jungle-bird': 'Try 1 oz Jamaican + 0.5 oz blackstrap for the party batch.',
  },
  selectedId: 'jungle-bird',
}

export function loadStoredState(): StoredState {
  if (typeof window === 'undefined') return defaultState

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<StoredState>
    return {
      ...defaultState,
      ...parsed,
      savedIds: parsed.savedIds ?? defaultState.savedIds,
      collectionIds: parsed.collectionIds ?? defaultState.collectionIds,
      inventory: parsed.inventory ?? defaultState.inventory,
      shoppingList: parsed.shoppingList ?? defaultState.shoppingList,
      customCocktails: parsed.customCocktails ?? defaultState.customCocktails,
      recentSearches: parsed.recentSearches ?? defaultState.recentSearches,
      notes: parsed.notes ?? defaultState.notes,
      selectedId: parsed.selectedId ?? defaultState.selectedId,
    }
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

