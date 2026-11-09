import { Button } from '../../common/Button'
import { Photo } from '../../common/Photo'
import { Container, Section } from '../../common/Section'
import { ClipReveal, Item, Parallax, ScrollWords, Stagger } from '../../motion'

const pillars = [
  {
    k: 'Since the 1990s',
    v: 'An established chemical business in Ludhiana, Punjab, with roots in the 1990s and long experience of the chemical trade.',
  },
  {
    k: 'Metal applications',
    v: 'Chemicals associated with the hardening and heat treatment of iron and steel components, and with metal processing.',
  },
  {
    k: 'Industries we serve',
    v: 'Automotive components, steel and metal processing, industrial engineering and textile dyeing.',
  },
  {
    k: 'How we work',
    v: 'Understanding the customer’s process first, then discussing which chemicals suit the application.',
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
            text="Geeta Paints and Chemicals (India) is a Ludhiana-based chemical business serving metal hardening, heat treatment, automotive component manufacturing and textile dyeing."
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
              Heat treatment results depend on the steel, the equipment and the process as much as on the chemistry. We
              take time to understand each application before recommending chemicals for it.
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
