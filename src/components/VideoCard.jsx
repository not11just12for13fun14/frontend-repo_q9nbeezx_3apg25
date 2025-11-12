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
    <div className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden border backdrop-blur-sm bg-[#fff7ed]/80 dark:bg-[#1b0f0f]/60 border-[#7f1d1d]/10 dark:border-[#d2b48c]/10 shadow-[0_6px_24px_rgba(127,29,29,0.08)] dark:shadow-[0_6px_24px_rgba(210,180,140,0.08)]">
      <div className="relative">
        <video ref={videoRef} src={src} muted={muted} loop playsInline className="w-full max-h-[70vh] object-cover" />
        <button
          onClick={() => setMuted(!muted)}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#7f1d1d]/70 text-white border border-white/10 hover:bg-[#661616]/80 focus:outline-none focus:ring-2 focus:ring-[#d2b48c]/50"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      <div className="p-4">
        {caption && <p className="text-sm text-[#3a1a1a] dark:text-[#fbe9d2] mb-2">{caption}</p>}
        {hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            {hashtags.map((h, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full bg-[#fae8d7] text-[#7f1d1d] dark:bg-[#2a1515] dark:text-[#efd9c2] border border-[#7f1d1d]/10 dark:border-[#d2b48c]/10"
              >
                #{h}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={onLike}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7f1d1d] to-[#9a3838] text-white shadow hover:brightness-110 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#d2b48c]/50"
          >
            <Heart size={18} /> <span className="text-sm">{likes}</span>
          </button>
          <button
            onClick={onComment}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#7f1d1d]/20 dark:border-[#d2b48c]/20 text-[#7f1d1d] dark:text-[#d2b48c] hover:bg-[#fae8d7] dark:hover:bg-[#2a1515] focus:outline-none focus:ring-2 focus:ring-[#d2b48c]/40"
          >
            <MessageCircle size={18} /> <span className="text-sm">Comment</span>
          </button>
          <button
            onClick={onShare}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#7f1d1d] dark:text-[#d2b48c] hover:bg-[#fae8d7] dark:hover:bg-[#2a1515] border border-transparent hover:border-[#7f1d1d]/20 dark:hover:border-[#d2b48c]/20 focus:outline-none focus:ring-2 focus:ring-[#d2b48c]/40"
          >
            <Share2 size={18} /> <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}
