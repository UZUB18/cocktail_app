import { Trash2 } from 'lucide-react'
import type { StockStatus } from '../types'

type Props = {
  items: string[]
  onRemove: (item: string) => void
  onStatusChange?: (item: string, status: StockStatus) => void
  statuses?: Record<string, StockStatus>
}
export function PillList({ items, onRemove, onStatusChange, statuses }: Props) {
  return (
    <div className="pill-list">
      {items.map((item) => (
        <span className={`pill-item ${statuses?.[item] ?? ''}`} key={item}>
          <b>{item}</b>
          {onStatusChange && (
            <select
              aria-label={`${item} stock status`}
              onChange={(event) => onStatusChange(item, event.target.value as StockStatus)}
              value={statuses?.[item] ?? 'full'}
            >
              <option value="full">Full</option>
              <option value="low">Low</option>
              <option value="empty">Empty</option>
            </select>
          )}
          <button aria-label={`Remove ${item}`} onClick={() => onRemove(item)}>
            <Trash2 size={13} />
          </button>
        </span>
      ))}
    </div>
  )
}