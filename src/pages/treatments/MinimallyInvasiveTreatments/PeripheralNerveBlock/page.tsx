import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './PeripheralNerveBlock.css';

type PeripheralNerveBlockFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const PERIPHERAL_NERVE_BLOCK_FAQ: PeripheralNerveBlockFaqItem[] = [
  {
    id: 'used-for',
    question: 'What is a peripheral nerve block used for?',
    answer:
      'Peripheral nerve blocks are used to manage pain during and after procedures, and for selected chronic pain patterns. By reducing nerve signalling for a period of time, they can improve comfort and support movement and rehabilitation.',
  },
  {
    id: 'what-is',
    question: 'What is a peripheral nerve block?',
    answer:
      'It is an image‑guided injection that places local anaesthetic close to a specific nerve or nerve bundle. This temporarily reduces pain signalling from that nerve distribution and can cause numbness or heaviness in the area supplied.',
  },
  {
    id: 'how-long-effect',
    question: 'How long does the effect of a peripheral nerve block last?',
    answer:
      'Duration varies by the medication used, the dose, and the nerve targeted. Many blocks last several hours, while some may last longer. Your clinician will explain typical timing for your specific block.',
  },
  {
    id: 'safe',
    question: 'Are peripheral nerve blocks safe?',
    answer:
      'They are generally safe when performed by trained clinicians using appropriate monitoring and image guidance. As with any procedure, there are risks, and your clinician will review these based on your health profile and the nerve being targeted.',
  },
  {
    id: 'pain-during',
    question: 'Will I feel any pain during the procedure?',
    answer:
      'You may feel a brief sting with local anaesthetic and some pressure during the injection. Most people tolerate the procedure well. Comfort can be improved with careful technique and, in some settings, light sedation.',
  },
  {
    id: 'how-long-lasts',
    question: 'How long will a peripheral nerve block last?',
    answer:
      'Numbness often wears off over hours as the anaesthetic effect fades. If you notice prolonged weakness, increasing pain, fever, or unusual symptoms, contact your clinician for advice.',
  },
];

const PeripheralNerveBlockPage: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(() => PERIPHERAL_NERVE_BLOCK_FAQ[0]?.id ?? null);

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

  React.useEffect(() => {
    const scope = document.getElementById('psx-peripheral-nerve-block') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page peripheral-nerve-block-page page-peripheralnerveblock" id="psx-peripheral-nerve-block">
      <header className="treatment-page-hero peripheral-nerve-block-hero" aria-label="Peripheral nerve block hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/9-radiating-pain.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Peripheral nerve block</h1>
          <p className="psx-hero-subtitle">
            Local anaesthetic around nerves can provide strong, targeted pain relief.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Peripheral nerve block" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="pnb-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/9-radiating-pain.webp"
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
            </div>
          </div>
        </section>

        <section className="page-section pnb-process" aria-labelledby="pnb-process-title">
          <div className="pnb-process-inner">
            <div className="pnb-process-top">
              <h2 id="pnb-process-title" className="pnb-process-title">
                What is a Peripheral
                <br />
                Nerve Block?
              </h2>
              <div className="pnb-process-copy">
                <p className="pnb-process-paragraph">
                  A peripheral nerve block is an image‑guided injection that places local anaesthetic close to specific nerves to numb a
                  target area of the body.
                </p>
                <p className="pnb-process-paragraph">
                  This technique is often used to manage pain during and after surgical procedures, particularly for limbs, and it can
                  also be used for certain head, neck, back, abdominal, collarbone, and hip pain patterns.
                </p>
                <p className="pnb-process-paragraph">Here is an overview of the procedure:</p>
              </div>
            </div>

            <div className="pnb-steps-grid" role="list" aria-label="Peripheral nerve block steps">
              <article className="pnb-step-card" role="listitem" aria-label="Step 1 preparation">
                <p className="pnb-step-number">1.</p>
                <h3 className="pnb-step-title">Preparation</h3>
                <div className="pnb-step-divider" aria-hidden="true" />
                <p className="pnb-step-body">
                  You will receive instructions on how to prepare, which may include fasting and adjusting any medications you are taking.
                  Your clinician will also discuss your medical history, including any past issues with anaesthesia.
                </p>
              </article>

              <article className="pnb-step-card" role="listitem" aria-label="Step 2 procedure">
                <p className="pnb-step-number">2.</p>
                <h3 className="pnb-step-title">Procedure</h3>
                <div className="pnb-step-divider" aria-hidden="true" />
                <p className="pnb-step-body">
                  During the procedure, an ultrasound or nerve stimulator is used to locate the target nerve. The skin is numbed and a
                  needle is guided near the nerve to deliver local anaesthetic. Some discomfort can occur, but the procedure is generally
                  well tolerated.
                </p>
              </article>

              <article className="pnb-step-card" role="listitem" aria-label="Step 3 during surgery">
                <p className="pnb-step-number">3.</p>
                <h3 className="pnb-step-title">During Surgery</h3>
                <div className="pnb-step-divider" aria-hidden="true" />
                <p className="pnb-step-body">
                  Depending on the type of surgery, the nerve block may be used alongside general anaesthesia or sedation. Sometimes, the
                  nerve block alone provides enough pain control to keep you comfortable during the operation.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pnb-aftercare" aria-labelledby="pnb-aftercare2-title">
          <header className="pnb-aftercare-header">
            <h2 id="pnb-aftercare2-title" className="pnb-aftercare-title">What to Expect From the Procedure</h2>
            <p className="pnb-aftercare-subtitle">
              Post‑procedure, most people experience meaningful pain reduction. For some, the full effect develops over the next few hours.
            </p>
            <p className="pnb-aftercare-subtitle">Here&apos;s a breakdown of what you can expect:</p>
          </header>

          <div className="pnb-aftercare-layout" aria-label="Post-procedure expectations">
            <figure className="pnb-aftercare-media" aria-hidden="true">
              <div className="pnb-aftercare-poster">
                <img
                  className="pnb-aftercare-image"
                  src="/assets/images/medical/DSC05016.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>

            <div className="pnb-aftercare-panel" role="list" aria-label="Post-procedure expectations">
              <article className="pnb-aftercare-item" role="listitem">
                <h3 className="pnb-aftercare-item-title">Immediate Effects</h3>
                <p className="pnb-aftercare-item-body">
                  Numbness from the anaesthetic usually lasts several hours depending on the nerve and medication. Tingling or warmth can
                  occur as the block sets in.
                </p>
              </article>
              <div className="pnb-aftercare-divider" aria-hidden="true" />
              <article className="pnb-aftercare-item" role="listitem">
                <h3 className="pnb-aftercare-item-title">Recovery</h3>
                <p className="pnb-aftercare-item-body">
                  You will be monitored and can typically go home once stable. Mild soreness or a heavy sensation in the limb may occur as
                  feeling returns.
                </p>
              </article>
              <div className="pnb-aftercare-divider" aria-hidden="true" />
              <article className="pnb-aftercare-item" role="listitem">
                <h3 className="pnb-aftercare-item-title">Follow‑Up</h3>
                <p className="pnb-aftercare-item-body">
                  Your clinician will advise on activity progression, limb protection while numb, and when it is safe to drive or return to
                  work.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pnb-benefits" aria-labelledby="pnb-benefits-section-title">
          <div className="pnb-benefits-inner">
            <header className="pnb-benefits-header">
              <h2 id="pnb-benefits-section-title" className="pnb-benefits-title">Benefits of Peripheral Nerve Blocks</h2>
              <p className="pnb-benefits-subtitle">Peripheral nerve blocks can offer several benefits, such as:</p>
            </header>

            <div className="pnb-benefits-grid" role="list" aria-label="Benefits of peripheral nerve blocks">
              <article className="pnb-benefit-card pnb-benefit-card--highlight" role="listitem">
                <h3 className="pnb-benefit-title">Effective Pain Control</h3>
                <div className="pnb-benefit-divider" aria-hidden="true" />
                <p className="pnb-benefit-body">
                  Provides excellent relief during and after procedures, often reducing the need for systemic pain medication and their
                  side effects such as nausea or drowsiness.
                </p>
              </article>

              <article className="pnb-benefit-card" role="listitem">
                <h3 className="pnb-benefit-title">Reduced Recovery Time</h3>
                <div className="pnb-benefit-divider" aria-hidden="true" />
                <p className="pnb-benefit-body">
                  Targeted pain relief helps people mobilise earlier and participate in physiotherapy more comfortably.
                </p>
              </article>

              <article className="pnb-benefit-card" role="listitem">
                <h3 className="pnb-benefit-title">Decreased Need for General Anaesthesia</h3>
                <div className="pnb-benefit-divider" aria-hidden="true" />
                <p className="pnb-benefit-body">
                  In selected cases, nerve blocks can be used with lighter sedation or as an alternative to general anaesthesia, which may
                  be preferable for people with certain medical conditions.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pnb-conditions" aria-labelledby="pnb-conditions-title">
          <div className="pnb-conditions-inner tms-conditions-inner">
            <header className="pnb-conditions-header tms-conditions-header">
              <h2 id="pnb-conditions-title" className="pnb-conditions-title tms-conditions-title">
                Conditions Treated with Peripheral
                <br />
                Nerve Blocks
              </h2>
            </header>

            <div className="pnb-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with peripheral nerve blocks">
              <article className="pnb-condition-card tms-conditions-card" role="listitem">
                <div className="pnb-condition-text tms-conditions-copy">
                  <h3 className="pnb-condition-title tms-conditions-card-title">Postoperative Pain</h3>
                  <p className="pnb-condition-body tms-conditions-card-body">
                    Nerve blocks can help manage pain after surgery, supporting earlier movement and recovery with reduced discomfort for
                    some patients.
                  </p>
                </div>
                <div className="pnb-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pnb-condition-image tms-conditions-image"
                    src="/assets/images/medical/DSC05129.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pnb-condition-card pnb-condition-card--reverse" role="listitem">
                <div className="pnb-condition-text tms-conditions-copy">
                  <h3 className="pnb-condition-title tms-conditions-card-title">Neuropathy</h3>
                  <p className="pnb-condition-body tms-conditions-card-body">
                    Targeted blocks may be used in selected cases for nerve‑related pain patterns affecting the arms, legs, or face.
                  </p>
                </div>
                <div className="pnb-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pnb-condition-image tms-conditions-image"
                    src="/assets/images/medical/DSC04194.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pnb-condition-card pnb-condition-card--reverse" role="listitem">
                <div className="pnb-condition-text tms-conditions-copy">
                  <h3 className="pnb-condition-title tms-conditions-card-title">
                    Shoulder &amp; Rotator Cuff
                    <br />
                    Pain
                  </h3>
                  <p className="pnb-condition-body tms-conditions-card-body">
                    In shoulder procedures and certain shoulder pain patterns, nerve blocks can reduce pain and improve comfort for early
                    rehabilitation.
                  </p>
                </div>
                <div className="pnb-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pnb-condition-image tms-conditions-image"
                    src="/assets/images/medical/DSC01735.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pnb-condition-card tms-conditions-card" role="listitem">
                <div className="pnb-condition-text tms-conditions-copy">
                  <h3 className="pnb-condition-title tms-conditions-card-title">Hip &amp; Lower Limb Pain</h3>
                  <p className="pnb-condition-body tms-conditions-card-body">
                    Nerve blocks may support pain control for hip and lower‑limb procedures and selected pain patterns, depending on the
                    target nerve.
                  </p>
                </div>
                <div className="pnb-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pnb-condition-image tms-conditions-image"
                    src="/assets/images/medical/DSC05906.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pnb-help" aria-labelledby="pnb-help-title">
          <div className="pnb-help-inner">
            <h2 id="pnb-help-title" className="pnb-help-title">
              Risks and Side Effects
            </h2>
            <div className="pnb-help-copy">
              <p className="pnb-help-paragraph">
                While generally safe, peripheral nerve blocks do carry some risks, including:
              </p>
              <ul className="pnb-help-list" aria-label="Risks and side effects of peripheral nerve blocks">
                <li>Bruising or bleeding at the injection site.</li>
                <li>Temporary nerve symptoms, like hoarseness or blurred vision (depending on the nerve targeted).</li>
                <li>Rare but serious risks like infection, nerve damage, or complications if local anaesthetic enters the bloodstream.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section pnb-faq" aria-labelledby="pnb-faq-title">
          <div className="pnb-faq-inner">
            <header className="pnb-faq-header">
              <h2 id="pnb-faq-title" className="pnb-faq-title">
                Peripheral Nerve Blocks FAQ
              </h2>
            </header>
            <div className="pnb-faq-card" role="list" aria-label="Peripheral nerve blocks frequently asked questions">
              {PERIPHERAL_NERVE_BLOCK_FAQ.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `pnb-faq-${item.id}`;
                const panelId = `pnb-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="pnb-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="pnb-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="pnb-faq-question">{item.question}</span>
                      <span className="pnb-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="pnb-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="pnb-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
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

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideNonInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default PeripheralNerveBlockPage;
