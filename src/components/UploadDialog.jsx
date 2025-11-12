import { useState } from 'react'

export default function UploadDialog({ open, onClose, onUploaded }) {
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL

  if (!open) return null

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('caption', caption)
      form.append('hashtags', hashtags)
      const res = await fetch(`${backend}/api/reels`, { method: 'POST', body: form })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      onUploaded?.(data)
      onClose?.()
      setFile(null)
      setCaption('')
      setHashtags('')
    } catch (e) {
      console.error(e)
      alert('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-4 border border-black/5 dark:border-white/10">
        <div className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Upload Reel</div>
        <div className="space-y-3">
          <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" className="w-full px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800" />
          <input value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="Hashtags (comma separated)" className="w-full px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800" />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-md bg-slate-200 dark:bg-slate-700">Cancel</button>
            <button disabled={loading || !file} onClick={handleUpload} className="px-3 py-1.5 rounded-md bg-gradient-to-r from-purple-300 to-teal-300 text-slate-900 dark:from-blue-600 dark:to-cyan-600 dark:text-white">
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
