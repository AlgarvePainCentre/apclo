import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './DiscReplacement.css';

const DiscReplacementPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Disc replacement in Algarve | Motion‑preserving spine surgery';
    document.title = pageTitle;

    const description =
      'Learn how cervical or lumbar disc replacement in Algarve can relieve pain, preserve motion, and start with a specialist consultation.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/4-disc-problems.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page disc-replacement-page" id="psx-disc-replacement">
      <header className="psx-hero disc-replacement-hero" aria-label="Disc replacement hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Disc replacement</h1>
          <p className="psx-hero-subtitle">
            Artificial disc replacement maintains motion while relieving pain from a damaged disc.
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
            <li aria-current="page">Disc replacement</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="dr-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/4-disc-problems.jpg"
                alt="Illustration of spinal disc degeneration and disc-related nerve compression that may be treated with disc replacement in selected patients (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="dr-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Disc replacement (arthroplasty) is designed to relieve symptoms from a worn or damaged disc while preserving movement at
                that spinal level. It is most commonly performed in the neck (cervical) and, in selected cases, the lower back (lumbar).
              </p>
              <p className="treatments-feature-body">
                A careful selection process is essential. Your specialist reviews imaging and symptoms to confirm the disc is the primary
                source of pain and to assess alignment, facet joint health, and stability. Alternatives such as decompression alone or
                fusion may be more appropriate depending on your anatomy and diagnosis.
              </p>
              <p className="treatments-feature-body">
                After surgery, recovery focuses on walking, restoring comfortable movement, and gradually returning to normal activities.
                Post‑operative guidance includes wound care, posture and lifting advice, and a phased rehabilitation plan.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/spine-surgery/disc-replacement"
                  className="treatment-card-button"
                  aria-label="Learn more about disc replacement in our blog"
                >
                  <span>Learn More About Disc Replacement</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="dr-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="dr-details-title" className="minimally-invasive-treatment-details-title">
              Disc replacement: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Disc replacement is a motion‑preserving option for carefully selected patients. A clear diagnosis and appropriate spinal
              alignment are key to a safe plan and good long‑term outcomes.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="dr-technique-title">
              <h3 id="dr-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                The damaged disc is removed and replaced with an artificial implant that aims to maintain controlled motion. When nerve
                compression is present, decompression is performed at the same time. The approach and implant choice depend on spinal level
                and patient anatomy.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="dr-benefits-title">
              <h3 id="dr-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of disc replacement">
                <li>Relieves pain and nerve symptoms caused by a symptomatic disc.</li>
                <li>Preserves motion at the treated level in appropriately selected patients.</li>
                <li>May reduce stress on neighbouring levels compared with fusion in some cases.</li>
                <li>Supports earlier movement and rehabilitation where clinically appropriate.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="dr-steps-title">
              <h3 id="dr-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Disc replacement procedural steps">
                <li>Pre‑operative assessment, imaging review, and suitability confirmation.</li>
                <li>Anaesthesia and surgical approach to access the affected disc.</li>
                <li>Disc removal and decompression of nerves where required.</li>
                <li>Implant placement and alignment verification.</li>
                <li>Closure, mobilisation plan, rehabilitation guidance, and follow‑up visits.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="dr-risks-title">
              <h3 id="dr-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of disc replacement">
                <li>Infection, bleeding, and anaesthetic risks.</li>
                <li>Nerve injury or persistent symptoms.</li>
                <li>Implant wear, displacement, or need for revision surgery (uncommon, but possible).</li>
                <li>Adjacent segment symptoms can still occur over time.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="dr-prep-title">
              <h3 id="dr-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for disc replacement">
                <li>Bring imaging and a full medication list; discuss blood thinners and other risks early.</li>
                <li>Follow pre‑op fasting and medication instructions; arrange transport and home support.</li>
                <li>Follow wound care and activity guidance, including posture and lifting technique.</li>
                <li>Progress rehabilitation and return‑to‑exercise planning with your clinical team.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="dr-recovery-title">
              <h3 id="dr-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many patients walk on the day of surgery. Activity increases gradually over weeks with guidance. Return to work depends on
                symptom response, job demands, and your recovery milestones.
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

export default DiscReplacementPage;
