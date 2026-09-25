import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
 * Sets a self-referencing <link rel="canonical"> on every route.
 *
 * index.html ships a single static canonical pointing at the home page, which
 * every client-rendered route would otherwise inherit — telling search engines
 * that every page is the home page. This upserts the tag to the current path on
 * each navigation (ignoring query/hash), so each page canonicalises to itself.
 * The prerender step captures the corrected tag into each route's snapshot.
 */
const SITE = 'https://www.algarvepaincentre.com';

export default function CanonicalManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
    const href = `${SITE}${path}`;
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }, [pathname]);

  return null;
}
