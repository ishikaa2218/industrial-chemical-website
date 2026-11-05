import type { PhotoKey } from './images'

export type Category = {
  slug: string
  index: string
  name: string
  shortName: string
  summary: string
  body: string[]
  applications: string[]
  usedBy: string[]
  photo: PhotoKey
  /** Manufactured, traded or both — confirm with the client */
  supply: string
}

export const categories: Category[] = [
  {
    slug: 'steel-hardening',
    index: '01',
    name: 'Steel Hardening Chemicals',
    shortName: 'Steel Hardening',
    summary:
      'Chemicals that support case hardening, quenching and surface treatment of steel parts — where the right chemistry decides the final hardness and wear life.',
    body: [
      'Hardening is where a steel component earns its strength. The media used to carburise, nitride or quench a part directly influences surface hardness, wear resistance, distortion and the consistency of results from batch to batch.',
      'We supply chemicals used across these hardening stages to steel processors, heat treatment shops and component manufacturers, and help match each requirement to the customer’s process and equipment.',
    ],
    applications: [
      'Case hardening and carburising',
      'Nitriding and nitrocarburising',
      'Quenching operations',
      'Surface hardening of gears, shafts and fasteners',
    ],
    usedBy: ['Steel processors', 'Heat treatment shops', 'Component manufacturers'],
    photo: 'moltenPour',
    supply: '[Manufactured / Traded — to be confirmed]',
  },
  {
    slug: 'heat-treatment',
    index: '02',
    name: 'Heat Treatment Chemicals',
    shortName: 'Heat Treatment',
    summary:
      'Process chemicals for salt-bath, quenching and protective stages of heat treatment, supplied for in-house furnaces and commercial heat treaters alike.',
    body: [
      'Every heat treatment cycle — annealing, normalising, hardening, tempering — relies on controlled chemistry around the furnace. Salt baths, quenching media and protective compounds all affect surface finish, scale formation and repeatability.',
      'Our heat treatment range is aimed at plants that need dependable quality and steady availability so that furnaces keep running to schedule.',
    ],
    applications: [
      'Annealing, normalising and tempering',
      'Salt-bath heat treatment',
      'Quenching and controlled cooling',
      'Scale and decarburisation control',
    ],
    usedBy: ['Commercial heat treaters', 'Captive heat treatment units', 'Forging units'],
    photo: 'furnace',
    supply: '[Manufactured / Traded — to be confirmed]',
  },
  {
    slug: 'specialty-chemicals',
    index: '03',
    name: 'Specialty Industrial Chemicals',
    shortName: 'Specialty Chemicals',
    summary:
      'Process-specific chemistry for cleaning, surface preparation and protection of metal parts between manufacturing stages.',
    body: [
      'Between machining, treatment and assembly, metal parts pass through several cleaning, preparation and protection steps. Each step has its own chemical requirement, and getting it wrong shows up later as rejects or rework.',
      'Our specialty range addresses these in-between stages, with selection based on the substrate, the process that follows and the customer’s plant conditions.',
    ],
    applications: [
      'Metal cleaning and degreasing',
      'Surface preparation before treatment',
      'Rust prevention between process stages',
      'Customer-specific process requirements',
    ],
    usedBy: ['Metalworking units', 'Engineering workshops', 'Component manufacturers'],
    photo: 'labBeaker',
    supply: '[Manufactured / Traded — to be confirmed]',
  },
  {
    slug: 'process-chemicals',
    index: '04',
    name: 'Industrial Process Chemicals',
    shortName: 'Process Chemicals',
    summary:
      'Base and auxiliary chemicals used in day-to-day manufacturing operations, supplied in volumes that suit recurring plant consumption.',
    body: [
      'Alongside specialised formulations, most plants consume a steady volume of base and auxiliary chemicals for routine operations and maintenance. Here, consistency of supply matters as much as the product itself.',
      'We support these recurring requirements with planned supply, so that procurement teams are not left chasing material at short notice.',
    ],
    applications: [
      'General manufacturing processes',
      'Plant and equipment maintenance',
      'Recurring bulk requirements',
      'Auxiliary chemicals for treatment lines',
    ],
    usedBy: ['Manufacturing plants', 'Maintenance teams', 'Procurement departments'],
    photo: 'chemicalPlant',
    supply: '[Manufactured / Traded — to be confirmed]',
  },
  {
    slug: 'automotive',
    index: '05',
    name: 'Automotive Industry Chemical Solutions',
    shortName: 'Automotive',
    summary:
      'Chemical support for automotive component manufacturing — from hardening of transmission parts to cleaning and protection before assembly.',
    body: [
      'Gears, shafts, bearings, pins and fasteners all go through hardening, heat treatment and surface preparation before they reach an assembly line. Automotive programmes demand that these results stay consistent over long production runs.',
      'We work with automotive component makers and their heat treatment partners to supply chemicals that fit the process at each of these stages.',
    ],
    applications: [
      'Gear and transmission components',
      'Shafts, pins and fasteners',
      'Engine and chassis parts',
      'Pre- and post-treatment cleaning',
    ],
    usedBy: ['Automotive component makers', 'Tier suppliers', 'Heat treatment partners'],
    photo: 'autoBodyLine',
    supply: '[Manufactured / Traded — to be confirmed]',
  },
]

export type Industry = {
  name: string
  line: string
  photo: PhotoKey
}

export const industries: Industry[] = [
  {
    name: 'Automobile Manufacturing',
    line: 'Chemicals that support the processing of parts destined for vehicle production lines.',
    photo: 'autoRobots',
  },
  {
    name: 'Automotive Components',
    line: 'Hardening, heat treatment and preparation chemistry for gears, shafts, pins and fasteners.',
    photo: 'machinedParts',
  },
  {
    name: 'Steel Processing',
    line: 'Supply for steel processors where surface quality and hardness consistency matter.',
    photo: 'steelCoils',
  },
  {
    name: 'Metalworking',
    line: 'Cleaning, protection and process chemicals for machining and fabrication units.',
    photo: 'grinding',
  },
  {
    name: 'Industrial Engineering',
    line: 'Process chemicals for engineering workshops and equipment manufacturers.',
    photo: 'cncWorkshop',
  },
  {
    name: 'Heat Treatment',
    line: 'Chemicals for commercial heat treaters and captive furnace operations.',
    photo: 'furnaceRod',
  },
]

export type Reason = { title: string; body: string }

export const reasons: Reason[] = [
  {
    title: 'Manufacturing and trading, together',
    body: 'We manufacture and we trade. Customers can source process-specific chemicals and regular-use materials through a single, accountable supplier.',
  },
  {
    title: 'Solutions shaped by your industry',
    body: 'Steel hardening, heat treatment and automotive work each have their own demands. We start with the process, then recommend the chemistry.',
  },
  {
    title: 'A steady focus on product quality',
    body: 'Consistent material is what keeps a hardening line predictable. Quality is checked before every dispatch, not assumed.',
  },
  {
    title: 'Reliable, planned supply',
    body: 'We plan supply around customers’ consumption so that production does not wait on chemicals.',
  },
  {
    title: 'Customer-oriented approach',
    body: 'Direct communication, clear answers on technical questions and a team that follows through after the order is placed.',
  },
  {
    title: 'Built for long-term relationships',
    body: 'We aim to be the supplier a plant keeps for years — measured by repeat orders, not one-off sales.',
  },
]
