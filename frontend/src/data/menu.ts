/* ---------------------------------------------------------------------------
   The overlay menu. Below 820px the header's pill groups are hidden, so this is
   the only way around the site on a phone — it carries every route, not a
   subset, plus the ways of reaching the office.

   Each route reuses its own page's hero, so the menu previews where the reader
   is about to land rather than decorating itself with unrelated photographs.
   --------------------------------------------------------------------------- */

import home from '../assets/site_05.jpg';
import projects from '../assets/site_35.jpg';
import services from '../assets/srv_hero.jpg';
import systems from '../assets/sys_hero.jpg';
import contact from '../assets/contact_hero.jpg';

export const menu = {
  label: 'Menu',
  open: 'Open the menu',
  close: 'Close the menu',
  /* Short form for the button face; the sentence above stays the aria-label. */
  closeShort: 'Close',
  title: 'Menu',
  navLabel: 'All pages',
  reachLabel: 'Reach the office',

  items: [
    {
      label: 'Home',
      note: 'Thermal & Mechanical',
      to: '/',
      image: home,
      alt: 'Insulated rooftop pipework running past a chiller bank',
    },
    {
      label: 'Executed Projects',
      note: 'The catalogue, by discipline',
      to: '/projects',
      image: projects,
      alt: 'A long run of insulated chilled water pipework across a rooftop',
    },
    {
      label: 'Services',
      note: 'From drawing to commissioned plant',
      to: '/services',
      image: services,
      alt: 'Insulated distribution pipework running the length of a rooftop',
    },
    {
      label: 'Mechanical Systems',
      note: 'Thirteen disciplines',
      to: '/systems',
      image: systems,
      alt: 'Insulated pipework threading overhead through a plant hall',
    },
    {
      label: 'Contact',
      note: "Let's build together",
      to: '/contact',
      image: contact,
      alt: 'A TerryRock technician working on insulated pipework overhead',
    },
  ],
};
