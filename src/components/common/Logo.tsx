/**
 * Temporary wordmark. The mark — a solid core inside an offset outer case —
 * nods to case hardening. Replace with the client's logo when supplied.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} fill="none">
      <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="9" y="9" width="14" height="14" rx="1" fill="currentColor" />
      <rect x="21" y="1.5" width="9.5" height="9.5" fill="#B77B51" />
    </svg>
  )
}
