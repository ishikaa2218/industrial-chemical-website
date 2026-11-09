import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'
import { MaskLines } from '../../motion'
import { ease } from '../../../motion/tokens'

const focusAreas = ['Metal hardening', 'Heat treatment', 'Automotive components', 'Textile dyeing']

/**
 * Full-bleed hero. Sequence on load: image wipes open and settles →
 * headline lines rise from their masks → copy → CTAs → index row.
 * On scroll the photograph drifts and the copy lifts away.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  const enter = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: ease.out } }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-forest-deep text-paper lg:h-[100svh] lg:min-h-[680px]"
    >
      {/* Photograph — clip-path wipe + settle, then scroll-linked drift */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { clipPath: 'inset(12% 10% 12% 10%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.4, ease: ease.inOut }}
      >
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: ease.settle }}
          >
            <Photo k="heroMill" priority sizes="100vw" className="absolute inset-0" />
          </motion.div>
        </motion.div>
        {/* Legibility washes — warm-dark at the base, light at the top for the header */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f1d1a]/92 via-[#0f1d1a]/40 to-[#0f1d1a]/25" />
        <div aria-hidden className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#0f1d1a]/55 to-transparent" />
      </motion.div>

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="container-wide flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+56px)] pb-6 lg:pb-8">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <MaskLines
            id="hero-title"
            as="h1"
            trigger="mount"
            delay={0.45}
            className="t-display col-span-12 lg:col-span-8"
            lines={['Industrial chemicals', 'for metal hardening', 'and heat treatment']}
            lineClassName={(i) => (i === 2 ? 'text-[#e4bfa0]' : 'text-paper')}
          />
          <div className="col-span-12 sm:col-span-8 lg:col-span-4 lg:pb-3 xl:col-span-3 xl:col-start-10">
            <motion.p {...enter(0.95)} className="max-w-[40ch] text-[15.5px] leading-relaxed text-paper/80">
              Established in Ludhiana in the 1990s, Geeta Paints and Chemicals (India) serves industrial applications in
              metal hardening, heat treatment and automotive component manufacturing, as well as textile dyeing.
            </motion.p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row lg:flex-col">
              <motion.div {...enter(1.08)}>
                <Button to="/products" variant="copper" className="w-full sm:min-w-[210px]">
                  Explore Applications
                </Button>
              </motion.div>
              <motion.div {...enter(1.16)}>
                <Button to="/contact" variant="ghost-light" className="w-full">
                  Contact Our Team
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Index row spanning the full width */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 grid grid-cols-2 border-t border-paper/20 pt-4 sm:grid-cols-4 lg:mt-14 lg:grid-cols-[repeat(4,1fr)_auto]"
        >
          {focusAreas.map((f, i) => (
            <p key={f} className="label flex gap-2 py-1.5 text-paper/75">
              <span className="text-copper">0{i + 1}</span>
              {f}
            </p>
          ))}
          <a
            href="#intro"
            className="label group hidden items-center gap-2 py-1.5 text-paper/75 transition-colors hover:text-paper lg:flex"
          >
            Scroll
            <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.6} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
