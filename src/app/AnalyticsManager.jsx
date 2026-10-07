import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookieConsent } from '../utils/consentManager';
import { trackEvent } from '../utils/analytics';
import { getLandingPage } from '../utils/landingPage';
import { ADS_ID, GA4_ID, GTM_ID } from './analyticsIds';

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
 * Consent-gated Google tags.
 *
 * Nothing loads until the visitor allows it in the cookie banner:
 *   - "analytics"  → GA4 (GA4_ID)
 *   - "marketing"  → Google Ads conversion tracking (ADS_ID)
 * Google Consent Mode v2 is set to "denied" for everything first and then
 * updated to the visitor's choices, and updated again whenever they change.
 * Ids live in src/app/analyticsIds.js. Events go through src/utils/analytics.js.
 * If VITE_GTM_ID is set, Tag Manager is loaded instead (on analytics consent).
 */
function loadGtm(id) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

function ensureGtag(firstId) {
  if (window.__apcGtagLoaded) return;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(firstId)}`;
  document.head.appendChild(s);
  window.gtag('js', new Date());
  window.__apcGtagLoaded = true;
}

const CLICK_ID = /[?&](gclid|gbraid|wbraid)=/;

export default function AnalyticsManager() {
  const { consent } = useCookieConsent();
  const analytics = Boolean(consent?.analytics);
  const marketing = Boolean(consent?.marketing);
  const location = useLocation();

  useEffect(() => {
    try {
      if (GTM_ID) {
        if (analytics && !window.__apcGtmLoaded) {
          loadGtm(GTM_ID);
          window.__apcGtmLoaded = true;
        }
        return;
      }
      const wantGa = analytics && Boolean(GA4_ID);
      const wantAds = marketing && Boolean(ADS_ID);
      if (!window.__apcGtagLoaded && !wantGa && !wantAds) return; // nothing allowed yet
      ensureGtag(wantGa ? GA4_ID : ADS_ID);
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: 'denied', // no remarketing / personalised ads
      });
      if (wantGa && !window.__apcGaConfigured) {
        // Page views are sent below on every route change (single-page app;
        // GA4's own history detection did not record in-app navigations).
        window.gtag('config', GA4_ID, { anonymize_ip: true, send_page_view: false });
        window.__apcGaConfigured = true;
      }
      if (wantAds && !window.__apcAdsConfigured) {
        // If the visitor arrived from an ad but only accepted cookies after
        // moving on, the ad click id is no longer in the URL: hand the Ads tag
        // the landing page so the conversion can still be attributed.
        const landing = getLandingPage();
        const lostClickId = CLICK_ID.test(landing) && !CLICK_ID.test(window.location.search);
        window.gtag('config', ADS_ID, lostClickId ? { page_location: landing } : {});
        window.__apcAdsConfigured = true;
      }
    } catch {
      /* never let analytics break the app */
    }
  }, [analytics, marketing]);

  // One GA4 page_view per route, including the landing page. Sent after a short
  // delay so the routed page has rendered and set its <title>; repeated
  // renders of the same URL are ignored.
  useEffect(() => {
    if (!analytics || GTM_ID || !GA4_ID) return undefined;
    const url = window.location.href;
    const path = `${location.pathname}${location.search}`;
    const timer = setTimeout(() => {
      if (typeof window.gtag !== 'function' || window.__apcLastPageView === url) return;
      window.__apcLastPageView = url;
      window.gtag('event', 'page_view', {
        page_location: url,
        page_path: path,
        page_title: document.title,
        send_to: GA4_ID,
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [analytics, location.pathname, location.search]);

  // trackEvent stays silent until analytics is loaded (i.e. after consent),
  // so the listener can be attached unconditionally.
  useEffect(() => {
    document.addEventListener('click', handleContactClick, true);
    return () => document.removeEventListener('click', handleContactClick, true);
  }, []);

  return null;
}
