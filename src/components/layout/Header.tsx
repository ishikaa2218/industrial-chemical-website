import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { nav, site } from '../../data/site'
import { ease } from '../../motion/tokens'
import { LogoMark } from '../common/Logo'

/**
 * Site header — one continuous bar: brand · navigation · quote.
 *
 * - Desktop: three-column grid so the links sit on the true centre line
 *   at any width; 84px tall, easing to 68px once the page is scrolled.
 * - Home: transparent over the full-bleed hero (ivory type), switching to
 *   a solid ivory bar with a hairline as soon as the visitor scrolls.
 * - Below 1024px: brand + compact quote (tablet) + a "Menu" toggle that
 *   opens a full-height, keyboard-trapped menu panel.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const overHero = pathname === '/' && !scrolled && !open

  // close the menu whenever the route changes
  useEffect(() => setOpen(false), [pathname])

  // scrolled state drives the solid bar and the compact height
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.toggleAttribute('data-scrolled', scrolled)
  }, [scrolled])

  // mobile menu: scroll lock, Escape to close, focus management + trap
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector<HTMLElement>('a[href]')
    requestAnimationFrame(() => first?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a[href],button')].filter(
        Boolean,
      ) as HTMLElement[]
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* soft wash so ivory type stays legible over bright parts of the hero photo */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[140%] bg-gradient-to-b from-[#0f1d1a]/45 to-transparent transition-opacity duration-500 ${
          overHero ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* entrance: a short settle on first load (transform kept off <header> so the fixed menu panel is unaffected) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ease.out, delay: 0.1 }}
        className={`relative border-b transition-[background-color,border-color] duration-300 ease-out ${
          overHero ? 'border-paper/18 bg-transparent' : 'border-ink/10 bg-paper/[0.97]'
        }`}
      >
        <div className="container-wide grid h-[var(--header-current)] grid-cols-[1fr_auto] items-center gap-6 transition-[height] duration-300 ease-out lg:grid-cols-[1fr_auto_1fr]">
          {/* ── Brand ─────────────────────────────────────────── */}
          <Link
            to="/"
            aria-label={`${site.name}, ${site.descriptor} — home`}
            className={`group flex w-fit items-center gap-3.5 transition-colors duration-300 ${overHero ? 'text-paper' : 'text-ink'}`}
          >
            <LogoMark className={`size-[26px] shrink-0 2xl:size-[30px] transition-colors duration-300 ${overHero ? 'text-paper' : 'text-forest'}`} />
            <span aria-hidden className={`h-7 w-px transition-colors duration-300 ${overHero ? 'bg-paper/30' : 'bg-ink/15'}`} />
            <span className="flex flex-col leading-none">
              <span className="text-[16.5px] font-semibold tracking-[-0.022em] whitespace-nowrap max-[479px]:max-w-[11rem] max-[479px]:whitespace-normal max-[479px]:leading-[1.1] 2xl:text-[18px]">{site.name}</span>
              <span
                className={`mt-[5px] font-mono text-[9.5px] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300 ${
                  overHero ? 'text-paper/60' : 'text-ink-mute'
                }`}
              >
                {site.descriptor}
              </span>
            </span>
          </Link>

          {/* ── Primary navigation (desktop) ───────────────────── */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(24px,2.6vw,44px)]">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className="group relative block py-2.5 text-[14.5px] font-medium tracking-[-0.01em] whitespace-nowrap 2xl:text-[15.5px]">
                    {({ isActive }) => (
                      <>
                        <span
                          className={`transition-colors duration-200 ${
                            overHero
                              ? isActive
                                ? 'text-paper'
                                : 'text-paper/75 group-hover:text-paper'
                              : isActive
                                ? 'text-forest'
                                : 'text-ink/70 group-hover:text-forest'
                          }`}
                        >
                          {item.label}
                        </span>
                        {/* hover: a hairline draws in beneath the word */}
                        <span
                          aria-hidden
                          className={`absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 transition-transform duration-[220ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                            overHero ? 'bg-paper/50' : 'bg-forest/35'
                          }`}
                        />
                        {/* active: a short copper rule that travels between links */}
                        {isActive && (
                          <motion.span
                            aria-hidden
                            layoutId="nav-active-rule"
                            className="absolute bottom-[3px] left-0 h-[2px] w-[18px] bg-copper"
                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 40 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Actions ─────────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <QuoteLink overHero={overHero} className="hidden sm:inline-flex" />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`-mr-2 flex h-11 items-center gap-3 px-2 text-[14px] font-medium transition-colors duration-300 lg:hidden ${
                overHero ? 'text-paper' : 'text-ink'
              }`}
            >
              <span aria-hidden className="w-[42px] text-right">
                {open ? 'Close' : 'Menu'}
              </span>
              <span aria-hidden className="relative block h-[9px] w-5">
                <span
                  className={`absolute right-0 h-px bg-current transition-[transform,top,width] duration-300 ease-out ${
                    open ? 'top-1 w-5 rotate-45' : 'top-0 w-5'
                  }`}
                />
                <span
                  className={`absolute right-0 h-px bg-current transition-[transform,top,width] duration-300 ease-out ${
                    open ? 'top-1 w-5 -rotate-45' : 'top-2 w-3.5'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Mobile / tablet menu ────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: ease.out }}
            className="fixed inset-x-0 top-[var(--header-current)] bottom-0 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="container-wide flex min-h-full flex-col justify-between pt-6 pb-8">
              <nav aria-label="Primary">
                <ul className="border-t border-ink/10">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: ease.out }}
                      className="border-b border-ink/10"
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setOpen(false)}
                        className="group flex min-h-[68px] items-center gap-5 py-3"
                      >
                        {({ isActive }) => (
                          <>
                            <span className={`w-6 font-mono text-[11px] ${isActive ? 'text-copper' : 'text-ink-mute'}`}>0{i + 1}</span>
                            <span
                              className={`flex-1 text-[clamp(28px,7.4vw,40px)] leading-none font-medium tracking-[-0.035em] transition-colors duration-200 ${
                                isActive ? 'text-forest' : 'text-ink group-hover:text-forest'
                              }`}
                            >
                              {item.label}
                            </span>
                            {isActive ? (
                              <span aria-hidden className="h-[2px] w-[18px] bg-copper" />
                            ) : (
                              <ArrowRight
                                aria-hidden
                                strokeWidth={1.5}
                                className="size-5 text-ink-mute transition-transform duration-200 group-hover:translate-x-1"
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="mt-12 space-y-6"
              >
                <QuoteLink overHero={false} onClick={() => setOpen(false)} className="flex h-14 w-full justify-between text-[15px] sm:hidden" />
                <div className="grid grid-cols-2 border-t border-ink/10 pt-5 text-[14px]">
                  <a href={`mailto:${site.contact.email}`} className="flex min-h-11 items-center gap-2.5 text-ink-soft hover:text-forest">
                    <Mail className="size-4 text-teal" strokeWidth={1.6} aria-hidden /> Email us
                  </a>
                  <a href={`tel:${site.contact.phoneHref}`} className="flex min-h-11 items-center gap-2.5 text-ink-soft hover:text-forest">
                    <Phone className="size-4 text-teal" strokeWidth={1.6} aria-hidden /> Call us
                  </a>
                </div>
                <p className="label text-ink-mute">
                  {site.descriptor} · {site.tagline}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/** The single primary action. Forest on ivory; ivory on the hero photo. */
function QuoteLink({ overHero, className = '', onClick }: { overHero: boolean; className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/contact"
      onClick={onClick}
      className={`group h-11 items-center gap-4 rounded-[2px] pr-3.5 pl-4.5 text-[14px] font-medium 2xl:h-12 2xl:pl-5 2xl:text-[15px] whitespace-nowrap transition-[background-color,color] duration-200 ease-out ${
        overHero ? 'bg-paper text-forest hover:bg-white' : 'bg-forest text-paper hover:bg-forest-deep'
      } ${className}`}
    >
      Get a Quote
      <ArrowRight
        aria-hidden
        strokeWidth={1.7}
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]"
      />
    </Link>
  )
}
