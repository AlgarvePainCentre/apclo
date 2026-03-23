import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Cryoblation.css';

const CryoblationPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Cryoablation in Algarve | Targeted cold therapy for nerve pain';
    document.title = pageTitle;

    const description =
      'Learn about cryoablation in Algarve for chronic nerve pain. Image‑guided cold treatment, fast recovery focus, and simple consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Thoracic-Wall-Pain-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page cryoblation-page" id="psx-cryoblation">
      <header className="psx-hero cryoblation-hero" aria-label="Cryoablation hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Cryoblation</h1>
          <p className="psx-hero-subtitle">
            Precise cold therapy is used to interrupt pain signals from targeted nerves.
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
            <li aria-current="page">Cryoblation</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="cryo-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Thoracic-Wall-Pain-min.jpg"
                alt="Image representing chest wall nerve pain patterns that may be treated with image-guided cryoablation in selected cases (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="cryo-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Cryoablation uses controlled cold to temporarily disrupt pain signalling from selected nerves. It can be considered for
                specific chronic pain patterns when the pain source and target nerves are clearly identified.
              </p>
              <p className="treatments-feature-body">
                Your clinician reviews symptoms, examination findings, and imaging, and may use diagnostic blocks to confirm the target.
                The aim is not only pain reduction, but improved function and participation in rehabilitation and activity progression.
              </p>
              <p className="treatments-feature-body">
                After the procedure, you may experience temporary soreness or numbness. Most people return to light activity quickly, with
                guidance on gradual return to exercise.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/interventional-pain/cryoablation" className="treatment-card-button" aria-label="Learn more about cryoablation in our blog">
                  <span>Learn More About Cryoablation</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="cryo-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="cryo-details-title" className="minimally-invasive-treatment-details-title">
              Cryoablation: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Cryoablation can be effective for selected nerve‑mediated pain conditions. Your clinician will confirm suitability and
              explain alternative options based on diagnosis.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-technique-title">
              <h3 id="cryo-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A probe is positioned next to the target nerve under imaging guidance. Cold is applied in controlled cycles to reduce nerve
                signalling. The nerve typically recovers over time, so effects may not be permanent.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-benefits-title">
              <h3 id="cryo-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of cryoablation">
                <li>Can reduce targeted pain in selected nerve‑mediated conditions.</li>
                <li>Minimally invasive outpatient procedure in many settings.</li>
                <li>May improve function and activity tolerance when combined with rehabilitation.</li>
                <li>Often considered when conservative care has not provided sufficient relief.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-steps-title">
              <h3 id="cryo-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Cryoablation procedural steps">
                <li>Assessment and target confirmation, sometimes with diagnostic blocks.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Probe placement under imaging guidance.</li>
                <li>Controlled cryo cycles and monitoring.</li>
                <li>Aftercare instructions, activity progression, and follow‑up plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-risks-title">
              <h3 id="cryo-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of cryoablation">
                <li>Temporary soreness, bruising, or swelling at the treatment site.</li>
                <li>Temporary numbness or altered sensation.</li>
                <li>Bleeding or infection (uncommon).</li>
                <li>Incomplete symptom relief if the pain generator differs from the target.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-prep-title">
              <h3 id="cryo-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for cryoablation">
                <li>Bring medication list; discuss blood thinners, allergies, and diabetes management as needed.</li>
                <li>Arrange transport if sedation is used.</li>
                <li>Follow activity guidance for the first 24–48 hours, then progress gradually.</li>
                <li>Continue rehabilitation and strength goals to support longer‑term improvement.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-recovery-title">
              <h3 id="cryo-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people return to normal daily activities quickly. Functional improvements develop alongside recovery and rehabilitation.
                Your team will advise when to resume sport or heavy lifting.
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

export default CryoblationPage;
