/* ---------------------------------------------------------------------------
   Sector carousel — the five markets TerryRock delivers into, each with the
   photograph that becomes the section's background while it is selected.

   The sectors are the ones the site already names on the clients section:
   "oil and gas, manufacturing, hospitality, utilities and construction".
   --------------------------------------------------------------------------- */

import oilAndGas from '../assets/sector_1.jpg';
import manufacturing from '../assets/sector_2.jpg';
import hospitality from '../assets/sector_3.jpg';
import utilities from '../assets/sector_4.jpg';
import construction from '../assets/sector_5.jpg';

export const sectorCarousel = {
  eyebrow: 'Where the work lands',
  title: 'Five sectors, one standard',
  autoplayMs: 5200,

  /* `stat` is the numeral the card carries. These are positions rather than
     figures — swap in a real count per sector when there is one to quote. */
  slides: [
    {
      stat: '01',
      label: ['Oil and', 'gas'],
      image: oilAndGas,
      alt: 'Clad process stacks on a rooftop, palms behind the working scaffold',
    },
    {
      stat: '02',
      label: ['Manufacturing', 'plants'],
      image: manufacturing,
      alt: 'A large clad air handling plenum standing in a factory hall',
    },
    {
      stat: '03',
      label: ['Hospitality', 'venues'],
      image: hospitality,
      alt: 'Insulated units and valve sets lined up along a plant room floor',
    },
    {
      stat: '04',
      label: ['Utility', 'projects'],
      image: utilities,
      alt: 'Black insulated pipework sweeping through a plant room',
    },
    {
      stat: '05',
      label: ['Construction', 'sites'],
      image: construction,
      alt: 'A long insulated pipe run stretching along a rooftop past the chillers',
    },
  ],
};
