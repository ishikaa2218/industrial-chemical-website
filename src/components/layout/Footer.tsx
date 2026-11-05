import { Link } from 'react-router'
import { ArrowUp } from 'lucide-react'
import { categories } from '../../data/content'
import { nav, site } from '../../data/site'
import { LogoMark } from '../common/Logo'

export function Footer() {
  return (
    <footer className="shell pt-2.5 pb-2.5">
      <div className="panel overflow-hidden bg-forest text-paper">
        <div className="grid gap-12 px-5 pt-12 pb-10 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-16">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <LogoMark className="size-7 text-paper" />
              <span className="text-[18px] font-semibold tracking-[-0.02em]">{site.name}</span>
            </Link>
            <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-paper/70">
              Manufacturer and trader of industrial chemicals for steel hardening, heat treatment and automotive
              component manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <p className="label mb-5 text-paper/50">Navigate</p>
              <ul className="space-y-2.5 text-[14px]">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="link-underline text-paper/85 hover:text-paper">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-5 text-paper/50">Products</p>
              <ul className="space-y-2.5 text-[14px]">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/products#${c.slug}`} className="link-underline text-paper/85 hover:text-paper">
                      {c.shortName}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/products#trading" className="link-underline text-paper/85 hover:text-paper">
                    Trading &amp; Distribution
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="label mb-5 text-paper/50">Contact</p>
              <address className="space-y-2.5 text-[14px] not-italic text-paper/85">
                <p>
                  <a href={`mailto:${site.contact.email}`} className="link-underline hover:text-paper">
                    {site.contact.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${site.contact.phoneHref}`} className="link-underline hover:text-paper">
                    {site.contact.phone}
                  </a>
                </p>
                <p className="pt-2 leading-relaxed text-paper/60">
                  {site.contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Oversized wordmark strip */}
        <div className="border-t border-paper/12 px-5 sm:px-8 lg:px-10">
          <p
            aria-hidden
            className="display py-6 text-[clamp(30px,8.1vw,150px)] font-medium whitespace-nowrap text-paper/[0.08] select-none"
          >
            {site.descriptor}
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/12 px-5 py-5 text-[12px] text-paper/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>
            © {site.year} {site.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="label inline-flex items-center gap-2 self-start text-paper/70 transition-colors hover:text-paper sm:self-auto"
          >
            Back to top <ArrowUp className="size-3.5" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </footer>
  )
}
