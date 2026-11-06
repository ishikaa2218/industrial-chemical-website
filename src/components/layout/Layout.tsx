import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router'
import { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollRestoration } from '../../hooks/useScrollRestoration'
import { dur, ease } from '../../motion/tokens'

/** Keeps the outgoing page mounted during the exit animation. */
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

export function Layout() {
  const location = useLocation()
  const reduce = useReducedMotion()
  useScrollRestoration()

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded bg-forest px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          className={`flex-1 ${location.pathname === '/' ? '' : 'pt-[var(--header-h)]'}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: dur.swap, ease: ease.out } }}
          exit={{ opacity: 0, y: reduce ? 0 : -8, transition: { duration: 0.22, ease: ease.inOut } }}
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
