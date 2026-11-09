import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '../components/common/Button'
import { Label } from '../components/common/Label'
import { Seo } from '../components/common/Seo'
import { MaskLines } from '../components/motion'
import { categories } from '../data/content'
import { site } from '../data/site'

type Fields = {
  name: string
  company: string
  email: string
  phone: string
  requirement: string
  message: string
}

const requirementOptions = [
  ...categories.map((c) => ({ value: c.slug, label: c.name })),
  { value: 'trading', label: 'General industrial chemical enquiry' },
  { value: 'other', label: 'Other / not sure yet' },
]

const empty: Fields = { name: '', company: '', email: '', phone: '', requirement: '', message: '' }

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (f.company.trim().length < 2) e.company = 'Please enter your company name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  const digits = f.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) e.phone = 'Please enter a valid phone number.'
  if (!f.requirement) e.requirement = 'Please choose the product or requirement.'
  if (f.message.trim().length < 10) e.message = 'Please add a few details about your requirement (10+ characters).'
  return e
}

export default function Contact() {
  const [params] = useSearchParams()
  const preset = params.get('requirement') ?? ''
  const [fields, setFields] = useState<Fields>({
    ...empty,
    requirement: requirementOptions.some((o) => o.value === preset) ? preset : '',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const errors = useMemo(() => validate(fields), [fields])

  const set = (k: keyof Fields) => (v: string) => setFields((f) => ({ ...f, [k]: v }))
  const show = (k: keyof Fields) => (touched[k] ? errors[k] : undefined)

  const requirementLabel = requirementOptions.find((o) => o.value === fields.requirement)?.label ?? ''
  const summary = `Name: ${fields.name}\nCompany: ${fields.company}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nRequirement: ${requirementLabel}\n\n${fields.message}`
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Enquiry: ${requirementLabel} — ${fields.company}`)}&body=${encodeURIComponent(summary)}`
  const whatsapp = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(summary)}`

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, company: true, email: true, phone: true, requirement: true, message: true })
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Geeta Paints and Chemicals (India), Ludhiana, Punjab, to discuss industrial chemical requirements for metal hardening, heat treatment and textile dyeing applications."
        path="/contact"
      />

      <section className="w-full bg-paper">
        <div className="grid lg:grid-cols-12">
          {/* Left: introduction + details */}
          <div className="flex flex-col justify-between gap-14 px-[var(--gutter)] pt-14 pb-12 lg:col-span-5 lg:pt-24 lg:pr-14 lg:pb-16">
            <div>
              <p className="label flex gap-3 text-ink-soft">
                <span className="text-copper">04</span> Contact us
              </p>
              <MaskLines
                as="h1"
                trigger="mount"
                delay={0.1}
                className="t-h1 mt-6"
                lines={['Let’s discuss', 'your chemical', 'requirement']}
                lineClassName={(i) => (i > 0 ? 'text-forest' : '')}
              />
              <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-ink-soft">
                Contact Geeta Paints and Chemicals (India) in Ludhiana to discuss your industrial chemical requirements
                and the applications you need support with.
              </p>
            </div>

            <ul className="border-t border-ink/12">
              <ContactRow icon={Mail} label="Business email">
                <a href={`mailto:${site.contact.email}`} className="link-underline">
                  {site.contact.email}
                </a>
              </ContactRow>
              <ContactRow icon={Phone} label="Contact number">
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline">
                  {site.contact.phone}
                </a>
              </ContactRow>
              <ContactRow icon={MessageCircle} label="WhatsApp">
                <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Chat on WhatsApp
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} label="Address">
                <address className="not-italic">
                  {site.contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </ContactRow>
              <ContactRow icon={Clock} label="Business hours">
                {site.contact.hours}
              </ContactRow>
            </ul>
          </div>

          {/* Right: form */}
          <div className="border-t border-ink/10 bg-white px-[var(--gutter)] py-12 lg:col-span-7 lg:border-t-0 lg:border-l lg:px-16 lg:py-24">
            <AnimatePresence mode="wait" initial={false}>
              {!submitted ? (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  aria-labelledby="form-title"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 id="form-title" className="text-[26px] font-medium tracking-[-0.03em]">
                      Enquiry form
                    </h2>
                    <p className="label text-ink-mute">All fields required</p>
                  </div>

                  <div className="mt-8 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                    <Field id="name" label="Full name" value={fields.name} onChange={set('name')} onBlur={() => setTouched((t) => ({ ...t, name: true }))} error={show('name')} autoComplete="name" />
                    <Field id="company" label="Company name" value={fields.company} onChange={set('company')} onBlur={() => setTouched((t) => ({ ...t, company: true }))} error={show('company')} autoComplete="organization" />
                    <Field id="email" type="email" label="Email" value={fields.email} onChange={set('email')} onBlur={() => setTouched((t) => ({ ...t, email: true }))} error={show('email')} autoComplete="email" />
                    <Field id="phone" type="tel" label="Phone number" value={fields.phone} onChange={set('phone')} onBlur={() => setTouched((t) => ({ ...t, phone: true }))} error={show('phone')} autoComplete="tel" />

                    <div className="sm:col-span-2">
                      <FieldLabel id="requirement" label="Product or chemical requirement" />
                      <select
                        id="f-requirement"
                        value={fields.requirement}
                        onChange={(e) => set('requirement')(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, requirement: true }))}
                        aria-invalid={!!show('requirement')}
                        aria-describedby={show('requirement') ? 'e-requirement' : undefined}
                        className={`${inputCls(!!show('requirement'))} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23303A38' stroke-width='1.6'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[position:right_0.25rem_center] bg-no-repeat pr-8 ${fields.requirement ? '' : 'text-ink-mute'}`}
                      >
                        <option value="" disabled>
                          Select an application
                        </option>
                        {requirementOptions.map((o) => (
                          <option key={o.value} value={o.value} className="text-ink">
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <FieldError id="requirement" error={show('requirement')} />
                    </div>

                    <div className="sm:col-span-2">
                      <FieldLabel id="message" label="Message" />
                      <textarea
                        id="f-message"
                        rows={5}
                        value={fields.message}
                        onChange={(e) => set('message')(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                        placeholder="Process, material, equipment, expected volumes…"
                        aria-invalid={!!show('message')}
                        aria-describedby={show('message') ? 'e-message' : undefined}
                        className={`${inputCls(!!show('message'))} resize-y py-2`}
                      />
                      <FieldError id="message" error={show('message')} />
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[40ch] text-[12.5px] leading-relaxed text-ink-mute">
                      Online submission is not connected yet. After validation, your enquiry opens in your email app or
                      WhatsApp, ready to send to our team.
                    </p>
                    <Button type="submit" className="shrink-0 sm:min-w-[220px]">
                      Submit Enquiry
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex h-full flex-col justify-between gap-10"
                  role="status"
                >
                  <div>
                    <Label tone="copper">Enquiry ready to send</Label>
                    <h2 className="mt-5 max-w-[20ch] text-[clamp(28px,3vw,40px)] leading-[1.05] font-medium tracking-[-0.035em]">
                      Thank you, {fields.name.split(' ')[0]}. Choose how to send your enquiry.
                    </h2>
                    <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
                      This website does not store or transmit form submissions yet. Your details have been prepared as a
                      message — send it by email or WhatsApp and our team will respond.
                    </p>
                  </div>
                  <pre className="max-h-56 overflow-auto rounded-[4px] bg-white p-4 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-ink-soft">
                    {summary}
                  </pre>
                  <div className="flex flex-col gap-[3px] sm:flex-row">
                    <Button href={mailto}>Send via Email</Button>
                    <Button href={whatsapp} external variant="outline">
                      Send via WhatsApp
                    </Button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="h-12 px-4 text-[14px] font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                    >
                      Edit enquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="w-full border-t border-ink/10 bg-white" aria-labelledby="map-h">
        <div className="grid overflow-hidden lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 px-[var(--gutter)] py-14 lg:col-span-4 lg:py-20">
            <div>
              <Label>Location</Label>
              <h2 id="map-h" className="t-h3 mt-4">
                Based in Ludhiana, Punjab
              </h2>
            </div>
            <address className="text-[15px] leading-relaxed not-italic text-ink-soft">
              {site.contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="relative min-h-[340px] bg-stone lg:col-span-8 lg:min-h-[520px]">
            {site.contact.mapEmbedUrl ? (
              <iframe
                title="Geeta Paints and Chemicals (India) location on Google Maps"
                src={site.contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.4]"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center [background-image:linear-gradient(rgba(48,58,56,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(48,58,56,0.07)_1px,transparent_1px)] [background-size:44px_44px]">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="grid size-12 place-items-center rounded-full bg-forest text-paper">
                    <MapPin className="size-5" strokeWidth={1.6} />
                  </span>
                  <p className="label text-ink-soft">Ludhiana, Punjab, India</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------- small form helpers ---------- */

const inputCls = (invalid: boolean) =>
  `block h-auto min-h-11 w-full border-0 border-b bg-transparent px-0 text-[16px] text-ink transition-colors duration-300 outline-none placeholder:text-ink-mute/70 focus:border-forest ${
    invalid ? 'border-[#b4442f]' : 'border-ink/25'
  }`

function FieldLabel({ id, label }: { id: string; label: string }) {
  return (
    <label htmlFor={`f-${id}`} className="label mb-1 block text-ink-soft">
      {label}
    </label>
  )
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          id={`e-${id}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-[#b4442f]"
        >
          <AlertCircle className="size-3.5" strokeWidth={1.8} aria-hidden /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div>
      <FieldLabel id={id} label={label} />
      <input
        id={`f-${id}`}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `e-${id}` : undefined}
        className={inputCls(!!error)}
      />
      <FieldError id={id} error={error} />
    </div>
  )
}

function ContactRow({ icon: Icon, label, children }: { icon: typeof Mail; label: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-ink/12 py-4">
      <span className="grid size-9 place-items-center rounded-[3px] bg-paper text-teal">
        <Icon className="size-4" strokeWidth={1.6} aria-hidden />
      </span>
      <div>
        <p className="label text-ink-mute">{label}</p>
        <div className="mt-1 text-[15px] text-ink">{children}</div>
      </div>
    </li>
  )
}
