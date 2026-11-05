import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router'
import { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollRestoration } from '../../hooks/useScrollRestoration'

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
          className="flex-1"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
