// Cloudflare Worker entry. Static assets (the prerendered site) are served by
// the assets binding; only /api/* reaches this code (see run_worker_first in
// wrangler.jsonc).
//
// Secrets (Cloudflare dashboard → Worker → Settings → Variables and Secrets):
//   HCAPTCHA_SECRET     hCaptcha secret key (defaults to the always-pass TEST secret)
//   ZOHO_FORM_ACTION    Zoho form submit URL (falls back to the known one)

import { processContact } from '../api/_contact-core.js';

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return json(405, { error: 'Method not allowed' }, { Allow: 'POST' });
      }
      try {
        const body = await request.json().catch(() => ({}));
        const { status, json: payload } = await processContact(body, {
          hcaptchaSecret: env.HCAPTCHA_SECRET,
          zohoAction: env.ZOHO_FORM_ACTION,
        });
        return json(status, payload);
      } catch {
        return json(500, { error: 'Something went wrong. Please try again or call us.' });
      }
    }

    if (pathname.startsWith('/api/')) {
      return json(404, { error: 'Not found' });
    }

    return env.ASSETS.fetch(request);
  },
};
