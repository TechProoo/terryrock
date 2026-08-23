/* ---------------------------------------------------------------------------
   Executed Projects page — every string and image the /projects route renders.

   Photographs are grouped by the discipline they show. They are deliberately
   not attributed to named clients: the source material identifies who TerryRock
   has worked for, but not which photograph belongs to which contract.
   --------------------------------------------------------------------------- */

import heroPlant from '../assets/site_35.jpg';
import featureRun from '../assets/site_44.jpg';
import ductBank from '../assets/site_29.jpg';
import closerLook from '../assets/site_47.jpg';

import rooftopRun from '../assets/site_33.jpg';
import rooftopPumps from '../assets/site_37.jpg';
import towerDistribution from '../assets/site_43.jpg';
import rooftopHeaders from '../assets/site_36.jpg';

import ductCladding from '../assets/site_22.jpg';
import ductFoil from '../assets/site_30.jpg';
import ductRooftop from '../assets/site_27.jpg';
import ductBend from '../assets/site_55.jpg';

import plantPumps from '../assets/site_45.jpg';
import plantHeaders from '../assets/site_49.jpg';
import plantHall from '../assets/site_50.jpg';
import plantElbow from '../assets/site_46.jpg';

import coldRun from '../assets/site_61.jpg';
import coldBranch from '../assets/site_60.jpg';
import coldCrew from '../assets/site_62.jpg';
import chilledRiser from '../assets/site_59.jpg';

import weldDuct from '../assets/site_26.jpg';
import cutDuct from '../assets/site_32.jpg';
import stackWork from '../assets/site_28.jpg';
import wrapCrew from '../assets/site_58.jpg';

import rollStock from '../assets/site_52.jpg';
import pipeSections from '../assets/site_23.jpg';
import isokingStock from '../assets/site_71.jpg';
import ceramicFibre from '../assets/site_66.jpg';

export const projectsPage = {
  eyebrow: 'Executed projects',
  headline: ['Mechanical work', 'built to last'],
  /* Kept to two short lines so the hero copy block sits at the reference's
     proportions; the full client list lives on the home page. */
  lede: 'Insulation, ductwork and pipework packages delivered on site across Lagos and Abuja.',
  cta: { label: 'Start a conversation', href: '/#contact' },
  hero: {
    image: heroPlant,
    alt: 'A long run of insulated chilled water pipework and pumps across a rooftop',
  },

  /* The three cards directly under the hero. */
  feature: {
    tag: 'Featured',
    title: ['Rooftop Chilled', 'Water Distribution'],
    link: 'See the work',
    image: featureRun,
    alt: 'Insulated chilled water flow and return mains running the length of a rooftop',
  },
  secondary: {
    title: 'Clad Ductwork',
    body: 'Sheet metal cladding over insulated duct, sealed and finished on site.',
    image: ductBank,
    alt: 'Foil and sheet metal cladding over large rooftop ductwork',
  },
  closer: {
    title: 'Closer Look',
    body: 'Plant room detail',
    image: closerLook,
    alt: 'Insulated headers, pumps and valves inside a finished plant room',
    /* Percentage positions for the hotspot markers. */
    spots: [
      { top: '30%', left: '24%', label: 'Insulated suction header' },
      { top: '62%', left: '58%', label: 'Pump set and isolating valves' },
    ],
  },

  /* The showcase panel that replaces a plain image grid: a left rail, a large
     stage for the selected project, and a discipline list on the right. */
  showcase: {
    wordmark: 'TerryRock',
    note: {
      title: ['See the work', 'up close'],
      body: 'Every package on this page was fabricated, insulated and finished on site by TerryRock crews.',
    },
    listTitle: 'Disciplines',
    listHint: 'Pick a discipline to step through the work it covers',
    unitLabel: 'projects',
    exploreAll: 'Explore all work',
    creditLabel: 'Built by TerryRock',
    nextPrefix: 'View',
    prevLabel: 'Previous project',
    exploreLabel: 'Explore',
    contact: { label: 'Contact', href: '/#contact' },
  },

  filterLabel: 'Filter by discipline',
  allLabel: 'All work',

  categories: [
    { id: 'chilled', label: 'Chilled water' },
    { id: 'duct', label: 'Ductwork' },
    { id: 'plant', label: 'Plant rooms' },
    { id: 'cold', label: 'Cold insulation' },
    { id: 'fabrication', label: 'Fabrication' },
    { id: 'materials', label: 'Materials' },
  ],

  items: [
    {
      category: 'chilled',
      title: 'Rooftop Distribution Mains',
      image: rooftopRun,
      alt: 'Insulated distribution mains on concrete plinths across a rooftop',
    },
    {
      category: 'chilled',
      title: 'Inline Pump Sets',
      image: rooftopPumps,
      alt: 'Inline pumps installed within an insulated rooftop pipework run',
    },
    {
      category: 'chilled',
      title: 'Tower Rooftop Pipework',
      image: towerDistribution,
      alt: 'Insulated rooftop pipework running beside a high-rise tower',
    },
    {
      category: 'chilled',
      title: 'Flow & Return Headers',
      image: rooftopHeaders,
      alt: 'Insulated flow and return headers with gauges on a rooftop',
    },

    {
      category: 'duct',
      title: 'Rooftop Duct Cladding',
      image: ductCladding,
      alt: 'Large rooftop ductwork finished in sheet metal cladding',
    },
    {
      category: 'duct',
      title: 'Foil Wrapped Ductwork',
      image: ductFoil,
      alt: 'Rooftop ductwork wrapped in reflective foil insulation',
    },
    {
      category: 'duct',
      title: 'Air Handling Enclosures',
      image: ductRooftop,
      alt: 'Clad air handling enclosures installed on a rooftop deck',
    },
    {
      category: 'duct',
      title: 'Duct Bend & Transition',
      image: ductBend,
      alt: 'A clad duct bend and transition piece set on site supports',
    },

    {
      category: 'plant',
      title: 'Plant Room Pump Sets',
      image: plantPumps,
      alt: 'Pump sets and insulated pipework inside a plant room',
    },
    {
      category: 'plant',
      title: 'Insulated Headers',
      image: plantHeaders,
      alt: 'Insulated headers and pumps installed along a plant room wall',
    },
    {
      category: 'plant',
      title: 'Plant Hall Installation',
      image: plantHall,
      alt: 'A finished plant hall with insulated pipework overhead',
    },
    {
      category: 'plant',
      title: 'Pump Suction Elbow',
      image: plantElbow,
      alt: 'A clad suction elbow feeding a plant room pump',
    },

    {
      category: 'cold',
      title: 'Cold Pipework Runs',
      image: coldRun,
      alt: 'Long runs of white cold insulation on parallel pipework',
    },
    {
      category: 'cold',
      title: 'Branch & Tee Insulation',
      image: coldBranch,
      alt: 'Cold insulation finished around pipe branches and tees',
    },
    {
      category: 'cold',
      title: 'Cold Line Installation',
      image: coldCrew,
      alt: 'A TerryRock technician installing cold insulation on a pipe rack',
    },
    {
      category: 'cold',
      title: 'Chilled Riser',
      image: chilledRiser,
      alt: 'A clad chilled water riser rising through a building frame',
    },

    {
      category: 'fabrication',
      title: 'Duct Welding',
      image: weldDuct,
      alt: 'A technician welding a fabricated duct section on site',
    },
    {
      category: 'fabrication',
      title: 'Duct Cutting',
      image: cutDuct,
      alt: 'A TerryRock technician cutting a steel duct section',
    },
    {
      category: 'fabrication',
      title: 'Stack Access Works',
      image: stackWork,
      alt: 'Scaffold access to a stack for insulation and cladding work',
    },
    {
      category: 'fabrication',
      title: 'Equipment Wrapping',
      image: wrapCrew,
      alt: 'Crew wrapping and sealing insulated equipment on site',
    },

    {
      category: 'materials',
      title: 'Rockwool Roll Stock',
      image: rollStock,
      alt: 'Bagged rockwool rolls stacked in the TerryRock store',
    },
    {
      category: 'materials',
      title: 'Rigid Pipe Sections',
      image: pipeSections,
      alt: 'Rigid mineral wool pipe sections laid out before installation',
    },
    {
      category: 'materials',
      title: 'Slab & Board Stock',
      image: isokingStock,
      alt: 'Boxed insulation slab and board stock held in the store',
    },
    {
      category: 'materials',
      title: 'Ceramic Fibre',
      image: ceramicFibre,
      alt: 'A coil of ceramic fibre blanket measured out for a job',
    },
  ],
};
