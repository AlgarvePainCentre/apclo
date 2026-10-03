import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_ORIGIN } from '../utils/site';

/*
 * Per-page Open Graph / Twitter tags.
 *
 * index.html ships home-level defaults (og:image, og:type, twitter:card stay as
 * those static fallbacks). Pages set their own <title> and meta description by
 * several different mechanisms (usePageMeta, or their own effects), so rather
 * than hook into each one, this mirrors the *resulting* document.title and
 * description into og:/twitter: title + description, and sets a per-page url.
 *
 * Mounted in ShellLayout (a parent of the routed page), so its effect runs
 * after the page's own title/description effect on each navigation. A trailing
 * microtask re-reads in case the page sets its title in a later effect; the
 * prerender settle delay then captures the final values into each snapshot.
 */
function upsert(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function OpenGraphManager() {
  const location = useLocation();

  useEffect(() => {
    const apply = () => {
      try {
        const title = document.title;
        const descEl = document.head.querySelector('meta[name="description"]');
        const description = descEl ? descEl.getAttribute('content') : '';
        const url = `${SITE_ORIGIN}${location.pathname}`;
        if (title) {
          upsert('og:title', title);
          upsert('twitter:title', title);
        }
        if (description) {
          upsert('og:description', description);
          upsert('twitter:description', description);
        }
        upsert('og:url', url);
        upsert('twitter:url', url);
      } catch {
        /* never let meta management break rendering */
      }
    };
    apply();
    const t = setTimeout(apply, 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return null;
}
