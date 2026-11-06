import { Factory, FlaskConical, Handshake, Microscope, Truck, Workflow } from 'lucide-react'
import { reasons } from '../../../data/content'
import { Photo } from '../../common/Photo'
import { Container, Section } from '../../common/Section'
import { ClipReveal, Item, MaskLines, Parallax, Stagger } from '../../motion'

const icons = [Factory, Workflow, Microscope, Truck, FlaskConical, Handshake]

export function WhyUs() {
  return (
    <Section tone="paper" labelledBy="why-title">
      <Container className="grid grid-cols-12 gap-x-6 gap-y-14 py-20 lg:py-32">
        {/* Sticky editorial column with layered photography */}
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <p className="label text-ink-soft">
              <span className="text-copper">05</span> · Why work with us
            </p>
            <MaskLines id="why-title" className="t-h2 mt-6 max-w-[13ch]" lines={['A supplier your', 'production line', 'can rely on']} />
            <p className="mt-6 max-w-[40ch] text-[16px] leading-relaxed text-ink-soft">
              Chemical supply for metal processing is not a commodity purchase. These are the commitments behind every
              order we take.
            </p>
            <div className="relative mt-12 hidden h-[340px] lg:block">
              <ClipReveal from="up" className="group absolute top-0 left-0 w-[58%] rounded-[3px]">
                <Photo k="gears" ratio={4 / 5} tint zoom sizes="22vw" className="aspect-[4/5] w-full" />
              </ClipReveal>
              <Parallax distance={40} className="absolute right-[6%] bottom-0 w-[44%]">
                <ClipReveal from="left" delay={0.15} className="group rounded-[3px] ring-8 ring-paper">
                  <Photo k="lathe" ratio={1} tint zoom sizes="16vw" className="aspect-square w-full" />
                </ClipReveal>
              </Parallax>
            </div>
          </div>
        </div>

        <Stagger as="ol" gap={0.07} className="col-span-12 border-t border-ink/15 lg:col-span-7">
          {reasons.map((r, i) => {
            const Icon = icons[i]
            return (
              <Item
                as="li"
                key={r.title}
                className="group grid grid-cols-[3rem_1fr_auto] gap-x-4 border-b border-ink/15 py-7 transition-colors duration-300 hover:bg-white sm:grid-cols-[4.5rem_1fr_auto] sm:px-4 lg:py-9"
              >
                <span className="label pt-1.5 text-teal transition-colors duration-300 group-hover:text-copper">[0{i + 1}]</span>
                <div>
                  <h3 className="t-h3">{r.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">{r.body}</p>
                </div>
                <span className="grid size-11 place-items-center rounded-[3px] border border-ink/12 text-teal transition-[background-color,color,border-color] duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
                  <Icon className="size-[18px]" strokeWidth={1.4} aria-hidden />
                </span>
              </Item>
            )
          })}
        </Stagger>
      </Container>
    </Section>
  )
}
