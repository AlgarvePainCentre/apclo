import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Cryoblation.css';

type CryoblationFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const CRYOBLATION_FAQ: CryoblationFaqItem[] = [
  {
    id: 'what-is',
    question: 'What is cryoablation?',
    answer:
      'Cryoablation is a minimally invasive procedure that uses controlled cold to target abnormal tissue or selected nerves. It is used in certain pain conditions and other clinical indications when precise, image‑guided treatment is appropriate.',
  },
  {
    id: 'how-it-works',
    question: 'How does cryoablation work?',
    answer:
      'Using imaging guidance, a probe is positioned at the target. Controlled freezing cycles create a localized cold effect that can disrupt pain signalling from selected nerves or affect targeted tissue, while aiming to limit impact on surrounding structures.',
  },
  {
    id: 'conditions',
    question: 'What conditions can be treated with cryoablation?',
    answer:
      'Cryoablation may be considered for specific nerve‑mediated pain patterns and other selected indications after specialist assessment. Your clinician will confirm whether your symptoms and diagnosis match a treatable target.',
  },
  {
    id: 'painful',
    question: 'Is cryoablation painful?',
    answer:
      'Most people tolerate the procedure well. Local anaesthetic is used, and sedation may be offered when appropriate. Some temporary soreness, bruising, or altered sensation can occur afterward.',
  },
  {
    id: 'benefits',
    question: 'What are the benefits of cryoablation?',
    answer:
      'Potential benefits include targeted pain reduction, improved function, and a minimally invasive approach that often supports faster recovery. Results vary depending on the pain generator, target selection, and individual factors.',
  },
  {
    id: 'risks',
    question: 'What are the risks or side effects of cryoablation?',
    answer:
      'Side effects are usually mild and temporary, such as soreness, bruising, swelling, or numbness. Less common risks include bleeding or infection. Your clinician will discuss risks based on your health profile.',
  },
  {
    id: 'duration',
    question: 'How long does a cryoablation procedure take?',
    answer:
      'Many procedures take around 30–60 minutes, depending on the target area and the number of sites treated. Your team will confirm expected timing for your specific plan.',
  },
  {
    id: 'recovery',
    question: 'What is the recovery time after cryoablation?',
    answer:
      'Most people return to light activity quickly, often within a few days. Recovery varies by treatment site and overall health. You’ll receive guidance on activity progression and follow‑up.',
  },
  {
    id: 'effectiveness',
    question: 'How effective is cryoablation?',
    answer:
      'Effectiveness depends on accurate diagnosis and target selection. Some people experience meaningful pain reduction and improved function, while others may have partial or temporary relief. Cryo effects can change over time as tissues recover.',
  },
  {
    id: 'insurance',
    question: 'Is cryoablation covered by insurance?',
    answer:
      'Coverage varies by provider and policy, and may depend on diagnosis and medical necessity criteria. Our team can help you understand documentation needs and provide information for pre‑authorization if required.',
  },
];

const CryoblationPage: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(() => CRYOBLATION_FAQ[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle = 'Cryoablation in Algarve | Targeted cold therapy for nerve pain';
    document.title = pageTitle;

    const description =
      'Learn about cryoablation in Algarve for chronic nerve pain. Image‑guided cold treatment, fast recovery focus, and simple consultation booking.';

    let meta = document.querySelector('meta[name=\"description\"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-cryoblation') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page cryoblation-page page-cryoblation" id="psx-cryoblation">
      <header className="treatment-page-hero cryoblation-hero" aria-label="Cryoablation hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/illustrative/Thoracic-Wall-Pain-min.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Cryoblation</h1>
          <p className="psx-hero-subtitle">
            Precise cold therapy is used to interrupt pain signals from targeted nerves.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Cryoblation" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="cryo-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Thoracic-Wall-Pain-min.webp"
                alt="Image representing chest wall nerve pain patterns that may be treated with image-guided cryoablation in selected cases (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="cryo-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Cryoablation uses controlled cold to temporarily disrupt pain signalling from selected nerves. It can be considered for
                specific chronic pain patterns when the pain source and target nerves are clearly identified.
              </p>
              <p className="treatments-feature-body">
                Your clinician reviews symptoms, examination findings, and imaging, and may use diagnostic blocks to confirm the target.
                The aim is not only pain reduction, but improved function and participation in rehabilitation and activity progression.
              </p>
              <p className="treatments-feature-body">
                After the procedure, you may experience temporary soreness or numbness. Most people return to light activity quickly, with
                guidance on gradual return to exercise.
              </p>

            </div>
          </div>
        </section>

        <section className="page-section cryo-understanding" aria-labelledby="cryo-understanding-title">
          <div className="cryo-understanding-inner">
            <div className="cryo-understanding-top">
              <h2 id="cryo-understanding-title" className="cryo-understanding-title">
                Understanding
                <br />
                Cryoablation
              </h2>
              <div className="cryo-understanding-copy">
                <p className="cryo-understanding-paragraph">
                  Cryoablation is a minimally invasive technique that applies controlled cold through a probe to target tissues and nerves.
                  The aim is to reduce pain signalling while preserving surrounding structures.
                </p>
                <p className="cryo-understanding-paragraph">
                  This approach is used across selected pain conditions and procedures where precise, image‑guided targeting is important.
                  Your clinician will confirm suitability based on symptoms, examination, and imaging.
                </p>
                <p className="cryo-understanding-paragraph">Here is how the procedure is done:</p>
              </div>
            </div>

            <div className="cryo-steps-grid" role="list" aria-label="Cryoablation procedure steps">
              <article className="cryo-step-card" role="listitem" aria-label="Step 1 preparation">
                <p className="cryo-step-number">1.</p>
                <h3 className="cryo-step-title">Preparation</h3>
                <div className="cryo-step-divider" aria-hidden="true" />
                <p className="cryo-step-body">
                  Before the procedure, patients may undergo imaging tests such as MRI, CT scans, or ultrasound to locate the target tissue
                  or nerve.
                </p>
              </article>

              <article className="cryo-step-card" role="listitem" aria-label="Step 2 anaesthesia">
                <p className="cryo-step-number">2.</p>
                <h3 className="cryo-step-title">Anesthesia</h3>
                <div className="cryo-step-divider" aria-hidden="true" />
                <p className="cryo-step-body">
                  The procedure is performed under local anaesthesia to numb the area, and sometimes sedation is used to help the patient
                  relax.
                </p>
              </article>

              <article className="cryo-step-card" role="listitem" aria-label="Step 3 probe insertion">
                <p className="cryo-step-number">3.</p>
                <h3 className="cryo-step-title">Probe Insertion</h3>
                <div className="cryo-step-divider" aria-hidden="true" />
                <p className="cryo-step-body">
                  Using imaging guidance, the needle‑like probe is inserted through the skin and directed precisely to the target tissue.
                </p>
              </article>

              <article className="cryo-step-card cryo-step-card--highlight" role="listitem" aria-label="Step 4 freezing process">
                <p className="cryo-step-number">4.</p>
                <h3 className="cryo-step-title">Freezing Process</h3>
                <div className="cryo-step-divider" aria-hidden="true" />
                <p className="cryo-step-body">
                  Once the probe is in place, controlled freezing cycles cool the surrounding tissue to sub‑zero temperatures to disrupt
                  pain signalling.
                </p>
              </article>

              <article className="cryo-step-card" role="listitem" aria-label="Step 5 duration">
                <p className="cryo-step-number">5.</p>
                <h3 className="cryo-step-title">Duration</h3>
                <div className="cryo-step-divider" aria-hidden="true" />
                <p className="cryo-step-body">
                  The procedure typically takes 30–60 minutes, depending on the target area and the number of sites being treated.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section cryo-aftercare" aria-labelledby="cryo-aftercare-title">
          <header className="cryo-aftercare-header">
            <h2 id="cryo-aftercare-title" className="cryo-aftercare-title">
              What to Expect After the Procedure
            </h2>
            <p className="cryo-aftercare-subtitle">
              Post‑procedure, most patients experience a reduction in pain, though it can take a few days for some to feel the full
              effects.
            </p>
            <p className="cryo-aftercare-subtitle">Here&apos;s a breakdown of what you can expect:</p>
          </header>

          <div className="cryo-aftercare-layout" aria-label="Post-procedure expectations">
            <figure className="cryo-aftercare-media" aria-hidden="true">
              <div className="cryo-aftercare-poster">
                <img
                  className="cryo-aftercare-image"
                  src="/assets/images/illustrative/DSC02128-1536x1536.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>

            <div className="cryo-aftercare-panel" role="list" aria-label="Post-procedure expectations">
              <article className="cryo-aftercare-item" role="listitem">
                <h3 className="cryo-aftercare-item-title">Immediate Effects</h3>
                <p className="cryo-aftercare-item-body">
                  Some patients might experience immediate relief, while for others it may take a few days to feel the full benefits.
                </p>
              </article>
              <div className="cryo-aftercare-divider" aria-hidden="true" />
              <article className="cryo-aftercare-item" role="listitem">
                <h3 className="cryo-aftercare-item-title">Recovery</h3>
                <p className="cryo-aftercare-item-body">
                  Most patients can return to normal activities within a few days. Mild soreness or bruising at the treatment site is
                  common.
                </p>
              </article>
              <div className="cryo-aftercare-divider" aria-hidden="true" />
              <article className="cryo-aftercare-item" role="listitem">
                <h3 className="cryo-aftercare-item-title">Follow‑Up</h3>
                <p className="cryo-aftercare-item-body">
                  Follow‑up appointments help monitor progress, guide activity progression, and ensure the treatment remains effective.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section cryo-benefits" aria-labelledby="cryo-benefits-title">
          <div className="cryo-benefits-inner">
            <header className="cryo-benefits-header">
              <h2 id="cryo-benefits-title" className="cryo-benefits-title">Benefits of Cryoablation</h2>
              <p className="cryo-benefits-subtitle">
                Cryoablation can provide significant and long‑lasting pain relief by targeting nerves responsible for transmitting pain
                signals.
              </p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of cryoablation">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Effective Pain Relief</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Cryoablation can provide significant and long‑lasting pain relief by disrupting pain signalling from selected nerves.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Minimally Invasive</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  As a minimally invasive procedure, cryoablation typically involves less risk and shorter recovery time compared to open
                  surgery.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Precision</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Image guidance supports precise targeting of abnormal tissue or nerves, helping reduce the risk of affecting surrounding
                  healthy structures.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Versatility</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Cryoablation can be used for different pain patterns and selected procedures where targeted nerve modulation is
                  appropriate.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Outpatient Procedure</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Many cryoablation treatments are performed on an outpatient basis, allowing patients to go home the same day.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Minimal Scarring</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Because cryoablation uses small skin entry points, it typically results in minimal scarring compared to open procedures.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="cryo-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="cryo-details-title" className="minimally-invasive-treatment-details-title">
              Cryoablation: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Cryoablation can be effective for selected nerve‑mediated pain conditions. Your clinician will confirm suitability and
              explain alternative options based on diagnosis.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-technique-title">
              <h3 id="cryo-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A probe is positioned next to the target nerve under imaging guidance. Cold is applied in controlled cycles to reduce nerve
                signalling. The nerve typically recovers over time, so effects may not be permanent.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-benefits-title">
              <h3 id="cryo-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of cryoablation">
                <li>Can reduce targeted pain in selected nerve‑mediated conditions.</li>
                <li>Minimally invasive outpatient procedure in many settings.</li>
                <li>May improve function and activity tolerance when combined with rehabilitation.</li>
                <li>Often considered when conservative care has not provided sufficient relief.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-steps-title">
              <h3 id="cryo-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Cryoablation procedural steps">
                <li>Assessment and target confirmation, sometimes with diagnostic blocks.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Probe placement under imaging guidance.</li>
                <li>Controlled cryo cycles and monitoring.</li>
                <li>Aftercare instructions, activity progression, and follow‑up plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-risks-title">
              <h3 id="cryo-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of cryoablation">
                <li>Temporary soreness, bruising, or swelling at the treatment site.</li>
                <li>Temporary numbness or altered sensation.</li>
                <li>Bleeding or infection (uncommon).</li>
                <li>Incomplete symptom relief if the pain generator differs from the target.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-prep-title">
              <h3 id="cryo-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for cryoablation">
                <li>Bring medication list; discuss blood thinners, allergies, and diabetes management as needed.</li>
                <li>Arrange transport if sedation is used.</li>
                <li>Follow activity guidance for the first 24–48 hours, then progress gradually.</li>
                <li>Continue rehabilitation and strength goals to support longer‑term improvement.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cryo-recovery-title">
              <h3 id="cryo-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people return to normal daily activities quickly. Functional improvements develop alongside recovery and rehabilitation.
                Your team will advise when to resume sport or heavy lifting.
              </p>
            </article>
          </div>
        </section>

        <section className="page-section cryo-help" aria-labelledby="cryo-help-title">
          <div className="cryo-help-inner">
            <h2 id="cryo-help-title" className="cryo-help-title">
              Is Cryoablation
              <br />
              Right for You?
            </h2>
            <div className="cryo-help-copy">
              <p className="cryo-help-paragraph">
                Cryoablation is a suitable option for many individuals with specific types of tumours or chronic pain that have not
                responded well to other treatments.
              </p>
              <p className="cryo-help-paragraph">
                Consulting with a specialized physician is essential to determine if cryoablation is the appropriate treatment for your
                condition.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section cryo-faq" aria-labelledby="cryo-faq-title">
          <div className="cryo-faq-inner">
            <header className="cryo-faq-header">
              <h2 id="cryo-faq-title" className="cryo-faq-title">Cryoablation FAQ</h2>
            </header>
            <div className="cryo-faq-card" role="list" aria-label="Cryoablation frequently asked questions">
              {CRYOBLATION_FAQ.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `cryo-faq-${item.id}`;
                const panelId = `cryo-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="cryo-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="cryo-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="cryo-faq-question">{item.question}</span>
                      <span className="cryo-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="cryo-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="cryo-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideNonInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default CryoblationPage;
