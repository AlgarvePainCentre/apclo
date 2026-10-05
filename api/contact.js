// Vercel serverless function for the contact form. The logic lives in
// _contact-core.js, shared with the Cloudflare Worker (worker/index.js).
//
// Env vars (set in the Vercel project settings for production):
//   HCAPTCHA_SECRET     hCaptcha secret key (defaults to the always-pass TEST
//                       secret so previews work before real keys are added)
//   ZOHO_FORM_ACTION    Zoho form submit URL (falls back to the known one)

import { processContact } from './_contact-core.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const { status, json } = await processContact(body, {
      hcaptchaSecret: process.env.HCAPTCHA_SECRET,
      zohoAction: process.env.ZOHO_FORM_ACTION,
    });
    return res.status(status).json(json);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Something went wrong. Please try again or call us.' });
  }
}
