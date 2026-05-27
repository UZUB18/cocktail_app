import type { ReactNode } from 'react'
import type { CatalogCocktail } from '../data/catalog'
import type { IngredientCoverage } from '../types'
import { cocktailPhoto, calculateRelevanceReason } from '../utils'

type Props = {
  action?: ReactNode
  cocktail: CatalogCocktail
  coverage?: IngredientCoverage
  onOpen: (cocktail: CatalogCocktail) => void
  query?: string
}
export function CocktailCard({
  action,
  cocktail,
  coverage,
  onOpen,
  query,
}: Props) {
  const match = coverage ?? { score: 100, missing: [], substitutes: [], lowStock: [], emptyStock: [] }
  const matchReason = query ? calculateRelevanceReason(cocktail, query) : null
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
        {matchReason && <span className="match-reason-badge">{matchReason}</span>}
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