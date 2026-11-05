import { Factory, FlaskConical, Handshake, Microscope, Truck, Workflow } from 'lucide-react'
import { reasons } from '../../../data/content'
import { Label } from '../../common/Label'
import { Photo } from '../../common/Photo'
import { ImageReveal, Reveal } from '../../common/Reveal'

const icons = [Factory, Workflow, Microscope, Truck, FlaskConical, Handshake]

export function WhyUs() {
  return (
    <section className="shell pt-2.5" aria-labelledby="why-title">
      <div className="panel px-4 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10">
          <div className="col-span-12 flex flex-col justify-between gap-10 lg:col-span-4">
            <div>
              <Label>Why work with us</Label>
              <h2 id="why-title" className="mt-5 max-w-[14ch] text-[clamp(30px,3.4vw,48px)] leading-[1.04] font-medium tracking-[-0.04em]">
                A supplier your production line can rely on
              </h2>
              <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-ink-soft">
                Chemical supply for metal processing is not a commodity purchase. These are the commitments behind
                every order we take.
              </p>
            </div>
            <ImageReveal className="hidden lg:block">
              <Photo k="drumsStacked" ratio={4 / 3} sizes="30vw" className="aspect-[4/3] w-full max-w-[360px] rounded-[3px]" />
            </ImageReveal>
          </div>

          <ol className="col-span-12 lg:col-span-8">
            {reasons.map((r, i) => {
              const Icon = icons[i]
              return (
                <Reveal
                  key={r.title}
                  delay={(i % 3) * 0.05}
                  className="grid grid-cols-[3rem_1fr_auto] gap-x-3 border-t border-ink/12 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr_1.2fr_auto] sm:gap-x-6 lg:py-7"
                >
                  <span className="label pt-1.5 text-teal">[0{i + 1}]</span>
                  <h3 className="text-[19px] leading-[1.2] font-medium tracking-[-0.025em] sm:text-[21px]">{r.title}</h3>
                  <p className="col-start-2 col-end-3 mt-2.5 text-[14px] leading-relaxed text-ink-soft sm:col-start-3 sm:col-end-4 sm:mt-0">
                    {r.body}
                  </p>
                  <span className="col-start-3 row-start-1 grid size-10 place-items-center rounded-[3px] bg-paper text-teal sm:col-start-4">
                    <Icon className="size-[18px]" strokeWidth={1.4} aria-hidden />
                  </span>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
