import React from 'react';
import { Link } from 'react-router-dom';
import { serializeJsonForHtmlScript } from '../../../../utils/security';
import './HeadPain.css';

type Syndrome = {
  id: string;
  label: string;
  description: string;
};

const syndromes: Syndrome[] = [
  {
    id: 'cluster',
    label: 'Cluster Headache',
    description:
      'Severe unilateral headaches occurring in clusters, often around one eye, typically lasting from 15 minutes to 3 hours and repeating over days or weeks.',
  },
  {
    id: 'tension',
    label: 'Tension Headache',
    description:
      'A common type of head pain described as a tight band around the head, often related to muscle tension, stress or posture, and usually mild to moderate in intensity.',
  },
  {
    id: 'paroxysmal-hemicrania',
    label: 'Paroxysmal Hemicrania',
    description:
      'Short, frequent attacks of severe one-sided head pain, often accompanied by eye watering or nasal congestion and highly responsive to specific medication such as indomethacin.',
  },
  {
    id: 'suna',
    label: 'Short-lasting unilateral neuralgiform headache attacks',
    description:
      'Very brief but intense unilateral head pain attacks with autonomic symptoms, occurring many times per day and requiring careful diagnosis and tailored treatment.',
  },
];

const HeadPainPage: React.FC = () => {
  const [activeSyndromeId, setActiveSyndromeId] = React.useState<string | null>('tension');
  const structuredDataJson = React.useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'MedicalWebPage',
            url: typeof window !== 'undefined' ? window.location.href : 'https://www.algarvepaincentre.com/',
            name: 'Head pain',
            description:
              'Specialist assessment and treatment for head pain at Algarve Pain Centre in Vale do Lobo, Algarve, Portugal.',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Algarve Pain Centre',
              url: 'https://www.algarvepaincentre.com/',
            },
            publisher: {
              '@type': 'MedicalOrganization',
              name: 'Algarve Pain Centre',
            },
          },
          {
            '@type': 'MedicalCondition',
            name: 'Head pain',
            description:
              'Specialist assessment and treatment for head pain at Algarve Pain Centre in Vale do Lobo, Algarve, Portugal.',
            recognizingAuthority: {
              '@type': 'MedicalOrganization',
              name: 'Algarve Pain Centre',
            },
          },
          {
            '@type': 'MedicalTherapy',
            name: 'Headache syndrome assessment',
            description:
              'Clinical evaluation to identify the most likely headache syndrome and match it to an evidence-based treatment pathway.',
            offeredBy: {
              '@type': 'MedicalOrganization',
              name: 'Algarve Pain Centre',
            },
          },
        ],
      }),
    [],
  );

  React.useEffect(() => {
    document.title = 'Head pain | Algarve Pain Centre';
    const description =
      'Treatments for head pain, including common headache syndromes and specialist pathways at Algarve Pain Centre in Vale do Lobo, Algarve.';
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'description');
        document.head.appendChild(el);
        return el;
      })();
    meta.setAttribute('content', description);
  }, []);

  return (
    <div className="head-pain-page">
      <header className="head-pain-hero">
        <div className="head-pain-hero-backdrop" aria-hidden="true" />
        <div className="head-pain-hero-inner">
          <p className="head-pain-hero-eyebrow">Pain medicine speciality</p>
          <h1 className="head-pain-hero-title">Head pain</h1>
          <p className="head-pain-hero-subtitle">
            Specialist assessment and treatment pathways for headache syndromes—personalised care that
            helps you find relief and return to daily life with confidence.
          </p>
          <div className="head-pain-hero-actions">
            <Link to="/contact" className="treatment-card-button" aria-label="Book an appointment for head pain">
              <span>Book an appointment</span>
            </Link>
            <a href="#head-pain-treatments" className="outline-btn" aria-label="Explore treatments for head pain">
              Explore treatments
            </a>
          </div>
        </div>
      </header>
      <main className="page-main head-pain-main">

        <section id="head-pain-treatments" className="page-section treatments-overview">
          <div className="treatments-overview-header">
            <h2 className="treatments-overview-title">Treatments for head pain</h2>
            <p className="treatments-overview-subtitle">
              At Algarve Pain Centre, we offer a comprehensive range of treatments for head pain. Our
              team of experienced pain medicine specialists is dedicated to providing personalised care
              and effective solutions to help you find relief and improve your quality of life.
            </p>
          </div>
          <div className="treatments-overview-layout">
            <article className="treatments-overview-card">
              <h3 className="treatments-overview-card-title">Head pain overview</h3>
              <div className="treatments-overview-card-accent" />
              <p className="treatments-overview-card-body">
                Head pain is a common health problem with a global prevalence of 47% (symptoms occurring
                at least once in the past year), and women are disproportionately affected (3:1). Many
                factors, like stress, anxiety, injury and migraine can lead to head pain. Estimated
                prevalence for tension-type headache is 35%, for migraine is 38%, but for cluster headache
                is only 0.15%.
              </p>
              <Link
                to="/contact"
                className="treatment-card-button"
                aria-label="Book an appointment for head pain"
              >
                <span>Book an appointment</span>
              </Link>
            </article>
            <div className="treatments-overview-media" aria-hidden="true">
              <div className="treatments-overview-media-inner">
                <video
                  className="treatments-overview-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  src="/assets/videos/post-43.mp4"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="page-section head-pain-treatment head-pain-approaches">
          <div className="head-pain-approaches-inner">
            <header className="head-pain-approaches-header">
              <h2 className="head-pain-approaches-title">Treatment approaches</h2>
              <p className="head-pain-approaches-subtitle">
                We have a team of experienced pain medicine specialists who are committed to providing
                personalised care and effective treatments for head pain.
              </p>
            </header>
            <div className="head-pain-approaches-grid">
              <article className="head-pain-approach-card">
                <div
                  className="head-pain-approach-media head-pain-approach-media-botulin"
                  aria-hidden="true"
                />
                <div className="head-pain-approach-card-body">
                  <h3 className="head-pain-approach-card-title">
                    Botulin <span>toxin injection</span>
                  </h3>
                  <div className="head-pain-approach-card-accent" />
                  <p className="head-pain-approach-card-text">
                    A potent neurotoxin that inhibits release of acetylcholine at the neuromuscular
                    junction and can be used to treat specific forms of head pain.
                  </p>
                </div>
              </article>
              <article className="head-pain-approach-card">
                <div
                  className="head-pain-approach-media head-pain-approach-media-pharma"
                  aria-hidden="true"
                />
                <div className="head-pain-approach-card-body">
                  <h3 className="head-pain-approach-card-title">
                    Pharmacological <span>management</span>
                  </h3>
                  <div className="head-pain-approach-card-accent" />
                  <p className="head-pain-approach-card-text">
                    Pharmacological management of pain is commonly part of treatment and a wide range of
                    drugs can be used to manage symptoms safely and effectively.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section head-pain-treatment head-pain-syndromes">
          <div className="head-pain-syndromes-layout">
            <header className="head-pain-syndromes-header head-pain-syndromes-header-center">
              <p className="head-pain-syndromes-eyebrow">Most common syndromes</p>
              <h2 className="head-pain-syndromes-title">Treatments for head pain</h2>
              <p className="head-pain-syndromes-subtitle">
                Explore common head pain syndromes and learn how tailored care can help you feel better.
              </p>
            </header>
            <div className="head-pain-syndromes-card" role="list">
              {syndromes.map((syndrome) => {
                const isActive = activeSyndromeId === syndrome.id;
                return (
                  <div
                    key={syndrome.id}
                    className="head-pain-syndrome-item"
                    role="listitem"
                    aria-expanded={isActive}
                  >
                    <button
                      type="button"
                      className={`head-pain-syndrome-row ${
                        isActive ? 'head-pain-syndrome-row-active' : ''
                      }`}
                      aria-expanded={isActive}
                      aria-controls={`head-pain-syndrome-panel-${syndrome.id}`}
                      onClick={() =>
                        setActiveSyndromeId((current) =>
                          current === syndrome.id ? null : syndrome.id,
                        )
                      }
                    >
                      <span className="head-pain-syndrome-label">{syndrome.label}</span>
                      <span
                        className={`head-pain-syndrome-icon ${
                          isActive ? 'head-pain-syndrome-icon-active' : ''
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    <div
                      id={`head-pain-syndrome-panel-${syndrome.id}`}
                      className={`head-pain-syndrome-panel ${
                        isActive ? 'head-pain-syndrome-panel-open' : ''
                      }`}
                      role="region"
                      aria-hidden={!isActive}
                    >
                      <p className="head-pain-syndrome-panel-text">{syndrome.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section head-pain-treatment head-pain-testimonials">
          <header className="head-pain-testimonials-header">
            <h2 className="head-pain-testimonials-title">Testimonials</h2>
            <span className="head-pain-testimonials-underline" aria-hidden="true" />
          </header>
          <div className="head-pain-testimonials-grid">
            <blockquote className="head-pain-testimonial">
              <span className="head-pain-testimonial-quote" aria-hidden="true">
                ”
              </span>
              <p className="head-pain-testimonial-text">
                Indeed we have been greatly satisfied with your team and professional support over the
                past months. Great satisfaction with your team including the new facilities in the
                Centre.
              </p>
              <footer className="head-pain-testimonial-meta">
                <cite className="head-pain-testimonial-author">Jean‑François Cristau</cite>
                <span className="head-pain-testimonial-location">France</span>
              </footer>
            </blockquote>

            <blockquote className="head-pain-testimonial">
              <span className="head-pain-testimonial-quote" aria-hidden="true">
                ”
              </span>
              <p className="head-pain-testimonial-text">
                After the treatment I am only happy to say how I really feel. With some stretch exercises
                and physiotherapy, I feel great and get on with my life. Thanking you.
              </p>
              <footer className="head-pain-testimonial-meta">
                <cite className="head-pain-testimonial-author">Carole Lee</cite>
                <span className="head-pain-testimonial-location">The Netherlands</span>
              </footer>
            </blockquote>
          </div>
        </section>

        <section className="page-section head-pain-treatment head-pain-contact">
          <div className="contact-visit-layout head-pain-contact-layout">
            <div className="head-pain-contact-form-column">
              <h2 className="contact-form-title">Talk to our head pain team</h2>
              <p className="contact-form-subtitle">
                Share your symptoms and questions, and we will help you understand the cause and plan the
                next step in your care.
              </p>
              <form
                className="contact-form"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="headpain-contact-first-name">
                    Name
                  </label>
                  <div className="contact-form-name-row">
                    <input
                      id="headpain-contact-first-name"
                      type="text"
                      className="contact-input"
                      placeholder="First Name"
                    />
                    <input
                      id="headpain-contact-last-name"
                      type="text"
                      className="contact-input"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="headpain-contact-email">
                    Email <span className="contact-label-required">*</span>
                  </label>
                  <input
                    id="headpain-contact-email"
                    type="email"
                    className="contact-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="headpain-contact-phone">
                    Phone
                  </label>
                  <div className="contact-form-phone-row">
                    <span className="contact-phone-flag" aria-hidden="true">
                      🇵🇹
                    </span>
                    <input
                      id="headpain-contact-phone"
                      type="tel"
                      className="contact-input"
                      placeholder="+351 000 000 000"
                    />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="headpain-contact-message">
                    Message <span className="contact-label-required">*</span>
                  </label>
                  <textarea
                    id="headpain-contact-message"
                    className="contact-textarea"
                    placeholder="Tell us more about your head pain, symptoms or questions..."
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(structuredDataJson) }}
        />
      </main>
    
    </div>
  );
};

export default HeadPainPage;
