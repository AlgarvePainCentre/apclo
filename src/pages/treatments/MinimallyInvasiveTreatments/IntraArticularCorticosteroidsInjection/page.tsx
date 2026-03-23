import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './IntraArticularCorticosteroidsInjection.css';

const IntraArticularCorticosteroidsInjectionPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle =
      'Intra‑articular corticosteroid injection in Algarve | Joint pain relief';
    document.title = pageTitle;

    const description =
      'Learn about intra‑articular corticosteroid injections in Algarve for knee, hip, or shoulder pain. Image‑guided, safe dosing, and easy consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Knee-Pain-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page intra-articular-corticosteroids-injection-page" id="psx-intra-articular-corticosteroids-injection">
      <header className="psx-hero intra-articular-corticosteroids-injection-hero" aria-label="Intra-articular corticosteroid injection hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Intra-articular corticosteroids injection</h1>
          <p className="psx-hero-subtitle">
            Image-guided steroid injections reduce inflammation inside painful joints.
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
            <li aria-current="page">Intra-articular corticosteroids injection</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="iacsi-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Knee-Pain-min.jpg"
                alt="Image representing knee joint pain that may be treated with an image-guided intra-articular corticosteroid injection (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="iacsi-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Intra‑articular corticosteroid injections place anti‑inflammatory medication directly into a joint. They are used to reduce
                inflammation and pain in selected conditions such as osteoarthritis flare‑ups or inflammatory joint irritation.
              </p>
              <p className="treatments-feature-body">
                Your clinician will review your symptoms, medical history, and imaging where appropriate. Image guidance (often ultrasound)
                can improve accuracy, particularly in deeper joints. The goal is to reduce pain so you can restore movement and progress a
                rehabilitation plan.
              </p>
              <p className="treatments-feature-body">
                Aftercare focuses on protecting the joint for a short period, monitoring for side effects, and combining symptom relief
                with strengthening and load management to improve longer‑term outcomes.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/interventional-pain/intra-articular-corticosteroid-injection"
                  className="treatment-card-button"
                  aria-label="Learn more about intra-articular corticosteroid injections in our blog"
                >
                  <span>Learn More About Corticosteroid Injections</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="iacsi-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="iacsi-details-title" className="minimally-invasive-treatment-details-title">
              Intra‑articular corticosteroid injection: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Steroid injections can be helpful for short‑term symptom reduction in selected scenarios. Your clinician will discuss dosing,
              frequency, and whether another approach is more appropriate for your diagnosis.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-technique-title">
              <h3 id="iacsi-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                After skin preparation and local anaesthetic, a needle is placed into the joint (often under ultrasound guidance) and
                medication is injected to reduce inflammation. Some clinicians also inject a small amount of local anaesthetic.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-benefits-title">
              <h3 id="iacsi-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of intra-articular corticosteroid injections">
                <li>Can reduce pain and inflammation in selected joint conditions.</li>
                <li>May improve sleep, mobility, and ability to participate in rehabilitation.</li>
                <li>Outpatient, minimally invasive procedure with a short appointment time.</li>
                <li>Can be part of a broader plan including exercise therapy and load management.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-steps-title">
              <h3 id="iacsi-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Intra-articular corticosteroid injection procedural steps">
                <li>Clinical assessment and confirmation of target joint.</li>
                <li>Skin cleaning and local anaesthetic.</li>
                <li>Needle placement (often with ultrasound guidance).</li>
                <li>Medication injection and short observation period.</li>
                <li>Aftercare instructions and rehabilitation planning.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-risks-title">
              <h3 id="iacsi-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of intra-articular corticosteroid injections">
                <li>Temporary soreness or a short‑term pain flare.</li>
                <li>Infection, bleeding, bruising (uncommon).</li>
                <li>Transient rise in blood sugar in people with diabetes.</li>
                <li>Skin colour change or tissue thinning near the injection site (uncommon).</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-prep-title">
              <h3 id="iacsi-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for intra-articular corticosteroid injections">
                <li>Bring a medication list; discuss blood thinners and diabetes management as needed.</li>
                <li>Avoid high‑load activity for a short period and follow guidance on gradual return.</li>
                <li>Watch for fever, increasing redness, or worsening pain after the injection.</li>
                <li>Use the symptom relief window to progress strengthening and movement goals.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-recovery-title">
              <h3 id="iacsi-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people resume normal daily activities quickly. Relief may occur within days, while longer‑term improvement depends on
                rehabilitation and addressing contributing factors such as strength, mobility, and load management.
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

export default IntraArticularCorticosteroidsInjectionPage;
