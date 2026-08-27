/* ---------------------------------------------------------------------------
   The rockwool questions, in a module of their own.

   They have two consumers that cannot see each other: the page renders them,
   and seo.ts writes them into the page's structured data as an FAQPage. The
   page record imports photographs, and seo.ts is read by the prerender step
   under Node where an image import means nothing — so the pairs live here,
   where both can reach them, rather than being typed out twice and left to
   drift apart.

   Answers, not sales copy. Google reads this markup as a claim that the text
   on the page answers the question in it, and a reader who arrived on one of
   these questions has to find the answer where the search result promised it.
   --------------------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export const rockwoolFaq: Faq[] = [
  {
    question: 'Do you sell rockwool as material only, or do you install it?',
    answer:
      'Both. Material can be bought off the shelf from the Lagos or Abuja premises, and it can be supplied and fitted as part of a package — pipework, insulation, cladding and finish under one contract.',
  },
  {
    question: 'What forms of rockwool do you stock?',
    answer:
      'Rockwool blanket in rolls, rockwool slab and board, and preformed rockwool pipe sections. Alongside them the store holds rigid pipe insulation, ceramic fibre, calcium silicate, polystyrene, fire blanket, aluminium and stainless sheet, and banding.',
  },
  {
    question: 'Is rockwool fire resistant?',
    answer:
      'Rockwool is spun from molten basalt, so the fibre itself does not burn. It will not carry a flame, will not drip and adds no fuel to a fire, which is why it is used to line risers, plant rooms and generator houses where fire has to be contained.',
  },
  {
    question: 'What thickness and density of rockwool do I need?',
    answer:
      'That comes from the duty rather than from a catalogue. Send the line temperature, the pipe sizes or surface areas, and where the run sits, and the office returns a schedule giving the thickness and density for each line.',
  },
  {
    question: 'Do you deliver rockwool outside Lagos?',
    answer:
      'Yes. Stock is held in Lagos and Abuja and delivered to sites across Nigeria. Give the delivery address with the enquiry and the quote comes back with the material and the haulage in it.',
  },
];
