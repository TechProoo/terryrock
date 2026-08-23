/* ---------------------------------------------------------------------------
   Every string and image the landing page renders, in one place.
   --------------------------------------------------------------------------- */

import logo from '../assets/terryrock_logo_transparent.png';

/* Site photography. The `site_*` files are the sharper 2026 set; the remaining
   `photo_*` files cover subjects that set does not include — stored materials,
   workshop fabrication and crew at work. */
import heroScene from '../assets/site_05.jpg';
import chillerBank from '../assets/site_07.jpg';
import plantRoom from '../assets/site_13.jpg';
import pumpSets from '../assets/site_16.jpg';
import rooftopRun from '../assets/site_03.jpg';
import riserPipework from '../assets/site_12.jpg';
import ahuRiser from '../assets/site_01.jpg';
import installedPlant from '../assets/site_18.jpg';
import pumpHall from '../assets/site_20.jpg';
import qaPipework from '../assets/site_17.jpg';
import towerFarm from '../assets/site_04.jpg';
import ductRiser from '../assets/site_02.jpg';
import brandedVessel from '../assets/site_10.jpg';
import supportRun from '../assets/site_19.jpg';
import rooftopBlue from '../assets/site_09.jpg';

import materialStock from '../assets/photo_048.jpg';
import steelBand from '../assets/photo_037.jpg';
import fabrication from '../assets/photo_040.jpg';
import crewCutting from '../assets/photo_039.jpg';

export const brand = {
  name: 'TerryRock',
  legalName: 'TerryRock Technical Company Limited',
  formerly: 'Formerly Terry Technical Company',
  rc: 'RC 1360332',
  tagline: 'Your commercial thermal insulation allies',
  logo,
};

/* `to` values are router paths. A leading "/#id" navigates home and then scrolls
   to that section, so the nav works identically from any route. */
export const nav = {
  left: [
    { label: 'Contacts', to: '/#contact' },
    { label: "Let's build together", to: '/#contact' },
  ],
  right: [
    { label: 'Executed Projects', to: '/projects' },
    { label: 'Mechanical Systems', to: '/#services' },
  ],
};

export const hero = {
  headline: [
    [
      { text: 'TerryRock', tone: 'ink' },
      { text: 'builds', tone: 'steel' },
    ],
    [{ text: 'the systems behind', tone: 'steel-deep' }],
    [{ text: 'every building', tone: 'ink' }],
  ] as const,
  cta: 'Discover more',
  asideTitle: ['Engineering Timeless', 'Building Services'],
  asideBody:
    'A technical company that merges mechanical precision, thermal insulation and disciplined installation to keep the buildings of tomorrow running.',
  cards: [
    {
      icon: 'pin',
      title: ['Explore all', 'locations'],
      body: 'See every site on the map',
      href: '#projects',
    },
    {
      icon: 'eye',
      title: ['Discover', 'TerryRock'],
      body: 'See our approach',
      href: '#studio',
    },
  ] as const,
  wordmark: 'TERRYROCK',
  image: heroScene,
  imageAlt:
    'Polished stainless steel extract ducts and cyclones installed on a rooftop plant deck',
};

export const metaStrip = {
  tags: ['MECHANICAL', 'QUALITY', 'PRECISION'],
  facts: [
    { label: 'Engineering discipline', value: 'HVAC & Insulation' },
    { label: 'Operating since', value: '2009+' },
  ],
};

export const projects = {
  /* Heavier and left aligned, with the lede set opposite — the portfolio reads
     as a gallery masthead rather than another centred section head. */
  headline: [
    [
      { text: 'Recent', tone: 'plain' },
      { text: 'work', tone: 'sand' },
    ],
  ] as const,
  lede: 'A selection of mechanical, ductwork and insulation packages completed on site across Lagos and Abuja.',
  controls: { prev: 'Previous project', next: 'Next project' },
  items: [
    {
      tag: 'chilled water',
      title: 'TerryRock Technical',
      name: 'Chiller Bank & Headers',
      image: chillerBank,
      alt: 'Insulated chilled water headers running past a bank of air cooled chillers',
    },
    {
      tag: 'plant room',
      title: 'TerryRock Technical',
      name: 'Central Plant Pipework',
      image: plantRoom,
      alt: 'Insulated and clad pipework with valves inside a finished central plant room',
    },
    {
      tag: 'pump sets',
      title: 'TerryRock Technical',
      name: 'Pump Set Installation',
      image: pumpSets,
      alt: 'Pump sets and insulated suction pipework installed in a plant room',
    },
    {
      tag: 'rooftop',
      title: 'TerryRock Technical',
      name: 'Rooftop Distribution',
      image: rooftopRun,
      alt: 'Insulated distribution pipework on painted supports across a rooftop',
    },
    {
      tag: 'risers',
      title: 'TerryRock Technical',
      name: 'Riser Pipework',
      image: riserPipework,
      alt: 'Insulated riser pipework and valves rising through a plant room',
    },
    {
      tag: 'air handling',
      title: 'TerryRock Technical',
      name: 'Rooftop AHU Risers',
      image: ahuRiser,
      alt: 'Insulated duct risers beside rooftop air handling units',
    },
  ],
};

export const studio = {
  headline: [
    [
      { text: 'TerryRock Technical — a', tone: 'plain' },
      { text: 'company', tone: 'plain' },
    ],
    [
      { text: 'focused on', tone: 'dim' },
      { text: 'systems, comfort,', tone: 'sand' },
    ],
    [{ text: 'and lasting performance', tone: 'sand' }],
  ] as const,
  lede: 'A disciplined vision of working buildings that merge engineering, precision and long service life.',
  card: {
    title: 'TerryRock Technical',
    subtitle: ['Fabrication &', 'Site Installation'],
    image: fabrication,
    imageAlt: 'A TerryRock fabricator welding a galvanised duct section on site',
  },
  feature: {
    image: ductRiser,
    imageAlt: 'A tall insulated duct riser installed beside rooftop air handling plant',
  },
  pitch: {
    title: ["The future of building services", "isn't about what looks", 'impressive today.'],
    body: "It's about installing systems that perform, endure, and last.",
    actions: [
      { label: 'Our clients', href: '#clients' },
      { label: 'Our services', href: '#services' },
    ],
    proofImages: [brandedVessel, supportRun, rooftopBlue],
    proof: 'Over 50 contractors across Nigeria and West Africa trust TerryRock to build the future.',
  },
};

export const footer = {
  tags: metaStrip.tags,
  facts: metaStrip.facts,
};

/* ---------------------------------------------------------------------------
   Services — the thirteen disciplines, plus the workshop that backs them.
   --------------------------------------------------------------------------- */

export const services = {
  headline: [
    [
      { text: 'Thirteen disciplines', tone: 'plain' },
      { text: 'delivered', tone: 'dim' },
    ],
    [{ text: 'under one contract', tone: 'sand' }],
  ] as const,
  lede: 'Mechanical, insulation and electrical work handled in house — from pipe fabrication and welding through to cladding, HVAC and thermal insulation.',
  items: [
    {
      title: 'Pipe fittings & welding',
      body: 'Stainless, mild steel, galvanised, PVC and PPR pipe. Valve installation, elbows rolled to any angle, TIG and MIG welding with argon to certified standards — fabrication, site installation and testing, including sewage pumping stations.',
    },
    {
      title: 'Insulation & acoustic materials',
      body: 'Polystyrene, polyurethane and rigid pipe insulation, imported or sourced locally to suit the client.',
    },
    {
      title: 'Cladding',
      body: 'Aluminium and stainless steel, 0.5mm to 1mm thick, riveted at even centres for locally fabricated panels.',
    },
    {
      title: 'Laminating',
      body: 'Resin, fibremat, catalyst and accelerator pigment.',
    },
    {
      title: 'Stainless & mild steel tanks',
      body: 'Construction and installation in cylindrical, rectangular and square configurations, across a range of capacities and sizes.',
    },
    {
      title: 'HVAC',
      body: 'Installation, management and control, with air conditioning ductwork fabricated and erected on site.',
    },
    {
      title: 'Machine & equipment installation',
      body: 'Machines and equipment of different kinds and sizes.',
    },
    {
      title: 'Industrial & domestic plumbing',
      body: 'Plumbing installations for industrial plant and private residences alike.',
    },
    {
      title: 'Generator exhausts',
      body: 'Exhaust pipes and muffler pots fabricated and installed for industrial gen-sets.',
    },
    {
      title: 'Boiler chimneys',
      body: 'Fabrication and installation.',
    },
    {
      title: 'Electrical installation',
      body: 'Panels, trunking and wiring.',
    },
    {
      title: 'Industrial thermal insulation',
      body: 'Hot and cold pipe and tank insulation, generator house soundproofing, club wall insulation and studio insulation.',
    },
    {
      title: 'Supply of insulation materials',
      body: 'Rockwool, rigid pipe insulation, polystyrene, aluminium polyisocyanate, ceramic fibre, calcium silicate, fire blanket, stainless sheet and band.',
    },
  ],
  gallery: [
    {
      image: materialStock,
      alt: 'Rockwool pipe sections stacked and bagged in the TerryRock store',
      caption: 'Materials',
    },
    {
      image: installedPlant,
      alt: 'Insulated and clad pipework installed through a finished plant room',
      caption: 'Installation',
    },
    {
      image: pumpHall,
      alt: 'Pump sets and insulated headers in a completed plant hall',
      caption: 'Plant rooms',
    },
  ],
  kitImage: steelBand,
  kitImageAlt: 'A coil of stainless banding on the workshop floor',
  kitLabel: 'Workshop equipment',
  kit: [
    'Arc welding machine',
    'Angle grinder (large)',
    'Angle grinder (small)',
    'Argon / TIG welder, water cooled',
    'Rolling machine',
    'Cutting machine',
    'Swagging machine',
    'Lockforming machine',
    'Bending machine',
    'Work bench',
    'Table vice',
    'Electrical extension cables',
  ],
};

/* ---------------------------------------------------------------------------
   Quality — the policy, the objectives it sets, and the mission behind it.
   --------------------------------------------------------------------------- */

export const quality = {
  headline: [
    [
      { text: 'Quality that is', tone: 'plain' },
      { text: 'measurable,', tone: 'dim' },
    ],
    [{ text: 'audited and never optional', tone: 'sand' }],
  ] as const,
  lede: 'The quality system is designed to meet EN ISO 9001:2008 and is subject to annual audit.',
  policy:
    'Every member of staff is trained on quality awareness and its impact on customer service. Compliance is mandatory for all personnel.',
  banner: {
    image: qaPipework,
    alt: 'Insulated and clad pipework with valves and gauges in a finished plant room',
  },
  columns: [
    {
      label: 'Quality objectives',
      items: [
        'Maintain an effective QA system complying with BS EN ISO 9001:2008',
        "Be our clients' preferred choice",
        'Strive to exceed customer expectations',
        'Achieve and maintain quality that builds the company reputation',
        'Ensure compliance with statutory and safety requirements',
        'Maximise customer satisfaction at all times',
        'Minimise environmental impact',
      ],
    },
    {
      label: 'Mission',
      items: [
        'Provide the highest quality engineering and insulation services',
        'Establish quality that is measurable and consistent with client requirements and specifications',
        'Train employees to ensure competency in tasks affecting quality and safety',
        'Zero tolerance to unsafe acts and conditions',
      ],
    },
  ],
  pillars: {
    label: 'Commercial strength',
    items: [
      'Delivery on or ahead of schedule and budget',
      'Ongoing research and development',
      'Staff development',
    ],
  },
};

/* ---------------------------------------------------------------------------
   Clients — organisations TerryRock has worked for.
   --------------------------------------------------------------------------- */

export const clients = {
  headline: [
    [{ text: 'Trusted by the names', tone: 'plain' }],
    [
      { text: 'that build', tone: 'dim' },
      { text: 'Nigeria', tone: 'sand' },
    ],
  ] as const,
  lede: 'Work delivered across oil and gas, manufacturing, hospitality, utilities and construction.',
  banner: {
    image: towerFarm,
    alt: 'Insulated rooftop pipework and chiller plant beside a high-rise tower',
  },
  names: [
    'Chevron Nigeria Limited',
    'Eko Hotels Limited',
    'Flour Mills Nigeria PLC',
    'Four Points by Sheraton',
    'I.T.B Nigeria Limited',
    'Intercontinental Hotel',
    'Milan Nigeria Limited',
    'Myjoy Food Industries Limited',
    'Nigerian Bag Manufacturing Coy. PLC',
    'Ocean Parade Towers',
    'Powertech Engineering Limited',
    'Engee Pet Manufacturing Coy. Ltd',
    'Mitsulift Nigeria Limited',
    'Miluman Nigeria Limited',
    'Wayus Nigeria Limited',
    'ETCO Nigeria Limited',
    'Nairda Limited',
  ],
};

/* ---------------------------------------------------------------------------
   Team — the people who carry a job from estimate to commissioning.
   --------------------------------------------------------------------------- */

export const team = {
  headline: [
    [{ text: 'Designers, estimators,', tone: 'plain' }],
    [
      { text: 'site crew and', tone: 'dim' },
      { text: 'technicians', tone: 'sand' },
    ],
  ] as const,
  lede: 'A management structure that carries a job from first estimate through to commissioning.',
  banner: {
    image: crewCutting,
    alt: 'A TerryRock site technician in branded workwear cutting a duct section',
    caption: 'Site crew at work',
  },
  people: [
    {
      name: 'Taiwo I. Jubrila',
      role: 'Managing Director',
      qualification: 'B.Sc Mechanical Engineering',
    },
    { name: 'Abimbola Jubrila', role: 'Executive Director', qualification: 'B.Sc Accounting' },
    {
      name: 'Ojedokun Olatunji',
      role: 'Operations Director',
      qualification: 'B.Sc Mech. Engr., MSc Project Management (UNILAG)',
    },
    { name: 'James Akoma', role: 'Head Technician', qualification: '' },
    { name: 'Kehinde I. Jubrila', role: 'Site Supervisor', qualification: '' },
    { name: 'Orumwense Stephen', role: 'Site Supervisor', qualification: '' },
    { name: 'Afolabi Oladiran', role: 'Site Supervisor', qualification: '' },
  ],
};

/* ---------------------------------------------------------------------------
   Contact — three premises, and every way in.
   --------------------------------------------------------------------------- */

export const contact = {
  headline: [
    [
      { text: "Let's build", tone: 'plain' },
      { text: 'together', tone: 'sand' },
    ],
  ] as const,
  lede: 'Two Lagos premises and an Abuja workshop, open to construction, industrial, utility, hospitality and oil and gas clients.',
  offices: [
    {
      label: 'Lagos — office & workshop',
      lines: ['No. 19, Jamiu Balogun Street', 'Shangisha-Magodo Road', 'Ikosi-Ketu, Lagos'],
    },
    {
      label: 'Lagos — warehouse',
      lines: ['7 Ilare Close', '7 & 8 Bus Stop, Airport Road', 'Mafoluku, Oshodi, Lagos'],
    },
    {
      label: 'Abuja — office & workshop',
      lines: ['Beside Exclusive Holiday Resort and Suites', 'Lokogoma District', 'FCT Abuja'],
    },
  ],
  phones: ['08023460746', '08038810551', '08057688724', '07076402445'],
  emails: ['info@terrytechnical.com', 'terry_technical@yahoo.com', 'terryrock24@gmail.com'],
  socials: [
    {
      label: 'Instagram',
      handle: 'terry.technical07',
      href: 'https://instagram.com/terry.technical07',
    },
    { label: 'Skype', handle: 'terry.technical07', href: 'skype:terry.technical07?chat' },
    {
      label: 'Facebook',
      handle: '/terrytechnicalcompanyltd',
      href: 'https://facebook.com/terrytechnicalcompanyltd',
    },
  ],
};
