import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { nav, site } from '../../data/site'
import { ease } from '../../motion/tokens'
import { LogoMark } from '../common/Logo'

/**
 * Full-width header. On the home page it sits transparently over the
 * full-bleed hero and turns solid once the visitor scrolls.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const overHero = pathname === '/' && !scrolled && !open

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const tone = overHero ? 'text-paper' : 'text-ink'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          overHero
            ? 'border-paper/15 bg-gradient-to-b from-black/35 to-transparent'
            : 'border-ink/10 bg-paper/88 backdrop-blur-md'
        }`}
      >
        <div className={`container-wide flex h-[var(--header-h)] items-center gap-6 ${tone} transition-colors duration-500`}>
          {/* Brand */}
          <Link to="/" aria-label={`${site.name} — home`} className="flex shrink-0 items-center gap-3">
            <span
              className={`grid size-9 place-items-center rounded-[3px] transition-colors duration-500 ${
                overHero ? 'bg-paper/12 text-paper' : 'bg-forest text-paper'
              }`}
            >
              <LogoMark className="size-[18px]" />
            </span>
            <span className="leading-none">
              <span className="block text-[16px] font-semibold tracking-[-0.02em] whitespace-nowrap">{site.name}</span>
              <span className={`label mt-1 hidden text-[9.5px] sm:block ${overHero ? 'text-paper/65' : 'text-ink-mute'}`}>
                {site.descriptor} · {site.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className="group relative flex items-baseline gap-1.5 px-3.5 py-2 text-[13.5px] font-medium"
              >
                {({ isActive }) => (
                  <>
                    <span className={`font-mono text-[10px] transition-colors duration-300 ${isActive ? 'text-copper' : 'opacity-45'}`}>
                      0{i + 1}
                    </span>
                    <span className={`transition-opacity duration-200 ${isActive ? '' : 'opacity-80 group-hover:opacity-100'}`}>
                      {item.label}
                    </span>
                    {/* underline: grows on hover, stays for the active page */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 bottom-0.5 h-px origin-left bg-current transition-transform duration-300 ease-out ${
                        isActive ? 'scale-x-100 !bg-copper' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="group ml-auto hidden h-11 items-center gap-5 rounded-[var(--radius-chip)] bg-copper pr-3.5 pl-4.5 text-[13.5px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#a56b43] active:scale-[0.985] sm:flex lg:ml-2"
          >
            Get a Quote
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.6}
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`ml-auto flex h-11 items-center gap-3 rounded-[var(--radius-chip)] border px-4 text-[13px] font-medium transition-colors duration-300 sm:ml-0 lg:hidden ${
              overHero ? 'border-paper/30' : 'border-ink/15 bg-white'
            }`}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span aria-hidden className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: ease.inOut }}
            className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="gutter flex min-h-full flex-col justify-between pt-4 pb-8">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: ease.out }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 border-b border-ink/10 py-5 text-[32px] font-medium tracking-[-0.035em] ${
                          isActive ? 'text-forest' : 'text-ink'
                        }`
                      }
                    >
                      <span className="label text-copper">0{i + 1}</span>
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-10 space-y-2"
              >
                <Link
                  to="/contact"
                  className="flex h-13 items-center justify-between rounded-[var(--radius-chip)] bg-copper px-4 text-[15px] font-medium text-white"
                >
                  Get a Quote <ArrowUpRight className="size-4" strokeWidth={1.6} />
                </Link>
                <div className="grid grid-cols-2 gap-2 text-[14px]">
                  <a href={`mailto:${site.contact.email}`} className="flex h-12 items-center gap-2 rounded-[var(--radius-chip)] bg-white px-3.5">
                    <Mail className="size-4 text-teal" strokeWidth={1.6} /> Email
                  </a>
                  <a href={`tel:${site.contact.phoneHref}`} className="flex h-12 items-center gap-2 rounded-[var(--radius-chip)] bg-white px-3.5">
                    <Phone className="size-4 text-teal" strokeWidth={1.6} /> Call
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
