// Shared contact-form logic for both hosts: the Vercel function (api/contact.js)
// and the Cloudflare Worker (worker/index.js). Verifies the hCaptcha token
// server-side, then forwards the submission to Zoho Forms (server-to-server,
// so there's no CORS and the captcha can't be bypassed by posting to Zoho).
// The leading underscore keeps Vercel from exposing this file as a route.

export const DEFAULT_ZOHO_ACTION =
  'https://forms.zohopublic.eu/paincentremktgm1/form/1APCContactUs/formperma/VO5_fDW9RtmBVwQ0SjvkM6Pk12IGM2-G-ejswgMV6sY/htmlRecords/submit';

// hCaptcha's documented test secret — verifies any token. Replace via env.
export const TEST_HCAPTCHA_SECRET = '0x0000000000000000000000000000000000000000';

// Only pass through a plain http(s) URL, capped in length, as Zoho's
// "Referrer Name" (it shows where the lead's visit started).
function cleanReferrer(value) {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    return url.href.slice(0, 500);
  } catch {
    return '';
  }
}

/**
 * @param {object} body parsed JSON body
 * @param {{ hcaptchaSecret?: string, zohoAction?: string }} config
 * @returns {Promise<{ status: number, json: object }>}
 */
export async function processContact(body, config = {}) {
  const hcaptchaSecret = config.hcaptchaSecret || TEST_HCAPTCHA_SECRET;
  const zohoAction = config.zohoAction || DEFAULT_ZOHO_ACTION;
  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    countryCode = '+351',
    message = '',
    hcaptchaToken = '',
    company = '', // honeypot
    referrer = '', // page the visitor landed on (with campaign params)
  } = body || {};

  // Honeypot: humans never fill this. Pretend success, drop silently.
  if (company) return { status: 200, json: { ok: true } };

  if (!email || !message) {
    return { status: 400, json: { error: 'Email and message are required.' } };
  }
  if (!hcaptchaToken) {
    return { status: 400, json: { error: 'Please complete the captcha.' } };
  }

  // 1) Verify the hCaptcha token.
  const verifyRes = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: hcaptchaSecret, response: hcaptchaToken }),
  });
  const verify = await verifyRes.json().catch(() => ({ success: false }));
  if (!verify.success) {
    return { status: 400, json: { error: 'Captcha verification failed. Please try again.' } };
  }

  // 2) Forward to Zoho with the exact field names from the form export.
  const zohoBody = new URLSearchParams({
    Name_First: firstName,
    Name_Last: lastName,
    Email: email,
    PhoneNumber_countrycode: phone,
    PhoneNumber_countrycodeval: phone ? countryCode : '',
    MultiLine: message,
    zf_referrer_name: cleanReferrer(referrer),
    zf_redirect_url: '',
    zc_gad: '',
  });

  const zohoRes = await fetch(zohoAction, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: zohoBody,
  });

  if (!zohoRes.ok) {
    return { status: 502, json: { error: 'Could not submit the form. Please try again or call us.' } };
  }

  return { status: 200, json: { ok: true } };
}
