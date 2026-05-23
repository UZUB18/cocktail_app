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

export const catalogCocktails: CatalogCocktail[] = [
  {
    "id": "daiquiri",
    "name": "Daiquiri",
    "aliases": [],
    "family": "Sour",
    "style": "shaken citrus",
    "baseSpirit": "white rum",
    "ingredients": [
      {
        "name": "white rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake hard with ice and fine strain.",
    "methodSteps": [
      "Shake hard with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lime wheel or none",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium-high",
      "texture": "crisp",
      "aroma": "lime and cane"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Cuban rum sour template and benchmark for citrus balance.",
    "whyItWorks": "Clean rum, lime, and sugar expose balance without hiding behind modifiers.",
    "commonMistakes": [
      "stale lime",
      "under-dilution",
      "too little sugar for sharp lime"
    ],
    "homeBarNotes": [
      "Adjust syrup between 0.5 and 0.75 oz depending on rum proof and lime."
    ],
    "variations": [
      "Hemingway Daiquiri",
      "Nuclear Daiquiri",
      "Ti Punch-adjacent stirred build"
    ],
    "substitutions": [
      "cachaca for grassy profile",
      "demerara syrup for richer rum"
    ],
    "batchingNotes": "Batch rum and syrup; add lime and shake to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
    "imageCredit": "TheCocktailDB photo: Daiquiri"
  },
  {
    "id": "gimlet",
    "name": "Gimlet",
    "aliases": [],
    "family": "Sour",
    "style": "shaken or stirred citrus",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain, or stir with cordial for a denser style.",
    "methodSteps": [
      "Shake with ice and fine strain, or stir with cordial for a denser style."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lime wheel or expressed lime peel",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "juniper and lime"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Naval lime cordial drink modernized with fresh lime.",
    "whyItWorks": "Gin botanicals give the simple sour aromatic complexity.",
    "commonMistakes": [
      "using flat bottled cordial without adjusting sugar",
      "over-shaking delicate gin"
    ],
    "homeBarNotes": [
      "Split lime and lime cordial for a polished house spec."
    ],
    "variations": [
      "Southside",
      "Basil Gimlet",
      "Richmond Gimlet"
    ],
    "substitutions": [
      "vodka for neutral Vodka Gimlet",
      "genever for malty depth"
    ],
    "batchingNotes": "Batch spirit and sweetener; citrus close to service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/3xgldt1513707271.jpg",
    "imageCredit": "TheCocktailDB photo: Gimlet"
  },
  {
    "id": "margarita",
    "name": "Margarita",
    "aliases": [],
    "family": "Daisy",
    "style": "shaken citrus",
    "baseSpirit": "blanco tequila",
    "ingredients": [
      {
        "name": "blanco tequila",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "agave syrup",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and strain.",
    "methodSteps": [
      "Shake with ice and strain."
    ],
    "glassware": "rocks or coupe",
    "ice": "fresh rocks or served up",
    "garnish": "lime wheel; optional half salt rim",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "bright",
      "aroma": "agave and lime oil"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Tequila daisy that became the agave sour benchmark.",
    "whyItWorks": "Orange liqueur broadens lime while agave reinforces the base.",
    "commonMistakes": [
      "full salt rim",
      "sour mix",
      "too much orange liqueur"
    ],
    "homeBarNotes": [
      "Use a half rim and taste before adding agave if the orange liqueur is sweet."
    ],
    "variations": [
      "Tommy's Margarita",
      "Mezcal Margarita",
      "Cadillac Margarita"
    ],
    "substitutions": [
      "dry curacao for warmer orange",
      "mezcal split for smoke"
    ],
    "batchingNotes": "Batch tequila, liqueur, and agave; add lime same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "imageCredit": "TheCocktailDB photo: Margarita"
  },
  {
    "id": "tommy-s-margarita",
    "name": "Tommy's Margarita",
    "aliases": [
      "Tommys Margarita"
    ],
    "family": "Sour",
    "style": "shaken agave sour",
    "baseSpirit": "blanco tequila",
    "ingredients": [
      {
        "name": "blanco tequila",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "agave syrup",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and strain over fresh ice.",
    "methodSteps": [
      "Shake with ice and strain over fresh ice."
    ],
    "glassware": "rocks",
    "ice": "rocks",
    "garnish": "lime wedge",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "clean",
      "aroma": "agave and lime"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "San Francisco modern classic from Tommy's Mexican Restaurant.",
    "whyItWorks": "Removing orange liqueur makes agave and lime more direct.",
    "commonMistakes": [
      "too much agave",
      "weak tequila",
      "insufficient dilution"
    ],
    "homeBarNotes": [
      "Excellent when the tequila is good enough to feature."
    ],
    "variations": [
      "Mezcal Tommy's",
      "spicy Tommy's",
      "pineapple Tommy's"
    ],
    "substitutions": [
      "simple syrup if agave is missing",
      "but flavor is less integrated"
    ],
    "batchingNotes": "Good for batching if lime is added same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Margarita"
  },
  {
    "id": "sidecar",
    "name": "Sidecar",
    "aliases": [],
    "family": "Daisy",
    "style": "shaken citrus",
    "baseSpirit": "cognac",
    "ingredients": [
      {
        "name": "cognac",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "orange twist; optional sugared half rim",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "bright",
      "aroma": "orange and brandy"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Early twentieth-century brandy daisy.",
    "whyItWorks": "Cognac oak and grape richness keep the lemon-orange structure from tasting thin.",
    "commonMistakes": [
      "full sugar rim",
      "cheap orange liqueur",
      "no added syrup with dry cognac"
    ],
    "homeBarNotes": [
      "Pierre Ferrand Dry Curacao makes a rounder, drier house version."
    ],
    "variations": [
      "Between the Sheets",
      "Chelsea Sidecar",
      "apple brandy Sidecar"
    ],
    "substitutions": [
      "Armagnac",
      "apple brandy",
      "aged rum"
    ],
    "batchingNotes": "Batch spirit and liqueur; add lemon at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/x72sik1606854964.jpg",
    "imageCredit": "TheCocktailDB photo: Sidecar"
  },
  {
    "id": "whiskey-sour",
    "name": "Whiskey Sour",
    "aliases": [],
    "family": "Sour",
    "style": "shaken citrus",
    "baseSpirit": "bourbon or rye",
    "ingredients": [
      {
        "name": "bourbon or rye",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "egg white",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "rocks or coupe",
    "ice": "large cube or served up",
    "garnish": "Angostura drops or lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "foamy",
      "aroma": "whiskey and bitters"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Core nineteenth-century sour family drink.",
    "whyItWorks": "Lemon lifts whiskey oak while egg white rounds the edges.",
    "commonMistakes": [
      "too little syrup",
      "weak shake",
      "warm glass"
    ],
    "homeBarNotes": [
      "Rye reads drier; bourbon may need less syrup."
    ],
    "variations": [
      "Boston Sour",
      "New York Sour",
      "Gold Rush"
    ],
    "substitutions": [
      "aquafaba for egg white",
      "honey syrup for Gold Rush direction"
    ],
    "batchingNotes": "Do not batch egg white; batch base and shake to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    "imageCredit": "TheCocktailDB photo: Whiskey Sour"
  },
  {
    "id": "pisco-sour",
    "name": "Pisco Sour",
    "aliases": [],
    "family": "Sour",
    "style": "shaken citrus",
    "baseSpirit": "pisco",
    "ingredients": [
      {
        "name": "pisco",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "egg white",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "Angostura bitters",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "silky foam",
      "aroma": "grape and spice"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Peruvian and Chilean pisco sour traditions differ; this is a practical house spec.",
    "whyItWorks": "Pisco's floral grape character sits cleanly against lime and foam.",
    "commonMistakes": [
      "too much bitters in the drink",
      "under-aerated egg white"
    ],
    "homeBarNotes": [
      "Lemon can work with aromatic pisco but lime keeps the snap."
    ],
    "variations": [
      "Maracuya Sour",
      "Mango Pisco Sour"
    ],
    "substitutions": [
      "unaged grape brandy if needed",
      "aquafaba for egg"
    ],
    "batchingNotes": "Shake texture to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg",
    "imageCredit": "TheCocktailDB photo: Pisco Sour"
  },
  {
    "id": "bee-s-knees",
    "name": "Bee's Knees",
    "aliases": [
      "Bees Knees"
    ],
    "family": "Sour",
    "style": "shaken citrus",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "honey syrup 3:1",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "honey and botanicals"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Prohibition-era gin sour.",
    "whyItWorks": "Honey adds floral body that simple syrup cannot.",
    "commonMistakes": [
      "undissolved honey",
      "too much lemon with delicate gin"
    ],
    "homeBarNotes": [
      "Lavender or chamomile honey can be excellent but can dominate."
    ],
    "variations": [
      "Gold Rush with bourbon",
      "Barr Hill-style honey gin sour"
    ],
    "substitutions": [
      "rich simple syrup plus aromatic bitters"
    ],
    "batchingNotes": "Batch gin and honey syrup; citrus near service.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Bee%27s_Knees.jpg/1280px-Bee%27s_Knees.jpg",
    "imageCredit": "Wikimedia Commons photo search: Bee's Knees.jpg"
  },
  {
    "id": "clover-club",
    "name": "Clover Club",
    "aliases": [],
    "family": "Sour",
    "style": "shaken fruit sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "raspberry syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "egg white",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "raspberries or lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "foamy",
      "aroma": "raspberry and gin"
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Pre-Prohibition Philadelphia club drink.",
    "whyItWorks": "Raspberry gives fruit and tannin while vermouth dries the finish.",
    "commonMistakes": [
      "jammy syrup",
      "skipping vermouth",
      "weak foam"
    ],
    "homeBarNotes": [
      "Fresh raspberry syrup is worth it; avoid candy-red grenadine."
    ],
    "variations": [
      "Pink Lady",
      "Clover Leaf"
    ],
    "substitutions": [
      "grenadine for a different drink",
      "aquafaba for egg"
    ],
    "batchingNotes": "Do not batch foam; syrup can be prepped ahead.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/t0aja61504348715.jpg",
    "imageCredit": "TheCocktailDB photo: Clover Club"
  },
  {
    "id": "aviation",
    "name": "Aviation",
    "aliases": [],
    "family": "Sour",
    "style": "shaken liqueur sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "maraschino liqueur",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "creme de violette",
        "amount": 0.125,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "brandied cherry or lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "cherry pit and violet"
    },
    "difficulty": "medium",
    "prepTime": "4 minutes",
    "historyNotes": "Hugo Ensslin-era gin sour revived with violet liqueur.",
    "whyItWorks": "Maraschino's nutty funk bridges gin and lemon; violet should be a trace aroma.",
    "commonMistakes": [
      "too much violette",
      "too sweet",
      "dull lemon"
    ],
    "homeBarNotes": [
      "Many versions are better nearly colorless than lavender."
    ],
    "variations": [
      "Blue Moon",
      "Attention"
    ],
    "substitutions": [
      "skip violette if poor quality",
      "use floral bitters sparingly"
    ],
    "batchingNotes": "Batch spirit and liqueurs; add lemon at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/trbplb1606855233.jpg",
    "imageCredit": "TheCocktailDB photo: Aviation"
  },
  {
    "id": "bramble",
    "name": "Bramble",
    "aliases": [],
    "family": "Fix",
    "style": "crushed-ice gin sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "creme de mure",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake gin, lemon, and syrup; strain over crushed ice; drizzle creme de mure.",
    "methodSteps": [
      "Shake gin, lemon, and syrup; strain over crushed ice; drizzle creme de mure."
    ],
    "glassware": "rocks",
    "ice": "crushed",
    "garnish": "blackberry and lemon wheel",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "icy",
      "aroma": "blackberry",
      "lemon": "",
      "gin": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Dick Bradsell modern classic.",
    "whyItWorks": "A crisp gin sour gets seasonal fruit depth and visual drama from blackberry liqueur.",
    "commonMistakes": [
      "too much creme de mure",
      "insufficient crushed ice",
      "dull lemon"
    ],
    "homeBarNotes": [
      "Homemade blackberry syrup plus a splash of cassis can work if mure is missing."
    ],
    "variations": [
      "raspberry Bramble",
      "mezcal Bramble",
      "seasonal berry fix"
    ],
    "substitutions": [
      "cassis",
      "blackberry syrup",
      "raspberry liqueur"
    ],
    "batchingNotes": "Batch gin, lemon, syrup for short service; drizzle liqueur to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/twtbh51630406392.jpg",
    "imageCredit": "TheCocktailDB photo: Bramble"
  },
  {
    "id": "last-word",
    "name": "Last Word",
    "aliases": [],
    "family": "Sour",
    "style": "equal-parts herbal sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Green Chartreuse",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "maraschino liqueur",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "brandied cherry or lime twist",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "high",
      "bitterness": "medium",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "dense",
      "aroma": "alpine herbs and lime"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Detroit Athletic Club drink revived in the modern cocktail era.",
    "whyItWorks": "Equal parts balance intense herbal, sweet, sour, and gin structure.",
    "commonMistakes": [
      "warm serve",
      "oversized pour",
      "cheap maraschino"
    ],
    "homeBarNotes": [
      "A small saline dose can sharpen the finish."
    ],
    "variations": [
      "Final Ward",
      "Paper Plane family",
      "Naked and Famous"
    ],
    "substitutions": [
      "Genepy for lighter herbal profile"
    ],
    "batchingNotes": "Batch liqueurs and gin; lime same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/91oule1513702624.jpg",
    "imageCredit": "TheCocktailDB photo: The Last Word"
  },
  {
    "id": "paper-plane",
    "name": "Paper Plane",
    "aliases": [],
    "family": "Sour",
    "style": "equal-parts bitter sour",
    "baseSpirit": "bourbon",
    "ingredients": [
      {
        "name": "bourbon",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Aperol",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Amaro Nonino",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "plush",
      "aroma": "orange and bourbon"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Sam Ross modern classic.",
    "whyItWorks": "Bitter orange and amaro sweetness turn bourbon into a bright, adult sour.",
    "commonMistakes": [
      "wrong amaro without rebalancing",
      "tired lemon"
    ],
    "homeBarNotes": [
      "If using a sweeter amaro, raise lemon or reduce Aperol slightly."
    ],
    "variations": [
      "Naked and Famous",
      "Division Bell",
      "Paper Kamikaze riffs"
    ],
    "substitutions": [
      "Cappelletti for Aperol",
      "Averna for darker but sweeter profile"
    ],
    "batchingNotes": "Batch alcohol; add lemon at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Whiskey Sour"
  },
  {
    "id": "naked-and-famous",
    "name": "Naked and Famous",
    "aliases": [],
    "family": "Sour",
    "style": "equal-parts smoky herbal sour",
    "baseSpirit": "mezcal",
    "ingredients": [
      {
        "name": "mezcal",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Aperol",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Yellow Chartreuse",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "none or lime twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "smoke",
      "citrus": "",
      "herbs": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Joaquín Simo modern classic riffing on Last Word/Paper Plane logic.",
    "whyItWorks": "Mezcal smoke, Aperol orange, and Chartreuse honey-herb notes lock into lime.",
    "commonMistakes": [
      "over-smoky mezcal",
      "too-warm serve"
    ],
    "homeBarNotes": [
      "Use a balanced mezcal, not the most aggressive bottle."
    ],
    "variations": [
      "Oaxacan Last Word",
      "Division Bell"
    ],
    "substitutions": [
      "Genepy plus honey touch for Yellow Chartreuse"
    ],
    "batchingNotes": "Batch spirits and liqueurs; lime at service.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Naked_and_Famous_cocktail.jpg",
    "imageCredit": "Wikimedia Commons exact cocktail photo: Naked and Famous cocktail.jpg"
  },
  {
    "id": "penicillin",
    "name": "Penicillin",
    "aliases": [],
    "family": "Sour",
    "style": "shaken ginger honey sour",
    "baseSpirit": "blended Scotch",
    "ingredients": [
      {
        "name": "blended Scotch",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "honey ginger syrup",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Islay Scotch float",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Shake first three ingredients with ice, strain over fresh ice, float Islay.",
    "methodSteps": [
      "Shake first three ingredients with ice, strain over fresh ice, float Islay."
    ],
    "glassware": "rocks",
    "ice": "large cube or rocks",
    "garnish": "candied ginger or lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "smoke and ginger"
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Sam Ross modern classic.",
    "whyItWorks": "Honey and ginger make Scotch read warm and medicinal without becoming heavy.",
    "commonMistakes": [
      "too much Islay",
      "weak ginger",
      "flat honey syrup"
    ],
    "homeBarNotes": [
      "Use a split base if the blended Scotch lacks character."
    ],
    "variations": [
      "mezcal Penicillin",
      "bourbon Gold Rush with ginger"
    ],
    "substitutions": [
      "peated rinse instead of float",
      "ginger liqueur plus honey syrup"
    ],
    "batchingNotes": "Batch base and syrup; lemon same day; float to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hc9b1a1521853096.jpg",
    "imageCredit": "TheCocktailDB photo: Penicillin"
  },
  {
    "id": "mojito",
    "name": "Mojito",
    "aliases": [],
    "family": "Collins",
    "style": "mint rum highball",
    "baseSpirit": "white rum",
    "ingredients": [
      {
        "name": "white rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 8,
        "unit": "leaves"
      },
      {
        "name": "soda water",
        "amount": 2,
        "unit": "oz"
      }
    ],
    "method": "Gently muddle mint with syrup and lime, add rum and ice, churn, top with soda.",
    "methodSteps": [
      "Gently muddle mint with syrup and lime, add rum and ice, churn, top with soda."
    ],
    "glassware": "Collins",
    "ice": "crushed or cubes",
    "garnish": "mint bouquet and lime wheel",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "mint and lime"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Cuban mint highball.",
    "whyItWorks": "Mint aroma and soda make a Daiquiri-length drink refreshing.",
    "commonMistakes": [
      "pulverized mint",
      "flat soda",
      "too much ice melt"
    ],
    "homeBarNotes": [
      "Mint syrup can streamline parties but fresh garnish is mandatory."
    ],
    "variations": [
      "Queen's Park Swizzle",
      "Old Cuban",
      "Mojito Criollo"
    ],
    "substitutions": [
      "cachaca for grassy profile",
      "demerara syrup for depth"
    ],
    "batchingNotes": "Batch rum, syrup, lime; add mint and soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
    "imageCredit": "TheCocktailDB photo: Mojito"
  },
  {
    "id": "tom-collins",
    "name": "Tom Collins",
    "aliases": [],
    "family": "Collins",
    "style": "gin sour highball",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 2.5,
        "unit": "oz"
      }
    ],
    "method": "Shake gin, lemon, syrup briefly; strain over ice and top with soda.",
    "methodSteps": [
      "Shake gin, lemon, syrup briefly; strain over ice and top with soda."
    ],
    "glassware": "Collins",
    "ice": "cubes or spear",
    "garnish": "lemon wheel and cherry",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "lemon and gin"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Classic gin Collins family drink.",
    "whyItWorks": "A lengthened gin sour keeps botanical freshness while lowering intensity.",
    "commonMistakes": [
      "over-shaking",
      "flat soda",
      "too much syrup"
    ],
    "homeBarNotes": [
      "Old Tom gin makes a rounder historical-feeling version."
    ],
    "variations": [
      "John Collins",
      "Vodka Collins",
      "Southside Fizz"
    ],
    "substitutions": [
      "bourbon for John Collins",
      "Old Tom gin for sweeter style"
    ],
    "batchingNotes": "Batch still components; soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/7cll921606854636.jpg",
    "imageCredit": "TheCocktailDB photo: Tom Collins"
  },
  {
    "id": "ramos-gin-fizz",
    "name": "Ramos Gin Fizz",
    "aliases": [],
    "family": "Fizz",
    "style": "cream citrus fizz",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "cream",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "egg white",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orange flower water",
        "amount": 3,
        "unit": "drops"
      },
      {
        "name": "soda water",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Dry shake thoroughly, shake with ice, strain into glass, rest, top with soda.",
    "methodSteps": [
      "Dry shake thoroughly, shake with ice, strain into glass, rest, top with soda."
    ],
    "glassware": "Collins or fizz glass",
    "ice": "none in glass",
    "garnish": "none or orange twist",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "medium-high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "creamy foam",
      "aroma": "orange blossom"
    },
    "difficulty": "hard",
    "prepTime": "8 minutes",
    "historyNotes": "New Orleans classic famous for laborious shaking.",
    "whyItWorks": "Citrus, dairy, egg, and soda create a tall perfumed foam when balanced precisely.",
    "commonMistakes": [
      "too much orange flower water",
      "weak emulsification",
      "rushing the rest"
    ],
    "homeBarNotes": [
      "Use drops, not dashes, of orange flower water."
    ],
    "variations": [
      "Silver Fizz",
      "Golden Fizz"
    ],
    "substitutions": [
      "aquafaba for egg with texture loss",
      "half-and-half for lighter cream"
    ],
    "batchingNotes": "Not a good full batch; prep measured kits only.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/967t911643844053.jpg",
    "imageCredit": "TheCocktailDB photo: Ramos Gin Fizz"
  },
  {
    "id": "french-75",
    "name": "French 75",
    "aliases": [],
    "family": "Fizz",
    "style": "sparkling gin sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "dry sparkling wine",
        "amount": 3,
        "unit": "oz"
      }
    ],
    "method": "Shake gin, lemon, and syrup; strain into flute or coupe; top with sparkling wine.",
    "methodSteps": [
      "Shake gin, lemon, and syrup; strain into flute or coupe; top with sparkling wine."
    ],
    "glassware": "flute or coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "medium-high",
      "texture": "sparkling",
      "aroma": "lemon and wine"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Early twentieth-century sparkling sour.",
    "whyItWorks": "Sparkling wine lengthens a gin sour with acid, aroma, and bubbles.",
    "commonMistakes": [
      "sweet prosecco without adjustment",
      "too much gin"
    ],
    "homeBarNotes": [
      "Cognac base is a strong alternative for richer menus."
    ],
    "variations": [
      "Cognac French 75",
      "French 95",
      "Airmail"
    ],
    "substitutions": [
      "cava or cremant for Champagne"
    ],
    "batchingNotes": "Batch still base; add sparkling wine at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hrxfbl1606773109.jpg",
    "imageCredit": "TheCocktailDB photo: French 75"
  },
  {
    "id": "paloma",
    "name": "Paloma",
    "aliases": [],
    "family": "Highball",
    "style": "grapefruit tequila highball",
    "baseSpirit": "tequila",
    "ingredients": [
      {
        "name": "blanco tequila",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "grapefruit soda",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "salt",
        "amount": 1,
        "unit": "pinch"
      }
    ],
    "method": "Build over ice and stir briefly.",
    "methodSteps": [
      "Build over ice and stir briefly."
    ],
    "glassware": "highball",
    "ice": "cubes or spear",
    "garnish": "grapefruit wedge or lime",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "medium-low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "grapefruit and agave"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Mexican tequila highball.",
    "whyItWorks": "Grapefruit bitterness and salt make tequila feel crisp and savory.",
    "commonMistakes": [
      "no salt",
      "warm soda",
      "oversweet grapefruit soda"
    ],
    "homeBarNotes": [
      "Fresh grapefruit plus soda gives more control than commercial soda."
    ],
    "variations": [
      "Mezcal Paloma",
      "Siesta",
      "Cantarito"
    ],
    "substitutions": [
      "grapefruit juice plus soda and syrup",
      "tonic for more bitterness"
    ],
    "batchingNotes": "Batch tequila/lime/salt; carbonate at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg",
    "imageCredit": "TheCocktailDB photo: Paloma"
  },
  {
    "id": "moscow-mule",
    "name": "Moscow Mule",
    "aliases": [],
    "family": "Buck",
    "style": "ginger lime highball",
    "baseSpirit": "vodka",
    "ingredients": [
      {
        "name": "vodka",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "ginger beer",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir briefly.",
    "methodSteps": [
      "Build over ice and stir briefly."
    ],
    "glassware": "copper mug or highball",
    "ice": "cubes",
    "garnish": "lime wedge and mint optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "ginger and lime"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Vodka-ginger beer marketing success that became a durable template.",
    "whyItWorks": "Vodka gives a clean platform for ginger heat and lime.",
    "commonMistakes": [
      "flat ginger beer",
      "too much lime for dry mixer"
    ],
    "homeBarNotes": [
      "The mixer determines the drink; taste it first."
    ],
    "variations": [
      "Kentucky Mule",
      "Mexican Mule",
      "Dark and Stormy"
    ],
    "substitutions": [
      "gin",
      "bourbon",
      "tequila",
      "rum"
    ],
    "batchingNotes": "Batch spirit and lime; ginger beer at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
    "imageCredit": "TheCocktailDB photo: Moscow Mule"
  },
  {
    "id": "dark-and-stormy",
    "name": "Dark and Stormy",
    "aliases": [
      "Dark n Stormy"
    ],
    "family": "Buck",
    "style": "rum ginger highball",
    "baseSpirit": "dark rum",
    "ingredients": [
      {
        "name": "dark rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "ginger beer",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Build ginger beer and lime over ice; float rum or stir gently.",
    "methodSteps": [
      "Build ginger beer and lime over ice; float rum or stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "lime wedge",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "molasses and ginger"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Bermudian rum buck.",
    "whyItWorks": "Dark rum's molasses depth gives ginger beer more bass.",
    "commonMistakes": [
      "weak rum",
      "too much lime",
      "flat mixer"
    ],
    "homeBarNotes": [
      "A Jamaican rum split makes it more expressive."
    ],
    "variations": [
      "Mule family",
      "rum buck"
    ],
    "substitutions": [
      "aged rum plus blackstrap teaspoon",
      "ginger syrup and soda"
    ],
    "batchingNotes": "Add ginger beer at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/t1tn0s1504374905.jpg",
    "imageCredit": "TheCocktailDB photo: Dark and Stormy"
  },
  {
    "id": "gin-and-tonic",
    "name": "Gin and Tonic",
    "aliases": [
      "G and T"
    ],
    "family": "Highball",
    "style": "bitter sparkling highball",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "tonic water",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Build over very cold ice and stir once or twice.",
    "methodSteps": [
      "Build over very cold ice and stir once or twice."
    ],
    "glassware": "highball or copa",
    "ice": "large cold cubes",
    "garnish": "lime, lemon, grapefruit, cucumber, or herb matched to gin",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low",
      "bitterness": "medium-high",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "quinine and botanicals"
    },
    "difficulty": "easy",
    "prepTime": "2 minutes",
    "historyNotes": "Colonial quinine highball that became the default gin long drink.",
    "whyItWorks": "Tonic's quinine bitterness, sugar, and carbonation lengthen gin while preserving botanicals.",
    "commonMistakes": [
      "warm tonic",
      "too much garnish",
      "weak ice",
      "mismatched tonic"
    ],
    "homeBarNotes": [
      "Premium tonic is not automatically better; match sweetness and quinine level to the gin."
    ],
    "variations": [
      "Spanish-style copa",
      "pink gin and tonic",
      "tonic spritz"
    ],
    "substitutions": [
      "soda plus quinine syrup",
      "bitter lemon for softer style"
    ],
    "batchingNotes": "Do not batch tonic; pre-chill gin and glassware.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/k0508k1668422436.jpg",
    "imageCredit": "TheCocktailDB photo: Gin And Tonic"
  },
  {
    "id": "whisky-highball",
    "name": "Whisky Highball",
    "aliases": [
      "Japanese Highball"
    ],
    "family": "Highball",
    "style": "spirit soda highball",
    "baseSpirit": "whisky",
    "ingredients": [
      {
        "name": "whisky",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "chilled soda water",
        "amount": 4.5,
        "unit": "oz"
      }
    ],
    "method": "Build over clear ice or spear; stir whisky with ice, add soda gently.",
    "methodSteps": [
      "Build over clear ice or spear; stir whisky with ice, add soda gently."
    ],
    "glassware": "highball",
    "ice": "spear or clear cubes",
    "garnish": "lemon twist optional",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "highly sparkling",
      "aroma": "grain",
      "oak": "",
      "mineral": ""
    },
    "difficulty": "medium",
    "prepTime": "4 minutes",
    "historyNotes": "Japanese service elevated a simple whisky soda into a precision drink.",
    "whyItWorks": "Cold temperature, strong carbonation, and controlled dilution make whisky aromatic but effortless.",
    "commonMistakes": [
      "warm glass",
      "over-stirring after soda",
      "low-carbonation water"
    ],
    "homeBarNotes": [
      "Use freezer-cold whisky if service is slow."
    ],
    "variations": [
      "Scotch and soda",
      "mizuwari",
      "apple highball"
    ],
    "substitutions": [
      "bourbon",
      "Japanese whisky",
      "blended Scotch",
      "apple brandy"
    ],
    "batchingNotes": "Not a batch drink; chill components and build fast.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Whisky_and_Coke.JPG/1280px-Whisky_and_Coke.JPG",
    "imageCredit": "Wikimedia Commons photo search: Whisky and Coke.JPG"
  },
  {
    "id": "old-fashioned",
    "name": "Old Fashioned",
    "aliases": [],
    "family": "Old Fashioned",
    "style": "stirred spirit-forward",
    "baseSpirit": "bourbon or rye",
    "ingredients": [
      {
        "name": "bourbon or rye",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "rich demerara syrup",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      },
      {
        "name": "orange bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "low-medium",
      "acidity": "none",
      "bitterness": "low-medium",
      "booziness": "high",
      "dilution": "medium-low",
      "texture": "silky",
      "aroma": "whiskey",
      "orange": "",
      "spice": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Foundational bittered sling.",
    "whyItWorks": "Small sugar and bitters additions season the spirit instead of covering it.",
    "commonMistakes": [
      "fruit salad muddle",
      "too much syrup",
      "under-dilution"
    ],
    "homeBarNotes": [
      "Match syrup to spirit; rye likes demerara, bourbon often likes less sugar."
    ],
    "variations": [
      "Rum Old Fashioned",
      "Oaxaca Old Fashioned",
      "Wisconsin Old Fashioned"
    ],
    "substitutions": [
      "maple syrup",
      "gum syrup",
      "split base"
    ],
    "batchingNotes": "Excellent freezer batch with measured water.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
    "imageCredit": "TheCocktailDB photo: Old Fashioned"
  },
  {
    "id": "sazerac",
    "name": "Sazerac",
    "aliases": [],
    "family": "Old Fashioned",
    "style": "stirred aromatic",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Peychaud's bitters",
        "amount": 3,
        "unit": "dashes"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      },
      {
        "name": "absinthe",
        "amount": "rinse",
        "unit": ""
      }
    ],
    "method": "Rinse chilled glass with absinthe; stir remaining ingredients with ice and strain.",
    "methodSteps": [
      "Rinse chilled glass with absinthe; stir remaining ingredients with ice and strain."
    ],
    "glassware": "rocks",
    "ice": "none",
    "garnish": "lemon peel expressed and usually discarded",
    "flavorProfile": {
      "sweetness": "low-medium",
      "acidity": "none",
      "bitterness": "medium",
      "booziness": "high",
      "dilution": "medium-low",
      "texture": "lean",
      "aroma": "anise and lemon oil"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "New Orleans classic.",
    "whyItWorks": "Rye spice, Peychaud's cherry-anise profile, and absinthe create a dry aromatic frame.",
    "commonMistakes": [
      "too much absinthe",
      "serving on ice by default",
      "heavy sugar"
    ],
    "homeBarNotes": [
      "Cognac split softens the drink without losing the template."
    ],
    "variations": [
      "Cognac Sazerac",
      "split-base Sazerac"
    ],
    "substitutions": [
      "pastis rinse",
      "Creole bitters"
    ],
    "batchingNotes": "Batch rye, syrup, bitters, water; rinse glass to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/vvpxwy1439907208.jpg",
    "imageCredit": "TheCocktailDB photo: Sazerac"
  },
  {
    "id": "manhattan",
    "name": "Manhattan",
    "aliases": [],
    "family": "Manhattan",
    "style": "stirred aromatic",
    "baseSpirit": "rye or bourbon",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe or Nick and Nora",
    "ice": "served up",
    "garnish": "brandied cherry",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "low-medium",
      "booziness": "high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "whiskey",
      "vermouth": "",
      "spice": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Core whiskey-vermouth classic.",
    "whyItWorks": "Vermouth adds wine, sugar, and botanicals that lengthen rye without dulling it.",
    "commonMistakes": [
      "stale vermouth",
      "under-stirring",
      "neon cherry"
    ],
    "homeBarNotes": [
      "Refrigerate vermouth and choose rye when the vermouth is rich."
    ],
    "variations": [
      "Perfect Manhattan",
      "Black Manhattan",
      "Rob Roy",
      "Brooklyn"
    ],
    "substitutions": [
      "bourbon for rounder style",
      "amaro for Black Manhattan"
    ],
    "batchingNotes": "Excellent freezer batch with water included.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg",
    "imageCredit": "TheCocktailDB photo: Manhattan"
  },
  {
    "id": "martini",
    "name": "Martini",
    "aliases": [
      "Dry Martini"
    ],
    "family": "Martini",
    "style": "stirred aromatic",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2.5,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Stir very cold with ice and strain.",
    "methodSteps": [
      "Stir very cold with ice and strain."
    ],
    "glassware": "Nick and Nora or coupe",
    "ice": "served up",
    "garnish": "lemon twist or olive",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "juniper",
      "citrus oil": "",
      "vermouth": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Evolved from wetter gin-vermouth drinks into a highly personal template.",
    "whyItWorks": "Vermouth and dilution open gin while bitters and garnish define the top note.",
    "commonMistakes": [
      "stale vermouth",
      "not cold enough",
      "treating dryness as quality"
    ],
    "homeBarNotes": [
      "Start 5:1, then tune by gin and mood."
    ],
    "variations": [
      "50/50 Martini",
      "Dirty Martini",
      "Gibson",
      "Vesper"
    ],
    "substitutions": [
      "fino sherry for dry vermouth",
      "blanc vermouth for softer style"
    ],
    "batchingNotes": "Excellent freezer batch; garnish to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg",
    "imageCredit": "TheCocktailDB photo: Martini"
  },
  {
    "id": "vesper",
    "name": "Vesper",
    "aliases": [],
    "family": "Martini",
    "style": "shaken or stirred aromatic",
    "baseSpirit": "gin and vodka",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "vodka",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Cocchi Americano",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Stir or shake very cold and strain.",
    "methodSteps": [
      "Stir or shake very cold and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "none",
      "bitterness": "medium-low",
      "booziness": "very high",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "lemon",
      "quinine": "",
      "botanicals": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Bond drink updated with Cocchi Americano as a Kina Lillet stand-in.",
    "whyItWorks": "Vodka lightens gin while quinine wine adds bitterness and citrus.",
    "commonMistakes": [
      "too large a pour",
      "using modern Lillet without bitter adjustment"
    ],
    "homeBarNotes": [
      "Smaller portions make the drink better."
    ],
    "variations": [
      "reverse Vesper",
      "all-gin Vesper"
    ],
    "substitutions": [
      "Lillet Blanc plus bitters",
      "dry vermouth plus blanc vermouth"
    ],
    "batchingNotes": "Freezer batch with water; twist fresh.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/mtdxpa1504374514.jpg",
    "imageCredit": "TheCocktailDB photo: Vesper"
  },
  {
    "id": "negroni",
    "name": "Negroni",
    "aliases": [],
    "family": "Negroni",
    "style": "stirred bitter aperitif",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Campari",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain over fresh ice or serve up.",
    "methodSteps": [
      "Stir with ice and strain over fresh ice or serve up."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "dense",
      "aroma": "orange",
      "herbs": "",
      "gin": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Italian aperitivo classic.",
    "whyItWorks": "Equal bitter, sweet, and strong components create a stable bitter-sweet triangle.",
    "commonMistakes": [
      "stale vermouth",
      "timid gin",
      "no orange oil"
    ],
    "homeBarNotes": [
      "Try 1.25 gin to 1 each Campari and vermouth for a drier house spec."
    ],
    "variations": [
      "Boulevardier",
      "Kingston Negroni",
      "White Negroni",
      "Mezcal Negroni"
    ],
    "substitutions": [
      "Gran Classico for Campari",
      "Punt e Mes for vermouth"
    ],
    "batchingNotes": "Excellent bottle or freezer batch with water if served straight from freezer.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    "imageCredit": "TheCocktailDB photo: Negroni"
  },
  {
    "id": "boulevardier",
    "name": "Boulevardier",
    "aliases": [],
    "family": "Negroni",
    "style": "stirred bitter whiskey",
    "baseSpirit": "bourbon or rye",
    "ingredients": [
      {
        "name": "bourbon or rye",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Campari",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "high",
      "dilution": "medium",
      "texture": "rich",
      "aroma": "whiskey and orange"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Whiskey Negroni branch from Harry McElhone's era.",
    "whyItWorks": "Whiskey oak and grain need a stronger base ratio than equal parts.",
    "commonMistakes": [
      "equal parts with sweet bourbon",
      "stale vermouth"
    ],
    "homeBarNotes": [
      "Rye keeps it drier; bourbon makes it round and dessert-adjacent."
    ],
    "variations": [
      "Old Pal",
      "1794",
      "Left Hand"
    ],
    "substitutions": [
      "Cynar for darker bitter",
      "rye for drier profile"
    ],
    "batchingNotes": "Excellent freezer batch.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/km84qi1513705868.jpg",
    "imageCredit": "TheCocktailDB photo: Boulevardier"
  },
  {
    "id": "americano",
    "name": "Americano",
    "aliases": [],
    "family": "Highball",
    "style": "bitter low-ABV highball",
    "baseSpirit": "none",
    "ingredients": [
      {
        "name": "Campari",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 3,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir briefly.",
    "methodSteps": [
      "Build over ice and stir briefly."
    ],
    "glassware": "highball or rocks",
    "ice": "cubes",
    "garnish": "orange slice or twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "low",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "orange and herbs"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Precursor to the Negroni.",
    "whyItWorks": "Soda stretches bitter vermouth sweetness into a refreshing aperitif.",
    "commonMistakes": [
      "flat soda",
      "stale vermouth",
      "too little ice"
    ],
    "homeBarNotes": [
      "Great default low-ABV bitter drink."
    ],
    "variations": [
      "Negroni Sbagliato",
      "Milano-Torino"
    ],
    "substitutions": [
      "Cappelletti",
      "Gran Classico",
      "Punt e Mes"
    ],
    "batchingNotes": "Batch Campari/vermouth; soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/709s6m1613655124.jpg",
    "imageCredit": "TheCocktailDB photo: Americano"
  },
  {
    "id": "vieux-carre",
    "name": "Vieux Carre",
    "aliases": [
      "Vieux Carré"
    ],
    "family": "Stirred aromatic",
    "style": "split-base Manhattan riff",
    "baseSpirit": "rye and cognac",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "cognac",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Benedictine",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Peychaud's bitters",
        "amount": 2,
        "unit": "dashes"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "medium",
      "booziness": "high",
      "dilution": "medium",
      "texture": "rich",
      "aroma": "spice",
      "herbs": "",
      "brandy": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "New Orleans hotel classic.",
    "whyItWorks": "Rye, cognac, vermouth, Benedictine, and dual bitters stack complexity without citrus.",
    "commonMistakes": [
      "too much Benedictine",
      "under-dilution",
      "weak vermouth"
    ],
    "homeBarNotes": [
      "Use assertive rye or the drink gets soft."
    ],
    "variations": [
      "De La Louisiane",
      "Saratoga"
    ],
    "substitutions": [
      "Armagnac",
      "Drambuie in smaller amount"
    ],
    "batchingNotes": "Excellent batch; include water or stir to order.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vieux_Carre_Cocktail.jpg/1280px-Vieux_Carre_Cocktail.jpg",
    "imageCredit": "Wikimedia Commons photo search: Vieux Carre Cocktail.jpg"
  },
  {
    "id": "black-manhattan",
    "name": "Black Manhattan",
    "aliases": [],
    "family": "Manhattan",
    "style": "stirred amaro whiskey",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Averna",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      },
      {
        "name": "orange bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "brandied cherry or orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "medium-high",
      "booziness": "high",
      "dilution": "medium",
      "texture": "plush",
      "aroma": "cola",
      "orange": "",
      "rye": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Modern amaro Manhattan riff.",
    "whyItWorks": "Averna replaces vermouth with darker bitter-sweet density.",
    "commonMistakes": [
      "using bourbon and making it too sweet",
      "no bitters"
    ],
    "homeBarNotes": [
      "Try a small dry vermouth split if it feels heavy."
    ],
    "variations": [
      "Cynar Manhattan",
      "Little Italy"
    ],
    "substitutions": [
      "Cynar",
      "Ramazzotti",
      "Nonino with ratio adjustment"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/05/Black_Manhattan_Cocktail.jpg",
    "imageCredit": "Wikimedia Commons exact cocktail photo: Black Manhattan Cocktail.jpg"
  },
  {
    "id": "martinez",
    "name": "Martinez",
    "aliases": [],
    "family": "Martini",
    "style": "stirred gin vermouth",
    "baseSpirit": "Old Tom gin",
    "ingredients": [
      {
        "name": "Old Tom gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "maraschino liqueur",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "none",
      "bitterness": "low-medium",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "gin",
      "cherry": "",
      "vermouth": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Important ancestor of the Martini.",
    "whyItWorks": "Sweet gin, vermouth, and maraschino create a round bridge between Manhattan and Martini.",
    "commonMistakes": [
      "London dry without sweet adjustment",
      "too much maraschino"
    ],
    "homeBarNotes": [
      "Use high-quality vermouth; it is half the drink."
    ],
    "variations": [
      "Martini evolution",
      "Turf Club"
    ],
    "substitutions": [
      "London dry plus barspoon syrup",
      "genever for malty style"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg",
    "imageCredit": "TheCocktailDB photo: Martinez 2"
  },
  {
    "id": "mai-tai",
    "name": "Mai Tai",
    "aliases": [],
    "family": "Tiki",
    "style": "shaken rum sour",
    "baseSpirit": "aged rum",
    "ingredients": [
      {
        "name": "aged Jamaican rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "aged Martinique or agricole-style rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "orange curacao",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orgeat",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Shake with crushed ice and dump into glass.",
    "methodSteps": [
      "Shake with crushed ice and dump into glass."
    ],
    "glassware": "double rocks",
    "ice": "crushed",
    "garnish": "mint bouquet and spent lime shell",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium-high",
      "dilution": "high",
      "texture": "rich and cold",
      "aroma": "mint",
      "lime": "",
      "almond": "",
      "rum funk": ""
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Trader Vic classic built to showcase rum.",
    "whyItWorks": "Orgeat and curacao support rum complexity while lime and crushed ice keep it alive.",
    "commonMistakes": [
      "pineapple/orange juice creep",
      "weak rum",
      "no mint aroma"
    ],
    "homeBarNotes": [
      "Rum blend matters more than garnish excess."
    ],
    "variations": [
      "Royal Hawaiian Mai Tai",
      "Bitter Mai Tai",
      "Agricole Mai Tai"
    ],
    "substitutions": [
      "dry curacao for orange curacao",
      "almond syrup plus orange flower water for orgeat"
    ],
    "batchingNotes": "Batch rums, curacao, orgeat, syrup; add lime and shake/dump to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg",
    "imageCredit": "TheCocktailDB photo: Mai Tai"
  },
  {
    "id": "jungle-bird",
    "name": "Jungle Bird",
    "aliases": [],
    "family": "Tiki",
    "style": "shaken bitter tropical",
    "baseSpirit": "dark rum",
    "ingredients": [
      {
        "name": "blackstrap or dark rum",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Campari",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "pineapple juice",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "demerara syrup",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and strain over fresh ice.",
    "methodSteps": [
      "Shake with ice and strain over fresh ice."
    ],
    "glassware": "rocks or tiki mug",
    "ice": "crushed or cubes",
    "garnish": "pineapple leaves and lime",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "medium-high",
      "bitterness": "high",
      "booziness": "medium",
      "dilution": "medium-high",
      "texture": "foamy",
      "aroma": "pineapple",
      "molasses": "",
      "bitter orange": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Kuala Lumpur hotel drink revived as a modern tiki staple.",
    "whyItWorks": "Campari cuts pineapple and dark rum sweetness with adult bitterness.",
    "commonMistakes": [
      "too much blackstrap",
      "canned dull pineapple",
      "insufficient lime"
    ],
    "homeBarNotes": [
      "Split blackstrap with aged Jamaican rum for better depth."
    ],
    "variations": [
      "Bitter Mai Tai",
      "Jungle Bird highball"
    ],
    "substitutions": [
      "Aperol for softer version",
      "Gran Classico for rounder bitter"
    ],
    "batchingNotes": "Batch alcohol and syrup; pineapple/lime same day.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Jungle_bird_cocktail.jpg/1280px-Jungle_bird_cocktail.jpg",
    "imageCredit": "Wikimedia Commons exact cocktail photo: Jungle bird cocktail.jpg"
  },
  {
    "id": "zombie",
    "name": "Zombie",
    "aliases": [],
    "family": "Tiki",
    "style": "overproof rum punch",
    "baseSpirit": "rum blend",
    "ingredients": [
      {
        "name": "Jamaican rum",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Puerto Rican or column still rum",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "overproof Demerara rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "grapefruit juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "cinnamon syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "falernum",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "grenadine",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "absinthe",
        "amount": 6,
        "unit": "drops"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Flash blend with crushed ice and pour unstrained.",
    "methodSteps": [
      "Flash blend with crushed ice and pour unstrained."
    ],
    "glassware": "chimney or tiki mug",
    "ice": "crushed",
    "garnish": "mint and tropical garnish",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium",
      "booziness": "very high",
      "dilution": "high",
      "texture": "icy",
      "aroma": "spice",
      "anise": "",
      "rum": ""
    },
    "difficulty": "hard",
    "prepTime": "8 minutes",
    "historyNotes": "Don the Beachcomber high-proof tiki landmark.",
    "whyItWorks": "Multiple rums, spice, citrus, absinthe, and bitters create depth while crushed ice manages proof.",
    "commonMistakes": [
      "ignoring proof",
      "oversweetening",
      "skipping absinthe/bitters"
    ],
    "homeBarNotes": [
      "Serve smaller than expected; it is not a casual highball."
    ],
    "variations": [
      "Jet Pilot",
      "Test Pilot",
      "1934 Zombie riffs"
    ],
    "substitutions": [
      "Don's Mix for grapefruit+cinnamon",
      "rum blend adjusted to inventory"
    ],
    "batchingNotes": "Batch non-citrus components; citrus and flash blend at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg",
    "imageCredit": "TheCocktailDB photo: Zombie"
  },
  {
    "id": "navy-grog",
    "name": "Navy Grog",
    "aliases": [],
    "family": "Tiki",
    "style": "rum grapefruit honey sour",
    "baseSpirit": "rum blend",
    "ingredients": [
      {
        "name": "white rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "dark Jamaican rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Demerara rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "grapefruit juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "honey syrup",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake with crushed ice and pour unstrained; top with soda if desired.",
    "methodSteps": [
      "Shake with crushed ice and pour unstrained; top with soda if desired."
    ],
    "glassware": "double rocks",
    "ice": "crushed",
    "garnish": "mint and lime",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium-low",
      "booziness": "high",
      "dilution": "high",
      "texture": "cold and textured",
      "aroma": "honey",
      "grapefruit": "",
      "rum": ""
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Trader Vic and Don the Beachcomber versions differ; this is a practical hybrid.",
    "whyItWorks": "Grapefruit bitterness and honey tie a three-rum blend together.",
    "commonMistakes": [
      "flat grapefruit",
      "no dilution",
      "weak rum blend"
    ],
    "homeBarNotes": [
      "A cone is fun but not necessary; crushed ice matters."
    ],
    "variations": [
      "Ancient Mariner",
      "Grog"
    ],
    "substitutions": [
      "two-rum blend",
      "maple-honey syrup"
    ],
    "batchingNotes": "Batch rums and honey; juices same day.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Navy_Grog.jpg/1280px-Navy_Grog.jpg",
    "imageCredit": "Wikimedia Commons exact cocktail photo: Navy Grog.jpg"
  },
  {
    "id": "saturn",
    "name": "Saturn",
    "aliases": [],
    "family": "Tiki",
    "style": "gin tiki sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "passion fruit syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orgeat",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "falernum",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Shake with crushed ice and dump or blend briefly.",
    "methodSteps": [
      "Shake with crushed ice and dump or blend briefly."
    ],
    "glassware": "rocks or tiki mug",
    "ice": "crushed",
    "garnish": "lemon wheel and cherry",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "tropical and bright",
      "aroma": "passion fruit",
      "almond": "",
      "spice": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "J. Popo Galsini gin tiki competition drink.",
    "whyItWorks": "Gin botanicals thread through passion fruit, almond, and falernum spice.",
    "commonMistakes": [
      "too much orgeat",
      "dull passion fruit syrup"
    ],
    "homeBarNotes": [
      "A great tiki choice for rum-fatigued guests."
    ],
    "variations": [
      "rum Saturn",
      "frozen Saturn"
    ],
    "substitutions": [
      "lime for lemon with extra syrup",
      "genepy accent"
    ],
    "batchingNotes": "Batch non-citrus; citrus same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Zombie"
  },
  {
    "id": "painkiller",
    "name": "Painkiller",
    "aliases": [],
    "family": "Tiki",
    "style": "creamy tropical highball",
    "baseSpirit": "aged rum",
    "ingredients": [
      {
        "name": "aged rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "pineapple juice",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "orange juice",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "cream of coconut",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Shake or flash blend with crushed ice and pour.",
    "methodSteps": [
      "Shake or flash blend with crushed ice and pour."
    ],
    "glassware": "tiki mug or Collins",
    "ice": "crushed",
    "garnish": "grated nutmeg and pineapple",
    "flavorProfile": {
      "sweetness": "high",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "creamy",
      "aroma": "nutmeg",
      "coconut": "",
      "pineapple": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "British Virgin Islands tropical drink.",
    "whyItWorks": "Coconut fat and pineapple acidity make a lush but refreshing build when cold enough.",
    "commonMistakes": [
      "coconut milk instead of cream of coconut",
      "no nutmeg",
      "under-chilling"
    ],
    "homeBarNotes": [
      "Salt and overproof rum can keep it from becoming candy."
    ],
    "variations": [
      "Pina Colada branch",
      "Missionary's Downfall contrast"
    ],
    "substitutions": [
      "coconut cream plus sugar",
      "rum blend"
    ],
    "batchingNotes": "Batch and chill; shake/flash blend with ice at service.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Pussers_Rum_Painkiller.JPG/1280px-Pussers_Rum_Painkiller.JPG",
    "imageCredit": "Wikimedia Commons exact cocktail photo: Pussers Rum Painkiller.JPG"
  },
  {
    "id": "planter-s-punch",
    "name": "Planter's Punch",
    "aliases": [
      "Planters Punch"
    ],
    "family": "Punch",
    "style": "rum punch",
    "baseSpirit": "dark rum",
    "ingredients": [
      {
        "name": "dark Jamaican rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "demerara syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "allspice dram",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      },
      {
        "name": "soda water",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Shake briefly with crushed ice and dump; top with soda if using.",
    "methodSteps": [
      "Shake briefly with crushed ice and dump; top with soda if using."
    ],
    "glassware": "Collins or tiki mug",
    "ice": "crushed",
    "garnish": "mint and nutmeg",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low-medium",
      "booziness": "medium-high",
      "dilution": "high",
      "texture": "cold and spicy",
      "aroma": "rum",
      "mint": "",
      "spice": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Old rum punch family summarized as sour, sweet, strong, weak.",
    "whyItWorks": "Lime, sugar, spice, and dilution frame characterful rum.",
    "commonMistakes": [
      "using bland rum",
      "fruit juice clutter",
      "too much allspice"
    ],
    "homeBarNotes": [
      "Keep it rum-led."
    ],
    "variations": [
      "Jasper's Rum Punch",
      "Queen's Park Swizzle"
    ],
    "substitutions": [
      "falernum for allspice dram with lime adjustment"
    ],
    "batchingNotes": "Excellent punch template; add soda and ice at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/urpyqs1439907531.jpg",
    "imageCredit": "TheCocktailDB photo: Mississippi Planters Punch"
  },
  {
    "id": "singapore-sling",
    "name": "Singapore Sling",
    "aliases": [],
    "family": "Sling",
    "style": "long tropical gin sling",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Cherry Heering",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "Benedictine",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "pineapple juice",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "grenadine",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      },
      {
        "name": "soda water",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Shake everything except soda, strain over ice, top with soda.",
    "methodSteps": [
      "Shake everything except soda, strain over ice, top with soda."
    ],
    "glassware": "Collins",
    "ice": "cubes",
    "garnish": "pineapple and cherry",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "medium-high",
      "bitterness": "low-medium",
      "booziness": "medium",
      "dilution": "high",
      "texture": "foamy and sparkling",
      "aroma": "pineapple",
      "cherry": "",
      "herbs": ""
    },
    "difficulty": "hard",
    "prepTime": "7 minutes",
    "historyNotes": "Raffles-associated sling with many historical variants.",
    "whyItWorks": "Gin botanicals, cherry, herbal liqueur, and pineapple make an ornate but coherent long drink.",
    "commonMistakes": [
      "grenadine overload",
      "flat soda",
      "no bitters"
    ],
    "homeBarNotes": [
      "Keep the liqueurs restrained."
    ],
    "variations": [
      "Straits Sling",
      "simplified gin sling"
    ],
    "substitutions": [
      "maraschino plus cherry syrup for Cherry Heering imperfectly"
    ],
    "batchingNotes": "Batch liqueurs/base; juice and soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/7dozeg1582578095.jpg",
    "imageCredit": "TheCocktailDB photo: Singapore Sling"
  },
  {
    "id": "mint-julep",
    "name": "Mint Julep",
    "aliases": [],
    "family": "Julep",
    "style": "crushed-ice whiskey",
    "baseSpirit": "bourbon",
    "ingredients": [
      {
        "name": "bourbon",
        "amount": 2.5,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 8,
        "unit": "leaves"
      }
    ],
    "method": "Gently muddle mint with syrup, add bourbon and crushed ice, churn until frosty.",
    "methodSteps": [
      "Gently muddle mint with syrup, add bourbon and crushed ice, churn until frosty."
    ],
    "glassware": "julep cup or rocks",
    "ice": "crushed",
    "garnish": "large mint bouquet",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "high",
      "texture": "icy",
      "aroma": "mint and bourbon"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Southern American julep classic.",
    "whyItWorks": "Sugar, mint aroma, and heavy dilution make strong bourbon refreshing.",
    "commonMistakes": [
      "shredded mint",
      "not enough crushed ice",
      "too little dilution"
    ],
    "homeBarNotes": [
      "The garnish is not optional; it is half the drink."
    ],
    "variations": [
      "Brandy Julep",
      "Rum Julep",
      "Whiskey Smash"
    ],
    "substitutions": [
      "cognac",
      "aged rum",
      "peach syrup accent"
    ],
    "batchingNotes": "Not ideal; pre-batch bourbon/syrup and build with mint to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/squyyq1439907312.jpg",
    "imageCredit": "TheCocktailDB photo: Mint Julep"
  },
  {
    "id": "whiskey-smash",
    "name": "Whiskey Smash",
    "aliases": [],
    "family": "Smash",
    "style": "shaken herb citrus",
    "baseSpirit": "bourbon",
    "ingredients": [
      {
        "name": "bourbon",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "lemon wedges",
        "amount": 3,
        "unit": "wedges"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 8,
        "unit": "leaves"
      }
    ],
    "method": "Gently muddle lemon and mint with syrup, shake with ice, strain over crushed ice.",
    "methodSteps": [
      "Gently muddle lemon and mint with syrup, shake with ice, strain over crushed ice."
    ],
    "glassware": "rocks",
    "ice": "crushed",
    "garnish": "mint bouquet",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "bright and icy",
      "aroma": "mint",
      "lemon": "",
      "whiskey": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Seasonal sour/julep-adjacent family.",
    "whyItWorks": "Mint and whole lemon oils make bourbon feel lighter.",
    "commonMistakes": [
      "over-muddled mint",
      "too much pith bitterness"
    ],
    "homeBarNotes": [
      "Works well with seasonal fruit in small amounts."
    ],
    "variations": [
      "Gin Basil Smash",
      "Brandy Smash"
    ],
    "substitutions": [
      "rye",
      "peach",
      "blackberry",
      "basil"
    ],
    "batchingNotes": "Prep syrup/base; muddle fresh.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Margarita"
  },
  {
    "id": "sherry-cobbler",
    "name": "Sherry Cobbler",
    "aliases": [],
    "family": "Cobbler",
    "style": "low-ABV crushed-ice",
    "baseSpirit": "sherry",
    "ingredients": [
      {
        "name": "amontillado or oloroso sherry",
        "amount": 3,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orange wheel",
        "amount": 2,
        "unit": "wheels"
      },
      {
        "name": "seasonal berries",
        "amount": 3,
        "unit": "pieces"
      }
    ],
    "method": "Shake or roll with ice, pour over crushed ice, garnish generously.",
    "methodSteps": [
      "Shake or roll with ice, pour over crushed ice, garnish generously."
    ],
    "glassware": "wine glass or cobbler glass",
    "ice": "crushed",
    "garnish": "orange, berries, mint",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "high",
      "texture": "cold and fruity",
      "aroma": "sherry",
      "orange": "",
      "mint": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Nineteenth-century low-proof showpiece.",
    "whyItWorks": "Nutty sherry, sugar, fruit, and crushed ice create depth without high proof.",
    "commonMistakes": [
      "bad fruit",
      "warm sherry",
      "too much syrup"
    ],
    "homeBarNotes": [
      "Dry sherry plus a little PX can add control."
    ],
    "variations": [
      "Port Cobbler",
      "Champagne Cobbler"
    ],
    "substitutions": [
      "vermouth",
      "port",
      "madeira"
    ],
    "batchingNotes": "Build to order; fruit can be prepped.",
    "source": "catalog",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Sherry_cobbler.jpg/1280px-Sherry_cobbler.jpg",
    "imageCredit": "Wikimedia Commons exact cocktail photo: Sherry cobbler.jpg"
  },
  {
    "id": "bamboo",
    "name": "Bamboo",
    "aliases": [],
    "family": "Low-ABV",
    "style": "stirred sherry vermouth",
    "baseSpirit": "sherry",
    "ingredients": [
      {
        "name": "fino or amontillado sherry",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 2,
        "unit": "dashes"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "Nick and Nora",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "low",
      "bitterness": "medium-low",
      "booziness": "low",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "sherry",
      "citrus oil": "",
      "herbs": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Late nineteenth-century sherry-vermouth aperitif.",
    "whyItWorks": "Fortified wine complexity gives Martini-like structure at low proof.",
    "commonMistakes": [
      "stale vermouth/sherry",
      "too warm",
      "too much bitters"
    ],
    "homeBarNotes": [
      "A tiny saline dose is excellent."
    ],
    "variations": [
      "Adonis",
      "Bamboo highball",
      "Coronation"
    ],
    "substitutions": [
      "manzanilla for fino",
      "blanc vermouth for softer build"
    ],
    "batchingNotes": "Freezer or fridge batch friendly; oxidized components limit storage.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Negroni"
  },
  {
    "id": "adonis",
    "name": "Adonis",
    "aliases": [],
    "family": "Low-ABV",
    "style": "stirred sherry vermouth",
    "baseSpirit": "sherry",
    "ingredients": [
      {
        "name": "fino or oloroso sherry",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low",
      "bitterness": "medium-low",
      "booziness": "low",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "orange",
      "nuts": "",
      "herbs": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Broadway-era sherry aperitif.",
    "whyItWorks": "Sweet vermouth and sherry make a low-proof Manhattan silhouette.",
    "commonMistakes": [
      "too sweet vermouth",
      "stale bottles"
    ],
    "homeBarNotes": [
      "Use amontillado if you want more spine."
    ],
    "variations": [
      "Bamboo",
      "Queen's Park Hotel Super Cocktail"
    ],
    "substitutions": [
      "Punt e Mes for bitter version"
    ],
    "batchingNotes": "Fridge batch in small quantities.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/xrvruq1472812030.jpg",
    "imageCredit": "TheCocktailDB photo: Adonis Cocktail"
  },
  {
    "id": "aperol-spritz",
    "name": "Aperol Spritz",
    "aliases": [],
    "family": "Spritz",
    "style": "sparkling aperitif",
    "baseSpirit": "Aperol",
    "ingredients": [
      {
        "name": "prosecco",
        "amount": 3,
        "unit": "oz"
      },
      {
        "name": "Aperol",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "wine glass",
    "ice": "cubes",
    "garnish": "orange slice",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "medium",
      "bitterness": "medium",
      "booziness": "low",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "orange and rhubarb"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Venetian spritz branch popularized globally.",
    "whyItWorks": "Bitter orange aperitif, wine acid, and soda create easy low-proof refreshment.",
    "commonMistakes": [
      "too much Aperol",
      "warm prosecco",
      "not enough ice"
    ],
    "homeBarNotes": [
      "Drier sparkling wine makes a better drink."
    ],
    "variations": [
      "Campari Spritz",
      "Hugo Spritz",
      "Sbagliato"
    ],
    "substitutions": [
      "Cappelletti",
      "Select",
      "Campari"
    ],
    "batchingNotes": "Do not batch bubbles; pre-chill all components.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
    "imageCredit": "TheCocktailDB photo: Aperol Spritz"
  },
  {
    "id": "hugo-spritz",
    "name": "Hugo Spritz",
    "aliases": [],
    "family": "Spritz",
    "style": "floral sparkling aperitif",
    "baseSpirit": "elderflower liqueur",
    "ingredients": [
      {
        "name": "elderflower liqueur",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "prosecco",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 6,
        "unit": "leaves"
      }
    ],
    "method": "Build over ice, clap mint, stir gently.",
    "methodSteps": [
      "Build over ice, clap mint, stir gently."
    ],
    "glassware": "wine glass",
    "ice": "cubes",
    "garnish": "mint and lime wheel",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "elderflower and mint"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Alpine spritz modern classic.",
    "whyItWorks": "Elderflower perfume stays refreshing when lengthened with dry bubbles and mint.",
    "commonMistakes": [
      "too much elderflower",
      "bruised mint",
      "sweet prosecco"
    ],
    "homeBarNotes": [
      "Add lime only if the wine is soft."
    ],
    "variations": [
      "St-Germain spritz",
      "cucumber Hugo"
    ],
    "substitutions": [
      "elderflower syrup for lower-proof version"
    ],
    "batchingNotes": "Build to order; chill everything.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Aperol Spritz"
  },
  {
    "id": "garibaldi",
    "name": "Garibaldi",
    "aliases": [],
    "family": "Low-ABV",
    "style": "bitter orange highball",
    "baseSpirit": "Campari",
    "ingredients": [
      {
        "name": "Campari",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "fresh orange juice",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Build over ice with fluffy aerated orange juice and stir lightly.",
    "methodSteps": [
      "Build over ice with fluffy aerated orange juice and stir lightly."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "orange wedge",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "high",
      "booziness": "low",
      "dilution": "medium-high",
      "texture": "fluffy",
      "aroma": "orange peel and bitter herbs"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Italian two-ingredient aperitivo highball.",
    "whyItWorks": "Fresh orange sweetness and foam soften Campari while preserving bitter snap.",
    "commonMistakes": [
      "carton juice",
      "no aeration",
      "warm glass"
    ],
    "homeBarNotes": [
      "Use a handheld frother or blender to fluff the juice."
    ],
    "variations": [
      "Cappelletti Garibaldi",
      "grapefruit Garibaldi"
    ],
    "substitutions": [
      "blood orange",
      "tangerine",
      "nonalcoholic bitter aperitif"
    ],
    "batchingNotes": "Juice can be prepped shortly before service; build to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/ne7re71604179012.jpg",
    "imageCredit": "TheCocktailDB photo: Autumn Garibaldi"
  },
  {
    "id": "hot-toddy",
    "name": "Hot Toddy",
    "aliases": [],
    "family": "Toddy",
    "style": "hot spirit drink",
    "baseSpirit": "whiskey or brandy",
    "ingredients": [
      {
        "name": "whiskey or brandy",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "honey syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "hot water",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "lemon juice",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Warm glass, add honey and hot water, then spirit and lemon.",
    "methodSteps": [
      "Warm glass, add honey and hot water, then spirit and lemon."
    ],
    "glassware": "mug",
    "ice": "none",
    "garnish": "lemon wheel with cloves or grated nutmeg",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low-medium",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "warm",
      "aroma": "honey",
      "lemon": "",
      "spice": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Old hot sling/toddy family.",
    "whyItWorks": "Heat, sugar, dilution, and spice soften strong spirits.",
    "commonMistakes": [
      "boiling the spirit",
      "too much lemon",
      "bland garnish"
    ],
    "homeBarNotes": [
      "Add bitters or tea for structure."
    ],
    "variations": [
      "Hot buttered rum",
      "apple brandy toddy"
    ],
    "substitutions": [
      "rum",
      "cognac",
      "apple brandy",
      "tea for water"
    ],
    "batchingNotes": "Batch sweet/spice/weak component; add spirit per mug.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/ggx0lv1613942306.jpg",
    "imageCredit": "TheCocktailDB photo: Hot Toddy"
  },
  {
    "id": "flip",
    "name": "Flip",
    "aliases": [
      "Brandy Flip"
    ],
    "family": "Flip",
    "style": "whole-egg rich drink",
    "baseSpirit": "brandy",
    "ingredients": [
      {
        "name": "brandy",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "whole egg",
        "amount": 1,
        "unit": "egg"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "grated nutmeg",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "custardy",
      "aroma": "nutmeg and brandy"
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Historic category of egg drinks.",
    "whyItWorks": "Whole egg turns spirit, sugar, and spice into a rich but still drinkable dessert cocktail.",
    "commonMistakes": [
      "weak shake",
      "no nutmeg",
      "oversized pour"
    ],
    "homeBarNotes": [
      "Madeira, port, rum, and whiskey all work."
    ],
    "variations": [
      "Port Flip",
      "Rum Flip",
      "Eggnog"
    ],
    "substitutions": [
      "maple syrup",
      "oloroso sherry split"
    ],
    "batchingNotes": "Not recommended with raw egg; batch spirit/syrup only.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/6ty09d1504366461.jpg",
    "imageCredit": "TheCocktailDB photo: Brandy Flip"
  },
  {
    "id": "fish-house-punch",
    "name": "Fish House Punch",
    "aliases": [],
    "family": "Punch",
    "style": "brandy rum peach punch",
    "baseSpirit": "cognac and rum",
    "ingredients": [
      {
        "name": "cognac",
        "amount": 12,
        "unit": "oz"
      },
      {
        "name": "dark rum",
        "amount": 6,
        "unit": "oz"
      },
      {
        "name": "peach brandy",
        "amount": 6,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 6,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "cold water",
        "amount": 24,
        "unit": "oz"
      }
    ],
    "method": "Combine chilled ingredients in punch bowl with large ice block.",
    "methodSteps": [
      "Combine chilled ingredients in punch bowl with large ice block."
    ],
    "glassware": "punch cups",
    "ice": "large block",
    "garnish": "lemon wheels and grated nutmeg",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium-high",
      "dilution": "high",
      "texture": "integrated",
      "aroma": "peach",
      "lemon": "",
      "brandy": ""
    },
    "difficulty": "medium",
    "prepTime": "20 minutes",
    "historyNotes": "Philadelphia punch tradition.",
    "whyItWorks": "Brandy, rum, peach, lemon, sugar, and water integrate into a potent but smooth communal drink.",
    "commonMistakes": [
      "too little dilution",
      "poor peach liqueur",
      "small wet ice"
    ],
    "homeBarNotes": [
      "Taste after chilling; punch changes as ice block opens it."
    ],
    "variations": [
      "regent's punch",
      "brandy punch"
    ],
    "substitutions": [
      "peach liqueur in smaller amount",
      "black tea for part of water"
    ],
    "batchingNotes": "Designed for batching; chill before service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Pina Colada"
  },
  {
    "id": "milk-punch",
    "name": "Milk Punch",
    "aliases": [
      "Clarified Milk Punch"
    ],
    "family": "Punch",
    "style": "clarified punch",
    "baseSpirit": "flexible",
    "ingredients": [
      {
        "name": "spirit blend",
        "amount": 12,
        "unit": "oz"
      },
      {
        "name": "citrus juice",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "syrup or oleo",
        "amount": 6,
        "unit": "oz"
      },
      {
        "name": "tea or juice",
        "amount": 12,
        "unit": "oz"
      },
      {
        "name": "whole milk",
        "amount": 8,
        "unit": "oz"
      }
    ],
    "method": "Add punch to warm milk, curdle, rest, filter until clear.",
    "methodSteps": [
      "Add punch to warm milk, curdle, rest, filter until clear."
    ],
    "glassware": "rocks or punch cup",
    "ice": "large cube or chilled",
    "garnish": "citrus twist or none",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "variable",
      "booziness": "medium",
      "dilution": "medium-high",
      "texture": "silky",
      "aroma": "rounded citrus and spice"
    },
    "difficulty": "hard",
    "prepTime": "1 day",
    "historyNotes": "Historic preservation technique for punches.",
    "whyItWorks": "Milk clarification removes harshness and adds silky texture while preserving acid balance.",
    "commonMistakes": [
      "wrong order of mixing",
      "impatient filtration",
      "under-acidulated punch"
    ],
    "homeBarNotes": [
      "Make small tests before committing expensive spirits."
    ],
    "variations": [
      "rum milk punch",
      "brandy milk punch",
      "tea milk punch"
    ],
    "substitutions": [
      "plant milks are unreliable; test first"
    ],
    "batchingNotes": "Purpose-built batch format; stable when refrigerated.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/w64lqm1504888810.jpg",
    "imageCredit": "TheCocktailDB photo: Rum Milk Punch"
  },
  {
    "id": "na-ginger-citrus-highball",
    "name": "NA Ginger Citrus Highball",
    "aliases": [
      "Zero-proof ginger citrus highball"
    ],
    "family": "Non-alcoholic",
    "style": "spicy sparkling highball",
    "baseSpirit": "none",
    "ingredients": [
      {
        "name": "ginger syrup",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "strong black tea",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "saline",
        "amount": 3,
        "unit": "drops"
      }
    ],
    "method": "Build over ice and stir briefly.",
    "methodSteps": [
      "Build over ice and stir briefly."
    ],
    "glassware": "highball",
    "ice": "cubes or spear",
    "garnish": "lime wheel and candied ginger",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low-medium",
      "booziness": "none",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "ginger",
      "lime": "",
      "tea": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Zero-proof buck-style template.",
    "whyItWorks": "Ginger heat and tea tannin replace some of the structure usually provided by alcohol.",
    "commonMistakes": [
      "too sweet ginger syrup",
      "weak tea",
      "flat soda"
    ],
    "homeBarNotes": [
      "Add a dash of Angostura if trace alcohol is acceptable."
    ],
    "variations": [
      "hibiscus ginger highball",
      "NA mule"
    ],
    "substitutions": [
      "ginger beer with reduced syrup",
      "verjus for lime split"
    ],
    "batchingNotes": "Batch syrup, lime, tea, saline; soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hrxfbl1606773109.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: French 75"
  },
  {
    "id": "na-nogroni",
    "name": "NA Nogroni",
    "aliases": [
      "Zero-proof Negroni"
    ],
    "family": "Non-alcoholic",
    "style": "bitter aperitif",
    "baseSpirit": "none",
    "ingredients": [
      {
        "name": "nonalcoholic bitter aperitif",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "strong red verjus or bitter orange tea",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "nonalcoholic gin or juniper tea",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "saline",
        "amount": 3,
        "unit": "drops"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "high",
      "booziness": "none",
      "dilution": "medium",
      "texture": "light",
      "aroma": "bitter orange and juniper"
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Zero-proof bitter aperitif template rather than a single canonical drink.",
    "whyItWorks": "Bitter, tannic, acidic, saline, and aromatic elements replace the Negroni's ethanol structure.",
    "commonMistakes": [
      "too sweet",
      "no tannin",
      "no orange oil"
    ],
    "homeBarNotes": [
      "Commercial NA aperitifs vary; rebalance every bottle."
    ],
    "variations": [
      "NA Americano",
      "NA spritz"
    ],
    "substitutions": [
      "chinotto soda reduction",
      "strong grapefruit peel tea"
    ],
    "batchingNotes": "Batch still components; stir with ice or add measured water.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Negroni"
  },
  {
    "id": "na-sour",
    "name": "NA Sour",
    "aliases": [
      "Zero-proof sour"
    ],
    "family": "Non-alcoholic",
    "style": "foamy citrus sour",
    "baseSpirit": "none",
    "ingredients": [
      {
        "name": "strong brewed tea",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "rich honey syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "aquafaba",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "aromatic bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "bitters or lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low-medium",
      "booziness": "none",
      "dilution": "medium",
      "texture": "foamy",
      "aroma": "tea",
      "honey": "",
      "lemon": ""
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Zero-proof sour template.",
    "whyItWorks": "Tea tannin, honey body, acid, foam, and bitters provide cocktail-like structure.",
    "commonMistakes": [
      "weak tea",
      "over-sweetening",
      "too much aquafaba"
    ],
    "homeBarNotes": [
      "Use lapsang only in tiny amounts; it dominates quickly."
    ],
    "variations": [
      "hibiscus sour",
      "spiced apple sour"
    ],
    "substitutions": [
      "verjus split",
      "gomme syrup",
      "nonalcoholic spirit"
    ],
    "batchingNotes": "Shake texture to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Margarita"
  },
  {
    "id": "cosmopolitan",
    "name": "Cosmopolitan",
    "aliases": [
      "Cosmo"
    ],
    "family": "Daisy",
    "style": "shaken vodka cranberry sour",
    "baseSpirit": "citrus vodka",
    "ingredients": [
      {
        "name": "citrus vodka",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "cranberry juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "orange twist or lime wheel",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "citrus and cranberry"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Late twentieth-century vodka daisy modern classic.",
    "whyItWorks": "Cranberry adds color and tart tannin while orange liqueur ties vodka to lime.",
    "commonMistakes": [
      "too much cranberry",
      "sweetened juice cocktail without lime adjustment",
      "warm serve"
    ],
    "homeBarNotes": [
      "Unsweetened cranberry needs more sweetener; cocktail cranberry needs less."
    ],
    "variations": [
      "White Cosmopolitan",
      "Cosmonaut",
      "Cape Codder"
    ],
    "substitutions": [
      "gin for a sharper botanical riff",
      "pomegranate for deeper tart fruit"
    ],
    "batchingNotes": "Batch vodka, Cointreau, and cranberry; add lime same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg",
    "imageCredit": "TheCocktailDB photo: Cosmopolitan"
  },
  {
    "id": "white-lady",
    "name": "White Lady",
    "aliases": [],
    "family": "Sour",
    "style": "shaken gin daisy",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "egg white",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Dry shake if using egg white, then shake with ice and fine strain.",
    "methodSteps": [
      "Dry shake if using egg white, then shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "gin",
      "lemon": "",
      "orange": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Savoy-era gin Sidecar relative.",
    "whyItWorks": "Gin gives a drier botanical frame to the Sidecar template.",
    "commonMistakes": [
      "too much orange liqueur",
      "thin texture",
      "stale lemon"
    ],
    "homeBarNotes": [
      "Egg white is optional but makes the drink feel more complete."
    ],
    "variations": [
      "Chelsea Sidecar",
      "Delilah"
    ],
    "substitutions": [
      "dry curacao for warmer orange",
      "aquafaba for egg"
    ],
    "batchingNotes": "Batch gin and liqueur; shake citrus and foam to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/jofsaz1504352991.jpg",
    "imageCredit": "TheCocktailDB photo: White Lady"
  },
  {
    "id": "corpse-reviver-no-2",
    "name": "Corpse Reviver No. 2",
    "aliases": [
      "Corpse Reviver 2"
    ],
    "family": "Sour",
    "style": "equal-parts aromatized gin sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Cocchi Americano",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "absinthe",
        "amount": "rinse",
        "unit": ""
      }
    ],
    "method": "Rinse glass with absinthe; shake remaining ingredients and strain.",
    "methodSteps": [
      "Rinse glass with absinthe; shake remaining ingredients and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "orange twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium-low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "citrus",
      "quinine": "",
      "anise": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Savoy Corpse Reviver entry and brunch classic.",
    "whyItWorks": "Equal parts keep orange, quinine, gin, lemon, and anise in bright tension.",
    "commonMistakes": [
      "too much absinthe",
      "modern Lillet without bitter compensation",
      "warm glass"
    ],
    "homeBarNotes": [
      "Cocchi Americano usually beats Lillet here."
    ],
    "variations": [
      "Corpse Reviver No. 1",
      "Sunflower",
      "Savoy Daisy riffs"
    ],
    "substitutions": [
      "Lillet Blanc plus grapefruit bitters",
      "pastis rinse"
    ],
    "batchingNotes": "Batch alcohol; lemon and absinthe rinse at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Whiskey Sour"
  },
  {
    "id": "between-the-sheets",
    "name": "Between the Sheets",
    "aliases": [],
    "family": "Daisy",
    "style": "shaken split-base brandy rum sour",
    "baseSpirit": "cognac and rum",
    "ingredients": [
      {
        "name": "cognac",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "white rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "brandy",
      "rum": "",
      "orange": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Sidecar family split with rum.",
    "whyItWorks": "Rum lightens and sweetens cognac while orange and lemon keep the structure familiar.",
    "commonMistakes": [
      "bland white rum",
      "too much Cointreau",
      "under-shaking"
    ],
    "homeBarNotes": [
      "A lightly aged rum gives more character than neutral white rum."
    ],
    "variations": [
      "Sidecar",
      "Chelsea Sidecar",
      "Boston Sidecar"
    ],
    "substitutions": [
      "aged rum",
      "Armagnac",
      "dry curacao"
    ],
    "batchingNotes": "Batch spirits and liqueur; add lemon at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/of1rj41504348346.jpg",
    "imageCredit": "TheCocktailDB photo: Between The Sheets"
  },
  {
    "id": "jack-rose",
    "name": "Jack Rose",
    "aliases": [],
    "family": "Sour",
    "style": "shaken apple brandy sour",
    "baseSpirit": "apple brandy",
    "ingredients": [
      {
        "name": "apple brandy",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "grenadine",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "bright",
      "aroma": "apple",
      "pomegranate": "",
      "lemon": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Applejack sour with pre-Prohibition roots.",
    "whyItWorks": "Pomegranate tannin and lemon sharpen apple brandy.",
    "commonMistakes": [
      "fake grenadine",
      "too much syrup",
      "weak applejack"
    ],
    "homeBarNotes": [
      "Bonded apple brandy gives the drink needed backbone."
    ],
    "variations": [
      "Applejack Rabbit",
      "Jersey Sour"
    ],
    "substitutions": [
      "calvados",
      "raspberry syrup for a different fruit branch"
    ],
    "batchingNotes": "Batch brandy and grenadine; add lemon at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/uuqqrv1439907068.jpg",
    "imageCredit": "TheCocktailDB photo: Jack Rose Cocktail"
  },
  {
    "id": "ward-eight",
    "name": "Ward Eight",
    "aliases": [],
    "family": "Sour",
    "style": "rye citrus grenadine sour",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "fresh orange juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "grenadine",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and strain.",
    "methodSteps": [
      "Shake with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "orange twist or cherry",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "juicy",
      "aroma": "rye",
      "orange": "",
      "pomegranate": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Boston rye sour.",
    "whyItWorks": "Orange rounds lemon and grenadine while rye keeps the drink dry enough.",
    "commonMistakes": [
      "too much orange juice",
      "weak grenadine",
      "bourbon making it soft"
    ],
    "homeBarNotes": [
      "Add a dash of Angostura if it tastes flat."
    ],
    "variations": [
      "Scofflaw",
      "New York Sour"
    ],
    "substitutions": [
      "bourbon with less grenadine",
      "pomegranate molasses in tiny amount"
    ],
    "batchingNotes": "Batch rye and grenadine; citrus same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Whiskey Sour"
  },
  {
    "id": "gold-rush",
    "name": "Gold Rush",
    "aliases": [],
    "family": "Sour",
    "style": "shaken honey whiskey sour",
    "baseSpirit": "bourbon",
    "ingredients": [
      {
        "name": "bourbon",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "honey syrup 3:1",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and strain over fresh ice.",
    "methodSteps": [
      "Shake with ice and strain over fresh ice."
    ],
    "glassware": "rocks",
    "ice": "large cube or rocks",
    "garnish": "lemon twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "bourbon",
      "honey": "",
      "lemon": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Modern Milk and Honey classic.",
    "whyItWorks": "Honey adds body and floral warmth to a stripped-down whiskey sour.",
    "commonMistakes": [
      "undiluted honey",
      "too much syrup",
      "soft low-proof bourbon"
    ],
    "homeBarNotes": [
      "Works best with punchy bourbon or a rye split."
    ],
    "variations": [
      "Bee's Knees",
      "Penicillin",
      "Brown Derby"
    ],
    "substitutions": [
      "maple syrup",
      "ginger honey syrup"
    ],
    "batchingNotes": "Batch bourbon and honey syrup; add lemon at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Whiskey Sour"
  },
  {
    "id": "brown-derby",
    "name": "Brown Derby",
    "aliases": [],
    "family": "Sour",
    "style": "shaken grapefruit honey sour",
    "baseSpirit": "bourbon",
    "ingredients": [
      {
        "name": "bourbon",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "grapefruit juice",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "honey syrup 3:1",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "grapefruit twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "medium-low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "round",
      "aroma": "grapefruit",
      "honey": "",
      "bourbon": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Hollywood-era bourbon sour.",
    "whyItWorks": "Grapefruit bitterness and honey round bourbon without heavy liqueurs.",
    "commonMistakes": [
      "old grapefruit",
      "too much honey",
      "no garnish oil"
    ],
    "homeBarNotes": [
      "Acid-adjust grapefruit if the fruit is sweet and flat."
    ],
    "variations": [
      "De Rigueur",
      "Gold Rush"
    ],
    "substitutions": [
      "rye",
      "Scotch",
      "maple syrup"
    ],
    "batchingNotes": "Batch bourbon and honey; juice same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Daiquiri"
  },
  {
    "id": "new-york-sour",
    "name": "New York Sour",
    "aliases": [],
    "family": "Sour",
    "style": "whiskey sour with wine float",
    "baseSpirit": "rye or bourbon",
    "ingredients": [
      {
        "name": "rye or bourbon",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "dry red wine",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Shake whiskey, lemon, and syrup; strain over ice; float red wine.",
    "methodSteps": [
      "Shake whiskey, lemon, and syrup; strain over ice; float red wine."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "lemon twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low-medium",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "layered",
      "aroma": "whiskey and red fruit"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Whiskey sour variation with claret float.",
    "whyItWorks": "Dry red wine adds tannin, color, and fruit to the sour template.",
    "commonMistakes": [
      "sweet wine",
      "messy float",
      "too much wine"
    ],
    "homeBarNotes": [
      "Malbec, syrah, or dry red blends work well."
    ],
    "variations": [
      "Continental Sour",
      "Port New York Sour"
    ],
    "substitutions": [
      "port in smaller amount",
      "fruity amaro float"
    ],
    "batchingNotes": "Batch sour base; shake and float wine to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/61wgch1504882795.jpg",
    "imageCredit": "TheCocktailDB photo: New York Sour"
  },
  {
    "id": "amaretto-sour",
    "name": "Amaretto Sour",
    "aliases": [],
    "family": "Sour",
    "style": "shaken almond whiskey sour",
    "baseSpirit": "amaretto and bourbon",
    "ingredients": [
      {
        "name": "amaretto",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "bourbon",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "egg white",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "lemon twist and cherry",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "plush",
      "aroma": "almond",
      "lemon": "",
      "whiskey": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Rebuilt modern version of a maligned sweet sour.",
    "whyItWorks": "Bourbon gives proof and oak to amaretto while lemon and foam keep it from cloying.",
    "commonMistakes": [
      "no whiskey backbone",
      "sour mix",
      "too sweet"
    ],
    "homeBarNotes": [
      "This spec rescues the drink from candy territory."
    ],
    "variations": [
      "Amaretto Stone Sour",
      "Morgenthaler-style sour"
    ],
    "substitutions": [
      "rye",
      "aquafaba"
    ],
    "batchingNotes": "Batch amaretto and bourbon; lemon and foam to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/xnzc541493070211.jpg",
    "imageCredit": "TheCocktailDB photo: Amaretto Sour"
  },
  {
    "id": "trinidad-sour",
    "name": "Trinidad Sour",
    "aliases": [],
    "family": "Sour",
    "style": "bitters-heavy sour",
    "baseSpirit": "Angostura bitters",
    "ingredients": [
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "rye whiskey",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orgeat",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "very high",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "dense",
      "aroma": "baking spice and almond"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Modern Giuseppe Gonzalez bitters-as-base drink.",
    "whyItWorks": "Orgeat and lemon turn intense Angostura spice into a surprisingly coherent sour.",
    "commonMistakes": [
      "timid bitters pour",
      "weak orgeat",
      "oversized serving"
    ],
    "homeBarNotes": [
      "Small, cold, and precise is the point."
    ],
    "variations": [
      "Port of Spain",
      "Angostura Colada"
    ],
    "substitutions": [
      "pecan orgeat",
      "high-proof rye accent"
    ],
    "batchingNotes": "Batch all but lemon if serving soon; shake to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Zombie"
  },
  {
    "id": "caipirinha",
    "name": "Caipirinha",
    "aliases": [],
    "family": "Sour",
    "style": "built cachaca lime sour",
    "baseSpirit": "cachaca",
    "ingredients": [
      {
        "name": "cachaca",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "lime wedges",
        "amount": 0.5,
        "unit": "lime"
      },
      {
        "name": "granulated sugar",
        "amount": 2,
        "unit": "tsp"
      }
    ],
    "method": "Muddle lime and sugar, add cachaca and ice, churn.",
    "methodSteps": [
      "Muddle lime and sugar, add cachaca and ice, churn."
    ],
    "glassware": "rocks",
    "ice": "cracked cubes",
    "garnish": "lime in drink",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low-medium",
      "booziness": "medium",
      "dilution": "medium-high",
      "texture": "rustic",
      "aroma": "lime oil and cane"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Brazilian cachaca classic.",
    "whyItWorks": "Whole lime oils and granular sugar emphasize cachaca's grassy cane profile.",
    "commonMistakes": [
      "over-muddling pith",
      "undissolved sugar",
      "bland cachaca"
    ],
    "homeBarNotes": [
      "Use a fresh thin-skinned lime."
    ],
    "variations": [
      "Caipiroska",
      "Caipirissima",
      "fruit caipirinha"
    ],
    "substitutions": [
      "rhum agricole",
      "white rum",
      "vodka"
    ],
    "batchingNotes": "Not ideal; muddle fresh.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/jgvn7p1582484435.jpg",
    "imageCredit": "TheCocktailDB photo: Caipirinha"
  },
  {
    "id": "southside",
    "name": "Southside",
    "aliases": [],
    "family": "Sour",
    "style": "mint gin sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 8,
        "unit": "leaves"
      }
    ],
    "method": "Shake with mint and ice, fine strain.",
    "methodSteps": [
      "Shake with mint and ice, fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "mint leaf or bouquet",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "mint",
      "lime": "",
      "gin": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Gin mint sour associated with clubs and speakeasy lore.",
    "whyItWorks": "Mint adds high aroma to a Gimlet-like frame.",
    "commonMistakes": [
      "pulverized bitter mint",
      "weak fine strain",
      "too sweet"
    ],
    "homeBarNotes": [
      "Try lemon for a softer Southside."
    ],
    "variations": [
      "Southside Fizz",
      "Eastside"
    ],
    "substitutions": [
      "vodka",
      "genever",
      "basil for Eastside direction"
    ],
    "batchingNotes": "Batch gin/syrup/citrus briefly; shake mint to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Daiquiri"
  },
  {
    "id": "eastside",
    "name": "Eastside",
    "aliases": [],
    "family": "Sour",
    "style": "cucumber mint gin sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "cucumber slices",
        "amount": 3,
        "unit": "slices"
      },
      {
        "name": "mint leaves",
        "amount": 6,
        "unit": "leaves"
      }
    ],
    "method": "Muddle cucumber gently, shake with remaining ingredients and fine strain.",
    "methodSteps": [
      "Muddle cucumber gently, shake with remaining ingredients and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "cucumber ribbon and mint",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "fresh",
      "aroma": "cucumber",
      "mint": "",
      "lime": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Modern cucumber-mint Southside branch.",
    "whyItWorks": "Cucumber cools gin and mint while lime keeps the drink taut.",
    "commonMistakes": [
      "watery cucumber",
      "over-muddled mint",
      "no fine strain"
    ],
    "homeBarNotes": [
      "Saline is excellent here."
    ],
    "variations": [
      "Old Maid",
      "Southside"
    ],
    "substitutions": [
      "basil",
      "vodka",
      "blanco tequila"
    ],
    "batchingNotes": "Prep base; muddle cucumber and mint fresh.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Margarita"
  },
  {
    "id": "army-and-navy",
    "name": "Army and Navy",
    "aliases": [],
    "family": "Sour",
    "style": "gin orgeat sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "orgeat",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist or grated nutmeg",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "rich",
      "aroma": "almond",
      "lemon": "",
      "gin": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Classic gin sour with almond syrup.",
    "whyItWorks": "Orgeat gives body and nutty sweetness to a dry gin sour.",
    "commonMistakes": [
      "cheap orgeat",
      "too much bitters",
      "flat lemon"
    ],
    "homeBarNotes": [
      "A navy-strength gin stands up well."
    ],
    "variations": [
      "Japanese Cocktail",
      "Saturn structure"
    ],
    "substitutions": [
      "almond syrup plus orange flower water",
      "pistachio orgeat"
    ],
    "batchingNotes": "Batch gin and orgeat; citrus at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Mai Tai"
  },
  {
    "id": "20th-century",
    "name": "20th Century",
    "aliases": [
      "Twentieth Century"
    ],
    "family": "Sour",
    "style": "gin cacao aromatized sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Lillet Blanc",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "white creme de cacao",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and fine strain.",
    "methodSteps": [
      "Shake with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "lemon",
      "cacao": "",
      "gin": ""
    },
    "difficulty": "medium",
    "prepTime": "4 minutes",
    "historyNotes": "British interwar drink named for the train.",
    "whyItWorks": "Cacao acts as a subtle vanilla-chocolate bridge rather than dessert.",
    "commonMistakes": [
      "too much cacao",
      "sweet Lillet without enough lemon",
      "warm serve"
    ],
    "homeBarNotes": [
      "Cocchi Americano makes it drier and more bitter."
    ],
    "variations": [
      "21st Century with tequila",
      "Corpse Reviver family"
    ],
    "substitutions": [
      "Cocchi Americano",
      "dry cacao liqueur"
    ],
    "batchingNotes": "Batch alcohol; lemon at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Margarita"
  },
  {
    "id": "espresso-martini",
    "name": "Espresso Martini",
    "aliases": [
      "Vodka Espresso"
    ],
    "family": "Sour",
    "style": "shaken coffee cocktail",
    "baseSpirit": "vodka",
    "ingredients": [
      {
        "name": "vodka",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "espresso",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "coffee liqueur",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Shake hard with ice and fine strain.",
    "methodSteps": [
      "Shake hard with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "three coffee beans",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low",
      "bitterness": "medium",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "foamy",
      "aroma": "coffee and roast"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Dick Bradsell modern classic.",
    "whyItWorks": "Fresh espresso foam and bitterness give vodka a strong aromatic structure.",
    "commonMistakes": [
      "stale coffee",
      "too much coffee liqueur",
      "weak shake"
    ],
    "homeBarNotes": [
      "Salt or a tiny amaro measure can sharpen sweet versions."
    ],
    "variations": [
      "Carajillo Martini",
      "rum espresso martini"
    ],
    "substitutions": [
      "cold brew concentrate",
      "aged rum",
      "reposado tequila"
    ],
    "batchingNotes": "Batch alcohol; espresso fresh or same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg",
    "imageCredit": "TheCocktailDB photo: Espresso Martini"
  },
  {
    "id": "french-martini",
    "name": "French Martini",
    "aliases": [],
    "family": "Sour",
    "style": "shaken pineapple raspberry cocktail",
    "baseSpirit": "vodka",
    "ingredients": [
      {
        "name": "vodka",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "raspberry liqueur",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "pineapple juice",
        "amount": 1.5,
        "unit": "oz"
      }
    ],
    "method": "Shake hard with ice and fine strain.",
    "methodSteps": [
      "Shake hard with ice and fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "expressed lemon twist or raspberry",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "foamy",
      "aroma": "pineapple and raspberry"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "1980s and 1990s cocktail revival-era drink.",
    "whyItWorks": "Pineapple foam and raspberry perfume turn a simple vodka build into a polished crowd-pleaser.",
    "commonMistakes": [
      "too much raspberry liqueur",
      "canned dull pineapple",
      "no acid adjustment"
    ],
    "homeBarNotes": [
      "A quarter ounce lemon improves many versions."
    ],
    "variations": [
      "gin French Martini",
      "rum pineapple raspberry sour"
    ],
    "substitutions": [
      "black raspberry liqueur",
      "raspberry syrup plus lemon"
    ],
    "batchingNotes": "Batch alcohol and juice shortly before service; shake to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/clth721504373134.jpg",
    "imageCredit": "TheCocktailDB photo: French Martini"
  },
  {
    "id": "rob-roy",
    "name": "Rob Roy",
    "aliases": [],
    "family": "Manhattan",
    "style": "stirred Scotch vermouth",
    "baseSpirit": "Scotch",
    "ingredients": [
      {
        "name": "blended Scotch",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "brandied cherry or lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "low-medium",
      "booziness": "high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "malt",
      "vermouth": "",
      "spice": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Scotch Manhattan branch.",
    "whyItWorks": "Sweet vermouth rounds Scotch malt and smoke into a softer aromatic drink.",
    "commonMistakes": [
      "peat overload",
      "stale vermouth",
      "under-dilution"
    ],
    "homeBarNotes": [
      "Use blended Scotch unless a single malt is deliberately featured."
    ],
    "variations": [
      "Bobby Burns",
      "Perfect Rob Roy"
    ],
    "substitutions": [
      "Irish whiskey",
      "split Scotch and rye"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/typuyq1439456976.jpg",
    "imageCredit": "TheCocktailDB photo: Dry Rob Roy"
  },
  {
    "id": "bobby-burns",
    "name": "Bobby Burns",
    "aliases": [],
    "family": "Manhattan",
    "style": "stirred Scotch Benedictine",
    "baseSpirit": "Scotch",
    "ingredients": [
      {
        "name": "blended Scotch",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Benedictine",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "malt",
      "honey": "",
      "herbs": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Scotch aromatic classic named after Robert Burns.",
    "whyItWorks": "Benedictine adds honeyed herbal depth to a Rob Roy frame.",
    "commonMistakes": [
      "too much Benedictine",
      "sweet vermouth overload",
      "flat Scotch"
    ],
    "homeBarNotes": [
      "A small orange bitters dash can brighten it."
    ],
    "variations": [
      "Rob Roy",
      "Highlander riffs"
    ],
    "substitutions": [
      "Drambuie in smaller measure",
      "dry vermouth split"
    ],
    "batchingNotes": "Freezer batch friendly with measured water.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/km6se51484411608.jpg",
    "imageCredit": "TheCocktailDB photo: Bobby Burns Cocktail"
  },
  {
    "id": "brooklyn",
    "name": "Brooklyn",
    "aliases": [],
    "family": "Manhattan",
    "style": "stirred rye dry vermouth",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "maraschino liqueur",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Amer Picon or substitute",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "medium",
      "booziness": "high",
      "dilution": "medium",
      "texture": "lean",
      "aroma": "rye",
      "orange bitter": "",
      "cherry": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Borough cocktail from the Manhattan family.",
    "whyItWorks": "Dry vermouth and bitter orange make rye taste angular and urbane.",
    "commonMistakes": [
      "using sweet vermouth",
      "too much maraschino",
      "weak Picon substitute"
    ],
    "homeBarNotes": [
      "Bigallet China-China or Amaro CioCiaro can stand in."
    ],
    "variations": [
      "Red Hook",
      "Greenpoint",
      "Bensonhurst"
    ],
    "substitutions": [
      "Amaro CioCiaro",
      "Bigallet China-China",
      "Ramazzotti"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/ojsezf1582477277.jpg",
    "imageCredit": "TheCocktailDB photo: Brooklyn"
  },
  {
    "id": "red-hook",
    "name": "Red Hook",
    "aliases": [],
    "family": "Manhattan",
    "style": "stirred rye Punt e Mes",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Punt e Mes",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "maraschino liqueur",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "brandied cherry optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "medium",
      "booziness": "high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "rye",
      "bitter vermouth": "",
      "cherry": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Sasha Petraske-era Brooklyn riff.",
    "whyItWorks": "Bitter vermouth and maraschino compress the Manhattan into a darker, sharper drink.",
    "commonMistakes": [
      "too much maraschino",
      "soft rye",
      "under-stirring"
    ],
    "homeBarNotes": [
      "Use a spicy rye to avoid a syrupy finish."
    ],
    "variations": [
      "Brooklyn",
      "Greenpoint",
      "Bensonhurst"
    ],
    "substitutions": [
      "sweet vermouth plus Campari dash",
      "dry curacao for a different branch"
    ],
    "batchingNotes": "Excellent small freezer batch.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Manhattan"
  },
  {
    "id": "remember-the-maine",
    "name": "Remember the Maine",
    "aliases": [],
    "family": "Manhattan",
    "style": "stirred rye cherry absinthe",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Cherry Heering",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "absinthe",
        "amount": "rinse",
        "unit": ""
      }
    ],
    "method": "Rinse glass with absinthe; stir remaining ingredients and strain.",
    "methodSteps": [
      "Rinse glass with absinthe; stir remaining ingredients and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist or cherry",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "medium-low",
      "booziness": "high",
      "dilution": "medium",
      "texture": "rich",
      "aroma": "rye",
      "cherry": "",
      "anise": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Charles H. Baker drink with Manhattan and Sazerac DNA.",
    "whyItWorks": "Cherry and absinthe add drama to the rye-vermouth structure without requiring citrus.",
    "commonMistakes": [
      "too much cherry liqueur",
      "too much absinthe",
      "stale vermouth"
    ],
    "homeBarNotes": [
      "Works well as a cold-weather freezer batch with rinse to order."
    ],
    "variations": [
      "Sazerac",
      "Manhattan",
      "De La Louisiane"
    ],
    "substitutions": [
      "maraschino plus cherry syrup",
      "pastis rinse"
    ],
    "batchingNotes": "Batch without absinthe rinse.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Negroni"
  },
  {
    "id": "toronto",
    "name": "Toronto",
    "aliases": [],
    "family": "Old Fashioned",
    "style": "stirred rye Fernet",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Fernet-Branca",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "rocks or coupe",
    "ice": "large cube or served up",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "low-medium",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "high",
      "dilution": "medium",
      "texture": "lean",
      "aroma": "minty bitter rye"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Bittered rye Old Fashioned branch.",
    "whyItWorks": "Fernet adds bracing bitter menthol to rye while syrup keeps it drinkable.",
    "commonMistakes": [
      "too much Fernet",
      "too much sugar",
      "soft whiskey"
    ],
    "homeBarNotes": [
      "Treat Fernet as seasoning unless the user wants a challenge."
    ],
    "variations": [
      "Fanciulli",
      "Fernet Old Fashioned"
    ],
    "substitutions": [
      "Branca Menta in smaller amount",
      "other alpine amaro"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Manhattan"
  },
  {
    "id": "rusty-nail",
    "name": "Rusty Nail",
    "aliases": [],
    "family": "Old Fashioned",
    "style": "stirred Scotch liqueur",
    "baseSpirit": "Scotch",
    "ingredients": [
      {
        "name": "Scotch",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Drambuie",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "lemon twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "medium-low",
      "texture": "viscous",
      "aroma": "honey",
      "malt": "",
      "spice": ""
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Mid-century Scotch and honey liqueur classic.",
    "whyItWorks": "Drambuie sweetens and spices Scotch while preserving a spirit-forward silhouette.",
    "commonMistakes": [
      "equal parts",
      "cheap sweet Scotch",
      "not enough dilution"
    ],
    "homeBarNotes": [
      "A peated quarter-ounce split adds length."
    ],
    "variations": [
      "Penicillin-adjacent stirred riff",
      "Bobby Burns"
    ],
    "substitutions": [
      "Benedictine plus honey",
      "Scotch liqueur"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/yqsvtw1478252982.jpg",
    "imageCredit": "TheCocktailDB photo: Rusty Nail"
  },
  {
    "id": "godfather",
    "name": "Godfather",
    "aliases": [],
    "family": "Old Fashioned",
    "style": "stirred Scotch amaretto",
    "baseSpirit": "Scotch",
    "ingredients": [
      {
        "name": "Scotch",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "amaretto",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "orange twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "medium-low",
      "texture": "round",
      "aroma": "almond and malt"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Simple 1970s duo drink.",
    "whyItWorks": "Almond sweetness softens Scotch while keeping the build spare.",
    "commonMistakes": [
      "too much amaretto",
      "watery ice",
      "no aromatic lift"
    ],
    "homeBarNotes": [
      "Orange bitters make it more cocktail-like."
    ],
    "variations": [
      "Godmother",
      "French Connection"
    ],
    "substitutions": [
      "bourbon",
      "cognac",
      "walnut liqueur"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/e5zgao1582582378.jpg",
    "imageCredit": "TheCocktailDB photo: Godfather"
  },
  {
    "id": "revolver",
    "name": "Revolver",
    "aliases": [],
    "family": "Old Fashioned",
    "style": "stirred bourbon coffee",
    "baseSpirit": "bourbon",
    "ingredients": [
      {
        "name": "bourbon",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "coffee liqueur",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "flamed orange twist or orange twist",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "medium",
      "booziness": "high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "coffee",
      "orange": "",
      "bourbon": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Jon Santer modern classic.",
    "whyItWorks": "Coffee liqueur acts like a dark sweetener for bourbon while orange bitters keep it lifted.",
    "commonMistakes": [
      "too much coffee liqueur",
      "sweet bourbon",
      "skipping orange oil"
    ],
    "homeBarNotes": [
      "Rye makes a drier variant."
    ],
    "variations": [
      "Coffee Old Fashioned",
      "Oaxaca coffee riff"
    ],
    "substitutions": [
      "espresso syrup",
      "Averna in split"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Manhattan"
  },
  {
    "id": "bijou",
    "name": "Bijou",
    "aliases": [],
    "family": "Stirred aromatic",
    "style": "equal-parts gin herbal vermouth",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Green Chartreuse",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist or cherry",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "none",
      "bitterness": "medium",
      "booziness": "high",
      "dilution": "medium",
      "texture": "dense",
      "aroma": "herbs",
      "vermouth": "",
      "gin": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Jewel-named classic from the late nineteenth century.",
    "whyItWorks": "Gin, vermouth, and Chartreuse create a saturated herbal triangle.",
    "commonMistakes": [
      "oversized pour",
      "warm service",
      "stale vermouth"
    ],
    "homeBarNotes": [
      "Many palates prefer 1.5 gin to 0.75 each vermouth and Chartreuse."
    ],
    "variations": [
      "Tailspin",
      "Last Word stirred branch"
    ],
    "substitutions": [
      "Genepy for softer version",
      "blanc vermouth for lighter style"
    ],
    "batchingNotes": "Freezer batch friendly in small bottles.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/rysb3r1513706985.jpg",
    "imageCredit": "TheCocktailDB photo: Bijou"
  },
  {
    "id": "alaska",
    "name": "Alaska",
    "aliases": [],
    "family": "Martini",
    "style": "stirred gin Chartreuse",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2.25,
        "unit": "oz"
      },
      {
        "name": "Yellow Chartreuse",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Stir very cold with ice and strain.",
    "methodSteps": [
      "Stir very cold with ice and strain."
    ],
    "glassware": "Nick and Nora",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "medium-low",
      "booziness": "high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "alpine herbs and gin"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Martini-adjacent Savoy classic.",
    "whyItWorks": "Yellow Chartreuse sweetens and perfumes gin without vermouth.",
    "commonMistakes": [
      "too much Chartreuse",
      "not cold enough",
      "large warm coupe"
    ],
    "homeBarNotes": [
      "Keep it small and very cold."
    ],
    "variations": [
      "Green Alaska",
      "Puritan"
    ],
    "substitutions": [
      "Genepy plus honey touch"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/wsyryt1483387720.jpg",
    "imageCredit": "TheCocktailDB photo: Alaska Cocktail"
  },
  {
    "id": "tuxedo-no-2",
    "name": "Tuxedo No. 2",
    "aliases": [
      "Tuxedo"
    ],
    "family": "Martini",
    "style": "stirred gin sherry vermouth",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "maraschino liqueur",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "absinthe",
        "amount": "rinse",
        "unit": ""
      },
      {
        "name": "orange bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Rinse glass with absinthe; stir remaining ingredients and strain.",
    "methodSteps": [
      "Rinse glass with absinthe; stir remaining ingredients and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist and cherry optional",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "medium-low",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "gin",
      "anise": "",
      "cherry": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Martini family classic with absinthe and maraschino.",
    "whyItWorks": "Maraschino and absinthe add ornate edges to a wet Martini structure.",
    "commonMistakes": [
      "too much maraschino",
      "heavy absinthe",
      "stale vermouth"
    ],
    "homeBarNotes": [
      "Fino sherry can replace part of the vermouth."
    ],
    "variations": [
      "Improved Martini",
      "Turf Club"
    ],
    "substitutions": [
      "fino sherry split",
      "pastis rinse"
    ],
    "batchingNotes": "Batch without absinthe rinse.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/4u0nbl1504352551.jpg",
    "imageCredit": "TheCocktailDB photo: Tuxedo Cocktail"
  },
  {
    "id": "gibson",
    "name": "Gibson",
    "aliases": [],
    "family": "Martini",
    "style": "stirred savory Martini",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2.5,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Stir very cold with ice and strain.",
    "methodSteps": [
      "Stir very cold with ice and strain."
    ],
    "glassware": "Nick and Nora",
    "ice": "served up",
    "garnish": "cocktail onion",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "gin",
      "vermouth": "",
      "onion brine": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Martini variation defined by onion garnish.",
    "whyItWorks": "The onion shifts the Martini savory without turning it dirty.",
    "commonMistakes": [
      "bad cocktail onions",
      "stale vermouth",
      "warm service"
    ],
    "homeBarNotes": [
      "Homemade onions are a major upgrade."
    ],
    "variations": [
      "Dirty Gibson",
      "50/50 Gibson"
    ],
    "substitutions": [
      "vodka",
      "fino sherry split"
    ],
    "batchingNotes": "Freezer batch; garnish to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Martini"
  },
  {
    "id": "50-50-martini",
    "name": "50/50 Martini",
    "aliases": [
      "Half and Half Martini"
    ],
    "family": "Martini",
    "style": "stirred wet Martini",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "orange bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Stir very cold with ice and strain.",
    "methodSteps": [
      "Stir very cold with ice and strain."
    ],
    "glassware": "Nick and Nora",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "none",
      "bitterness": "low-medium",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "crisp",
      "aroma": "vermouth",
      "gin": "",
      "lemon oil": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Wet Martini format with renewed modern popularity.",
    "whyItWorks": "Equal gin and vermouth makes the drink aromatic, lower proof, and food-friendly.",
    "commonMistakes": [
      "bad vermouth",
      "too large a pour",
      "not cold enough"
    ],
    "homeBarNotes": [
      "Vermouth quality matters as much as gin."
    ],
    "variations": [
      "Reverse Martini",
      "Bamboo-adjacent Martini"
    ],
    "substitutions": [
      "fino sherry split",
      "blanc vermouth"
    ],
    "batchingNotes": "Excellent freezer batch.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Negroni"
  },
  {
    "id": "dirty-martini",
    "name": "Dirty Martini",
    "aliases": [],
    "family": "Martini",
    "style": "stirred briny Martini",
    "baseSpirit": "gin or vodka",
    "ingredients": [
      {
        "name": "gin or vodka",
        "amount": 2.5,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "olive brine",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Stir very cold with ice and strain.",
    "methodSteps": [
      "Stir very cold with ice and strain."
    ],
    "glassware": "Nick and Nora",
    "ice": "served up",
    "garnish": "olives",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "low",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "medium",
      "texture": "saline",
      "aroma": "olive and spirit"
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Savory Martini branch.",
    "whyItWorks": "Brine adds salt and savory acidity to a cold spirit-vermouth frame.",
    "commonMistakes": [
      "too much brine",
      "warm vodka",
      "poor olives"
    ],
    "homeBarNotes": [
      "Start with a quarter ounce brine; more can bury the drink quickly."
    ],
    "variations": [
      "Filthy Martini",
      "Dirty Gibson"
    ],
    "substitutions": [
      "olive oil washed gin",
      "fino sherry split"
    ],
    "batchingNotes": "Freezer batch cautiously; brine intensity changes with temperature.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/vcyvpq1485083300.jpg",
    "imageCredit": "TheCocktailDB photo: Dirty Martini"
  },
  {
    "id": "hanky-panky",
    "name": "Hanky Panky",
    "aliases": [],
    "family": "Stirred aromatic",
    "style": "gin sweet vermouth Fernet",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Fernet-Branca",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "high",
      "dilution": "medium",
      "texture": "silky",
      "aroma": "gin",
      "vermouth": "",
      "menthol bitter": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Ada Coleman Savoy classic.",
    "whyItWorks": "Fernet cuts a sweet gin-vermouth build with a bracing bitter finish.",
    "commonMistakes": [
      "too much Fernet",
      "stale vermouth",
      "under-dilution"
    ],
    "homeBarNotes": [
      "Works beautifully with a robust sweet vermouth."
    ],
    "variations": [
      "Fanciulli",
      "Bijou branch"
    ],
    "substitutions": [
      "other fernet-style amaro in small dose"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Old Fashioned"
  },
  {
    "id": "white-negroni",
    "name": "White Negroni",
    "aliases": [],
    "family": "Negroni",
    "style": "stirred pale bitter aperitif",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Suze",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "Lillet Blanc",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "grapefruit twist",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "lean",
      "aroma": "gentian",
      "citrus": "",
      "gin": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Modern Negroni riff from Wayne Collins.",
    "whyItWorks": "Gentian bitterness and aromatized wine create a dry golden Negroni structure.",
    "commonMistakes": [
      "too much Suze",
      "sweet wine choice",
      "no citrus oil"
    ],
    "homeBarNotes": [
      "Cocchi Americano makes it sharper than Lillet."
    ],
    "variations": [
      "Blonde Negroni",
      "Suze spritz"
    ],
    "substitutions": [
      "Salers",
      "Cocchi Americano",
      "blanc vermouth"
    ],
    "batchingNotes": "Freezer or bottle batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Negroni"
  },
  {
    "id": "kingston-negroni",
    "name": "Kingston Negroni",
    "aliases": [],
    "family": "Negroni",
    "style": "stirred rum bitter aperitif",
    "baseSpirit": "Jamaican rum",
    "ingredients": [
      {
        "name": "Jamaican rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Campari",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "orange twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "rich",
      "aroma": "rum funk",
      "bitter orange": "",
      "vermouth": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Joaquín Simo rum Negroni modern classic.",
    "whyItWorks": "Jamaican funk makes Campari feel tropical without adding juice.",
    "commonMistakes": [
      "too mild rum",
      "stale vermouth",
      "no orange oil"
    ],
    "homeBarNotes": [
      "Smith and Cross-style rum is assertive; split if needed."
    ],
    "variations": [
      "Negroni",
      "Jungle Bird bridge"
    ],
    "substitutions": [
      "aged Barbados rum plus Jamaican accent"
    ],
    "batchingNotes": "Excellent freezer batch.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Negroni"
  },
  {
    "id": "mezcal-negroni",
    "name": "Mezcal Negroni",
    "aliases": [],
    "family": "Negroni",
    "style": "stirred smoky bitter aperitif",
    "baseSpirit": "mezcal",
    "ingredients": [
      {
        "name": "mezcal",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Campari",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain over a large cube.",
    "methodSteps": [
      "Stir with ice and strain over a large cube."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "orange or grapefruit twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "dense",
      "aroma": "smoke",
      "bitter orange": "",
      "herbs": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Contemporary agave Negroni branch.",
    "whyItWorks": "Mezcal smoke amplifies Campari bitterness while vermouth keeps the drink rounded.",
    "commonMistakes": [
      "over-smoky mezcal",
      "sweet vermouth overload",
      "warm serve"
    ],
    "homeBarNotes": [
      "Split tequila and mezcal for a less smoky version."
    ],
    "variations": [
      "Rosita",
      "Oaxacan Negroni"
    ],
    "substitutions": [
      "blanco tequila",
      "Gran Classico"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Old Fashioned"
  },
  {
    "id": "old-pal",
    "name": "Old Pal",
    "aliases": [],
    "family": "Negroni",
    "style": "stirred dry whiskey bitter",
    "baseSpirit": "rye",
    "ingredients": [
      {
        "name": "rye whiskey",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "Campari",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "dry vermouth",
        "amount": 0.75,
        "unit": "oz"
      }
    ],
    "method": "Stir with ice and strain.",
    "methodSteps": [
      "Stir with ice and strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "high",
      "booziness": "high",
      "dilution": "medium",
      "texture": "lean",
      "aroma": "rye",
      "bitter orange": "",
      "dry vermouth": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Harry McElhone whiskey-Campari classic.",
    "whyItWorks": "Dry vermouth keeps the whiskey Negroni template sharp and bitter.",
    "commonMistakes": [
      "equal parts with soft rye",
      "stale dry vermouth",
      "not enough dilution"
    ],
    "homeBarNotes": [
      "Excellent for people who find Boulevardiers too sweet."
    ],
    "variations": [
      "Boulevardier",
      "1794"
    ],
    "substitutions": [
      "bourbon with drier ratio",
      "blanc vermouth"
    ],
    "batchingNotes": "Freezer batch friendly.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/x03td31521761009.jpg",
    "imageCredit": "TheCocktailDB photo: Old Pal"
  },
  {
    "id": "negroni-sbagliato",
    "name": "Negroni Sbagliato",
    "aliases": [
      "Sbagliato"
    ],
    "family": "Spritz",
    "style": "sparkling bitter aperitif",
    "baseSpirit": "sparkling wine",
    "ingredients": [
      {
        "name": "Campari",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "sweet vermouth",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "dry sparkling wine",
        "amount": 3,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "rocks or wine glass",
    "ice": "cubes",
    "garnish": "orange slice",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "high",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "bitter orange and wine"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Accidental sparkling Negroni from Milan aperitivo culture.",
    "whyItWorks": "Sparkling wine lowers proof and adds acid while preserving the Campari-vermouth core.",
    "commonMistakes": [
      "sweet prosecco",
      "flat wine",
      "too much Campari for guests"
    ],
    "homeBarNotes": [
      "Use dry bubbles and cold glassware."
    ],
    "variations": [
      "Americano",
      "Campari Spritz"
    ],
    "substitutions": [
      "Cappelletti",
      "Gran Classico",
      "cava"
    ],
    "batchingNotes": "Batch Campari and vermouth; add bubbles at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hrxfbl1606773109.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: French 75"
  },
  {
    "id": "cuba-libre",
    "name": "Cuba Libre",
    "aliases": [],
    "family": "Highball",
    "style": "rum cola highball",
    "baseSpirit": "rum",
    "ingredients": [
      {
        "name": "aged rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "cola",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir briefly.",
    "methodSteps": [
      "Build over ice and stir briefly."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "lime wedge",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "cola",
      "lime": "",
      "rum": ""
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Cuban rum and cola highball.",
    "whyItWorks": "Lime turns rum and cola from a mixed drink into a proper highball.",
    "commonMistakes": [
      "no lime",
      "bad rum",
      "flat cola"
    ],
    "homeBarNotes": [
      "Aged rum and a squeezed lime shell make a real difference."
    ],
    "variations": [
      "Cubata",
      "Fernet con cola"
    ],
    "substitutions": [
      "Jamaican rum split",
      "Mexican cola"
    ],
    "batchingNotes": "Do not batch cola.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/wmkbfj1606853905.jpg",
    "imageCredit": "TheCocktailDB photo: Cuba Libre"
  },
  {
    "id": "ranch-water",
    "name": "Ranch Water",
    "aliases": [],
    "family": "Highball",
    "style": "tequila mineral highball",
    "baseSpirit": "blanco tequila",
    "ingredients": [
      {
        "name": "blanco tequila",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "sparkling mineral water",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "lime wedge",
    "flavorProfile": {
      "sweetness": "low",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "agave",
      "lime": "",
      "mineral": ""
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "West Texas tequila highball.",
    "whyItWorks": "Mineral water and lime keep tequila crisp without added sugar.",
    "commonMistakes": [
      "flat water",
      "too much lime",
      "warm tequila"
    ],
    "homeBarNotes": [
      "Add saline if the mineral water is soft."
    ],
    "variations": [
      "Mezcal Ranch Water",
      "Paloma lean"
    ],
    "substitutions": [
      "soda water plus saline",
      "sotol"
    ],
    "batchingNotes": "Build to order with cold sparkling water.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Aperol Spritz"
  },
  {
    "id": "pimm-s-cup",
    "name": "Pimm's Cup",
    "aliases": [
      "Pimms Cup"
    ],
    "family": "Highball",
    "style": "fruit and herb long drink",
    "baseSpirit": "Pimm's No. 1",
    "ingredients": [
      {
        "name": "Pimm's No. 1",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "lemonade or ginger ale",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "cucumber",
        "amount": 2,
        "unit": "slices"
      },
      {
        "name": "seasonal fruit",
        "amount": 2,
        "unit": "pieces"
      },
      {
        "name": "mint",
        "amount": 1,
        "unit": "sprig"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "cucumber, mint, citrus, berries",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "low-medium",
      "booziness": "low",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "cucumber",
      "fruit": "",
      "herbs": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "British summer cup tradition.",
    "whyItWorks": "Bitter herbal liqueur becomes refreshing when stretched with bubbles and fresh garnish.",
    "commonMistakes": [
      "overloaded fruit salad",
      "warm mixer",
      "too sweet lemonade"
    ],
    "homeBarNotes": [
      "Ginger ale gives more structure than sweet lemonade."
    ],
    "variations": [
      "Pimm's Royale",
      "summer cup punch"
    ],
    "substitutions": [
      "house cup with gin",
      "sweet vermouth",
      "curacao",
      "bitters"
    ],
    "batchingNotes": "Batch Pimm's and fruit shortly; add bubbles at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/7cll921606854636.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Tom Collins"
  },
  {
    "id": "chilcano",
    "name": "Chilcano",
    "aliases": [],
    "family": "Buck",
    "style": "pisco ginger highball",
    "baseSpirit": "pisco",
    "ingredients": [
      {
        "name": "pisco",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "ginger ale",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "lime wheel",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "low-medium",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "grape",
      "ginger": "",
      "bitters": ""
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Peruvian pisco highball.",
    "whyItWorks": "Ginger and bitters give pisco a bright, spicy long-drink frame.",
    "commonMistakes": [
      "too sweet ginger ale",
      "no bitters",
      "too much lime"
    ],
    "homeBarNotes": [
      "Ginger beer makes a stronger buck-style version."
    ],
    "variations": [
      "Chilcano de maracuya",
      "pisco mule"
    ],
    "substitutions": [
      "ginger beer",
      "ginger syrup and soda"
    ],
    "batchingNotes": "Batch pisco, lime, bitters; add ginger at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Mojito"
  },
  {
    "id": "gin-rickey",
    "name": "Gin Rickey",
    "aliases": [
      "Rickey"
    ],
    "family": "Highball",
    "style": "dry lime soda highball",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir briefly.",
    "methodSteps": [
      "Build over ice and stir briefly."
    ],
    "glassware": "highball",
    "ice": "cubes or spear",
    "garnish": "lime shell",
    "flavorProfile": {
      "sweetness": "none",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "gin and lime"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Dry highball family from Washington D.C.",
    "whyItWorks": "No sugar means gin, lime, and carbonation stay bracing.",
    "commonMistakes": [
      "adding syrup by habit",
      "flat soda",
      "not enough ice"
    ],
    "homeBarNotes": [
      "Use a gin with enough body to handle the dryness."
    ],
    "variations": [
      "Bourbon Rickey",
      "Tequila Rickey"
    ],
    "substitutions": [
      "vodka",
      "tequila",
      "bourbon"
    ],
    "batchingNotes": "Build to order; soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/s00d6f1504883945.jpg",
    "imageCredit": "TheCocktailDB photo: Gin Rickey"
  },
  {
    "id": "horse-s-neck",
    "name": "Horse's Neck",
    "aliases": [
      "Horses Neck"
    ],
    "family": "Highball",
    "style": "brandy ginger highball",
    "baseSpirit": "brandy",
    "ingredients": [
      {
        "name": "brandy or bourbon",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "ginger ale",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "long lemon peel",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low",
      "bitterness": "low-medium",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "lemon",
      "ginger": "",
      "oak": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Highball named for the long peel garnish.",
    "whyItWorks": "Ginger ale and bitters lengthen oak spirits with spice and citrus oil.",
    "commonMistakes": [
      "no bitters",
      "short garnish",
      "too sweet mixer"
    ],
    "homeBarNotes": [
      "Bourbon makes it punchier; Cognac makes it softer."
    ],
    "variations": [
      "Presbyterian",
      "Mamie Taylor"
    ],
    "substitutions": [
      "apple brandy",
      "ginger beer"
    ],
    "batchingNotes": "Build to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Paloma"
  },
  {
    "id": "pina-colada",
    "name": "Pina Colada",
    "aliases": [
      "Piña Colada"
    ],
    "family": "Tiki",
    "style": "blended creamy tropical",
    "baseSpirit": "rum",
    "ingredients": [
      {
        "name": "white or aged rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "pineapple juice",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "cream of coconut",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Flash blend or shake hard with crushed ice.",
    "methodSteps": [
      "Flash blend or shake hard with crushed ice."
    ],
    "glassware": "hurricane or tiki mug",
    "ice": "crushed or blended",
    "garnish": "pineapple fronds, cherry, grated nutmeg optional",
    "flavorProfile": {
      "sweetness": "high",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "creamy",
      "aroma": "coconut and pineapple"
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Puerto Rican tropical classic.",
    "whyItWorks": "Coconut fat, pineapple acid, lime, and rum become refreshing when very cold.",
    "commonMistakes": [
      "coconut milk instead of cream of coconut",
      "no lime",
      "under-chilling"
    ],
    "homeBarNotes": [
      "A rum blend and pinch of salt keep it adult."
    ],
    "variations": [
      "Painkiller",
      "Angostura Colada",
      "Chi Chi"
    ],
    "substitutions": [
      "coconut cream plus sugar",
      "aged rum split"
    ],
    "batchingNotes": "Batch and chill; blend with ice at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
    "imageCredit": "TheCocktailDB photo: Pina Colada"
  },
  {
    "id": "hurricane",
    "name": "Hurricane",
    "aliases": [],
    "family": "Tiki",
    "style": "passion fruit rum sour",
    "baseSpirit": "rum",
    "ingredients": [
      {
        "name": "dark rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "light rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "passion fruit syrup",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 1,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and strain over crushed ice.",
    "methodSteps": [
      "Shake with ice and strain over crushed ice."
    ],
    "glassware": "hurricane glass",
    "ice": "crushed",
    "garnish": "orange slice and cherry",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "high",
      "texture": "juicy and cold",
      "aroma": "rum and passion fruit"
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "New Orleans Pat O'Brien's classic with many degraded versions.",
    "whyItWorks": "Good passion fruit and lemon can support a lot of rum without becoming syrupy.",
    "commonMistakes": [
      "red premix",
      "too sweet",
      "weak rum"
    ],
    "homeBarNotes": [
      "Keep the ingredient list short and quality high."
    ],
    "variations": [
      "Hurricane highball",
      "passion fruit Daiquiri"
    ],
    "substitutions": [
      "lime for lemon with syrup adjustment",
      "rum blend to inventory"
    ],
    "batchingNotes": "Batch rum and syrup; citrus same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/nwx02s1515795822.jpg",
    "imageCredit": "TheCocktailDB photo: Blue Hurricane"
  },
  {
    "id": "queen-s-park-swizzle",
    "name": "Queen's Park Swizzle",
    "aliases": [
      "Queens Park Swizzle"
    ],
    "family": "Tiki",
    "style": "mint rum swizzle",
    "baseSpirit": "aged rum",
    "ingredients": [
      {
        "name": "aged rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "demerara syrup",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 8,
        "unit": "leaves"
      },
      {
        "name": "Angostura bitters",
        "amount": 4,
        "unit": "dashes"
      }
    ],
    "method": "Build with crushed ice, swizzle until frosty, crown with bitters.",
    "methodSteps": [
      "Build with crushed ice, swizzle until frosty, crown with bitters."
    ],
    "glassware": "Collins",
    "ice": "crushed",
    "garnish": "mint bouquet",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium",
      "booziness": "medium-high",
      "dilution": "high",
      "texture": "icy",
      "aroma": "mint",
      "rum": "",
      "Angostura": ""
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Trinidad swizzle classic.",
    "whyItWorks": "Mint, lime, rum, crushed ice, and Angostura create a dark Mojito with more spice.",
    "commonMistakes": [
      "not enough bitters",
      "weak rum",
      "under-swizzling"
    ],
    "homeBarNotes": [
      "A rich Demerara syrup gives needed bass."
    ],
    "variations": [
      "Mojito",
      "Planter's Punch",
      "Chartreuse Swizzle"
    ],
    "substitutions": [
      "Jamaican rum",
      "allspice bitters accent"
    ],
    "batchingNotes": "Batch rum and syrup; mint, lime, bitters at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Pina Colada"
  },
  {
    "id": "missionary-s-downfall",
    "name": "Missionary's Downfall",
    "aliases": [
      "Missionarys Downfall"
    ],
    "family": "Tiki",
    "style": "blended mint pineapple drink",
    "baseSpirit": "rum",
    "ingredients": [
      {
        "name": "white rum",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "peach liqueur",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "honey syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "pineapple chunks",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "mint leaves",
        "amount": 10,
        "unit": "leaves"
      }
    ],
    "method": "Blend briefly with crushed ice.",
    "methodSteps": [
      "Blend briefly with crushed ice."
    ],
    "glassware": "coupe or tiki mug",
    "ice": "blended",
    "garnish": "mint sprig",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "fluffy",
      "aroma": "mint",
      "pineapple": "",
      "peach": ""
    },
    "difficulty": "medium",
    "prepTime": "7 minutes",
    "historyNotes": "Don the Beachcomber blended tiki classic.",
    "whyItWorks": "Mint and pineapple make a low-looking drink that stays vivid through honey and peach.",
    "commonMistakes": [
      "over-blending mint",
      "too much ice",
      "canned pineapple dullness"
    ],
    "homeBarNotes": [
      "Keep mint bright green by blending briefly."
    ],
    "variations": [
      "frozen Daiquiri",
      "Chartreuse Swizzle influence"
    ],
    "substitutions": [
      "peach syrup",
      "apricot liqueur"
    ],
    "batchingNotes": "Prep measured kits; blend to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Pina Colada"
  },
  {
    "id": "three-dots-and-a-dash",
    "name": "Three Dots and a Dash",
    "aliases": [],
    "family": "Tiki",
    "style": "spiced rum tiki sour",
    "baseSpirit": "rhum agricole and aged rum",
    "ingredients": [
      {
        "name": "rhum agricole vieux",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "aged rum",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orange juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "honey syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "falernum",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "allspice dram",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Flash blend with crushed ice and pour unstrained.",
    "methodSteps": [
      "Flash blend with crushed ice and pour unstrained."
    ],
    "glassware": "pilsner or tiki mug",
    "ice": "crushed",
    "garnish": "three cherries and pineapple spear",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low-medium",
      "booziness": "high",
      "dilution": "high",
      "texture": "icy",
      "aroma": "spice",
      "honey": "",
      "agricole": ""
    },
    "difficulty": "hard",
    "prepTime": "8 minutes",
    "historyNotes": "Don the Beachcomber World War II coded-name classic.",
    "whyItWorks": "Agricole, honey, citrus, and spice create a dry, complex tiki profile.",
    "commonMistakes": [
      "too much allspice",
      "sweet orange juice",
      "wrong rum base"
    ],
    "homeBarNotes": [
      "Agricole character is important here."
    ],
    "variations": [
      "Test Pilot",
      "Navy Grog"
    ],
    "substitutions": [
      "cachaca plus aged rum",
      "falernum spice adjustment"
    ],
    "batchingNotes": "Batch spirits and syrups; juices same day.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Pina Colada"
  },
  {
    "id": "jet-pilot",
    "name": "Jet Pilot",
    "aliases": [],
    "family": "Tiki",
    "style": "overproof spiced rum sour",
    "baseSpirit": "rum blend",
    "ingredients": [
      {
        "name": "Jamaican rum",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "gold rum",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "overproof Demerara rum",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "grapefruit juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "cinnamon syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "falernum",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "absinthe",
        "amount": 6,
        "unit": "drops"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Flash blend with crushed ice and pour unstrained.",
    "methodSteps": [
      "Flash blend with crushed ice and pour unstrained."
    ],
    "glassware": "double rocks or tiki mug",
    "ice": "crushed",
    "garnish": "mint",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium",
      "booziness": "very high",
      "dilution": "high",
      "texture": "icy",
      "aroma": "rum",
      "spice": "",
      "anise": ""
    },
    "difficulty": "hard",
    "prepTime": "8 minutes",
    "historyNotes": "Zombie-descended high-proof tiki drink.",
    "whyItWorks": "Rum power is controlled by grapefruit, lime, spice, bitters, and crushed ice.",
    "commonMistakes": [
      "too much absinthe",
      "under-dilution",
      "flat grapefruit"
    ],
    "homeBarNotes": [
      "Treat as a small strong drink, not a casual cooler."
    ],
    "variations": [
      "Zombie",
      "Test Pilot"
    ],
    "substitutions": [
      "Don's Mix",
      "adjusted rum blend"
    ],
    "batchingNotes": "Batch non-citrus; flash blend to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Mai Tai"
  },
  {
    "id": "test-pilot",
    "name": "Test Pilot",
    "aliases": [],
    "family": "Tiki",
    "style": "spiced rum sour",
    "baseSpirit": "rum blend",
    "ingredients": [
      {
        "name": "dark Jamaican rum",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "light rum",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "falernum",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "Cointreau",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      },
      {
        "name": "absinthe",
        "amount": 6,
        "unit": "drops"
      }
    ],
    "method": "Flash blend with crushed ice and pour unstrained.",
    "methodSteps": [
      "Flash blend with crushed ice and pour unstrained."
    ],
    "glassware": "double rocks",
    "ice": "crushed",
    "garnish": "mint or lime",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium-low",
      "booziness": "high",
      "dilution": "high",
      "texture": "icy",
      "aroma": "spice",
      "rum": "",
      "anise": ""
    },
    "difficulty": "hard",
    "prepTime": "7 minutes",
    "historyNotes": "Don the Beachcomber aviation-themed tiki classic.",
    "whyItWorks": "Falernum, orange, bitters, and absinthe give rum and lime a layered tiki profile.",
    "commonMistakes": [
      "heavy absinthe",
      "weak rum",
      "not enough crushed ice"
    ],
    "homeBarNotes": [
      "Good bridge to more intense Zombie-family drinks."
    ],
    "variations": [
      "Jet Pilot",
      "Space Pilot"
    ],
    "substitutions": [
      "dry curacao",
      "rum blend to inventory"
    ],
    "batchingNotes": "Batch non-citrus; blend to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Zombie"
  },
  {
    "id": "kir-royale",
    "name": "Kir Royale",
    "aliases": [],
    "family": "Low-ABV",
    "style": "sparkling wine aperitif",
    "baseSpirit": "sparkling wine",
    "ingredients": [
      {
        "name": "creme de cassis",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "dry sparkling wine",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Add cassis to chilled flute and top with sparkling wine.",
    "methodSteps": [
      "Add cassis to chilled flute and top with sparkling wine."
    ],
    "glassware": "flute",
    "ice": "none",
    "garnish": "lemon twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "low",
      "texture": "sparkling",
      "aroma": "blackcurrant and wine"
    },
    "difficulty": "easy",
    "prepTime": "2 minutes",
    "historyNotes": "Sparkling variation on the Burgundian Kir.",
    "whyItWorks": "Dry bubbles stretch intense cassis into a simple aperitif.",
    "commonMistakes": [
      "too much cassis",
      "sweet sparkling wine",
      "warm flute"
    ],
    "homeBarNotes": [
      "Use less cassis than most casual specs."
    ],
    "variations": [
      "Kir",
      "Communard",
      "Kir Peche"
    ],
    "substitutions": [
      "blackberry liqueur",
      "raspberry liqueur"
    ],
    "batchingNotes": "Build to order with cold wine.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/yt9i7n1504370388.jpg",
    "imageCredit": "TheCocktailDB photo: Kir Royale"
  },
  {
    "id": "bellini",
    "name": "Bellini",
    "aliases": [],
    "family": "Low-ABV",
    "style": "sparkling peach aperitif",
    "baseSpirit": "prosecco",
    "ingredients": [
      {
        "name": "white peach puree",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "prosecco",
        "amount": 3,
        "unit": "oz"
      }
    ],
    "method": "Add puree to chilled glass and top gently with prosecco.",
    "methodSteps": [
      "Add puree to chilled glass and top gently with prosecco."
    ],
    "glassware": "flute or small wine glass",
    "ice": "none",
    "garnish": "none",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "low",
      "texture": "sparkling and pulpy",
      "aroma": "peach and wine"
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Venetian Harry's Bar classic.",
    "whyItWorks": "Fragrant peach pulp gives prosecco fruit and texture without hard spirit.",
    "commonMistakes": [
      "bad peach puree",
      "too sweet nectar",
      "over-stirring bubbles"
    ],
    "homeBarNotes": [
      "Seasonal ripe peaches matter more than the wine label."
    ],
    "variations": [
      "Rossini",
      "Puccini",
      "Mimosa"
    ],
    "substitutions": [
      "frozen white peach puree",
      "apricot puree"
    ],
    "batchingNotes": "Keep puree and wine separate until service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/eaag491504367543.jpg",
    "imageCredit": "TheCocktailDB photo: Bellini"
  },
  {
    "id": "mimosa",
    "name": "Mimosa",
    "aliases": [],
    "family": "Low-ABV",
    "style": "sparkling orange brunch drink",
    "baseSpirit": "sparkling wine",
    "ingredients": [
      {
        "name": "dry sparkling wine",
        "amount": 3,
        "unit": "oz"
      },
      {
        "name": "fresh orange juice",
        "amount": 2,
        "unit": "oz"
      }
    ],
    "method": "Build in chilled glass.",
    "methodSteps": [
      "Build in chilled glass."
    ],
    "glassware": "flute or wine glass",
    "ice": "none",
    "garnish": "orange twist optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "low",
      "texture": "sparkling",
      "aroma": "orange and wine"
    },
    "difficulty": "easy",
    "prepTime": "2 minutes",
    "historyNotes": "Brunch sparkling wine classic.",
    "whyItWorks": "Fresh orange softens sparkling wine into a low-proof morning aperitif.",
    "commonMistakes": [
      "carton juice",
      "sweet wine",
      "warm service"
    ],
    "homeBarNotes": [
      "A small orange bitters dash makes it more adult."
    ],
    "variations": [
      "Buck's Fizz",
      "Garibaldi",
      "Bellini"
    ],
    "substitutions": [
      "tangerine",
      "blood orange",
      "grapefruit"
    ],
    "batchingNotes": "Build to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/juhcuu1504370685.jpg",
    "imageCredit": "TheCocktailDB photo: Mimosa"
  },
  {
    "id": "rebujito",
    "name": "Rebujito",
    "aliases": [],
    "family": "Low-ABV",
    "style": "sherry lemon-lime highball",
    "baseSpirit": "fino sherry",
    "ingredients": [
      {
        "name": "fino or manzanilla sherry",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "lemon-lime soda",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "mint",
        "amount": 1,
        "unit": "sprig"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "mint and lemon",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "sherry",
      "mint": "",
      "citrus": ""
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Andalusian fair drink.",
    "whyItWorks": "Salty dry sherry adds complexity to a simple citrus soda highball.",
    "commonMistakes": [
      "oxidized sherry",
      "too sweet soda",
      "warm serve"
    ],
    "homeBarNotes": [
      "Dry tonic or soda plus lemon syrup gives more control."
    ],
    "variations": [
      "Sherry highball",
      "Bamboo highball"
    ],
    "substitutions": [
      "dry vermouth",
      "white port"
    ],
    "batchingNotes": "Build to order with cold soda.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/7cll921606854636.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Tom Collins"
  },
  {
    "id": "na-paloma",
    "name": "NA Paloma",
    "aliases": [
      "Zero-proof Paloma"
    ],
    "family": "Non-alcoholic",
    "style": "grapefruit lime highball",
    "baseSpirit": "none",
    "ingredients": [
      {
        "name": "grapefruit juice",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lime juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "agave syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "saline",
        "amount": 4,
        "unit": "drops"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "grapefruit wedge and half salt rim optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "medium-low",
      "booziness": "none",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "grapefruit",
      "lime": "",
      "salt": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Zero-proof agave highball template.",
    "whyItWorks": "Grapefruit bitterness, lime acid, salt, and carbonation create structure without tequila.",
    "commonMistakes": [
      "too sweet",
      "no salt",
      "flat soda"
    ],
    "homeBarNotes": [
      "Add a little brewed green tea for tannin."
    ],
    "variations": [
      "NA Cantarito",
      "NA Ranch Water"
    ],
    "substitutions": [
      "grapefruit soda with reduced syrup",
      "verjus split"
    ],
    "batchingNotes": "Batch juice, syrup, saline; soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/k0508k1668422436.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Gin and Tonic"
  },
  {
    "id": "na-spritz",
    "name": "NA Spritz",
    "aliases": [
      "Zero-proof spritz"
    ],
    "family": "Non-alcoholic",
    "style": "bitter sparkling aperitif",
    "baseSpirit": "none",
    "ingredients": [
      {
        "name": "nonalcoholic bitter aperitif",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "verjus",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 3,
        "unit": "oz"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "wine glass",
    "ice": "cubes",
    "garnish": "orange slice and olive optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "medium-high",
      "booziness": "none",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "bitter orange and grape"
    },
    "difficulty": "easy",
    "prepTime": "3 minutes",
    "historyNotes": "Zero-proof aperitivo template.",
    "whyItWorks": "Bitter aperitif, verjus acidity, and bubbles mimic spritz structure without wine.",
    "commonMistakes": [
      "too sweet NA aperitif",
      "no acid",
      "warm soda"
    ],
    "homeBarNotes": [
      "Saline and orange oil make commercial NA products taste more complete."
    ],
    "variations": [
      "NA Americano",
      "NA Nogroni highball"
    ],
    "substitutions": [
      "chinotto soda",
      "tonic plus bitter concentrate"
    ],
    "batchingNotes": "Add soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Aperol Spritz"
  },
  {
    "id": "gin-fix",
    "name": "Gin Fix",
    "aliases": [],
    "family": "Fix",
    "style": "crushed-ice gin sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "seasonal fruit",
        "amount": 2,
        "unit": "pieces"
      }
    ],
    "method": "Shake briefly with ice and strain over crushed ice.",
    "methodSteps": [
      "Shake briefly with ice and strain over crushed ice."
    ],
    "glassware": "rocks or small goblet",
    "ice": "crushed",
    "garnish": "seasonal fruit and mint",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "icy",
      "aroma": "gin",
      "lemon": "",
      "fruit": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Nineteenth-century short sour over crushed ice.",
    "whyItWorks": "The fix format concentrates a sour while crushed ice and fruit make it colder and more relaxed.",
    "commonMistakes": [
      "too much fruit",
      "watery crushed ice",
      "oversweetening"
    ],
    "homeBarNotes": [
      "Use fruit as an accent, not smoothie volume."
    ],
    "variations": [
      "Brandy Fix",
      "Whiskey Fix",
      "Bramble"
    ],
    "substitutions": [
      "brandy",
      "bourbon",
      "raspberry syrup"
    ],
    "batchingNotes": "Batch spirit and syrup; citrus and fruit at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Daiquiri"
  },
  {
    "id": "brandy-fix",
    "name": "Brandy Fix",
    "aliases": [],
    "family": "Fix",
    "style": "crushed-ice brandy sour",
    "baseSpirit": "brandy",
    "ingredients": [
      {
        "name": "cognac or brandy",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "pineapple syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "orange curacao",
        "amount": 0.25,
        "unit": "oz"
      }
    ],
    "method": "Shake with ice and strain over crushed ice.",
    "methodSteps": [
      "Shake with ice and strain over crushed ice."
    ],
    "glassware": "rocks or goblet",
    "ice": "crushed",
    "garnish": "orange, berries, mint",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "icy",
      "aroma": "brandy",
      "pineapple": "",
      "orange": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Historic brandy fix pattern adapted for modern home specs.",
    "whyItWorks": "Brandy, lemon, pineapple, and orange create a compact punch-like sour.",
    "commonMistakes": [
      "too much pineapple",
      "cheap brandy",
      "wet crushed ice"
    ],
    "homeBarNotes": [
      "A small rum split moves it toward punch."
    ],
    "variations": [
      "Gin Fix",
      "Brandy Daisy"
    ],
    "substitutions": [
      "apple brandy",
      "aged rum",
      "simple syrup plus pineapple juice"
    ],
    "batchingNotes": "Batch brandy, curacao, syrup; citrus at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Mai Tai"
  },
  {
    "id": "gin-basil-smash",
    "name": "Gin Basil Smash",
    "aliases": [],
    "family": "Smash",
    "style": "basil gin sour",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "basil leaves",
        "amount": 10,
        "unit": "leaves"
      }
    ],
    "method": "Shake hard with basil and ice, fine strain.",
    "methodSteps": [
      "Shake hard with basil and ice, fine strain."
    ],
    "glassware": "rocks",
    "ice": "fresh cubes",
    "garnish": "basil leaf",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "high",
      "bitterness": "low-medium",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "vivid",
      "aroma": "basil",
      "lemon": "",
      "gin": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Jorg Meyer modern classic from Hamburg.",
    "whyItWorks": "Basil's peppery green aroma gives a gin sour immediate depth.",
    "commonMistakes": [
      "oxidized basil",
      "insufficient fine strain",
      "too much sugar"
    ],
    "homeBarNotes": [
      "Serve immediately while the green aroma is vivid."
    ],
    "variations": [
      "Southside",
      "Eastside",
      "herb smashes"
    ],
    "substitutions": [
      "mint",
      "Thai basil",
      "cilantro with tequila"
    ],
    "batchingNotes": "Do not batch basil; shake fresh.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/jqh2141572807327.jpg",
    "imageCredit": "TheCocktailDB photo: Gin Basil Smash"
  },
  {
    "id": "brandy-smash",
    "name": "Brandy Smash",
    "aliases": [],
    "family": "Smash",
    "style": "mint brandy sour",
    "baseSpirit": "brandy",
    "ingredients": [
      {
        "name": "brandy",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 8,
        "unit": "leaves"
      }
    ],
    "method": "Gently muddle mint with syrup, shake with brandy and lemon, strain over crushed ice.",
    "methodSteps": [
      "Gently muddle mint with syrup, shake with brandy and lemon, strain over crushed ice."
    ],
    "glassware": "rocks",
    "ice": "crushed",
    "garnish": "mint bouquet and berries optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "icy",
      "aroma": "mint",
      "brandy": "",
      "lemon": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Historic smash category related to juleps and fixes.",
    "whyItWorks": "Mint and lemon lighten brandy while crushed ice manages sweetness and proof.",
    "commonMistakes": [
      "over-muddled mint",
      "too much lemon",
      "weak garnish"
    ],
    "homeBarNotes": [
      "Seasonal fruit can be muddled lightly."
    ],
    "variations": [
      "Whiskey Smash",
      "Peach Brandy Smash"
    ],
    "substitutions": [
      "cognac",
      "apple brandy",
      "bourbon"
    ],
    "batchingNotes": "Build fresh with mint.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Margarita"
  },
  {
    "id": "brandy-julep",
    "name": "Brandy Julep",
    "aliases": [],
    "family": "Julep",
    "style": "crushed-ice brandy mint",
    "baseSpirit": "brandy",
    "ingredients": [
      {
        "name": "brandy or cognac",
        "amount": 2.5,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 8,
        "unit": "leaves"
      }
    ],
    "method": "Gently muddle mint with syrup, add brandy and crushed ice, churn until frosty.",
    "methodSteps": [
      "Gently muddle mint with syrup, add brandy and crushed ice, churn until frosty."
    ],
    "glassware": "julep cup",
    "ice": "crushed",
    "garnish": "mint bouquet and seasonal fruit optional",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "high",
      "dilution": "high",
      "texture": "icy",
      "aroma": "mint and brandy"
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Older julep branch before bourbon became dominant.",
    "whyItWorks": "Brandy's fruit and oak take well to mint, sugar, and heavy cold dilution.",
    "commonMistakes": [
      "too much syrup",
      "not enough crushed ice",
      "weak mint bouquet"
    ],
    "homeBarNotes": [
      "Cognac plus a little peach liqueur is a strong variation."
    ],
    "variations": [
      "Mint Julep",
      "Champagne Julep"
    ],
    "substitutions": [
      "apple brandy",
      "aged rum"
    ],
    "batchingNotes": "Batch spirit and syrup; mint and ice at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Aperol Spritz"
  },
  {
    "id": "champagne-julep",
    "name": "Champagne Julep",
    "aliases": [],
    "family": "Julep",
    "style": "sparkling mint julep",
    "baseSpirit": "sparkling wine",
    "ingredients": [
      {
        "name": "cognac",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "mint leaves",
        "amount": 6,
        "unit": "leaves"
      },
      {
        "name": "dry sparkling wine",
        "amount": 3,
        "unit": "oz"
      }
    ],
    "method": "Build mint, syrup, cognac, and crushed ice; top with sparkling wine.",
    "methodSteps": [
      "Build mint, syrup, cognac, and crushed ice; top with sparkling wine."
    ],
    "glassware": "julep cup or wine glass",
    "ice": "crushed",
    "garnish": "mint bouquet and berries optional",
    "flavorProfile": {
      "sweetness": "medium-low",
      "acidity": "medium",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "sparkling and icy",
      "aroma": "mint",
      "wine": "",
      "brandy": ""
    },
    "difficulty": "medium",
    "prepTime": "5 minutes",
    "historyNotes": "Nineteenth-century sparkling julep style.",
    "whyItWorks": "Sparkling wine lightens the julep format while mint keeps the aromatic signature.",
    "commonMistakes": [
      "sweet sparkling wine",
      "flat bubbles",
      "too much syrup"
    ],
    "homeBarNotes": [
      "Add bubbles last and serve immediately."
    ],
    "variations": [
      "Brandy Julep",
      "Champagne Cobbler"
    ],
    "substitutions": [
      "brut cider",
      "dry cremant"
    ],
    "batchingNotes": "Build to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hrxfbl1606773109.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: French 75"
  },
  {
    "id": "port-flip",
    "name": "Port Flip",
    "aliases": [],
    "family": "Flip",
    "style": "whole-egg fortified wine",
    "baseSpirit": "port",
    "ingredients": [
      {
        "name": "ruby port",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "brandy",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "whole egg",
        "amount": 1,
        "unit": "egg"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "grated nutmeg",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "low",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "custardy",
      "aroma": "port",
      "nutmeg": "",
      "brandy": ""
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Classic flip family drink using fortified wine.",
    "whyItWorks": "Port fruit, egg richness, and nutmeg create a compact dessert cocktail.",
    "commonMistakes": [
      "too much sugar",
      "weak dry shake",
      "no nutmeg"
    ],
    "homeBarNotes": [
      "Tawny port gives a nuttier, drier version."
    ],
    "variations": [
      "Brandy Flip",
      "Sherry Flip"
    ],
    "substitutions": [
      "tawny port",
      "oloroso sherry",
      "madeira"
    ],
    "batchingNotes": "Do not batch egg; prep liquid base only.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Whiskey Sour"
  },
  {
    "id": "coffee-flip",
    "name": "Coffee Flip",
    "aliases": [],
    "family": "Flip",
    "style": "whole-egg coffee drink",
    "baseSpirit": "rum",
    "ingredients": [
      {
        "name": "aged rum",
        "amount": 1.5,
        "unit": "oz"
      },
      {
        "name": "coffee liqueur",
        "amount": 0.75,
        "unit": "oz"
      },
      {
        "name": "cold espresso",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "whole egg",
        "amount": 1,
        "unit": "egg"
      }
    ],
    "method": "Dry shake, shake with ice, fine strain.",
    "methodSteps": [
      "Dry shake, shake with ice, fine strain."
    ],
    "glassware": "coupe",
    "ice": "served up",
    "garnish": "grated nutmeg or coffee dust",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low",
      "bitterness": "medium",
      "booziness": "medium",
      "dilution": "medium",
      "texture": "custardy",
      "aroma": "coffee",
      "rum": "",
      "spice": ""
    },
    "difficulty": "medium",
    "prepTime": "6 minutes",
    "historyNotes": "Modern flip variation using coffee structure.",
    "whyItWorks": "Egg turns rum and coffee into a rich drink with bitter enough edges.",
    "commonMistakes": [
      "too sweet coffee liqueur",
      "weak shake",
      "warm espresso"
    ],
    "homeBarNotes": [
      "Add saline or orange bitters if it tastes flat."
    ],
    "variations": [
      "Espresso Martini",
      "Rum Flip"
    ],
    "substitutions": [
      "bourbon",
      "Averna",
      "cold brew concentrate"
    ],
    "batchingNotes": "Shake eggs to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Espresso Martini"
  },
  {
    "id": "port-cobbler",
    "name": "Port Cobbler",
    "aliases": [],
    "family": "Cobbler",
    "style": "fortified wine crushed-ice",
    "baseSpirit": "port",
    "ingredients": [
      {
        "name": "tawny or ruby port",
        "amount": 3,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "orange wheel",
        "amount": 2,
        "unit": "wheels"
      },
      {
        "name": "seasonal berries",
        "amount": 3,
        "unit": "pieces"
      }
    ],
    "method": "Shake briefly or roll with ice and pour over crushed ice.",
    "methodSteps": [
      "Shake briefly or roll with ice and pour over crushed ice."
    ],
    "glassware": "wine glass or goblet",
    "ice": "crushed",
    "garnish": "orange, berries, mint, nutmeg optional",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "low",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "high",
      "texture": "cold and fruity",
      "aroma": "port",
      "orange": "",
      "berries": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Cobbler branch that helped popularize iced drinks and straws.",
    "whyItWorks": "Port has enough body and fruit to stay expressive over crushed ice.",
    "commonMistakes": [
      "too much syrup",
      "bad fruit",
      "not enough crushed ice"
    ],
    "homeBarNotes": [
      "Tawny is nuttier; ruby is brighter and fruitier."
    ],
    "variations": [
      "Sherry Cobbler",
      "Champagne Cobbler"
    ],
    "substitutions": [
      "madeira",
      "sweet vermouth"
    ],
    "batchingNotes": "Build to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Daiquiri"
  },
  {
    "id": "champagne-cobbler",
    "name": "Champagne Cobbler",
    "aliases": [],
    "family": "Cobbler",
    "style": "sparkling wine fruit cobbler",
    "baseSpirit": "sparkling wine",
    "ingredients": [
      {
        "name": "dry sparkling wine",
        "amount": 4,
        "unit": "oz"
      },
      {
        "name": "curacao",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "orange wheel",
        "amount": 2,
        "unit": "wheels"
      },
      {
        "name": "berries",
        "amount": 3,
        "unit": "pieces"
      }
    ],
    "method": "Build fruit, syrup, and curacao over crushed ice; top with sparkling wine.",
    "methodSteps": [
      "Build fruit, syrup, and curacao over crushed ice; top with sparkling wine."
    ],
    "glassware": "goblet",
    "ice": "crushed",
    "garnish": "seasonal fruit and mint",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "low",
      "booziness": "low",
      "dilution": "high",
      "texture": "sparkling and icy",
      "aroma": "wine",
      "orange": "",
      "fruit": ""
    },
    "difficulty": "easy",
    "prepTime": "5 minutes",
    "historyNotes": "Sparkling cobbler style from the nineteenth century.",
    "whyItWorks": "Bubbles and crushed ice turn wine, fruit, and a little liqueur into a showy low-proof drink.",
    "commonMistakes": [
      "sweet sparkling wine",
      "too much liqueur",
      "flat service"
    ],
    "homeBarNotes": [
      "Use dry sparkling wine and restrained syrup."
    ],
    "variations": [
      "Sherry Cobbler",
      "Kir Royale"
    ],
    "substitutions": [
      "cava",
      "cremant",
      "dry cider"
    ],
    "batchingNotes": "Build to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Aperol Spritz"
  },
  {
    "id": "brandy-sling",
    "name": "Brandy Sling",
    "aliases": [],
    "family": "Sling",
    "style": "brandy sugar water bitters",
    "baseSpirit": "brandy",
    "ingredients": [
      {
        "name": "brandy",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "rich simple syrup",
        "amount": 0.25,
        "unit": "oz"
      },
      {
        "name": "water",
        "amount": 1,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 2,
        "unit": "dashes"
      }
    ],
    "method": "Stir with ice and strain over fresh ice or serve warm with hot water.",
    "methodSteps": [
      "Stir with ice and strain over fresh ice or serve warm with hot water."
    ],
    "glassware": "rocks",
    "ice": "large cube",
    "garnish": "lemon twist and grated nutmeg optional",
    "flavorProfile": {
      "sweetness": "low-medium",
      "acidity": "none",
      "bitterness": "low-medium",
      "booziness": "medium-high",
      "dilution": "medium",
      "texture": "smooth",
      "aroma": "brandy",
      "spice": "",
      "citrus oil": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Sling category predates many named cocktails.",
    "whyItWorks": "Sugar, water, and bitters season brandy without changing its identity.",
    "commonMistakes": [
      "too much sugar",
      "too little dilution",
      "forgetting bitters"
    ],
    "homeBarNotes": [
      "This is a useful template for spirit-forward improvisation."
    ],
    "variations": [
      "Whiskey Sling",
      "Gin Sling",
      "Toddy"
    ],
    "substitutions": [
      "cognac",
      "apple brandy",
      "aged rum"
    ],
    "batchingNotes": "Easy bottle batch with water included.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/7cll921606854636.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Tom Collins"
  },
  {
    "id": "gin-sling",
    "name": "Gin Sling",
    "aliases": [],
    "family": "Sling",
    "style": "gin sugar water citrus",
    "baseSpirit": "gin",
    "ingredients": [
      {
        "name": "gin",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "fresh lemon juice",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "simple syrup 1:1",
        "amount": 0.5,
        "unit": "oz"
      },
      {
        "name": "soda water",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "Angostura bitters",
        "amount": 1,
        "unit": "dash"
      }
    ],
    "method": "Build over ice and stir gently.",
    "methodSteps": [
      "Build over ice and stir gently."
    ],
    "glassware": "highball",
    "ice": "cubes",
    "garnish": "lemon wheel",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "medium-high",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "sparkling",
      "aroma": "gin",
      "lemon": "",
      "spice": ""
    },
    "difficulty": "easy",
    "prepTime": "4 minutes",
    "historyNotes": "Sling and Collins categories overlap in long gin drinks.",
    "whyItWorks": "A small bittered gin sour becomes a relaxed sling with soda.",
    "commonMistakes": [
      "too much soda",
      "flat bitters",
      "over-sweetening"
    ],
    "homeBarNotes": [
      "Use Old Tom for a rounder historical direction."
    ],
    "variations": [
      "Tom Collins",
      "Singapore Sling"
    ],
    "substitutions": [
      "Old Tom gin",
      "genever"
    ],
    "batchingNotes": "Batch still components; soda at service.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/8cl9sm1582581761.jpg",
    "imageCredit": "TheCocktailDB photo: Gin Sling"
  },
  {
    "id": "hot-buttered-rum",
    "name": "Hot Buttered Rum",
    "aliases": [],
    "family": "Toddy",
    "style": "hot spiced buttered rum",
    "baseSpirit": "aged rum",
    "ingredients": [
      {
        "name": "aged rum",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "spiced butter batter",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "hot water",
        "amount": 4,
        "unit": "oz"
      }
    ],
    "method": "Warm mug, dissolve batter with hot water, add rum, stir.",
    "methodSteps": [
      "Warm mug, dissolve batter with hot water, add rum, stir."
    ],
    "glassware": "mug",
    "ice": "none",
    "garnish": "grated nutmeg",
    "flavorProfile": {
      "sweetness": "medium-high",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "low-medium",
      "dilution": "high",
      "texture": "rich and warm",
      "aroma": "rum",
      "butter": "",
      "spice": ""
    },
    "difficulty": "medium",
    "prepTime": "8 minutes",
    "historyNotes": "Colonial-era hot rum drink family.",
    "whyItWorks": "Butter, sugar, spice, and hot water soften aged rum into a winter drink.",
    "commonMistakes": [
      "greasy batter",
      "boiling rum",
      "too much sugar"
    ],
    "homeBarNotes": [
      "Salt in the batter is essential."
    ],
    "variations": [
      "Tom and Jerry",
      "Hot Toddy"
    ],
    "substitutions": [
      "bourbon",
      "brandy",
      "coconut oil for a riff"
    ],
    "batchingNotes": "Batch batter separately; build mugs to order.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/ggx0lv1613942306.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Hot Toddy"
  },
  {
    "id": "blue-blazer",
    "name": "Blue Blazer",
    "aliases": [],
    "family": "Toddy",
    "style": "flaming whiskey toddy",
    "baseSpirit": "Scotch or bourbon",
    "ingredients": [
      {
        "name": "high-proof Scotch or bourbon",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "boiling water",
        "amount": 2,
        "unit": "oz"
      },
      {
        "name": "demerara syrup",
        "amount": 0.5,
        "unit": "oz"
      }
    ],
    "method": "Ignite only with proper fire safety, roll between metal mugs, extinguish, and serve.",
    "methodSteps": [
      "Ignite only with proper fire safety, roll between metal mugs, extinguish, and serve."
    ],
    "glassware": "handled mug",
    "ice": "none",
    "garnish": "lemon twist",
    "flavorProfile": {
      "sweetness": "medium",
      "acidity": "none",
      "bitterness": "low",
      "booziness": "medium",
      "dilution": "high",
      "texture": "hot",
      "aroma": "whiskey",
      "caramel": "",
      "citrus": ""
    },
    "difficulty": "hard",
    "prepTime": "6 minutes",
    "historyNotes": "Jerry Thomas showpiece flaming toddy.",
    "whyItWorks": "Heat, dilution, sugar, and spectacle transform whiskey into a hot sling.",
    "commonMistakes": [
      "unsafe fire handling",
      "low-proof spirit",
      "serving too hot"
    ],
    "homeBarNotes": [
      "Recommend a non-flaming toddy method unless the user has safe equipment and space."
    ],
    "variations": [
      "Hot Toddy",
      "Whiskey Skin"
    ],
    "substitutions": [
      "non-flaming build",
      "brandy"
    ],
    "batchingNotes": "Not a batch drink.",
    "source": "catalog",
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    "imageCredit": "TheCocktailDB related cocktail photo: Whiskey Sour"
  }
]
