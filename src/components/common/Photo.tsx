import { photos, photoSrcSet, photoUrl, type PhotoKey } from '../../data/images'

type Props = {
  k: PhotoKey
  /** width / height — used for cropping and to reserve layout space */
  ratio?: number
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  alt?: string
}

/** Responsive, lazy-loaded photo served from the Unsplash image CDN. */
export function Photo({
  k,
  ratio,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
  alt,
}: Props) {
  const p = photos[k] as { id: string; alt: string; focus?: string }
  return (
    <div className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? '' : 'relative '}overflow-hidden bg-stone-2 ${className}`}>
      <img
        src={photoUrl(p.id, 1080, ratio)}
        srcSet={photoSrcSet(p.id, ratio)}
        sizes={sizes}
        alt={alt ?? p.alt}
        width={1080}
        height={ratio ? Math.round(1080 / ratio) : 720}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition: p.focus ?? '50% 50%' }}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
