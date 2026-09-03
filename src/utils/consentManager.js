import { useEffect, useMemo, useState } from 'react';

export const COOKIE_CONSENT_COOKIE_NAME = 'apc_cookie_preferences';
const COOKIE_CONSENT_STORAGE_KEY = 'apc_cookie_preferences';
const COOKIE_CONSENT_VERSION = 1;
const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
const CHANGE_EVENT = 'apc:cookie-consent-changed';
const OPEN_SETTINGS_EVENT = 'apc:open-cookie-settings';

const DEFAULT_CONSENT = Object.freeze({
  version: COOKIE_CONSENT_VERSION,
  necessary: true,
  preferences: false,
  analytics: false,
  media: false,
  hasResponded: false,
  updatedAt: null,
});

function normaliseConsent(input = {}) {
  return {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    preferences: Boolean(input.preferences),
    analytics: Boolean(input.analytics),
    media: Boolean(input.media),
    hasResponded: Boolean(input.hasResponded),
    updatedAt: input.updatedAt || null,
  };
}

function parseStoredValue(rawValue) {
  if (!rawValue) return null;
  try {
    return normaliseConsent(JSON.parse(decodeURIComponent(rawValue)));
  } catch {
    return null;
  }
}

function readConsentCookie() {
  if (typeof document === 'undefined') return null;
  const cookiePart = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${COOKIE_CONSENT_COOKIE_NAME}=`));
  if (!cookiePart) return null;
  return parseStoredValue(cookiePart.slice(COOKIE_CONSENT_COOKIE_NAME.length + 1));
}

function writeConsentCookie(consent) {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(JSON.stringify(consent));
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${value}; Max-Age=${COOKIE_CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

function readConsentStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return parseStoredValue(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeConsentStorage(consent) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, encodeURIComponent(JSON.stringify(consent)));
  } catch {}
}

function broadcastConsent(consent) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
}

export function getCookieConsent() {
  return readConsentCookie() || readConsentStorage() || DEFAULT_CONSENT;
}

export function saveCookieConsent(nextConsent) {
  const consent = normaliseConsent({
    ...nextConsent,
    hasResponded: true,
    updatedAt: new Date().toISOString(),
  });

  writeConsentCookie(consent);
  writeConsentStorage(consent);
  broadcastConsent(consent);
  return consent;
}

export function acceptAllCookieConsent() {
  return saveCookieConsent({
    necessary: true,
    preferences: true,
    analytics: true,
    media: true,
  });
}

export function rejectOptionalCookieConsent() {
  return saveCookieConsent({
    necessary: true,
    preferences: false,
    analytics: false,
    media: false,
  });
}

export function updateCookieConsent(partialConsent) {
  const current = getCookieConsent();
  return saveCookieConsent({ ...current, ...partialConsent, necessary: true });
}

export function hasCookieConsent(category) {
  const consent = getCookieConsent();
  if (category === 'necessary') return true;
  return Boolean(consent?.[category]);
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState(() => getCookieConsent());

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleChange = (event) => {
      if (event instanceof CustomEvent && event.detail) {
        setConsent(normaliseConsent(event.detail));
        return;
      }
      setConsent(getCookieConsent());
    };

    window.addEventListener(CHANGE_EVENT, handleChange);
    window.addEventListener('storage', handleChange);

    return () => {
      window.removeEventListener(CHANGE_EVENT, handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  return useMemo(
    () => ({
      consent,
      hasResponded: consent.hasResponded,
      acceptAll: acceptAllCookieConsent,
      rejectOptional: rejectOptionalCookieConsent,
      updateConsent: updateCookieConsent,
      openSettings: openCookieSettings,
    }),
    [consent]
  );
}

export function onOpenCookieSettings(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(OPEN_SETTINGS_EVENT, callback);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, callback);
}
