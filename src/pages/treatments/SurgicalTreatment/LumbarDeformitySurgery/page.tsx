import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './LumbarDeformitySurgery.css';

const LumbarDeformitySurgeryPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Lumbar deformity surgery in Algarve | Complex spine realignment';
    document.title = pageTitle;

    const description =
      'Explore lumbar deformity surgery in Algarve for scoliosis or flat‑back. Learn options, recovery, and book a detailed spine assessment today.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/3-improper-posture.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page lumbar-deformity-surgery-page" id="psx-lumbar-deformity-surgery">
      <header className="psx-hero lumbar-deformity-surgery-hero" aria-label="Lumbar deformity surgery hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Lumbar deformity surgery</h1>
          <p className="psx-hero-subtitle">
            Corrective lumbar surgery realigns the spine to reduce pain and improve posture.
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
            <li aria-current="page">Lumbar deformity surgery</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="lds-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/3-improper-posture.jpg"
                alt="Illustration representing spinal alignment and posture imbalance in lumbar deformity conditions such as scoliosis or flat-back (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="lds-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Lumbar deformity surgery is planned surgery to correct abnormal curvature or alignment of the lower spine, such as
                degenerative scoliosis or flat‑back. The goal is to improve balance and posture, reduce pain, and relieve nerve
                compression when present.
              </p>
              <p className="treatments-feature-body">
                Because deformity care is complex, assessment includes standing full‑spine imaging, neurological examination, and a review
                of how symptoms affect walking, sitting, and daily activities. Your surgeon explains the recommended levels to treat, the
                expected change in alignment, and the recovery milestones.
              </p>
              <p className="treatments-feature-body">
                Preparation and aftercare are essential. Many patients benefit from prehabilitation (strength and conditioning), medication
                review, and planning for home support. Recovery is progressive and closely monitored to support safe healing and return to
                function.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/spine-surgery/lumbar-deformity-surgery"
                  className="treatment-card-button"
                  aria-label="Learn more about lumbar deformity surgery in our blog"
                >
                  <span>Learn More About Lumbar Deformity Surgery</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="lds-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="lds-details-title" className="minimally-invasive-treatment-details-title">
              Lumbar deformity surgery: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Deformity surgery is individualised. The plan depends on symptoms, alignment measurements, bone quality, and overall health.
              Your surgeon will discuss expected benefits and realistic recovery goals.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="lds-technique-title">
              <h3 id="lds-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Surgery aims to restore spinal balance by correcting curvature and stabilising the spine. This may include decompression of
                nerves, fusion across multiple levels, and corrective techniques (such as osteotomies) where required. Implant systems are
                used to hold alignment while fusion heals.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="lds-benefits-title">
              <h3 id="lds-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of lumbar deformity surgery">
                <li>Improves posture, balance, and walking tolerance by restoring alignment.</li>
                <li>Relieves leg pain or numbness when nerve compression is addressed.</li>
                <li>Reduces pain linked to progressive deformity and instability.</li>
                <li>Supports long‑term function when a conservative plan no longer controls symptoms.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="lds-steps-title">
              <h3 id="lds-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Lumbar deformity surgery procedural steps">
                <li>Detailed planning with full‑spine imaging and alignment measurements.</li>
                <li>Medical optimisation and preparation, including bone health and nutrition review.</li>
                <li>Surgical correction with decompression, alignment restoration, and stabilisation.</li>
                <li>Post‑operative mobilisation, rehabilitation planning, and staged activity progression.</li>
                <li>Ongoing follow‑up with imaging and clinical milestones to monitor healing.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="lds-risks-title">
              <h3 id="lds-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of lumbar deformity surgery">
                <li>Infection, bleeding, blood clots, and medical complications related to longer surgery.</li>
                <li>Nerve injury or persistent symptoms.</li>
                <li>Non‑union, implant issues, or the need for revision surgery.</li>
                <li>Adjacent segment stress over time and junctional problems in long constructs.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="lds-prep-title">
              <h3 id="lds-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for lumbar deformity surgery">
                <li>Stop smoking and optimise bone health when needed to support fusion.</li>
                <li>Plan home support, mobility aids, and safe movement strategy for the first weeks.</li>
                <li>Follow wound care instructions and attend scheduled follow‑up visits.</li>
                <li>Commit to rehabilitation progression, including walking and strengthening milestones.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="lds-recovery-title">
              <h3 id="lds-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Recovery varies by complexity and the number of levels treated. Early goals are pain control and safe walking. Over months,
                rehabilitation supports endurance, posture, and strength while fusion consolidates.
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

export default LumbarDeformitySurgeryPage;
