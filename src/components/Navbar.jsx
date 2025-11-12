import { useState } from 'react'
import { Search, Sun, Moon, Upload } from 'lucide-react'

export default function Navbar({ onToggleTheme, dark, onOpenUpload, onSearch }) {
  const [q, setQ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(q)
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-gradient-to-b from-[#7f1d1d]/95 via-[#8b2b2b]/90 to-[#d2b48c]/85 border-b border-black/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Centered, bigger title */}
        <div className="flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-amber-50 drop-shadow-sm text-center">
            The Hustle Network
          </h1>
        </div>

        {/* Controls */}
        <div className="mt-3 flex items-center gap-3">
          <form onSubmit={handleSubmit} className="flex-1 relative max-w-2xl mx-auto w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-200/80" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users, tags, or topics"
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white/90 text-slate-800 border border-black/10 focus:outline-none placeholder-slate-500"
            />
          </form>
          <button
            onClick={onOpenUpload}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#d2b48c] to-[#b47b84] text-slate-900 hover:opacity-90"
          >
            <Upload size={16} /> Upload
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-white/90 text-slate-800 hover:opacity-90"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
