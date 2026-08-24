import { useLayoutEffect } from 'react';
import { seoFor } from '../data/seo';

/* ---------------------------------------------------------------------------
   Per-route head tags.

   index.html carries the home page's head, and every route file written by the
   prerender step carries its own, so a crawler that never runs a line of
   JavaScript already reads the right thing. This component covers the other
   case: a reader moving between routes inside the app, where the document is
   never re-fetched and the head would otherwise keep describing the page they
   arrived on.

   It only rewrites what actually varies by route. og:site_name, og:type, the
   share image and the Twitter card kind are the same everywhere, so they are
   left where they are rather than being set again on every navigation.
   --------------------------------------------------------------------------- */

type Props = {
  /** The path the route curtain is currently showing, not the live one. */
  pathname: string;
};

/** Updates the tag matching `selector`, creating it if the document lacks one. */
function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

export default function Seo({ pathname }: Props) {
  const { title, description, canonical, indexable } = seoFor(pathname);

  /* Layout effect rather than a plain one: the title should already be correct
     when the curtain lifts on the new page, not a frame after it. */
  useLayoutEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    /* Unknown paths render the landing page, so they are told not to be indexed
       as a second copy of it. `follow` stays on either way — the links out of
       the page are still worth crawling. */
    upsertMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    );

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', canonical);
  }, [title, description, canonical, indexable]);

  return null;
}
