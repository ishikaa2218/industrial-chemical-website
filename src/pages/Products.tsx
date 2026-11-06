import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../components/common/Button'
import { Photo } from '../components/common/Photo'
import { Seo } from '../components/common/Seo'
import { Container, Section } from '../components/common/Section'
import { ClipReveal, Item, MaskLines, Reveal, Stagger } from '../components/motion'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/sections/PageHero'
import { categories, type Category } from '../data/content'
import { dur, ease } from '../motion/tokens'

const sections = [...categories.map((c) => ({ id: c.slug, label: c.shortName })), { id: 'trading', label: 'Trading & Distribution' }]
const ids = sections.map((s) => s.id)

function useActiveSection(list: string[]) {
  const [active, setActive] = useState(list[0])
  useEffect(() => {
    const els = list.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [list])
  return active
}

export default function Products() {
  const active = useActiveSection(ids)
  const railRef = useRef<HTMLUListElement>(null)

  // keep the active chip visible on narrow screens
  useEffect(() => {
    const rail = railRef.current
    const chip = rail?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!rail || !chip || rail.scrollWidth <= rail.clientWidth) return
    rail.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' })
  }, [active])

  return (
    <>
      <Seo
        title="Products & Applications"
        description="Steel hardening chemicals, heat treatment chemicals, specialty and process chemicals, automotive industry solutions, and chemical trading & distribution."
        path="/products"
      />

      <PageHero
        index="03"
        label="Products & applications"
        lines={['Chemistry for hardening,', 'heat treatment and the', 'parts that depend on them']}
        accentLine={2}
        intro={
          <p>
            Our range is organised by application. Each category explains where the chemistry is used and which
            industries rely on it. Detailed product names, grades and technical data sheets are available on request.
          </p>
        }
      >
        <div className="flex flex-wrap gap-2 text-[12px]">
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] bg-forest px-2.5 py-1.5 text-paper">
            <span className="size-1.5 rounded-full bg-paper" /> Manufactured
          </span>
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-forest/40 px-2.5 py-1.5 text-forest">
            <span className="size-1.5 rounded-full border border-forest" /> Traded
          </span>
        </div>
        <p className="mt-2 text-[12.5px] text-ink-mute">Supply type is marked on each category.</p>
      </PageHero>

      <Explorer />

      {/* Sticky category navigation — full width */}
      <nav aria-label="Product categories" className="sticky top-[var(--header-current)] z-40 transition-[top] duration-300 ease-out w-full border-y border-ink/10 bg-paper/92 backdrop-blur-md">
        <ul ref={railRef} className="container-wide no-scrollbar relative flex gap-1 overflow-x-auto py-2">
          {sections.map((s, i) => (
            <li key={s.id} className="shrink-0 lg:flex-1">
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`relative flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-chip)] px-4 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
                  active === s.id ? 'text-paper' : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="product-chip"
                    className="absolute inset-0 -z-10 rounded-[var(--radius-chip)] bg-forest"
                    transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                  />
                )}
                <span className={`font-mono text-[10px] ${active === s.id ? 'text-copper' : 'text-ink-mute'}`}>0{i + 1}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((c, i) => (
        <CategorySection key={c.slug} c={c} flip={i % 2 === 1} />
      ))}

      {/* Trading & distribution — selected dark section */}
      <section id="trading" aria-labelledby="trading-h" className="w-full scroll-mt-[60px] bg-forest text-paper">
        <Container className="grid grid-cols-12 gap-x-6 gap-y-12 py-20 lg:py-28">
          <div className="col-span-12 lg:col-span-4">
            <p className="label text-paper/60">
              <span className="text-copper">06</span> · Trading &amp; distribution
            </p>
            <MaskLines id="trading-h" className="t-h2 mt-6 text-paper" lines={['Chemical trading', '& distribution']} />
            <Reveal>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-paper/75">
                Beyond our manufactured range, we trade and distribute industrial chemicals so that customers can
                consolidate purchasing and keep consumption planned.
              </p>
              <div className="mt-8">
                <Button to="/contact?requirement=trading" variant="light">
                  Enquire about sourcing
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <ClipReveal from="up" className="group rounded-[3px]">
              <Photo k="drums" ratio={16 / 9} zoom sizes="(min-width:1024px) 62vw, 100vw" className="aspect-[16/9] w-full" />
            </ClipReveal>
            <Stagger className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                { t: 'Sourcing', d: 'Industrial and process chemicals sourced from established producers to the customer’s requirement.' },
                { t: 'Stocking', d: 'Material held for regular-use items, so recurring orders are not left to short-notice purchasing.' },
                { t: 'Distribution', d: 'Planned deliveries matched to consumption, with one point of contact for every order.' },
              ].map((x, i) => (
                <Item key={x.t} className="border-t border-paper/20 pt-5">
                  <p className="label text-copper">0{i + 1}</p>
                  <h3 className="mt-2 text-[20px] font-medium tracking-[-0.02em] text-paper">{x.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-paper/70">{x.d}</p>
                </Item>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Not sure which product fits?"
        title={['Tell us about your', 'process — we’ll recommend', 'the chemistry']}
        body="Share your material, process and equipment details. Our team will suggest suitable products and send a quotation."
        button="Send a Product Enquiry"
        photo="lathe"
      />
    </>
  )
}

/**
 * Editorial product navigator: hover, focus or click a category to bring
 * its photograph and summary forward. Works with keyboard (arrow keys
 * move between categories) and with taps on touch screens.
 */
function Explorer() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const c = categories[active]
  const listRef = useRef<HTMLDivElement>(null)

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowDown' ? 1 : -1) + categories.length) % categories.length
    setActive(next)
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <Section tone="white" labelledBy="explorer-h" divider>
      <h2 id="explorer-h" className="sr-only">
        Product range overview
      </h2>
      <div className="grid lg:grid-cols-12">
        {/* Index */}
        <div className="flex flex-col justify-between gap-10 px-[var(--gutter)] py-12 lg:col-span-6 lg:py-16 lg:pr-12">
          <div ref={listRef} role="tablist" aria-orientation="vertical" aria-label="Product categories" onKeyDown={onKey} className="border-t border-ink/12">
            {categories.map((cat, i) => {
              const on = i === active
              return (
                <button
                  key={cat.slug}
                  id={`tab-${cat.slug}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="explorer-panel"
                  tabIndex={on ? 0 : -1}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-x-3 border-b border-ink/12 py-5 text-left lg:py-6"
                >
                  <span className={`label transition-colors duration-200 ${on ? 'text-copper' : 'text-ink-mute'}`}>{cat.index}</span>
                  <span
                    className={`text-[clamp(22px,2.3vw,38px)] leading-[1.08] font-medium tracking-[-0.035em] transition-[color,transform] duration-300 ease-out ${
                      on ? 'translate-x-1.5 text-forest' : 'text-ink/45 group-hover:text-ink'
                    }`}
                  >
                    {cat.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.6}
                    className={`size-5 transition-[opacity,transform] duration-300 ${on ? 'text-copper opacity-100' : 'opacity-0'}`}
                  />
                </button>
              )
            })}
          </div>
          <p className="label hidden text-ink-mute lg:block">Hover, tap or use the arrow keys to explore</p>
        </div>

        {/* Stage — photograph bleeds to the right edge */}
        <div id="explorer-panel" role="tabpanel" aria-labelledby={`tab-${c.slug}`} className="relative min-h-[520px] overflow-hidden bg-forest-deep text-paper lg:col-span-6 lg:min-h-[720px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={c.slug}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: ease.out }}
            >
              <Photo k={c.photo} sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0" />
            </motion.div>
          </AnimatePresence>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f1d1a]/92 via-[#0f1d1a]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={c.slug}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0, transition: { duration: dur.swap, ease: ease.out, delay: 0.08 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <p className="label text-copper">{c.supply}</p>
                <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-paper/90">{c.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button href={`#${c.slug}`} variant="light" size="sm" icon={false}>
                    <span className="flex items-center gap-2">
                      Read more <ArrowDown className="size-3.5" strokeWidth={1.6} />
                    </span>
                  </Button>
                  <Button to={`/contact?requirement=${c.slug}`} variant="ghost-light" size="sm">
                    Enquire
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  )
}

function CategorySection({ c, flip }: { c: Category; flip: boolean }) {
  return (
    <section
      id={c.slug}
      aria-labelledby={`${c.slug}-h`}
      className={`w-full scroll-mt-[60px] border-b border-ink/10 ${flip ? 'bg-paper' : 'bg-white'}`}
    >
      <div className="grid lg:grid-cols-2">
        {/* Photograph — bleeds to its viewport edge and stays in view while the copy scrolls */}
        <div className={`relative ${flip ? 'lg:order-2' : ''}`}>
          <div className="lg:sticky lg:top-[calc(var(--header-current)+60px)] lg:h-[calc(100svh-var(--header-current)-60px)]">
            <ClipReveal from={flip ? 'left' : 'right'} className="group relative aspect-[4/3] h-full w-full lg:aspect-auto">
              <Photo k={c.photo} zoom sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0" />
              <span className="label absolute top-4 left-4 rounded-[2px] bg-white/90 px-2 py-1 text-ink">{c.index} / 05</span>
            </ClipReveal>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col gap-12 px-[var(--gutter)] py-14 lg:px-16 lg:py-24 ${flip ? 'lg:order-1' : ''}`}>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="label text-copper">Category {c.index}</p>
              <span className="rounded-[var(--radius-chip)] border border-dashed border-ink/25 px-2.5 py-1 text-[12px] text-ink-soft">{c.supply}</span>
            </div>
            <MaskLines id={`${c.slug}-h`} className="t-h2 mt-6 max-w-[14ch]" lines={[c.name]} />
            <Reveal>
              <p className="t-lead mt-6 max-w-[48ch] text-ink">{c.summary}</p>
              <div className="mt-5 max-w-[60ch] space-y-3 text-[15.5px] leading-relaxed text-ink-soft">
                {c.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="label text-ink-soft">Typical applications</p>
              <Stagger as="ul" gap={0.05} className="mt-3 border-t border-ink/12">
                {c.applications.map((a) => (
                  <Item as="li" key={a} className="flex items-start gap-2.5 border-b border-ink/12 py-3 text-[14.5px]">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={1.8} aria-hidden />
                    {a}
                  </Item>
                ))}
              </Stagger>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="label text-ink-soft">Used by</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.usedBy.map((u) => (
                    <li key={u} className="rounded-[var(--radius-chip)] bg-stone px-2.5 py-1.5 text-[13px] text-ink">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[3px] border border-dashed border-ink/20 p-4">
                <p className="label text-ink-soft">Product range</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">
                  [Product names, grades and technical data sheets for this category to be added.]
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button to={`/contact?requirement=${c.slug}`}>Enquire about this range</Button>
            <Link to="/contact" className="group inline-flex min-h-12 items-center gap-2 px-4 text-[14px] font-medium text-forest">
              <span className="link-underline">Request a technical discussion</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
