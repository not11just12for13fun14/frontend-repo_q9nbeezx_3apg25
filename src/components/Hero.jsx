import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[48vh] sm:h-[56vh] md:h-[62vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/40 via-white/30 to-white dark:from-slate-900/20 dark:via-slate-900/40 dark:to-slate-950"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-end pb-8">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-slate-900/40 rounded-2xl p-4 md:p-6 border border-black/5 dark:border-white/10">
          <h1 className="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-white">The Hustle Network</h1>
          <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200 text-sm md:text-base">
            Exchange and learn real skills without money. Use daily credits to access courses across Entertainment, Trades, Regulation, NetWork, and Education.
          </p>
        </div>
      </div>
    </section>
  )
}
