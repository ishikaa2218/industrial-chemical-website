import { Label } from '../components/common/Label'
import { Photo } from '../components/common/Photo'
import { ImageReveal, Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
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
        title={
          <>
            A manufacturing and trading partner for{' '}
            <span className="text-forest">metal-processing industries</span>
          </>
        }
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
      <section className="shell pt-2.5" aria-labelledby="intro-h">
        <div className="panel px-4 py-10 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid grid-cols-12 gap-x-4 gap-y-10">
            <div className="col-span-12 lg:col-span-3">
              <Label>Who we are</Label>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <h2 id="intro-h" className="text-[clamp(24px,2.6vw,36px)] leading-[1.2] font-medium tracking-[-0.03em]">
                  Our work sits between the chemical industry and the shop floor of metal-processing plants.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-ink-soft">
                  <p>
                    Steel hardening, heat treatment and component manufacturing all depend on chemicals that perform
                    predictably. A change in quality or a gap in supply shows up quickly as rejected parts or idle furnaces.
                  </p>
                  <p>
                    We built our business around that reality — manufacturing the chemicals where process knowledge
                    matters most, and trading the materials our customers need alongside them.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.12} className="col-span-12 lg:col-span-4">
              <div className="rounded-[4px] bg-paper p-5 sm:p-6">
                <p className="label text-ink-soft">At a glance</p>
                <dl className="mt-4">
                  {atAGlance.map((r) => (
                    <div key={r.k} className="grid grid-cols-[8.5rem_1fr] gap-3 border-t border-ink/10 py-3 text-[14px]">
                      <dt className="text-ink-mute">{r.k}</dt>
                      <dd className="text-ink">{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2 — Our business: split screen */}
      <section className="shell pt-2.5" aria-labelledby="business-h">
        <h2 id="business-h" className="sr-only">
          Our business
        </h2>
        <div className="grid gap-2.5 lg:grid-cols-2">
          {[
            {
              label: 'Our business · 01',
              title: 'Manufacturing',
              body: 'We manufacture specialty chemicals for steel hardening, heat treatment and metal processing — the categories where process knowledge and consistency make the biggest difference to our customers.',
              photo: 'chemicalPlant' as const,
            },
            {
              label: 'Our business · 02',
              title: 'Trading & distribution',
              body: 'We source, stock and distribute industrial and process chemicals so that customers can consolidate purchasing with one dependable supplier and keep production on schedule.',
              photo: 'drums' as const,
            },
          ].map((b, i) => (
            <article key={b.title} className="panel flex flex-col overflow-hidden">
              <ImageReveal delay={i * 0.1}>
                <Photo k={b.photo} ratio={3 / 2} sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[3/2] w-full" />
              </ImageReveal>
              <div className="flex flex-1 flex-col gap-8 px-4 py-7 sm:px-8 lg:px-10 lg:py-9">
                <p className="label text-copper">{b.label}</p>
                <div>
                  <h3 className="text-[clamp(28px,3vw,44px)] leading-none font-medium tracking-[-0.04em]">{b.title}</h3>
                  <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3 — Manufacturing capabilities: asymmetric images + numbered list */}
      <section className="shell pt-2.5" aria-labelledby="cap-h">
        <div className="panel bg-paper px-4 py-10 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid grid-cols-12 gap-x-4 gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <Label>Manufacturing capabilities</Label>
              <Reveal>
                <h2 id="cap-h" className="mt-5 max-w-[15ch] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]">
                  Produced with the end process in mind
                </h2>
              </Reveal>
              <div className="relative mt-10 hidden h-[460px] sm:block">
                <ImageReveal className="absolute top-0 left-0 w-[62%]">
                  <Photo k="labBeaker" ratio={3 / 4} sizes="28vw" className="aspect-[3/4] w-full rounded-[3px]" />
                </ImageReveal>
                <ImageReveal delay={0.2} className="absolute right-0 bottom-0 w-[48%]">
                  <Photo k="furnaceRod" ratio={1} sizes="22vw" className="aspect-square w-full rounded-[3px] ring-[6px] ring-paper" />
                </ImageReveal>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-24">
              <ol className="border-t border-ink/15">
                {capabilities.map((c, i) => (
                  <Reveal key={c.t} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-ink/15 py-7">
                    <span className="label pt-1 text-copper">0{i + 1}</span>
                    <div>
                      <h3 className="text-[21px] leading-tight font-medium tracking-[-0.025em]">{c.t}</h3>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{c.d}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
              <p className="label mt-6 text-ink-mute">[Add facility details — plant area, capacity, equipment]</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Trading & distribution: occasional dark section */}
      <section className="shell pt-2.5" aria-labelledby="trade-h">
        <div className="panel grid overflow-hidden bg-forest text-paper lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-12 px-4 py-10 sm:px-8 lg:col-span-6 lg:px-10 lg:py-14">
            <Label tone="light">Chemical trading &amp; distribution</Label>
            <div>
              <Reveal>
                <h2 id="trade-h" className="max-w-[16ch] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em] text-paper">
                  One dependable source for the chemicals your plant runs on
                </h2>
              </Reveal>
              <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-paper/75">
                Alongside our own manufactured range, we trade and distribute industrial chemicals from established
                sources. Customers benefit from consolidated purchasing, planned deliveries and a single point of
                contact for technical and commercial questions.
              </p>
            </div>
            <ul className="grid grid-cols-1 border-t border-paper/20 sm:grid-cols-3">
              {['Sourcing', 'Stocking', 'Planned delivery'].map((t, i) => (
                <li key={t} className={`py-4 text-[14px] ${i > 0 ? 'border-t border-paper/20 sm:border-t-0 sm:border-l sm:pl-4' : ''}`}>
                  <span className="label mr-2 text-copper">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[320px] lg:col-span-6">
            <Photo k="drumsStacked" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

      {/* 5 — Industrial expertise: editorial table */}
      <section className="shell pt-2.5" aria-labelledby="exp-h">
        <div className="panel px-4 py-10 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid grid-cols-12 gap-x-4 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Label>Industrial expertise</Label>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <Reveal>
                <h2 id="exp-h" className="max-w-[24ch] text-[clamp(28px,3.2vw,46px)] leading-[1.05] font-medium tracking-[-0.04em]">
                  We know the industries we supply — and the processes inside them
                </h2>
              </Reveal>
              <table className="mt-10 w-full border-t border-ink/15 text-left">
                <caption className="sr-only">Industries and how we support them</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Industry</th>
                    <th scope="col">How we support it</th>
                  </tr>
                </thead>
                <tbody>
                  {industries.map((ind, i) => (
                    <tr key={ind.name} className="border-b border-ink/15 align-top">
                      <th scope="row" className="w-[42%] py-5 pr-4 text-[17px] font-medium tracking-[-0.02em] sm:text-[20px]">
                        <span className="label mr-3 align-middle text-copper">0{i + 1}</span>
                        {ind.name}
                      </th>
                      <td className="py-5 text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">{ind.line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Quality approach: horizontal process line */}
      <section className="shell pt-2.5" aria-labelledby="quality-h">
        <div className="panel bg-paper px-4 py-10 sm:px-8 lg:px-10 lg:py-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Label>Quality approach</Label>
              <Reveal>
                <h2 id="quality-h" className="mt-5 max-w-[18ch] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]">
                  Quality is a process, not a promise
                </h2>
              </Reveal>
            </div>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-ink-soft">
              Every enquiry follows the same four steps, from the first conversation to results on the customer’s line.
            </p>
          </div>
          <ol className="mt-12 grid gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {quality.map((q, i) => (
              <Reveal key={q.t} delay={i * 0.08} className="relative pr-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-forest font-mono text-[12px] text-forest">
                    {i + 1}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-ink/20" />
                </div>
                <h3 className="mt-5 text-[19px] leading-tight font-medium tracking-[-0.02em]">{q.t}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">{q.d}</p>
              </Reveal>
            ))}
          </ol>
          <p className="label mt-10 text-ink-mute">[Add quality certifications here only once confirmed by the company]</p>
        </div>
      </section>

      {/* 7 — Customer commitment */}
      <section className="shell pt-2.5" aria-labelledby="commit-h">
        <div className="panel px-4 py-14 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid grid-cols-12 gap-x-4 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Label>Customer commitment</Label>
            </div>
            <Reveal className="col-span-12 lg:col-span-8">
              <h2 id="commit-h" className="text-[clamp(26px,3.4vw,50px)] leading-[1.12] font-medium tracking-[-0.035em]">
                <span className="text-copper">“</span>We measure ourselves by the orders our customers place a second,
                third and tenth time. Consistent material, honest advice and supply that arrives when it is needed — that
                is the commitment behind every consignment.<span className="text-copper">”</span>
              </h2>
              <p className="label mt-8 text-ink-soft">— [Name], [Designation]</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand photo="gears" />
    </>
  )
}
