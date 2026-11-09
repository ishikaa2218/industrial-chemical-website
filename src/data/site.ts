/**
 * Company details for Geeta Paints and Chemicals (India), Ludhiana.
 * Contact email and phone number are the company's confirmed details.
 * The WhatsApp link uses the same number.
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
    email: 'marwaha1968@gmail.com',
    phone: '+91 98150 83569',
    phoneHref: '+919815083569',
    whatsapp: '919815083569', // international format, digits only
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
