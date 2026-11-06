import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Photo } from '../../common/Photo'
import { MaskLines } from '../../motion'

const stages = [
  { t: 'Steel processing', d: 'Hardening and process chemistry for steel processors.' },
  { t: 'Hardening & heat treatment', d: 'Chemicals used around the furnace and quench.' },
  { t: 'Cleaning & protection', d: 'Preparation between machining and treatment.' },
  { t: 'Component assembly', d: 'Parts ready for automotive and engineering lines.' },
]

/**
 * Full-bleed layered band. The photograph moves slower than the page,
 * and the four stages light up in sequence as the band is scrolled past.
 */
export function ProcessBand() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [lit, setLit] = useState(reduce ? stages.length : 0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])
  const line = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return
    setLit(Math.max(0, Math.min(stages.length, Math.ceil((v - 0.3) / 0.1))))
  })

  return (
    <section ref={ref} aria-labelledby="process-title" className="relative isolate w-full overflow-hidden bg-forest-deep text-paper">
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[14%] inset-x-0 -z-10">
        <Photo k="steelPlant" sizes="100vw" className="absolute inset-0" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0f1d1a]/95 via-[#0f1d1a]/55 to-[#0f1d1a]/30" />

      <div className="container-wide flex min-h-[100svh] flex-col justify-end pt-32 pb-10 lg:pb-14">
        <p className="label text-paper/70">
          <span className="text-copper">04</span> · From raw steel to finished part
        </p>
        <MaskLines
          id="process-title"
          className="t-h1 mt-6 max-w-[16ch] text-paper"
          lines={['Chemistry at every stage', 'between raw steel and', 'a finished component']}
        />

        <div className="relative mt-14 lg:mt-20">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-paper/20" />
          <motion.div aria-hidden style={{ scaleX: reduce ? 1 : line }} className="absolute inset-x-0 top-0 h-px origin-left bg-copper" />
          <ol className="grid grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => {
              const on = i < lit
              return (
                <li
                  key={s.t}
                  className={`pt-5 pr-6 pb-2 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-40'} ${
                    i > 1 ? 'mt-6 lg:mt-0' : ''
                  }`}
                >
                  <p className="label flex items-center gap-2 text-copper">
                    <span
                      className={`inline-block size-1.5 rounded-full transition-colors duration-500 ${on ? 'bg-copper' : 'bg-paper/30'}`}
                    />
                    Stage 0{i + 1}
                  </p>
                  <p className="mt-3 text-[17px] font-medium tracking-[-0.015em] text-paper lg:text-[19px]">{s.t}</p>
                  <p className="mt-2 max-w-[30ch] text-[13.5px] leading-relaxed text-paper/65">{s.d}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
