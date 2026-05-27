import {
  Martini, Settings, ShoppingBag, ChevronRight, X,
  Home, Search, Shuffle, BottleWine, FlaskConical, Users, BookOpen, ClipboardList, Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { View } from '../types'

const navItems: { label: View; icon: LucideIcon }[] = [
  { label: 'Home / Command', icon: Home },
  { label: 'Search', icon: Search },
  { label: 'Recipes', icon: Martini },
  { label: 'Riffs & Variations', icon: Shuffle },
  { label: 'Inventory', icon: BottleWine },
  { label: 'Batch Planner', icon: FlaskConical },
  { label: 'Party Mode', icon: Users },
  { label: 'Collections', icon: BookOpen },
  { label: 'Practice Lab', icon: ClipboardList },
  { label: 'Troubleshoot', icon: Wrench },
]

type Props = {
  activeView: View
  collectionCount: number
  savedCount: number
  setActiveView: (view: View) => void
  shoppingCount: number
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Sidebar({
  activeView,
  collectionCount,
  savedCount,
  setActiveView,
  shoppingCount,
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-visible' : ''}`}>
      <div className="brand">
        <Martini size={34} strokeWidth={1.6} />
        <div>
          <span>Cocktail</span>
          <span>Colleague</span>
        </div>
        <button className="sidebar-close-btn" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="nav-list" aria-label="Primary">
        {navItems.map((item) => (
          <button
            className={`nav-item ${activeView === item.label ? 'active' : ''}`}
            key={item.label}
            onClick={() => setActiveView(item.label)}
          >
            <item.icon size={20} strokeWidth={1.7} />
            <span>{item.label}</span>
            {item.label === 'Collections' && collectionCount > 0 && <b>{collectionCount}</b>}
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <button className="nav-item muted" onClick={() => setActiveView('Inventory')}>
        <ShoppingBag size={19} strokeWidth={1.7} />
        <span>Shopping List</span>
        <b>{shoppingCount}</b>
      </button>
      <button className="nav-item muted" onClick={() => setActiveView('Home / Command')}>
        <Settings size={19} strokeWidth={1.7} />
        <span>Local Storage</span>
      </button>

      <div className="profile-card">
        <span className="avatar">AJ</span>
        <div>
          <strong>Alex</strong>
          <span>{savedCount} saved specs</span>
        </div>
        <ChevronRight size={16} />
      </div>

      <div className="today-card">
        <span>Local DB</span>
        <strong>Browser storage</strong>
        <div className="mini-drink" />
      </div>
    </aside>
  )
}