import type { PhotoKey } from '../../data/images'
import { Button } from '../common/Button'
import { Photo } from '../common/Photo'
import { ClipReveal, MaskLines, Reveal } from '../motion'

type Props = {
  eyebrow?: string
  title?: string[]
  body?: string
  button?: string
  photo?: PhotoKey
  to?: string
}

/** Edge-to-edge split: photograph on one half, call to action on the other. */
export function CtaBand({
  eyebrow = 'Start a conversation',
  title = ['Looking for the right', 'chemical solution', 'for your industry?'],
  body = 'Tell us about your process, material and volumes. We will come back with a recommendation and a quotation that fits your requirement.',
  button = 'Discuss Your Requirements',
  photo = 'furnace',
  to = '/contact',
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="grid w-full lg:grid-cols-2">
      <ClipReveal from="right" className="group relative min-h-[320px] lg:min-h-[78svh]">
        <Photo k={photo} zoom sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0" />
      </ClipReveal>
      <div className="flex flex-col justify-between gap-14 bg-copper-soft/70 px-[var(--gutter)] py-14 lg:py-20 lg:pl-16">
        <p className="label text-copper">{eyebrow}</p>
        <MaskLines id="cta-title" className="t-h2 max-w-[16ch]" lines={title} />
        <Reveal className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <p className="max-w-[44ch] text-[16px] leading-relaxed text-ink-soft">{body}</p>
          <Button to={to} className="shrink-0 sm:min-w-[270px]">
            {button}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
