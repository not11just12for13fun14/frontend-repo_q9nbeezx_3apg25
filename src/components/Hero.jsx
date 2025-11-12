import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[48vh] sm:h-[56vh] md:h-[62vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Maroon → Tan overlay to match header theme and flow into sidebar */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top overlay for hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#7f1d1d]/30 via-[#8b2b2b]/25 to-transparent dark:from-[#2a0f10]/50 dark:via-[#40191a]/45 dark:to-transparent" />
        {/* Bottom feather that transitions into the sidebar cards */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#fff7ed]/50 to-[#fff7ed] dark:via-[#1b0f0f]/40 dark:to-[#1b0f0f]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-end pb-8">
        <div className="backdrop-blur-sm bg-[#fff7ed]/70 dark:bg-[#1b0f0f]/60 rounded-2xl p-4 md:p-6 border border-[#7f1d1d]/10 dark:border-[#d2b48c]/10 shadow-[0_8px_32px_rgba(127,29,29,0.08)] dark:shadow-[0_8px_32px_rgba(210,180,140,0.08)]">
          <h1 className="text-2xl md:text-4xl font-semibold text-[#3a1a1a] dark:text-[#fbe9d2]">The Hustle Network</h1>
          <p className="mt-2 max-w-2xl text-[#593333] dark:text-[#efd9c2] text-sm md:text-base">
            Exchange and learn real skills without money. Use daily credits to access courses across Entertainment, Trades, Regulation, NetWork, and Education.
          </p>
        </div>
      </div>
    </section>
  )
}
