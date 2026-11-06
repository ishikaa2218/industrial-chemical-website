import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { PhotoKey } from '../../data/images'
import { ease } from '../../motion/tokens'
import { Photo } from '../common/Photo'
import { MaskLines } from '../motion'

type Props = {
  index: string
  label: string
  /** heading split into lines for the mask reveal */
  lines: ReactNode[]
  /** which line (0-based) is set in the accent colour */
  accentLine?: number
  intro: ReactNode
  photo?: PhotoKey
  photoCaption?: string
  children?: ReactNode
}

/**
 * Inner-page hero. Heading rises line by line; the photograph below
 * starts inset within the gutters and opens to full bleed as you scroll.
 */
export function PageHero({ index, label, lines, accentLine, intro, photo, photoCaption, children }: Props) {
  const reduce = useReducedMotion()
  const figRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: figRef, offset: ['start end', 'start 15%'] })
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [4, 0])
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [6, 0])
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px)`)
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '0%'])

  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: ease.out } }

  return (
    <section className="w-full bg-paper">
      <div className="container-wide grid grid-cols-12 gap-x-6 gap-y-8 pt-14 pb-12 lg:pt-24 lg:pb-16">
        <motion.p {...enter(0)} className="label col-span-12 flex gap-3 text-ink-soft lg:col-span-3 lg:pt-4">
          <span className="text-copper">{index}</span>
          {label}
        </motion.p>
        <MaskLines
          as="h1"
          trigger="mount"
          delay={0.1}
          className="t-h1 col-span-12 lg:col-span-9"
          lines={lines}
          lineClassName={(i) => (i === accentLine ? 'text-forest' : '')}
        />
        <motion.div {...enter(0.45)} className="t-lead col-span-12 text-ink-soft sm:col-span-9 lg:col-span-5 lg:col-start-4">
          {intro}
        </motion.div>
        {children && (
          <motion.div {...enter(0.55)} className="col-span-12 lg:col-span-3 lg:col-start-10 lg:self-end">
            {children}
          </motion.div>
        )}
      </div>

      {photo && (
        <figure ref={figRef} className="relative">
          <motion.div
            style={{ clipPath }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[52svh] overflow-hidden sm:h-[68svh] lg:h-[82svh]"
          >
            <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
              <Photo k={photo} priority sizes="100vw" className="absolute inset-0" />
            </motion.div>
          </motion.div>
          {photoCaption && <figcaption className="label container-wide mt-3 text-ink-mute">{photoCaption}</figcaption>}
        </figure>
      )}
    </section>
  )
}
