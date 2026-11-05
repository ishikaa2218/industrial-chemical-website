import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number }

/** Subtle fade-and-rise used for section content as it enters the viewport. */
export function Reveal({ delay = 0, y = 18, children, ...rest }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Image wrapper that uncovers its content with a clip-path wipe. */
export function ImageReveal({ delay = 0, children, className, ...rest }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
