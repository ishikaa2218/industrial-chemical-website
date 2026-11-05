import { Button } from '../common/Button'
import { Label } from '../common/Label'
import { Photo } from '../common/Photo'
import { ImageReveal, Reveal } from '../common/Reveal'
import type { PhotoKey } from '../../data/images'

type Props = {
  eyebrow?: string
  title?: string
  body?: string
  button?: string
  photo?: PhotoKey
}

export function CtaBand({
  eyebrow = 'Start a conversation',
  title = 'Looking for the right chemical solution for your industry?',
  body = 'Tell us about your process, material and volumes. We will come back with a recommendation and a quotation that fits your requirement.',
  button = 'Discuss Your Requirements',
  photo = 'furnace',
}: Props) {
  return (
    <section className="shell pt-2.5" aria-labelledby="cta-title">
      <div className="grid gap-2.5 lg:grid-cols-12">
        <ImageReveal className="panel relative min-h-[280px] overflow-hidden lg:col-span-5 lg:min-h-[480px]">
          <Photo k={photo} sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0 h-full w-full" />
        </ImageReveal>
        <div className="panel flex flex-col justify-between gap-12 bg-copper-soft/60 px-5 py-10 sm:px-8 lg:col-span-7 lg:px-10 lg:py-12">
          <Label tone="copper">{eyebrow}</Label>
          <Reveal>
            <h2 id="cta-title" className="max-w-[17ch] text-[clamp(32px,4.2vw,62px)] leading-[1] font-medium tracking-[-0.045em]">
              {title}
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-ink-soft">{body}</p>
            <Button to="/contact" className="shrink-0 sm:min-w-[260px]">
              {button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
