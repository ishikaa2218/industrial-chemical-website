import { Photo } from '../../common/Photo'
import { Reveal } from '../../common/Reveal'

const stages = ['Steel processing', 'Hardening & heat treatment', 'Cleaning & protection', 'Component assembly']

export function ProcessBand() {
  return (
    <section className="shell pt-2.5" aria-labelledby="process-title">
      <div className="panel relative min-h-[520px] overflow-hidden lg:min-h-[640px]">
        <Photo k="steelPlant" sizes="100vw" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14231f]/90 via-[#14231f]/35 to-transparent" aria-hidden />
        <div className="relative flex min-h-[520px] flex-col justify-end px-4 pt-24 pb-6 sm:px-8 lg:min-h-[640px] lg:px-10 lg:pb-8">
          <Reveal>
            <h2 id="process-title" className="max-w-[22ch] text-[clamp(30px,4.4vw,64px)] leading-[1] font-medium tracking-[-0.045em] text-paper">
              Chemistry at every stage between raw steel and a finished component
            </h2>
          </Reveal>
          <ol className="mt-10 grid grid-cols-2 border-t border-paper/25 lg:grid-cols-4">
            {stages.map((s, i) => (
              <li key={s} className={`py-4 pr-4 ${i % 2 === 1 ? 'pl-4 border-l border-paper/25' : ''} ${i === 2 ? 'lg:border-l lg:pl-4' : ''} ${i > 1 ? 'border-t border-paper/25 lg:border-t-0' : ''}`}>
                <p className="label text-copper">Stage 0{i + 1}</p>
                <p className="mt-2 text-[15px] font-medium text-paper">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
