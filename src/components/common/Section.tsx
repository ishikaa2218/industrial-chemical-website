import type { ReactNode } from 'react'

const tones = {
  paper: 'bg-paper text-ink',
  white: 'bg-white text-ink',
  stone: 'bg-stone text-ink',
  forest: 'bg-forest text-paper',
  deep: 'bg-forest-deep text-paper',
  copper: 'bg-copper-soft text-ink',
} as const

type Props = {
  tone?: keyof typeof tones
  id?: string
  labelledBy?: string
  className?: string
  children: ReactNode
  /** draw a full-viewport hairline above the section */
  divider?: boolean
}

/** Full-bleed section band. Pair with <Container> for content width. */
export function Section({ tone = 'paper', id, labelledBy, className = '', children, divider }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative w-full ${tones[tone]} ${divider ? 'border-t border-ink/10' : ''} ${className}`}
    >
      {children}
    </section>
  )
}

export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`container-wide ${className}`}>{children}</div>
}
