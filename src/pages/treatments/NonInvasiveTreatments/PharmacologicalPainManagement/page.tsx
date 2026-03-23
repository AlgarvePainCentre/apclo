import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './PharmacologicalPainManagement.css';

const PharmacologicalPainManagementPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle =
      'Pharmacological pain management in Algarve | Tailored medication plans';
    document.title = pageTitle;

    const description =
      'Learn about pharmacological pain management in Algarve. Individualised medication plans, side‑effect monitoring, and easy access to specialist consultation.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Pharmacological-Pain-Management-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page pharmacological-pain-management-page" id="psx-pharmacological-pain-management">
      <header className="psx-hero pharmacological-pain-management-hero" aria-label="Pharmacological pain management hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Pharmacological pain management</h1>
          <p className="psx-hero-subtitle">
            Tailored medication plans help balance pain relief with safety and side effects.
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
            <li aria-current="page">Pharmacological pain management</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ppm-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Pharmacological-Pain-Management-min.jpg"
                alt="Medication planning and review as part of pharmacological pain management and safe prescribing (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ppm-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Pharmacological pain management is a structured way of using medicines to reduce symptoms, improve sleep, and support daily
                function while minimising side effects. It is usually most effective when paired with rehabilitation, lifestyle strategies,
                and a clear plan for monitoring benefit.
              </p>
              <p className="treatments-feature-body">
                Your clinician reviews your pain pattern, medical history, current medicines (including supplements), and goals. The focus
                is on choosing the safest option for your situation, defining a trial period, and deciding how success will be measured
                (for example walking time, sleep, or work tolerance).
              </p>
              <p className="treatments-feature-body">
                Follow-up is an essential part of good medication care. Plans often change over time as symptoms improve, side effects
                appear, or other treatments (physiotherapy or procedures) are introduced.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/rehabilitation-therapies/pharmacological-pain-management"
                  className="treatment-card-button"
                  aria-label="Learn more about pharmacological pain management in our blog"
                >
                  <span>Learn More About Medication Plans</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ppm-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ppm-details-title" className="minimally-invasive-treatment-details-title">
              Pharmacological pain management: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Medicine plans are individualised. Your clinician will explain expected benefits, safety monitoring, and how medication fits
              alongside rehabilitation and self‑management.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-technique-title">
              <h3 id="ppm-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A clinician matches medication choice and timing to the likely pain mechanism and your health profile. Plans often involve
                stepwise trials, dose adjustments, and coordination with physiotherapy or psychological strategies to improve function.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-benefits-title">
              <h3 id="ppm-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of pharmacological pain management">
                <li>Reduced pain interference with daily activities for selected conditions.</li>
                <li>Improved sleep and ability to participate in rehabilitation.</li>
                <li>Better control of flare‑ups with a clear, structured plan.</li>
                <li>Safety improvements through monitoring and interaction checks.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-steps-title">
              <h3 id="ppm-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Medication management steps">
                <li>Comprehensive review of diagnosis, symptoms, and current medicines.</li>
                <li>Risk assessment (interactions, sedation risk, dependence risk) and baseline measures.</li>
                <li>Trial plan with dose, duration, and success criteria.</li>
                <li>Monitoring of function and side effects using simple tracking.</li>
                <li>Review and adjustment, including tapering when appropriate.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-risks-title">
              <h3 id="ppm-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of pharmacological pain management">
                <li>Side effects such as dizziness, constipation, nausea, or drowsiness (medication‑dependent).</li>
                <li>Interactions with other medicines, supplements, or alcohol.</li>
                <li>Dependence or withdrawal risk with some medications if stopped abruptly.</li>
                <li>Reduced alertness affecting driving or work tasks (for sedating medicines).</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-prep-title">
              <h3 id="ppm-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for medication plans">
                <li>Bring a complete medication and supplement list, including allergies.</li>
                <li>Agree on a simple tracker for symptoms, sleep, and side effects.</li>
                <li>Follow dosing and tapering guidance; do not stop medicines suddenly unless advised.</li>
                <li>Seek urgent help for severe reactions, confusion, breathing difficulty, or chest pain.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-recovery-title">
              <h3 id="ppm-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Medication benefit can be immediate or gradual depending on the drug class. The goal is progressive improvement in function
                over weeks, guided by follow‑up reviews and integration with rehabilitation.
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

export default PharmacologicalPainManagementPage;
