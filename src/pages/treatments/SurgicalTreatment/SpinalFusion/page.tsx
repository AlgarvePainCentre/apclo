import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './SpinalFusion.css';

const SpinalFusionPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Spinal fusion in Portugal | Expert spine fusion surgeon care';
    document.title = pageTitle;

    const description =
      'Considering spinal fusion in Portugal? Meet an experienced spine fusion surgeon, explore options, and arrange a consultation or imaging review today.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/6-Trauma-Induced-Spinal-Fractures.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page spinal-fusion-page" id="psx-spinal-fusion">
      <header className="psx-hero spinal-fusion-hero" aria-label="Spinal fusion hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Spinal fusion</h1>
          <p className="psx-hero-subtitle">
            Surgical fusion stabilises the spine when joints or discs are severely damaged.
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
            <li aria-current="page">Spinal fusion</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="sf-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/6-Trauma-Induced-Spinal-Fractures.jpg"
                alt="Illustration representing spinal injury and vertebral fracture patterns that may require stabilisation surgery such as spinal fusion (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="sf-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Spinal fusion joins two or more vertebrae so they heal as a single, stable unit. It is considered when pain and disability
                come from instability, severe degeneration, deformity, or nerve compression that also requires stabilisation.
              </p>
              <p className="treatments-feature-body">
                Before surgery you will have a structured assessment, imaging review, and a discussion of goals: pain relief, walking
                tolerance, nerve symptom improvement, and function. The team also reviews health factors that influence healing such as
                smoking status, nutrition, bone density, and diabetes control.
              </p>
              <p className="treatments-feature-body">
                After surgery, recovery includes early mobilisation, pain control, and a staged plan to build strength. Some patients use a
                brace depending on the level and technique. Follow‑up visits track healing and guide progression back to work and sport.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/spine-surgery/spinal-fusion"
                  className="treatment-card-button"
                  aria-label="Learn more about spinal fusion in our blog"
                >
                  <span>Learn More About Spinal Fusion</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="sf-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="sf-details-title" className="minimally-invasive-treatment-details-title">
              Spinal fusion: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Spinal fusion is tailored to the diagnosis and spinal level. Your surgeon will explain the approach (front, back, or
              combined), the type of implants used, and the rehabilitation plan.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="sf-technique-title">
              <h3 id="sf-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Fusion uses implants (such as screws/rods) to stabilise the spine while bone graft promotes healing between vertebrae. In
                selected cases, minimally invasive techniques may reduce muscle disruption. Decompression for nerve pressure can be
                performed alongside fusion when indicated.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="sf-benefits-title">
              <h3 id="sf-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of spinal fusion">
                <li>Improves stability when painful motion or slippage is the source of symptoms.</li>
                <li>Can protect nerves by maintaining alignment after decompression.</li>
                <li>Supports correction of deformity and restoration of spinal balance in selected cases.</li>
                <li>May reduce recurrent episodes when instability drives repeated flare‑ups.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="sf-steps-title">
              <h3 id="sf-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Spinal fusion procedural steps">
                <li>Pre‑operative work‑up, imaging, and optimisation of medical risk factors.</li>
                <li>Anaesthesia, positioning, and surgical approach selection based on level and diagnosis.</li>
                <li>Decompression if needed, followed by implant placement for stabilisation.</li>
                <li>Bone graft placement and alignment confirmation.</li>
                <li>Wound closure, mobilisation, rehabilitation plan, and follow‑up imaging.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="sf-risks-title">
              <h3 id="sf-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of spinal fusion">
                <li>Infection, bleeding, and blood clots.</li>
                <li>Nerve injury or persistent nerve symptoms.</li>
                <li>Non‑union (failure of the bones to fuse), implant issues, or need for revision surgery.</li>
                <li>Adjacent segment stress over time, especially with larger fusions.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="sf-prep-title">
              <h3 id="sf-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for spinal fusion">
                <li>Review medications and stop smoking if applicable to support bone healing.</li>
                <li>Arrange home support and clarify safe movement guidance (lifting, bending, driving).</li>
                <li>Follow wound care instructions and watch for signs of infection.</li>
                <li>Adhere to physiotherapy milestones and gradual return‑to‑activity planning.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="sf-recovery-title">
              <h3 id="sf-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Hospital stay and recovery duration vary by procedure complexity and the number of levels fused. Bone healing continues for
                months. The team monitors progress and helps you build a safe pathway back to work, sport, and longer‑term spine health.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments">
          <TreatmentsMain hideMinimallyInvasive hideNonInvasive />
        </div>
      </main>
    </div>
  );
};

export default SpinalFusionPage;
