import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { nav, site } from '../../data/site'
import { LogoMark } from '../common/Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow] duration-500 ${
          scrolled ? 'bg-stone/85 shadow-[0_1px_0_rgba(48,58,56,0.08)] backdrop-blur-md' : 'bg-stone'
        }`}
      >
        <div className="shell flex h-[60px] items-center gap-[3px] py-2 sm:h-[64px]">
          {/* Brand block */}
          <Link
            to="/"
            aria-label={`${site.name} — home`}
            className="flex h-full min-w-0 flex-1 items-center justify-between gap-4 rounded-[var(--radius-chip)] bg-forest px-3.5 text-paper lg:max-w-[330px]"
          >
            <span className="flex items-center gap-2.5">
              <LogoMark className="size-[22px] text-paper" />
              <span className="text-[15px] font-semibold tracking-[-0.02em] whitespace-nowrap">{site.name}</span>
            </span>
            <span className="label hidden text-right text-[9px] leading-[1.25] text-paper/65 sm:block">
              {site.descriptor}
              <br />
              {site.tagline}
            </span>
          </Link>

          {/* Desktop nav — segmented boxes, as in the reference */}
          <nav aria-label="Primary" className="hidden h-full flex-1 items-stretch gap-[3px] lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative flex flex-1 items-center justify-center rounded-[var(--radius-chip)] px-3 text-[12.5px] font-medium tracking-[-0.005em] whitespace-nowrap transition-colors duration-300 ${
                    isActive ? 'bg-white text-forest' : 'bg-white/60 text-ink-soft hover:bg-white hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 bottom-1.5 h-px bg-copper"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="group hidden h-full items-center gap-6 rounded-[var(--radius-chip)] bg-copper pr-3 pl-4 text-[12.5px] font-medium text-white transition-colors duration-300 hover:bg-[#a56b43] sm:flex lg:min-w-[190px] lg:justify-between"
          >
            Get a Quote
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-full items-center gap-2.5 rounded-[var(--radius-chip)] bg-white px-3.5 text-[12.5px] font-medium lg:hidden"
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`}
              />
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
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-x-0 top-[60px] bottom-0 overflow-y-auto bg-stone px-2 pb-2 sm:top-[64px] sm:px-2.5 lg:hidden"
          >
            <div className="panel flex min-h-full flex-col justify-between p-5">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 border-b border-ink/10 py-4 text-[30px] font-medium tracking-[-0.035em] ${
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
              <div className="mt-10 space-y-3">
                <Link
                  to="/contact"
                  className="flex h-12 items-center justify-between rounded-[var(--radius-chip)] bg-copper px-4 text-[14px] font-medium text-white"
                >
                  Get a Quote <ArrowUpRight className="size-4" strokeWidth={1.6} />
                </Link>
                <div className="grid grid-cols-2 gap-[3px] text-[13px]">
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 rounded-[var(--radius-chip)] bg-paper px-3 py-3">
                    <Mail className="size-4 text-teal" strokeWidth={1.6} /> Email
                  </a>
                  <a href={`tel:${site.contact.phoneHref}`} className="flex items-center gap-2 rounded-[var(--radius-chip)] bg-paper px-3 py-3">
                    <Phone className="size-4 text-teal" strokeWidth={1.6} /> Call
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
