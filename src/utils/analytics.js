export const trackEvent = (event, params = {}) => {
  try {
    const payload = { event, ...params, ts: Date.now() };
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    } else {
      if (import.meta.env && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug('[analytics]', payload);
      }
    }
  } catch {}
};
