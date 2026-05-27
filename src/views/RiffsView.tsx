import {} from 'react'
import { type CatalogCocktail } from '../data/catalog'
import '../utils'
import { ViewHeader } from '../components/ViewHeader'
import { CocktailCard } from '../components/CocktailCard'

export default function RiffsView({
  cocktails,
  eyebrow,
  onOpen,
  title,
}: {
  cocktails: CatalogCocktail[]
  eyebrow: string
  onOpen: (cocktail: CatalogCocktail) => void
  title: string
}) {
  return (
    <div className="page view-page">
      <ViewHeader eyebrow={eyebrow} title={title} />
      <div className="card-grid">
        {cocktails.map((cocktail) => (
          <CocktailCard cocktail={cocktail} key={cocktail.id} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}