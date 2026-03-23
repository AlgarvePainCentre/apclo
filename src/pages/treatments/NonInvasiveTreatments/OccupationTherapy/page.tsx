import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './OccupationTherapy.css';

const OccupationTherapyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Occupational therapy in Algarve | Daily activity and independence support';
    document.title = pageTitle;

    const description =
      'Explore occupational therapy in Algarve to improve daily activities, adapt your environment, and plan your recovery. Book a supportive consultation today.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Occupational-Therapy-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page occupation-therapy-page" id="psx-occupation-therapy">
      <header className="psx-hero occupation-therapy-hero" aria-label="Occupational therapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Occupational therapy</h1>
          <p className="psx-hero-subtitle">
            Practical strategies help you manage daily activities more comfortably and independently.
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
            <li aria-current="page">Occupational therapy</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ot-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Occupational-Therapy-min.jpg"
                alt="Occupational therapy support for daily activities, independence, and home safety planning (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ot-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Occupational therapy focuses on helping you do everyday tasks more safely and independently. It can support recovery after
                illness or injury, improve confidence at home, and reduce fatigue and falls risk through practical strategies and
                environment adaptations.
              </p>
              <p className="treatments-feature-body">
                Your therapist will ask about your daily routine and goals—washing, dressing, cooking, mobility, work tasks—and assess how
                symptoms, strength, balance, or cognition affect function. The plan may include training, pacing, equipment advice, and
                home safety recommendations.
              </p>
              <p className="treatments-feature-body">
                After sessions, you’ll receive a clear action plan: exercises or task practice, recommendations for home set‑up, and
                guidance for carers when relevant.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/rehabilitation-therapies/occupational-therapy"
                  className="treatment-card-button"
                  aria-label="Learn more about occupational therapy in our blog"
                >
                  <span>Learn More About Occupational Therapy</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ot-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ot-details-title" className="minimally-invasive-treatment-details-title">
              Occupational therapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Occupational therapy is goal‑based and highly practical. Your therapist will tailor strategies to your environment, symptoms,
              and independence goals.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-technique-title">
              <h3 id="ot-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Occupational therapy analyses tasks and identifies barriers (strength, balance, pain, fatigue, cognition, or environment).
                The therapist then adapts tasks, introduces equipment, and trains strategies to improve safety and independence.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-benefits-title">
              <h3 id="ot-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of occupational therapy">
                <li>Improved independence with daily activities and safer mobility at home.</li>
                <li>Reduced falls risk through environment changes and practical training.</li>
                <li>Better fatigue and pain pacing through sustainable routines.</li>
                <li>Support for carers and coordinated rehabilitation goals.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-steps-title">
              <h3 id="ot-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Occupational therapy steps">
                <li>Assessment of goals, daily routine, and safety risks.</li>
                <li>Functional testing of tasks (transfers, dressing, kitchen tasks) as appropriate.</li>
                <li>Home or environment review and equipment recommendations.</li>
                <li>Training in strategies: pacing, energy conservation, safe movement patterns.</li>
                <li>Review and progression as independence improves.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-risks-title">
              <h3 id="ot-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of occupational therapy">
                <li>Temporary fatigue after challenging task practice.</li>
                <li>Short‑term soreness if activity increases too quickly.</li>
                <li>Falls risk during early training without appropriate supervision.</li>
                <li>Delayed progress if equipment or home changes are not implemented.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-prep-title">
              <h3 id="ot-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for occupational therapy">
                <li>Bring a medication list and note key challenges in your daily routine.</li>
                <li>Consider photos or notes of your home set‑up if an in‑person visit is not possible.</li>
                <li>Follow pacing guidance and practice tasks consistently between sessions.</li>
                <li>Discuss falls risk, dizziness, or new neurological symptoms promptly.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-recovery-title">
              <h3 id="ot-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Improvements can start immediately with environment changes and strategies. Longer‑term gains in independence typically
                build over weeks to months with consistent practice and follow‑up.
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

export default OccupationTherapyPage;
