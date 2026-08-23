/* ---------------------------------------------------------------------------
   Mechanical Systems page. The thirteen disciplines are the ones the landing
   page already lists under `services` in site.ts — this page gives each of them
   a photograph and room to breathe, rather than restating them.
   --------------------------------------------------------------------------- */

import hero from '../assets/sys_hero.jpg';

import d1 from '../assets/sys_d1.jpg';
import d2 from '../assets/sys_d2.jpg';
import d3 from '../assets/sys_d3.jpg';
import d4 from '../assets/sys_d4.jpg';
import d5 from '../assets/sys_d5.jpg';
import d6 from '../assets/sys_d6.jpg';
import d7 from '../assets/sys_d7.jpg';
import d8 from '../assets/sys_d8.jpg';
import d9 from '../assets/sys_d9.jpg';
import d10 from '../assets/sys_d10.jpg';
import d11 from '../assets/sys_d11.jpg';
import d12 from '../assets/sys_d12.jpg';
import d13 from '../assets/sys_d13.jpg';

import s1 from '../assets/sys_s1.jpg';
import s2 from '../assets/sys_s2.jpg';
import s3 from '../assets/sys_s3.jpg';
import s4 from '../assets/sys_s4.jpg';
import s5 from '../assets/sys_s5.jpg';

import m1 from '../assets/sys_m1.jpg';
import m2 from '../assets/sys_m2.jpg';
import m3 from '../assets/sys_m3.jpg';
import m4 from '../assets/sys_m4.jpg';
import m5 from '../assets/sys_m5.jpg';
import m6 from '../assets/sys_m6.jpg';
import m7 from '../assets/sys_m7.jpg';
import m8 from '../assets/sys_m8.jpg';
import m9 from '../assets/sys_m9.jpg';
import m10 from '../assets/sys_m10.jpg';

export const systemsPage = {
  eyebrow: 'Mechanical systems',
  headline: ['Thirteen disciplines', 'under one contract'],
  lede: 'Mechanical, insulation and electrical work handled in house — from pipe fabrication and welding through to cladding, HVAC and thermal insulation.',
  cta: { label: 'Scope a package', href: '/contact' },
  hero: {
    image: hero,
    alt: 'Insulated pipework threading overhead through a finished plant hall',
  },

  /* The strip under the hero. Every figure here is countable from this page or
     from the site's own copy — nothing is estimated. */
  stats: [
    { value: '13', label: ['Disciplines', 'in house'] },
    { value: '05', label: ['System', 'groups'] },
    { value: '02', label: ['Cities', 'covered'] },
  ],

  /* -- The list ------------------------------------------------------------ */
  list: {
    eyebrow: 'What we cover',
    title: ['Every discipline,', 'one accountable crew'],
    hint: 'Hover a discipline to see it on site',
    items: [
      {
        title: 'Pipe fittings & welding',
        body: 'Stainless, mild steel, galvanised, PVC and PPR pipe. Valve installation, elbows rolled to any angle, TIG and MIG welding with argon to certified standards — fabrication, site installation and testing, including sewage pumping stations.',
        image: d1,
        alt: 'A welded manifold of painted pipework, valves and pumps',
      },
      {
        title: 'Insulation & acoustic materials',
        body: 'Polystyrene, polyurethane and rigid pipe insulation, imported or sourced locally to suit the client.',
        image: d2,
        alt: 'A rigid pipe insulation section showing its mineral wool core',
      },
      {
        title: 'Cladding',
        body: 'Aluminium and stainless steel, 0.5mm to 1mm thick, riveted at even centres for locally fabricated panels.',
        image: d3,
        alt: 'The spiral-clad end of a large vessel finished in sheet metal',
      },
      {
        title: 'Laminating',
        body: 'Resin, fibremat, catalyst and accelerator pigment.',
        image: d4,
        alt: 'A laminated vessel surface finished in resin and fibremat',
      },
      {
        title: 'Stainless & mild steel tanks',
        body: 'Construction and installation in cylindrical, rectangular and square configurations, across a range of capacities and sizes.',
        image: d5,
        alt: 'A large horizontal clad tank standing on its supports',
      },
      {
        title: 'HVAC',
        body: 'Installation, management and control, with air conditioning ductwork fabricated and erected on site.',
        image: d6,
        alt: 'Clad air handling units installed through a plant hall',
      },
      {
        title: 'Machine & equipment installation',
        body: 'Machines and equipment of different kinds and sizes.',
        image: d7,
        alt: 'Installed plant equipment and insulated pipework in a machine room',
      },
      {
        title: 'Industrial & domestic plumbing',
        body: 'Plumbing installations for industrial plant and private residences alike.',
        image: d8,
        alt: 'A white PVC plumbing run bending through a service riser',
      },
      {
        title: 'Generator exhausts',
        body: 'Exhaust pipes and muffler pots fabricated and installed for industrial gen-sets.',
        image: d9,
        alt: 'A fabricated muffler pot for a generator exhaust',
      },
      {
        title: 'Boiler chimneys',
        body: 'Fabrication and installation.',
        image: d10,
        alt: 'A clad boiler chimney rising above the plant it serves',
      },
      {
        title: 'Electrical installation',
        body: 'Panels, trunking and wiring.',
        image: d11,
        alt: 'Electrical panels and trunking installed alongside plant pipework',
      },
      {
        title: 'Industrial thermal insulation',
        body: 'Hot and cold pipe and tank insulation, generator house soundproofing, club wall insulation and studio insulation.',
        image: d12,
        alt: 'Mineral wool lining applied to a generator house wall',
      },
      {
        title: 'Supply of insulation materials',
        body: 'Rockwool, rigid pipe insulation, polystyrene, aluminium polyisocyanate, ceramic fibre, calcium silicate, fire blanket, stainless sheet and band.',
        image: d13,
        alt: 'Bagged insulation stock stacked in the TerryRock store',
      },
    ],
  },

  /* -- The stack ----------------------------------------------------------- */
  stack: {
    eyebrow: 'How it groups',
    title: ['Five systems,', 'one site team'],
    hint: 'Click the stack',
    cards: [
      {
        tag: 'Pipework',
        title: ['Pipework and', 'pressure systems'],
        body: 'Chilled water, hot water and process lines — fabricated, welded, tested and insulated by the same crew that installs them.',
        image: s1,
        alt: 'Insulated distribution pipework running the length of a plant room',
      },
      {
        tag: 'Air',
        title: ['Ductwork', 'and HVAC'],
        body: 'Air handling plant and duct erected on site, then clad and sealed to finish.',
        image: s2,
        alt: 'Clad air handling plant standing in a factory hall',
      },
      {
        tag: 'Thermal',
        title: ['Thermal and', 'acoustic insulation'],
        body: 'Hot and cold pipe and tank work, generator house soundproofing, studio and club wall linings.',
        image: s3,
        alt: 'Mineral wool insulation lining a plant room wall',
      },
      {
        tag: 'Fabrication',
        title: ['Fabrication', 'and tanks'],
        body: 'Stainless and mild steel tanks, hoppers, chimneys and exhausts built to size in the workshop.',
        image: s4,
        alt: 'Fabricated steel hoppers standing in the workshop',
      },
      {
        tag: 'Supply',
        title: ['Materials', 'and supply'],
        body: 'Held in stock in Lagos and Abuja, so a package never waits on an import.',
        image: s5,
        alt: 'Bagged insulation materials stacked in the store',
      },
    ],
  },

  /* -- Materials ----------------------------------------------------------- */
  materials: {
    eyebrow: 'Held in stock',
    title: ['What we', 'supply'],
    lede: 'Rockwool, rigid pipe insulation, polystyrene, aluminium polyisocyanate, ceramic fibre, calcium silicate, fire blanket, stainless sheet and band.',
    tiles: [
      { image: m1, alt: 'Rockwool pipe sections bagged in the store', label: 'Pipe sections' },
      { image: m2, alt: 'Rolled insulation stock stacked upright', label: 'Roll stock' },
      { image: m3, alt: 'A rigid pipe section showing its mineral wool core', label: 'Rigid sections' },
      { image: m4, alt: 'Bagged ceramic fibre stock', label: 'Ceramic fibre' },
      { image: m5, alt: 'Foil faced insulation unwrapped from its bag', label: 'Foil faced' },
      { image: m6, alt: 'Boxed fixings and accessories on the store shelf', label: 'Fixings' },
      { image: m7, alt: 'A coil of stainless sheet', label: 'Stainless sheet' },
      { image: m8, alt: 'Coils of stainless banding stacked in the store', label: 'Banding' },
      { image: m9, alt: 'A large coil of sheet metal cladding stock', label: 'Cladding coil' },
      { image: m10, alt: 'Banding coils and clips ready for issue', label: 'Clips & seals' },
    ],
  },

  closer: {
    title: ['Bring us the', 'drawing'],
    body: 'Send a scope and we will price the package — fabrication, installation, insulation and finish, under one contract.',
    cta: { label: 'Start a conversation', href: '/contact' },
  },
};
