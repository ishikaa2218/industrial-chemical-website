import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { categories, industries } from '../../../data/content'
import { dur, ease } from '../../../motion/tokens'
import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'
import { Container, Section } from '../../common/Section'
import { Item, MaskLines, Stagger } from '../../motion'

/**
 * Industries as a contact sheet. Frames rest in monochrome and come
 * alive in colour on hover or focus; selecting one opens a detail
 * sheet with prev/next navigation. Touch devices show colour by default
 * and open the sheet on tap — nothing depends on hover alone.
 */
export function Industries() {
  const [open, setOpen] = useState<number | null>(null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])

  const close = useCallback(() => {
    setOpen((cur) => {
      if (cur !== null) requestAnimationFrame(() => triggers.current[cur]?.focus())
      return null
    })
  }, [])

  return (
    <Section tone="white" labelledBy="industries-title">
      <Container className="grid grid-cols-12 gap-x-6 gap-y-6 pt-20 pb-10 lg:pt-28 lg:pb-14">
        <p className="label col-span-12 text-ink-soft lg:col-span-3">
          <span className="text-copper">03</span> · Industries served
        </p>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-9 lg:flex-row lg:items-end lg:justify-between">
          <MaskLines id="industries-title" className="t-h2" lines={['Where our chemistry', 'goes to work']} />
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
            Select an industry to see how we support it and which product ranges it relies on.
          </p>
        </div>
      </Container>

      {/* Full-width strip of frames */}
      <div className="border-y border-ink/12 bg-stone/60">
        <Stagger as="ul" gap={0.07} className="container-wide grid grid-cols-2 gap-px py-px sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((ind, i) => (
            <Item as="li" key={ind.name} className="bg-white">
              <button
                ref={(el) => {
                  triggers.current[i] = el
                }}
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className="group relative block w-full p-2.5 text-left sm:p-3"
              >
                <span className="relative block overflow-hidden rounded-[2px]">
                  <Photo k={ind.photo} ratio={3 / 4} tint zoom sizes="(min-width:1024px) 17vw, (min-width:640px) 32vw, 48vw" className="aspect-[3/4] w-full" />
                  {/* copper frame marker draws in on hover/focus */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-2 rounded-[2px] border border-copper opacity-0 transition-[opacity,inset] duration-300 ease-out group-hover:inset-3 group-hover:opacity-100 group-focus-visible:inset-3 group-focus-visible:opacity-100"
                  />
                  <span className="label absolute top-3 left-3 rounded-[2px] bg-white/90 px-1.5 py-0.5 text-ink">0{i + 1}</span>
                  <span className="absolute right-3 bottom-3 grid size-9 translate-y-2 place-items-center rounded-full bg-copper text-white opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
                  </span>
                </span>
                <span className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="text-[15px] leading-tight font-medium tracking-[-0.015em] transition-colors duration-200 group-hover:text-forest sm:text-[16px]">
                    {ind.name}
                  </span>
                </span>
                <span className="mt-1 block text-[12.5px] leading-snug text-ink-mute">
                  {ind.categories.length} product ranges
                </span>
              </button>
            </Item>
          ))}
        </Stagger>
      </div>
      <div className="h-16 lg:h-24" />

      <IndustrySheet index={open} onClose={close} onChange={setOpen} />
    </Section>
  )
}

function IndustrySheet({
  index,
  onClose,
  onChange,
}: {
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
}) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const n = industries.length

  const isOpen = index !== null
  useEffect(() => {
    if (isOpen) closeRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (index === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % n)
      if (e.key === 'ArrowLeft') onChange((index - 1 + n) % n)
      // keep keyboard focus inside the sheet
      if (e.key === 'Tab' && dialogRef.current) {
        const f = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')]
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, n, onChange, onClose])

  const ind = index !== null ? industries[index] : null
  const related = ind ? categories.filter((c) => ind.categories.includes(c.slug)) : []

  return createPortal(
    <AnimatePresence>
      {ind && index !== null && (
        <motion.div
          key="sheet"
          className="fixed inset-0 z-[70] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-[#0f1d1a]/55 backdrop-blur-[2px]" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="industry-sheet-title"
            className="relative ml-auto flex h-full w-full max-w-[1180px] flex-col overflow-y-auto bg-paper md:flex-row md:overflow-hidden"
            initial={reduce ? { opacity: 0 } : { x: '8%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: '6%', opacity: 0, transition: { duration: 0.25, ease: ease.inOut } }}
            transition={{ duration: 0.6, ease: ease.out }}
          >
            {/* Image side */}
            <div className="relative h-[42svh] shrink-0 overflow-hidden bg-stone-2 md:h-auto md:w-1/2">
              <AnimatePresence initial={false}>
                <motion.div
                  key={ind.photo}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 0% 100%)', zIndex: 2 }}
                  animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 2 }}
                  exit={reduce ? { opacity: 0 } : { zIndex: 1, opacity: 0.999, transition: { duration: 0.8 } }}
                  transition={{ duration: 0.8, ease: ease.inOut }}
                >
                  <Photo k={ind.photo} sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0" />
                </motion.div>
              </AnimatePresence>
              <p className="label absolute bottom-4 left-4 z-[3] rounded-[2px] bg-paper/90 px-2 py-1 text-ink">
                Industry {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </p>
            </div>

            {/* Content side */}
            <div className="flex flex-1 flex-col justify-between gap-10 p-6 sm:p-10">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onChange((index - 1 + n) % n)}
                    aria-label="Previous industry"
                    className="grid size-11 place-items-center rounded-[var(--radius-chip)] border border-ink/15 transition-colors duration-200 hover:border-forest hover:bg-forest hover:text-paper"
                  >
                    <ArrowLeft className="size-4" strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange((index + 1) % n)}
                    aria-label="Next industry"
                    className="grid size-11 place-items-center rounded-[var(--radius-chip)] border border-ink/15 transition-colors duration-200 hover:border-forest hover:bg-forest hover:text-paper"
                  >
                    <ArrowRight className="size-4" strokeWidth={1.6} />
                  </button>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="flex h-11 items-center gap-2 rounded-[var(--radius-chip)] px-3 text-[13px] font-medium transition-colors duration-200 hover:bg-ink/5"
                >
                  Close <X className="size-4" strokeWidth={1.6} />
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ind.name}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: dur.swap, ease: ease.out, delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <p className="label text-copper">Industries served</p>
                  <h3 id="industry-sheet-title" className="t-h2 mt-4 max-w-[12ch]">
                    {ind.name}
                  </h3>
                  <p className="t-lead mt-6 max-w-[46ch] text-ink">{ind.line}</p>
                  <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">{ind.detail}</p>

                  <p className="label mt-10 text-ink-soft">Relevant product ranges</p>
                  <ul className="mt-3 border-t border-ink/12">
                    {related.map((c) => (
                      <li key={c.slug} className="border-b border-ink/12">
                        <Link
                          to={`/products#${c.slug}`}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-4 py-3.5 text-[15px] transition-colors duration-200 hover:text-forest"
                        >
                          <span>
                            <span className="mr-3 font-mono text-[11px] text-copper">{c.index}</span>
                            {c.name}
                          </span>
                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div>
                <Button to="/contact" onClick={onClose}>
                  Discuss your requirement
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
