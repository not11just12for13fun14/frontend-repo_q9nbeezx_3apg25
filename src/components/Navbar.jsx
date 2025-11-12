import { useEffect, useState } from 'react'
import { Search, Sun, Moon, Upload } from 'lucide-react'

export default function Navbar({ onToggleTheme, dark, onOpenUpload, onSearch }) {
  const [q, setQ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(q)
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        <div className="font-semibold text-slate-900 dark:text-white">Hustle</div>
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users, tags, or topics"
            className="w-full pl-9 pr-3 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/10 focus:outline-none"
          />
        </form>
        <button onClick={onOpenUpload} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-300 to-teal-300 text-slate-900 dark:from-blue-600 dark:to-cyan-600 dark:text-white">
          <Upload size={16} /> Upload
        </button>
        <button onClick={onToggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
