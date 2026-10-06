import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookieConsent } from '../utils/consentManager';
import { trackEvent } from '../utils/analytics';

// Phone, email and WhatsApp links are contacts too, so every click on one is
// tracked as `contact_click`, site-wide, from a single delegated listener.
const CONTACT_LINKS = [
  { method: 'phone', match: (href) => href.startsWith('tel:') },
  { method: 'email', match: (href) => href.startsWith('mailto:') },
  { method: 'whatsapp', match: (href) => /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href) },
];

function handleContactClick(event) {
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const kind = CONTACT_LINKS.find(({ match }) => match(href));
  if (kind) trackEvent('contact_click', { method: kind.method, page_path: window.location.pathname });
}

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
// GA4 measurement ids are public (they ship in the page), so the client's id is
// baked in as the default — it works on deploy without any env config. Override
// with VITE_GA4_ID, or switch to GTM with VITE_GTM_ID.
const GA4_ID = import.meta.env.VITE_GA4_ID || 'G-GM1C7W4G8M';

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
  // Page views are sent by AnalyticsManager on every route change (this is a
  // single-page app, and GA4's own history detection was not recording the
  // in-app navigations), so the automatic one is turned off here.
  window.gtag('config', id, { anonymize_ip: true, send_page_view: false });
}

export default function AnalyticsManager() {
  const { consent } = useCookieConsent();
  const allowed = Boolean(consent?.analytics);
  const location = useLocation();

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

  // One GA4 page_view per route, including the landing page. Sent after a short
  // delay so the routed page has rendered and set its <title>; repeated
  // renders of the same URL are ignored.
  useEffect(() => {
    if (!allowed || GTM_ID || !GA4_ID) return undefined;
    const url = window.location.href;
    const path = `${location.pathname}${location.search}`;
    const timer = setTimeout(() => {
      if (typeof window.gtag !== 'function' || window.__apcLastPageView === url) return;
      window.__apcLastPageView = url;
      window.gtag('event', 'page_view', {
        page_location: url,
        page_path: path,
        page_title: document.title,
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [allowed, location.pathname, location.search]);

  // trackEvent stays silent until analytics is loaded (i.e. after consent),
  // so the listener can be attached unconditionally.
  useEffect(() => {
    document.addEventListener('click', handleContactClick, true);
    return () => document.removeEventListener('click', handleContactClick, true);
  }, []);

  return null;
}
