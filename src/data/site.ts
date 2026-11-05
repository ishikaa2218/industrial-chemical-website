/**
 * Company details — EDIT THIS FILE with confirmed client information.
 * Every value wrapped in [square brackets] or using example.com is a
 * placeholder and must be replaced before the site goes live.
 */
export const site = {
  name: 'Company Name',
  shortName: 'CN',
  descriptor: 'Industrial Chemicals',
  tagline: 'Manufacturing & Trading',
  description:
    'Manufacturer and trader of industrial chemicals for steel hardening, heat treatment and automotive component manufacturing.',
  url: 'https://industrial-chemical-website.vercel.app',

  contact: {
    email: 'enquiries@example.com',
    phone: '+00 00000 00000',
    phoneHref: '+0000000000',
    whatsapp: '0000000000', // international format, digits only — e.g. 919800000000
    addressLines: ['[Street address, Industrial area]', '[City, State – Postal code]', '[Country]'],
    hours: '[Business days] · [Opening hours]',
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
