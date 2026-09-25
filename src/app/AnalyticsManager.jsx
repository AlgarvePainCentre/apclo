import { useEffect } from 'react';
import { useCookieConsent } from '../utils/consentManager';

/*
 * Consent-gated analytics loader.
 *
 * Nothing loads until BOTH are true:
 *   1. a container id is configured in the environment, and
 *   2. the visitor has granted the "analytics" cookie category.
 *
 * So this ships mounted but dormant — set the id in Vercel and it activates on
 * consent, with no code change. Prefer GTM; fall back to GA4 (gtag) if only a
 * measurement id is given. Events are sent via `trackEvent` (src/utils/analytics.js).
 *
 * Env (set in Vercel → Project → Settings → Environment Variables):
 *   VITE_GTM_ID   Google Tag Manager container, e.g. GTM-XXXXXXX   (preferred)
 *   VITE_GA4_ID   GA4 measurement id, e.g. G-XXXXXXXXXX           (used if no GTM id)
 */
const GTM_ID = import.meta.env.VITE_GTM_ID;
const GA4_ID = import.meta.env.VITE_GA4_ID;

function loadGtm(id) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

function loadGa4(id) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

export default function AnalyticsManager() {
  const { consent } = useCookieConsent();
  const allowed = Boolean(consent?.analytics);

  useEffect(() => {
    if (!allowed) return; // no consent yet → stay dormant
    if (!GTM_ID && !GA4_ID) return; // no id configured → nothing to load
    if (window.__apcAnalyticsLoaded) return; // load once per page
    try {
      if (GTM_ID) loadGtm(GTM_ID);
      else loadGa4(GA4_ID);
      window.__apcAnalyticsLoaded = true;
    } catch {
      /* never let analytics break the app */
    }
  }, [allowed]);

  return null;
}
