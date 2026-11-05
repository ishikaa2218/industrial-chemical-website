import type { ReactNode } from 'react'

export function Label({ children, className = '', tone = 'ink' }: { children: ReactNode; className?: string; tone?: 'ink' | 'light' | 'copper' }) {
  const color = tone === 'light' ? 'text-paper/70' : tone === 'copper' ? 'text-copper' : 'text-ink-soft'
  return <p className={`label ${color} ${className}`}>{children}</p>
}
