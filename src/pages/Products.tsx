import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../components/common/Button'
import { Label } from '../components/common/Label'
import { Photo } from '../components/common/Photo'
import { ImageReveal, Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/sections/PageHero'
import { categories, type Category } from '../data/content'

const sections = [...categories.map((c) => ({ id: c.slug, label: c.shortName })), { id: 'trading', label: 'Trading & Distribution' }]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const ids = sections.map((s) => s.id)

export default function Products() {
  const active = useActiveSection(ids)
  const railRef = useRef<HTMLUListElement>(null)

  // keep the active chip visible on narrow screens
  useEffect(() => {
    const rail = railRef.current
    const chip = rail?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!rail || !chip || rail.scrollWidth <= rail.clientWidth) return
    rail.scrollTo({ left: chip.offsetLeft - 12, behavior: 'smooth' })
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
        title={
          <>
            Chemistry for hardening, heat treatment <span className="text-forest">and the parts that depend on them</span>
          </>
        }
        intro={
          <p>
            Our range is organised by application. Each category below explains where the chemistry is used and which
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
        <p className="mt-2 text-[12px] text-ink-mute">Supply type is marked on each category.</p>
      </PageHero>

      {/* Sticky category navigation */}
      <nav aria-label="Product categories" className="sticky top-[60px] z-40 sm:top-[64px]">
        <div className="shell pt-2.5">
          <ul ref={railRef} className="no-scrollbar relative flex gap-[3px] overflow-x-auto rounded-[var(--radius-panel)] bg-forest p-[3px]">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0 lg:flex-1">
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`block rounded-[var(--radius-chip)] px-3.5 py-2.5 text-center text-[12px] font-medium whitespace-nowrap transition-colors duration-300 ${
                    active === s.id ? 'bg-paper text-forest' : 'text-paper/75 hover:bg-paper/10 hover:text-paper'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {categories.map((c, i) => (
        <CategorySection key={c.slug} c={c} flip={i % 2 === 1} />
      ))}

      {/* Trading & distribution */}
      <section id="trading" className="shell scroll-mt-[52px] pt-2.5" aria-labelledby="trading-h">
        <div className="panel overflow-hidden bg-forest text-paper">
          <div className="grid grid-cols-12 gap-x-4 gap-y-10 px-4 py-10 sm:px-8 lg:px-10 lg:py-14">
            <div className="col-span-12 lg:col-span-4">
              <p className="label text-paper/60">
                <span className="text-copper">06</span> · Trading &amp; distribution
              </p>
              <Reveal>
                <h2 id="trading-h" className="mt-5 text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em] text-paper">
                  Chemical trading &amp; distribution
                </h2>
              </Reveal>
              <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-paper/75">
                Beyond our manufactured range, we trade and distribute industrial chemicals so that customers can
                consolidate purchasing and keep consumption planned.
              </p>
              <div className="mt-8">
                <Button to="/contact?requirement=trading" variant="light">
                  Enquire about sourcing
                </Button>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <ImageReveal>
                <Photo k="drums" ratio={16 / 9} sizes="(min-width:1024px) 60vw, 100vw" className="aspect-[16/9] w-full rounded-[3px]" />
              </ImageReveal>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {[
                  { t: 'Sourcing', d: 'Industrial and process chemicals sourced from established producers to the customer’s requirement.' },
                  { t: 'Stocking', d: 'Material held for regular-use items, so recurring orders are not left to short-notice purchasing.' },
                  { t: 'Distribution', d: 'Planned deliveries matched to consumption, with one point of contact for every order.' },
                ].map((x, i) => (
                  <div key={x.t} className="border-t border-paper/20 pt-4">
                    <p className="label text-copper">0{i + 1}</p>
                    <h3 className="mt-2 text-[19px] font-medium tracking-[-0.02em] text-paper">{x.t}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-paper/70">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure which product fits?"
        title="Tell us about your process and we’ll recommend the chemistry"
        body="Share your material, process and equipment details. Our team will suggest suitable products and send a quotation."
        button="Send a Product Enquiry"
        photo="lathe"
      />
    </>
  )
}

function CategorySection({ c, flip }: { c: Category; flip: boolean }) {
  return (
    <section id={c.slug} className="shell scroll-mt-[52px] pt-2.5" aria-labelledby={`${c.slug}-h`}>
      <div className="panel overflow-hidden">
        <div className="grid lg:grid-cols-12">
          {/* Image column */}
          <div className={`relative lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
            <ImageReveal className="h-full">
              <Photo
                k={c.photo}
                ratio={4 / 5}
                sizes="(min-width:1024px) 42vw, 100vw"
                className="aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[640px]"
              />
            </ImageReveal>
            <span className="label absolute top-4 left-4 rounded-[2px] bg-white/90 px-2 py-1 text-ink backdrop-blur-sm">
              {c.index} / 05
            </span>
          </div>

          {/* Content column */}
          <div className={`flex flex-col justify-between gap-10 px-4 py-8 sm:px-8 lg:col-span-7 lg:px-12 lg:py-12 ${flip ? 'lg:order-1' : ''}`}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Label tone="copper">Category {c.index}</Label>
                <span className="rounded-[var(--radius-chip)] border border-dashed border-ink/25 px-2.5 py-1 text-[11.5px] text-ink-soft">
                  {c.supply}
                </span>
              </div>
              <Reveal>
                <h2 id={`${c.slug}-h`} className="mt-5 max-w-[16ch] text-[clamp(30px,3.4vw,50px)] leading-[1.02] font-medium tracking-[-0.04em]">
                  {c.name}
                </h2>
              </Reveal>
              <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink">{c.summary}</p>
              <div className="mt-5 max-w-[60ch] space-y-3 text-[15px] leading-relaxed text-ink-soft">
                {c.body.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label text-ink-soft">Typical applications</p>
                <ul className="mt-3 border-t border-ink/12">
                  {c.applications.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 border-b border-ink/12 py-2.5 text-[14px]">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={1.8} aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="label text-ink-soft">Used by</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {c.usedBy.map((u) => (
                      <li key={u} className="rounded-[var(--radius-chip)] bg-paper px-2.5 py-1.5 text-[12.5px] text-ink">
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[4px] border border-dashed border-ink/20 p-4">
                  <p className="label text-ink-soft">Product range</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-mute">
                    [Product names, grades and technical data sheets for this category to be added.]
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[3px] sm:flex-row">
              <Button to={`/contact?requirement=${c.slug}`}>Enquire about this range</Button>
              <Link
                to="/contact"
                className="group inline-flex h-12 items-center gap-2 px-4 text-[14px] font-medium text-forest"
              >
                <span className="link-underline">Request a technical discussion</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
