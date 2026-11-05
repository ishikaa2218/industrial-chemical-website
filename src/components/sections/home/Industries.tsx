import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { industries } from '../../../data/content'
import { Label } from '../../common/Label'
import { Photo } from '../../common/Photo'
import { Reveal } from '../../common/Reveal'

export function Industries() {
  const [active, setActive] = useState(0)
  const current = industries[active]

  return (
    <section className="shell pt-2.5" aria-labelledby="industries-title">
      <div className="panel bg-paper px-4 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          <div className="col-span-12 lg:col-span-3">
            <Label>Industries served</Label>
          </div>
          <Reveal className="col-span-12 lg:col-span-9">
            <h2 id="industries-title" className="max-w-[20ch] text-[clamp(30px,4vw,58px)] leading-[1.02] font-medium tracking-[-0.04em]">
              Where our chemistry goes to work
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-4 lg:mt-14">
          {/* Sticky image (desktop) */}
          <div className="relative col-span-12 hidden lg:col-span-5 lg:block">
            <div className="sticky top-[88px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-stone-2">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.photo}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0"
                  >
                    <Photo k={current.photo} ratio={4 / 5} sizes="38vw" className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="label mt-3 flex justify-between text-ink-mute">
                <span>{current.name}</span>
                <span>
                  {String(active + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}
                </span>
              </p>
            </div>
          </div>

          {/* Index list */}
          <ul className="col-span-12 border-t border-ink/15 lg:col-span-7">
            {industries.map((ind, i) => {
              const on = i === active
              return (
                <li key={ind.name} className="border-b border-ink/15">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-3 py-5 text-left sm:grid-cols-[3.5rem_1fr_auto] lg:py-6"
                  >
                    <span className={`label transition-colors duration-300 ${on ? 'text-copper' : 'text-ink-mute'}`}>
                      0{i + 1}
                    </span>
                    <span>
                      <span
                        className={`block text-[clamp(22px,2.6vw,38px)] leading-[1.1] font-medium tracking-[-0.035em] transition-colors duration-300 ${
                          on ? 'text-forest' : 'text-ink/55 group-hover:text-ink'
                        }`}
                      >
                        {ind.name}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-quart)] ${
                          on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[46ch] pt-2 text-[14px] leading-relaxed text-ink-soft">{ind.line}</span>
                        </span>
                      </span>
                    </span>
                    {/* Thumbnail on small screens */}
                    <Photo
                      k={ind.photo}
                      ratio={1}
                      sizes="72px"
                      className={`size-14 rounded-[3px] transition-opacity duration-300 sm:size-16 lg:hidden ${on ? 'opacity-100' : 'opacity-60'}`}
                    />
                    <span
                      aria-hidden
                      className={`hidden h-px bg-copper transition-[width] duration-500 lg:block ${on ? 'w-12' : 'w-0'}`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
