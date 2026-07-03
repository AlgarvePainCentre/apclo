import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './InterspinousSpacers.css';

const InterspinousSpacersPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Interspinous spacers in Algarve | Relief for lumbar stenosis';
    document.title = pageTitle;

    const description =
      'Learn how interspinous spacers in Algarve can ease lumbar spinal stenosis, reduce leg pain, and support walking. Book a specialist consultation.';

    let meta = document.querySelector('meta[name=\"description\"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-interspinous-spacers') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const faqItems = React.useMemo(
    () => [
      {
        id: 'materials',
        question: 'What are interspinous spacers made of?',
        answer:
          'Interspinous spacers are typically made of durable, medical-grade materials designed to be compatible with the body. Your surgeon will explain the specific device used and why it fits your anatomy and goals.',
      },
      {
        id: 'lifespan',
        question: 'How long do interspinous spacers last?',
        answer:
          'Longevity depends on the device, your spine health, and how symptoms evolve over time. Your team will outline follow-up and what to watch for, including when further treatment might be needed.',
      },
      {
        id: 'return-to-activity',
        question: 'How soon can I return to my daily activities?',
        answer:
          'Many people resume light activity within days, with a gradual return to work and exercise based on symptoms and surgeon guidance. Heavy lifting and high-impact activity are usually restricted early on.',
      },
      {
        id: 'scars',
        question: 'Will the procedure leave any scars?',
        answer:
          'The procedure typically uses a small incision, so scarring is usually minimal. Scar appearance varies by skin type and healing and can be discussed during your consultation.',
      },
      {
        id: 'risks',
        question: 'Are there any risks associated with interspinous spacers?',
        answer:
          'As with any procedure, risks exist. These can include infection, bleeding, persistent symptoms, or the need for revision surgery in some cases. Your surgeon will explain personalised risks and alternatives.',
      },
      {
        id: 'with-other-treatments',
        question: 'Can interspinous spacers be used with other treatments?',
        answer:
          'Yes. They are often part of a broader plan that may include physiotherapy, pain management, and activity progression. Your clinician will tailor the approach to your diagnosis and goals.',
      },
      {
        id: 'flexibility',
        question: 'Will the spacers affect the flexibility of my spine?',
        answer:
          'Spacers primarily limit painful extension at the treated level, while aiming to preserve overall movement. The impact depends on the level treated and your spine mechanics.',
      },
      {
        id: 'insurance',
        question: 'Is interspinous spacer placement covered by insurance?',
        answer:
          'Coverage depends on your insurer, diagnosis, and policy. Your clinic can help provide documentation and guide you through pre-authorisation where needed.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <div className="psx-page interspinous-spacers-page page-interspinousspacers" id="psx-interspinous-spacers">
      <header className="treatment-page-hero interspinous-spacers-hero" aria-label="Interspinous spacers hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/9-radiating-pain.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Interspinous spacers</h1>
          <p className="psx-hero-subtitle">
            Small implants help keep space between vertebrae to ease nerve compression.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Interspinous spacers" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="iss-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/9-radiating-pain.webp"
                alt="Illustration showing radiating leg pain from lumbar spinal stenosis, which may be treated with interspinous spacer implantation in selected patients (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="iss-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Interspinous spacers are small implants placed between the spinous processes (the bones you can feel at the back of the
                spine). They are designed to reduce narrowing in selected cases of lumbar spinal stenosis—especially when symptoms worsen
                with standing or walking and improve when bending forward.
              </p>
              <p className="treatments-feature-body">
                Selection is critical. Your specialist reviews symptoms, examination findings, and imaging to confirm stenosis and to
                assess stability. In some cases, decompression surgery or other treatments may be more appropriate.
              </p>
              <p className="treatments-feature-body">
                Recovery focuses on walking progression and gradual return to daily activities. A structured rehabilitation plan helps
                restore endurance and confidence while protecting the surgical site.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section iss-overview" aria-labelledby="iss-understanding-title">
          <div className="iss-overview-inner">
            <div className="iss-understanding-top">
              <h2 id="iss-understanding-title" className="iss-understanding-title">
                Understanding
                <br />
                Interspinous Spacers
              </h2>
              <div className="iss-understanding-copy">
                <p className="iss-understanding-paragraph">
                  Chronic lower back pain and lumbar spinal stenosis can make standing and walking difficult. Interspinous spacers offer a
                  minimally invasive option for selected cases, aiming to relieve leg-dominant symptoms and support improved mobility.
                </p>
                <p className="iss-understanding-paragraph">
                  Interspinous spacers are small implants placed between the vertebrae’s spinous processes. By limiting painful extension
                  and helping maintain space in the spinal canal, they can reduce nerve pressure in certain stenosis patterns—with less
                  downtime than more extensive surgery in appropriate patients.
                </p>
                <p className="iss-understanding-paragraph">Here is how the procedure is done:</p>
              </div>
            </div>

            <div className="iss-steps-grid" role="list" aria-label="Interspinous spacer implantation steps">
              <article className="iss-step-card" role="listitem" aria-label="Step 1 preparation">
                <p className="iss-step-number">1.</p>
                <h3 className="iss-step-title">Preparation</h3>
                <div className="iss-step-divider" aria-hidden="true" />
                <p className="iss-step-body">
                  Before the procedure, your clinician reviews imaging (such as MRI) to confirm stenosis and determine the best level for
                  the spacer. Anaesthesia and positioning are planned for comfort and safety.
                </p>
              </article>

              <article className="iss-step-card" role="listitem" aria-label="Step 2 procedure">
                <p className="iss-step-number">2.</p>
                <h3 className="iss-step-title">Procedure</h3>
                <div className="iss-step-divider" aria-hidden="true" />
                <p className="iss-step-body">
                  A small incision is made in the lower back and the spacer is positioned between the spinous processes at the affected
                  level. It is secured to help maintain space and reduce nerve compression in selected cases.
                </p>
              </article>

              <article className="iss-step-card" role="listitem" aria-label="Step 3 completion">
                <p className="iss-step-number">3.</p>
                <h3 className="iss-step-title">Completion</h3>
                <div className="iss-step-divider" aria-hidden="true" />
                <p className="iss-step-body">
                  The incision is closed and a dressing is applied. Recovery focuses on walking progression, protecting the surgical site,
                  and follow-up rehabilitation to rebuild endurance and confidence.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section iss-aftercare" aria-labelledby="iss-aftercare-title">
          <header className="iss-aftercare-header">
              <h2 id="iss-aftercare-title" className="iss-aftercare-title">
                What to Expect After the Procedure
              </h2>
              <p className="iss-aftercare-subtitle">
                Recovery from an interspinous spacer procedure is often quicker than more extensive surgery. Here’s what you can typically
                expect:
              </p>
          </header>

          <div className="iss-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="iss-aftercare-media" aria-hidden="true">
                <div className="iss-aftercare-poster">
                  <img
                  className="iss-aftercare-image"
                  src="/assets/images/learn/9-radiating-pain.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                </div>
              </figure>

              <div className="iss-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="iss-aftercare-item" role="listitem">
                  <h3 className="iss-aftercare-item-title">Recovery Time</h3>
                  <p className="iss-aftercare-item-body">
                    Many patients go home the same day or shortly after. Light activity can often resume within a few days, while heavy
                    lifting is usually limited for a period.
                  </p>
                </article>
                <div className="iss-aftercare-divider" aria-hidden="true" />
                <article className="iss-aftercare-item" role="listitem">
                  <h3 className="iss-aftercare-item-title">Pain Relief</h3>
                  <p className="iss-aftercare-item-body">
                    Some people notice improved walking tolerance early, while others experience gradual improvement as inflammation settles
                    and rehabilitation progresses.
                  </p>
                </article>
                <div className="iss-aftercare-divider" aria-hidden="true" />
                <article className="iss-aftercare-item" role="listitem">
                  <h3 className="iss-aftercare-item-title">Follow‑Up Care</h3>
                  <p className="iss-aftercare-item-body">
                    Follow-up appointments monitor healing and symptoms. A structured walking and physiotherapy plan helps restore endurance
                    and confidence.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section iss-benefits" aria-labelledby="iss-benefits-title">
          <div className="iss-benefits-inner">
            <header className="iss-benefits-header">
              <h2 id="iss-benefits-title" className="iss-benefits-title">
                Benefits of Interspinous Spacers
                <br />
                Treatment
              </h2>
              <p className="iss-benefits-subtitle">
                Interspinous spacers offer several advantages, making them an appealing option for individuals with lumbar spinal stenosis:
              </p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of interspinous spacers">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Fast Recovery</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  The procedure uses a small incision, aiming for quicker recovery and less disruption than many open surgeries.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Immediate Relief</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Selected patients often experience earlier improvements in standing or walking tolerance by reducing posture‑dependent
                  nerve compression.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Motion Autonomy</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  The spacer limits painful extension at a targeted level while preserving overall movement compared with fusion in
                  selected cases.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section iss-conditions" aria-labelledby="iss-conditions-title">
          <div className="iss-conditions-inner tms-conditions-inner">
            <header className="iss-conditions-header tms-conditions-header">
              <h2 id="iss-conditions-title" className="iss-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Interspinous Spacers
              </h2>
            </header>

            <div className="iss-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with interspinous spacers">
              <article className="iss-condition-card tms-conditions-card" role="listitem" aria-labelledby="iss-condition-stenosis-title">
                <div className="iss-condition-copy tms-conditions-copy">
                  <h3 id="iss-condition-stenosis-title" className="iss-condition-title tms-conditions-card-title">
                    Lumbar Spinal Stenosis
                  </h3>
                  <p className="iss-condition-body tms-conditions-card-body">
                    Narrowing in the lower spine can compress nerves, causing leg pain or heaviness with walking. Spacers can help create
                    space in selected cases.
                  </p>
                </div>
                <div className="iss-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iss-condition-image tms-conditions-image" src="/assets/images/learn/9-radiating-pain.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="iss-condition-card tms-conditions-card" role="listitem" aria-labelledby="iss-condition-ddd-title">
                <div className="iss-condition-copy tms-conditions-copy">
                  <h3 id="iss-condition-ddd-title" className="iss-condition-title tms-conditions-card-title">
                    Degenerative Disc Disease
                  </h3>
                  <p className="iss-condition-body tms-conditions-card-body">
                    Degenerative changes can reduce space and irritate nerves. In carefully selected cases, a spacer may support symptom
                    relief when stenosis features are present.
                  </p>
                </div>
                <div className="iss-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iss-condition-image tms-conditions-image" src="/assets/images/learn/9-radiating-pain.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="iss-condition-card tms-conditions-card" role="listitem" aria-labelledby="iss-condition-spondy-title">
                <div className="iss-condition-copy tms-conditions-copy">
                  <h3 id="iss-condition-spondy-title" className="iss-condition-title tms-conditions-card-title">
                    Spondylolisthesis
                  </h3>
                  <p className="iss-condition-body tms-conditions-card-body">
                    When stable and appropriately assessed, spacers may help relieve posture‑dependent symptoms in selected stenosis-related
                    presentations.
                  </p>
                </div>
                <div className="iss-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iss-condition-image tms-conditions-image" src="/assets/images/learn/9-radiating-pain.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="iss-condition-card tms-conditions-card" role="listitem" aria-labelledby="iss-condition-facet-title">
                <div className="iss-condition-copy tms-conditions-copy">
                  <h3 id="iss-condition-facet-title" className="iss-condition-title tms-conditions-card-title">
                    Facet Joint Syndrome
                  </h3>
                  <p className="iss-condition-body tms-conditions-card-body">
                    In some cases, reducing extension at a targeted level can help when facet-related pain overlaps with stenosis symptoms.
                  </p>
                </div>
                <div className="iss-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iss-condition-image tms-conditions-image" src="/assets/images/learn/9-radiating-pain.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section iss-right-for-you" aria-labelledby="iss-right-for-you-title">
          <div className="iss-right-for-you-inner">
            <div className="iss-right-for-you-layout">
              <h2 id="iss-right-for-you-title" className="iss-right-for-you-title">
                Are Interspinous Spacers
                <br />
                Treatment Right for You?
              </h2>
              <div className="iss-right-for-you-copy">
                <p className="iss-right-for-you-paragraph">
                  Determining whether interspinous spacers are appropriate depends on your symptoms, examination findings, and imaging. They
                  are typically considered for selected cases of lumbar spinal stenosis—especially when symptoms worsen with standing or
                  walking and improve when bending forward.
                </p>
                <p className="iss-right-for-you-paragraph">Ideal candidates often include people who:</p>
                <ul className="iss-right-for-you-list" aria-label="Who may be suitable for interspinous spacers">
                  <li className="iss-right-for-you-list-item">
                    Have been diagnosed with lumbar spinal stenosis and experience leg pain, heaviness, or difficulty walking.
                  </li>
                  <li className="iss-right-for-you-list-item">
                    Have not found sufficient relief with conservative treatments such as physiotherapy, medication, or injections.
                  </li>
                  <li className="iss-right-for-you-list-item">
                    Seek a less invasive option than more extensive spinal surgery, when spine stability and anatomy are suitable.
                  </li>
                </ul>
                <p className="iss-right-for-you-paragraph">
                  A specialist will review your overall health and goals and discuss alternatives to ensure this approach fits your needs and
                  is safe for your spine.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section iss-faq" aria-labelledby="iss-faq-title">
          <div className="iss-faq-inner">
            <header className="iss-faq-header">
              <h2 id="iss-faq-title" className="iss-faq-title">
                Interspinous Spacers FAQ
              </h2>
            </header>

            <div className="iss-faq-card" role="list" aria-label="Interspinous spacers frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `iss-faq-${item.id}`;
                const panelId = `iss-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="iss-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="iss-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="iss-faq-question">{item.question}</span>
                      <span className="iss-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="iss-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="iss-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="iss-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="iss-details-title" className="minimally-invasive-treatment-details-title">
              Interspinous spacers: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Interspinous spacers can be useful for carefully selected people with stenosis‑related symptoms. Your surgeon will explain
              whether your spine is stable enough and whether nerve decompression is also required.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-technique-title">
              <h3 id="iss-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                The spacer is positioned between spinal bones to maintain space and reduce extension (backward bending) at the affected
                level. This can decrease pressure on nerves in certain stenosis patterns.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-benefits-title">
              <h3 id="iss-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of interspinous spacers">
                <li>May improve walking tolerance in selected lumbar stenosis presentations.</li>
                <li>Minimally invasive approach with smaller incisions than many open surgeries.</li>
                <li>Can reduce leg symptoms linked to posture‑dependent nerve compression.</li>
                <li>Often supports earlier mobilisation and rehabilitation focus.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-steps-title">
              <h3 id="iss-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Interspinous spacer procedural steps">
                <li>Assessment and imaging review to confirm level and stability.</li>
                <li>Anaesthesia and positioning.</li>
                <li>Small incision and preparation between the spinous processes.</li>
                <li>Implant placement and confirmation of position.</li>
                <li>Closure, mobilisation guidance, and follow‑up schedule.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-risks-title">
              <h3 id="iss-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of interspinous spacers">
                <li>Bleeding, infection, or wound healing issues.</li>
                <li>Persistent or recurrent symptoms if stenosis is multi‑level or the diagnosis differs.</li>
                <li>Implant migration, fracture of surrounding bone, or need for revision (uncommon but possible).</li>
                <li>Progression of degeneration or instability over time in some cases.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-prep-title">
              <h3 id="iss-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for interspinous spacers">
                <li>Bring imaging and medication list; discuss blood thinners and osteoporosis risk.</li>
                <li>Plan transport and short‑term support at home if needed.</li>
                <li>Follow wound care instructions and guidance on bending/lifting during early healing.</li>
                <li>Progress walking and physiotherapy as advised to restore function.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iss-recovery-title">
              <h3 id="iss-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many patients mobilise early. Improvements in walking tolerance may develop over weeks alongside rehabilitation. The team
                monitors symptoms and guides safe activity progression.
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

export default InterspinousSpacersPage;
