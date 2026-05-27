import { Wine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Meta component
type MetaProps = { icon: LucideIcon; label: string; value: string }
export function Meta({ icon: Icon, label, value }: MetaProps) {
  return (
    <div className="meta-item">
      <Icon size={22} strokeWidth={1.7} />
      <span>{label}</span>
      <strong>{value || 'Flexible'}</strong>
    </div>
  )
}

type StatProps = { label: string; value: string }
export function Stat({ label, value }: StatProps) {
  return (
    <div className="stat">
      <Wine size={18} />
      <span>{label}</span>
      <strong>{value || 'House choice'}</strong>
    </div>
  )
}