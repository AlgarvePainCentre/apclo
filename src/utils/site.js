// Canonical production origin. Use this (not window.location.origin) for any
// URL baked into SEO output — canonical links, og:url, JSON-LD @id/url/image.
// During prerender window.location.origin is the local snapshot server
// (http://localhost:PORT), which would otherwise leak into the snapshots.
export const SITE_ORIGIN = 'https://www.algarvepaincentre.com';
