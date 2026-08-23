/* ---------------------------------------------------------------------------
   Scrubbed bento gallery — eight site photographs that the reader scrolls
   through. Kept separate from `projectsPage` because these are atmosphere
   rather than catalogued projects: they carry no title, category or count.
   --------------------------------------------------------------------------- */

import rooftopStacks from '../assets/gallery_1.jpg';
import siloRow from '../assets/gallery_2.jpg';
import cladSilo from '../assets/gallery_3.jpg';
import pipeRun from '../assets/gallery_4.jpg';
import plantHeaders from '../assets/gallery_5.jpg';
import steelCoil from '../assets/gallery_6.jpg';
import chillerManifold from '../assets/gallery_7.jpg';
import vesselEnd from '../assets/gallery_8.jpg';

export const scrubGallery = {
  eyebrow: 'On site',
  title: [
    { text: 'Scroll', tone: 'c-dim' },
    { text: 'through', tone: 'c-sand' },
    { text: 'the work', tone: '' },
  ],
  lede: 'Eight frames from live installations. Keep scrolling and the wall opens up.',

  /* Order matters: the bento alternates tall tiles and short ones, so slots
     1, 3, 4 and 6 want portraits and 2, 5, 7 and 8 want landscapes. Swapping
     two entries changes which shape a photograph lands in. */
  items: [
    { image: rooftopStacks, alt: 'Clad extraction stacks rising from a rooftop through working scaffold' },
    { image: siloRow, alt: 'A row of tall clad storage vessels standing against the sky' },
    { image: cladSilo, alt: 'A single silo finished in vertical sheet metal cladding' },
    { image: pipeRun, alt: 'Insulated pipework running away into the distance towards a chiller' },
    { image: plantHeaders, alt: 'White insulated headers and valve sets along a plant room wall' },
    { image: steelCoil, alt: 'A coil of sheet metal cladding stock in the store' },
    { image: chillerManifold, alt: 'A chiller manifold of painted pipework, valves and pumps' },
    { image: vesselEnd, alt: 'The spiral-clad end of a large insulated vessel' },
  ],
};
