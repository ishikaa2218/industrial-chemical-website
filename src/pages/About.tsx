import { useRef } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { Photo } from '../components/common/Photo'
import { Seo } from '../components/common/Seo'
import { Container, Section } from '../components/common/Section'
import { ClipReveal, Item, MaskLines, Parallax, Reveal, ScrollWords, Stagger } from '../components/motion'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/sections/PageHero'
import { industries } from '../data/content'

const atAGlance = [
  { k: 'Business', v: 'Manufacturing & trading of industrial chemicals' },
  { k: 'Focus', v: 'Steel hardening, heat treatment, automotive' },
  { k: 'Established', v: '[Year]' },
  { k: 'Head office', v: '[City, State]' },
  { k: 'Manufacturing unit', v: '[Location]' },
]

const capabilities = [
  {
    t: 'Formulation & production',
    d: 'In-house manufacture of chemicals for hardening, heat treatment and metal processing, produced to defined recipes for repeatable results.',
  },
  {
    t: 'Process-matched selection',
    d: 'Products are recommended against the customer’s material, equipment and process conditions — not picked from a list.',
  },
  {
    t: 'Checks before dispatch',
    d: 'Each batch is checked before it leaves the facility, so that what reaches the plant matches what was agreed.',
  },
  {
    t: 'Packing for industrial handling',
    d: 'Packed and labelled for safe storage and handling on the shop floor, in pack sizes that suit consumption.',
  },
]

const quality = [
  { t: 'Understand the requirement', d: 'Process, material, equipment and expected outcome — before any product is proposed.' },
  { t: 'Match the chemistry', d: 'A product recommendation that fits the application, with clear guidance on use.' },
  { t: 'Check before dispatch', d: 'Batch checks and correct documentation accompany every consignment.' },
  { t: 'Follow up in use', d: 'We stay in touch after delivery to make sure results on the line are as expected.' },
]

const business = [
  {
    label: '01',
    title: 'Manufacturing',
    body: 'We manufacture specialty chemicals for steel hardening, heat treatment and metal processing — the categories where process knowledge and consistency make the biggest difference to our customers.',
    photo: 'chemicalPlant' as const,
  },
  {
    label: '02',
    title: 'Trading & distribution',
    body: 'We source, stock and distribute industrial and process chemicals so that customers can consolidate purchasing with one dependable supplier and keep production on schedule.',
    photo: 'drums' as const,
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="A manufacturing and trading partner for steel hardening, heat treatment and automotive component industries — our business, capabilities and quality approach."
        path="/about"
      />

      <PageHero
        index="02"
        label="About us"
        lines={['A manufacturing and', 'trading partner for', 'metal-processing industries']}
        accentLine={2}
        intro={
          <p>
            We manufacture and trade industrial chemicals used where steel is hardened, heat treated and machined into
            components. Our role is simple: supply the right chemistry, consistently, to the plants that depend on it.
          </p>
        }
        photo="steelPlant"
        photoCaption="Steel processing — one of the core industries we serve"
      />

      {/* 1 — Company introduction */}
      <Section tone="paper" labelledBy="intro-h">
        <Container className="grid grid-cols-12 gap-x-6 gap-y-12 py-20 lg:py-32">
          <p className="label col-span-12 text-ink-soft lg:col-span-3">Who we are</p>
          <div className="col-span-12 lg:col-span-5">
            <h2 id="intro-h" className="sr-only">
              Who we are
            </h2>
            <ScrollWords
              className="text-[clamp(26px,2.6vw,44px)] leading-[1.15] font-medium tracking-[-0.032em]"
              text="Our work sits between the chemical industry and the shop floor of metal-processing plants."
            />
            <Reveal className="mt-8 space-y-4 text-[16px] leading-relaxed text-ink-soft">
              <p>
                Steel hardening, heat treatment and component manufacturing all depend on chemicals that perform
                predictably. A change in quality or a gap in supply shows up quickly as rejected parts or idle furnaces.
              </p>
              <p>
                We built our business around that reality — manufacturing the chemicals where process knowledge matters
                most, and trading the materials our customers need alongside them.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-3 lg:col-start-10">
            <p className="label text-ink-soft">At a glance</p>
            <dl className="mt-4 border-t border-ink/15">
              {atAGlance.map((r) => (
                <div key={r.k} className="border-b border-ink/15 py-3.5">
                  <dt className="label text-ink-mute">{r.k}</dt>
                  <dd className="mt-1 text-[15px] text-ink">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* 2 — Our business: edge-to-edge split */}
      <section aria-labelledby="business-h" className="w-full">
        <h2 id="business-h" className="sr-only">
          Our business
        </h2>
        <div className="grid border-t border-ink/12 lg:grid-cols-2">
          {business.map((b, i) => (
            <article key={b.title} className={`group flex flex-col bg-white ${i === 1 ? 'lg:border-l lg:border-ink/12' : ''}`}>
              <ClipReveal from={i === 0 ? 'right' : 'left'} className="relative aspect-[16/11] w-full">
                <Photo k={b.photo} tint zoom sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0" />
              </ClipReveal>
              <div className="flex flex-1 flex-col gap-6 px-[var(--gutter)] py-10 lg:px-14 lg:py-14">
                <p className="label text-copper">Our business · {b.label}</p>
                <h3 className="t-h2 transition-colors duration-300 group-hover:text-forest">{b.title}</h3>
                <p className="max-w-[50ch] text-[16px] leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3 — Manufacturing capabilities: layered images at different depths */}
      <Section tone="paper" labelledBy="cap-h" divider>
        <Container className="grid grid-cols-12 gap-x-6 gap-y-14 py-20 lg:py-32">
          <div className="col-span-12 lg:col-span-6">
            <p className="label text-ink-soft">Manufacturing capabilities</p>
            <MaskLines id="cap-h" className="t-h2 mt-6 max-w-[14ch]" lines={['Produced with the', 'end process in mind']} />
            <div className="relative mt-14 hidden h-[560px] sm:block">
              <ClipReveal from="up" className="group absolute top-0 left-0 w-[60%] rounded-[3px]">
                <Photo k="labBeaker" ratio={3 / 4} tint zoom sizes="30vw" className="aspect-[3/4] w-full" />
              </ClipReveal>
              <Parallax distance={70} className="absolute right-[4%] bottom-0 w-[46%]">
                <ClipReveal from="left" delay={0.15} className="group rounded-[3px] ring-8 ring-paper">
                  <Photo k="furnaceRod" ratio={1} tint zoom sizes="22vw" className="aspect-square w-full" />
                </ClipReveal>
              </Parallax>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-40">
            <Stagger as="ol" className="border-t border-ink/15">
              {capabilities.map((c, i) => (
                <Item as="li" key={c.t} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-ink/15 py-8">
                  <span className="label pt-1.5 text-copper">0{i + 1}</span>
                  <div>
                    <h3 className="t-h3">{c.t}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.d}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
            <p className="label mt-6 text-ink-mute">[Add facility details — plant area, capacity, equipment]</p>
          </div>
        </Container>
      </Section>

      {/* 4 — Trading & distribution: selected dark section, full bleed */}
      <section aria-labelledby="trade-h" className="grid w-full bg-forest text-paper lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-14 px-[var(--gutter)] py-16 lg:py-24 lg:pr-16">
          <p className="label text-paper/60">Chemical trading &amp; distribution</p>
          <div>
            <MaskLines
              id="trade-h"
              className="t-h2 max-w-[15ch] text-paper"
              lines={['One dependable source', 'for the chemicals', 'your plant runs on']}
            />
            <Reveal>
              <p className="mt-8 max-w-[50ch] text-[16px] leading-relaxed text-paper/75">
                Alongside our own manufactured range, we trade and distribute industrial chemicals from established
                sources. Customers benefit from consolidated purchasing, planned deliveries and a single point of contact
                for technical and commercial questions.
              </p>
            </Reveal>
          </div>
          <Stagger as="ul" className="grid grid-cols-1 border-t border-paper/20 sm:grid-cols-3">
            {['Sourcing', 'Stocking', 'Planned delivery'].map((t, i) => (
              <Item as="li" key={t} className={`py-5 text-[15px] ${i > 0 ? 'border-t border-paper/20 sm:border-t-0 sm:border-l sm:pl-5' : ''}`}>
                <span className="label mr-2 text-copper">0{i + 1}</span>
                {t}
              </Item>
            ))}
          </Stagger>
        </div>
        <ClipReveal from="left" className="group relative min-h-[360px]">
          <Photo k="pipes" zoom sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0" />
        </ClipReveal>
      </section>

      {/* 5 — Industrial expertise: full-width editorial index */}
      <Section tone="white" labelledBy="exp-h">
        <Container className="grid grid-cols-12 gap-x-6 gap-y-10 py-20 lg:py-32">
          <p className="label col-span-12 text-ink-soft lg:col-span-3">Industrial expertise</p>
          <div className="col-span-12 lg:col-span-9">
            <MaskLines id="exp-h" className="t-h2 max-w-[22ch]" lines={['We know the industries we supply', '— and the processes inside them']} />
          </div>
        </Container>
        <ul className="border-t border-ink/12">
          {industries.map((ind, i) => (
            <li key={ind.name} className="group border-b border-ink/12 transition-colors duration-300 hover:bg-paper">
              <div className="container-wide grid grid-cols-12 items-center gap-x-6 gap-y-2 py-6 lg:py-7">
                <span className="label col-span-2 text-copper sm:col-span-1">0{i + 1}</span>
                <h3 className="col-span-10 text-[clamp(20px,2vw,32px)] leading-tight font-medium tracking-[-0.03em] transition-transform duration-300 ease-out group-hover:translate-x-2 sm:col-span-5 lg:col-span-4">
                  {ind.name}
                </h3>
                <p className="col-span-12 text-[15px] leading-relaxed text-ink-soft sm:col-span-6 lg:col-span-5">{ind.line}</p>
                <Photo
                  k={ind.photo}
                  ratio={16 / 10}
                  tint
                  sizes="160px"
                  className="hidden aspect-[16/10] w-full rounded-[2px] lg:col-span-2 lg:col-start-11 lg:block"
                />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6 — Quality approach: process line draws as the section is read */}
      <QualitySteps />

      {/* 7 — Customer commitment */}
      <Section tone="white" labelledBy="commit-h" divider>
        <Container className="grid grid-cols-12 gap-x-6 gap-y-10 py-24 lg:py-40">
          <p className="label col-span-12 text-ink-soft lg:col-span-3">Customer commitment</p>
          <div className="col-span-12 lg:col-span-9">
            <h2 id="commit-h" className="sr-only">
              Customer commitment
            </h2>
            <ScrollWords
              as="p"
              className="text-[clamp(28px,3.6vw,62px)] leading-[1.08] font-medium tracking-[-0.038em]"
              text="“We measure ourselves by the orders our customers place a second, third and tenth time. Consistent material, honest advice and supply that arrives when it is needed — that is the commitment behind every consignment.”"
            />
            <p className="label mt-10 text-ink-soft">— [Name], [Designation]</p>
          </div>
        </Container>
      </Section>

      <CtaBand photo="grinding" />
    </>
  )
}

function QualitySteps() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 35%'] })
  return (
    <Section tone="paper" labelledBy="quality-h" divider>
      <Container className="py-20 lg:py-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="label text-ink-soft">Quality approach</p>
            <MaskLines id="quality-h" className="t-h2 mt-6 max-w-[16ch]" lines={['Quality is a process,', 'not a promise']} />
          </div>
          <p className="max-w-[40ch] text-[16px] leading-relaxed text-ink-soft">
            Every enquiry follows the same four steps, from the first conversation to results on the customer’s line.
          </p>
        </div>
        <ol ref={ref} className="relative mt-16 grid gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          <span aria-hidden className="absolute top-[18px] right-0 left-0 hidden h-px bg-ink/15 lg:block" />
          <motion.span
            aria-hidden
            style={{ scaleX: reduce ? 1 : scrollYProgress }}
            className="absolute top-[18px] right-0 left-0 hidden h-px origin-left bg-forest lg:block"
          />
          {quality.map((q, i) => (
            <li key={q.t} className="relative pr-8">
              <span className="relative z-10 grid size-9 place-items-center rounded-full border border-forest bg-paper font-mono text-[12px] text-forest">
                {i + 1}
              </span>
              <h3 className="t-h3 mt-6">{q.t}</h3>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">{q.d}</p>
            </li>
          ))}
        </ol>
        <p className="label mt-14 text-ink-mute">[Add quality certifications here only once confirmed by the company]</p>
      </Container>
    </Section>
  )
}
