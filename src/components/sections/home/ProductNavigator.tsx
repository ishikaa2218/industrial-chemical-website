import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'
import { categories } from '../../../data/content'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { dur, ease } from '../../../motion/tokens'
import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'
import { CategoryCarousel } from './CategorySlider'

/**
 * Product categories as a scroll story (desktop): the stage stays pinned
 * while the page scrolls through five chapters. Each chapter swaps the
 * photograph with a wipe, rewrites the copy and advances the index.
 * The index is also a set of buttons, so visitors can jump directly.
 * Smaller screens get a swipeable carousel instead of a pinned stage.
 */
export function ProductNavigator() {
  const wide = useMediaQuery('(min-width: 1024px)')
  return (
    <section aria-labelledby="categories-title" className="relative w-full bg-forest text-paper">
      {wide ? <PinnedStage /> : <CategoryCarousel />}
    </section>
  )
}

const CHAPTER_VH = 85

function PinnedStage() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [[active, dir], setActive] = useState<[number, number]>([0, 1])
  const n = categories.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999)))
    setActive(([cur]) => (cur === next ? [cur, 0] : [next, next > cur ? 1 : -1]))
  })

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + span * ((i + 0.5) / n), behavior: reduce ? 'auto' : 'smooth' })
  }

  const c = categories[active]
  const swap = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0, transition: { duration: dur.swap, ease: ease.out } },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -16, transition: { duration: 0.25, ease: ease.inOut } },
  }

  return (
    <div ref={ref} style={{ height: `${n * CHAPTER_VH + 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] overflow-hidden">
        {/* Left — copy column */}
        <div className="relative z-10 flex w-[44%] flex-col justify-between pt-[calc(var(--header-h)+40px)] pb-10 pl-[var(--gutter)] pr-12">
          <div>
            <h2 id="categories-title" className="label flex items-center gap-3 text-paper/60">
              <span className="text-copper">02</span> Product categories
            </h2>

            <div className="mt-10 min-h-[340px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={c.slug} {...swap}>
                  <p className="label text-paper/70">
                    <span className="text-copper">{c.index}</span> / {String(n).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 max-w-[13ch] text-[clamp(36px,3.6vw,64px)] leading-[1] font-medium tracking-[-0.042em] text-paper">
                    {c.name}
                  </h3>
                  <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-paper/75">{c.summary}</p>
                  <ul className="mt-6 grid max-w-[520px] grid-cols-2 gap-x-6 gap-y-2">
                    {c.applications.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-[13.5px] text-paper/85">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-copper" strokeWidth={2} aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex gap-2">
                    <Button to={`/products#${c.slug}`} variant="light" size="sm">
                      View category
                    </Button>
                    <Button to={`/contact?requirement=${c.slug}`} variant="ghost-light" size="sm">
                      Enquire
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Chapter index — doubles as navigation */}
          <ol className="flex items-stretch gap-1" aria-label="Choose a product category">
            {categories.map((cat, i) => (
              <li key={cat.slug} className="flex-1">
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={i === active ? 'step' : undefined}
                  className="group flex w-full flex-col gap-2 pt-1 text-left"
                >
                  <span className="relative block h-[2px] w-full overflow-hidden bg-paper/15">
                    <span
                      className={`absolute inset-0 origin-left bg-copper transition-transform duration-500 ease-out ${
                        i <= active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </span>
                  <span
                    className={`text-[12px] leading-tight transition-colors duration-300 ${
                      i === active ? 'text-paper' : 'text-paper/45 group-hover:text-paper/80'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-copper">{cat.index}</span> {cat.shortName}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Right — photograph bleeds to the viewport edge */}
        <div className="relative flex-1 overflow-hidden bg-forest-deep">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={c.slug}
              className="absolute inset-0"
              initial={
                reduce ? { opacity: 0 } : { zIndex: 2, clipPath: dir >= 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }
              }
              animate={reduce ? { opacity: 1 } : { zIndex: 2, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={reduce ? { opacity: 0 } : { zIndex: 1, opacity: 0.999, transition: { duration: 0.95 } }}
              transition={{ duration: 0.95, ease: ease.inOut }}
            >
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: ease.settle }}
              >
                <Photo k={c.photo} sizes="56vw" className="absolute inset-0" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div aria-hidden className="absolute inset-0 z-[3] bg-gradient-to-r from-forest/50 via-transparent to-transparent" />

          {/* Vertical progress rail */}
          <div aria-hidden className="absolute top-[calc(var(--header-h)+40px)] right-[var(--gutter)] bottom-10 z-[4] w-px bg-paper/25">
            <motion.span style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-copper" />
          </div>
          <p className="label absolute bottom-10 left-8 z-[4] rounded-[2px] bg-forest-deep/70 px-2.5 py-1.5 text-paper backdrop-blur-sm">
            {c.shortName}
          </p>
        </div>
      </div>
    </div>
  )
}
