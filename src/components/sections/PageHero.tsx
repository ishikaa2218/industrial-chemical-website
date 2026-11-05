import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { PhotoKey } from '../../data/images'
import { Photo } from '../common/Photo'

type Props = {
  index: string
  label: string
  title: ReactNode
  intro: ReactNode
  photo?: PhotoKey
  photoCaption?: string
  children?: ReactNode
}

const ease = [0.25, 1, 0.5, 1] as const

export function PageHero({ index, label, title, intro, photo, photoCaption, children }: Props) {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } }

  return (
    <section className="shell">
      <div className="panel px-4 pt-8 pb-4 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          <motion.p {...rise(0)} className="label col-span-12 flex gap-3 text-ink-soft lg:col-span-3">
            <span className="text-copper">{index}</span>
            {label}
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="col-span-12 text-[clamp(38px,6vw,96px)] leading-[0.98] font-medium tracking-[-0.045em] lg:col-span-9"
          >
            {title}
          </motion.h1>
          <motion.div
            {...rise(0.18)}
            className="col-span-12 text-[16px] leading-relaxed text-ink-soft sm:col-span-8 lg:col-span-5 lg:col-start-4"
          >
            {intro}
          </motion.div>
          {children && (
            <motion.div {...rise(0.24)} className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
              {children}
            </motion.div>
          )}
        </div>

        {photo && (
          <motion.figure
            initial={reduce ? false : { clipPath: 'inset(30% 0 0 0)', opacity: 0.3 }}
            animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="mt-10 lg:mt-14"
          >
            <Photo k={photo} ratio={21 / 9} priority sizes="100vw" className="aspect-[4/3] w-full rounded-[4px] sm:aspect-[21/9]" />
            {photoCaption && <figcaption className="label mt-3 text-ink-mute">{photoCaption}</figcaption>}
          </motion.figure>
        )}
      </div>
    </section>
  )
}
