// Send a custom event. Works with either analytics backend, and stays silent
// until one is loaded (which only happens after analytics consent — see
// src/app/AnalyticsManager.jsx), so nothing is tracked without consent.
export const trackEvent = (event, params = {}) => {
  try {
    const payload = { event, ...params, ts: Date.now() };
    let delivered = false;
    // GTM: consume the dataLayer queue.
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
      delivered = true;
    }
    // GA4 (gtag) direct: bridge the custom event so it reaches GA4 too.
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
      delivered = true;
    }
    if (!delivered && import.meta.env && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', payload);
    }
  } catch {}
};
