import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { serializeJsonForHtmlScript } from '../../utils/security';

type Syndrome = {
  id: string;
  label: string;
  description: string;
};

type ConditionDetailPageProps = {
  title: string;
  areaLabel: string;
  mainClassName?: string;
  variant?: 'default' | 'pain-specialty-clone';
  heroSubtitle?: string;
  heroEyebrow?: string;
};

const DEFAULT_SYNDROMES: Syndrome[] = [
  {
    id: 'acute',
    label: 'Acute episodes',
    description:
      'Short-lasting episodes of more intense pain, often triggered by a specific movement or activity and easing with rest.',
  },
  {
    id: 'persistent',
    label: 'Persistent pain',
    description:
      'Ongoing discomfort lasting for months, which may fluctuate in intensity and be influenced by workload, stress and sleep.',
  },
  {
    id: 'neuropathic',
    label: 'Neuropathic features',
    description:
      'Burning, tingling or electric-shock sensations suggesting nerve involvement and sometimes associated with numbness or weakness.',
  },
  {
    id: 'mixed',
    label: 'Mixed pattern',
    description:
      'A combination of mechanical and neuropathic characteristics, where careful assessment helps prioritise the most effective treatments.',
  },
];

const ConditionDetailPage: React.FC<ConditionDetailPageProps> = ({
  title,
  areaLabel,
  mainClassName,
  variant = 'default',
  heroSubtitle,
  heroEyebrow,
}) => {
  const [activeSyndromeId, setActiveSyndromeId] = React.useState<string | null>(
    DEFAULT_SYNDROMES[0]?.id ?? null,
  );
  const location = useLocation();
  const slugBase = React.useMemo(
    () =>
      title
        .toLowerCase()
        .trim()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    [title],
  );
  const treatmentsSectionId = `${slugBase}-treatments`;
  const contactIdPrefix = `${slugBase}-contact`;

  const canonicalUrl = React.useMemo(() => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin || 'https://www.algarvepaincentre.com';
    return `${origin}${location.pathname}`;
  }, [location.pathname]);

  const structuredDataJson = React.useMemo(() => {
    const organization = {
      '@type': 'MedicalOrganization',
      name: 'Algarve Pain Centre',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. do Mar',
        addressLocality: 'Vale do Lobo',
        addressRegion: 'Algarve',
        addressCountry: 'PT',
      },
    };

    const pageId = canonicalUrl ? `${canonicalUrl}#webpage` : 'https://www.algarvepaincentre.com/#webpage';
    const conditionId = canonicalUrl ? `${canonicalUrl}#condition` : 'https://www.algarvepaincentre.com/#condition';

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': pageId,
          url: canonicalUrl || 'https://www.algarvepaincentre.com/',
          name: title,
          description: `Specialist assessment and treatment for ${areaLabel} at Algarve Pain Centre in Vale do Lobo, Algarve, Portugal.`,
          about: { '@id': conditionId },
          isPartOf: {
            '@type': 'WebSite',
            name: 'Algarve Pain Centre',
            url: 'https://www.algarvepaincentre.com/',
          },
          publisher: organization,
        },
        {
          '@type': 'MedicalCondition',
          '@id': conditionId,
          name: title,
          description: `Specialist assessment and treatment for ${areaLabel} at Algarve Pain Centre in Vale do Lobo, Algarve, Portugal.`,
          url: canonicalUrl || 'https://www.algarvepaincentre.com/',
          study: {
            '@type': 'MedicalStudy',
            name: 'Comprehensive pain management programme',
          },
          guideline: {
            '@type': 'MedicalGuideline',
            evidenceLevel: 'Evidence-based clinical practice',
          },
          recognizingAuthority: organization,
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Image-guided interventions',
          description:
            'Minimally invasive, image-guided procedures such as nerve blocks, radiofrequency ablation and joint or spine injections when clinically appropriate.',
          offeredBy: organization,
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Rehabilitation and physiotherapy',
          description:
            'Structured rehabilitation programmes including physiotherapy, guided exercise and functional training to restore confidence in movement and daily activities.',
          offeredBy: organization,
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Medication optimisation',
          description:
            'Stepwise, time-limited medication plans where needed, balancing symptom relief with safety and long-term goals.',
          offeredBy: organization,
        },
      ],
    });
  }, [areaLabel, canonicalUrl, title]);

  React.useEffect(() => {
    const pageTitle = `${title} | Algarve Pain Centre`;
    document.title = pageTitle;

    const description = `Specialist assessment and treatment for ${areaLabel} at Algarve Pain Centre, a multidisciplinary pain clinic in Vale do Lobo, Algarve, Portugal. Discover how our team combines minimally invasive procedures, rehabilitation and medication to relieve pain, restore movement and improve your quality of life.`;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, areaLabel]);

  if (variant === 'pain-specialty-clone') {
    return (
      <div className="psx-page" id={`psx-${slugBase}`}>
        <header className="psx-hero">
          <div className="psx-hero-backdrop" aria-hidden="true" />
          <div className="psx-hero-inner">
            <p className="psx-hero-eyebrow">{heroEyebrow ?? 'Speciality'}</p>
            <h1 className="psx-hero-title">{title}</h1>
            <p className="psx-hero-subtitle">
              {heroSubtitle ??
                `Specialist assessment and treatment pathways for ${areaLabel}—personalised care that helps you find relief and return to daily life with confidence.`}
            </p>
            <div className="psx-hero-actions">
              <Link to="/contact" className="psx-btn-primary" aria-label={`Book an appointment for ${areaLabel}`}>
                <span>Book an appointment</span>
              </Link>
              <a
                href={`#${treatmentsSectionId}`}
                className="psx-btn-outline"
                aria-label={`Explore treatments for ${areaLabel}`}
              >
                Explore treatments
              </a>
            </div>
          </div>
        </header>
        <main className={mainClassName ? `psx-main ${mainClassName}` : 'psx-main'}>
          <section id={treatmentsSectionId} className="psx-section psx-treatments">
            <div className="psx-lead">
              <h2 className="psx-lead-title">Treatments for {areaLabel}</h2>
              <p className="psx-lead-subtitle">
                At Algarve Pain Centre in Vale do Lobo, Algarve, we offer a comprehensive range of
                evidence-based treatments for {areaLabel}. Our multidisciplinary team of pain medicine
                physicians, spine surgeons, rehabilitation specialists and psychologists works together
                so that your plan is built from multiple expert perspectives, not just one.
              </p>
              <p className="psx-lead-subtitle">
                Whether your pain is recent or long‑standing, we focus on understanding how it affects
                your daily life and long‑term goals. This helps us decide when simple measures are
                enough and when more advanced interventions are needed.
              </p>
            </div>
            <div className="psx-treatments-layout">
              <article className="psx-card">
                <h3 className="psx-card-title">{title} overview</h3>
                <div className="psx-accent" />
                <p className="psx-body">
                  Pain in this area can have many causes, including joint, muscle, nerve and postural
                  factors. During your first consultation we explore how your symptoms started, how they
                  have evolved over time and which movements or activities make them better or worse.
                  Understanding this pattern allows us to reach an accurate diagnosis and design a
                  treatment plan that combines the most appropriate interventions for you.
                </p>
                <p className="psx-body">
                  We also look carefully at your medical history, lifestyle and previous treatments. Some
                  people come to us after years of trying isolated approaches without a clear plan. Others
                  seek support early, when symptoms are starting to interfere with work, sport or sleep.
                </p>
                <p className="psx-body">
                  Common goals include reducing flare‑ups, improving confidence in movement and protecting
                  long‑term joint and spine health. Many people benefit from a combination of these
                  elements over time.
                </p>
                <Link to="/contact" className="psx-btn-primary" aria-label={`Book an appointment for ${areaLabel}`}>
                  <span>Book an appointment</span>
                </Link>
              </article>
              <div className="psx-media" aria-hidden="true">
                <div className="psx-media-inner">
                  <video
                    className="psx-video"
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

          <section className="psx-section psx-approaches">
            <div className="psx-approaches-panel">
              <header className="psx-approaches-header">
                <h2 className="psx-approaches-title">Treatment approaches</h2>
                <p className="psx-approaches-subtitle">
                  We combine minimally invasive procedures, rehabilitation and medication when needed to
                  create a thoughtful treatment pathway rather than a single isolated procedure.
                </p>
              </header>
              <div className="psx-approaches-grid">
                <article className="psx-approach">
                  <div className="psx-approach-media psx-approach-media-a" aria-hidden="true" />
                  <div className="psx-approach-body">
                    <h3 className="psx-approach-title">
                      Targeted <span>interventions</span>
                    </h3>
                    <div className="psx-accent" />
                    <p className="psx-approach-text">
                      Image‑guided procedures such as nerve blocks,{' '}
                      <Link to="/treatments/minimally-invasive-treatments/radiofrequency">
                        radiofrequency ablation
                      </Link>{' '}
                      or joint and spine injections can be used to reduce pain while preserving function
                      and supporting rehabilitation. These minimally invasive treatments are usually
                      performed as day‑case procedures in our clinic.
                    </p>
                    <p className="psx-approach-text">
                      For some conditions, surgical options such as{' '}
                      <Link to="/treatments/surgical-treatments/tubular-microsurgery">
                        tubular microsurgery
                      </Link>{' '}
                      or decompression may be considered. When this is the case, you will meet with a
                      spine surgeon to discuss risks, benefits and alternatives in detail.
                    </p>
                  </div>
                </article>
                <article className="psx-approach">
                  <div className="psx-approach-media psx-approach-media-b" aria-hidden="true" />
                  <div className="psx-approach-body">
                    <h3 className="psx-approach-title">
                      Pharmacological and <span>rehabilitation</span>
                    </h3>
                    <div className="psx-accent" />
                    <p className="psx-approach-text">
                      Medication, physiotherapy and lifestyle measures frequently work together, helping
                      you to move with more confidence and regain autonomy in daily activities. We favour
                      stepwise, time‑limited use of medicines where possible, always balancing symptom
                      relief with safety.
                    </p>
                    <p className="psx-approach-text">
                      Our rehabilitation team provides structured programmes that may include{' '}
                      <Link to="/treatments/non-invasive-treatments/physiotherapy">physiotherapy</Link>, guided
                      exercise and functional training. When emotional or behavioural factors play a role,
                      we can also involve{' '}
                      <Link to="/treatments/non-invasive-treatments/psychology">psychology</Link> or{' '}
                      <Link to="/treatments/non-invasive-treatments/nutrition">nutrition</Link> support so
                      that your plan addresses the whole person, not just the painful area.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="psx-section psx-patterns">
            <div className="psx-patterns-layout">
              <header className="psx-patterns-header">
                <p className="psx-patterns-eyebrow">Most common patterns</p>
                <h2 className="psx-patterns-title">How {areaLabel} can present</h2>
                <p className="psx-patterns-subtitle">
                  People experience pain in different ways. Exploring the pattern of your symptoms helps
                  us match you with the most appropriate investigation and treatment.
                </p>
              </header>
              <div className="psx-accordion" role="list">
                {DEFAULT_SYNDROMES.map((syndrome) => {
                  const isActive = activeSyndromeId === syndrome.id;
                  const rowId = `psx-accordion-${slugBase}-${syndrome.id}`;
                  const panelId = `psx-accordion-panel-${slugBase}-${syndrome.id}`;
                  return (
                    <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                      <button
                        id={rowId}
                        type="button"
                        className="psx-accordion-trigger"
                        aria-expanded={isActive}
                        aria-controls={panelId}
                        onClick={() =>
                          setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                        }
                      >
                        <span className="psx-accordion-label">{syndrome.label}</span>
                        <span className="psx-accordion-icon" aria-hidden="true">
                          +
                        </span>
                      </button>
                      <div
                        id={panelId}
                        className="psx-accordion-panel"
                        data-open={isActive ? 'true' : 'false'}
                        role="region"
                        aria-labelledby={rowId}
                        aria-hidden={!isActive}
                      >
                        <p className="psx-accordion-text">{syndrome.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="psx-section psx-testimonials">
            <header className="psx-testimonials-header">
              <h2 className="psx-testimonials-title">Testimonials</h2>
              <span className="psx-testimonials-underline" aria-hidden="true" />
            </header>
            <div className="psx-testimonials-grid">
              <blockquote className="psx-testimonial">
                <span className="psx-testimonial-quote" aria-hidden="true">
                  ”
                </span>
                <p className="psx-testimonial-text">
                  “From the first consultation I felt that my concerns were listened to and that there was
                  a clear plan for how to move forward.”
                </p>
                <footer className="psx-testimonial-meta">
                  <cite className="psx-testimonial-author">Jean‑François Cristau</cite>
                  <span className="psx-testimonial-location">France</span>
                </footer>
              </blockquote>
              <blockquote className="psx-testimonial">
                <span className="psx-testimonial-quote" aria-hidden="true">
                  ”
                </span>
                <p className="psx-testimonial-text">
                  “After treatment and guided exercises I can now get on with my life with much less pain
                  and more confidence.”
                </p>
                <footer className="psx-testimonial-meta">
                  <cite className="psx-testimonial-author">Carole Lee</cite>
                  <span className="psx-testimonial-location">The Netherlands</span>
                </footer>
              </blockquote>
            </div>
          </section>

          <section className="psx-section psx-contact">
            <div className="contact-visit-layout psx-contact-layout">
              <div className="psx-contact-form">
                <h2 className="contact-form-title">Talk to our team</h2>
                <p className="contact-form-subtitle">
                  Share your symptoms and questions, and we will help you understand the cause and plan
                  the next step in your care.
                </p>
                <form
                  className="contact-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor={`${contactIdPrefix}-first-name`}>
                      Name
                    </label>
                    <div className="contact-form-name-row">
                      <input
                        id={`${contactIdPrefix}-first-name`}
                        type="text"
                        className="contact-input"
                        placeholder="First Name"
                      />
                      <input
                        id={`${contactIdPrefix}-last-name`}
                        type="text"
                        className="contact-input"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor={`${contactIdPrefix}-email`}>
                      Email <span className="contact-label-required">*</span>
                    </label>
                    <input
                      id={`${contactIdPrefix}-email`}
                      type="email"
                      className="contact-input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor={`${contactIdPrefix}-phone`}>
                      Phone
                    </label>
                    <div className="contact-form-phone-row">
                      <span className="contact-phone-flag" aria-hidden="true">
                        🇵🇹
                      </span>
                      <input
                        id={`${contactIdPrefix}-phone`}
                        type="tel"
                        className="contact-input"
                        placeholder="+351 000 000 000"
                      />
                    </div>
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor={`${contactIdPrefix}-message`}>
                      Message <span className="contact-label-required">*</span>
                    </label>
                    <textarea
                      id={`${contactIdPrefix}-message`}
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
                    <button type="submit" className="contact-form-submit psx-btn-primary">
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
  }

  return (
    <main className={mainClassName ? `page-main condition-main ${mainClassName}` : 'page-main condition-main'}>
      <section className="page-section treatments-overview">
        <div className="treatments-overview-header">
          <h2 className="treatments-overview-title">Treatments for {areaLabel}</h2>
          <p className="treatments-overview-subtitle">
            At Algarve Pain Centre in Vale do Lobo, Algarve, we offer a comprehensive range of
            evidence-based treatments for {areaLabel}. Our multidisciplinary team of pain medicine
            physicians, spine surgeons, rehabilitation specialists and psychologists works together
            so that your plan is built from multiple expert perspectives, not just one.
          </p>
          <p className="treatments-overview-subtitle">
            Whether your pain is recent or long‑standing, we focus on understanding how it affects
            your daily life and long‑term goals. This helps us decide when simple measures are
            enough and when more advanced interventions are needed.
          </p>
        </div>
        <div className="treatments-overview-layout">
          <article className="treatments-overview-card">
            <h3 className="treatments-overview-card-title">{title} overview</h3>
            <div className="treatments-overview-card-accent" />
            <p className="treatments-overview-card-body">
              Pain in this area can have many causes, including joint, muscle, nerve and postural
              factors. During your first consultation we explore how your symptoms started, how they
              have evolved over time and which movements or activities make them better or worse.
              Understanding this pattern allows us to reach an accurate diagnosis and design a
              treatment plan that combines the most appropriate interventions for you.
            </p>
            <p className="treatments-overview-card-body">
              We also look carefully at your medical history, lifestyle and previous treatments.
              Some people come to us after years of trying isolated approaches without a clear plan.
              Others seek support early, when symptoms are starting to interfere with work, sport or
              sleep. Wherever you are in your journey, we aim to explain your condition in plain
              language and agree on priorities together.
            </p>
            <p className="treatments-overview-card-body">
              Common goals include reducing flare‑ups, improving confidence in movement and
              protecting long‑term joint and spine health. For some patients this means structured
              rehabilitation; for others it means targeted procedures or surgical opinion. Many
              people benefit from a combination of these elements over time.
            </p>
            <p className="treatments-overview-card-body">
              If you are unsure whether your {areaLabel} requires specialist assessment, consider
              seeking help when:
            </p>
            <ul className="treatments-overview-card-body">
              <li>pain persists for more than a few weeks despite simple measures</li>
              <li>movement is increasingly limited or everyday tasks are becoming difficult</li>
              <li>you notice weakness, pins and needles or changes in balance</li>
              <li>
                pain is affecting your mood, sleep, work or ability to enjoy family and social life
              </li>
            </ul>
            <p className="treatments-overview-card-body">
              Early assessment can often prevent symptoms from becoming more complex and can give
              you a clearer sense of what to expect in the months ahead.
            </p>
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

      <section className="page-section condition-treatment condition-approaches">
        <div className="treatments-overview-header">
          <h2 className="treatments-overview-title">Treatment approaches</h2>
          <p className="treatments-overview-subtitle">
            We combine minimally invasive procedures, rehabilitation and medication when needed to
            create a thoughtful treatment pathway rather than a single isolated procedure.
          </p>
        </div>
        <div className="condition-approaches-inner">
          <div className="condition-approaches-grid">
            <article className="condition-approach-card">
              <div
                className="condition-approach-media condition-approach-media-interventions"
                aria-hidden="true"
              />
              <div className="condition-approach-card-body">
                <h3 className="condition-approach-card-title">
                  Targeted <span>interventions</span>
                </h3>
                <div className="condition-approach-card-accent" />
                <p className="condition-approach-card-text">
                  Image‑guided procedures such as nerve blocks,{' '}
                  <Link to="/treatments/minimally-invasive-treatments/radiofrequency">
                    radiofrequency ablation
                  </Link>{' '}
                  or joint and spine injections can be used to reduce pain while preserving function
                  and supporting rehabilitation. These minimally invasive treatments are usually
                  performed as day‑case procedures in our clinic.
                </p>
                <p className="condition-approach-card-text">
                  For some conditions, surgical options such as{' '}
                  <Link to="/treatments/surgical-treatments/tubular-microsurgery">
                    tubular microsurgery
                  </Link>{' '}
                  or decompression may be considered. When this is the case, you will meet with a
                  spine surgeon to discuss risks, benefits and alternatives in detail.
                </p>
              </div>
            </article>
            <article className="condition-approach-card">
              <div
                className="condition-approach-media condition-approach-media-rehab"
                aria-hidden="true"
              />
              <div className="condition-approach-card-body">
                <h3 className="condition-approach-card-title">
                  Pharmacological and <span>rehabilitation</span>
                </h3>
                <div className="condition-approach-card-accent" />
                <p className="condition-approach-card-text">
                  Medication, physiotherapy and lifestyle measures frequently work together, helping
                  you to move with more confidence and regain autonomy in daily activities. We
                  favour stepwise, time‑limited use of medicines where possible, always balancing
                  symptom relief with safety.
                </p>
                <p className="condition-approach-card-text">
                  Our rehabilitation team provides structured programmes that may include{' '}
                  <Link to="/treatments/non-invasive-treatments/physiotherapy">physiotherapy</Link>
                  , guided exercise and functional training. When emotional or behavioural factors
                  play a role, we can also involve{' '}
                  <Link to="/treatments/non-invasive-treatments/psychology">psychology</Link> or{' '}
                  <Link to="/treatments/non-invasive-treatments/nutrition">nutrition</Link> support
                  so that your plan addresses the whole person, not just the painful area.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section condition-treatment condition-syndromes">
        <div className="condition-syndromes-layout">
          <header className="condition-syndromes-header condition-syndromes-header-center">
            <p className="condition-syndromes-eyebrow">Most common patterns</p>
            <h2 className="condition-syndromes-title">How {areaLabel} can present</h2>
            <p className="condition-syndromes-subtitle">
              People experience pain in different ways. Exploring the pattern of your symptoms helps
              us match you with the most appropriate investigation and treatment.
            </p>
          </header>
          <div className="condition-syndromes-card" role="list">
            {DEFAULT_SYNDROMES.map((syndrome) => {
              const isActive = activeSyndromeId === syndrome.id;
              return (
                <div
                  key={syndrome.id}
                  className="condition-syndrome-item"
                  role="listitem"
                  aria-expanded={isActive}
                >
                  <button
                    type="button"
                    className={`condition-syndrome-row ${
                      isActive ? 'condition-syndrome-row-active' : ''
                    }`}
                    aria-expanded={isActive}
                    aria-controls={`condition-syndrome-panel-${syndrome.id}`}
                    onClick={() =>
                      setActiveSyndromeId((current) =>
                        current === syndrome.id ? null : syndrome.id,
                      )
                    }
                  >
                    <span className="condition-syndrome-label">{syndrome.label}</span>
                    <span
                      className={`condition-syndrome-icon ${
                        isActive ? 'condition-syndrome-icon-active' : ''
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`condition-syndrome-panel-${syndrome.id}`}
                    className={`condition-syndrome-panel ${
                      isActive ? 'condition-syndrome-panel-open' : ''
                    }`}
                    role="region"
                    aria-hidden={!isActive}
                  >
                    <p className="condition-syndrome-panel-text">{syndrome.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section condition-treatment condition-testimonials">
        <header className="condition-testimonials-header">
          <h2 className="condition-testimonials-title">Testimonials</h2>
        </header>
        <div className="condition-testimonials-grid">
          <blockquote className="condition-testimonial">
            <span className="condition-testimonial-quote" aria-hidden="true">
              ”
            </span>
            <p className="condition-testimonial-text">
              “From the first consultation I felt that my concerns were listened to and that there
              was a clear plan for how to move forward.”
            </p>
            <footer className="condition-testimonial-meta">
              <cite className="condition-testimonial-author">Jean‑François Cristau</cite>
              <span className="condition-testimonial-location">France</span>
            </footer>
          </blockquote>
          <blockquote className="condition-testimonial">
            <span className="condition-testimonial-quote" aria-hidden="true">
              ”
            </span>
            <p className="condition-testimonial-text">
              “After treatment and guided exercises I can now get on with my life with much less
              pain and more confidence.”
            </p>
            <footer className="condition-testimonial-meta">
              <cite className="condition-testimonial-author">Carole Lee</cite>
              <span className="condition-testimonial-location">The Netherlands</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="page-section condition-treatment condition-faq">
        <div className="condition-faq-inner">
          <header className="condition-faq-header">
            <h2 className="condition-faq-title">Frequently asked questions about {areaLabel}</h2>
            <p className="condition-faq-subtitle">
              Patients often share similar questions when they first contact us. These answers can
              help you decide on next steps and prepare for your consultation.
            </p>
          </header>
          <div className="condition-faq-grid">
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                When should I see a specialist for {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                You should consider a specialist assessment if your symptoms have lasted more than a
                few weeks, are getting worse, limit your daily activities or are associated with
                worrying signs such as weakness, changes in sensation or difficulties with balance.
                If you are unsure, our team can review your situation and advise whether urgent
                investigation is needed.
              </p>
            </article>
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                What happens during the first appointment for {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                Your first visit usually includes a detailed history, physical examination and
                review of any previous imaging or reports. We focus on understanding your goals,
                daily activities and any treatments you have already tried. Based on this
                information we propose a personalised plan, which may include further tests,
                rehabilitation, minimally invasive procedures or a surgical opinion.
              </p>
            </article>
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                Will I always need injections or surgery for {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                No. Many people improve with a combination of education, tailored exercise, weight
                management, sleep optimisation and carefully chosen medication. Injections,{' '}
                <Link to="/treatments/minimally-invasive-treatments/vertebroplasty">
                  minimally invasive procedures
                </Link>{' '}
                or surgery are recommended only when the expected benefits clearly outweigh the
                risks and after a thorough discussion with you.
              </p>
            </article>
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                Do you treat international patients with {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                Yes. Algarve Pain Centre regularly cares for patients visiting from other regions of
                Portugal and from abroad. Our team can help coordinate investigations, treatment and
                follow‑up around your travel plans so that you can benefit from specialist care in
                the Algarve while maintaining continuity with your local doctors.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section condition-treatment condition-contact">
        <div className="contact-visit-layout condition-contact-layout">
          <div className="condition-contact-form-column">
            <h2 className="contact-form-title">Talk to our team</h2>
            <p className="contact-form-subtitle">
              Share your symptoms and questions, and we will help you understand the cause and plan
              the next step in your care.
            </p>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-first-name">
                  Name
                </label>
                <div className="contact-form-name-row">
                  <input
                    id="condition-contact-first-name"
                    type="text"
                    className="contact-input"
                    placeholder="First Name"
                  />
                  <input
                    id="condition-contact-last-name"
                    type="text"
                    className="contact-input"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-email">
                  Email <span className="contact-label-required">*</span>
                </label>
                <input
                  id="condition-contact-email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-phone">
                  Phone
                </label>
                <div className="contact-form-phone-row">
                  <span className="contact-phone-flag" aria-hidden="true">
                    🇵🇹
                  </span>
                  <input
                    id="condition-contact-phone"
                    type="tel"
                    className="contact-input"
                    placeholder="+351 000 000 000"
                  />
                </div>
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-message">
                  Message <span className="contact-label-required">*</span>
                </label>
                <textarea
                  id="condition-contact-message"
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
  );
};

export default ConditionDetailPage;
