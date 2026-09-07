import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './BotulinToxinInjection.css';

const BotulinToxinInjectionPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'duration',
        question: 'How long does botulin toxin relief last?',
        answer:
          'Most patients experience relief lasting 3–6 months. Your clinician can suggest an appropriate schedule for repeat treatments based on your goals and response.',
      },
      {
        id: 'painful',
        question: 'Is the procedure painful?',
        answer:
          'Discomfort is usually mild and brief. You may feel a small pinch or pressure, and some soreness can occur at the injection site for a short time.',
      },
      {
        id: 'side-effects',
        question: 'Are there any side effects?',
        answer:
          'Side effects are often mild and temporary, such as local soreness or bruising. Depending on the muscle treated, temporary weakness can occur. Your clinician will review rare risks and warning signs.',
      },
      {
        id: 'activities',
        question: 'How soon can I return to normal activities?',
        answer:
          'Most people return to normal activities the same day. If you feel sore, you may prefer lighter activity for 24–48 hours.',
      },
      {
        id: 'driving',
        question: 'Can I drive after the injection?',
        answer:
          'In most cases, yes. If you feel unwell or if treatment affects a muscle group that changes function temporarily, follow your clinician’s advice before driving.',
      },
      {
        id: 'insurance',
        question: 'Are botulin toxin injections covered by health insurance?',
        answer:
          'Coverage varies by insurer and policy. It’s best to confirm directly with your provider, and our team can help with documentation if needed.',
      },
      {
        id: 'candidate',
        question: 'Who is a good candidate for botulin toxin injection?',
        answer:
          'Candidates are assessed individually. It may be suitable when muscle overactivity is contributing to pain, spasticity, dystonia, or functional limitation, and when clear treatment goals can be defined.',
      },
      {
        id: 'combined',
        question: 'Can botulin toxin be combined with other treatments?',
        answer:
          'Yes. It is often combined with physiotherapy, stretching, strengthening, and other rehabilitation strategies to maximise functional improvement and long-term benefit.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);

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

  React.useEffect(() => {
    const scope = document.getElementById('psx-botulin-toxin-injection') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page botulin-toxin-injection-page page-botulintoxininjection" id="psx-botulin-toxin-injection">
      <header className="treatment-page-hero botulin-toxin-injection-hero" aria-label="Botulin toxin injection hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/illustrative/Post-Stroke-min-1.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Botulin toxin injection</h1>
          <p className="psx-hero-subtitle">
            Targeted botulin toxin injections can relax overactive muscles and ease spasticity.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Botulin toxin injection" />

        <section className="page-section btx-overview" aria-labelledby="btx-understanding-title">
          <div className="btx-overview-inner">
            <div className="btx-understanding-top">
              <h2 id="btx-understanding-title" className="btx-understanding-title">
                Understanding Botulin
                <br />
                Toxin Injections
              </h2>
              <div className="btx-understanding-copy">
                <p className="btx-understanding-paragraph">
                  Botulin toxin injections are widely used for medical and therapeutic purposes, particularly to reduce muscle stiffness,
                  relieve pain, and manage certain neurological conditions. The injection works by temporarily blocking nerve signals that
                  cause muscles to contract, providing relaxation and reducing discomfort.
                </p>
                <p className="btx-understanding-paragraph">
                  Botulin toxin has been extensively researched and is proven to help manage symptoms in conditions like spasticity and
                  chronic pain syndromes. Effects often last for several months, and pairing treatment with rehabilitation can maximise
                  functional gains.
                </p>
                <p className="btx-understanding-paragraph">Here is how the procedure is done:</p>
              </div>
            </div>

            <div className="btx-steps-grid" role="list" aria-label="Botulin toxin injection steps">
              <article className="btx-step-card" role="listitem" aria-label="Step 1 preparation">
                <p className="btx-step-number">1.</p>
                <h3 className="btx-step-title">Preparation</h3>
                <div className="btx-step-divider" aria-hidden="true" />
                <p className="btx-step-body">
                    The area to be treated is cleaned, and local anaesthesia may be applied to minimise discomfort.
                </p>
              </article>

              <article className="btx-step-card" role="listitem" aria-label="Step 2 injection">
                <p className="btx-step-number">2.</p>
                <h3 className="btx-step-title">Injection</h3>
                <div className="btx-step-divider" aria-hidden="true" />
                <p className="btx-step-body">
                    Using a thin needle, botulin toxin is injected into the target muscle group or affected area. The number of injections
                    varies based on the condition being treated.
                </p>
              </article>

              <article className="btx-step-card" role="listitem" aria-label="Step 3 observation">
                <p className="btx-step-number">3.</p>
                <h3 className="btx-step-title">Observation</h3>
                <div className="btx-step-divider" aria-hidden="true" />
                <p className="btx-step-body">
                    After injection, the area is observed briefly to ensure there are no immediate reactions.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section btx-aftercare" aria-labelledby="btx-aftercare-title">
          <header className="btx-aftercare-header">
              <h2 id="btx-aftercare-title" className="btx-aftercare-title">
                What to Expect From the Procedure
              </h2>
              <p className="btx-aftercare-subtitle">
                After the injection, patients may experience mild discomfort, similar to a pinch or slight soreness around the injection
                site. Here’s what to expect during recovery:
              </p>
          </header>

          <div className="btx-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="btx-aftercare-media" aria-hidden="true">
                <div className="btx-aftercare-poster">
                  <img
                  className="btx-aftercare-image"
                  src="/assets/images/illustrative/Post-Stroke-min-1.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                </div>
              </figure>

              <div className="btx-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="btx-aftercare-item" role="listitem">
                  <h3 className="btx-aftercare-item-title">Initial Mild Discomfort</h3>
                  <p className="btx-aftercare-item-body">
                    Soreness or mild bruising at the injection site may occur but should fade within a few days.
                  </p>
                </article>
                <div className="btx-aftercare-divider" aria-hidden="true" />
                <article className="btx-aftercare-item" role="listitem">
                  <h3 className="btx-aftercare-item-title">Gradual Relief</h3>
                  <p className="btx-aftercare-item-body">
                    The effects of botulin toxin typically become noticeable within a few days, reaching full effectiveness within two weeks.
                  </p>
                </article>
                <div className="btx-aftercare-divider" aria-hidden="true" />
                <article className="btx-aftercare-item" role="listitem">
                  <h3 className="btx-aftercare-item-title">Temporary Weakness</h3>
                  <p className="btx-aftercare-item-body">
                    Some patients experience mild, temporary muscle weakness in the injected area, which typically resolves as the muscles
                    adapt.
                  </p>
                </article>
                <div className="btx-aftercare-divider" aria-hidden="true" />
                <article className="btx-aftercare-item" role="listitem">
                  <h3 className="btx-aftercare-item-title">Long-Lasting Effects</h3>
                  <p className="btx-aftercare-item-body">
                    Relief can last between 3–6 months, depending on the condition and individual response.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section btx-benefits" aria-labelledby="btx-benefits-title">
          <div className="btx-benefits-inner">
            <header className="btx-benefits-header">
              <h2 id="btx-benefits-title" className="btx-benefits-title">
                Benefits of Botulin Toxin Injections
              </h2>
              <p className="btx-benefits-subtitle">
                This procedure offers several advantages over more conservative methods, including:
              </p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of botulin toxin injections">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Pain Relief</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Botulin toxin can reduce muscle-related pain by relaxing tense muscles and blocking pain signals.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Enhanced Mobility</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  By reducing muscle spasticity, patients often experience improved range of motion and greater ease of movement.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Non‑Surgical Approach</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  This minimally invasive treatment provides relief without the need for surgery, often leading to quicker recovery.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Long‑Lasting Effects</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Patients may benefit from months of symptom relief, reducing the need for frequent treatments.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Effective for Various Conditions</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Botulin toxin injections treat multiple issues, from chronic pain to spasticity and muscle-related discomfort.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section btx-conditions" aria-labelledby="btx-conditions-title">
          <div className="btx-conditions-inner tms-conditions-inner">
            <header className="btx-conditions-header tms-conditions-header">
              <h2 id="btx-conditions-title" className="btx-conditions-title tms-conditions-title">
                Conditions Treated with Botulin
                <br />
                Toxin Injections
              </h2>
            </header>

            <div className="btx-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with botulin toxin injections">
              <article className="btx-condition-card tms-conditions-card" role="listitem" aria-labelledby="btx-condition-spasticity-title">
                <div className="btx-condition-copy tms-conditions-copy">
                  <h3 id="btx-condition-spasticity-title" className="btx-condition-title tms-conditions-card-title">
                    Spasticity
                  </h3>
                  <p className="btx-condition-body tms-conditions-card-body">
                    This condition involves involuntary muscle stiffness, common in neurological disorders. Botulin toxin helps reduce
                    spasticity, improving function and comfort.
                  </p>
                </div>
                <div className="btx-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="btx-condition-image tms-conditions-image"
                    src="/assets/images/botulin-toxin-injection/Spasticity.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="btx-condition-card tms-conditions-card" role="listitem" aria-labelledby="btx-condition-migraine-title">
                <div className="btx-condition-copy tms-conditions-copy">
                  <h3 id="btx-condition-migraine-title" className="btx-condition-title tms-conditions-card-title">
                    Chronic Migraine
                  </h3>
                  <p className="btx-condition-body tms-conditions-card-body">
                    For individuals with chronic migraines, botulin toxin can reduce frequency and severity by blocking pain signals.
                  </p>
                </div>
                <div className="btx-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="btx-condition-image tms-conditions-image"
                    src="/assets/images/botulin-toxin-injection/ChronicMigraine.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="btx-condition-card tms-conditions-card" role="listitem" aria-labelledby="btx-condition-dystonia-title">
                <div className="btx-condition-copy tms-conditions-copy">
                  <h3 id="btx-condition-dystonia-title" className="btx-condition-title tms-conditions-card-title">
                    Dystonia
                  </h3>
                  <p className="btx-condition-body tms-conditions-card-body">
                    This movement disorder causes uncontrollable muscle contractions. Botulin toxin injection helps relax these muscles,
                    easing discomfort and improving quality of life.
                  </p>
                </div>
                <div className="btx-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="btx-condition-image tms-conditions-image"
                    src="/assets/images/botulin-toxin-injection/Dystonia.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="btx-condition-card tms-conditions-card" role="listitem" aria-labelledby="btx-condition-bladder-title">
                <div className="btx-condition-copy tms-conditions-copy">
                  <h3 id="btx-condition-bladder-title" className="btx-condition-title tms-conditions-card-title">
                    Overactive Bladder
                  </h3>
                  <p className="btx-condition-body tms-conditions-card-body">
                    For patients with spastic bladder conditions, botulin toxin reduces urgency and frequency by relaxing bladder muscles.
                  </p>
                </div>
                <div className="btx-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="btx-condition-image tms-conditions-image"
                    src="/assets/images/botulin-toxin-injection/OveractiveBladder.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section btx-faq" aria-labelledby="btx-faq-title">
          <div className="btx-faq-inner">
            <header className="btx-faq-header">
              <h2 id="btx-faq-title" className="btx-faq-title">
                Botulin Toxin Injection FAQ
              </h2>
            </header>

            <div className="btx-faq-card" role="list" aria-label="Botulin toxin injection frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `btx-faq-${item.id}`;
                const panelId = `btx-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="btx-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="btx-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="btx-faq-question">{item.question}</span>
                      <span className="btx-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="btx-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="btx-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
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

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideNonInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default BotulinToxinInjectionPage;
