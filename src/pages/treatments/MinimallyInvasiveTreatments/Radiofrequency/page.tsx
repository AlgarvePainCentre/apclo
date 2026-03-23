import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Radiofrequency.css';

const RadiofrequencyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Radiofrequency ablation in Algarve | Targeted nerve pain relief';
    document.title = pageTitle;

    const description =
      'Discover radiofrequency ablation in Algarve for chronic neck or back pain. Image‑guided, minimally invasive, and easy to book for consultation.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/3-Facet-Joint-Pain.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page radiofrequency-page" id="psx-radiofrequency">
      <header className="psx-hero radiofrequency-hero" aria-label="Radiofrequency ablation hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Radiofrequency</h1>
          <p className="psx-hero-subtitle">
            Targeted radiofrequency reduces pain by calming overactive nerves.
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
            <li aria-current="page">Radiofrequency</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="rfa-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/3-Facet-Joint-Pain.jpg"
                alt="Illustration representing facet joint pain and the targeted nerve pathways treated with radiofrequency ablation (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="rfa-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Radiofrequency ablation (RFA) is an image‑guided technique that reduces pain signals from selected nerves. It is commonly
                used for spine‑related facet joint pain after a structured assessment and confirmatory diagnostic blocks.
              </p>
              <p className="treatments-feature-body">
                The pathway often includes a consultation, imaging review, and diagnostic injections to confirm the target. If the test
                blocks provide meaningful temporary relief, RFA may offer longer‑lasting symptom reduction for suitable patients.
              </p>
              <p className="treatments-feature-body">
                After the procedure, most people resume light activities quickly. Rehabilitation focuses on restoring movement capacity and
                building a plan to reduce flare‑ups and improve resilience.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/interventional-pain/radiofrequency-ablation"
                  className="treatment-card-button"
                  aria-label="Learn more about radiofrequency ablation in our blog"
                >
                  <span>Learn More About Radiofrequency Ablation</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="rfa-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="rfa-details-title" className="minimally-invasive-treatment-details-title">
              Radiofrequency ablation: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              RFA is most effective when the pain generator and target nerves are clearly identified. Your clinician will explain whether
              the goal is to treat facet joint pain, sacroiliac pain, or other selected indications.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-technique-title">
              <h3 id="rfa-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A specialised needle is positioned under imaging guidance next to the target nerve. Controlled radiofrequency energy is
                applied to interrupt pain signalling. The nerve can regenerate over time, which is why results are not permanent.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-benefits-title">
              <h3 id="rfa-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of radiofrequency ablation">
                <li>Can reduce chronic spine‑related pain in appropriately selected patients.</li>
                <li>Often improves activity tolerance and reduces flare frequency when combined with rehabilitation.</li>
                <li>Outpatient, minimally invasive procedure with small skin entry points.</li>
                <li>May reduce reliance on medication for some people.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-steps-title">
              <h3 id="rfa-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Radiofrequency ablation procedural steps">
                <li>Assessment and diagnostic blocks to confirm the target when indicated.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle placement under imaging guidance.</li>
                <li>Test stimulation and controlled lesioning of the target nerve.</li>
                <li>Observation, discharge advice, and rehabilitation follow‑up plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-risks-title">
              <h3 id="rfa-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of radiofrequency ablation">
                <li>Temporary soreness or a short‑term pain flare.</li>
                <li>Bruising, bleeding, or infection at the needle site (uncommon).</li>
                <li>Numbness, tingling, or nerve irritation (usually temporary).</li>
                <li>Incomplete relief if the pain generator is different from the target.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-prep-title">
              <h3 id="rfa-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for radiofrequency ablation">
                <li>Bring a medication list; discuss blood thinners and diabetes management ahead of time.</li>
                <li>Arrange transport if sedation is used.</li>
                <li>Follow guidance on activity for the first 24–48 hours and resume movement gradually.</li>
                <li>Track functional improvements (walking, sitting tolerance) as well as pain levels.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-recovery-title">
              <h3 id="rfa-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Most people return to light activities quickly. Benefits may build over days to weeks. Your clinician will advise how to
                progress exercise and rehabilitation for longer‑term improvement.
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

export default RadiofrequencyPage;
