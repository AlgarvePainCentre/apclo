import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { serializeJsonForHtmlScript } from '../../utils/security';
import ArticleBreadcrumb from '../../components/ArticleBreadcrumb';
import ArticlePrevNextNav from '../../components/ArticlePrevNextNav';
import LumbarInterventions from '../../components/LumbarInterventions';
import ManagedEmbed from '../../components/ManagedEmbed';
import '../../styles/layout/specialities-layout.css';

import {
  DEFAULT_SYNDROMES,
  getSpecialitiesNavItemsWithHero,
  PAIN_MEDICINE_PAGE_CONTENT,
  KNEE_MOST_COMMON_SYNDROMES,
  HIP_MOST_COMMON_SYNDROMES,
  HEAD_MOST_COMMON_SYNDROMES,
  CERVICAL_MOST_COMMON_SYNDROMES,
  SHOULDER_MOST_COMMON_SYNDROMES,
  HAND_ELBOW_MOST_COMMON_SYNDROMES,
  THORACIC_WALL_MOST_COMMON_SYNDROMES,
  ABDOMINAL_WALL_MOST_COMMON_SYNDROMES,
  PELVIC_MOST_COMMON_SYNDROMES,
  FACIAL_MOST_COMMON_SYNDROMES,
  FOOT_ANKLE_MOST_COMMON_SYNDROMES,
} from '../../data/specialities/conditionContent';

// Re-exported for backwards compatibility with any importer of this module.
export { SPECIALITIES_NAV_ITEMS, getSpecialitiesNavItemsWithHero } from '../../data/specialities/conditionContent';

type ConditionDetailPageProps = {
  title: string;
  areaLabel: string;
  mainClassName?: string;
  variant?: 'default' | 'pain-specialty-clone';
  heroSubtitle?: string;
  heroEyebrow?: string;
};

const ConditionDetailPage: React.FC<ConditionDetailPageProps> = ({
  title,
  areaLabel,
  mainClassName,
  variant = 'default',
  heroSubtitle,
  heroEyebrow,
}) => {
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
  const syndromes = variant === 'pain-specialty-clone' && PAIN_MEDICINE_PAGE_CONTENT[slugBase]
    ? PAIN_MEDICINE_PAGE_CONTENT[slugBase].patterns
    : DEFAULT_SYNDROMES;
  const accordionSyndromes = React.useMemo(() => {
    if (slugBase === 'knee-pain') return KNEE_MOST_COMMON_SYNDROMES;
    if (slugBase === 'hip-and-groin-pain') return HIP_MOST_COMMON_SYNDROMES;
    if (slugBase === 'head-pain') return HEAD_MOST_COMMON_SYNDROMES;
    if (slugBase === 'cervical-spine-pain') return CERVICAL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'shoulder-pain') return SHOULDER_MOST_COMMON_SYNDROMES;
    if (slugBase === 'hand-and-elbow-pain') return HAND_ELBOW_MOST_COMMON_SYNDROMES;
    if (slugBase === 'thoracic-wall-pain') return THORACIC_WALL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'abdominal-wall-pain') return ABDOMINAL_WALL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'pelvic-and-gynaecological-pain') return PELVIC_MOST_COMMON_SYNDROMES;
    if (slugBase === 'facial-pain') return FACIAL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'foot-and-ankle-pain') return FOOT_ANKLE_MOST_COMMON_SYNDROMES;
    return syndromes;
  }, [slugBase, syndromes]);
  const initialActiveSyndromeId = React.useMemo(() => {
    if (slugBase === 'head-pain' || slugBase === 'shoulder-pain') return null;
    return accordionSyndromes[0]?.id ?? null;
  }, [accordionSyndromes, slugBase]);
  const [activeSyndromeId, setActiveSyndromeId] = React.useState<string | null>(() => initialActiveSyndromeId);
  React.useEffect(() => {
    setActiveSyndromeId(initialActiveSyndromeId);
  }, [initialActiveSyndromeId]);
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
    const defaultHeroImage = '/assets/images/Hero/HomeCare.webp';
    const defaultOverview = [
      'Pain in this area can have many causes, including joint, muscle, nerve and postural factors. During your first consultation we explore how your symptoms started, how they have evolved over time and which movements or activities make them better or worse.',
      'We also look carefully at your medical history, lifestyle and previous treatments. Some people come to us after years of trying isolated approaches without a clear plan. Others seek support early, when symptoms are starting to interfere with work, sport or sleep.',
      'Common goals include reducing flare‑ups, improving confidence in movement and protecting long‑term joint and spine health. Many people benefit from a combination of these elements over time.',
    ];
    const pageContent = PAIN_MEDICINE_PAGE_CONTENT[slugBase];
    const heroImage = pageContent?.heroImage ?? defaultHeroImage;
    const overviewParagraphs = pageContent?.overview ?? defaultOverview;

    return (
      <div className="psx-page" id={`psx-${slugBase}`}>
        <header className="psx-hero">
          <div
            className="psx-hero-backdrop"
            aria-hidden="true"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
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
          <ArticleBreadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Specialities', to: '/specialities' },
              { label: title, isCurrent: true },
            ]}
          />
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
                {overviewParagraphs.map((paragraph, idx) => (
                  <p key={`${slugBase}-overview-${idx}`} className="psx-body">
                    {paragraph}
                  </p>
                ))}
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
                    poster={heroImage}
                  >
                    <source src="/assets/videos/post-43.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
                    <source src="/assets/videos/post-43.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
                    <source src="/assets/videos/post-43.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
            {slugBase === 'foot-and-ankle-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="foot-ankle-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="foot-ankle-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    Foot and ankle pain can come from very different structures and have several etiologies, some of the most common are described here.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common foot and ankle pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-foot-ankle-syndrome-${syndrome.id}`;
                      const panelId = `psx-foot-ankle-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'foot-and-ankle-pain' && (
              <section className="psx-approaches psx-approaches--foot-ankle" aria-labelledby="foot-ankle-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="foot-ankle-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Foot and ankle pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Targeted anti-inflammatory injection to reduce pain and support movement while rehabilitation progresses.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Local anaesthetic near nerves for diagnostic clarity or therapeutic relief when symptoms suggest nerve-related pain.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Crioblation.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Crioablation</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Cold-based nerve modulation to interrupt pain signalling, guided by ultrasound or fluoroscopy when appropriate.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/cryoablation"
                        className="psx-approach-link"
                        aria-label="Learn more about crioablation"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PlateletRichPlasma.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Plasma Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        PRP (platelet rich plasma) contains 2-5 times the usual number of platelets and have a regenerative effect on the tissues.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about plasma injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Radiofrequency.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Radiofrequency</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Radiofrequency ablation is a minimally invasive procedure guided for ultrasound or fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about radiofrequency"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'facial-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="facial-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="facial-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    After excluding dental and sinus causes, neuropathic facial pain syndromes should be kept in mind.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common facial pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-facial-syndrome-${syndrome.id}`;
                      const panelId = `psx-facial-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'facial-pain' && (
              <section className="psx-approaches psx-approaches--facial" aria-labelledby="facial-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="facial-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Facial pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Corticosteroids medications are used to reduce pain and inflammation and can be taken oral or through an injection.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'facial-pain' && (
              <div className="psx-facial-note" aria-label="Facial pain information">
                <div className="psx-facial-note-inner">
                  <h3 className="psx-facial-note-title">Complex Facial Pain</h3>
                  <p className="psx-facial-note-text">
                    Facial pain can be caused by numerous factors: nerve damage (for example after dental procedures), various pathologies
                    (including TMJ disorders) or be derived from a previous surgery. Other times the origin can be myofascial, in the jaw and
                    facial muscles. It is often a complex phenomenon, as it tends to involve problems related to sleep, stress and quality of
                    life. This circumstance makes the treatment of facial pain very challenging.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'pelvic-and-gynaecological-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="pelvic-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="pelvic-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    In the presence of pelvic pain, having been excluded visceral origin for the pain, other causes should be kept in mind.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common pelvic and gynaecological pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-pelvic-syndrome-${syndrome.id}`;
                      const panelId = `psx-pelvic-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'pelvic-and-gynaecological-pain' && (
              <section className="psx-approaches psx-approaches--pelvic" aria-labelledby="pelvic-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="pelvic-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Pelvic and gynaecological pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Corticosteroids medications are used to reduce pain and inflammation and can be taken oral or through an injection.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'pelvic-and-gynaecological-pain' && (
              <div className="psx-pelvic-note" aria-label="Pelvic pain information">
                <div className="psx-pelvic-note-inner">
                  <h3 className="psx-pelvic-note-title">Chronic Pelvic Pain</h3>
                  <p className="psx-pelvic-note-text">
                    This clinical scenario can be caused by numerous factors: the result of nerve damage, such as pudendal, caused by cycling,
                    various pathologies (such as endometriosis) or derived from a previous surgery. Other times the origin can be myofascial,
                    in the pelvic floor area. It is often a complex phenomenon, as it tends up involving problems related to sedestation,
                    defecation, sexuality... This circumstance makes the treatment of pelvic pain very challenging.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'abdominal-wall-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="abdominal-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="abdominal-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    There are a few overlooked yet common causes for abdominal wall pain, which should be sought in the presence of chronic
                    abdominal pain.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common abdominal wall pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-abdominal-syndrome-${syndrome.id}`;
                      const panelId = `psx-abdominal-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'abdominal-wall-pain' && (
              <section className="psx-approaches psx-approaches--abdominal" aria-labelledby="abdominal-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="abdominal-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Abdominal wall pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        This minimally invasive procedure, as radiofrequency ablation and cryoablation, should be guided for ultrasound or
                        fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'abdominal-wall-pain' && (
              <div className="psx-abdominal-note" aria-label="Abdominal wall pain information">
                <div className="psx-abdominal-note-inner">
                  <h3 className="psx-abdominal-note-title">Chronic Abdominal Wall Pain</h3>
                  <p className="psx-abdominal-note-text">
                    There are several reasons that can result in severe pain in the chronic abdominal wall: post‑surgical pain,
                    peripheral nerve entrapment, muscle problems. Other than oral medication, there are other weapons to control this pain:
                    ultrasound‑guided percutaneous techniques. TAP block (Transversus Abdominal Plane), Thermal Radiofrequency or
                    Crioablation of peripherical nerves, are just a few examples in our clinical practice.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'thoracic-wall-pain' && (
              <section className="psx-approaches psx-approaches--thoracic" aria-labelledby="thoracic-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="thoracic-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Thoracic wall pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        This minimally invasive procedure, as radiofrequency ablation and cryoablation, should be guided for ultrasound or
                        fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'thoracic-wall-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="thoracic-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="thoracic-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    Post‑herpetic pain among post‑surgical syndromes are two of the main causes for Thoracic Pain.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common thoracic wall pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-thoracic-syndrome-${syndrome.id}`;
                      const panelId = `psx-thoracic-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'hand-and-elbow-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="hand-elbow-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="hand-elbow-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common hand and elbow pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-hand-elbow-syndrome-${syndrome.id}`;
                      const panelId = `psx-hand-elbow-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'hand-and-elbow-pain' && (
              <section className="psx-approaches psx-approaches--hand-elbow" aria-labelledby="hand-elbow-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="hand-elbow-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Hand and elbow pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Radiofrequency.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Radiofrequency</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">Radiofrequency ablation is a minimally invasive procedure guided for ultrasound or fluoroscopy.</p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about radiofrequency"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PlateletRichPlasma.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Plasma Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        PRP (platelet rich plasma) contains 2-5 times the usual number of platelets and have a regenerative effect on the tissues.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about plasma injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Local anaesthetic near nerves for diagnostic clarity or therapeutic relief when symptoms suggest nerve-related pain.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Targeted anti-inflammatory injection to reduce pain and support movement while rehabilitation progresses.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Crioblation.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Crioablation</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Cold-based nerve modulation to interrupt pain signalling, guided by ultrasound or fluoroscopy when appropriate.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/cryoablation"
                        className="psx-approach-link"
                        aria-label="Learn more about crioablation"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'hand-and-elbow-pain' && (
              <div className="psx-hand-elbow-note" aria-label="Hand and elbow information">
                <div className="psx-hand-elbow-note-inner">
                  <h3 className="psx-hand-elbow-note-title">Hand &amp; Elbow Anatomy</h3>
                  <p className="psx-hand-elbow-note-text">
                    The hand is a wondrously complex structure of bones, muscles, ligaments, and tendons which work together to perform
                    tasks. The wrist and elbow are stabilizing joints that support the steady use of the hand and provide attachment points
                    for the muscles that control the hand and wrist. All three of these areas are prone to injury from overuse or trauma.
                    Their complexity requires the skills of an expert for proper diagnosis and recover from injury.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'shoulder-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="shoulder-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="shoulder-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common shoulder pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-shoulder-syndrome-${syndrome.id}`;
                      const panelId = `psx-shoulder-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'shoulder-pain' && (
              <section className="psx-approaches psx-approaches--shoulder" aria-labelledby="shoulder-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="shoulder-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">
                    Our team of doctors has the capacity to perform the most different approaches to shoulder treatment, including ultrasound guided procedures.
                  </p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Shoulder pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Medication is commonly part of treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Hydrodistention.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Hydrodistention</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Hydrodistention is a minimally invasive procedure guided for ultrasound that aims to stretch the tight joint capsule.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/hydrodistention"
                        className="psx-approach-link"
                        aria-label="Learn more about hydrodistention"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/CalcificationBarbotage.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Calcification Barbotage</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Calcification barbotage is a minimally invasive procedure guided for ultrasound used to treat this condition.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/calcification-barbotage"
                        className="psx-approach-link"
                        aria-label="Learn more about calcification barbotage"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'cervical-spine-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="cervical-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="cervical-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    Cervical facet joints (FJs) constitute a common source of pain and remain a misunderstood, misdiagnosed and improperly
                    treated pathology. Facet osteoarthritis is the most frequent form of facet pathology.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common cervical spine pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-cervical-syndrome-${syndrome.id}`;
                      const panelId = `psx-cervical-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'cervical-spine-pain' && (
              <section className="psx-approaches psx-approaches--cervical" aria-labelledby="cervical-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="cervical-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">
                    We have a team expert in diagnosis and management of the cervical pain.
                  </p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Cervical spine pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroid Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Corticosteroids medication are used to reduce pain and inflammation and can be taken oral or through an injection.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroid injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Crioblation.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Crioablation</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Cryoablation uses cold temperatures and is a minimally invasive procedure guided for ultrasound or fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/cryoablation"
                        className="psx-approach-link"
                        aria-label="Learn more about crioablation"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Nucleoplasty.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Nucleoplasty</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Nucleoplasty is an advanced injection procedure guided for fluoroscopy for treating the disc herniation.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/nucleoplasty"
                        className="psx-approach-link"
                        aria-label="Learn more about nucleoplasty"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Optimised medicines can help control pain, improve sleep, and support rehabilitation while minimising side effects.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Radiofrequency.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Radiofrequency</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Thermal lesioning can reduce pain from selected nerves and joints when matched to the right diagnosis.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about radiofrequency"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'cervical-spine-pain' && (
              <div className="psx-cervical-note" aria-label="Cervical spine pain information">
                <div className="psx-cervical-note-inner">
                  <h3 className="psx-cervical-note-title">Cervical Spine Pain</h3>
                  <p className="psx-cervical-note-text">
                    Chronic neck pain is one of the most common pain syndromes and represents an enormous burden and cost generator for
                    society.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'head-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="head-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="head-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common head pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-head-syndrome-${syndrome.id}`;
                      const panelId = `psx-head-syndrome-panel-${syndrome.id}`;
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
                              {isActive ? '−' : '+'}
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
              </div>
            )}
            {slugBase === 'head-pain' && (
              <section className="psx-approaches psx-approaches--head" aria-labelledby="head-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="head-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">
                    We have a team expert in diagnosis and management of the head.
                  </p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Head pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Botulin.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Botulin Toxin Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        A potent neurotoxin that inhibits release of acetylcholine at the neuromuscular junction.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/botulin-toxin-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about botulin toxin injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Medication strategies are commonly part of treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'head-pain' && (
              <div className="psx-head-note" aria-label="Head pain information">
                <div className="psx-head-note-inner">
                  <h3 className="psx-head-note-title">Head Pain in Numbers</h3>
                  <p className="psx-head-note-text">
                    Head pain is a common health problem with a global prevalence of 47% (symptoms occurring at least once in the past year)
                    and women are disproportionately affected (3:1).
                  </p>
                  <p className="psx-head-note-text">
                    Many factors, like stress, anxiety, injury and migraine can lead to headaches. In European populations, the annual
                    sex-adjusted prevalence for tension-type headache is 35%, for migraine is 38%, but for cluster headache is only 0.15%.
                  </p>
                  <p className="psx-head-note-text">
                    Consequently, sometimes the high frequency and intensity of headaches affects a patient&apos;s quality of life and a
                    diagnosis and effective treatment make a huge difference to the patient and can be very rewarding for the clinician.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'sports-injuries' && (
              <section className="psx-approaches" aria-labelledby="sports-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="sports-approaches-title" className="psx-approaches-title">
                    Our Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">We can help you at every level of your health journey.</p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/treatment-img/No-Invasive.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Non–Invasive Treatments</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Quick and non‑committing steps we can take together to improve your health.
                      </p>
                      <Link
                        to="/treatments#treatments-non-invasive"
                        className="psx-approach-link"
                        aria-label="Learn more about non-invasive treatments"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/treatment-img/Minimally-Invasive.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Minimally Invasive Treatments</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Procedures with reduced surgical risks that promote quicker recovery times.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about minimally invasive treatments"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/treatment-img/Surgical.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Surgical Treatments</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Comprehensive procedures tailored to address complex health issues with precision.
                      </p>
                      <Link
                        to="/treatments#treatments-surgical"
                        className="psx-approach-link"
                        aria-label="Learn more about surgical treatments"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'hip-and-groin-pain' && (
              <>
                <div className="psx-lead">
                  <h2 id="hip-interventions-title" className="psx-lead-title">
                    Intervention Options
                  </h2>
                  <p className="psx-lead-subtitle">
                    Explore common procedures that can support pain relief and rehabilitation.
                  </p>
                </div>
                <div className="lumbar-cards-wrap" aria-label="Hip and groin intervention options">
                  <LumbarInterventions />
                </div>
                <div className="psx-syndromes-accordion" aria-labelledby="hip-syndromes-title">
                  <header className="psx-syndromes-accordion-header">
                    <h2 id="hip-syndromes-title" className="psx-syndromes-accordion-title">
                      Most Common Syndromes
                    </h2>
                    <p className="psx-syndromes-accordion-subtitle">
                      Hip osteoarthritis is one of the most common causes of hip pain in the older population.
                    </p>
                  </header>
                  <div className="psx-syndromes-accordion-card">
                    <div className="psx-accordion" role="list" aria-label="Most common hip syndromes">
                      {accordionSyndromes.map((syndrome) => {
                        const isActive = activeSyndromeId === syndrome.id;
                        const rowId = `psx-hip-syndrome-${syndrome.id}`;
                        const panelId = `psx-hip-syndrome-panel-${syndrome.id}`;
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
                                {isActive ? '−' : '+'}
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
                </div>
                <div className="psx-hip-interventional-note" aria-label="Hip and groin interventional pain management information">
                  <div className="psx-hip-interventional-note-inner">
                    <h3 className="psx-hip-interventional-note-title">Interventional Pain Management</h3>
                    <p className="psx-hip-interventional-note-text">
                      Percutaneous interventional pain management is a good alternative treatment.
                    </p>
                    <p className="psx-hip-interventional-note-text">
                      The hip joint is the more stable joint of the human body and is composed of femoral head and acetabulum. It is made of
                      cartilage, ligaments and fluid. Muscles and tendons help the hip joint move. It can withstand repeated motion and a fair
                      amount of wear and tear.
                    </p>
                    <p className="psx-hip-interventional-note-text">
                      For that reason, one of the main diseases of the hip is osteoarthritis and, as in the knee, the ultimate treatment is
                      prosthetic surgery. Despite that, percutaneous interventional pain management (Steroid, Platelet Rich Plasma or Hyaluronic
                      Acid Injection) are a good alternative treatment for some patients who are not eligible for an operation or experience
                      persistent or intense pain after surgery or while waiting for surgery.
                    </p>
                  </div>
                </div>
              </>
            )}
          </section>
          {slugBase === 'knee-pain' && (
            <section className="psx-section" aria-labelledby="knee-interventions-title">
              <div className="psx-lead">
                <h2 id="knee-interventions-title" className="psx-lead-title">
                  Intervention Options
                </h2>
                <p className="psx-lead-subtitle">
                  Explore common procedures that can support pain relief and rehabilitation.
                </p>
              </div>
              <div className="lumbar-cards-wrap">
                <LumbarInterventions />
              </div>
            </section>
          )}
          {slugBase === 'knee-pain' && (
            <section className="psx-section psx-syndromes-accordion" aria-labelledby="knee-syndromes-title">
              <header className="psx-syndromes-accordion-header">
                <h2 id="knee-syndromes-title" className="psx-syndromes-accordion-title">
                  Most Common Syndromes
                </h2>
                <p className="psx-syndromes-accordion-subtitle">
                  Knee pain is a very prevalent symptom, either in younger and in older people. It can have many sources, some of which are
                  described next.
                </p>
              </header>
              <div className="psx-syndromes-accordion-card">
                <div className="psx-accordion" role="list" aria-label="Most common knee syndromes">
                  {accordionSyndromes.map((syndrome) => {
                    const isActive = activeSyndromeId === syndrome.id;
                    const rowId = `psx-knee-syndrome-${syndrome.id}`;
                    const panelId = `psx-knee-syndrome-panel-${syndrome.id}`;
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
                            {isActive ? '−' : '+'}
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
          )}
          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-edu">
              <div className="psx-edu-row">
                <h3 className="psx-edu-heading">Symptoms & Diagnosis</h3>
                <div className="psx-edu-copy">
                  <p className="psx-edu-paragraph">Symptoms of lumbar spine pain can vary widely depending on the underlying cause and may include localized pain in the lower back, as well as radiating pain, numbness, or tingling sensations in the legs or feet.</p>
                  <p className="psx-edu-paragraph">Lumbar spine pain can be caused by a variety of factors, including injury, poor posture, arthritis, or degenerative disc disease. In some cases, the pain may be acute and resolve on its own with rest and conservative treatments. However, in other cases, the pain may be chronic and require more aggressive interventions, such as surgery.</p>
                  <p className="psx-edu-paragraph">Diagnostic tests for lumbar spine pain may include X‑rays, CT scans, MRIs, and nerve conduction studies to help identify the underlying cause and guide treatment decisions.</p>
                </div>
              </div>
            </section>
          )}
          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-syndromes">
              <header className="psx-syndromes-header">
                <h2 className="psx-syndromes-title">Most Common Syndromes</h2>
                <p className="psx-syndromes-subtitle">
                  Lumbar facet joints constitute a common source of pain and remain a misunderstood, misdiagnosed and
                  improperly treated pathology.
                </p>
                <p className="psx-syndromes-subtitle">
                  Facet osteoarthritis is the most frequent form of facet pathology.
                </p>
              </header>
              <div className="psx-syndromes-layout">
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Radicular Pain</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Radicular pain is a term applied to describe pain that results from the stimulation of, or a
                      disorder of, a nerve root. Irritation of the nerves in the spine can cause a variety of symptoms,
                      which differ from person to person.
                    </p>
                    <p>
                      Common symptoms include: pain and increased sensitivity; pins and needles; and numbness; muscle
                      weakness; altered sensations such as trickling water.
                    </p>
                    <p>
                      Nerve pain is usually described as burning in nature, and normally spreads below the knee or
                      elbow in the affected limb. Often nerve pain and back pain are present at the same time.
                    </p>
                  </div>
                  <Link to="/resources/learn/cervical-pain" className="psx-syndrome-link" aria-label="Learn more about radicular pain">
                    <span>Learn more</span>
                    <span aria-hidden="true">›</span>
                  </Link>
                </article>
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/RadicularPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
              </div>
              <div className="psx-syndromes-layout">
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/FacetJointSyndrome.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Facet Joint Syndrome</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Lumbar facet joints (FJs) constitute a common source of pain and remain a misunderstood,
                      misdiagnosed and improperly treated pathology. Facet osteoarthritis is the most frequent form of
                      facet pathology.
                    </p>
                    <p>
                      FJ pain may be referred distally into the lower limb, thereby mimicking sciatica.
                    </p>
                    <p>
                      “Pseudo‑radicular” lumbar pain typically radiates uni‑ or bilaterally to the buttock and the
                      trochanteric region, the groin and the thighs, ending above the knee, without neurological
                      deficits.
                    </p>
                  </div>
                </article>
              </div>
              <div className="psx-syndromes-layout">
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Sacroiliac Joint Pain</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Patients experiencing sacroiliac joint pain may present with a wide variety of complaints.
                      Gluteal pain near or surrounding the posterior superior iliac spine is the most common region.
                    </p>
                    <p>
                      Other symptoms include groin pain, pain radiating into the lower extremity, numbness, and clicking
                      or popping in the posterior pelvis.
                    </p>
                    <p>
                      Pain, clicking, or both with transitional activities such as getting up from a chair or in and
                      out of a car may also be noted.
                    </p>
                  </div>
                </article>
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/SacroiliacJointPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
              </div>
              <div className="psx-syndromes-layout">
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/LumbarSpinalStenosis.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Lumbar Spinal Stenosis</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      The term lumbar spinal stenosis refers to the anatomical narrowing of the spinal canal and is
                      associated with a plethora of clinical symptoms.
                    </p>
                    <p>
                      The clinical features of the condition are heterogeneous, and often, but not always, include
                      neurological symptoms. Typically, patient symptoms comprise unilateral or bilateral (exertional)
                      back and leg pain, which slowly develops and persists over several months, or even years.
                    </p>
                    <p>
                      The back pain is localized to the lumbar spine and can radiate towards the gluteal region, groin
                      and legs, frequently displaying a pseudo radicular pattern.
                    </p>
                  </div>
                </article>
              </div>
              <div className="psx-syndromes-layout">
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Discogenic Pain</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Discogenic pain shares clinical signs with lumbosacral radicular pain. There are no specific
                      characteristics in the patient&apos;s history that confirm or disprove the diagnosis of discogenic
                      low back pain.
                    </p>
                    <p>
                      More typical features include persistent, nociceptive low back, groin and/or leg pain that
                      worsens with axial loading and improves with recumbence.
                    </p>
                  </div>
                </article>
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/DiscogenicPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
              </div>
            </section>
          )}
          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section" aria-labelledby="lumbar-interventions-title">
              <div className="psx-lead">
                <h2 id="lumbar-interventions-title" className="psx-lead-title">Intervention Options</h2>
                <p className="psx-lead-subtitle">Explore common procedures that can support pain relief and rehabilitation.</p>
              </div>
              <div className="lumbar-cards-wrap">
                <LumbarInterventions variant="full" />
              </div>
            </section>
          )}

          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-tips" aria-labelledby="lumbar-tips-title">
              <header className="psx-tips-header">
                <h2 id="lumbar-tips-title" className="psx-tips-title">Tips for maintaining a healthy spine</h2>
                <p className="psx-tips-subtitle">
                  Maintaining a healthy spine supports overall wellbeing. These practical habits can help reduce strain and improve movement over time.
                </p>
              </header>
              <div className="psx-tips-grid" role="list" aria-label="Healthy spine tips">
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">1.</p>
                  <h3 className="psx-tip-title">Practice Good Posture</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Keep a neutral spine when sitting or standing. Avoid slouching and long periods in one position.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">2.</p>
                  <h3 className="psx-tip-title">Exercise Regularly</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Build strength and mobility with low‑impact activity such as walking, swimming or cycling.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">3.</p>
                  <h3 className="psx-tip-title">Maintain a Healthy Weight</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Reducing excess load on the spine can ease symptoms and support long‑term joint health.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">4.</p>
                  <h3 className="psx-tip-title">Use Proper Lifting Techniques</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Bend at the hips and knees, keep the load close, and avoid twisting when lifting.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">5.</p>
                  <h3 className="psx-tip-title">Take Breaks from Sitting</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Stand up, stretch and move every 30–60 minutes to reduce stiffness and pressure.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">6.</p>
                  <h3 className="psx-tip-title">Practice Stress Reduction</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Sleep, breathing and relaxation techniques can reduce muscle tension and improve recovery.
                  </p>
                </article>
              </div>
            </section>
          )}

          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-help" aria-labelledby="lumbar-help-title">
              <div className="psx-help-layout">
                <h2 id="lumbar-help-title" className="psx-help-title">Let us help you</h2>
                <div className="psx-help-copy">
                  <p className="psx-help-paragraph">
                    If you&apos;re experiencing lumbar spine pain, consulting a healthcare provider is essential. This type of pain may signal serious underlying issues like herniated discs, spinal stenosis, or spondylolisthesis, which can lead to nerve damage or spinal cord compression if left untreated. Early intervention is crucial to prevent long‑term complications and manage pain effectively.
                  </p>
                  <p className="psx-help-paragraph">
                    Lumbar spine pain can also significantly impact daily activities, such as walking or sitting, and interfere with work and recreational pursuits. Seeking treatment not only helps alleviate pain but also improves functionality, preventing the condition from becoming chronic. A healthcare provider can also address risk factors or lifestyle issues contributing to the pain, offering recommendations such as posture‑improving exercises or weight loss strategies.
                  </p>
                  <p className="psx-help-paragraph">
                    Remember, timely treatment is key to maintaining your quality of life and preventing more invasive interventions later.
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="psx-section">
            <div className="psx-treatments-layout">
              <article className="psx-card">
                <h3 className="psx-card-title">For patients</h3>
                <div className="psx-accent" />
                {(pageContent?.patient ?? [
                  'Your plan is built collaboratively. We explain findings, discuss options and agree next steps that fit your goals.',
                  'Please bring medication lists and any imaging reports to appointments. Let us know your priorities so we can tailor care.',
                ]).map((p, idx) => (
                  <p key={`${slugBase}-patient-${idx}`} className="psx-body">
                    {p}
                  </p>
                ))}
              </article>
              <article className="psx-card">
                <h3 className="psx-card-title">For clinicians</h3>
                <div className="psx-accent" />
                {(pageContent?.clinician ?? [
                  'We welcome referrals and provide clear communication on assessment, working diagnosis and management plans.',
                  'Our approach integrates guideline-informed care and shared decision-making. Please contact us to discuss complex cases.',
                ]).map((p, idx) => (
                  <p key={`${slugBase}-clinician-${idx}`} className="psx-body">
                    {p}
                  </p>
                ))}
              </article>
            </div>
          </section>

          {slugBase !== 'knee-pain' &&
            slugBase !== 'hip-and-groin-pain' &&
            slugBase !== 'head-pain' &&
            slugBase !== 'cervical-spine-pain' &&
            slugBase !== 'shoulder-pain' &&
            slugBase !== 'hand-and-elbow-pain' &&
            slugBase !== 'thoracic-wall-pain' &&
            slugBase !== 'abdominal-wall-pain' &&
            slugBase !== 'pelvic-and-gynaecological-pain' &&
            slugBase !== 'facial-pain' &&
            slugBase !== 'foot-and-ankle-pain' &&
            (
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
                  {syndromes.map((syndrome) => {
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
          )}

          {pageContent?.citations && pageContent.citations.length > 0 ? (
            <section className="psx-section">
              <div className="psx-treatments-layout">
                <article className="psx-card">
                  <h3 className="psx-card-title">References</h3>
                  <div className="psx-accent" />
                  <ol className="psx-body" role="list">
                    {pageContent.citations.map((c, idx) => (
                      <li key={`${slugBase}-ref-${idx}`}>
                        <a href={c.url} target="_blank" rel="noopener noreferrer">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </article>
              </div>
            </section>
          ) : null}

          <section className="home-section-location" aria-labelledby={`${slugBase}-location-title`}>
            <div className="home-section-location-inner">
              <header className="location-header">
                <h2 className="location-title" id={`${slugBase}-location-title`}>
                  Our Location
                </h2>
                <div className="location-title-rule" aria-hidden="true" />
              </header>
              <div className="location-grid location-grid--map-only">
                <div className="location-map" aria-label="Map">
                  <ManagedEmbed
                    className="location-map-iframe"
                    title="Business location map"
                    type="map"
                    src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    openHref="https://maps.google.com/?q=Av.+do+Mar+8135-107+Portugal"
                  />
                </div>
              </div>
            </div>
          </section>

          <ArticlePrevNextNav
            items={getSpecialitiesNavItemsWithHero() as unknown as { to: string; title: string; heroImage?: string }[]}
            ariaLabel="Speciality page navigation"
            previousLabel="Previous Page"
            nextLabel="Next Page"
          />
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
              >
                <source src="/assets/videos/post-43.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
                <source src="/assets/videos/post-43.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
                <source src="/assets/videos/post-43.mp4" type="video/mp4" />
              </video>
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
            <ManagedEmbed
              title="Algarve Pain Centre location"
              type="map"
              src="https://www.google.com/maps?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              openHref="https://maps.google.com/?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil"
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
