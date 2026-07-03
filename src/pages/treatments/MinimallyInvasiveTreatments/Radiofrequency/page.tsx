import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Radiofrequency.css';

type RadiofrequencyFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const RADIOFREQUENCY_FAQ: RadiofrequencyFaqItem[] = [
  {
    id: 'what-is-rfa',
    question: 'What is Radiofrequency Ablation (RFA)?',
    answer:
      'Radiofrequency Ablation (RFA) is a minimally invasive procedure that uses radiofrequency energy to heat and modulate specific nerves to reduce pain signals. It is commonly used to treat chronic pain conditions such as neck pain, back pain, and arthritic facet joint pain.',
  },
  {
    id: 'how-does-rfa-work',
    question: 'How does RFA work?',
    answer:
      'RFA targets nerves that carry pain signals. Using image guidance, a clinician positions a needle next to the target nerve and applies controlled radiofrequency energy. This reduces the nerve’s ability to transmit pain signals for a period of time.',
  },
  {
    id: 'good-candidate',
    question: 'Who is a good candidate for RFA?',
    answer:
      'People with persistent spine-related pain that has not improved with conservative care may be considered for RFA. Candidates are typically selected after a clinical assessment and, in many cases, diagnostic injections that suggest the target nerve is contributing to the pain.',
  },
  {
    id: 'what-to-expect-during',
    question: 'What can I expect during the RFA procedure?',
    answer:
      'RFA is usually performed as a day-case procedure. The area is cleaned, local anaesthetic is used, and image guidance helps place the needle safely. You may feel pressure but the goal is to keep you comfortable throughout the procedure.',
  },
  {
    id: 'recovery-time',
    question: 'How long does it take to recover from RFA?',
    answer:
      'Most people return to light activities within 24–48 hours. Some temporary soreness is common. Improvement can be immediate for some, but for others it may build over several days to a few weeks.',
  },
  {
    id: 'benefits',
    question: 'What are the benefits of RFA?',
    answer:
      'Potential benefits include meaningful pain reduction, improved function, decreased flare frequency, and less reliance on long-term pain medication for some people. It is minimally invasive and typically does not require an overnight stay.',
  },
  {
    id: 'how-long-relief-lasts',
    question: 'How long does pain relief last after RFA?',
    answer:
      'Relief commonly lasts months and can vary by condition, technique, and individual factors. Nerves can regenerate over time, so the effect is not permanent, but the procedure may be repeated in selected cases if appropriate.',
  },
  {
    id: 'risks-side-effects',
    question: 'Are there any risks or side effects associated with RFA?',
    answer:
      'Side effects are usually mild and temporary, such as soreness or bruising at the needle site. Less commonly, people can experience numbness, tingling, or a short-term pain flare. Your clinician will review risks based on your health profile.',
  },
  {
    id: 'conditions-treated',
    question: 'What conditions can be treated with RFA?',
    answer:
      'RFA is often used for facet joint pain in the neck or back and can also be used for selected sacroiliac pain patterns and other specific indications after specialist assessment.',
  },
  {
    id: 'permanent-solution',
    question: 'Is RFA a permanent solution for pain?',
    answer:
      'RFA is not typically permanent because nerves can recover over time. It is best viewed as one part of a broader plan that may include rehabilitation, lifestyle strategies, and other treatments tailored to your diagnosis.',
  },
];

const RadiofrequencyPage: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(() => RADIOFREQUENCY_FAQ[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle = 'Radiofrequency ablation in Algarve | Targeted nerve pain relief';
    document.title = pageTitle;

    const description =
      'Discover radiofrequency ablation in Algarve for chronic neck or back pain. Image‑guided, minimally invasive, and easy to book for consultation.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-radiofrequency') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page radiofrequency-page page-radiofrequency" id="psx-radiofrequency">
      <header className="treatment-page-hero radiofrequency-hero" aria-label="Radiofrequency ablation hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/3-Facet-Joint-Pain.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Radiofrequency</h1>
          <p className="psx-hero-subtitle">
            Targeted radiofrequency reduces pain by calming overactive nerves.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Radiofrequency" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="rfa-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/3-Facet-Joint-Pain.webp"
                alt="Illustration representing facet joint pain and the targeted nerve pathways treated with radiofrequency ablation (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="rfa-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Radiofrequency ablation (RFA) is an image‑guided technique that reduces pain signals from selected nerves. It is commonly
                used for spine‑related facet joint pain after a structured assessment and confirmatory diagnostic blocks.
              </p>
              <p className="treatments-feature-body">
                The pathway often includes a consultation, imaging review, and diagnostic injections to confirm the target. If the test
                blocks provide meaningful temporary relief, RFA may offer longer‑lasting symptom reduction for suitable patients.
              </p>
              <p className="treatments-feature-body">
                After the procedure, most people resume light activities quickly. Rehabilitation focuses on restoring movement capacity and
                building a plan to reduce flare‑ups and improve resilience.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section rfa-procedure" aria-labelledby="rfa-procedure-title">
          <div className="rfa-procedure-inner">
            <div className="rfa-procedure-top">
              <h2 id="rfa-procedure-title" className="rfa-procedure-title">How the procedure is done</h2>
              <div className="rfa-procedure-copy">
                <p className="rfa-procedure-paragraph">
                  Radiofrequency ablation uses image guidance and controlled heat to target pain-generating nerves with precision. Here is
                  how the procedure is done:
                </p>
              </div>
            </div>

            <div className="rfa-steps-grid" role="list" aria-label="Radiofrequency procedure steps">
            <article className="rfa-step-card" role="listitem" aria-label="Step 1 preparation">
              <p className="rfa-step-number">1.</p>
              <h3 className="rfa-step-title">Preparation</h3>
              <div className="rfa-step-divider" aria-hidden="true" />
              <p className="rfa-step-body">
                Before the procedure, patients may undergo imaging tests such as MRI or CT scans to confirm the target area.
              </p>
              <p className="rfa-step-body">
                Most procedures are performed as a day‑case, so you can usually go home the same day.
              </p>
            </article>
            <article className="rfa-step-card" role="listitem" aria-label="Step 2 anaesthesia">
              <p className="rfa-step-number">2.</p>
              <h3 className="rfa-step-title">Anaesthesia</h3>
              <div className="rfa-step-divider" aria-hidden="true" />
              <p className="rfa-step-body">
                Local anaesthetic is used to numb the skin and deeper tissues. Sedation may be offered when appropriate.
              </p>
            </article>
            <article className="rfa-step-card" role="listitem" aria-label="Step 3 needle insertion">
              <p className="rfa-step-number">3.</p>
              <h3 className="rfa-step-title">Needle insertion</h3>
              <div className="rfa-step-divider" aria-hidden="true" />
              <p className="rfa-step-body">
                Using fluoroscopy (real‑time X‑ray) or ultrasound guidance, the clinician positions the needle at the target nerve.
              </p>
            </article>
            <article className="rfa-step-card" role="listitem" aria-label="Step 4 electrode insertion">
              <p className="rfa-step-number">4.</p>
              <h3 className="rfa-step-title">Electrode insertion</h3>
              <div className="rfa-step-divider" aria-hidden="true" />
              <p className="rfa-step-body">
                A micro‑electrode is introduced through the needle. Test stimulation helps confirm correct placement and safety.
              </p>
            </article>
            <article className="rfa-step-card rfa-step-card--highlight" role="listitem" aria-label="Step 5 RF current">
              <p className="rfa-step-number">5.</p>
              <h3 className="rfa-step-title">RF current</h3>
              <div className="rfa-step-divider" aria-hidden="true" />
              <p className="rfa-step-body">
                Once confirmed, radiofrequency current creates a controlled lesion to reduce pain signalling from the target nerve.
              </p>
            </article>
            <article className="rfa-step-card" role="listitem" aria-label="Step 6 duration">
              <p className="rfa-step-number">6.</p>
              <h3 className="rfa-step-title">Duration</h3>
              <div className="rfa-step-divider" aria-hidden="true" />
              <p className="rfa-step-body">
                The procedure typically takes 30–60 minutes, depending on how many levels or nerves are treated.
              </p>
            </article>
            </div>
          </div>
        </section>

        <section className="page-section rfa-aftercare" aria-labelledby="rfa-aftercare-title">
          <header className="rfa-aftercare-header">
            <h2 id="rfa-aftercare-title" className="rfa-aftercare-title">What to expect after the procedure</h2>
            <p className="rfa-aftercare-subtitle">Radiofrequency Ablation post‑procedure care is simple and straightforward:</p>
          </header>
          <div className="rfa-aftercare-layout">
            <figure className="rfa-aftercare-media" aria-hidden="true">
              <img
                className="rfa-aftercare-image"
                src="/assets/images/radiofrequency/DSC04190-1536x1229.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="rfa-aftercare-panel" role="list" aria-label="Post-procedure expectations">
              <article className="rfa-aftercare-item" role="listitem">
                <h3 className="rfa-aftercare-item-title">Immediate Effects</h3>
                <p className="rfa-aftercare-item-body">
                  Some people feel relief quickly, while for others it can take a few days to notice the full effect.
                </p>
              </article>
              <div className="rfa-aftercare-divider" aria-hidden="true" />
              <article className="rfa-aftercare-item" role="listitem">
                <h3 className="rfa-aftercare-item-title">Recovery</h3>
                <p className="rfa-aftercare-item-body">
                  Most people return to normal activities within 24 to 48 hours. Avoid strenuous activity for a few days if advised.
                </p>
              </article>
              <div className="rfa-aftercare-divider" aria-hidden="true" />
              <article className="rfa-aftercare-item" role="listitem">
                <h3 className="rfa-aftercare-item-title">Follow‑Up</h3>
                <p className="rfa-aftercare-item-body">
                  Follow‑up appointments help monitor progress, optimise rehabilitation, and address any questions.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section rfa-benefits" aria-labelledby="rfa-benefits-title">
          <header className="rfa-benefits-header">
            <h2 id="rfa-benefits-title" className="rfa-benefits-title">Benefits of Radiofrequency Ablation</h2>
            <p className="rfa-benefits-subtitle">RFA offers several benefits:</p>
          </header>
          <div className="rfa-benefits-grid" role="list" aria-label="Benefits of radiofrequency ablation">
            <article className="rfa-benefit" role="listitem">
              <h3 className="rfa-benefit-title">Long‑Lasting Pain Relief</h3>
              <div className="rfa-benefit-divider" aria-hidden="true" />
              <p className="rfa-benefit-body">
                Relief can last 6–12 months in selected patients and may be useful for facet or sacroiliac pain patterns.
              </p>
            </article>
            <article className="rfa-benefit" role="listitem">
              <h3 className="rfa-benefit-title">Minimally Invasive</h3>
              <div className="rfa-benefit-divider" aria-hidden="true" />
              <p className="rfa-benefit-body">
                Image‑guided and performed as a day‑case procedure, supporting quicker recovery than open surgery.
              </p>
            </article>
            <article className="rfa-benefit" role="listitem">
              <h3 className="rfa-benefit-title">Reduced Medication Dependence</h3>
              <div className="rfa-benefit-divider" aria-hidden="true" />
              <p className="rfa-benefit-body">
                For some people, better pain control can reduce reliance on long‑term pain medicines and their side effects.
              </p>
            </article>
            <article className="rfa-benefit rfa-benefit--wide" role="listitem">
              <h3 className="rfa-benefit-title">Improved Quality of Life</h3>
              <div className="rfa-benefit-divider" aria-hidden="true" />
              <p className="rfa-benefit-body">
                When pain improves, it can be easier to walk, sit, sleep and follow a rehabilitation plan to build resilience.
              </p>
            </article>
            <article className="rfa-benefit rfa-benefit--wide" role="listitem">
              <h3 className="rfa-benefit-title">Safety</h3>
              <div className="rfa-benefit-divider" aria-hidden="true" />
              <p className="rfa-benefit-body">
                Complications are uncommon. Your clinician will explain suitability, risks and aftercare based on your health profile.
              </p>
            </article>
          </div>
        </section>

        <div className="page-section rfa-conditions tms-conditions-inner" aria-labelledby="rfa-conditions-title">
          <header className="rfa-conditions-header tms-conditions-header">
            <h2 id="rfa-conditions-title" className="rfa-conditions-title tms-conditions-title">Conditions Treated with Radiofrequency Ablation (RFA)</h2>
          </header>
          <div className="rfa-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with radiofrequency ablation">
            <article className="rfa-condition-card tms-conditions-card" role="listitem" aria-labelledby="rfa-condition-facet-title">
              <div className="rfa-condition-copy tms-conditions-copy">
                <h3 id="rfa-condition-facet-title" className="rfa-condition-title tms-conditions-card-title">Facet Joint Pain</h3>
                <p className="rfa-condition-body tms-conditions-card-body">
                  Chronic pain from irritated facet joints; RFA targets the nerves transmitting those pain signals.
                </p>
              </div>
              <div className="rfa-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="rfa-condition-image tms-conditions-image"
                  src="/assets/images/radiofrequency/3-Facet-Joint-Pain.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
            <article className="rfa-condition-card tms-conditions-card" role="listitem" aria-labelledby="rfa-condition-si-title">
              <div className="rfa-condition-copy tms-conditions-copy">
                <h3 id="rfa-condition-si-title" className="rfa-condition-title tms-conditions-card-title">Sacroiliac Joint Pain</h3>
                <p className="rfa-condition-body tms-conditions-card-body">
                  Pain where the spine meets the pelvis; RFA can reduce nerve signalling from the SI joint region.
                </p>
              </div>
              <div className="rfa-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="rfa-condition-image tms-conditions-image"
                  src="/assets/images/radiofrequency/4-Sacroiliac-Joint-Pain.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
            <article className="rfa-condition-card tms-conditions-card" role="listitem" aria-labelledby="rfa-condition-trigeminal-title">
              <div className="rfa-condition-copy tms-conditions-copy">
                <h3 id="rfa-condition-trigeminal-title" className="rfa-condition-title tms-conditions-card-title">Trigeminal Neuralgia</h3>
                <p className="rfa-condition-body tms-conditions-card-body">
                  Severe facial pain; selected cases may benefit from targeted radiofrequency procedures after specialist review.
                </p>
              </div>
              <div className="rfa-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="rfa-condition-image tms-conditions-image"
                  src="/assets/images/radiofrequency/5-Trigeminal-Neuralgia.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
            <article className="rfa-condition-card tms-conditions-card" role="listitem" aria-labelledby="rfa-condition-back-title">
              <div className="rfa-condition-copy tms-conditions-copy">
                <h3 id="rfa-condition-back-title" className="rfa-condition-title tms-conditions-card-title">Chronic Back Pain</h3>
                <p className="rfa-condition-body tms-conditions-card-body">
                  For selected persistent spine pain, RFA can reduce pain signals from identified target nerves.
                </p>
              </div>
              <div className="rfa-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="rfa-condition-image tms-conditions-image"
                  src="/assets/images/radiofrequency/6-Chronic-Back-Pain.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </div>
        </div>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="rfa-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="rfa-details-title" className="minimally-invasive-treatment-details-title">
              Radiofrequency ablation: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              RFA is most effective when the pain generator and target nerves are clearly identified. Your clinician will explain whether
              the goal is to treat facet joint pain, sacroiliac pain, or other selected indications.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-technique-title">
              <h3 id="rfa-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A specialised needle is positioned under imaging guidance next to the target nerve. Controlled radiofrequency energy is
                applied to interrupt pain signalling. The nerve can regenerate over time, which is why results are not permanent.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-benefits-title">
              <h3 id="rfa-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of radiofrequency ablation">
                <li>Can reduce chronic spine‑related pain in appropriately selected patients.</li>
                <li>Often improves activity tolerance and reduces flare frequency when combined with rehabilitation.</li>
                <li>Outpatient, minimally invasive procedure with small skin entry points.</li>
                <li>May reduce reliance on medication for some people.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-steps-title">
              <h3 id="rfa-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Radiofrequency ablation procedural steps">
                <li>Assessment and diagnostic blocks to confirm the target when indicated.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle placement under imaging guidance.</li>
                <li>Test stimulation and controlled lesioning of the target nerve.</li>
                <li>Observation, discharge advice, and rehabilitation follow‑up plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-risks-title">
              <h3 id="rfa-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of radiofrequency ablation">
                <li>Temporary soreness or a short‑term pain flare.</li>
                <li>Bruising, bleeding, or infection at the needle site (uncommon).</li>
                <li>Numbness, tingling, or nerve irritation (usually temporary).</li>
                <li>Incomplete relief if the pain generator is different from the target.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-prep-title">
              <h3 id="rfa-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for radiofrequency ablation">
                <li>Bring a medication list; discuss blood thinners and diabetes management ahead of time.</li>
                <li>Arrange transport if sedation is used.</li>
                <li>Follow guidance on activity for the first 24–48 hours and resume movement gradually.</li>
                <li>Track functional improvements (walking, sitting tolerance) as well as pain levels.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="rfa-recovery-title">
              <h3 id="rfa-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Most people return to light activities quickly. Benefits may build over days to weeks. Your clinician will advise how to
                progress exercise and rehabilitation for longer‑term improvement.
              </p>
            </article>
          </div>
        </section>

        <section className="page-section rfa-help" aria-labelledby="rfa-help-title">
          <div className="rfa-help-inner">
            <h2 id="rfa-help-title" className="rfa-help-title">Is Cryoablation Right for You?</h2>
            <div className="rfa-help-copy">
              <p className="rfa-help-paragraph">
                Cryoablation is a suitable option for many individuals with specific types of tumours or chronic pain that have not
                responded well to other treatments.
              </p>
              <p className="rfa-help-paragraph">
                Consulting with a specialized physician is essential to determine if cryoablation is the appropriate treatment for your
                condition.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section rfa-faq" aria-labelledby="rfa-faq-title">
          <div className="rfa-faq-inner">
            <header className="rfa-faq-header">
              <h2 id="rfa-faq-title" className="rfa-faq-title">Radiofrequency Ablation FAQ</h2>
            </header>
            <div className="rfa-faq-card" role="list" aria-label="Radiofrequency ablation frequently asked questions">
              {RADIOFREQUENCY_FAQ.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `rfa-faq-${item.id}`;
                const panelId = `rfa-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="rfa-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="rfa-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="rfa-faq-question">{item.question}</span>
                      <span className="rfa-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="rfa-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="rfa-faq-answer">{item.answer}</p>
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

export default RadiofrequencyPage;
