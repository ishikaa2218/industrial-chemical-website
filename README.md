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

## Company content

The site content describes **Geeta Paints and Chemicals (India)**, an established chemical business in Ludhiana, Punjab, with roots in the 1990s, serving metal hardening, heat treatment, automotive component, metal processing and textile dyeing applications.

Still to confirm with the company before relying on them:

- **`src/data/site.ts`** — street address and Google Maps embed URL (email and phone are confirmed: marwaha1968@gmail.com, +91 98150 83569).
- **`src/data/content.ts`** — specific product names and grades for each application (the site deliberately describes applications rather than invented products).
- **`src/components/common/Logo.tsx`** — temporary mark; replace with the company logo if one exists.
- **Photography** (`src/data/images.ts`) — royalty-free Unsplash images of general industry; they do not show the company's own premises or products.

No founding year, founders, facilities, certifications, clients, statistics or product specifications have been stated, as none are confirmed.

## Contact form

The form validates every field on the client. Because there is no backend, it does **not** store or send submissions. After validation, the user can send the prepared enquiry via their email app (`mailto:`) or WhatsApp. To enable real submissions, connect a form/email service (e.g. Formspree, Resend, EmailJS) or a serverless function.
