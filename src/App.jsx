import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoCard from './components/VideoCard'
import UploadDialog from './components/UploadDialog'
import CategoryPanel from './components/CategoryPanel'

function useTheme() {
  const [dark, setDark] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])
  return { dark, setDark }
}

export default function App() {
  const { dark, setDark } = useTheme()
  const backend = import.meta.env.VITE_BACKEND_URL
  const [uploadOpen, setUploadOpen] = useState(false)
  const [reels, setReels] = useState([])
  const [searchResults, setSearchResults] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const palette = useMemo(() => ({
    bg: dark ? 'bg-gradient-to-b from-[#070B14] via-[#0B1324] to-black' : 'bg-gradient-to-b from-[#F4F1FA] via-[#F0FFF9] to-[#FFF9F2]',
  }), [dark])

  const categories = [
    {
      id: 'entertainment',
      name: 'Entertainment',
      credits: 10,
      description: 'Creators, editors, performers, and storytellers. Learn short-form video, music production, comedy writing, or partner with a creative pro for your next project.' ,
      users: [
        { name: 'Nova Quinn', title: 'Video Editor • CapCut/DaVinci' },
        { name: 'Milo Reyes', title: 'Sound Designer • Podcast Intros' },
        { name: 'Aria Bloom', title: 'Short-form Coach • TikTok/IG' },
        { name: 'Jett Kai', title: 'Motion Graphics • After Effects' },
      ],
    },
    {
      id: 'trades',
      name: 'Trades',
      credits: 45,
      description: 'Hands-on skills and certifications. Learn electrical basics, HVAC troubleshooting, or get matched with a mentor for real-world project guidance.',
      users: [
        { name: 'Riley Hart', title: 'Electrician • Residential' },
        { name: 'Samir Patel', title: 'HVAC Tech • Diagnostics' },
        { name: 'June Park', title: 'Carpentry • DIY Builds' },
        { name: 'Olivia Knox', title: 'Plumbing • Fixtures & PEX' },
      ],
    },
    {
      id: 'regulation',
      name: 'Regulation',
      credits: 20,
      description: 'Navigate compliance, permits, and policies. Get clarity on contracts, licensing, and operational best practices for small teams.',
      users: [
        { name: 'Alex Rivera', title: 'Paralegal • Contracts' },
        { name: 'Nina Zhou', title: 'Compliance • Data & Privacy' },
        { name: 'Marcus Lee', title: 'Permit Specialist • Local Gov' },
      ],
    },
    {
      id: 'network',
      name: 'NetWork',
      credits: 40,
      description: 'Grow your circle and collaborate. Learn outreach frameworks, cold DM etiquette, and how to present your work to land partnerships.',
      users: [
        { name: 'Tess Morgan', title: 'Community Builder' },
        { name: 'Diego Flores', title: 'Growth • Partnerships' },
        { name: 'Ivy Chen', title: 'Brand Collabs • UGC' },
      ],
    },
    {
      id: 'education',
      name: 'Education',
      credits: 20,
      description: 'Level up fast with structured micro-courses. From spreadsheets to storytelling—practical lessons you can apply in days, not months.',
      users: [
        { name: 'Yara Sol', title: 'Data • Sheets & Dashboards' },
        { name: 'Noah Brooks', title: 'Copywriting • Hooks & CTAs' },
        { name: 'Mina Cho', title: 'Design • Brand Systems' },
      ],
    },
  ]

  const fetchReels = async () => {
    const res = await fetch(`${backend}/api/reels`)
    const data = await res.json()
    setReels(data)
  }

  useEffect(() => { fetchReels() }, [])

  const handleSearch = async (q) => {
    if (!q) { setSearchResults(null); return }
    const res = await fetch(`${backend}/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setSearchResults(data)
  }

  return (
    <div className={`${palette.bg} min-h-screen transition-colors duration-500`}>
      <Navbar onToggleTheme={() => setDark(v => !v)} dark={dark} onOpenUpload={() => setUploadOpen(true)} onSearch={handleSearch} />
      <Hero />

      {/* Feed */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {reels.map((r) => (
              <motion.div key={r._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                <VideoCard
                  src={r.video_url}
                  caption={r.caption}
                  hashtags={r.hashtags}
                  likes={r.likes}
                  onLike={async () => {
                    await fetch(`${backend}/api/reels/${r._id}/like`, { method: 'POST' })
                    fetchReels()
                  }}
                  onComment={() => prompt('Add a comment coming soon')}
                  onShare={() => navigator.share?.({ title: 'Hustle Reel', url: window.location.href }).catch(() => {})}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <section className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-black/5 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What It Is</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">The Hustle Network lets people exchange or learn skills without money using a simple daily credit system.</p>
          </section>
          <section className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-black/5 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">How It Works</h3>
            <ul className="text-sm text-slate-700 dark:text-slate-300 list-disc ml-5 space-y-1">
              <li>Daily credits to learn or exchange skills</li>
              <li>Exchange costs fewer credits</li>
              <li>Vendors can set one-time or subscription pricing</li>
            </ul>
          </section>
          <section className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-black/5 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Categories</h3>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveCategory(c)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between"
                  >
                    <span>{c.name} (~{c.credits} credits)</span>
                    <span className="text-xs text-slate-500">View</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {activeCategory && (
            <CategoryPanel category={activeCategory} onClose={() => setActiveCategory(null)} />
          )}

          {searchResults && (
            <section className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-black/5 dark:border-white/10">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Search Results</h3>
              <ul className="space-y-2">
                {searchResults.map((r, i) => (
                  <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 mr-2">{r.type}</span>
                    {r.title}
                    {r.subtitle && <span className="text-slate-500 ml-2">{r.subtitle}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </main>

      <AnimatePresence>
        {uploadOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <UploadDialog open={uploadOpen} onClose={() => setUploadOpen(false)} onUploaded={() => fetchReels()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
