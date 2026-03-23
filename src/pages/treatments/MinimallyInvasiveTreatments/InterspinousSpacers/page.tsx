import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './InterspinousSpacers.css';

const InterspinousSpacersPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Interspinous spacers in Algarve | Relief for lumbar stenosis';
    document.title = pageTitle;

    const description =
      'Learn how interspinous spacers in Algarve can ease lumbar spinal stenosis, reduce leg pain, and support walking. Book a specialist consultation.';

    let meta = document.querySelector('meta[name=\"description\"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/9-radiating-pain.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page interspinous-spacers-page" id="psx-interspinous-spacers">
      <header className="psx-hero interspinous-spacers-hero" aria-label="Interspinous spacers hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Interspinous spacers</h1>
          <p className="psx-hero-subtitle">
            Small implants help keep space between vertebrae to ease nerve compression.
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
            <li aria-current="page">Interspinous spacers</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="iss-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/9-radiating-pain.jpg"
                alt="Illustration showing radiating leg pain from lumbar spinal stenosis, which may be treated with interspinous spacer implantation in selected patients (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="iss-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Interspinous spacers are small implants placed between the spinous processes (the bones you can feel at the back of the
                spine). They are designed to reduce narrowing in selected cases of lumbar spinal stenosis—especially when symptoms worsen
                with standing or walking and improve when bending forward.
              </p>
              <p className="treatments-feature-body">
                Selection is critical. Your specialist reviews symptoms, examination findings, and imaging to confirm stenosis and to
                assess stability. In some cases, decompression surgery or other treatments may be more appropriate.
              </p>
              <p className="treatments-feature-body">
                Recovery focuses on walking progression and gradual return to daily activities. A structured rehabilitation plan helps
                restore endurance and confidence while protecting the surgical site.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/spine-surgery/interspinous-spacers"
                  className="treatment-card-button"
                  aria-label="Learn more about interspinous spacers in our blog"
                >
                  <span>Learn More About Interspinous Spacers</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="iss-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="iss-details-title" className="minimally-invasive-treatment-details-title">
              Interspinous spacers: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Interspinous spacers can be useful for carefully selected people with stenosis‑related symptoms. Your surgeon will explain
              whether your spine is stable enough and whether nerve decompression is also required.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-technique-title">
              <h3 id="iss-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                The spacer is positioned between spinal bones to maintain space and reduce extension (backward bending) at the affected
                level. This can decrease pressure on nerves in certain stenosis patterns.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-benefits-title">
              <h3 id="iss-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of interspinous spacers">
                <li>May improve walking tolerance in selected lumbar stenosis presentations.</li>
                <li>Minimally invasive approach with smaller incisions than many open surgeries.</li>
                <li>Can reduce leg symptoms linked to posture‑dependent nerve compression.</li>
                <li>Often supports earlier mobilisation and rehabilitation focus.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-steps-title">
              <h3 id="iss-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Interspinous spacer procedural steps">
                <li>Assessment and imaging review to confirm level and stability.</li>
                <li>Anaesthesia and positioning.</li>
                <li>Small incision and preparation between the spinous processes.</li>
                <li>Implant placement and confirmation of position.</li>
                <li>Closure, mobilisation guidance, and follow‑up schedule.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-risks-title">
              <h3 id="iss-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of interspinous spacers">
                <li>Bleeding, infection, or wound healing issues.</li>
                <li>Persistent or recurrent symptoms if stenosis is multi‑level or the diagnosis differs.</li>
                <li>Implant migration, fracture of surrounding bone, or need for revision (uncommon but possible).</li>
                <li>Progression of degeneration or instability over time in some cases.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-prep-title">
              <h3 id="iss-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for interspinous spacers">
                <li>Bring imaging and medication list; discuss blood thinners and osteoporosis risk.</li>
                <li>Plan transport and short‑term support at home if needed.</li>
                <li>Follow wound care instructions and guidance on bending/lifting during early healing.</li>
                <li>Progress walking and physiotherapy as advised to restore function.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-recovery-title">
              <h3 id="iss-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many patients mobilise early. Improvements in walking tolerance may develop over weeks alongside rehabilitation. The team
                monitors symptoms and guides safe activity progression.
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

export default InterspinousSpacersPage;
