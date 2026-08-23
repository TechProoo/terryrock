/* ---------------------------------------------------------------------------
   Services page — the commercial view of the offer.

   Deliberately not a second copy of /systems: that page is the technical
   catalogue, thirteen disciplines in detail. This one is what a client is
   buying — the areas of work, the standard held while doing it, and who it has
   been done for. Where a service area needs detail it points at /systems.

   The vision, mission and pillars below are the company's own words, lifted
   from `quality` in site.ts; the client names come from `clients`.
   --------------------------------------------------------------------------- */

import hero from '../assets/srv_hero.jpg';
import note1 from '../assets/srv_note1.jpg';
import note2 from '../assets/srv_note2.jpg';
import face1 from '../assets/srv_face1.jpg';
import face2 from '../assets/srv_face2.jpg';
import face3 from '../assets/srv_face3.jpg';
import a1 from '../assets/srv_a1.jpg';
import a2 from '../assets/srv_a2.jpg';
import a3 from '../assets/srv_a3.jpg';
import a4 from '../assets/srv_a4.jpg';
import a5 from '../assets/srv_a5.jpg';
import band from '../assets/srv_band.jpg';
import cap1 from '../assets/srv_cap1.jpg';
import cap2 from '../assets/srv_cap2.jpg';
import cap3 from '../assets/srv_cap3.jpg';

/* ---------------------------------------------------------------------------
   The survey scheduler.

   It requests a slot; it does not book one. No calendar sits behind this site,
   so the card cannot know what is free — the wording says "request", the days
   are simply the next working days from today, and the whole thing composes a
   WhatsApp message rather than writing to anything.
   --------------------------------------------------------------------------- */
export const survey = {
  eyebrow: 'Before a price',
  title: ['Put our', 'on your site, and we will', 'measure it ourselves'],
  faces: [face1, face2, face3],
  link: { label: 'Meet the crew', href: '/systems' },
  body: 'Most packages start with a survey: someone walks the plant, measures the runs and photographs what is already there. Pick a day that suits you and we will confirm it.',
  dayLabel: 'Pick a day',
  slotLabel: 'Which half of the day',
  chosenLabel: 'Requesting',
  cta: 'Request this slot',
  hint: 'Opens WhatsApp with the day and window written in. Nothing is booked until we reply.',
  dayCount: 5,
  slots: [
    { label: 'Morning', window: '8:00 — 12:00' },
    { label: 'Afternoon', window: '12:00 — 4:00' },
  ],
  messagePrefix: 'Site survey request —',
  stat: { value: '13', label: 'Disciplines the surveyor can price on the spot' },
};

export const servicesPage = {
  /* -- Hero ---------------------------------------------------------------- */
  hero: {
    image: hero,
    alt: 'Insulated distribution pipework running the length of a rooftop beside a tower',
    /* `ring` puts an outlined pill around that word, the way the reference
       rings one word of its headline. */
    headline: [
      { text: 'From drawing' },
      { text: 'to commissioned', ring: true },
      { text: 'plant' },
    ],
    cta: { label: 'Start a scope', href: '/contact' },

    /* Small labels set against the headline lines. Both are the site's own
       claims, quoted rather than invented. */
    flags: ['EN ISO 9001:2008', 'Lagos & Abuja'],

    /* The slow ring of text, cut from what the company actually does. */
    badge: 'Fabrication · Installation · Insulation · Cladding · ',

    /* Topic tags, matching the reference's row of pills. */
    tags: ['Fabrication', 'Installation', 'Insulation & cladding'],

    /* The glass card at the top right. Quoted from the company's own quality
       policy rather than written for the page. */
    note: {
      title: 'Quality policy',
      body: 'Quality that is measurable and consistent with client requirements and specifications, with compliance to statutory and safety requirements.',
      image: note1,
      alt: 'Insulated headers and valve sets along a plant room floor',
    },

    /* The glass card at the bottom left. */
    aside: {
      title: 'Held in stock',
      body: 'Rockwool, rigid pipe sections, ceramic fibre, stainless sheet and band — in Lagos and Abuja.',
      link: 'See the materials',
      href: '/systems',
      image: note2,
      alt: 'Bagged insulation stock stacked in the store',
    },

    /* The counter. "Over 50 contractors across Nigeria and West Africa" is the
       site's own figure, from `studio.proof`. */
    proof: {
      value: '50+',
      label: ['Contractors across Nigeria', 'and West Africa'],
      faces: [
        { image: face1, alt: '' },
        { image: face2, alt: '' },
        { image: face3, alt: '' },
      ],
    },

    /* The closing paragraph at the bottom right. */
    closer: {
      body: 'One crew fabricates, installs, insulates and finishes — so the package is answerable to a single contract.',
      link: 'See the disciplines',
      href: '/systems',
    },
  },

  /* -- Areas of work -------------------------------------------------------- */
  areas: {
    eyebrow: 'Areas of work',
    title: ['Five ways we', 'take a package'],
    lede: 'Each one is priced, fabricated and installed by the same site team. The detail behind them lives on the systems page.',
    link: { label: 'All thirteen disciplines', href: '/systems' },
    items: [
      {
        tag: '01',
        title: 'Fabrication',
        body: 'Stainless and mild steel tanks, hoppers, chimneys and exhausts, built to size in the workshop.',
        image: a1,
        alt: 'Fabricated steel hoppers standing in the workshop',
      },
      {
        tag: '02',
        title: 'Installation',
        body: 'Pipework and ductwork erected on site — welded, valved, tested and set on its supports.',
        image: a2,
        alt: 'Insulated pipework running along a rooftop on its supports',
      },
      {
        tag: '03',
        title: 'Insulation & cladding',
        body: 'Hot and cold work finished in aluminium or stainless, riveted at even centres.',
        image: a3,
        alt: 'A clad hopper finished in sheet metal',
      },
      {
        tag: '04',
        title: 'Plant rooms',
        body: 'Headers, pumps and valve sets installed, insulated and labelled ready for handover.',
        image: a4,
        alt: 'Insulated headers and pumps installed through a plant room',
      },
      {
        tag: '05',
        title: 'Materials supply',
        body: 'Insulation and cladding stock issued from the Lagos and Abuja stores.',
        image: a5,
        alt: 'Coiled stock and drums held in the store',
      },
    ],
  },

  /* -- Capacity ------------------------------------------------------------- */
  /* A mosaic rather than a row: the figures, the disciplines and the stores in
     one block, which is what a client is really asking about when they ask what
     a contractor can take on. Every number is countable from the site. */
  capacity: {
    eyebrow: 'What we can take on',
    title: ['The bench', 'behind a package'],

    tags: ['Chilled water', 'Ductwork', 'Plant rooms', 'Cold insulation', 'Fabrication'],

    stats: [
      { value: '13', label: 'Disciplines handled in house', href: '/systems' },
      { value: '03', label: 'Premises across two cities', href: '/contact' },
    ],

    tagged: {
      image: cap1,
      alt: 'Clad process stacks standing on a rooftop against the trees',
      caption: 'Rooftop process plant, Lagos',
    },
    tall: {
      image: cap2,
      alt: 'A clad riser running the full height of a plant room',
    },
    wide: {
      image: cap3,
      alt: 'A plant hall of insulated pipework and valve sets',
    },

    note: {
      body: 'Fabrication, installation, insulation and finish sit with one site team, so nothing is subcontracted across a boundary where the specification can slip.',
      link: 'How a package is grouped',
      href: '/systems',
    },
  },

  /* -- The standard --------------------------------------------------------- */
  standard: {
    eyebrow: 'The standard we hold',
    title: ['Written down,', 'not implied'],
    band: {
      image: band,
      alt: 'A plant room of insulated pipework, valves and painted services',
    },
  },

  /* -- Clients -------------------------------------------------------------- */
  clients: {
    eyebrow: 'Who it has been for',
    title: ['Delivered for the names', 'that build Nigeria'],
    lede: 'Work delivered across oil and gas, manufacturing, hospitality, utilities and construction.',
  },

  /* -- Closer --------------------------------------------------------------- */
  closer: {
    title: ['Send us the', 'scope'],
    body: 'Drawings, a specification, or just the works and the location. We will price the package.',
    cta: { label: 'Start a conversation', href: '/contact' },
  },
};
