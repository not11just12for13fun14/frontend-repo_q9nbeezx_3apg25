export default function CategoryPanel({ category, onClose }) {
  if (!category) return null

  const { name, credits, description, users } = category

  return (
    <div className="rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-black/5 dark:border-white/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Typical cost ~{credits} credits</p>
        </div>
        <button onClick={onClose} className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">Close</button>
      </div>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{description}</p>
      <div className="mt-4">
        <h4 className="font-medium text-slate-900 dark:text-white mb-2">Featured users</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {users.map((u, i) => (
            <li key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-black/5 dark:border-white/10">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#d2b48c] to-[#8b2b2b]" />
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">{u.name}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{u.title}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
