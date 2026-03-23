import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Osteopathy.css';

const OsteopathyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Osteopathy in Algarve | Gentle manual therapy for spine and joints';
    document.title = pageTitle;

    const description =
      'Learn about osteopathy in Algarve for back pain, posture, and joint stiffness. Gentle hands‑on care and easy consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Osteopathy-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page osteopathy-page" id="psx-osteopathy">
      <header className="psx-hero osteopathy-hero" aria-label="Osteopathy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Osteopathy</h1>
          <p className="psx-hero-subtitle">
            Hands-on techniques aim to restore balance in joints, muscles and posture.
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
            <li aria-current="page">Osteopathy</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ost-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Osteopathy-min.jpg"
                alt="Hands-on musculoskeletal assessment and manual therapy techniques used in osteopathy care (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ost-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Osteopathy combines hands‑on assessment with movement advice and an active home plan. Sessions aim to reduce pain, improve
                mobility, and build confidence with daily activities. The best results are typically achieved when treatment supports an
                exercise programme rather than replacing it.
              </p>
              <p className="treatments-feature-body">
                Your clinician will take a detailed history and perform a physical assessment of movement, strength, and how symptoms behave.
                Hands‑on techniques may be used when appropriate, alongside education and practical strategies for posture, work demands, and
                activity pacing.
              </p>
              <p className="treatments-feature-body">
                After your visit, you’ll usually have simple mobility or strengthening exercises to practise between sessions. Follow‑up is
                used to reassess progress and safely increase activity tolerance.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/osteopathy" className="treatment-card-button" aria-label="Learn more about osteopathy in our blog">
                  <span>Learn More About Osteopathy</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ost-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ost-details-title" className="minimally-invasive-treatment-details-title">
              Osteopathy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Osteopathy is typically part of a broader plan that includes movement progression, sleep and stress strategies when relevant,
              and collaboration with other clinicians for complex cases.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-technique-title">
              <h3 id="ost-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Osteopathy uses manual assessment and selected hands‑on techniques to influence joint mobility and muscle tone, combined with
                education and exercise to build longer‑term capacity. Treatment is tailored to the individual’s presentation and goals.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-benefits-title">
              <h3 id="ost-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of osteopathy">
                <li>May reduce pain and improve movement confidence in selected musculoskeletal problems.</li>
                <li>Hands‑on care can support short‑term symptom relief for some people.</li>
                <li>Education and home exercises support longer‑term functional gains.</li>
                <li>Integrates well with physiotherapy, exercise therapy, and medical review when needed.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-steps-title">
              <h3 id="ost-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Osteopathy session steps">
                <li>History and screening for red flags or referral needs.</li>
                <li>Movement assessment and identification of contributing factors.</li>
                <li>Hands‑on treatment where appropriate.</li>
                <li>Exercise plan and practical strategies for daily activities.</li>
                <li>Follow‑up reassessment and progression of the plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-risks-title">
              <h3 id="ost-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of osteopathy">
                <li>Temporary soreness or symptom flare after hands‑on work.</li>
                <li>Bruising or mild discomfort with manual techniques (uncommon).</li>
                <li>Injury risk if techniques are inappropriate for the condition (screening reduces this risk).</li>
                <li>Delayed diagnosis if red flags are missed; seek review for worsening or unusual symptoms.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-prep-title">
              <h3 id="ost-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for osteopathy">
                <li>Bring a medication list and any relevant imaging or reports.</li>
                <li>Wear comfortable clothing for movement assessment.</li>
                <li>Follow the home programme consistently and track functional change.</li>
                <li>Seek medical advice for red flags such as fever, unexplained weight loss, or progressive neurological symptoms.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-recovery-title">
              <h3 id="ost-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people feel short‑term symptom change within days, while longer‑term improvement depends on consistent exercise and
                activity progression over weeks to months.
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

export default OsteopathyPage;
