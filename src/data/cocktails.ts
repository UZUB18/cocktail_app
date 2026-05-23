export type Ingredient = {
  name: string
  note: string
  amountOz: number
}

export type FlavorMeter = {
  label: string
  value: number
}

export type Cocktail = {
  name: string
  accent: string
  subtitle: string
  description: string
  baseSpirit: string
  family: string
  strength: string
  prepTime: string
  rating: number
  ratingsCount: number
  tags: string[]
  ingredients: Ingredient[]
  method: string[]
  quickStats: {
    glassware: string
    ice: string
    garnish: string
    dilution: string
  }
  flavorMeters: FlavorMeter[]
  flavorHighlights: string[]
  whyItWorks: string
  commonMistakes: string[]
  homeBarNotes: string[]
  substitutions: string[]
  variations: string[]
  batching: string
  proTips: string[]
}

export const jungleBird: Cocktail = {
  name: 'Jungle Bird',
  accent: 'Bitter Tiki Classic',
  subtitle: 'Tiki classic - complex & balanced',
  description:
    "A bold, bitter-sweet classic from the modern tiki canon. Jungle Bird balances rich rum and tropical pineapple with Campari's herbal bite and a clean snap of lime.",
  baseSpirit: 'Dark Rum',
  family: 'Tiki',
  strength: 'Strong',
  prepTime: '5 min',
  rating: 4.7,
  ratingsCount: 128,
  tags: ['Bitter', 'Tropical', 'Herbal', 'Balanced', 'Refreshing'],
  ingredients: [
    { name: 'Dark Rum', note: 'Aged or blackstrap split', amountOz: 1.5 },
    { name: 'Pineapple Juice', note: 'Fresh or high quality', amountOz: 1.5 },
    { name: 'Campari', note: 'Bitter backbone', amountOz: 0.75 },
    { name: 'Lime Juice', note: 'Fresh', amountOz: 0.5 },
    { name: 'Demerara Syrup', note: 'Rich 2:1', amountOz: 0.5 },
  ],
  method: [
    'Add rum, pineapple, Campari, lime, and demerara syrup to a shaker.',
    'Add cold hard ice and shake for 10-12 seconds until lively and well-chilled.',
    'Strain into an ice-filled double old fashioned glass or tiki mug.',
    'Garnish with pineapple leaves, lime, and a straw. Serve immediately.',
  ],
  quickStats: {
    glassware: 'Double Old Fashioned',
    ice: 'Crushed or cubed',
    garnish: 'Pineapple leaves, lime',
    dilution: '~25%',
  },
  flavorMeters: [
    { label: 'Sweet', value: 6 },
    { label: 'Sour', value: 5 },
    { label: 'Bitter', value: 7 },
    { label: 'Spirit Forward', value: 6 },
  ],
  flavorHighlights: ['Pineapple', 'Lime', 'Herbal', 'Bitter', 'Rum'],
  whyItWorks:
    'Campari cuts through pineapple and demerara so the drink lands bitter-tropical rather than syrupy. Dark rum gives bass, lime gives the edge, and pineapple contributes both foam and fruit aroma.',
  commonMistakes: [
    'Using too much blackstrap rum and letting molasses dominate.',
    'Canned dull pineapple without enough acid correction.',
    'Under-shaking; this drink needs dilution to round the bitterness.',
  ],
  homeBarNotes: [
    'Split the rum: 1 oz aged Jamaican or Barbados rum plus 0.5 oz blackstrap is usually better than all blackstrap.',
    'If pineapple is very sweet, add a barspoon of lime or reduce syrup slightly.',
    'A few drops of 20% saline sharpen pineapple and reduce Campari bluntness.',
  ],
  substitutions: [
    'Aperol makes it softer and more orange-led; reduce syrup.',
    'Gran Classico gives a rounder bitter profile than Campari.',
    'Rich simple works if demerara is missing, but the finish will be lighter.',
  ],
  variations: [
    'Bitter Mai Tai',
    'Jungle Bird Highball',
    'Mezcal Jungle Bird',
    'Overproof Jungle Bird',
    'Coffee Jungle Bird',
  ],
  batching:
    'Batch alcohol and syrup ahead. Add pineapple and lime the day of service. For 10 drinks: 450 ml dark rum, 450 ml pineapple, 225 ml Campari, 150 ml lime, 150 ml demerara, 150 ml water, 30-40 drops saline.',
  proTips: [
    'Use fresh pineapple and lime for brightness.',
    'Shake hard; this drink needs aeration and dilution.',
    'Serve very cold so Campari reads crisp, not medicinal.',
  ],
}

export const relatedCocktails = [
  { name: 'Mai Tai', family: 'Tiki', note: 'Rum, lime, orgeat, curacao' },
  { name: 'Planter’s Punch', family: 'Punch', note: 'Rum, lime, spice, dilution' },
  { name: 'Kingston Negroni', family: 'Negroni', note: 'Jamaican rum, Campari, vermouth' },
  { name: 'Painkiller', family: 'Tiki', note: 'Rum, pineapple, coconut, orange' },
]

