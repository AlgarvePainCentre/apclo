import { ADS_ID, ADS_LEAD_LABEL, GA4_ID } from '../app/analyticsIds';
import { getCookieConsent } from './consentManager';

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
    // gtag can also be loaded for Google Ads alone (marketing consent), so check
    // analytics consent here too.
    if (typeof window.gtag === 'function' && getCookieConsent().analytics) {
      // Addressed to GA4 only, so these never reach the Google Ads tag.
      window.gtag('event', event, { ...params, send_to: GA4_ID });
      delivered = true;
    }
    if (!delivered && import.meta.env && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', payload);
    }
  } catch {}
};

// Google Ads conversion for a contact-form lead (the conversion the old site's
// Tag Manager fired on /thank-you). Only with "marketing" consent, and only once
// gtag has been loaded by AnalyticsManager.
export const trackAdsConversion = () => {
  try {
    if (!ADS_ID || !ADS_LEAD_LABEL) return;
    if (!getCookieConsent().marketing || typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
  } catch {
    /* never let analytics break the form */
  }
};
