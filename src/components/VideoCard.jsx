import { useEffect, useRef, useState } from 'react'
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from 'lucide-react'

export default function VideoCard({ src, caption, hashtags = [], likes = 0, onLike, onComment, onShare }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (isInView) {
      el.play().catch(() => {})
    } else {
      el.pause()
      el.currentTime = 0
    }
  }, [isInView])

  return (
    <div className="w-full max-w-xl mx-auto bg-white/70 dark:bg-black/40 backdrop-blur rounded-2xl shadow-sm overflow-hidden border border-black/5 dark:border-white/5">
      <div className="relative">
        <video ref={videoRef} src={src} muted={muted} loop playsInline className="w-full max-h-[70vh] object-cover" />
        <button onClick={() => setMuted(!muted)} className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white">
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      <div className="p-4">
        {caption && <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">{caption}</p>}
        {hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
            {hashtags.map((h, i) => (
              <span key={i}>#{h}</span>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center gap-4">
          <button onClick={onLike} className="inline-flex items-center gap-1 text-pink-600 hover:opacity-80">
            <Heart size={18} /> <span className="text-sm">{likes}</span>
          </button>
          <button onClick={onComment} className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:opacity-80">
            <MessageCircle size={18} /> <span className="text-sm">Comment</span>
          </button>
          <button onClick={onShare} className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:opacity-80 ml-auto">
            <Share2 size={18} /> <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}
