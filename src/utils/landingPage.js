// Remembers the page a visitor first landed on in this tab (including UTM and
// other campaign parameters), so a contact-form lead can report where the
// visit came from. Stored in sessionStorage only: it never leaves the browser
// except as the Zoho "Referrer Name" of a form the visitor chooses to send.
const KEY = 'apc_landing_page';

export function rememberLandingPage() {
  try {
    if (!window.sessionStorage.getItem(KEY)) {
      window.sessionStorage.setItem(KEY, window.location.href);
    }
  } catch {
    /* storage blocked: fall back to the current page at submit time */
  }
}

export function getLandingPage() {
  try {
    return window.sessionStorage.getItem(KEY) || window.location.href;
  } catch {
    return window.location.href;
  }
}
