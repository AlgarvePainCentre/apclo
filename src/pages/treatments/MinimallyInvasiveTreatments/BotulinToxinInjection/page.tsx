import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './BotulinToxinInjection.css';

const BotulinToxinInjectionPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Botulinum toxin injection in Algarve | Spasticity and pain management';
    document.title = pageTitle;

    const description =
      'Explore botulinum toxin injections in Algarve for muscle spasticity and pain. Targeted dosing, ultrasound guidance, and straightforward consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Post-Stroke-min-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page botulin-toxin-injection-page" id="psx-botulin-toxin-injection">
      <header className="psx-hero botulin-toxin-injection-hero" aria-label="Botulinum toxin injection hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Botulin toxin injection</h1>
          <p className="psx-hero-subtitle">
            Targeted botulin toxin injections can relax overactive muscles and ease spasticity.
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
            <li aria-current="page">Botulin toxin injection</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="btx-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Post-Stroke-min-1.jpg"
                alt="Image representing post-stroke muscle spasticity management supported by targeted botulinum toxin injections in rehabilitation care (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="btx-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Botulinum toxin injections are used to relax selected overactive muscles. In pain and rehabilitation settings, they may be
                used for spasticity, dystonia, or specific muscle‑driven pain patterns where reducing excessive contraction improves comfort
                and function.
              </p>
              <p className="treatments-feature-body">
                The treatment begins with a detailed assessment to identify target muscles and goals (for example, improved walking,
                posture, range of motion, or reduced painful spasm). Ultrasound guidance can improve targeting accuracy for deeper muscles.
              </p>
              <p className="treatments-feature-body">
                Effects are not immediate. The medicine typically takes days to start working and may last for several months. Follow‑up
                rehabilitation is often essential to maximise functional gains while the muscle tone is reduced.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/interventional-pain/botulinum-toxin-injection"
                  className="treatment-card-button"
                  aria-label="Learn more about botulinum toxin injections in our blog"
                >
                  <span>Learn More About Botulinum Toxin</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="btx-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="btx-details-title" className="minimally-invasive-treatment-details-title">
              Botulinum toxin injection: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Botulinum toxin dosing and targeting are individualised. Your clinician will confirm suitability, discuss expected effects,
              and coordinate rehabilitation to support functional goals.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="btx-technique-title">
              <h3 id="btx-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Botulinum toxin reduces muscle contraction by temporarily blocking nerve signalling at the neuromuscular junction. The
                injection is placed into selected muscles, often with ultrasound guidance for precision.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="btx-benefits-title">
              <h3 id="btx-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of botulinum toxin injections">
                <li>Can reduce spasticity and painful muscle overactivity.</li>
                <li>May improve mobility, posture, hygiene, or joint range of motion depending on goals.</li>
                <li>Often supports rehabilitation by enabling more effective stretching and strengthening.</li>
                <li>Targeted treatment with dosing tailored to the individual.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="btx-steps-title">
              <h3 id="btx-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Botulinum toxin injection procedural steps">
                <li>Assessment to identify target muscles and define measurable goals.</li>
                <li>Skin preparation and positioning.</li>
                <li>Ultrasound guidance and injection into selected muscles.</li>
                <li>Aftercare instructions and rehabilitation plan coordination.</li>
                <li>Follow‑up to assess effect and adjust future dosing if needed.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="btx-risks-title">
              <h3 id="btx-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of botulinum toxin injections">
                <li>Local soreness, bruising, or mild weakness in the injected muscle.</li>
                <li>Temporary functional change (for example, reduced grip strength) depending on target.</li>
                <li>Infection or bleeding (uncommon).</li>
                <li>Rare unwanted spread of effect; your clinician reviews warning signs and precautions.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="btx-prep-title">
              <h3 id="btx-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for botulinum toxin injections">
                <li>Bring medication list; discuss blood thinners and neuromuscular conditions.</li>
                <li>Continue planned physiotherapy to take advantage of tone reduction.</li>
                <li>Monitor for unexpected swallowing or breathing difficulty and seek urgent care if it occurs.</li>
                <li>Track functional goals (walking distance, ease of movement) to evaluate benefit.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="btx-recovery-title">
              <h3 id="btx-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Most people resume normal activities the same day. Effects typically begin within days and peak over the first few weeks,
                then gradually wear off over months. Rehabilitation during this period often shapes the overall benefit.
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

export default BotulinToxinInjectionPage;
