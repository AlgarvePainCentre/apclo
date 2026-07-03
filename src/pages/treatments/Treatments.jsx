import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/layout/site-sections.css';
import '../../styles/layout/treatments-shared.css';
import SurgicalProceduresStack from './components/SurgicalProceduresStack';
import MinimallyInvasiveProceduresList from './components/MinimallyInvasiveProceduresList';
import NonInvasiveProceduresList from './components/NonInvasiveProceduresList';

export function TreatmentsMain({
  hideMinimallyInvasive = false,
  hideNonInvasive = false,
  hideSurgical = false,
}) {
  const location = useLocation();
  const contactMapIframeRef = useRef(null);

  const normalizePathname = (pathname) => {
    if (!pathname) return '/';
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
    return pathname;
  };

  const isTreatmentsLandingPage = normalizePathname(location.pathname) === '/treatments';

  useEffect(() => {
    const iframe = contactMapIframeRef.current;
    if (!iframe) return undefined;
    if (!(iframe instanceof HTMLIFrameElement)) return undefined;

    const loadMap = () => {
      const dataSrc = iframe.getAttribute('data-src');
      if (dataSrc && !iframe.getAttribute('src')) {
        iframe.setAttribute('src', dataSrc);
      }
    };

    if (!('IntersectionObserver' in window)) {
      loadMap();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadMap();
          io.disconnect();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(iframe);
    return () => io.disconnect();
  }, []);

  const painTreatmentApproaches = [
    {
      title: 'All Pain Areas',
      description: 'Intervene where it hurts you, rediscover independent life.',
      image: '/assets/images/medical/DSC06176.webp',
      alt: 'Person experiencing head pain.',
      link: '/specialities',
    },
    {
      title: 'Spine Pain',
      description: 'Relieve your chronic spine pain, reclaim your freedom.',
      image: '/assets/images/Homepage/SpinePain.webp',
      alt: 'Person with lower back pain.',
      link: '/specialities/pain-medicine/lumbar-spine-pain',
    },
    {
      title: 'Knee Pain',
      description: 'Regain your confidence, step back into life with ease.',
      image: '/assets/images/Homepage/KneePain.webp',
      alt: 'Person holding a painful knee.',
      link: '/specialities/pain-medicine/knee-pain',
    },
  ];

  const renderTreatmentsFeatureSection = ({
    sectionClassName,
    labelId,
    imageSrc,
    imageAlt,
    title,
    body,
  }) => (
    <section
      className={`page-section treatments-feature ${sectionClassName}`}
      aria-labelledby={labelId}
      style={{ padding: '2rem 4%' }}
    >
      <div className="treatments-feature-inner">
        <div className="treatments-feature-media">
          <img
            className="treatments-feature-video"
            src={imageSrc}
            alt={imageAlt}
            decoding="async"
            loading="lazy"
          />
        </div>

        <div className="treatments-feature-copy">
          <h2 id={labelId} className="treatments-feature-title">
            {title}
          </h2>
          <div className="treatments-feature-accent" />
          {body.map((paragraph) => (
            <p key={paragraph} className="treatments-feature-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {!hideSurgical && (
        <>
          <SurgicalProceduresStack />
          {isTreatmentsLandingPage &&
            renderTreatmentsFeatureSection({
              sectionClassName: 'treatments-feature-surgical-primary',
              labelId: 'treatments-feature-surgical-primary',
              imageSrc: '/assets/images/medical/DSC06176.webp',
              imageAlt:
                'Patient receiving a guided consultation about surgical, minimally invasive, and non-invasive treatment options.',
              title: 'Surgical Procedures',
              body: [
                'Surgical procedures are comprehensive interventions designed to address complex health issues with precision.',
                'These procedures use manual and instrumental techniques to diagnose or treat various conditions, including trauma, disease, injury, and malignancies.',
              ],
            })}
        </>
      )}
      {!hideMinimallyInvasive && (
        <>
          <MinimallyInvasiveProceduresList />
          {isTreatmentsLandingPage &&
            renderTreatmentsFeatureSection({
              sectionClassName: 'treatments-feature-minimally-invasive-primary',
              labelId: 'treatments-feature-minimally-invasive-primary',
              imageSrc: '/assets/images/Treatments-Icons/PeripheralNerveBlock.webp',
              imageAlt:
                'Illustration representing minimally invasive treatment options including targeted image-guided procedures.',
              title: 'Minimally Invasive Treatments',
              body: [
                'Minimally invasive procedures are advanced surgical techniques that minimize risks and promote faster recovery.',
                'Unlike traditional open surgeries, these procedures require only small incisions, which significantly reduce wound healing time, pain, and infection risks.',
              ],
            })}
        </>
      )}
      {!hideNonInvasive && (
        <>
          


            

          <NonInvasiveProceduresList />
          {isTreatmentsLandingPage &&
            renderTreatmentsFeatureSection({
              sectionClassName: 'treatments-feature-surgical-secondary',
              labelId: 'treatments-feature-surgical-secondary',
              imageSrc: '/assets/images/medical/DSC06176.webp',
              imageAlt:
                'Patient receiving a guided consultation about surgical, minimally invasive, and non-invasive treatment options.',
              title: 'Non-Invasive Treatments',
              body: [
                'Non-invasive procedures are medical techniques that do not require breaking the skin or entering the body.',
                'These methods are designed to assess and treat conditions without the risks associated with surgery, making them ideal for a variety of health concerns.',
              ],
            })}

          {isTreatmentsLandingPage && (
            <section className="page-section treatments-approaches" aria-labelledby="treatments-approaches-title">
              <div className="treatments-approaches-inner">
                <header className="treatments-approaches-header">
                  <h2 id="treatments-approaches-title" className="treatments-approaches-title">
                    Tackle Your Specific Pain
                  </h2>
                  <p className="treatments-approaches-subtitle">
                    Meet your medical needs and improve your life.
                  </p>
                </header>

                <div className="treatments-approaches-grid">
                  {painTreatmentApproaches.map((approach) => (
                    <article key={approach.title} className="treatments-approach-card">
                      <div className="treatments-approach-media">
                        <img
                          src={approach.image}
                          alt={approach.alt}
                          className="treatments-approach-image"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="treatments-approach-body">
                        <h3 className="treatments-approach-card-title">{approach.title}</h3>
                        <div className="treatments-approach-card-accent" aria-hidden="true" />
                        <p className="treatments-approach-card-text">{approach.description}</p>
                        <Link
                          to={approach.link}
                          className="treatments-approach-link"
                          aria-label={`Learn more about ${approach.title}`}
                        >
                          <span>Learn more</span>
                          <span className="treatments-approach-link-icon" aria-hidden="true">
                            ›
                          </span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
      <section className="home-section-location" aria-labelledby="treatments-location-title">
        <div className="home-section-location-inner">
          <header className="location-header">
            <h2 className="location-title" id="treatments-location-title">
              Our Location
            </h2>
            <div className="location-title-rule" aria-hidden="true" />
          </header>

          <div className="location-grid location-grid--map-only">
            <div className="location-map" aria-label="Map">
              <iframe
                ref={contactMapIframeRef}
                className="location-map-iframe"
                title="Business location map"
                data-src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

TreatmentsMain.PageMain = function TreatmentPageMain({ children }) {
  return <main className="page-main treatments-page">{children}</main>;
};

export default function Treatments() {
  const heroBackdropStyle = {
    backgroundImage: "url('/assets/images/illustrative/services-home-min-1.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="psx-page" id="psx-treatments">
      <header className="treatment-page-hero treatments-hero" aria-label="Treatments hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} /> 
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Treatments</h1>
          <p className="psx-hero-subtitle">
            We have the most outstanding treatments performed in the world&apos;s leading pain centers, from peripheral nerve blocks, to
            cryoablation, radiofrequency, among others.
          </p>
        </div>
      </header>
      <div id="treatments" className="treatments-page">
        <TreatmentsMain />
      </div>
    </div>
  );
}
