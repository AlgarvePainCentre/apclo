// Vercel serverless function: verifies the hCaptcha token server-side, then
// forwards the contact submission to Zoho Forms (server-to-server, so no CORS
// and the captcha can't be bypassed by posting straight to Zoho).
//
// Env vars (set in Vercel project settings for production):
//   HCAPTCHA_SECRET     hCaptcha secret key (defaults to the always-pass TEST
//                       secret so previews work before real keys are added)
//   ZOHO_FORM_ACTION    Zoho form submit URL (falls back to the known one)

const ZOHO_ACTION =
  process.env.ZOHO_FORM_ACTION ||
  'https://forms.zohopublic.eu/paincentremktgm1/form/1APCContactUs/formperma/VO5_fDW9RtmBVwQ0SjvkM6Pk12IGM2-G-ejswgMV6sY/htmlRecords/submit';

// hCaptcha's documented test secret — verifies any token. Replace via env.
const HCAPTCHA_SECRET =
  process.env.HCAPTCHA_SECRET || '0x0000000000000000000000000000000000000000';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      countryCode = '+351',
      message = '',
      hcaptchaToken = '',
      company = '', // honeypot
    } = body;

    // Honeypot: humans never fill this. Pretend success, drop silently.
    if (company) return res.status(200).json({ ok: true });

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required.' });
    }
    if (!hcaptchaToken) {
      return res.status(400).json({ error: 'Please complete the captcha.' });
    }

    // 1) Verify the hCaptcha token.
    const verifyRes = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: HCAPTCHA_SECRET, response: hcaptchaToken }),
    });
    const verify = await verifyRes.json().catch(() => ({ success: false }));
    if (!verify.success) {
      return res.status(400).json({ error: 'Captcha verification failed. Please try again.' });
    }

    // 2) Forward to Zoho with the exact field names from the form export.
    const zohoBody = new URLSearchParams({
      Name_First: firstName,
      Name_Last: lastName,
      Email: email,
      PhoneNumber_countrycode: phone,
      PhoneNumber_countrycodeval: phone ? countryCode : '',
      MultiLine: message,
      zf_referrer_name: '',
      zf_redirect_url: '',
      zc_gad: '',
    });

    const zohoRes = await fetch(ZOHO_ACTION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: zohoBody,
    });

    if (!zohoRes.ok) {
      return res
        .status(502)
        .json({ error: 'Could not submit the form. Please try again or call us.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Something went wrong. Please try again or call us.' });
  }
}
