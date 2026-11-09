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
  /** Supply note shown with each application */
  supply: string
}

export const categories: Category[] = [
  {
    slug: 'steel-hardening',
    index: '01',
    name: 'Iron & Steel Hardening',
    shortName: 'Hardening',
    summary:
      'Process chemicals for the hardening of iron and steel components — an application where the material, the process conditions and the chemistry have to work together.',
    body: [
      'Hardening usually involves heating a ferrous component to its hardening temperature and then cooling it at a controlled rate, often followed by tempering. Case hardening methods such as carburising, carbonitriding and nitriding instead enrich the surface layer, giving a hard, wear-resistant case over a tougher core.',
      'Which chemicals suit a hardening process depends on the steel grade, the section size, the furnace or bath in use and the properties specified for the part. We discuss these details with customers before recommending anything for their application.',
    ],
    applications: [
      'Through hardening of steel parts',
      'Carburising and carbonitriding',
      'Nitriding and nitrocarburising',
      'Tempering after hardening',
    ],
    usedBy: ['Heat treatment shops', 'Component manufacturers', 'Steel processors'],
    photo: 'moltenPour',
    supply: 'Product details shared on enquiry',
  },
  {
    slug: 'heat-treatment',
    index: '02',
    name: 'Heat Treatment & Quenching',
    shortName: 'Heat Treatment',
    summary:
      'Quenching media and related process chemicals used in heat treatment, where the cooling stage largely decides the structure a steel part ends up with.',
    body: [
      'Quenching media range from water and brine to quenching oils, aqueous polymer quenchants and molten salts. Each removes heat at a different rate, so each suits different steel grades, section thicknesses and distortion limits.',
      'Results also depend on bath temperature, agitation and how well the medium is maintained in use. Choosing a quenching medium is therefore a process decision, and we help customers work through it for their own operations.',
    ],
    applications: [
      'Quenching after hardening',
      'Salt-bath heat treatment',
      'Annealing, normalising and tempering',
      'Limiting scale and decarburisation',
    ],
    usedBy: ['Commercial heat treaters', 'In-house heat treatment units', 'Forging units'],
    photo: 'furnace',
    supply: 'Product details shared on enquiry',
  },
  {
    slug: 'specialty-chemicals',
    index: '03',
    name: 'Steel & Metal Processing',
    shortName: 'Metal Processing',
    summary:
      'Cleaning, surface preparation and protection chemistry for metal parts moving between machining, heat treatment and finishing.',
    body: [
      'Oils, coolants and residues left from machining can affect how a part responds to heat treatment, and quench residues need removing afterwards. Degreasing and cleaning before and after treatment help keep surfaces in a consistent condition.',
      'Between operations, parts may also need temporary protection against rust during storage or transit. The right chemistry depends on the metal, the next process step and how long the parts need to be protected.',
    ],
    applications: [
      'Degreasing before heat treatment',
      'Removal of quench residues',
      'Surface preparation for finishing',
      'Temporary rust protection',
    ],
    usedBy: ['Metal processing units', 'Engineering workshops', 'Component manufacturers'],
    photo: 'labBeaker',
    supply: 'Product details shared on enquiry',
  },
  {
    slug: 'process-chemicals',
    index: '04',
    name: 'Textile Dyeing & Processing',
    shortName: 'Textile Dyeing',
    summary:
      'Chemicals used in textile wet processing — at the preparation, dyeing and finishing stages of yarn and fabric.',
    body: [
      'Before dyeing, yarn and fabric are usually prepared through processes such as scouring and bleaching. Dyeing then relies on dyes suited to the fibre, together with auxiliaries such as wetting, levelling and dispersing agents that help produce even, repeatable shades.',
      'Requirements vary with the fibre, the dye class and the machinery in use. We discuss the process with dyeing and processing units before suggesting chemicals for their application.',
    ],
    applications: [
      'Scouring and bleaching',
      'Dyeing of yarn and fabric',
      'Dyeing auxiliaries',
      'Finishing processes',
    ],
    usedBy: ['Dyeing units', 'Textile processors', 'Hosiery and knitwear units'],
    photo: 'chemicalPlant',
    supply: 'Product details shared on enquiry',
  },
  {
    slug: 'automotive',
    index: '05',
    name: 'Automotive Components',
    shortName: 'Automotive',
    summary:
      'Gears, shafts, fasteners and other automotive parts often need controlled heat treatment to reach the properties specified for them.',
    body: [
      'Many automotive components are made from steels that are hardened, case hardened or tempered so they can cope with wear, fatigue and load in service. Gears and shafts commonly receive surface hardening, while fasteners are often hardened and tempered.',
      'In volume production, consistency from batch to batch matters as much as the treatment itself. Suitable, well-maintained process chemicals are one part of keeping conditions stable, alongside equipment, process control and inspection.',
    ],
    applications: [
      'Gears and transmission parts',
      'Shafts, pins and fasteners',
      'Engine and chassis components',
      'Cleaning before and after treatment',
    ],
    usedBy: ['Auto component manufacturers', 'Auto-parts suppliers', 'Heat treatment partners'],
    photo: 'autoBodyLine',
    supply: 'Product details shared on enquiry',
  },
]

export type Industry = {
  name: string
  line: string
  /** a little more context, shown when the industry is opened */
  detail: string
  /** product category slugs most relevant to this industry */
  categories: string[]
  photo: PhotoKey
}

export const industries: Industry[] = [
  {
    name: 'Automotive Manufacturing',
    line: 'Vehicle production relies on metal parts whose properties are set by controlled heat treatment.',
    detail:
      'Components such as gears, shafts and fasteners are typically hardened, case hardened or tempered before assembly. The chemistry used in those treatments is one of the factors that keeps results consistent.',
    categories: ['automotive', 'heat-treatment'],
    photo: 'autoRobots',
  },
  {
    name: 'Automotive Components',
    line: 'Gears, pins, shafts and fasteners commonly need surface or through hardening to meet their specification.',
    detail:
      'Component makers and their heat treatment partners need treatment conditions that hold steady over long production runs. Process chemicals are part of that, together with equipment, process control and inspection.',
    categories: ['automotive', 'steel-hardening', 'heat-treatment'],
    photo: 'machinedParts',
  },
  {
    name: 'Steel & Metal Processing',
    line: 'Metal processing involves several treatment stages, each with its own chemical requirement.',
    detail:
      'From degreasing and cleaning to hardening and temporary rust protection, suitable process chemicals help maintain the conditions each manufacturing step requires.',
    categories: ['specialty-chemicals', 'steel-hardening'],
    photo: 'steelCoils',
  },
  {
    name: 'Industrial Engineering',
    line: 'Engineering components often need treatment matched to the conditions they will face in service.',
    detail:
      'Machine parts, tools and fabricated components vary widely in material and duty. Treatment and process chemicals are chosen around the material and its intended operating requirements.',
    categories: ['steel-hardening', 'specialty-chemicals'],
    photo: 'cncWorkshop',
  },
  {
    name: 'Textile Dyeing',
    line: 'Dyeing and finishing use application-specific chemicals at the preparation, coloration and finishing stages.',
    detail:
      'Ludhiana is a major centre for hosiery and knitwear, and textile wet processing is part of its industrial base. Requirements depend on the fibre, the dye class and the machinery in use.',
    categories: ['process-chemicals'],
    photo: 'labBeaker',
  },
  {
    name: 'Heat Treatment',
    line: 'Hardening, quenching and tempering depend on carefully selected media and well-maintained baths.',
    detail:
      'Commercial heat treaters and in-house units work with quenching media, salt baths and related chemicals whose condition directly affects results. Selection and upkeep matter as much as the product itself.',
    categories: ['heat-treatment', 'steel-hardening'],
    photo: 'furnaceRod',
  },
]

export type Reason = { title: string; body: string }

export const reasons: Reason[] = [
  {
    title: 'Established since the 1990s',
    body: 'Geeta Paints and Chemicals (India) has been part of the chemical trade in Ludhiana since the 1990s, serving the industries around it.',
  },
  {
    title: 'Based in Ludhiana, Punjab',
    body: 'Ludhiana is one of Punjab’s main industrial centres, home to engineering, auto-parts and textile units. Being based here keeps us close to the work.',
  },
  {
    title: 'The application comes first',
    body: 'We start with the process — the material, the equipment and the specification — before discussing which chemicals suit the job.',
  },
  {
    title: 'Practical guidance on use',
    body: 'How a chemical is used, stored and maintained affects what it delivers. We discuss handling and use with customers as part of each enquiry.',
  },
  {
    title: 'Metal and textile applications',
    body: 'Our work covers metal hardening and heat treatment as well as textile dyeing — two activities at the core of the region’s industry.',
  },
  {
    title: 'Built on ongoing relationships',
    body: 'Industrial supply works best as a continuing relationship. We aim to stay in touch after supply and respond as customers’ requirements change.',
  },
]
