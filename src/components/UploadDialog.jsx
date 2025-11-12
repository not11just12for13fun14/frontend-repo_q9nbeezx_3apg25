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
      <div className="w-full max-w-md rounded-2xl p-4 border backdrop-blur-sm bg-[#fff7ed]/90 dark:bg-[#1b0f0f]/80 border-[#7f1d1d]/10 dark:border-[#d2b48c]/10">
        <div className="text-lg font-semibold mb-3 text-[#3a1a1a] dark:text-[#fbe9d2]">Upload Reel</div>
        <div className="space-y-3">
          <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" className="w-full px-3 py-2 rounded-md bg-[#fae8d7] dark:bg-[#2a1515] text-[#3a1a1a] dark:text-[#efd9c2] border border-[#7f1d1d]/10 dark:border-[#d2b48c]/10" />
          <input value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="Hashtags (comma separated)" className="w-full px-3 py-2 rounded-md bg-[#fae8d7] dark:bg-[#2a1515] text-[#3a1a1a] dark:text-[#efd9c2] border border-[#7f1d1d]/10 dark:border-[#d2b48c]/10" />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-md border border-[#7f1d1d]/20 dark:border-[#d2b48c]/20 text-[#7f1d1d] dark:text-[#d2b48c] hover:bg-[#fae8d7] dark:hover:bg-[#2a1515]">Cancel</button>
            <button disabled={loading || !file} onClick={handleUpload} className="px-3 py-1.5 rounded-md bg-gradient-to-r from-[#7f1d1d] to-[#9a3838] text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#d2b48c]/50">
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
