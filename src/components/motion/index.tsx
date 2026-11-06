import { useRef, type ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import { dur, ease, inView, stagger } from '../../motion/tokens'

/* ------------------------------------------------------------------
   Reveal — a single block rising into place. Use sparingly: one per
   composition (a heading group, a column), not one per paragraph.
   ------------------------------------------------------------------ */
type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number }

export function Reveal({ delay = 0, y = 22, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: dur.reveal, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   Stagger + Item — children enter in sequence as the group arrives.
   ------------------------------------------------------------------ */
const groupVariants = (gap: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: dur.reveal, ease: ease.out } },
}

type StaggerProps = HTMLMotionProps<'div'> & { gap?: number; delay?: number; as?: 'div' | 'ul' | 'ol' | 'dl' }

export function Stagger({ gap = stagger.base, delay = 0, as = 'div', children, ...rest }: StaggerProps) {
  const reduce = useReducedMotion()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      variants={groupVariants(gap, delay)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={inView}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function Item({ as = 'div', ...rest }: HTMLMotionProps<'div'> & { as?: 'div' | 'li' }) {
  const Comp = motion[as] as typeof motion.div
  return <Comp variants={itemVariants} {...rest} />
}

/* ------------------------------------------------------------------
   MaskLines — each line slides up from behind its own mask.
   trigger="mount" for page heroes, "view" for in-page headings.
   ------------------------------------------------------------------ */
type MaskLinesProps = {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: (i: number) => string
  delay?: number
  trigger?: 'mount' | 'view'
  id?: string
}

export function MaskLines({ lines, as = 'h2', className, lineClassName, delay = 0, trigger = 'view', id }: MaskLinesProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as] as typeof motion.h2
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: delay } } }
  const line: Variants = {
    hidden: { y: '108%' },
    show: { y: '0%', transition: { duration: 0.95, ease: ease.out } },
  }
  const trig =
    trigger === 'mount' ? { animate: 'show' as const } : { whileInView: 'show' as const, viewport: inView }
  return (
    <Tag id={id} className={className} variants={container} initial={reduce ? false : 'hidden'} {...trig}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span variants={line} className={`block ${lineClassName?.(i) ?? ''}`}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ------------------------------------------------------------------
   ClipReveal — photography uncovered by a clip-path wipe, while the
   image inside settles from a slight scale.
   ------------------------------------------------------------------ */
const clipFrom = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 0% 0% 100%)',
  right: 'inset(0% 100% 0% 0%)',
  center: 'inset(14% 18% 14% 18%)',
} as const

type ClipRevealProps = HTMLMotionProps<'div'> & {
  from?: keyof typeof clipFrom
  delay?: number
  trigger?: 'mount' | 'view'
}

export function ClipReveal({ from = 'up', delay = 0, trigger = 'view', className, children, ...rest }: ClipRevealProps) {
  const reduce = useReducedMotion()
  const target = { clipPath: 'inset(0% 0% 0% 0%)' }
  const trig = trigger === 'mount' ? { animate: target } : { whileInView: target, viewport: inView }
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ''}`}
      initial={reduce ? false : { clipPath: clipFrom[from] }}
      transition={{ duration: dur.image, delay, ease: ease.inOut }}
      {...trig}
      {...rest}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.14 }}
        {...(trigger === 'mount' ? { animate: { scale: 1 } } : { whileInView: { scale: 1 }, viewport: inView })}
        transition={{ duration: dur.image + 0.5, delay, ease: ease.settle }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   Parallax — content drifts against the scroll by a small distance.
   ------------------------------------------------------------------ */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   ScrollWords — a statement that "lights up" word by word as it is
   read, tied to scroll position (no autoplay, no hijacking).
   ------------------------------------------------------------------ */
export function ScrollWords({ text, className, as = 'p' }: { text: string; className?: string; as?: 'p' | 'h2' }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  const Tag = as
  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce}>
          {w}
        </Word>
      ))}
    </Tag>
  )
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  still: boolean
}) {
  const opacity = useTransform(progress, range, still ? [1, 1] : [0.18, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}
