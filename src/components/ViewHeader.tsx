type Props = { eyebrow: string; title: string }
export function ViewHeader({ eyebrow, title }: Props) {
  return (
    <header className="view-header">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
    </header>
  )
}