# Cocktail Colleague — Premium Home Bar Companion & Technique Workbook

Welcome to **Cocktail Colleague**, a high-end, local-first web application designed for home bartenders to organize recipes, track ingredients, scale batch planner recipes, diagnose beverage balance, and practice cocktail techniques. 

Built with **React 19, TypeScript, and Vite**, it operates completely in-browser with zero servers or trackers, saving all modifications securely to `localStorage`.

---

## Key Features

### 1. Minimalist Split-Pane Dashboard
- **01 / Explore Catalog**: Quick navigation over curated house specs, custom tiles, and bookmarks.
- **02 / Barshelf & Stock**: Direct overview of stock statistics, low stock ingredients, and smart suggestions.
- **03 / Recipe Creator**: A fully structured editor to create and save custom local specs.
- **04 / Data Center**: Clear metrics of saved data, reset option, and JSON import/export support.

### 2. Interactive Practice Lab
- **Cocktail Build Coach**: Adapts to the loaded spec, providing interactive checkboxes for glass prepping, mise en place, correct measuring order, technique execution, and garnish finishing.
- **Technique Timer**: Automatically identifies the recipe's method (e.g. 12s shake, 30s stir, 20s swizzle) with countup/countdown support, visual SVG ring progress, and native Web Audio synthesized beeps upon completion.
- **Tasting Logger**: Track star ratings (1-5) and write sensory tasting notes (texture, dilution, aroma).
- **Timeline History**: Renders a localized training log showing your progression on the selected spec.

### 3. Smart Search & Explanations
- **Compound AND Filter**: Handles unordered search terms (e.g. searching "pineapple rum" matches recipes containing both keywords anywhere in their attributes).
- **Explainer Badges**: Shows how query matches relate to base spirits or ingredients:
  * *Example: `Matched via spirit ("dark rum") + ingredient ("pineapple juice")`*

### 4. Interactive Tasting Radar Charts
- Dynamic, SVG-based radial diamond chart highlighting flavor levels (*sweetness, acidity, bitterness, booziness*). Includes responsive hover tooltip annotations.

### 5. Alternate Ingredient Substitutions
- Accordion-style inline drawer for missing bottles, suggesting matched alternatives based on predefined database categories (e.g., swapping Aperol for Campari).

### 6. Pro Batch Planner & Dilution Solver
- Auto-scales base ingredients for up to 300 servings.
- Automatically computes pre-dilution water targets, bottle counts, average strength (ABV), shelf life, and prep cautions based on the recipe's family and contents.

---

## Tech Stack & Design Architecture

- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: Modern, premium Vanilla CSS with custom properties, translucent glassmorphism overlays, radial glowing spotlight backdrops, and Outfit + Plus Jakarta Sans typography.
- **State & Storage**: Stateful context with reactive state storage. JSON export and import schema (Version 3) keeps backups completely safe.
- **Icons**: Lucide React.
- **Zero-Dependency Sound**: Synthesized sound alerts using the HTML5 `AudioContext` API.

---

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone or download the repository:
   ```bash
   git clone https://github.com/UZUB18/cocktail_app.git
   ```
2. Navigate into the folder:
   ```bash
   cd cocktail
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the local dev environment with HMR:
```bash
npm run dev
```

### Production Build
Build and optimize the application assets:
```bash
npm run build
```
Vite compiles all TS/React components and compiles them into static files inside the `dist/` directory, ready for rapid hosting.
