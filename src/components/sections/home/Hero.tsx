import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'

const ease = [0.25, 1, 0.5, 1] as const

const focusAreas = ['Steel hardening', 'Heat treatment', 'Automotive components', 'Metal processing']

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '8%'])

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        }

  return (
    <section ref={ref} className="shell" aria-labelledby="hero-title">
      <div className="panel relative overflow-hidden px-4 pt-8 pb-5 sm:px-8 sm:pt-10 lg:min-h-[calc(100svh-74px)] lg:px-10 lg:pt-10 lg:pb-8">
        <h1 id="hero-title" className="sr-only">
          Advanced Chemical Solutions for Stronger Industrial Performance
        </h1>

        <div className="grid grid-cols-12 gap-x-4 lg:h-full lg:min-h-[calc(100svh-74px-72px)] lg:grid-rows-[auto_1fr_auto]">
          {/* Line one — top left */}
          <motion.p
            aria-hidden
            {...rise(0.1)}
            className="display col-span-12 text-[clamp(40px,11vw,72px)] lg:text-[min(6.4vw,12.5svh)] font-medium text-ink lg:col-span-9"
          >
            <span className="lg:whitespace-nowrap">Advanced chemical</span>
            <br />
            solutions
          </motion.p>

          {/* Focus areas — right column */}
          <motion.ul
            {...rise(0.35)}
            className="col-span-12 mt-6 flex flex-wrap gap-x-5 gap-y-1.5 lg:col-span-3 lg:mt-3 lg:flex-col lg:items-end lg:gap-y-1.5 lg:text-right"
          >
            {focusAreas.map((f, i) => (
              <li key={f} className="label flex items-center gap-2 text-ink-soft">
                <span className="text-copper">0{i + 1}</span> {f}
              </li>
            ))}
          </motion.ul>

          {/* Central image — takes the place of the reference's centrepiece */}
          <div className="col-span-12 my-7 lg:col-span-6 lg:col-start-4 lg:row-start-2 lg:my-4 lg:self-center">
            <div className="mx-auto w-full lg:max-w-[min(100%,calc(34svh*1.6))]">
            <motion.div
              initial={reduce ? false : { clipPath: 'inset(18% 22% 18% 22%)', opacity: 0.4 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
              className="relative overflow-hidden rounded-[4px]"
            >
              <motion.div style={{ y: imgY }} className="scale-[1.08]">
                <Photo
                  k="heroMill"
                  ratio={16 / 10}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[16/10] w-full"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-4">
                <span className="label rounded-[2px] bg-white/90 px-2 py-1 text-ink backdrop-blur-sm">
                  Rolling mill · hot steel
                </span>
              </div>
            </motion.div>
            </div>
          </div>

          {/* Bottom row — copy and CTAs left, line two right */}
          <motion.div
            {...rise(0.55)}
            className="col-span-12 row-start-5 mt-8 max-w-[400px] self-end lg:col-span-4 lg:row-start-3 lg:mt-0"
          >
            <p className="text-[15px] leading-[1.55] text-ink-soft">
              Specialised chemical manufacturing and supply for steel hardening, heat treatment and automotive
              component manufacturing — produced and sourced for consistent results on the shop floor.
            </p>
            <div className="mt-6 flex flex-col gap-[3px] sm:flex-row">
              <Button to="/products" className="sm:min-w-[220px]">
                Explore Our Products
              </Button>
              <Button to="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </motion.div>

          <motion.p
            aria-hidden
            {...rise(0.2)}
            className="display col-span-12 row-start-4 text-right text-[clamp(40px,11vw,72px)] lg:text-[min(6.4vw,12.5svh)] font-medium text-forest lg:col-span-8 lg:col-start-5 lg:row-start-3 lg:self-end"
          >
            for stronger
            <br />
            <span className="lg:whitespace-nowrap">industrial performance</span>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
