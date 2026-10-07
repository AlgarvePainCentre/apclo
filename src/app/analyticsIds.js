// Google measurement ids. All of these are public (they ship in the page), so
// the client's ids are baked in as defaults and can be overridden by env.
//   GA4:        Google Analytics 4 property (needs "analytics" consent)
//   Google Ads: conversion tracking for contact-form leads (needs "marketing"
//               consent). Same account and conversion the old site's Google Tag
//               Manager fired on its /thank-you page.
export const GTM_ID = import.meta.env.VITE_GTM_ID;
export const GA4_ID = import.meta.env.VITE_GA4_ID || 'G-GM1C7W4G8M';
export const ADS_ID = import.meta.env.VITE_ADS_ID || 'AW-11043273194';
export const ADS_LEAD_LABEL = import.meta.env.VITE_ADS_LEAD_LABEL || 'WDodCPnDwtQZEOrz65Ep';
