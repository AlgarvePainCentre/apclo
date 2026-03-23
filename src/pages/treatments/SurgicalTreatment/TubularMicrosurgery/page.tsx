import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './TubularMicrosurgery.css';

const TubularMicrosurgeryPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Tubular microsurgery in Algarve | Minimally invasive spine care';
    document.title = pageTitle;

    const description =
      'Learn about minimally invasive tubular microsurgery in Algarve. Reduce nerve pain, protect mobility, and review your scans with our specialist team.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/6-Chronic-Back-Pain.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page tubular-microsurgery-page" id="psx-tubular-microsurgery">
      <header className="psx-hero tubular-microsurgery-hero" aria-label="Tubular microsurgery hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Tubular microsurgery</h1>
          <p className="psx-hero-subtitle">
            Minimally invasive spine surgery using tubular retractors to relieve nerve compression.
          </p>
        </div>
      </header>

      <main className="page-main treatments-page">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <ol className="article-breadcrumb-list">
            <li>
              <Link to="/" className="article-breadcrumb-link">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link to="/treatments" className="article-breadcrumb-link">
                Treatments
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Tubular microsurgery</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="tms-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/6-Chronic-Back-Pain.jpg"
                alt="Patient holding the lower back, representing chronic lumbar spine pain and nerve irritation addressed by minimally invasive spine surgery (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="tms-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Tubular microsurgery is a minimally invasive technique that reaches the spine through a small incision using a tubular
                retractor. By gently separating muscle fibres instead of stripping them away, it aims to reduce tissue trauma while
                allowing precise decompression of irritated nerves.
              </p>
              <p className="treatments-feature-body">
                You will typically have a detailed review of symptoms and imaging (MRI/CT) to confirm the pain generator. On the day of
                surgery, the team explains the plan, anaesthesia options, and the immediate post‑operative milestones such as walking,
                pain control, and discharge criteria.
              </p>
              <p className="treatments-feature-body">
                Recovery focuses on safe mobility, wound care, and progressive return to activity. Rehabilitation may include walking
                progression and structured physiotherapy to rebuild strength and confidence in movement.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/spine-surgery/tubular-microsurgery"
                  className="treatment-card-button"
                  aria-label="Learn more about tubular microsurgery in our blog"
                >
                  <span>Learn More About Tubular Microsurgery</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="tms-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="tms-details-title" className="minimally-invasive-treatment-details-title">
              Tubular microsurgery: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              The aim is to decompress the affected nerve root (or spinal canal) while limiting disruption to surrounding tissues.
              Suitability depends on diagnosis, anatomy, and imaging findings.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="tms-technique-title">
              <h3 id="tms-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Through a small incision, dilators create a working corridor and a tubular retractor maintains access. Using magnification
                and specialised instruments, the surgeon decompresses the nerve by removing the compressing structure (for example,
                disc material or bone) while preserving stabilising tissues where possible.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="tms-benefits-title">
              <h3 id="tms-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of tubular microsurgery">
                <li>Targets nerve compression to reduce leg/arm pain and improve function.</li>
                <li>Smaller incision and less muscle disruption than traditional open approaches.</li>
                <li>Often supports earlier mobilisation and a faster return to daily activities.</li>
                <li>Preserves stabilising structures when clinically appropriate.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="tms-steps-title">
              <h3 id="tms-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Tubular microsurgery procedural steps">
                <li>Pre‑operative planning and imaging review to confirm surgical level and target.</li>
                <li>Anaesthesia and positioning to protect nerves and pressure points.</li>
                <li>Small incision and progressive dilation to place the tubular retractor.</li>
                <li>Microsurgical decompression of the nerve/spinal canal as indicated.</li>
                <li>Closure, early mobilisation, discharge planning, and follow‑up scheduling.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="tms-risks-title">
              <h3 id="tms-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                All surgery carries risk. Your team will explain your personalised risk profile based on diagnosis, anatomy, and health
                factors.
              </p>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of tubular microsurgery">
                <li>Bleeding, infection, wound healing issues.</li>
                <li>Nerve irritation or injury, numbness, or weakness (rare but important).</li>
                <li>Dural tear and cerebrospinal fluid leak.</li>
                <li>Recurrence of symptoms or need for further treatment.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="tms-prep-title">
              <h3 id="tms-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for tubular microsurgery">
                <li>Bring imaging and a medication list; discuss blood thinners and diabetes control early.</li>
                <li>Follow fasting and pre‑op instructions and arrange transport/support for discharge.</li>
                <li>Keep the wound clean and dry as advised; monitor for fever, redness, or drainage.</li>
                <li>Walk regularly and follow activity restrictions and physiotherapy guidance.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="tms-recovery-title">
              <h3 id="tms-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many patients mobilise the same day. Pain often improves over weeks as inflammation settles. Return to work and sport
                depends on the procedure performed, job demands, and rehabilitation progress.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments">
          <TreatmentsMain hideMinimallyInvasive hideNonInvasive />
        </div>
      </main>
    </div>
  );
};

export default TubularMicrosurgeryPage;
