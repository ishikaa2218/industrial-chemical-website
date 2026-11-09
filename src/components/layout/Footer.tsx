import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUp, ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/content'
import { nav, site } from '../../data/site'
import { ease, inView } from '../../motion/tokens'
import { LogoMark } from '../common/Logo'
import { Item, Stagger } from '../motion'

function FooterLink({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 py-1 text-paper/80 transition-colors duration-200 hover:text-paper">
      <ArrowRight
        aria-hidden
        strokeWidth={1.6}
        className="-ml-5 size-3.5 opacity-0 transition-[margin,opacity] duration-300 ease-out group-hover:ml-0 group-hover:opacity-100 group-focus-visible:ml-0 group-focus-visible:opacity-100"
      />
      <span>{children}</span>
    </Link>
  )
}

export function Footer() {
  const reduce = useReducedMotion()
  return (
    <footer className="relative w-full overflow-hidden bg-forest-deep text-paper">
      {/* Closing call to action */}
      <div className="container-wide grid gap-10 border-b border-paper/12 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
        <div className="lg:col-span-8">
          <p className="label text-copper">Start a conversation</p>
          <h2 className="t-h2 mt-5 max-w-[18ch] text-paper">Tell us about your application. We’ll discuss the chemistry.</h2>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
          <Link
            to="/contact"
            className="group inline-flex h-14 w-full items-center justify-between gap-8 rounded-[var(--radius-chip)] bg-paper px-5 text-[15px] font-medium text-forest transition-[background-color,transform] duration-200 hover:bg-copper hover:text-white active:scale-[0.985] sm:w-auto sm:min-w-[300px]"
          >
            Contact Our Team
            <ArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.6} />
          </Link>
          <a href={`mailto:${site.contact.email}`} className="link-underline text-[14px] text-paper/70 hover:text-paper">
            {site.contact.email}
          </a>
        </div>
      </div>

      <Stagger className="container-wide grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <Item className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-3" aria-label={`${site.name} — home`}>
            <LogoMark className="size-7 text-paper" />
            <span className="text-[18px] font-semibold tracking-[-0.02em]">{site.name}</span>
          </Link>
          <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-paper/65">{site.description}</p>
        </Item>
        <Item className="lg:col-span-2 lg:col-start-6">
          <p className="label mb-5 text-paper/45">Navigate</p>
          <ul className="space-y-1.5 text-[15px]">
            {nav.map((n) => (
              <li key={n.to}>
                <FooterLink to={n.to}>{n.label}</FooterLink>
              </li>
            ))}
          </ul>
        </Item>
        <Item className="lg:col-span-3">
          <p className="label mb-5 text-paper/45">Applications</p>
          <ul className="space-y-1.5 text-[15px]">
            {categories.map((c) => (
              <li key={c.slug}>
                <FooterLink to={`/products#${c.slug}`}>{c.shortName}</FooterLink>
              </li>
            ))}
            <li>
              <FooterLink to="/products#trading">Enquiries &amp; Supply</FooterLink>
            </li>
          </ul>
        </Item>
        <Item className="lg:col-span-2">
          <p className="label mb-5 text-paper/45">Contact</p>
          <address className="space-y-2 text-[15px] not-italic text-paper/80">
            <a href={`tel:${site.contact.phoneHref}`} className="link-underline block w-fit hover:text-paper">
              {site.contact.phone}
            </a>
            <p className="pt-2 leading-relaxed text-paper/55">
              {site.contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </address>
        </Item>
      </Stagger>

      {/* Edge-to-edge wordmark, rising from a mask as the footer arrives */}
      <div aria-hidden className="overflow-hidden border-t border-paper/12">
        <motion.p
          initial={reduce ? false : { y: '60%' }}
          whileInView={{ y: '0%' }}
          viewport={inView}
          transition={{ duration: 1.2, ease: ease.out }}
          className="gutter py-4 text-[10.6vw] leading-[0.9] font-medium tracking-[-0.055em] whitespace-nowrap text-paper/[0.07] select-none"
        >
          {site.descriptor}
        </motion.p>
      </div>

      <div className="container-wide flex flex-col gap-4 border-t border-paper/12 py-6 text-[12.5px] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.year} {site.name}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          className="group label inline-flex min-h-11 items-center gap-2 self-start text-paper/70 transition-colors hover:text-paper sm:self-auto"
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.6} />
        </button>
      </div>
    </footer>
  )
}
