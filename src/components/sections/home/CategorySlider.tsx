import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { categories } from '../../../data/content'
import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'

/**
 * Small-screen version of the product navigator: a native, swipeable
 * scroll-snap strip (no scroll hijacking), with arrow buttons and a
 * live counter for non-touch and keyboard users.
 */
export function CategoryCarousel() {
  const track = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const n = categories.length

  useEffect(() => {
    const el = track.current
    if (!el) return
    const items = [...el.children] as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(items.indexOf(e.target as HTMLElement))
        })
      },
      { root: el, threshold: 0.6 },
    )
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

  const go = (i: number) => {
    const el = track.current
    const target = el?.children[Math.max(0, Math.min(n - 1, i))] as HTMLElement | undefined
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="py-16">
      <div className="gutter flex items-end justify-between gap-4">
        <div>
          <h2 id="categories-title" className="label flex items-center gap-3 text-paper/60">
            <span className="text-copper">02</span> Applications
          </h2>
          <p className="t-h2 mt-4 max-w-[14ch] text-paper">Five application areas</p>
        </div>
        <p className="label shrink-0 text-paper/70" aria-live="polite">
          <span className="text-copper">{String(active + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}
        </p>
      </div>

      <ol
        ref={track}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)]"
        aria-label="Applications"
      >
        {categories.map((c) => (
          <li key={c.slug} className="w-[82%] shrink-0 snap-start sm:w-[58%]">
            <article className="flex h-full flex-col">
              <Photo k={c.photo} ratio={4 / 3} sizes="80vw" className="aspect-[4/3] w-full rounded-[3px]" />
              <p className="label mt-4 text-copper">{c.index}</p>
              <h3 className="mt-2 text-[24px] leading-tight font-medium tracking-[-0.03em] text-paper">{c.name}</h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-paper/75">{c.summary}</p>
              <div className="mt-5">
                <Button to={`/products#${c.slug}`} variant="light" size="sm">
                  View details
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="gutter mt-8 flex gap-2">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous category"
          className="grid size-12 place-items-center rounded-[var(--radius-chip)] bg-paper text-forest transition-[opacity,background-color] duration-200 hover:bg-copper hover:text-white disabled:opacity-35"
        >
          <ArrowLeft className="size-4.5" strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === n - 1}
          aria-label="Next category"
          className="grid size-12 place-items-center rounded-[var(--radius-chip)] bg-paper text-forest transition-[opacity,background-color] duration-200 hover:bg-copper hover:text-white disabled:opacity-35"
        >
          <ArrowRight className="size-4.5" strokeWidth={1.6} />
        </button>
      </div>
    </div>
  )
}
