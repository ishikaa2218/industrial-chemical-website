import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { categories } from '../../../data/content'
import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'

const ease = [0.25, 1, 0.5, 1] as const

export function CategorySlider() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const reduce = useReducedMotion()
  const total = categories.length
  const c = categories[index]

  const go = useCallback(
    (next: number) => {
      setState(([cur]) => [((next % total) + total) % total, next > cur ? 1 : -1])
    },
    [total],
  )

  const fade = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -10 },
    transition: { duration: 0.5, ease },
  }

  return (
    <section className="shell pt-2.5" aria-labelledby="categories-title" aria-roledescription="carousel">
      <div
        className="panel relative overflow-hidden bg-forest text-paper"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(index + 1)
          if (e.key === 'ArrowLeft') go(index - 1)
        }}
      >
        <div className="grid min-h-[620px] grid-cols-12 gap-x-4 gap-y-8 px-4 py-6 sm:px-8 lg:min-h-[680px] lg:px-10 lg:py-8">
          {/* Left: counter + title + summary */}
          <div className="col-span-12 flex flex-col justify-between lg:col-span-4">
            <div>
              <h2 id="categories-title" className="label text-paper/60">
                Product categories
              </h2>
              <p className="label mt-6 text-paper/80" aria-live="polite">
                <span className="text-copper">{c.index}</span> / {String(total).padStart(2, '0')}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.h3 key={c.slug} {...fade} className="mt-3 max-w-[12ch] text-[clamp(32px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em] text-paper">
                  {c.name}
                </motion.h3>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={c.slug + '-copy'} {...fade} transition={{ ...fade.transition, delay: 0.05 }} className="mt-8 hidden lg:block">
                <p className="max-w-[36ch] text-[16px] leading-relaxed text-paper/80">{c.summary}</p>
                <div className="mt-6">
                  <Button to={`/products#${c.slug}`} variant="light" size="sm">
                    Learn more
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centre: image */}
          <div className="relative col-span-12 lg:col-span-5 lg:self-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-forest-deep lg:aspect-[4/5]">
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={c.slug}
                  custom={dir}
                  initial={reduce ? { opacity: 0 } : { zIndex: 2, clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
                  animate={reduce ? { opacity: 1 } : { zIndex: 2, clipPath: 'inset(0 0% 0 0%)' }}
                  exit={reduce ? { opacity: 0 } : { zIndex: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0"
                >
                  <Photo k={c.photo} ratio={4 / 5} sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
              <span className="label absolute top-3 left-3 rounded-[2px] bg-forest/80 px-2 py-1 text-paper backdrop-blur-sm">
                {c.shortName}
              </span>
            </div>
          </div>

          {/* Mobile summary */}
          <div className="col-span-12 lg:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={c.slug + '-m'} {...fade}>
                <p className="text-[15px] leading-relaxed text-paper/80">{c.summary}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: index list + arrows */}
          <div className="col-span-12 flex flex-col justify-between gap-8 lg:col-span-3">
            <ol className="hidden border-t border-paper/15 lg:block">
              {categories.map((cat, i) => (
                <li key={cat.slug} className="border-b border-paper/15">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === index}
                    className={`flex w-full items-baseline gap-3 py-3 text-left text-[14px] transition-colors duration-300 ${
                      i === index ? 'text-paper' : 'text-paper/45 hover:text-paper/80'
                    }`}
                  >
                    <span className="label w-6 text-copper">{cat.index}</span>
                    {cat.shortName}
                  </button>
                </li>
              ))}
            </ol>

            <div className="flex items-center justify-between gap-[3px] lg:justify-end">
              <div className="lg:hidden">
                <Button to={`/products#${c.slug}`} variant="light" size="sm">
                  Learn more
                </Button>
              </div>
              <div className="flex gap-[3px]">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous category"
                  className="grid size-11 place-items-center rounded-[var(--radius-chip)] bg-paper text-forest transition-colors duration-300 hover:bg-copper hover:text-white"
                >
                  <ArrowLeft className="size-4.5" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next category"
                  className="grid size-11 place-items-center rounded-[var(--radius-chip)] bg-paper text-forest transition-colors duration-300 hover:bg-copper hover:text-white"
                >
                  <ArrowRight className="size-4.5" strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute inset-x-0 bottom-0 flex h-[3px] gap-[3px]" aria-hidden>
          {categories.map((cat, i) => (
            <span key={cat.slug} className="relative flex-1 bg-paper/10">
              <motion.span
                className="absolute inset-y-0 left-0 bg-copper"
                initial={false}
                animate={{ width: i <= index ? '100%' : '0%' }}
                transition={{ duration: 0.6, ease }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
