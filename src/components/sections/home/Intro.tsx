import { Button } from '../../common/Button'
import { Label } from '../../common/Label'
import { Photo } from '../../common/Photo'
import { Reveal } from '../../common/Reveal'

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
    <section className="shell pt-2.5" aria-labelledby="intro-title">
      <div className="panel px-4 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-12 gap-x-4 gap-y-8">
          <div className="col-span-12 flex items-start justify-between lg:col-span-3 lg:block">
            <Label>About the company</Label>
            <div className="lg:hidden">
              <Button to="/about" variant="forest" size="sm">
                More about us
              </Button>
            </div>
          </div>

          {/* Small image card — echoes the profile card in the reference */}
          <Reveal className="col-span-12 sm:col-span-5 lg:col-span-3">
            <figure className="flex gap-3 border-t border-ink/12 pt-4 sm:block">
              <Photo k="chemicalPlant" ratio={4 / 3} sizes="(min-width: 1024px) 22vw, 40vw" className="aspect-[4/3] w-28 shrink-0 rounded-[3px] sm:w-full" />
              <figcaption className="sm:mt-3">
                <p className="text-[14px] font-medium">Manufacturing &amp; Trading</p>
                <p className="label mt-1 text-ink-mute">Industrial chemicals · B2B supply</p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                  One supplier for manufactured specialty chemistry and traded process chemicals.
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="col-span-12 sm:col-span-7 lg:col-span-5">
            <Reveal>
              <h2 id="intro-title" className="text-[clamp(24px,2.6vw,36px)] leading-[1.18] font-medium tracking-[-0.03em]">
                We manufacture and trade industrial chemicals for the processes that make steel stronger — hardening,
                heat treatment and the manufacture of automotive components.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-ink-soft">
                Our customers need chemicals that behave the same way, batch after batch, and a supplier who
                understands why that matters on a hardening line. That is the standard we hold ourselves to.
              </p>
            </Reveal>
          </div>

          <div className="hidden justify-end lg:col-span-1 lg:flex">
            <Button to="/about" variant="forest" size="sm" className="whitespace-nowrap">
              More about us
            </Button>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-1 border-t border-ink/12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.k}
              delay={i * 0.06}
              className={`border-b border-ink/12 py-6 sm:pr-6 lg:border-b-0 lg:py-7 ${i > 0 ? 'lg:border-l lg:pl-6' : ''} ${
                i % 2 === 1 ? 'sm:border-l sm:pl-6 lg:pl-6' : ''
              }`}
            >
              <dt className="label flex items-center gap-2 text-forest">
                <span className="text-copper">[0{i + 1}]</span> {p.k}
              </dt>
              <dd className="mt-3 text-[14px] leading-relaxed text-ink-soft">{p.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
