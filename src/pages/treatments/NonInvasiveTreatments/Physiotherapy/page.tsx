import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Physiotherapy.css';

const PhysiotherapyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Physiotherapy in Algarve | Individual spine and joint rehab plans';
    document.title = pageTitle;

    const description =
      'Discover physiotherapy in Algarve for back, neck, and joint pain. Hands‑on care, exercise plans, and simple online consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Physiotherapy-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page physiotherapy-page" id="psx-physiotherapy">
      <header className="psx-hero physiotherapy-hero" aria-label="Physiotherapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Physiotherapy</h1>
          <p className="psx-hero-subtitle">
            Movement, strengthening and manual therapy support long-term recovery and mobility.
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
            <li aria-current="page">Physiotherapy</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="pt-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Physiotherapy-min.jpg"
                alt="Physiotherapy assessment and exercise-based rehabilitation for spine and joint pain (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="pt-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Physiotherapy combines assessment, education, and a graded movement plan to improve function and reduce pain interference.
                Treatment is built around your goals—walking, stairs, work tolerance, sport, or everyday tasks—rather than a one‑size‑fits‑all
                set of exercises.
              </p>
              <p className="treatments-feature-body">
                A session usually includes a detailed history, movement and strength testing, and a plan you can follow between visits.
                Hands‑on techniques may be used as an adjunct, but long‑term improvements usually depend on progressive exercise, pacing, and
                confidence with movement.
              </p>
              <p className="treatments-feature-body">
                After sessions, you’ll have home exercises and clear guidance on what levels of discomfort are acceptable. Your plan is
                adjusted over time based on measurable progress, flare patterns, and what matters most to you.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/physiotherapy" className="treatment-card-button" aria-label="Learn more about physiotherapy in our blog">
                  <span>Learn More About Physiotherapy</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="pt-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="pt-details-title" className="minimally-invasive-treatment-details-title">
              Physiotherapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Physiotherapy is a progressive process. The focus is safe exposure to movement, improved strength and endurance, and better
              self‑management—often alongside medical care when needed.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-technique-title">
              <h3 id="pt-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Physiotherapy uses assessment findings to create a graded programme of mobility, strength, and conditioning. Education and
                pacing strategies reduce flare cycles, while targeted exercise improves tissue capacity and nervous system tolerance.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-benefits-title">
              <h3 id="pt-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of physiotherapy">
                <li>Improved function, confidence, and activity tolerance over time.</li>
                <li>Reduced pain interference and better flare‑up management strategies.</li>
                <li>Strength, balance, and endurance improvements that protect long‑term mobility.</li>
                <li>Supports recovery after procedures or surgery with structured progression.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-steps-title">
              <h3 id="pt-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Physiotherapy steps">
                <li>History and screening for red flags or referral needs.</li>
                <li>Movement, strength, and functional assessment.</li>
                <li>Shared goals and an initial programme with safe starting dose.</li>
                <li>Progression rules and a flare‑up plan.</li>
                <li>Reassessment and updates as capacity improves.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-risks-title">
              <h3 id="pt-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of physiotherapy">
                <li>Temporary symptom increase after new exercises or manual therapy.</li>
                <li>Delayed onset muscle soreness with strength work (normal and usually short‑lived).</li>
                <li>Injury risk if exercises progress too quickly without guidance.</li>
                <li>Persistent symptoms if underlying diagnosis requires medical review or imaging.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-prep-title">
              <h3 id="pt-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for physiotherapy">
                <li>Wear comfortable clothing and bring supportive footwear if relevant.</li>
                <li>Bring a medication list and any relevant imaging or reports.</li>
                <li>Follow home exercises consistently; small, frequent practice works best.</li>
                <li>Report new neurological symptoms or red flags for prompt medical review.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-recovery-title">
              <h3 id="pt-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people notice early improvements in confidence and movement within weeks. Strength and capacity gains typically build
                over weeks to months, supported by progressive loading and consistent practice.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments">
          <TreatmentsMain hideSurgical hideMinimallyInvasive />
        </div>
      </main>
    </div>
  );
};

export default PhysiotherapyPage;
