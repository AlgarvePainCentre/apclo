import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './PeripheralNerveBlock.css';

const PeripheralNerveBlockPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Peripheral nerve block in Algarve | Targeted pain injections';
    document.title = pageTitle;

    const description =
      'Explore peripheral nerve block injections in Algarve for joint, limb, or spine pain. Image‑guided, personalised plans, and fast consultation booking.';

    let meta = document.querySelector('meta[name=\"description\"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <div className="psx-page peripheral-nerve-block-page" id="psx-peripheral-nerve-block">
      <header className="psx-hero peripheral-nerve-block-hero" aria-label="Peripheral nerve block hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/learn/9-radiating-pain.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Peripheral nerve block</h1>
          <p className="psx-hero-subtitle">
            Local anaesthetic around nerves can provide strong, targeted pain relief.
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
            <li aria-current="page">Peripheral nerve block</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="pnb-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/9-radiating-pain.jpg"
                alt="Illustration showing radiating pain patterns that may be treated with a targeted peripheral nerve block (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="pnb-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                A peripheral nerve block is an image‑guided injection that places local anaesthetic close to a specific nerve or nerve
                bundle. By temporarily reducing nerve signalling, it can provide strong pain relief and help you move more comfortably for
                rehabilitation, daily activities, or recovery.
              </p>
              <p className="treatments-feature-body">
                The procedure is tailored to the pain pattern and the target nerve. In some cases, the injection is used diagnostically to
                confirm a pain source; in others, it is part of treatment planning for chronic pain or peri‑procedural pain control.
              </p>
              <p className="treatments-feature-body">
                You may feel numbness, warmth, or heaviness in the area supplied by the nerve for several hours. It’s important to protect
                the numb limb, avoid risky activities, and follow aftercare guidance to reduce falls and injury risk.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/interventional-pain/peripheral-nerve-block"
                  className="treatment-card-button"
                  aria-label="Learn more about peripheral nerve blocks in our blog"
                >
                  <span>Learn More About Peripheral Nerve Blocks</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="pnb-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="pnb-details-title" className="minimally-invasive-treatment-details-title">
              Peripheral nerve block: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Peripheral nerve blocks are performed under imaging guidance (most commonly ultrasound) to improve accuracy and safety. Your
              clinician will explain which nerve is targeted, what level of numbness is expected, and how long the effect usually lasts.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="pnb-technique-title">
              <h3 id="pnb-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A thin needle is guided to the target area next to the nerve, and a local anaesthetic solution is injected. The medication
                temporarily blocks nerve signal conduction, reducing pain and—depending on the nerve—possibly causing short‑term numbness or
                weakness in the region supplied by that nerve.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pnb-benefits-title">
              <h3 id="pnb-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of peripheral nerve blocks">
                <li>Targeted pain relief that can reduce the need for systemic medication for some patients.</li>
                <li>Helps participation in physiotherapy and functional rehabilitation.</li>
                <li>Can support diagnosis by confirming whether a specific nerve is driving symptoms.</li>
                <li>Outpatient procedure with minimal skin disruption and fast recovery for most people.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pnb-steps-title">
              <h3 id="pnb-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Peripheral nerve block procedural steps">
                <li>Clinical assessment and confirmation of the target nerve or region.</li>
                <li>Consent, safety checks, and monitoring when appropriate.</li>
                <li>Skin cleaning and local anaesthetic at the injection site.</li>
                <li>Imaging guidance to position the needle safely next to the nerve.</li>
                <li>Careful injection and short observation period before discharge.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pnb-risks-title">
              <h3 id="pnb-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of peripheral nerve blocks">
                <li>Temporary soreness, bruising, or bleeding at the injection site.</li>
                <li>Temporary numbness or weakness that can increase falls or injury risk if precautions are not followed.</li>
                <li>Infection (uncommon) and nerve irritation (usually temporary).</li>
                <li>Allergic reaction or local anaesthetic toxicity (rare; clinicians use safety protocols to reduce risk).</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pnb-prep-title">
              <h3 id="pnb-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for peripheral nerve blocks">
                <li>Bring a medication list and discuss blood thinners, diabetes medicines, and allergies in advance.</li>
                <li>Arrange transport if sedation is used or if limb numbness could affect driving.</li>
                <li>Protect the numb area from heat, cold, and injury until sensation returns.</li>
                <li>Seek medical review for increasing redness, swelling, fever, or worsening neurological symptoms.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pnb-recovery-title">
              <h3 id="pnb-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Numbness typically lasts hours depending on the medication used. Mild soreness can occur for 24–48 hours. Many people resume
                light activities the same or next day, and rehabilitation can be planned around the expected window of pain relief.
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

export default PeripheralNerveBlockPage;
