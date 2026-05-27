import { ChevronRight } from 'lucide-react'

type Props = { action: string; onAction: () => void; title: string }
export function SectionTitle({ action, onAction, title }: Props) {
  return (
    <div className="home-section-title">
      <h2>{title}</h2>
      <button onClick={onAction}>
        {action}
        <ChevronRight size={17} />
      </button>
    </div>
  )
}