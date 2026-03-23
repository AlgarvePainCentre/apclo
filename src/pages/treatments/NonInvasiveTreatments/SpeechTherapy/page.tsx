import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './SpeechTherapy.css';

const SpeechTherapyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Speech therapy in Algarve | Voice, language, and swallowing care';
    document.title = pageTitle;

    const description =
      'Learn about speech therapy in Algarve for speech, language, and swallowing problems. Compassionate, evidence‑based care and simple consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Speech-Therapy-min-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page speech-therapy-page" id="psx-speech-therapy">
      <header className="psx-hero speech-therapy-hero" aria-label="Speech therapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Speech therapy</h1>
          <p className="psx-hero-subtitle">
            Specialist support helps improve speech, language and swallowing after injury or illness.
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
            <li aria-current="page">Speech therapy</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="st-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Speech-Therapy-min-1.jpg"
                alt="Speech and language therapy session supporting communication, voice, and swallowing care (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="st-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Speech and language therapy supports communication, voice, and swallowing. Care may be needed after stroke or neurological
                illness, following head and neck problems, or when speech and swallowing change with ageing or medical conditions.
              </p>
              <p className="treatments-feature-body">
                The first session includes an assessment of speech clarity, language, cognition‑communication (when relevant), voice, and
                swallowing safety. Your therapist then sets practical goals and provides a plan for practice at home.
              </p>
              <p className="treatments-feature-body">
                If swallowing is a concern, safety is prioritised. Your clinician may advise food texture changes, swallowing strategies,
                and coordination with medical assessment where needed.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/speech-therapy" className="treatment-card-button" aria-label="Learn more about speech therapy in our blog">
                  <span>Learn More About Speech Therapy</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="st-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="st-details-title" className="minimally-invasive-treatment-details-title">
              Speech therapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Speech therapy is personalised and practice‑based. Progress is supported by frequent, manageable home practice and clear goals
              that connect to real life communication and safety.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="st-technique-title">
              <h3 id="st-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Therapy uses structured exercises and functional practice to improve speech clarity, language, voice use, and swallowing
                strategies. The plan is adapted based on the underlying cause and your response over time.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-benefits-title">
              <h3 id="st-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of speech therapy">
                <li>Improved communication confidence and participation in social life.</li>
                <li>Better voice quality and reduced strain in selected voice problems.</li>
                <li>Improved swallowing safety strategies and reduced aspiration risk when relevant.</li>
                <li>Support for family and carers with practical communication tools.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-steps-title">
              <h3 id="st-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Speech therapy steps">
                <li>Assessment of communication, voice, and/or swallowing based on the referral concern.</li>
                <li>Goal setting and explanation of what is driving the symptoms.</li>
                <li>Individualised exercises and functional practice tasks.</li>
                <li>Home programme and strategies for daily use.</li>
                <li>Follow‑up reassessment and progression plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-risks-title">
              <h3 id="st-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of speech therapy">
                <li>Temporary vocal fatigue after voice exercises.</li>
                <li>Frustration or fatigue with challenging language tasks (therapy is paced to tolerance).</li>
                <li>Swallowing safety risk if recommendations are not followed when dysphagia is present.</li>
                <li>Delayed progress if practice is inconsistent between sessions.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-prep-title">
              <h3 id="st-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for speech therapy">
                <li>Bring a medication list and relevant medical history (for example stroke details, ENT reviews).</li>
                <li>Note when symptoms occur: fatigue, certain foods, or particular speaking situations.</li>
                <li>Practise the home programme little and often for best results.</li>
                <li>Seek urgent help for sudden new swallowing difficulty, facial droop, or new speech weakness.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-recovery-title">
              <h3 id="st-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Progress depends on the cause and severity. Many people notice improvement over weeks with consistent practice; longer‑term
                neurological recovery may take months and benefits from ongoing support.
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

export default SpeechTherapyPage;
