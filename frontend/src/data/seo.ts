/* ---------------------------------------------------------------------------
   Everything a search engine, a social scraper or a browser tab is told about
   this site, in one place.

   The problem this file exists to solve: with nothing to go on, Google prints
   the host it crawled — "terryrockltd.com" — as the name above a result, and a
   shared link falls back to the same. Three things override that, and all
   three are written from the constants below so they cannot drift apart:

     1. the WebSite record in structured data, which is where Google reads the
        displayed site name from,
     2. og:site_name, which is what Facebook, WhatsApp and LinkedIn print,
     3. a <title> that leads with the brand on every route.

   All three say "TerryRock", so that is the name that shows.

   This module has two very different consumers — the Seo component in the
   browser, and the prerender step in vite.config.ts under Node — so it stays
   pure data and string handling. No DOM, no asset imports.
   --------------------------------------------------------------------------- */

/* The extension is explicit because this module is also read by
   vite.config.ts, which is compiled under nodenext resolution and rejects
   a relative import without one. Everything else under src/ is resolved by
   the bundler and so leaves it off. */
import { rockwoolFaq, type Faq } from "./rockwoolFaq.ts";

/** Canonical origin. No trailing slash — `absolute()` adds the separator. */
export const SITE_URL = "https://terryrockltd.com";

/** The name, and the only name, that should ever be displayed for this site. */
export const SITE_NAME = "TerryRock";

export const LEGAL_NAME = "TerryRock Technical Company Limited";
export const RC_NUMBER = "RC 1360332";
export const LOCALE = "en_NG";

/**
 * The square TR mark, for the `logo` field in structured data. Google wants an
 * actual logo there rather than a photograph, and at least 112px square — this
 * is the 512 written for Android, which doubles as the largest clean copy.
 */
export const LOGO_PATH = "/android-chrome-512x512.png";

/**
 * The share card. A photograph rather than a logo plate: it is the first thing
 * a reader sees of the company, and the work is the argument. The name is set
 * into the frame because a card is often seen before the title beneath it is
 * read — and in a forwarded WhatsApp message, sometimes instead of it.
 *
 * 1200x630 is not decoration. Facebook and WhatsApp scale anything smaller
 * down into a thumbnail beside the text, and LinkedIn wants at least 1200x627
 * before it will use the large card at all — the previous file was 1000x478,
 * which is why the link shared as a small tile rather than a picture.
 *
 * The filename carries the size change with it. Every scraper caches the image
 * against its URL and will happily serve the old crop for weeks; a new path is
 * the only reliable way to make them fetch again.
 *
 * The dimensions are declared below because a scraper that cannot fetch the
 * file still lays the card out correctly when it is told the shape.
 */
export const OG_IMAGE = {
  path: "/og-cover.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Insulated steel chilled water pipework on a rooftop plant deck built by TerryRock",
};

export type RouteSeo = {
  /** Router path, exactly as it appears in App.tsx. */
  path: string;
  /** Leads with the brand on every route — see the note at the top. */
  title: string;
  /** Kept near 155 characters: longer and a result page truncates it. */
  description: string;
  /**
   * The page's own name, without the brand in front of it. This is the crumb
   * Google prints in the breadcrumb line above a result, where "TerryRock —"
   * on every rung would only repeat the site name already shown beside it.
   */
  name: string;
  /**
   * schema.org page type. Everything is a WebPage unless a narrower type is
   * true — Google reads ContactPage as "this is where you reach them".
   */
  pageType?: "WebPage" | "ContactPage" | "CollectionPage";
  /**
   * Question-and-answer pairs, emitted as an FAQPage. Only worth carrying
   * where the answers are genuinely on the page — the markup tells Google the
   * page answers these, and a page that does not is worse off than one that
   * never claimed to. Google no longer prints FAQ rich results for a site like
   * this one, but it still reads the block to work out what the page is for,
   * which is the reason it is here.
   */
  faq?: Faq[];
  /**
   * A Service node, for a page whose subject is one thing the company sells
   * rather than the company itself. `areaServed` is the half that matters: it
   * is what connects the page to "in Lagos", "in Abuja", "in Nigeria" without
   * those phrases having to be stuffed into the copy.
   */
  service?: { name: string; type: string };
};

/* Order matters: the first entry is the home page and the fallback, and the
   sitemap is written in this order. */
export const routeSeo: RouteSeo[] = [
  {
    path: "/",
    title: "TerryRock — Thermal Insulation & Mechanical Engineering, Nigeria",
    description:
      "TerryRock Technical Company Ltd builds and insulates the mechanical systems behind modern buildings — HVAC, chilled water, ductwork, cladding and thermal insulation, delivered across Nigeria since 2009.",
    name: "Home",
  },
  {
    path: "/services",
    title: "TerryRock — Insulation & Mechanical Services",
    description:
      "Mechanical, insulation and electrical work handled in house: pipe fabrication and welding, cladding, HVAC, steel tanks and industrial thermal insulation, to an ISO 9001 quality system.",
    name: "Services",
  },
  {
    path: "/systems",
    title: "TerryRock — Mechanical Systems",
    description:
      "Thirteen disciplines in detail — pipework and welding, insulation and acoustic materials, cladding, laminating, steel tanks, HVAC, generator exhausts, boiler chimneys and plant installation.",
    name: "Mechanical Systems",
  },
  {
    path: "/projects",
    title: "TerryRock — Executed Projects",
    description:
      "Chiller banks, plant rooms, pump sets, rooftop distribution and riser pipework: mechanical, ductwork and insulation packages completed on site across Lagos and Abuja.",
    name: "Executed Projects",
    pageType: "CollectionPage",
  },
  {
    path: "/rockwool",

    title: "Rockwool Insulation Nigeria — Supply & Installation | TerryRock",
    description:
      "Rockwool blanket, slab board and pipe sections held in Lagos and Abuja — supplied loose or fitted to chilled water, ductwork, generator houses and chimneys.",
    name: "Rockwool",
    faq: rockwoolFaq,
    service: {
      name: "Rockwool insulation supply and installation",
      type: "Insulation supply and installation",
    },
  },
  {
    path: "/contact",
    title: "TerryRock — Contact",
    description:
      "Two Lagos premises and an Abuja workshop. Send a scope, a drawing or a rough idea of the works and TerryRock comes back with a price for the whole package.",
    name: "Contact",
    pageType: "ContactPage",
  },
];

export const defaultSeo: RouteSeo = routeSeo[0];

/** Absolute URL for a router path. The origin itself keeps its single slash. */
export function absolute(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export type ResolvedSeo = RouteSeo & {
  canonical: string;
  /**
   * False for anything that is not one of the routes above. App.tsx renders the
   * home page for unknown paths, so without this every mistyped URL would be a
   * second, indexable copy of the landing page.
   */
  indexable: boolean;
};

export function seoFor(pathname: string): ResolvedSeo {
  /* A trailing slash is the same page to the router, so it is the same page
     here. */
  const path =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
  const match = routeSeo.find((route) => route.path === path);

  return match
    ? { ...match, canonical: absolute(match.path), indexable: true }
    : { ...defaultSeo, canonical: absolute(defaultSeo.path), indexable: false };
}

/* ---------------------------------------------------------------------------
   Structured data.

   Four records. The first two are site level and identical on every route; the
   last two describe the page being served:

     Organization — who the company is. Google reconciles the site with the
       business behind it from this, and `alternateName` carries the other forms
       people type.
     WebSite — the record Google reads the displayed site name from. This is the
       one that stops "terryrockltd.com" appearing above a result.
     WebPage — this page, tied back to both of the above by @id so the three
       read as one graph rather than three unrelated claims.
     BreadcrumbList — the trail Google prints above a result in place of the
       raw URL. Home is the first rung on every page but the home page, which
       is a trail of one and so gets none.
   --------------------------------------------------------------------------- */

const ORGANISATION_ID = `${SITE_URL}/#organisation`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function structuredData(seo: ResolvedSeo): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORGANISATION_ID,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      alternateName: [
        LEGAL_NAME,
        "TerryRock Technical",
        "Terry Technical Company",
      ],
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}${LOGO_PATH}`,
      image: `${SITE_URL}${OG_IMAGE.path}`,
      description: defaultSeo.description,
      identifier: RC_NUMBER,
      foundingDate: "2009",
      areaServed: ["Nigeria", "West Africa"],
      knowsAbout: [
        "Thermal insulation",
        "HVAC installation",
        "Chilled water pipework",
        "Ductwork fabrication",
        "Cladding",
        "Mechanical engineering services",
      ],
      email: "info@terryrockltd.com",
      telephone: "+2348038810551",
      /* `sameAs` is how Google ties this site to the same company elsewhere,
         so a URL here has to resolve — the accounts this used to name were
         both gone, which claimed a presence that was not there. Keep it in
         step with `contact.socials` in site.ts. */
      sameAs: [
        "https://www.instagram.com/terryrock_technical/",
        "https://www.tiktok.com/@terryrock128",
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "No. 19, Jamiu Balogun Street, Shangisha-Magodo Road",
          addressLocality: "Ikosi-Ketu, Lagos",
          addressRegion: "Lagos",
          addressCountry: "NG",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "7 Ilare Close, 7 & 8 Bus Stop, Airport Road",
          addressLocality: "Mafoluku, Oshodi, Lagos",
          addressRegion: "Lagos",
          addressCountry: "NG",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "Beside Exclusive Holiday Resort and Suites, Lokogoma District",
          addressLocality: "Abuja",
          addressRegion: "FCT",
          addressCountry: "NG",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      /* The displayed site name. Deliberately the short brand and nothing
         else — a name carrying a suffix gets shown with the suffix. */
      name: SITE_NAME,
      alternateName: LEGAL_NAME,
      url: `${SITE_URL}/`,
      inLanguage: "en",
      publisher: { "@id": ORGANISATION_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": seo.pageType ?? "WebPage",
      "@id": `${seo.canonical}#webpage`,
      url: seo.canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANISATION_ID },
      primaryImageOfPage: `${SITE_URL}${OG_IMAGE.path}`,
      inLanguage: "en",
    },
    ...(seo.service
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${seo.canonical}#service`,
            name: seo.service.name,
            serviceType: seo.service.type,
            description: seo.description,
            provider: { "@id": ORGANISATION_ID },
            areaServed: [
              { "@type": "Country", name: "Nigeria" },
              { "@type": "City", name: "Lagos" },
              { "@type": "City", name: "Abuja" },
            ],
            /* The page is the thing to open, so it is the thing offered. A
               price is deliberately absent: quotes are written against a
               schedule, and a number here would be one the office never gave. */
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              url: seo.canonical,
            },
          },
        ]
      : []),
    ...(seo.faq?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${seo.canonical}#faq`,
            mainEntity: seo.faq.map((entry) => ({
              "@type": "Question",
              name: entry.question,
              acceptedAnswer: { "@type": "Answer", text: entry.answer },
            })),
          },
        ]
      : []),
    ...(seo.path === defaultSeo.path
      ? []
      : [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${seo.canonical}#breadcrumbs`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: defaultSeo.name,
                item: absolute(defaultSeo.path),
              },
              /* The last rung carries no `item`: it is the page already open,
                 and a self link there is what makes Google drop the trail. */
              { "@type": "ListItem", position: 2, name: seo.name },
            ],
          },
        ]),
  ];
}

/* ---------------------------------------------------------------------------
   The head block, as HTML.

   Written here rather than typed into index.html so that the served document,
   the prerendered route files and the tags the Seo component maintains all come
   from the same record. vite.config.ts drops the result in place of the
   `<!--seo-head-->` marker in index.html, and writes it again per route after
   the build.
   --------------------------------------------------------------------------- */

export function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderHead(seo: ResolvedSeo): string {
  const image = `${SITE_URL}${OG_IMAGE.path}`;

  const meta: [attribute: "name" | "property", key: string, content: string][] =
    [
      ["name", "description", seo.description],
      [
        "name",
        "robots",
        seo.indexable
          ? "index, follow, max-image-preview:large"
          : "noindex, follow",
      ],
      ["name", "author", LEGAL_NAME],

      /* The three places a client reads a name from when it has to print one:
       the share card, the Windows tile, and an iOS home screen shortcut. All
       three say the brand and nothing else. */
      ["property", "og:site_name", SITE_NAME],
      ["name", "application-name", SITE_NAME],
      ["name", "apple-mobile-web-app-title", SITE_NAME],

      ["property", "og:type", "website"],
      ["property", "og:locale", LOCALE],
      ["property", "og:title", seo.title],
      ["property", "og:description", seo.description],
      ["property", "og:url", seo.canonical],
      ["property", "og:image", image],
      /* Facebook reads this one in preference to og:image when it has it, and a
       few older scrapers will not show a card without it. Same file. */
      ["property", "og:image:secure_url", image],
      ["property", "og:image:width", String(OG_IMAGE.width)],
      ["property", "og:image:height", String(OG_IMAGE.height)],
      ["property", "og:image:type", OG_IMAGE.type],
      ["property", "og:image:alt", OG_IMAGE.alt],

      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", seo.title],
      ["name", "twitter:description", seo.description],
      ["name", "twitter:image", image],
      ["name", "twitter:image:alt", OG_IMAGE.alt],
    ];

  /* The attribute order is load bearing: the prerender step finds a tag by its
     name or property and rewrites the content that follows it. */
  const tags = meta.map(
    ([attribute, key, content]) =>
      `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`,
  );

  return [
    `<title>${escapeAttribute(seo.title)}</title>`,
    `<link rel="canonical" href="${escapeAttribute(seo.canonical)}" />`,
    ...tags,
    /* Closing angle brackets inside the JSON would end the script early; there
       are none in this data, and escaping the sequence keeps it that way. */
    `<script type="application/ld+json">${JSON.stringify(
      structuredData(seo),
    ).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}
