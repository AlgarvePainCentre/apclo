import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Podology.css';

const PodologyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Podology in Algarve | Specialist foot care for pain and balance';
    document.title = pageTitle;

    const description =
      'Learn about podology in Algarve for foot pain, calluses, and balance issues. Specialist foot care and straightforward consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Podologist-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page podology-page" id="psx-podology">
      <header className="psx-hero podology-hero" aria-label="Podology hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Podology</h1>
          <p className="psx-hero-subtitle">
            Specialist foot care reduces pain, improves balance and protects your mobility.
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
            <li aria-current="page">Podology</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="pod-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Podologist-min.jpg"
                alt="Podiatry and podology foot assessment and care for pain, skin and nail problems, and gait-related issues (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="pod-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Podology focuses on foot health, gait, and the practical factors that affect pain and balance. Care may include skin and nail
                management, assessment of walking mechanics, footwear advice, and targeted support for conditions that affect mobility.
              </p>
              <p className="treatments-feature-body">
                Your clinician will review symptoms, medical history (including diabetes or circulation issues), and examine the feet, nails,
                skin, and footwear. When needed, they coordinate with other clinicians to address nerve pain, joint issues, or balance
                problems that contribute to foot symptoms.
              </p>
              <p className="treatments-feature-body">
                After the visit, you may have a self‑care plan, footwear or insole recommendations, and a follow‑up schedule. Ongoing foot
                care can be an important part of staying active and reducing falls risk.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/podology" className="treatment-card-button" aria-label="Learn more about podology in our blog">
                  <span>Learn More About Podology</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="pod-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="pod-details-title" className="minimally-invasive-treatment-details-title">
              Podology: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Podology is especially important for people with diabetes, neuropathy, circulation problems, or reduced sensation, where
              preventive care can protect skin and reduce complications.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-technique-title">
              <h3 id="pod-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Care combines clinical foot assessment with targeted treatment and prevention. This can include nail and skin care, pressure
                management strategies, footwear guidance, and gait‑related advice to reduce strain and improve comfort.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-benefits-title">
              <h3 id="pod-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of podology">
                <li>Reduced foot pain and improved comfort with walking.</li>
                <li>Improved nail and skin health, reducing infection risk.</li>
                <li>Prevention of complications in higher‑risk patients (for example diabetes).</li>
                <li>Improved balance and confidence through footwear and gait guidance.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-steps-title">
              <h3 id="pod-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Podology visit steps">
                <li>History and screening for risk factors (diabetes, neuropathy, circulation issues).</li>
                <li>Foot examination including skin, nails, pressure areas, and sensation checks when relevant.</li>
                <li>Treatment such as nail care, callus management, or targeted advice.</li>
                <li>Footwear guidance and prevention plan.</li>
                <li>Follow‑up schedule for maintenance or progression.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-risks-title">
              <h3 id="pod-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of podology">
                <li>Minor bleeding or tenderness after nail or skin care (usually short‑lived).</li>
                <li>Infection risk if wounds occur or aftercare is not followed (uncommon with proper care).</li>
                <li>Delayed healing in people with poor circulation or diabetes.</li>
                <li>Persistent symptoms if footwear and load factors are not addressed.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-prep-title">
              <h3 id="pod-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for podology">
                <li>Bring a medication list and relevant medical history, especially diabetes care details.</li>
                <li>Bring your most commonly worn shoes for assessment.</li>
                <li>Follow skin and nail care instructions and inspect feet regularly if sensation is reduced.</li>
                <li>Seek prompt review for redness, swelling, increasing pain, or non‑healing wounds.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-recovery-title">
              <h3 id="pod-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many treatments improve comfort immediately. Longer‑term results depend on prevention strategies and footwear changes, with
                ongoing follow‑up for higher‑risk patients.
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

export default PodologyPage;
