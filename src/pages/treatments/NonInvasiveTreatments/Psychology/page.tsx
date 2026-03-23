import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Psychology.css';

const PsychologyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Psychology in Algarve | Support for pain, mood, and adjustment';
    document.title = pageTitle;

    const description =
      'Explore psychology services in Algarve for chronic pain, anxiety, and life changes. Compassionate, evidence‑based care with simple consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Psychology-min-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page psychology-page" id="psx-psychology">
      <header className="psx-hero psychology-hero" aria-label="Psychology hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Psychology</h1>
          <p className="psx-hero-subtitle">
            Psychological support can help you cope with chronic pain and life changes.
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
            <li aria-current="page">Psychology</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="psy-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Psychology-min-1.jpg"
                alt="Psychology support for chronic pain, mood, and adjustment, delivered as part of multidisciplinary rehabilitation care (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="psy-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Psychology support helps you build practical skills to manage stress, sleep problems, fear of movement, and the emotional
                impact of pain or illness. It is commonly used as part of multidisciplinary care, because pain and recovery are influenced by
                the nervous system, mood, habits, and the environment.
              </p>
              <p className="treatments-feature-body">
                Sessions are collaborative and goal‑focused. Your psychologist will explore your story, identify what keeps symptoms and
                distress going, and teach evidence‑based tools (for example pacing, relaxation, cognitive strategies, and values‑based goal
                setting) that you can use in daily life.
              </p>
              <p className="treatments-feature-body">
                Many people benefit from combining psychology with physiotherapy and medical review. The aim is improved function and quality
                of life, even if pain does not disappear immediately.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/psychology" className="treatment-card-button" aria-label="Learn more about psychology support in our blog">
                  <span>Learn More About Psychology Support</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="psy-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="psy-details-title" className="minimally-invasive-treatment-details-title">
              Psychology: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Psychological therapy is tailored to your goals, symptoms, and preferences. Your clinician will explain the approach used and
              how it fits alongside other treatments.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-technique-title">
              <h3 id="psy-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Therapy focuses on skills that change how the nervous system responds to stress and pain. Common approaches include cognitive
                behavioural strategies, acceptance‑based methods, and education about how pain and mood interact.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-benefits-title">
              <h3 id="psy-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of psychology support">
                <li>Reduced distress and improved coping with pain and flare‑ups.</li>
                <li>Better sleep routines and improved energy management.</li>
                <li>Reduced fear‑avoidance and improved participation in rehabilitation.</li>
                <li>Improved mood and quality of life in many patients.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-steps-title">
              <h3 id="psy-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Psychology care steps">
                <li>Assessment of symptoms, stressors, sleep, and goals.</li>
                <li>Shared formulation of what maintains distress and disability.</li>
                <li>Skills training (pacing, relaxation, cognitive strategies, behavioural plans).</li>
                <li>Home practice and tracking of meaningful outcomes.</li>
                <li>Review and consolidation to support long‑term self‑management.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-risks-title">
              <h3 id="psy-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of psychology support">
                <li>Temporary increase in emotion when discussing difficult experiences.</li>
                <li>Fatigue after intensive sessions or new behavioural change.</li>
                <li>Delayed improvement if practice between sessions is inconsistent.</li>
                <li>Need for urgent support if there are safety concerns; the clinician will discuss pathways.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-prep-title">
              <h3 id="psy-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for psychology support">
                <li>Bring a brief symptom timeline and a medication list.</li>
                <li>Think about 1–3 goals that matter to you (sleep, walking, return to work).</li>
                <li>Practise assigned skills consistently; small daily practice is effective.</li>
                <li>Seek urgent support for self‑harm thoughts or safety concerns.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-recovery-title">
              <h3 id="psy-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people notice early changes in understanding and coping within a few sessions. Sustained improvement usually builds over
                weeks to months as skills become habits and rehabilitation progresses.
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

export default PsychologyPage;
