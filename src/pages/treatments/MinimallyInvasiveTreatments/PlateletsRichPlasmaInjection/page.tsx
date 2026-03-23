import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './PlateletsRichPlasmaInjection.css';

const PlateletsRichPlasmaInjectionPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle =
      'Platelet-rich plasma (PRP) injection in Algarve | Regenerative pain care';
    document.title = pageTitle;

    const description =
      'Discover platelet-rich plasma (PRP) injections in Algarve for joints, tendons, and ligaments. Regenerative treatment with specialist assessment and booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/medical/1-platelets-plasma-injection.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page platelets-rich-plasma-injection-page" id="psx-platelets-rich-plasma-injection">
      <header className="psx-hero platelets-rich-plasma-injection-hero" aria-label="Platelet-rich plasma injection hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Platelets rich plasma injection</h1>
          <p className="psx-hero-subtitle">
            Concentrated platelets from your own blood support tissue healing and pain relief.
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
            <li aria-current="page">Platelets rich plasma injection</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="prp-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/medical/1-platelets-plasma-injection.jpg"
                alt="Platelet-rich plasma (PRP) preparation for injection used in regenerative medicine for joints, tendons, and ligaments (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="prp-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Platelet‑rich plasma (PRP) uses a concentrated portion of your own blood (platelets and growth factors) placed into a
                target tissue to support healing in selected tendon, ligament, or joint conditions. Evidence and expected response vary by
                diagnosis, which is why careful assessment matters.
              </p>
              <p className="treatments-feature-body">
                The appointment usually includes a review of symptoms, examination, and imaging where needed. Blood is drawn, processed to
                concentrate platelets, then injected into the target region—often with ultrasound guidance for accuracy.
              </p>
              <p className="treatments-feature-body">
                Aftercare typically involves short relative rest followed by a structured graded loading and rehabilitation plan. This
                combination is often central to longer‑term improvement.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/interventional-pain/prp-injection" className="treatment-card-button" aria-label="Learn more about PRP injection in our blog">
                  <span>Learn More About PRP Injection</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="prp-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="prp-details-title" className="minimally-invasive-treatment-details-title">
              PRP injection: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              PRP is usually an adjunct to rehabilitation, not a replacement for it. Your clinician will explain whether PRP is appropriate
              for your condition and what outcomes are realistic.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-technique-title">
              <h3 id="prp-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Blood is processed to concentrate platelets, then PRP is injected into the target tissue. Platelets release growth factors
                that may influence the local healing response in selected conditions.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-benefits-title">
              <h3 id="prp-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of PRP injection">
                <li>May support gradual symptom improvement in selected tendon and joint problems.</li>
                <li>Uses your own blood components; serious complications are uncommon.</li>
                <li>Often improves tolerance to rehabilitation progressions when combined with a graded plan.</li>
                <li>Outpatient procedure with a short appointment time.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-steps-title">
              <h3 id="prp-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="PRP injection procedural steps">
                <li>Assessment, target selection, and explanation of expected outcomes.</li>
                <li>Blood draw and processing to concentrate platelets.</li>
                <li>Skin preparation and local anaesthetic (case‑dependent).</li>
                <li>Injection into the target area, often under ultrasound guidance.</li>
                <li>Aftercare plan and rehabilitation schedule for the following weeks.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-risks-title">
              <h3 id="prp-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of PRP injection">
                <li>Soreness or temporary pain flare.</li>
                <li>Bruising, bleeding, or infection (rare).</li>
                <li>Incomplete relief if the diagnosis or target is not correct.</li>
                <li>Post‑procedure stiffness if activity progression is not followed appropriately.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-prep-title">
              <h3 id="prp-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for PRP injection">
                <li>Bring medication list; ask about anti‑inflammatory medicine guidance around the procedure.</li>
                <li>Plan relative rest for 24–48 hours, then follow a graded loading plan.</li>
                <li>Monitor for fever, spreading redness, or severe worsening pain.</li>
                <li>Schedule rehabilitation follow‑up and track functional changes over time.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-recovery-title">
              <h3 id="prp-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                PRP response is typically gradual over weeks to months. Progress is best tracked through function and load tolerance rather
                than pain alone, alongside a structured rehabilitation programme.
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

export default PlateletsRichPlasmaInjectionPage;
