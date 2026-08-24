/* ---------------------------------------------------------------------------
   Contact page. The addresses, numbers, emails and socials all come from
   `contact` in site.ts — this file only carries the copy that belongs to the
   page itself, so there is one source of truth for how to reach the company.
   --------------------------------------------------------------------------- */

import hero from '../assets/contact_hero.jpg';
import band from '../assets/contact_band.jpg';

export const contactPage = {
  eyebrow: 'Contact',
  headline: ["Let's build", 'together'],
  lede: 'Send a scope, a drawing or a rough idea of the works. We will come back with a price for the package — fabrication, installation, insulation and finish.',
  hero: {
    image: hero,
    alt: 'A TerryRock technician working on insulated pipework overhead',
  },

  /* Countable straight off this page: three premises, four lines, two cities. */
  facts: [
    { value: '03', label: 'Premises' },
    { value: '05', label: 'Phone lines' },
    { value: '02', label: 'Cities' },
  ],

  /* -- WhatsApp ------------------------------------------------------------ */
  whatsapp: {
    /* Same line as the second entry in `contact.phones`, in the international
       form wa.me needs: no plus, no spaces. */
    display: '+234 803 881 0551',
    number: '2348038810551',
    title: 'Chat on WhatsApp',
    subtitle: 'TerryRock Technical',
    intro: 'Pick a starting point, or write your own — it opens the chat with the message ready.',
    presets: ['I have a scope to price', 'I need insulation materials', 'Can you visit our site?'],
    placeholder: 'Type your message\u2026',
    send: 'Send on WhatsApp',
    open: 'Open the WhatsApp composer',
    close: 'Close the WhatsApp composer',
    panelLabel: 'WhatsApp',
  },

  /* -- The enquiry form ---------------------------------------------------- */
  form: {
    eyebrow: 'Start an enquiry',
    title: ['Tell us what', 'you are building'],
    /* No server sits behind this site, so the form composes the message and
       hands it to the reader's own mail client. Said plainly under the button
       rather than dressed up as a send. */
    note: 'This opens your mail app with the details filled in, addressed to the office.',
    submit: 'Compose the enquiry',
    fields: {
      name: 'Your name',
      company: 'Company',
      sector: 'Sector',
      scope: 'What are the works?',
      scopePlaceholder: 'Location, scope, programme — and anything already drawn.',
    },
    sectors: [
      'Oil and gas',
      'Manufacturing',
      'Hospitality',
      'Utilities',
      'Construction',
      'Something else',
    ],
    subject: 'Enquiry from the TerryRock website',
  },

  /* -- The direct panel ---------------------------------------------------- */
  direct: {
    eyebrow: 'Direct lines',
    title: 'Or reach us directly',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    socialLabel: 'Social',
    whatsappLabel: 'WhatsApp',
    whatsappHint: 'Opens a chat with the office',
  },

  /* -- What happens next ---------------------------------------------------- */
  /* Written for this page: a plain description of how an enquiry is handled,
     not a service-level promise. */
  steps: {
    eyebrow: 'What happens next',
    items: [
      {
        title: 'You send the scope',
        body: 'Drawings, a specification, or just the works and the location.',
      },
      {
        title: 'We price the package',
        body: 'Fabrication, installation, insulation and finish, itemised under one contract.',
      },
      {
        title: 'The crew mobilises',
        body: 'Materials come out of stock in Lagos or Abuja, so the programme starts on time.',
      },
    ],
  },

  /* -- Premises ------------------------------------------------------------ */
  premises: {
    eyebrow: 'Premises',
    title: ['Two in Lagos,', 'one in Abuja'],
    lede: 'Stock is held at all three, so a package never waits on an import.',
    directions: 'Directions',
  },

  band: {
    image: band,
    alt: 'A TerryRock crew fitting louvres to a building facade',
    caption: 'On site across Lagos and Abuja',
  },
};
