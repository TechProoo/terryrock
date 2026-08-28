/* ---------------------------------------------------------------------------
   Rockwool — supply and installation.

   Why this page exists at all: rockwool is the material the company is asked
   for by name more than any other, and until now the site only ever mentioned
   it inside a list of nine other materials. A search engine had nothing to
   rank — no page whose subject is rockwool, no heading that says it, and no
   answer to the questions a buyer types before they call.

   So this is a page about one material: the forms it is held in, what it is
   for, where it goes, and where it is delivered from. Everything on it is
   either something the site already documents elsewhere — the premises, the
   disciplines, the stock photographed in the store — or a property of stone
   wool itself. Nothing here quotes a density, a thickness or a price, because
   those come off a schedule the office writes against a duty, not off a page.
   --------------------------------------------------------------------------- */

import roll from '../assets/rockwool.png';
import pipeStack from '../assets/rockwool_pipe.jpg';
import blanket from '../assets/sys_m1.jpg';
import board from '../assets/site_71.jpg';
import container from '../assets/stock_roll_container.jpg';
import { rockwoolFaq } from './rockwoolFaq';

export const rockwoolPage = {
  eyebrow: 'Rockwool supply & installation',
  lede: 'TerryRock holds rockwool blanket, slab board and pipe sections at premises in Lagos and Abuja, and fits them to chilled water lines, ductwork, generator houses and boiler chimneys. One company for the material and for the crew that installs it.',
  cta: { label: 'Request a rockwool quote', href: '/contact' },
  /* The hero is one word, set as large as the card allows, with a cut-out roll
     of blanket standing in the gap between its two halves. The word is the
     search term and the object is the product, and a reader who arrives from a
     search result sees both before reading a line of copy.

     Everything else in the card is annotation: a column of stock words running
     up the left edge, and short notes dropped around the type. None of it is
     load bearing — it is all repeated properly further down the page — so all
     of it is hidden from assistive tech rather than read out as fragments. */
  hero: {
    image: roll,
    alt: 'A roll of rockwool blanket',
    /* Split so the roll can stand between the halves; read together they are
       the page's subject and its heading. */
    words: ['Rock', 'wool'],
    /* The year the company started, set as a reference mark. */
    marker: '[09]',
    column: [
      'Blanket',
      'Slab',
      'Board',
      'Pipe section',
      'Acoustic',
      'Thermal',
      'Cladding',
      'Lagos',
      'Abuja',
      'Supply',
      'Install',
    ],
    notes: [
      ['Blanket, slab', 'and pipe section'],
      ['Held in stock'],
      ['Lagos', '& Abuja'],
      ['Supplied,', 'and fitted'],
      ['It does not burn'],
      ['Since 2009'],
    ],
  },

  stats: [
    { value: '2009', label: ['Supplying and fitting', 'insulation since'] },
    { value: '3', label: ['Premises holding stock —', 'two Lagos, one Abuja'] },
    { value: 'ISO 9001', label: ['The quality system', 'the work is built to'] },
  ],

  /* -- The three forms ----------------------------------------------------- */
  forms: {
    eyebrow: 'Held in stock',
    title: ['Rockwool, in the', 'shape the job takes'],
    lede: 'Stone wool comes in three shapes, and which one a job needs is settled by what is being covered rather than by preference.',
    items: [
      {
        label: 'Rockwool blanket',
        image: blanket,
        alt: 'Rolls of rockwool blanket held in the TerryRock store',
        body: 'Rolls, plain or wire-mesh faced. This is the form for anything curved or irregular — ductwork, vessels, tanks, boiler bodies, generator house linings — because a blanket wraps a shape instead of having to match one.',
      },
      {
        label: 'Rockwool slab and board',
        image: board,
        alt: 'Boxed rockwool slab and board stock stacked in the store',
        body: 'Rigid board for flat work: plant room and generator house walls, studio and club partitions, and acoustic linings where the surface runs straight and the board has to hold its shape under cladding.',
      },
      {
        label: 'Rockwool pipe section',
        image: pipeStack,
        alt: 'Preformed rockwool pipe sections stacked on a pallet',
        body: 'Preformed split sections sized to the pipe, so a run is closed inside a shell rather than wrapped in one. This is what goes onto chilled water and heating lines before the cladding does.',
      },
    ],
  },

  /* -- The material -------------------------------------------------------- */
  material: {
    eyebrow: 'Why rockwool',
    title: ['Spun from stone,', 'and it behaves like it'],
    lede: 'Rockwool is not a grade of foam or a kind of fibreglass. It is basalt, melted and spun into fibre, and every property worth specifying it for follows from that.',
    points: [
      {
        label: 'It does not burn',
        body: 'Stone does not carry a flame, so neither does the fibre spun from it. Rockwool does not feed a fire, does not drip and adds no fuel of its own, which is why it is the lining specified where fire has to be kept out of a riser, a plant room or a shared wall.',
      },
      {
        label: 'It works in both directions',
        body: 'The same fibre that holds heat inside a boiler chimney keeps it out of a chilled water line. What changes between the two is thickness and density, chosen from the line temperature and the air the run passes through — never from a single catalogue figure.',
      },
      {
        label: 'It absorbs sound',
        body: 'Open fibre takes the energy out of a sound wave instead of reflecting it back into the room. That is why generator houses, studios and club walls are lined with rockwool rather than insulated with a closed cell board.',
      },
      {
        label: 'It outlasts the plant',
        body: 'It sheds water rather than soaking it up, it does not rot, and it gives mould and vermin nothing to live on. Fitted properly and clad, a rockwool run holds its performance for as long as the plant around it runs.',
      },
    ],
  },

  /* -- Applications -------------------------------------------------------- */
  uses: {
    eyebrow: 'Where it goes',
    title: ['What we line', 'with it'],
    items: [
      {
        label: 'Chilled water pipework',
        body: 'Pipe sections and blanket on chilled and condenser water, sealed and finished in aluminium or stainless cladding.',
      },
      {
        label: 'HVAC ductwork',
        body: 'Supply and extract duct insulated and laminated, on the roof and inside the riser.',
      },
      {
        label: 'Generator houses',
        body: 'Wall and ceiling lining that brings the noise down and keeps the heat off the structure around it.',
      },
      {
        label: 'Boiler chimneys and exhausts',
        body: 'High temperature lagging on flues, stacks and generator exhaust runs.',
      },
      {
        label: 'Steel tanks and vessels',
        body: 'Hot and cold storage wrapped, banded and clad, in the workshop or on site.',
      },
      {
        label: 'Studios and club walls',
        body: 'Acoustic partitions built where the room has to stay quiet on both sides of the wall.',
      },
    ],
  },

  /* -- Coverage ------------------------------------------------------------ */
  coverage: {
    eyebrow: 'Where we supply from',
    title: ['Lagos and Abuja,', 'delivered nationwide'],
    body: 'Stock is held at two Lagos premises — Ikosi-Ketu and Mafoluku, Oshodi — and at the Abuja workshop in Lokogoma. Material goes out to sites across Nigeria, and where the works are ours, the crew that installs it travels with it.',
    image: container,
    alt: 'A shipping container of wrapped rockwool rolls being unloaded into the TerryRock store',
    places: ['Lagos', 'Abuja', 'Nationwide delivery'],
  },

  /* -- Questions -----------------------------------------------------------
     The pairs themselves live in rockwoolFaq.ts, because seo.ts writes the
     same five into this page's structured data and cannot import a module
     that imports photographs. */
  faq: {
    eyebrow: 'Before you call',
    title: ['The questions', 'we get asked'],
    items: rockwoolFaq,
  },

  closer: {
    title: ['Send the pipe', 'schedule'],
    body: 'Sizes, temperatures and lengths are enough to price the rockwool and the labour together. Bring a drawing and one figure comes back for the whole package.',
    cta: { label: 'Get a rockwool quote', href: '/contact' },
  },
};
