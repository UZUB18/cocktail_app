import { Plus } from 'lucide-react'

type Props = { onAdd: () => void; placeholder: string; setValue: (v: string) => void; value: string }
export function InlineAdder({ onAdd, placeholder, setValue, value }: Props) {
  return (
    <label className="inline-adder">
      <input
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onAdd()
        }}
        placeholder={placeholder}
        value={value}
      />
      <button onClick={onAdd}>
        <Plus size={16} />
      </button>
    </label>
  )
}