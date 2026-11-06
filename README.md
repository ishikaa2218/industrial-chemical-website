# Industrial Chemical Website

A four-page corporate website for an industrial chemical manufacturer and trader serving steel hardening, heat treatment and automotive component manufacturing.

Built by **Grind** as a frontend-only site — no backend, database or API.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · React Router · Lucide React

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, company introduction, product-category carousel, industries served, process band, why choose us, CTA |
| `/about` | About Us — introduction, business (manufacturing / trading), capabilities, trading & distribution, industrial expertise, quality approach, customer commitment |
| `/products` | Products & Applications — five categories plus trading & distribution, sticky category navigation, enquiry links |
| `/contact` | Contact Us — validated enquiry form, contact details, map placeholder |

## Layout & motion system

- **Full-bleed layout** — every section is a full-width band (`Section` in `src/components/common/Section.tsx`); content sits in `.container-wide`, which uses fluid gutters (`--gutter`) instead of a narrow centred column.
- **Motion tokens** — `src/motion/tokens.ts` defines the shared easing curves and durations (UI feedback ~0.2 s, reveals ~0.75 s, image wipes ~1.15 s).
- **Motion primitives** — `src/components/motion` provides `Reveal`, `Stagger`/`Item`, `MaskLines` (line-by-line heading masks), `ClipReveal` (clip-path image wipes), `Parallax` and `ScrollWords` (scroll-linked reading highlight). All respect `prefers-reduced-motion`.
- **Interactive sections** — pinned product-category story on the home page (swipe carousel on small screens), industries contact sheet with monochrome-to-colour frames and a keyboard-accessible detail sheet, product explorer tabs on the Products page.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Deployment

Hosted on Vercel, connected to this repository. Every push to `main` triggers a production build (`npm run build`, output `dist/`). `vercel.json` rewrites all routes to `index.html` for client-side routing.

## Content to replace before launch

All client-specific details are placeholders. Edit them in one place:

- **`src/data/site.ts`** — company name, email, phone, WhatsApp number, address, business hours, Google Maps embed URL, site URL.
- **`src/data/content.ts`** — product categories (supply type: manufactured / traded), applications, industries, reasons to choose the company.
- **`src/pages/About.tsx`** — "At a glance" facts (`[Year]`, `[City, State]`, `[Location]`), facility details, quote attribution `[Name], [Designation]`.
- **`src/components/common/Logo.tsx`** — temporary wordmark; replace with the client logo.
- **`public/`** — `og-image.png`, `favicon.svg`, `apple-touch-icon.png`, and update the domain in `sitemap.xml`, `robots.txt` and `index.html` if a custom domain is added.
- **Photography** (`src/data/images.ts`) — royalty-free Unsplash images served from the Unsplash CDN; swap for the client's own plant/product photos when available.

No product names, chemical compositions, specifications, certifications or statistics have been invented. Product ranges show a placeholder until the client supplies them.

## Contact form

The form validates every field on the client. Because there is no backend, it does **not** store or send submissions. After validation, the user can send the prepared enquiry via their email app (`mailto:`) or WhatsApp. To enable real submissions, connect a form/email service (e.g. Formspree, Resend, EmailJS) or a serverless function.
