import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'
import { Container, Section } from '../../common/Section'
import { ClipReveal, Item, Parallax, ScrollWords, Stagger } from '../../motion'

const pillars = [
  {
    k: 'We manufacture',
    v: 'Chemicals for steel hardening, heat treatment and metal processing, produced with attention to batch-to-batch consistency.',
  },
  {
    k: 'We trade & distribute',
    v: 'Industrial and process chemicals sourced and supplied to keep customers’ plants running without interruption.',
  },
  {
    k: 'We serve',
    v: 'Steel processors, heat treatment shops, automotive component makers and engineering manufacturers.',
  },
  {
    k: 'We work by',
    v: 'Understanding the process first, then recommending the chemistry — and staying involved after supply.',
  },
]

export function Intro() {
  return (
    <Section id="intro" tone="paper" labelledBy="intro-title" className="scroll-mt-0">
      <Container className="grid grid-cols-12 gap-x-6 gap-y-10 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <p className="label col-span-12 text-ink-soft lg:col-span-3">
          <span className="text-copper">01</span> · About the company
        </p>

        {/* Scroll-read statement */}
        <div className="col-span-12 lg:col-span-9">
          <h2 id="intro-title" className="sr-only">
            About the company
          </h2>
          <ScrollWords
            className="max-w-[26ch] text-[clamp(28px,3.6vw,64px)] leading-[1.06] font-medium tracking-[-0.038em] text-ink"
            text="We manufacture and trade industrial chemicals for the processes that make steel stronger — hardening, heat treatment and the manufacture of automotive components."
          />
        </div>

        {/* Layered image pair + supporting copy */}
        <div className="relative col-span-12 mt-6 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-14">
          <div className="relative col-span-12 sm:col-span-7 lg:col-span-5 lg:col-start-1">
            <ClipReveal from="up" className="group rounded-[3px]">
              <Photo k="chemicalPlant" ratio={4 / 5} tint zoom sizes="(min-width:1024px) 40vw, 90vw" className="aspect-[4/5] w-full" />
            </ClipReveal>
            <Parallax distance={50} className="absolute -right-6 -bottom-10 hidden w-[44%] sm:block lg:-right-16">
              <ClipReveal from="left" delay={0.2} className="group rounded-[3px] ring-8 ring-paper">
                <Photo k="labBeaker" ratio={1} tint zoom sizes="20vw" className="aspect-square w-full" />
              </ClipReveal>
            </Parallax>
          </div>

          <div className="col-span-12 flex flex-col justify-end sm:col-span-5 lg:col-span-4 lg:col-start-8">
            <p className="t-lead text-ink-soft">
              Our customers need chemicals that behave the same way, batch after batch, and a supplier who understands
              why that matters on a hardening line. That is the standard we hold ourselves to.
            </p>
            <div className="mt-8">
              <Button to="/about" variant="outline">
                More about us
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Pillars — dividers run edge to edge */}
      <div className="border-y border-ink/12">
        <Stagger as="dl" className="container-wide grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Item
              key={p.k}
              className={`border-ink/12 py-8 sm:pr-8 lg:py-10 ${i > 0 ? 'border-t sm:border-t-0' : ''} ${
                i % 2 === 1 ? 'sm:border-l sm:pl-8' : ''
              } ${i === 2 ? 'sm:border-t lg:border-t-0 lg:border-l lg:pl-8' : ''} ${i === 3 ? 'sm:border-t lg:border-t-0' : ''}`}
            >
              <dt className="label flex items-center gap-2 text-forest">
                <span className="text-copper">[0{i + 1}]</span> {p.k}
              </dt>
              <dd className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-ink-soft">{p.v}</dd>
            </Item>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
