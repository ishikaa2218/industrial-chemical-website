import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import type { ReactNode } from 'react'

type Variant = 'forest' | 'copper' | 'light' | 'outline' | 'ghost-light'

const styles: Record<Variant, string> = {
  forest: 'bg-forest text-paper hover:bg-forest-deep',
  copper: 'bg-copper text-white hover:bg-[#a56b43]',
  light: 'bg-white text-ink hover:bg-paper',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  'ghost-light': 'border border-paper/30 text-paper hover:bg-paper hover:text-forest',
}

type Props = {
  children: ReactNode
  to?: string
  href?: string
  variant?: Variant
  size?: 'sm' | 'md'
  className?: string
  icon?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
  external?: boolean
}

export function Button({
  children,
  to,
  href,
  variant = 'forest',
  size = 'md',
  className = '',
  icon = true,
  type = 'button',
  onClick,
  external,
}: Props) {
  const cls = `group inline-flex items-center justify-between gap-6 rounded-[var(--radius-chip)] font-medium transition-colors duration-300 ${
    size === 'sm' ? 'h-8 pl-3 pr-2 text-[12px]' : 'h-12 pl-5 pr-3.5 text-[14px]'
  } ${styles[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.6}
          className={`${size === 'sm' ? 'size-3.5' : 'size-4.5'} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
        />
      )}
    </>
  )
  if (to) return <Link to={to} className={cls}>{inner}</Link>
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}
