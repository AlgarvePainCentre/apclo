import { useEffect } from 'react';

/*
 * Sets a per-page document.title and meta description (upserting the tag), so
 * pages don't fall back to the generic index.html defaults. Canonical + og are
 * handled elsewhere (CanonicalManager); this covers title + description.
 */
export default function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description != null) {
      let meta = document.head.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
