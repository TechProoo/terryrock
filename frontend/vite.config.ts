import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import {
  SITE_URL,
  absolute,
  defaultSeo,
  escapeAttribute,
  renderHead,
  routeSeo,
  seoFor,
  structuredData,
} from './src/data/seo.ts';

/* ---------------------------------------------------------------------------
   SEO plugin.

   Two jobs, both fed from src/data/seo.ts:

   1. Fill the `<!--seo-head-->` marker in index.html with the head block. This
      runs in dev as well as in a build, so what a developer sees is what ships.

   2. Prerender. This is a single-page app: React Router invents /projects and
      the rest in the browser, and the SPA fallback in public/_redirects hands
      every one of them the same index.html. Google runs the JavaScript and so
      ends up with the right head, but the scrapers behind a shared link —
      WhatsApp, Facebook, LinkedIn, X — do not. They would show the home page's
      title and description for every route on the site.

      So after the build each route gets a real file at dist/<route>.html,
      identical to index.html but with its own head. Netlify serves a matching
      file before it reaches the fallback rule, so those are what a scraper
      gets, while the app itself boots and behaves exactly as before.

      The flat name matters. Written as dist/<route>/index.html these were
      served at /services/ and Netlify answered /services — the URL in every
      link, in the canonical tag and in the sitemap — with a 301 to the slashed
      form. That made the canonical point at a redirect, which is the one thing
      a canonical must never do. A file at dist/services.html is served at
      /services directly, and it is the slashed form that redirects instead.

   A sitemap falls out of the same list, which is the point of it living in one
   place: a route added to seo.ts is prerendered and listed without anyone
   having to remember either step.
   --------------------------------------------------------------------------- */

/** Rewrites the content of the `<meta>` tag carrying this name or property. */
function replaceMeta(html: string, attribute: string, key: string, content: string): string {
  const pattern = new RegExp(`(<meta ${attribute}="${key}" content=")[^"]*(")`);
  /* `$` is a substitution marker in the replacement string, so any in the copy
     is escaped before it can eat the captured group beside it. */
  const value = escapeAttribute(content).replace(/\$/g, '$$$$');
  return html.replace(pattern, `$1${value}$2`);
}

function seoPlugin(): Plugin {
  return {
    name: 'terryrock-seo',

    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace('<!--seo-head-->', renderHead(seoFor(defaultSeo.path))),
    },

    /* After the bundle is written, so dist/index.html exists to copy from. */
    closeBundle: {
      sequential: true,
      handler: async () => {
        const dist = join(import.meta.dirname, 'dist');
        const home = await readFile(join(dist, 'index.html'), 'utf8');

        /* The home page is already on disk as dist/index.html; the rest are
           copies of it with the head values swapped. Pulling the values out of
           the built file rather than re-rendering the block keeps whatever else
           the build injected — asset URLs, preloads — untouched. */
        const rest = routeSeo.filter((route) => route.path !== defaultSeo.path);

        for (const route of rest) {
          const seo = seoFor(route.path);
          let html = home;

          html = html.replace(
            /<title>[^<]*<\/title>/,
            `<title>${escapeAttribute(seo.title)}</title>`,
          );
          html = html.replace(
            /(<link rel="canonical" href=")[^"]*(")/,
            `$1${seo.canonical}$2`,
          );
          html = replaceMeta(html, 'name', 'description', seo.description);
          html = replaceMeta(html, 'property', 'og:title', seo.title);
          html = replaceMeta(html, 'property', 'og:description', seo.description);
          html = replaceMeta(html, 'property', 'og:url', seo.canonical);
          html = replaceMeta(html, 'name', 'twitter:title', seo.title);
          html = replaceMeta(html, 'name', 'twitter:description', seo.description);

          /* The structured data carries this page's WebPage node and its
             breadcrumb trail, so it is rebuilt rather than patched. */
          html = html.replace(
            /(<script type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
            `$1${JSON.stringify(structuredData(seo)).replace(/</g, '\\u003c').replace(/\$/g, '$$$$')}$2`,
          );

          const file = join(dist, `${route.path.slice(1)}.html`);
          await mkdir(dirname(file), { recursive: true });
          await writeFile(file, html, 'utf8');
        }

        /* Netlify picks the file for a path on its own, and what it picks is
           not something to leave to a default that can be toggled in a UI. So
           the rules that map each route to its prerendered file are written
           out here, from the same list, and prepended to the SPA fallback that
           travels in public/_redirects — first match wins, so they have to sit
           above it.

           Two rules per route: the slashed form redirects to the canonical
           one, and the canonical one is served from its file without a
           redirect of its own. */
        const redirects = join(dist, '_redirects');
        const fallback = await readFile(redirects, 'utf8');
        const rules = rest.flatMap((route) => [
          `${route.path}/    ${route.path}    301!`,
          `${route.path}    ${route.path}.html    200`,
        ]);

        await writeFile(
          redirects,
          [
            '# Canonical URLs, written by the seo plugin in vite.config.ts.',
            '# One route per pair: the slashed form redirects, the canonical',
            '# form is served. Do not edit here — edit routeSeo in',
            '# src/data/seo.ts and rebuild.',
            ...rules,
            '',
            fallback.trimStart(),
          ].join('\n'),
          'utf8',
        );

        const lastmod = new Date().toISOString().slice(0, 10);
        const sitemap = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...routeSeo.map((route) =>
            [
              '  <url>',
              `    <loc>${absolute(route.path)}</loc>`,
              `    <lastmod>${lastmod}</lastmod>`,
              /* The landing page is the one that carries the brand and links to
                 everything else; the rest are equals below it. */
              `    <priority>${route.path === defaultSeo.path ? '1.0' : '0.8'}</priority>`,
              '  </url>',
            ].join('\n'),
          ),
          '</urlset>',
          '',
        ].join('\n');

        await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');

        console.log(
          `\nseo: prerendered ${rest.length} route${rest.length === 1 ? '' : 's'}, ` +
            `their redirect rules and a sitemap for ${SITE_URL}`,
        );
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
});
