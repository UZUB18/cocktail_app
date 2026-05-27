import { useEffect } from 'react'

export type ShortcutHandlers = {
  onNewRecipe?: () => void
  onSave?: () => void
  onExport?: () => void
  onRandomizer?: () => void
  onInventory?: () => void
  onPracticeLab?: () => void
  onSearch?: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return

      switch (e.key.toLowerCase()) {
        case 'k':
          e.preventDefault()
          handlers.onSearch?.()
          break
        case 'n':
          e.preventDefault()
          handlers.onNewRecipe?.()
          break
        case 's':
          e.preventDefault()
          handlers.onSave?.()
          break
        case 'r':
          e.preventDefault()
          handlers.onRandomizer?.()
          break
        case 'e':
          e.preventDefault()
          handlers.onExport?.()
          break
        case 'i':
          e.preventDefault()
          handlers.onInventory?.()
          break
        case 'p':
          e.preventDefault()
          handlers.onPracticeLab?.()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [
    handlers.onNewRecipe,
    handlers.onSave,
    handlers.onRandomizer,
    handlers.onExport,
    handlers.onInventory,
    handlers.onPracticeLab,
    handlers.onSearch,
  ])
}