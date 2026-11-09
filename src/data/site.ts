/**
 * Company details for Geeta Paints and Chemicals (India), Ludhiana.
 * The email address, phone and WhatsApp numbers below are still
 * placeholders (example.com / zeros) — replace them with the company's
 * confirmed contact details before relying on them.
 */
export const site = {
  name: 'Geeta Paints and Chemicals (India)',
  shortName: 'Geeta Paints and Chemicals',
  descriptor: 'Industrial Chemicals',
  tagline: 'Ludhiana, Punjab',
  description:
    'An established chemical business in Ludhiana, Punjab, since the 1990s — serving metal hardening, heat treatment, automotive component and textile dyeing applications.',
  url: 'https://industrial-chemical-website.vercel.app',

  contact: {
    email: 'enquiries@example.com',
    phone: '+00 00000 00000',
    phoneHref: '+0000000000',
    whatsapp: '0000000000', // international format, digits only — e.g. 919800000000
    addressLines: ['Ludhiana', 'Punjab', 'India'],
    hours: 'Please call or email to arrange a visit',
    mapEmbedUrl: '', // paste a Google Maps "Embed a map" URL here to show the map
  },

  year: new Date().getFullYear(),
} as const

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products & Applications' },
  { to: '/contact', label: 'Contact Us' },
] as const
