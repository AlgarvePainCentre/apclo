import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Vertebroplasty.css';

const VertebroplastyPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Vertebroplasty in Algarve | Cement injection for spine fractures';
    document.title = pageTitle;

    const description =
      'Learn about vertebroplasty in Algarve for painful spinal fractures. Image‑guided cement injection, symptom relief, and fast consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/medical/2-vertebroplasty.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page vertebroplasty-page" id="psx-vertebroplasty">
      <header className="psx-hero vertebroplasty-hero" aria-label="Vertebroplasty hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Vertebroplasty</h1>
          <p className="psx-hero-subtitle">
            Cement injection stabilises painful vertebral fractures and supports your spine.
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
            <li aria-current="page">Vertebroplasty</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="vp-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/medical/1-vertebroplasty.jpg"
                alt="Image-guided vertebroplasty procedure using a needle to inject cement into a fractured vertebra (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="vp-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Vertebroplasty is an image‑guided procedure where medical cement is injected into a fractured vertebra to improve stability.
                It is most often considered for painful compression fractures when pain persists despite appropriate conservative care.
              </p>
              <p className="treatments-feature-body">
                Before the procedure you will have a clinical assessment and imaging review (often MRI) to confirm the fracture is the
                likely pain source and to check suitability. The team explains the plan, expected benefits, and alternatives so you can make
                an informed decision.
              </p>
              <p className="treatments-feature-body">
                After the procedure, recovery typically focuses on safe mobility, gradual return to activity, and bone health measures such
                as osteoporosis assessment and prevention strategies when relevant.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/spine-surgery/vertebroplasty" className="treatment-card-button" aria-label="Learn more about vertebroplasty in our blog">
                  <span>Learn More About Vertebroplasty</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="vp-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="vp-details-title" className="minimally-invasive-treatment-details-title">
              Vertebroplasty: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Vertebroplasty aims to stabilise a symptomatic vertebral fracture. Suitability depends on imaging findings, fracture type,
              symptoms, and overall health.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="vp-technique-title">
              <h3 id="vp-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Under imaging guidance, a needle is placed into the fractured vertebra and cement is injected to improve structural
                stability. The goal is to reduce painful micromotion at the fracture site.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="vp-benefits-title">
              <h3 id="vp-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of vertebroplasty">
                <li>May reduce pain from selected vertebral compression fractures.</li>
                <li>Can support earlier mobility and functional improvement in suitable cases.</li>
                <li>Performed as an image‑guided, minimally invasive outpatient procedure in many settings.</li>
                <li>Often combined with a wider plan for bone health and rehabilitation.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="vp-steps-title">
              <h3 id="vp-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Vertebroplasty procedural steps">
                <li>Assessment and imaging review to confirm fracture level and suitability.</li>
                <li>Anaesthesia plan and positioning for safe access.</li>
                <li>Needle placement under imaging guidance.</li>
                <li>Cement injection with real‑time monitoring.</li>
                <li>Observation, mobilisation, discharge instructions, and follow‑up.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="vp-risks-title">
              <h3 id="vp-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of vertebroplasty">
                <li>Bleeding, infection, and reactions to medications or anaesthesia.</li>
                <li>Cement leakage (usually minor, rarely clinically significant).</li>
                <li>Nerve irritation or injury (uncommon).</li>
                <li>Persistent pain if the fracture is not the primary pain source.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="vp-prep-title">
              <h3 id="vp-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for vertebroplasty">
                <li>Bring imaging and a medication list; discuss blood thinners well in advance.</li>
                <li>Follow fasting and pre‑procedure instructions and arrange transport home.</li>
                <li>Follow wound care guidance and monitor for fever, new weakness, or severe pain.</li>
                <li>Review bone health and prevention strategies if osteoporosis is a concern.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="vp-recovery-title">
              <h3 id="vp-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people mobilise shortly after the procedure. Functional improvement is typically gradual and supported by appropriate
                activity progression and bone health management.
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

export default VertebroplastyPage;
