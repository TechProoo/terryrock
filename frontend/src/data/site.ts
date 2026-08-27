/* ---------------------------------------------------------------------------
   Every string and image the landing page renders, in one place.
   --------------------------------------------------------------------------- */

import logo from "../assets/terryrock_logo_transparent.png";

/* Site photography. The `site_*` files are the sharper 2026 set; the remaining
   `photo_*` files cover subjects that set does not include — stored materials,
   workshop fabrication and crew at work. */
import heroScene from "../assets/site_05.jpg";
import chillerBank from "../assets/site_07.jpg";
import plantRoom from "../assets/site_13.jpg";
import pumpSets from "../assets/site_16.jpg";
import rooftopRun from "../assets/site_03.jpg";
import riserPipework from "../assets/site_12.jpg";
import ahuRiser from "../assets/site_01.jpg";
import installedPlant from "../assets/site_18.jpg";
import pumpHall from "../assets/site_20.jpg";
import qaPipework from "../assets/site_17.jpg";
import towerFarm from "../assets/site_04.jpg";
import ductRiser from "../assets/site_02.jpg";
import brandedVessel from "../assets/site_10.jpg";
import supportRun from "../assets/site_19.jpg";
import rooftopBlue from "../assets/site_09.jpg";

/* The thirteen discipline sheets — mostly contact sheets of a job rather than
   single frames, so the register shows a discipline's range rather than one
   moment of it. Their proportions run from a 4:1 strip to a 1:2.2 tower, which
   is why Services.css sizes them by their own ratio instead of cropping to a
   common frame. The systems page keeps its own set. */
import d1 from "../assets/one.jpg";
import d2 from "../assets/two.jpg";
import d3 from "../assets/three.jpg";
import d4 from "../assets/four.jpg";
import d5 from "../assets/five.jpg";
import d6 from "../assets/six.jpg";
import d7 from "../assets/seven.jpg";
import d8 from "../assets/eight.jpg";
import d9 from "../assets/nine.jpg";
import d10 from "../assets/ten.jpg";
import d11 from "../assets/eleven.jpg";
import d12 from "../assets/twelve.jpg";
import d13 from "../assets/thirteen.jpg";

import materialStock from "../assets/photo_048.jpg";
import workshopKit from "../assets/workshop.jpg";
import fabrication from "../assets/photo_040.jpg";
import crewCutting from "../assets/photo_039.jpg";

export const brand = {
  name: "TerryRock",
  legalName: "TerryRock Technical Company Limited",
  formerly: "Formerly Terry Technical Company",
  rc: "RC 1360332",
  tagline: "Your commercial thermal insulation allies",
  logo,
};

/* `to` values are router paths. A leading "/#id" navigates home and then scrolls
   to that section, so the nav works identically from any route. */
/* Shown on the transition curtain while a route is being entered. Keyed by
   pathname so an unknown route falls back to the company name. */
export const routeLabels: Record<string, string> = {
  "/": "Thermal & Mechanical",
  "/projects": "Executed Projects",
  "/services": "Services",
  "/systems": "Mechanical Systems",
  "/contact": "Let's build together",
};

/* Four pills, widest first: the two nearest the mark are the ones that survive
   the medium breakpoint, so the pair that matters most sits there. */
export const nav = {
  left: [{ label: "Services", to: "/services" }],
  right: [
    { label: "Contacts", to: "/contact" },
    { label: "Executed Projects", to: "/projects" },
    { label: "Mechanical Systems", to: "/systems" },
  ],
};

export const hero = {
  headline: [
    [
      { text: "TerryRock", tone: "ink" },
      { text: "builds", tone: "steel" },
    ],
    [{ text: "the systems behind", tone: "steel-deep" }],
    [{ text: "every building", tone: "ink" }],
  ] as const,
  cta: "Discover more",
  asideTitle: ["Engineering Timeless", "Building Services"],
  asideBody:
    "A technical company that merges mechanical precision, thermal insulation and disciplined installation to keep the buildings of tomorrow running.",
  cards: [
    {
      icon: "pin",
      title: ["Explore all", "locations"],
      body: "See every site on the map",
      href: "#projects",
    },
    {
      icon: "eye",
      title: ["Discover", "TerryRock"],
      body: "See our approach",
      href: "#studio",
    },
  ] as const,
  wordmark: "TERRYROCK",
  image: heroScene,
  imageAlt:
    "Polished stainless steel extract ducts and cyclones installed on a rooftop plant deck",
};

export const metaStrip = {
  tags: ["MECHANICAL", "QUALITY", "PRECISION"],
  facts: [
    { label: "Engineering discipline", value: "HVAC & Insulation" },
    { label: "Operating since", value: "2009+" },
  ],
};

export const projects = {
  /* Heavier and left aligned, with the lede set opposite — the portfolio reads
     as a gallery masthead rather than another centred section head. */
  headline: [
    [
      { text: "Recent", tone: "plain" },
      { text: "work", tone: "sand" },
    ],
  ] as const,
  lede: "A selection of mechanical, ductwork and insulation packages completed on site across Lagos and Abuja.",
  controls: { prev: "Previous project", next: "Next project" },
  items: [
    {
      tag: "chilled water",
      title: "TerryRock Technical",
      name: "Chiller Bank & Headers",
      image: chillerBank,
      alt: "Insulated chilled water headers running past a bank of air cooled chillers",
    },
    {
      tag: "plant room",
      title: "TerryRock Technical",
      name: "Central Plant Pipework",
      image: plantRoom,
      alt: "Insulated and clad pipework with valves inside a finished central plant room",
    },
    {
      tag: "pump sets",
      title: "TerryRock Technical",
      name: "Pump Set Installation",
      image: pumpSets,
      alt: "Pump sets and insulated suction pipework installed in a plant room",
    },
    {
      tag: "rooftop",
      title: "TerryRock Technical",
      name: "Rooftop Distribution",
      image: rooftopRun,
      alt: "Insulated distribution pipework on painted supports across a rooftop",
    },
    {
      tag: "risers",
      title: "TerryRock Technical",
      name: "Riser Pipework",
      image: riserPipework,
      alt: "Insulated riser pipework and valves rising through a plant room",
    },
    {
      tag: "air handling",
      title: "TerryRock Technical",
      name: "Rooftop AHU Risers",
      image: ahuRiser,
      alt: "Insulated duct risers beside rooftop air handling units",
    },
  ],
};

export const studio = {
  headline: [
    [
      { text: "TerryRock Technical — a", tone: "plain" },
      { text: "company", tone: "plain" },
    ],
    [
      { text: "focused on", tone: "dim" },
      { text: "systems, comfort,", tone: "sand" },
    ],
    [{ text: "and lasting performance", tone: "sand" }],
  ] as const,
  lede: "A disciplined vision of working buildings that merge engineering, precision and long service life.",
  card: {
    title: "TerryRock Technical",
    subtitle: ["Fabrication &", "Site Installation"],
    image: fabrication,
    imageAlt:
      "A TerryRock fabricator welding a galvanised duct section on site",
  },
  feature: {
    image: ductRiser,
    imageAlt:
      "A tall insulated duct riser installed beside rooftop air handling plant",
  },
  pitch: {
    title: [
      "The future of building services",
      "isn't about what looks",
      "impressive today.",
    ],
    body: "It's about installing systems that perform, endure, and last.",
    actions: [
      { label: "Our clients", href: "#clients" },
      { label: "Our services", href: "#services" },
    ],
    proofImages: [brandedVessel, supportRun, rooftopBlue],
    proof:
      "Over 50 contractors across Nigeria and West Africa trust TerryRock to build the future.",
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
      { text: "Thirteen disciplines", tone: "plain" },
      { text: "delivered", tone: "dim" },
    ],
    [{ text: "under one contract", tone: "sand" }],
  ] as const,
  lede: "Mechanical, insulation and electrical work handled in house — from pipe fabrication and welding through to cladding, HVAC and thermal insulation.",
  items: [
    {
      title: "Pipe fittings & welding",
      body: "Stainless, mild steel, galvanised, PVC and PPR pipe. Valve installation, elbows rolled to any angle, TIG and MIG welding with argon to certified standards — fabrication, site installation and testing, including sewage pumping stations.",
      image: d1,
      alt: "A sheet of pipework jobs — red-oxide headers, flanged valves and pump sets being welded and set on their plinths",
    },
    {
      title: "Insulation & acoustic materials",
      body: "Polystyrene, polyurethane and rigid pipe insulation, imported or sourced locally to suit the client.",
      image: d2,
      alt: "A sheet of insulation stock — rockwool pipe sections, foil-faced rolls, rubber sheet and bagged slab",
    },
    {
      title: "Cladding",
      body: "Aluminium and stainless steel, 0.5mm to 1mm thick, riveted at even centres for locally fabricated panels.",
      image: d3,
      alt: "A sheet of finished cladding — chilled water headers and risers wrapped in aluminium on a rooftop plant deck",
    },
    {
      title: "Laminating",
      body: "Resin, fibremat, catalyst and accelerator pigment.",
      image: d4,
      alt: "A TerryRock fabricator laying fibremat and resin over a lagged plant enclosure",
    },
    {
      title: "Stainless & mild steel tanks",
      body: "Construction and installation in cylindrical, rectangular and square configurations, across a range of capacities and sizes.",
      image: d5,
      alt: "A sheet of stainless fabrication — rolled cones, cut tube and finished cyclone vessels in the workshop",
    },
    {
      title: "HVAC",
      body: "Installation, management and control, with air conditioning ductwork fabricated and erected on site.",
      image: d6,
      alt: "A sheet of HVAC work — galvanised ductwork, clad air handling plant and valve headers through finished plant rooms",
    },
    {
      title: "Machine & equipment installation",
      body: "Machines and equipment of different kinds and sizes.",
      image: d7,
      alt: "A sheet of installed plant — mill and cyclone equipment with its ducting lagged in mineral wool and clad",
    },
    {
      title: "Industrial & domestic plumbing",
      body: "Plumbing installations for industrial plant and private residences alike.",
      image: d8,
      alt: "Insulated red flow and return pipework running to a bank of grey calorifiers in a plant room",
    },
    {
      title: "Generator exhausts",
      body: "Exhaust pipes and muffler pots fabricated and installed for industrial gen-sets.",
      image: d9,
      alt: "Stainless generator exhaust runs and muffler pots slung from the roof above a row of gen-sets",
    },
    {
      title: "Boiler chimneys",
      body: "Fabrication and installation.",
      image: d10,
      alt: "A sheet of chimney work — a flue section flanged up, welded, and raised on scaffold against the building",
    },
    {
      title: "Electrical installation",
      body: "Panels, trunking and wiring.",
      image: d11,
      alt: "The inside of a control panel — breakers, contactors and relays wired out to numbered terminals",
    },
    {
      title: "Industrial thermal insulation",
      body: "Hot and cold pipe and tank insulation, generator house soundproofing, club wall insulation and studio insulation.",
      image: d12,
      alt: "A sheet of thermal insulation — mineral wool pinned to walls and soffits, and storage tanks finished in foil and sheet",
    },
    {
      title: "Supply of insulation materials",
      body: "Rockwool, rigid pipe insulation, polystyrene, aluminium polyisocyanate, ceramic fibre, calcium silicate, fire blanket, stainless sheet and band.",
      image: d13,
      alt: "A sheet of supplied materials — calcium silicate and cellular glass segments, PIR shells and rubber roll",
    },
  ],
  gallery: [
    {
      image: materialStock,
      alt: "Rockwool pipe sections stacked and bagged in the TerryRock store",
      caption: "Materials",
    },
    {
      image: installedPlant,
      alt: "Insulated and clad pipework installed through a finished plant room",
      caption: "Installation",
    },
    {
      image: pumpHall,
      alt: "Pump sets and insulated headers in a completed plant hall",
      caption: "Plant rooms",
    },
  ],
  kitImage: workshopKit,
  kitImageAlt:
    "A lockforming machine and rolled duct sections in the TerryRock workshop",
  kitLabel: "Workshop equipment",
  kit: [
    "Arc welding machine",
    "Angle grinder (large)",
    "Angle grinder (small)",
    "Argon / TIG welder, water cooled",
    "Rolling machine",
    "Cutting machine",
    "Swagging machine",
    "Lockforming machine",
    "Bending machine",
    "Work bench",
    "Table vice",
    "Electrical extension cables",
  ],
};

/* ---------------------------------------------------------------------------
   Quality — the policy, the objectives it sets, and the mission behind it.
   --------------------------------------------------------------------------- */

export const quality = {
  headline: [
    [
      { text: "Quality that is", tone: "plain" },
      { text: "measurable,", tone: "dim" },
    ],
    [{ text: "audited and never optional", tone: "sand" }],
  ] as const,
  lede: "The quality system is designed to meet EN ISO 9001:2008 and is subject to annual audit.",
  policy:
    "Every member of staff is trained on quality awareness and its impact on customer service. Compliance is mandatory for all personnel.",
  banner: {
    image: qaPipework,
    alt: "Insulated and clad pipework with valves and gauges in a finished plant room",
  },
  columns: [
    {
      label: "Quality objectives",
      items: [
        "Maintain an effective QA system complying with BS EN ISO 9001:2008",
        "Be our clients' preferred choice",
        "Strive to exceed customer expectations",
        "Achieve and maintain quality that builds the company reputation",
        "Ensure compliance with statutory and safety requirements",
        "Maximise customer satisfaction at all times",
        "Minimise environmental impact",
      ],
    },
    {
      label: "Mission",
      items: [
        "Provide the highest quality engineering and insulation services",
        "Establish quality that is measurable and consistent with client requirements and specifications",
        "Train employees to ensure competency in tasks affecting quality and safety",
        "Zero tolerance to unsafe acts and conditions",
      ],
    },
  ],
  pillars: {
    label: "Commercial strength",
    items: [
      "Delivery on or ahead of schedule and budget",
      "Ongoing research and development",
      "Staff development",
    ],
  },
};

/* ---------------------------------------------------------------------------
   Clients — organisations TerryRock has worked for.
   --------------------------------------------------------------------------- */

export const clients = {
  headline: [
    [{ text: "Trusted by the names", tone: "plain" }],
    [
      { text: "that build", tone: "dim" },
      { text: "Nigeria", tone: "sand" },
    ],
  ] as const,
  lede: "Work delivered across oil and gas, manufacturing, hospitality, utilities and construction.",
  banner: {
    image: towerFarm,
    alt: "Insulated rooftop pipework and chiller plant beside a high-rise tower",
  },
  names: [
    "Chevron Nigeria Limited",
    "Eko Hotels Limited",
    "Flour Mills Nigeria PLC",
    "Four Points by Sheraton",
    "I.T.B Nigeria Limited",
    "Intercontinental Hotel",
    "Milan Nigeria Limited",
    "Myjoy Food Industries Limited",
    "Nigerian Bag Manufacturing Coy. PLC",
    "Ocean Parade Towers",
    "Powertech Engineering Limited",
    "Engee Pet Manufacturing Coy. Ltd",
    "Mitsulift Nigeria Limited",
    "Miluman Nigeria Limited",
    "Wayus Nigeria Limited",
    "ETCO Nigeria Limited",
    "Nairda Limited",
  ],
};

/* ---------------------------------------------------------------------------
   Team — the people who carry a job from estimate to commissioning.
   --------------------------------------------------------------------------- */

export const team = {
  headline: [
    [{ text: "Designers, estimators,", tone: "plain" }],
    [
      { text: "site crew and", tone: "dim" },
      { text: "technicians", tone: "sand" },
    ],
  ] as const,
  lede: "A management structure that carries a job from first estimate through to commissioning.",
  banner: {
    image: crewCutting,
    alt: "A TerryRock site technician in branded workwear cutting a duct section",
    caption: "Site crew at work",
  },
  /* The images below are site photography chosen to suit each role — they are
     not portraits of these people, and the alt text describes the scene rather
     than the person. Swap in headshots when there are some. */
  people: [
    {
      name: "Taiwo I. Jubrila",
      role: "Managing Director",
      qualification: "B.Sc Mechanical Engineering",
      image: qaPipework,
      alt: "Insulated and clad pipework with valves and gauges in a finished plant room",
    },
    {
      name: "Abimbola Jubrila",
      role: "Executive Director",
      qualification: "B.Sc Accounting",
      image: materialStock,
      alt: "Insulation stock bagged and stacked in the TerryRock store",
    },
    {
      name: "Ojedokun Olatunji",
      role: "Operations Director",
      qualification: "B.Sc Mech. Engr., MSc Project Management (UNILAG)",
      image: plantRoom,
      alt: "A finished plant room of insulated pipework and pumps",
    },
    {
      name: "James Akoma",
      role: "Head Technician",
      qualification: "",
      image: fabrication,
      alt: "A TerryRock fabricator welding a galvanised duct section on site",
    },
    {
      name: "Kehinde I. Jubrila",
      role: "Site Supervisor",
      qualification: "",
      image: crewCutting,
      alt: "A TerryRock site technician in branded workwear cutting a duct section",
    },
    {
      name: "Orumwense Stephen",
      role: "Site Supervisor",
      qualification: "",
      image: installedPlant,
      alt: "Insulated and clad pipework installed through a finished plant room",
    },
    {
      name: "Afolabi Oladiran",
      role: "Site Supervisor",
      qualification: "",
      image: supportRun,
      alt: "A long insulated pipe run carried on its site supports",
    },
  ],
};

/* ---------------------------------------------------------------------------
   Contact — three premises, and every way in.
   --------------------------------------------------------------------------- */

export const contact = {
  headline: [
    [
      { text: "Let's build", tone: "plain" },
      { text: "together", tone: "sand" },
    ],
  ] as const,
  lede: "Two Lagos premises and an Abuja workshop, open to construction, industrial, utility, hospitality and oil and gas clients.",
  /* City and role are split so the premises can be set as a ledger: the city
     large in the display face, the role as a micro label beside it. */
  offices: [
    {
      city: "Lagos",
      role: "Office & workshop",
      lines: [
        "No. 19, Jamiu Balogun Street",
        "Shangisha-Magodo Road",
        "Ikosi-Ketu, Lagos",
      ],
    },
    {
      city: "Lagos",
      role: "Warehouse",
      lines: [
        "7 Ilare Close",
        "7 & 8 Bus Stop, Airport Road",
        "Mafoluku, Oshodi, Lagos",
      ],
    },
    {
      city: "Abuja",
      role: "Office & workshop",
      lines: [
        "Beside Exclusive Holiday Resort and Suites",
        "Lokogoma District",
        "FCT Abuja",
      ],
    },
  ],
  /* One published line, carried in international form so it dials from outside
     Nigeria as well as in. Everything that shows a number reads this list. */
  phones: ["+234 813 411 5189"],
  emails: [
    "info@terrytechnical.com",
    "terry_technical@yahoo.com",
    "terryrock24@gmail.com",
  ],
  socials: [
    {
      label: "Instagram",
      handle: "terry.technical07",
      href: "https://instagram.com/terry.technical07",
    },
    {
      label: "Skype",
      handle: "terry.technical07",
      href: "skype:terry.technical07?chat",
    },
    {
      label: "Facebook",
      handle: "/terrytechnicalcompanyltd",
      href: "https://facebook.com/terrytechnicalcompanyltd",
    },
  ],
};
