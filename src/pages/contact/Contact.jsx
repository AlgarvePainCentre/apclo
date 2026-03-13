import { useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Contact.css';

export default function Contact() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const heroVideoEl = heroVideoRef.current;
    if (!heroEl || !heroVideoEl) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (prefersReducedMotion || isMobile) {
      return undefined;
    }

    let ticking = false;

    const updateParallax = () => {
      const viewportHeight = window.innerHeight || 1;
      const heroRect = heroEl.getBoundingClientRect();
      const heroProgress = Math.min(Math.max(heroRect.top / viewportHeight, -1), 1);
      const heroOffset = heroProgress * -110;
      heroVideoEl.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      heroVideoEl.style.transform = '';
    };
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
    <div className="page">
      <Navbar />
      <section className="hero" ref={heroRef}>
        <div className="hero-video" aria-hidden="true" ref={heroVideoRef}>
          <video
            className="hero-video-el"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/assets/videos/Appointment-Video.mp4"
          />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">Contact Us</h1>
            <p className="hero-subtitle">
              Get in touch with our team to discuss your symptoms, ask questions and plan your next step in care.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">We are here to listen.</p>
          </div>
        </div>
      </section>
      <main className="page-main">
        <section className="page-section">
          <h2>How can we help you today?</h2>
          <div className="contact-questions-grid">
            <article className="contact-question-card">
              <h3 className="contact-question-title">Can you tell us about your pain?</h3>
              <div className="contact-question-accent" />
              <p className="contact-question-body">
                Describe your pain, and we&apos;ll work together to find relief.
              </p>
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
        </section>
        <section className="page-section">
          <div className="contact-form-layout">
            <div className="contact-form-copy">
              <h2 className="contact-form-title">Contact Us!</h2>
              <p className="contact-form-subtitle">
                Share the details of your discomfort, and we&apos;ll help you understand the cause and find a solution.
              </p>
            </div>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-first-name">
                  Name
                </label>
                <div className="contact-form-name-row">
                  <input
                    id="contact-first-name"
                    type="text"
                    className="contact-input"
                    placeholder="First Name"
                  />
                  <input
                    id="contact-last-name"
                    type="text"
                    className="contact-input"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-email">
                  Email <span className="contact-label-required">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-phone">
                  Phone
                </label>
                <div className="contact-form-phone-row">
                  <span className="contact-phone-flag" aria-hidden="true">
                    🇵🇹
                  </span>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="contact-input"
                    placeholder="+351 000 000 000"
                  />
                </div>
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-message">
                  Message <span className="contact-label-required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  className="contact-textarea"
                  placeholder="Tell us more about your pain, symptoms or questions..."
                  rows={4}
                  required
                />
              </div>
              <div className="contact-form-footer-row">
                <label className="contact-form-human">
                  <input type="checkbox" className="contact-human-checkbox" />
                  <span>I am human</span>
                </label>
                <div className="contact-form-captcha-placeholder" aria-hidden="true">
                  <span>reCAPTCHA</span>
                </div>
              </div>
              <div className="contact-form-actions">
                <button type="submit" className="contact-form-submit treatment-card-button">
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="page-section">
          <div className="contact-visit-layout">
            <div className="contact-visit-copy">
              <h2 className="contact-visit-title">Prefer to call or visit us?</h2>
              <p className="contact-visit-subtitle">
                Tell us what you know and together we will reach a suitable approach and treatment for your case.
              </p>
              <div className="contact-visit-details">
                <div>
                  <p className="contact-visit-label">Call us:</p>
                  <a href="tel:+351915915001" className="contact-visit-link">
                    +351 915 915 001
                  </a>
                </div>
                <div>
                  <p className="contact-visit-label">Text us:</p>
                  <a
                    href="https://wa.me/351915915001"
                    className="contact-visit-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
                <div>
                  <p className="contact-visit-label">E-mail:</p>
                  <a href="mailto:info@algarvepaincentre.com" className="contact-visit-link">
                    info@algarvepaincentre.com
                  </a>
                </div>
                <div>
                  <p className="contact-visit-label">Address:</p>
                  <a
                    href="https://maps.google.com/?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve"
                    className="contact-visit-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Av. do Mar, Vale do Lobo, Algarve
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-visit-map">
              <iframe
                title="Algarve Pain Centre location"
                src="https://www.google.com/maps?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
