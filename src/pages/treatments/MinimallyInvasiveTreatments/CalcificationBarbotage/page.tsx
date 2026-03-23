import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './CalcificationBarbotage.css';

const CalcificationBarbotagePage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Calcification barbotage in Algarve | Ultrasound‑guided tendon care';
    document.title = pageTitle;

    const description =
      'Discover ultrasound‑guided calcification barbotage in Algarve for shoulder or tendon pain. Break up calcium deposits and book a specialist assessment.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/shoulder-pain-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page calcification-barbotage-page" id="psx-calcification-barbotage">
      <header className="psx-hero calcification-barbotage-hero" aria-label="Calcification barbotage hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Calcification barbotage</h1>
          <p className="psx-hero-subtitle">
            Ultrasound-guided needling helps break up and remove painful tendon calcifications.
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
            <li aria-current="page">Calcification barbotage</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="cb-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/shoulder-pain-min.jpg"
                alt="Image representing shoulder tendon pain and calcific tendinopathy treated with ultrasound-guided calcification barbotage (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="cb-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Calcification barbotage (also called needling and lavage) is an ultrasound‑guided procedure used for selected painful
                calcium deposits in tendons—most commonly in the shoulder (rotator cuff). The goal is to reduce pain and improve movement
                by breaking up and washing out the deposit where appropriate.
              </p>
              <p className="treatments-feature-body">
                Your clinician confirms the diagnosis with ultrasound and reviews symptoms, movement, and goals. The procedure is typically
                performed with local anaesthetic, and rehabilitation afterward is important to restore shoulder function and reduce
                recurrence risk.
              </p>
              <p className="treatments-feature-body">
                Aftercare often includes relative rest initially, then a structured return to mobility and strengthening. Your team will
                advise how to manage soreness and when to restart physiotherapy exercises.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/interventional-pain/calcification-barbotage"
                  className="treatment-card-button"
                  aria-label="Learn more about calcification barbotage in our blog"
                >
                  <span>Learn More About Calcification Barbotage</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="cb-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="cb-details-title" className="minimally-invasive-treatment-details-title">
              Calcification barbotage: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Barbotage is not required for every calcification. Your clinician will explain whether your deposit type and symptoms make
              you a good candidate and what alternatives exist.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-technique-title">
              <h3 id="cb-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Using ultrasound guidance, a needle is placed into the calcium deposit. The deposit may be fragmented and flushed with
                saline (lavage). Some cases include a small medication injection afterward, depending on clinical judgement.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-benefits-title">
              <h3 id="cb-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of calcification barbotage">
                <li>Can reduce pain and improve shoulder function in selected calcific tendinopathy cases.</li>
                <li>Ultrasound guidance improves accuracy and visualises the deposit during treatment.</li>
                <li>Minimally invasive outpatient procedure with a short recovery focus.</li>
                <li>Often helps people engage in rehabilitation and restore normal movement patterns.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-steps-title">
              <h3 id="cb-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Calcification barbotage procedural steps">
                <li>Ultrasound confirmation of deposit location and suitability.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle placement into the deposit under ultrasound guidance.</li>
                <li>Fragmentation and lavage where appropriate, then removal of needle.</li>
                <li>Aftercare advice and rehabilitation plan for shoulder mobility and strength.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-risks-title">
              <h3 id="cb-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of calcification barbotage">
                <li>Post‑procedure soreness or flare.</li>
                <li>Bleeding, bruising, or infection (uncommon).</li>
                <li>Temporary stiffness; rehabilitation is important to regain motion.</li>
                <li>Incomplete symptom relief if the pain source is not primarily the calcification.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-prep-title">
              <h3 id="cb-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for calcification barbotage">
                <li>Bring imaging and a medication list; discuss blood thinners if applicable.</li>
                <li>Plan lighter activity for 24–48 hours and follow guidance for gradual return.</li>
                <li>Follow wound care guidance and watch for fever or worsening redness.</li>
                <li>Resume physiotherapy as advised to rebuild shoulder strength and control.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-recovery-title">
              <h3 id="cb-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Most people return to daily activities quickly. Improvement continues over weeks as pain settles and shoulder mechanics
                improve through rehabilitation.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments">
          <TreatmentsMain hideSurgical hideNonInvasive />
        </div>
      </main>
    </div>
  );
};

export default CalcificationBarbotagePage;
