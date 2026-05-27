import { catalogCocktails, type CatalogCocktail, type CatalogIngredient } from './data/catalog'
import {
  uniquePush,
  type StockStatus,
  type PartyMenuItem,
} from './storage'
import {
  defaultSearchFilters,
  fullIngredientCoverage,
  drinkColors,
  garnishColors,
  ingredientAliasGroups,
  substitutionGroups,
  type IngredientCoverage,
  type PartyIngredientTotal,
  type SearchFilters,
  type SearchSort,
  type Tab,
  type SubstitutionDetail,
} from './types'

// ─── Module-level state ───

const catalogByNormalizedName = new Map<string, CatalogCocktail>()
for (const cocktail of catalogCocktails) {
  for (const name of [cocktail.name, ...cocktail.aliases]) {
    catalogByNormalizedName.set(normalizeCocktailName(name), cocktail)
  }
}

export { catalogByNormalizedName }

function hashSeed(seed: string) {
  let hash = 0
  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }
  return hash
}

function escapeSvgText(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function svgDataUrl(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')}`
}

function fallbackPhotoUrl(seed: string) {
  const hash = hashSeed(seed)
  const drink = drinkColors[hash % drinkColors.length]
  const garnish = garnishColors[(hash >>> 4) % garnishColors.length]
  const accent = garnishColors[(hash >>> 8) % garnishColors.length]
  const glass = hash % 3
  const title = escapeSvgText(seed || 'Custom cocktail')
  const glassMarkup =
    glass === 0
      ? `<path d="M208 160h256l-86 208H294L208 160Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.55)" stroke-width="10"/><path d="M258 232h156l-46 104h-64l-46-104Z" fill="${drink}"/><path d="M330 368v88M268 456h124" stroke="rgba(255,255,255,.52)" stroke-width="12" stroke-linecap="round"/>`
      : glass === 1
        ? `<path d="M252 118h168l-22 330H274L252 118Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.55)" stroke-width="10"/><path d="M276 212h120l-14 196h-92l-14-196Z" fill="${drink}"/><path d="M282 154h108" stroke="rgba(255,255,255,.36)" stroke-width="10" stroke-linecap="round"/>`
        : `<path d="M236 224c28 84 70 126 126 126s98-42 126-126H236Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.55)" stroke-width="10"/><path d="M274 250c23 42 53 62 88 62s65-20 88-62H274Z" fill="${drink}"/><path d="M362 350v82M292 432h140" stroke="rgba(255,255,255,.52)" stroke-width="12" stroke-linecap="round"/>`
  const garnishMarkup =
    hash % 2 === 0
      ? `<circle cx="432" cy="154" r="34" fill="${garnish}" stroke="rgba(255,255,255,.55)" stroke-width="8"/><circle cx="432" cy="154" r="12" fill="rgba(8,7,6,.28)"/>`
      : `<path d="M434 116c32 20 46 46 40 78-34-4-58-22-72-54 10-14 20-22 32-24Z" fill="${garnish}" stroke="rgba(255,255,255,.45)" stroke-width="7"/><path d="M402 140c28 5 48 22 60 50" stroke="rgba(8,7,6,.25)" stroke-width="6" stroke-linecap="round"/>`

  return svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 672 504" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  <defs>
    <radialGradient id="glow" cx="38%" cy="18%" r="76%">
      <stop offset="0" stop-color="${accent}" stop-opacity=".34"/>
      <stop offset=".52" stop-color="#15100c"/>
      <stop offset="1" stop-color="#070605"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" x2="1">
      <stop offset="0" stop-color="#f0d6a4" stop-opacity=".2"/>
      <stop offset="1" stop-color="#f0d6a4" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="672" height="504" fill="url(#glow)"/>
  <path d="M0 404c120-28 215-28 330 0s220 28 342 0v100H0z" fill="#050403" opacity=".48"/>
  <circle cx="218" cy="130" r="84" fill="${accent}" opacity=".1"/>
  <circle cx="500" cy="340" r="132" fill="${drink}" opacity=".1"/>
  <path d="M116 394h438" stroke="url(#bar)" stroke-width="14" stroke-linecap="round"/>
  ${glassMarkup}
  ${garnishMarkup}
  <g opacity=".42" fill="#fff">
    <circle cx="${178 + (hash % 60)}" cy="118" r="4"/>
    <circle cx="${500 - (hash % 74)}" cy="94" r="3"/>
    <circle cx="${466 + (hash % 38)}" cy="254" r="5"/>
  </g>
</svg>`)
}

function cocktailPhoto(cocktail: Pick<CatalogCocktail, 'id' | 'name' | 'imageUrl'>) {
  const seed = cocktail.id || cocktail.name
  if (!cocktail.imageUrl || cocktail.imageUrl.startsWith('generated:')) return fallbackPhotoUrl(seed)
  return cocktail.imageUrl
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

function findSubstitutes(ingredientName: string): string[] {
  const name = ingredientName.toLowerCase()
  for (const group of substitutionGroups) {
    if (group.includes(name)) {
      return group.filter((item) => item !== name)
    }
  }
  return []
}

const substitutionMetadata: Record<string, { abvDisplay: string; sweetnessDelta: string; color: string }> = {
  'white rum': { abvDisplay: '40%', sweetnessDelta: 'Neutral', color: '#f5f0e0' },
  'light rum': { abvDisplay: '40%', sweetnessDelta: 'Neutral', color: '#f0e8d0' },
  'dark rum': { abvDisplay: '40%', sweetnessDelta: '+Sweet', color: '#c8923e' },
  'aged rum': { abvDisplay: '40%', sweetnessDelta: '+Sweet', color: '#b87d3a' },
  'blackstrap rum': { abvDisplay: '40%', sweetnessDelta: '+Sweet', color: '#4a3520' },
  'jamaican rum': { abvDisplay: '40%', sweetnessDelta: '+Funky', color: '#c8a84e' },
  'bourbon': { abvDisplay: '45%', sweetnessDelta: '+Sweet', color: '#c8923e' },
  'rye whiskey': { abvDisplay: '45%', sweetnessDelta: 'Dry', color: '#b87d3a' },
  'rye': { abvDisplay: '45%', sweetnessDelta: 'Dry', color: '#b87d3a' },
  'whiskey': { abvDisplay: '43%', sweetnessDelta: 'Neutral', color: '#c8923e' },
  'gin': { abvDisplay: '40%', sweetnessDelta: 'Dry', color: '#e8f0e8' },
  'london dry gin': { abvDisplay: '40%', sweetnessDelta: 'Dry', color: '#dce8dc' },
  'old tom gin': { abvDisplay: '40%', sweetnessDelta: '+Sweet', color: '#e0dcc8' },
  'tequila': { abvDisplay: '40%', sweetnessDelta: 'Neutral', color: '#f5e8d0' },
  'blanco tequila': { abvDisplay: '40%', sweetnessDelta: 'Neutral', color: '#f0e0c8' },
  'reposado tequila': { abvDisplay: '40%', sweetnessDelta: '+Sweet', color: '#e0c8a0' },
  'mezcal': { abvDisplay: '45%', sweetnessDelta: '+Smoky', color: '#d4c4a0' },
  'campari': { abvDisplay: '24%', sweetnessDelta: 'Bitter-sweet', color: '#e74c3c' },
  'aperol': { abvDisplay: '11%', sweetnessDelta: 'Sweet', color: '#ff6b35' },
  'red bitter aperitif': { abvDisplay: '20%', sweetnessDelta: 'Bitter', color: '#d4443a' },
  'simple syrup': { abvDisplay: '0%', sweetnessDelta: 'Sweet', color: '#f0e6d3' },
  'demerara syrup': { abvDisplay: '0%', sweetnessDelta: 'Sweet', color: '#8b6914' },
  'honey syrup': { abvDisplay: '0%', sweetnessDelta: '+Sweet', color: '#d4a830' },
  'agave syrup': { abvDisplay: '0%', sweetnessDelta: 'Sweet', color: '#c8b878' },
}

function getSubstitutionDetails(ingredientName: string): SubstitutionDetail[] {
  const name = ingredientName.toLowerCase()
  const originalMeta = substitutionMetadata[name]
  if (!originalMeta) return []

  for (const group of substitutionGroups) {
    if (group.includes(name)) {
      return group
        .filter((item) => item !== name)
        .map((sub) => {
          const meta = substitutionMetadata[sub]
          return {
            name: sub,
            abvDisplay: meta?.abvDisplay ?? '—',
            sweetnessDelta: meta?.sweetnessDelta ?? '—',
            color: meta?.color ?? '#888',
            matchScore: sub.includes(name.split(' ')[0]) ? 90 : 75,
          }
        })
    }
  }
  return []
}

function matchesAllTokens(cocktail: CatalogCocktail, tokens: string[]): boolean {
  const nameLower = cocktail.name.toLowerCase()
  const familyLower = cocktail.family.toLowerCase()
  const baseSpiritLower = cocktail.baseSpirit.toLowerCase()
  const styleLower = (cocktail.style || '').toLowerCase()
  const whyLower = (cocktail.whyItWorks || '').toLowerCase()
  const historyLower = (cocktail.historyNotes || '').toLowerCase()

  return tokens.every((token) => {
    if (nameLower.includes(token)) return true
    if (familyLower.includes(token)) return true
    if (baseSpiritLower.includes(token)) return true
    if (styleLower.includes(token)) return true
    if (whyLower.includes(token)) return true
    if (historyLower.includes(token)) return true
    if (cocktail.aliases.some((alias) => alias.toLowerCase().includes(token))) return true
    if (cocktail.ingredients.some((ing) => ing.name.toLowerCase().includes(token))) return true
    return false
  })
}

function calculateRelevanceScore(cocktail: CatalogCocktail, cleanQuery: string): number {
  if (!cleanQuery) return 0
  const tokens = cleanQuery.split(/\s+/).filter(Boolean)
  if (!tokens.length) return 0

  if (!matchesAllTokens(cocktail, tokens)) {
    return -1
  }

  let score = 0
  const nameLower = cocktail.name.toLowerCase()
  const familyLower = cocktail.family.toLowerCase()
  const baseSpiritLower = cocktail.baseSpirit.toLowerCase()
  const styleLower = (cocktail.style || '').toLowerCase()

  // 1. Exact or Substring name match
  if (nameLower === cleanQuery) {
    score += 300
  } else if (nameLower.includes(cleanQuery)) {
    score += 150
  }

  // 2. Individual token matches across fields
  let matchedTokenCount = 0
  for (const token of tokens) {
    let matchedThisToken = false

    if (nameLower.includes(token)) {
      score += 50
      matchedThisToken = true
    }
    for (const alias of cocktail.aliases) {
      if (alias.toLowerCase().includes(token)) {
        score += 40
        matchedThisToken = true
      }
    }
    if (baseSpiritLower.includes(token)) {
      score += 30
      matchedThisToken = true
    }
    if (familyLower.includes(token)) {
      score += 25
      matchedThisToken = true
    }
    if (styleLower.includes(token)) {
      score += 15
      matchedThisToken = true
    }
    for (const ing of cocktail.ingredients) {
      if (ing.name.toLowerCase().includes(token)) {
        score += 20
        matchedThisToken = true
      }
    }
    if ((cocktail.whyItWorks || '').toLowerCase().includes(token)) {
      score += 5
      matchedThisToken = true
    }

    if (matchedThisToken) {
      matchedTokenCount++
    }
  }

  score += matchedTokenCount * 10
  return score
}

function calculateRelevanceReason(cocktail: CatalogCocktail, cleanQuery: string): string | null {
  if (!cleanQuery) return null
  const clean = cleanQuery.trim().toLowerCase()
  const tokens = clean.split(/\s+/).filter(Boolean)
  if (!tokens.length) return null

  if (!matchesAllTokens(cocktail, tokens)) {
    return null
  }

  const nameLower = cocktail.name.toLowerCase()
  const familyLower = cocktail.family.toLowerCase()
  const baseSpiritLower = cocktail.baseSpirit.toLowerCase()
  const styleLower = (cocktail.style || '').toLowerCase()

  if (nameLower === clean) {
    return `Matches name: "${cocktail.name}"`
  }
  if (nameLower.includes(clean)) {
    return `Name contains: "${clean}"`
  }

  for (const alias of cocktail.aliases) {
    if (alias.toLowerCase() === clean) {
      return `Matches alias: "${alias}"`
    }
  }

  if (baseSpiritLower === clean) {
    return `Matches spirit base: "${cocktail.baseSpirit}"`
  }
  if (familyLower === clean) {
    return `Matches family: "${cocktail.family}"`
  }

  for (const ing of cocktail.ingredients) {
    if (ing.name.toLowerCase() === clean) {
      return `Matches ingredient: "${ing.name}"`
    }
  }

  for (const ing of cocktail.ingredients) {
    if (ing.name.toLowerCase().includes(clean)) {
      return `Ingredient matches: "${ing.name}"`
    }
  }

  const matches: string[] = []
  for (const token of tokens) {
    if (nameLower.includes(token)) {
      matches.push(`name ("${token}")`)
    } else if (baseSpiritLower.includes(token)) {
      matches.push(`spirit ("${cocktail.baseSpirit}")`)
    } else if (familyLower.includes(token)) {
      matches.push(`family ("${cocktail.family}")`)
    } else if (cocktail.ingredients.some((ing) => ing.name.toLowerCase().includes(token))) {
      const ingMatch = cocktail.ingredients.find((ing) => ing.name.toLowerCase().includes(token))
      matches.push(`ingredient ("${ingMatch?.name}")`)
    } else if (styleLower.includes(token)) {
      matches.push(`style ("${cocktail.style}")`)
    }
  }

  if (matches.length > 0) {
    return `Matched via ` + matches.join(' + ')
  }

  return 'Matched search terms'
}

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
    .map((cocktail) => {
      const coverage = coverageById.get(cocktail.id) ?? fullIngredientCoverage
      let relevanceScore = 0
      let isQueryMatch = true

      if (clean && clean !== 'ready now' && clean !== 'low stock') {
        relevanceScore = calculateRelevanceScore(cocktail, clean)
        if (relevanceScore === -1) {
          isQueryMatch = false
        }
      }

      return {
        cocktail,
        coverage,
        relevanceScore,
        isQueryMatch,
      }
    })
    .filter(({ cocktail, coverage, isQueryMatch }) => {
      if (!isQueryMatch) return false
      if (clean === 'ready now' && coverage.missing.length > 0) return false
      if (clean === 'low stock' && coverage.lowStock.length === 0) return false
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

  if (sort === 'relevance') {
    ranked.sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore
      }
      if (b.coverage.score !== a.coverage.score) {
        return b.coverage.score - a.coverage.score
      }
      return a.cocktail.name.localeCompare(b.cocktail.name)
    })
  } else if (sort === 'makeable') {
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

export {
  hashSeed,
  escapeSvgText,
  svgDataUrl,
  fallbackPhotoUrl,
  cocktailPhoto,
  formatIngredient,
  formatPlainIngredient,
  formatOz,
  findSubstitutes,
  matchesAllTokens,
  calculateRelevanceScore,
  calculateRelevanceReason,
  filterCocktails,
  buildSearchOptions,
  byName,
  normalizeCocktailName,
  findVariationCocktail,
  countMatches,
  searchableText,
  normalizeIngredient,
  ingredientCoverage,
  mergeList,
  slugify,
  parseDraftAmount,
  splitSteps,
  getTabContent,
  flavorMeters,
  highlightTerms,
  titleize,
  uniqueSorted,
  prepMinutes,
  normalizeBasic,
  canSubstitute,
  formatDateTime,
  estimateDilution,
  defaultDilutionPercent,
  ingredientMl,
  isEggIngredient,
  hasEggTexture,
  ingredientAbv,
  buildBatchPlan,
  formatBatchVolume,
  formatBatchRowVolume,
  buildPartyPlan,
  buildPartyTimeline,
  formatPartyIngredientAmount,
  batchShelfLife,
  batchCaution,
  estimatedPrepTime,
  getSubstitutionDetails,
}