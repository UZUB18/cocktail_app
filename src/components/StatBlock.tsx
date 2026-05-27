type Props = { label: string; value: string }
export function StatBlock({ label, value }: Props) {
  return (
    <div className="stat-block">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}