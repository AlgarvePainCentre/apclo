import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Hydrodistention.css';

const HydrodistentionPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Hydrodistention in Algarve | Gentle joint stretching for stiffness';
    document.title = pageTitle;

    const description =
      'Learn about hydrodistention in Algarve for frozen shoulder or joint stiffness. Image‑guided joint stretching, pain relief, and easy consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Shoulder-Pain-min-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page hydrodistention-page" id="psx-hydrodistention">
      <header className="psx-hero hydrodistention-hero" aria-label="Hydrodistention hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Hydrodistention</h1>
          <p className="psx-hero-subtitle">
            Gentle joint stretching with fluid can improve movement and reduce stiffness.
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
            <li aria-current="page">Hydrodistention</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="hd-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Shoulder-Pain-min-1.jpg"
                alt="Image representing frozen shoulder stiffness and pain that may be treated with image-guided hydrodistention combined with physiotherapy (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="hd-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Hydrodistention (also called capsular distension) is an image‑guided procedure often used for frozen shoulder (adhesive
                capsulitis). Fluid is gently injected to stretch the joint capsule and reduce painful restriction, helping restore movement.
              </p>
              <p className="treatments-feature-body">
                Your clinician confirms the diagnosis, reviews the phase of frozen shoulder, and explains expected results. Hydrodistention
                is typically combined with physiotherapy to translate improved capsule stretch into lasting mobility and strength gains.
              </p>
              <p className="treatments-feature-body">
                After the procedure, you may notice temporary soreness. Early guided movement is important—your team will outline home
                exercises and a plan for follow‑up therapy.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/interventional-pain/hydrodistention" className="treatment-card-button" aria-label="Learn more about hydrodistention in our blog">
                  <span>Learn More About Hydrodistention</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="hd-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="hd-details-title" className="minimally-invasive-treatment-details-title">
              Hydrodistention: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Hydrodistention can reduce pain and improve shoulder mobility in selected frozen shoulder cases. Your clinician will confirm
              suitability and coordinate the therapy plan that follows.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-technique-title">
              <h3 id="hd-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Under ultrasound or fluoroscopic guidance, a needle is placed into the shoulder joint. Fluid is introduced to gently
                distend the capsule; medication may be included depending on the plan and clinical judgement.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-benefits-title">
              <h3 id="hd-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of hydrodistention">
                <li>Can improve shoulder movement and reduce pain in selected frozen shoulder cases.</li>
                <li>Image guidance improves accuracy and comfort.</li>
                <li>Outpatient, minimally invasive approach with short procedural time.</li>
                <li>Supports physiotherapy by creating a better starting point for mobility work.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-steps-title">
              <h3 id="hd-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Hydrodistention procedural steps">
                <li>Assessment to confirm frozen shoulder and define goals.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle placement into the joint under imaging guidance.</li>
                <li>Controlled capsular distension with fluid.</li>
                <li>Immediate post‑procedure mobility guidance and therapy plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-risks-title">
              <h3 id="hd-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of hydrodistention">
                <li>Short‑term pain flare or soreness.</li>
                <li>Bleeding, bruising, or infection (uncommon).</li>
                <li>Temporary dizziness or fainting in some patients.</li>
                <li>Incomplete improvement without a structured physiotherapy plan.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-prep-title">
              <h3 id="hd-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for hydrodistention">
                <li>Bring a medication list; discuss blood thinners and diabetes management as needed.</li>
                <li>Plan gentle activity immediately after and schedule physiotherapy sessions.</li>
                <li>Follow home exercises to maintain range of motion improvements.</li>
                <li>Monitor for fever, spreading redness, or severe worsening pain.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-recovery-title">
              <h3 id="hd-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people resume daily activities quickly. Mobility gains are best maintained through early, consistent physiotherapy over
                the following weeks.
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

export default HydrodistentionPage;
