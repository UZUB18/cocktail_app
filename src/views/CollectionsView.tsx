import { type CatalogCocktail } from '../data/catalog'
import { ViewHeader } from '../components/ViewHeader'

export default function CollectionsView({
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