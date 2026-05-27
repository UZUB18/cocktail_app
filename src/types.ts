// ─── Shared Types for Cocktail Colleague ───

export type CatalogIngredient = {
  name: string
  amount: number | string
  unit: string
}

export type CatalogCocktail = {
  id: string
  name: string
  aliases: string[]
  family: string
  style: string
  baseSpirit: string
  ingredients: CatalogIngredient[]
  method: string
  methodSteps: string[]
  glassware: string
  ice: string
  garnish: string
  flavorProfile: Record<string, string>
  difficulty: string
  prepTime: string
  historyNotes: string
  whyItWorks: string
  commonMistakes: string[]
  homeBarNotes: string[]
  variations: string[]
  substitutions: string[]
  batchingNotes: string
  imageUrl: string
  imageCredit: string
  source: 'catalog' | 'custom'
}

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

export type StorageBackup = {
  app: 'cocktail-colleague'
  schemaVersion: number
  exportedAt: string
  state: StoredState
}

// App.tsx inline types
export type Tab = 'Recipe' | 'Why it works' | 'Common mistakes' | 'Home-bar notes' | 'Substitutions' | 'Variations' | 'Batching'

export type View = 'Home / Command' | 'Search' | 'Recipes' | 'Riffs & Variations' | 'Inventory' | 'Batch Planner' | 'Party Mode' | 'Collections' | 'Practice Lab' | 'Troubleshoot'

export type SearchSort = 'relevance' | 'makeable' | 'saved' | 'fastest'

export type MakeableFilter = 'any' | 'ready' | 'missing-1' | 'missing-2' | 'needs-shopping'

export type SearchFilters = {
  family: string
  baseSpirit: string
  difficulty: string
  glassware: string
  makeable: MakeableFilter
}

export type CustomIngredientDraft = {
  amount: string
  unit: string
  name: string
}

export type CustomDraft = {
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

export type IngredientCoverage = {
  score: number
  missing: string[]
  substitutes: string[]
  lowStock: string[]
  emptyStock: string[]
}

export type PartyIngredientTotal = {
  key: string
  name: string
  totalMl: number
  count: number
  drinks: string[]
  missing: boolean
  lowStock: boolean
}

// Data constants
export const tabs: string[] = [
  'Recipe',
  'Why it works',
  'Common mistakes',
  'Home-bar notes',
  'Substitutions',
  'Variations',
  'Batching',
]

export const fullIngredientCoverage: IngredientCoverage = {
  score: 100,
  missing: [],
  substitutes: [],
  lowStock: [],
  emptyStock: [],
}

export const fallbackPhotoCredit = 'Generated per-cocktail visual'
export const drinkColors = ['#c95f35', '#d59a31', '#b74848', '#a74367', '#7d9a43', '#d8c15a', '#b36a2d', '#6e8f7e']
export const garnishColors = ['#d9e36a', '#f2b950', '#9dcf71', '#da6d5f', '#e9dfb6', '#f07f3c']

export const troubleFixes: Record<string, string[]> = {
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

export const starterCustom: CustomDraft = {
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
}

export const defaultSearchFilters: SearchFilters = {
  family: '',
  baseSpirit: '',
  difficulty: '',
  glassware: '',
  makeable: 'any',
}

// Ingredient alias and substitution groups
export const ingredientAliasGroups = [
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

export const substitutionGroups = [
  ['white rum', 'light rum', 'silver rum'],
  ['dark rum', 'aged rum', 'blackstrap rum', 'jamaican rum'],
  ['bourbon', 'rye whiskey', 'rye', 'whiskey'],
  ['gin', 'london dry gin', 'old tom gin'],
  ['tequila', 'blanco tequila', 'reposado tequila'],
  ['mezcal', 'tequila'],
  ['campari', 'aperol', 'red bitter aperitif'],
  ['simple syrup', 'demerara syrup', 'honey syrup', 'agave syrup'],
]

export type SubstitutionDetail = {
  name: string
  abvDisplay: string
  sweetnessDelta: string
  color: string
  matchScore: number
}