export default function CategoryPanel({ category, onClose }) {
  if (!category) return null

  const { name, credits, description, users } = category

  return (
    <div className="rounded-2xl bg-[#fff7ed]/85 dark:bg-[#1b0f0f]/70 border border-[#7f1d1d]/10 dark:border-[#d2b48c]/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-[#3a1a1a] dark:text-[#fbe9d2]">{name}</h3>
          <p className="text-sm text-[#593333] dark:text-[#efd9c2]">Typical cost ~{credits} credits</p>
        </div>
        <button onClick={onClose} className="px-2 py-1 text-xs rounded-md bg-[#fae8d7] dark:bg-[#2a1515] text-[#7f1d1d] dark:text-[#d2b48c] border border-[#7f1d1d]/20 dark:border-[#d2b48c]/20">Close</button>
      </div>
      <p className="mt-3 text-sm text-[#593333] dark:text-[#efd9c2]">{description}</p>
      <div className="mt-4">
        <h4 className="font-medium text-[#3a1a1a] dark:text-[#fbe9d2] mb-2">Featured users</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {users.map((u, i) => (
            <li key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[#fff2e6] dark:bg-[#2a1515] border border-[#7f1d1d]/10 dark:border-[#d2b48c]/10">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#d2b48c] to-[#8b2b2b]" />
              <div>
                <div className="text-sm font-medium text-[#3a1a1a] dark:text-[#fbe9d2]">{u.name}</div>
                <div className="text-xs text-[#593333] dark:text-[#efd9c2]">{u.title}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
