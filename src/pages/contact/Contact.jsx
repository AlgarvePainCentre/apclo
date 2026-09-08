import { useEffect, useRef, useState } from 'react';
// The contact page reuses the shared .psx-* layout classes, so it must load
// their styles (max-width, gutters, cards). Without this the containers have
// no width constraint or padding on a direct visit -> content sits flush to
// the viewport edges. Imported before the page's own CSS so contact-specific
// rules still win.
import '../../pages/specialities/PainSpecialtyClone.css';
import '../../styles/pages/contact-page.css';
import ManagedEmbed from '../../components/ManagedEmbed';

export default function Contact() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const mapUrl =
    'https://www.google.com/maps?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil&z=16&output=embed';

  // Contact form submission (custom form -> /api/contact -> Zoho, with hCaptcha).
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  // Public site key; hCaptcha's always-pass TEST key by default so previews work.
  const hcaptchaSiteKey =
    import.meta.env.VITE_HCAPTCHA_SITEKEY || '10000000-ffff-ffff-ffff-000000000001';

  useEffect(() => {
    if (document.querySelector('script[src*="js.hcaptcha.com/1/api.js"]')) return undefined;
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return undefined;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    const form = event.currentTarget;
    const fd = new FormData(form);
    const token = window.hcaptcha ? window.hcaptcha.getResponse() : '';
    if (!token) {
      setStatus('error');
      setErrorMsg('Please confirm you are human.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: fd.get('firstName') || '',
          lastName: fd.get('lastName') || '',
          email: fd.get('email') || '',
          phone: fd.get('phone') || '',
          countryCode: '+351',
          message: fd.get('message') || '',
          company: fd.get('company') || '',
          hcaptchaToken: token,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('success');
        form.reset();
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Could not send your message. Please try again or call us.');
        if (window.hcaptcha) window.hcaptcha.reset();
      }
    } catch {
      setStatus('error');
      setErrorMsg('Could not send your message. Please try again or call us.');
    }
  };

  useEffect(() => {
    const heroEl = heroRef.current;
    const heroVideoEl = heroVideoRef.current;
    if (!heroEl || !heroVideoEl) return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;
    try {
      const maybePromise = heroVideoEl.play();
      if (maybePromise && typeof maybePromise.then === 'function') {
        maybePromise.catch(() => {});
      }
    } catch {}
    return undefined;
  }, []);

  useEffect(() => {
    try {
      const layout = document.querySelector('.contact-two-col');
      if (!layout) {
        console.warn('[Contact] contact-two-col container not found');
        return;
      }

      const media = layout.querySelector('.contact-help-video');
      if (media) {
        media.remove();
        console.info('[Contact] Removed contact help media container');
      } else {
        console.warn('[Contact] contact-help-video container not found');
      }

      const primaryCard = layout.querySelector('article.psx-card');
      if (primaryCard) {
        primaryCard.style.width = '100%';
        primaryCard.style.maxWidth = '100%';
        console.info('[Contact] Expanded primary card to full width');
      } else {
        console.warn('[Contact] Primary card element not found');
      }

      const secondaryMedia = document.querySelector('.contact-help-video-2');
      if (secondaryMedia) {
        secondaryMedia.remove();
        console.info('[Contact] Removed secondary contact help media container');
      }
    } catch (err) {
      console.warn('[Contact] Failed to update contact layout', err);
    }
  }, []);

  useEffect(() => {
    const titleText = 'Contact Algarve Pain Centre | Book a pain clinic appointment in the Algarve';
    const descriptionText =
      'Contact Algarve Pain Centre in Vale do Lobo, Algarve to discuss your pain symptoms, request an assessment or plan treatment. Call, message or use our contact form to reach our multidisciplinary pain clinic.';

    document.title = titleText;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = descriptionText;
  }, []);

  return (
    <div
      className="psx-page"
      id="psx-contact"
      style={{
        '--psx-hero-image': "url('/assets/images/learn/1-banner-2.webp')",
      }}
    >
      <header className="psx-hero" ref={heroRef}>
        <div className="psx-hero-backdrop video-bg" aria-hidden="true">
          <video
            className="psx-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/illustrative/services-home-min-1.webp"
          >
            <source src="/assets/videos/banner-Contact-us.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
            <source src="/assets/videos/banner-Contact-us.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
            <source src="/assets/videos/banner-Contact-us.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Contact</p>
          <h1 className="psx-hero-title">Contact Us</h1>
          <p className="psx-hero-subtitle">
            Get in touch to discuss symptoms, ask questions and plan your next step in care.
          </p>
          <div className="psx-hero-actions">
            <a href="#contact-form" className="psx-btn-primary" aria-label="Skip to contact form">
              <span>Contact form</span>
            </a>
            <a href="#contact-visit" className="psx-btn-outline" aria-label="See call or visit details">
              Visit details
            </a>
          </div>
        </div>

      </header>
      <main className="psx-main">

        <section className="psx-section">
          <div className="psx-treatments-layout contact-two-col">
            <article className="psx-card">
              <h2 className="psx-card-title">How can we help you today?</h2>
              <div className="psx-accent" />
              <div className="contact-questions-grid">
                <article className="contact-question-card">
                  <h3 className="contact-question-title">Can you tell us about your pain?</h3>
                  <div className="contact-question-accent" />
                  <p className="contact-question-body">Describe your pain, and we&apos;ll work together to find relief.</p>
                </article>
                <article className="contact-question-card">
                  <h3 className="contact-question-title">Not sure what treatment to get?</h3>
                  <div className="contact-question-accent" />
                  <p className="contact-question-body">
                    Share your concerns, and we&apos;ll guide you toward the best treatment tailored to your needs.
                  </p>
                </article>
                <article className="contact-question-card">
                  <h3 className="contact-question-title">Not sure what is your condition?</h3>
                  <div className="contact-question-accent" />
                  <p className="contact-question-body">
                    Tell us how you feel your pain, our team will help you understand and improve your condition.
                  </p>
                </article>
                <article className="contact-question-card">
                  <h3 className="contact-question-title">Have you been diagnosed?</h3>
                  <div className="contact-question-accent" />
                  <p className="contact-question-body">
                    Tell us what you know and together we will reach a suitable approach and treatment for your case.
                  </p>
                </article>
              </div>
            </article>
            <div className="contact-help-video" aria-hidden="true">
              <img
                className="contact-help-video-el"
                src="/assets/images/illustrative/services-home-min-1.webp"
                alt=""
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section id="contact-form" className="psx-section">
          <div className="psx-treatments-layout contact-form-two-col">
            <article className="psx-card">
              <h2 className="psx-card-title">Contact form</h2>
              <div className="psx-accent" />
              <p className="psx-body">
                Share the details of your discomfort, and we&apos;ll help you understand the cause and find a solution.
              </p>
              {status === 'success' ? (
                <div className="contact-form-success" role="status">
                  <h3 className="contact-form-success-title">Message sent</h3>
                  <p>
                    Thank you — we&apos;ve received your message and will get back to you shortly.
                    For anything urgent, call us on <a href="tel:+351915915001">+351&nbsp;915&nbsp;915&nbsp;001</a>.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-first-name">
                      Name
                    </label>
                    <div className="contact-form-name-row">
                      <input id="contact-first-name" name="firstName" type="text" className="contact-input" placeholder="First Name" aria-label="First name" />
                      <input id="contact-last-name" name="lastName" type="text" className="contact-input" placeholder="Last Name" aria-label="Last name" />
                    </div>
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-email">
                      Email <span className="contact-label-required">*</span>
                    </label>
                    <input id="contact-email" name="email" type="email" className="contact-input" placeholder="you@example.com" required />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-phone">
                      Phone
                    </label>
                    <div className="contact-form-phone-row">
                      <span className="contact-phone-flag" aria-hidden="true">🇵🇹</span>
                      <input id="contact-phone" name="phone" type="tel" className="contact-input" placeholder="+351 000 000 000" />
                    </div>
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-message">
                      Message <span className="contact-label-required">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact-textarea"
                      placeholder="Tell us more about your pain, symptoms or questions..."
                      rows={4}
                      required
                    />
                  </div>
                  {/* Honeypot: off-screen, ignored by humans, catches bots. */}
                  <div className="contact-form-honeypot" aria-hidden="true">
                    <label htmlFor="contact-company">Company</label>
                    <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="h-captcha" data-sitekey={hcaptchaSiteKey} />
                  {status === 'error' && errorMsg ? (
                    <p className="contact-form-error" role="alert">{errorMsg}</p>
                  ) : null}
                  <div className="contact-form-actions">
                    <button type="submit" className="contact-form-submit psx-btn-primary" disabled={status === 'submitting'}>
                      <span>{status === 'submitting' ? 'Sending…' : 'Submit'}</span>
                    </button>
                  </div>
                </form>
              )}
            </article>
            <figure className="contact-form-media">
              <img
                className="contact-form-media-img"
                src="/assets/images/illustrative/pain-medicine-algarve-min.webp"
                alt="Algarve Pain Centre clinical setting in Vale do Lobo, Algarve"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>
        <section className="home-section-location" aria-labelledby="contact-location-title">
          <div className="home-section-location-inner">
            <header className="location-header">
              <h2 className="location-title" id="contact-location-title">Our Location</h2>
              <div className="location-title-rule" aria-hidden="true" />
            </header>
            <div className="location-grid location-grid--map-only">
              <div className="location-map" aria-label="Map">
                <ManagedEmbed
                  className="location-map-iframe"
                  title="Business location map"
                  type="map"
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  openHref="https://maps.google.com/?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
