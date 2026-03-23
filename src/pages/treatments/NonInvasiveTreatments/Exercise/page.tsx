import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Exercise.css';

const ExercisePage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Exercise therapy in Algarve | Safe movement programs for pain';
    document.title = pageTitle;

    const description =
      'Discover exercise therapy in Algarve for spine, joint, and nerve pain. Graded activity plans, clear guidance, and easy consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/performance-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page exercise-page" id="psx-exercise">
      <header className="psx-hero exercise-hero" aria-label="Exercise therapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Exercise</h1>
          <p className="psx-hero-subtitle">
            Structured exercise plans help you move more, with less pain and more confidence.
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
            <li aria-current="page">Exercise</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ex-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/performance-min.jpg"
                alt="Exercise therapy and performance training used to improve strength, mobility, and confidence with movement (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ex-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Exercise therapy uses a structured, progressive plan to rebuild strength, mobility, and confidence with movement. The aim is
                improved function—walking, lifting, stairs, sport—while reducing flare‑ups through pacing and smart progression.
              </p>
              <p className="treatments-feature-body">
                Your clinician will assess movement patterns, strength and endurance, and what activities matter most to you. Programmes are
                individualised and start at a safe “minimum effective dose”, then progress as your capacity improves.
              </p>
              <p className="treatments-feature-body">
                After sessions, you will have a home programme with clear instructions on frequency, intensity, and how to respond to
                symptom fluctuations. Consistency and gradual progression are the keys to long‑term results.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/exercise-therapy" className="treatment-card-button" aria-label="Learn more about exercise therapy in our blog">
                  <span>Learn More About Exercise Therapy</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ex-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ex-details-title" className="minimally-invasive-treatment-details-title">
              Exercise therapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Exercise plans are adapted to diagnosis, baseline fitness, and safety considerations. Your clinician will advise on safe
              progressions, load limits, and any red flags that need medical review.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-technique-title">
              <h3 id="ex-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Exercise increases tissue capacity and improves nervous system tolerance through graded exposure. Strength, mobility, and
                conditioning are progressed over time using measurable targets and a flare‑up plan.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-benefits-title">
              <h3 id="ex-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of exercise therapy">
                <li>Improved strength, balance, and endurance for daily activities.</li>
                <li>Reduced flare frequency through pacing and better load tolerance.</li>
                <li>Improved confidence with movement and return to valued activities.</li>
                <li>Supports recovery after procedures by restoring capacity safely.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-steps-title">
              <h3 id="ex-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Exercise therapy steps">
                <li>Assessment of baseline capacity, symptoms, and functional goals.</li>
                <li>Selection of starting exercises and safe intensity range.</li>
                <li>Progression rules based on symptoms and performance measures.</li>
                <li>Education on pacing, rest, sleep, and recovery habits.</li>
                <li>Review and progression as capacity improves.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-risks-title">
              <h3 id="ex-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of exercise therapy">
                <li>Temporary pain flare or muscle soreness after new loads.</li>
                <li>Overuse injury if intensity increases too quickly.</li>
                <li>Dizziness or cardiovascular symptoms in susceptible patients (requires screening).</li>
                <li>Delayed progress if programmes are inconsistent or poorly matched to diagnosis.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-prep-title">
              <h3 id="ex-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for exercise therapy">
                <li>Wear comfortable clothing and supportive footwear when relevant.</li>
                <li>Bring a medication list and note any heart, breathing, or balance concerns.</li>
                <li>Follow the plan consistently and progress only as advised.</li>
                <li>Seek medical review for new neurological symptoms, chest pain, or fainting.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-recovery-title">
              <h3 id="ex-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Early gains in confidence and movement often appear within weeks. Strength and conditioning improvements typically build over
                weeks to months with progressive loading and consistent practice.
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

export default ExercisePage;
