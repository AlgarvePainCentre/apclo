import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Nucleoplasty.css';

const NucleoplastyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Nucleoplasty in Algarve | Minimally invasive disc decompression';
    document.title = pageTitle;

    const description =
      'Explore nucleoplasty in Algarve for contained disc herniation and back or leg pain. Minimally invasive, image‑guided, and consultation‑ready.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/4-disc-problems.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page nucleoplasty-page" id="psx-nucleoplasty">
      <header className="psx-hero nucleoplasty-hero" aria-label="Nucleoplasty hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Nucleoplasty</h1>
          <p className="psx-hero-subtitle">
            Minimally invasive disc decompression reduces pressure on nerves causing back pain.
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
            <li aria-current="page">Nucleoplasty</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="np-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/4-disc-problems.jpg"
                alt="Illustration of a spinal disc problem and nerve compression patterns treated with minimally invasive disc decompression such as nucleoplasty (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="np-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Nucleoplasty is an image‑guided, minimally invasive disc decompression technique used for carefully selected disc patterns.
                It aims to reduce pressure within the disc and relieve irritation of nearby nerves—often for leg‑dominant symptoms rather
                than isolated back pain.
              </p>
              <p className="treatments-feature-body">
                Suitability depends on symptoms, neurological findings, and imaging. Your clinician will explain whether the disc problem is
                contained, whether there are warning signs that require other treatment, and what outcomes are realistic for your case.
              </p>
              <p className="treatments-feature-body">
                Recovery typically emphasises early walking, gradual return to activity, and a rehabilitation plan to restore capacity and
                reduce recurrence risk.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/interventional-pain/nucleoplasty" className="treatment-card-button" aria-label="Learn more about nucleoplasty in our blog">
                  <span>Learn More About Nucleoplasty</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="np-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="np-details-title" className="minimally-invasive-treatment-details-title">
              Nucleoplasty: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Nucleoplasty is not suitable for all disc herniations. A precise diagnosis and the right disc pattern are essential for safe,
              effective care.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="np-technique-title">
              <h3 id="np-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A small probe is guided into the disc under imaging. Energy is used to remove a small amount of disc material, reducing
                internal disc pressure in selected cases and potentially easing nerve irritation.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-benefits-title">
              <h3 id="np-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of nucleoplasty">
                <li>May improve leg‑dominant symptoms in selected contained disc patterns.</li>
                <li>Minimally invasive outpatient procedure in many settings.</li>
                <li>Small skin entry point and a recovery plan focused on early mobility.</li>
                <li>Can complement rehabilitation and movement restoration strategies.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-steps-title">
              <h3 id="np-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Nucleoplasty procedural steps">
                <li>Assessment and imaging review to confirm disc pattern and suitability.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle and probe placement under imaging guidance.</li>
                <li>Disc decompression with controlled energy application.</li>
                <li>Aftercare advice and rehabilitation plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-risks-title">
              <h3 id="np-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of nucleoplasty">
                <li>Temporary soreness or pain flare.</li>
                <li>Bleeding, infection, or nerve irritation (uncommon).</li>
                <li>Persistent symptoms if the pain generator is not the disc or the pattern is unsuitable.</li>
                <li>Need for additional treatment if symptoms progress or neurological signs develop.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-prep-title">
              <h3 id="np-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for nucleoplasty">
                <li>Bring imaging and medication list; discuss blood thinners and red‑flag symptoms.</li>
                <li>Arrange transport if sedation is used.</li>
                <li>Follow lifting and activity guidance in early recovery.</li>
                <li>Progress walking and rehabilitation to rebuild capacity and prevent recurrence.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-recovery-title">
              <h3 id="np-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people return to light activity quickly, with gradual improvement over weeks. The best outcomes are typically supported
                by a structured rehabilitation plan.
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

export default NucleoplastyPage;
