/**
 * All photography is sourced from Unsplash (free to use under the Unsplash
 * License) and served through Unsplash's image CDN, which handles resizing
 * and modern formats (AVIF/WebP) automatically.
 * Replace with the client's own plant and product photography when available.
 */
export type Photo = {
  id: string
  alt: string
  /** Focal point for object-position, e.g. '50% 40%' */
  focus?: string
}

export const photos = {
  heroMill: {
    id: '1748946469841-99e75941b997',
    alt: 'Glowing steel rods moving along a rolling-mill line',
    focus: '50% 55%',
  },
  moltenPour: {
    id: '1613970351372-9804e380bd09',
    alt: 'Molten metal pouring from a furnace into an industrial ladle',
    focus: '55% 50%',
  },
  furnace: {
    id: '1727504172873-8634d9906f04',
    alt: 'Open industrial furnace with flames during a heat treatment cycle',
    focus: '50% 50%',
  },
  furnaceRod: {
    id: '1530154134337-2dc5d3dd3049',
    alt: 'Operator handling a metal part at the mouth of a heat treatment furnace',
    focus: '60% 50%',
  },
  steelCoils: {
    id: '1697698532634-ea59b636ccea',
    alt: 'Rolled steel coils lined up in a steel processing warehouse',
    focus: '50% 50%',
  },
  chemicalPlant: {
    id: '1736820712641-56badd26f83b',
    alt: 'Chemical manufacturing plant with steel pipework, valves and storage tanks',
    focus: '50% 45%',
  },
  labBeaker: {
    id: '1617155093730-a8bf47be792d',
    alt: 'Gloved hand holding a glass beaker of liquid during quality testing',
    focus: '45% 50%',
  },
  autoBodyLine: {
    id: '1567789884554-0b844b597180',
    alt: 'Robotic arms assembling a car body on an automotive production line',
    focus: '50% 50%',
  },
  autoRobots: {
    id: '1647427060118-4911c9821b82',
    alt: 'Orange industrial robots working along an automobile manufacturing line',
    focus: '50% 50%',
  },
  machinedParts: {
    id: '1769147339214-076740872485',
    alt: 'Precision-machined metal components resting on an engineering drawing',
    focus: '50% 50%',
  },
  lathe: {
    id: '1666634157070-6fd830fb5672',
    alt: 'Steel shaft held in a lathe chuck while being machined',
    focus: '50% 50%',
  },
  grinding: {
    id: '1504917595217-d4dc5ebe6122',
    alt: 'Metalworker grinding steel with sparks flying',
    focus: '50% 50%',
  },
  cncWorkshop: {
    id: '1787039467622-ddec5c24320c',
    alt: 'Engineering workshop with CNC machines and metalworking tools',
    focus: '50% 50%',
  },
  drums: {
    id: '1572002034205-06479bac537b',
    alt: 'Rows of steel chemical drums stored in a warehouse',
    focus: '50% 50%',
  },
  gears: {
    id: '1752692778846-44ce22202d5b',
    alt: 'Pile of hardened steel gear blanks',
    focus: '50% 50%',
  },
  steelPlant: {
    id: '1496247749665-49cf5b1022e9',
    alt: 'Interior of a large steel processing plant',
    focus: '50% 50%',
  },
  pipes: {
    id: '1721622045796-d7dd41ef5788',
    alt: 'Stacked galvanised steel pipes',
    focus: '50% 50%',
  },
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

const BASE = 'https://images.unsplash.com/photo-'

export function photoUrl(id: string, width: number, ratio?: number) {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    q: '72',
    w: String(width),
  })
  if (ratio) params.set('h', String(Math.round(width / ratio)))
  return `${BASE}${id}?${params.toString()}`
}

export function photoSrcSet(id: string, ratio?: number, widths = [480, 768, 1080, 1440, 1920]) {
  return widths.map((w) => `${photoUrl(id, w, ratio)} ${w}w`).join(', ')
}
