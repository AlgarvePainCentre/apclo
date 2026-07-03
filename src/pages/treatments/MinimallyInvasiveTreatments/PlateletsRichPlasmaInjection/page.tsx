import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './PlateletsRichPlasmaInjection.css';

type PrpFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const PRP_FAQ: PrpFaqItem[] = [
  {
    id: 'results-timeline',
    question: 'How long does it take to see results from PRP injections?',
    answer:
      'Many people start noticing changes within a few weeks to a few months. Timing depends on the condition being treated, the tissue involved, and the individual healing response, as well as how consistently rehabilitation is followed.',
  },
  {
    id: 'painful',
    question: 'Are PRP injections painful?',
    answer:
      'Most people tolerate PRP injections well. You may feel pressure or a brief sting at the injection site, and some temporary soreness afterward. Ultrasound guidance and careful technique can help improve comfort and accuracy.',
  },
  {
    id: 'how-many',
    question: 'How many PRP treatments are needed?',
    answer:
      'This varies by diagnosis and severity. Some conditions may respond after a single injection, while others may require a series. Your clinician will recommend an approach based on your assessment and expected response.',
  },
  {
    id: 'risks',
    question: 'What are the risks of PRP injections?',
    answer:
      'Side effects are usually mild and temporary, such as soreness, swelling, or bruising. Infection and significant bleeding are uncommon. Because PRP uses your own blood components, allergic reactions are rare.',
  },
  {
    id: 'cosmetic',
    question: 'Can PRP be used for cosmetic purposes?',
    answer:
      'PRP is sometimes used in cosmetic and dermatology settings. If you are considering PRP for cosmetic reasons, a dedicated consultation can clarify suitability, expected outcomes, and alternative options.',
  },
];

const PlateletsRichPlasmaInjectionPage: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(() => PRP_FAQ[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle =
      'Platelet-rich plasma (PRP) injection in Algarve | Regenerative pain care';
    document.title = pageTitle;

    const description =
      'Discover platelet-rich plasma (PRP) injections in Algarve for joints, tendons, and ligaments. Regenerative treatment with specialist assessment and booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-platelets-rich-plasma-injection') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page platelets-rich-plasma-injection-page page-plateletsrichplasmainjection" id="psx-platelets-rich-plasma-injection">
      <header className="treatment-page-hero platelets-rich-plasma-injection-hero" aria-label="Platelets rich plasma injection hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/medical/1-platelets-plasma-injection.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Platelets rich plasma injection</h1>
          <p className="psx-hero-subtitle">
            Concentrated platelets from your own blood support tissue healing and pain relief.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Platelets rich plasma injection" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="prp-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/medical/1-platelets-plasma-injection.webp"
                alt="Platelet-rich plasma (PRP) preparation for injection used in regenerative medicine for joints, tendons, and ligaments (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="prp-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Platelet‑rich plasma (PRP) uses a concentrated portion of your own blood (platelets and growth factors) placed into a
                target tissue to support healing in selected tendon, ligament, or joint conditions. Evidence and expected response vary by
                diagnosis, which is why careful assessment matters.
              </p>
              <p className="treatments-feature-body">
                The appointment usually includes a review of symptoms, examination, and imaging where needed. Blood is drawn, processed to
                concentrate platelets, then injected into the target region—often with ultrasound guidance for accuracy.
              </p>
              <p className="treatments-feature-body">
                Aftercare typically involves short relative rest followed by a structured graded loading and rehabilitation plan. This
                combination is often central to longer‑term improvement.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section prp-process" aria-labelledby="prp-process-title">
          <div className="prp-process-inner">
            <div className="prp-process-top">
              <h2 id="prp-process-title" className="prp-process-title">
                Understanding the
                <br />
                Platelet–Rich Plasma
                <br />
                Injection Process
              </h2>
              <div className="prp-process-copy">
                <p className="prp-process-paragraph">
                  Platelet‑Rich Plasma (PRP) injections are a regenerative treatment used to support healing in selected tendon, ligament,
                  and joint conditions.
                </p>
                <p className="prp-process-paragraph">
                  PRP is derived from your own blood, which makes it a natural, low‑risk option when it is used in the right clinical
                  context.
                </p>
                <p className="prp-process-paragraph">
                  PRP is a concentrated portion of platelets and growth factors created from a small sample of blood. These factors may
                  influence the local healing environment and support a graded rehabilitation plan.
                </p>
                <p className="prp-process-paragraph">
                  By increasing the concentration of these growth factors, PRP injections can help stimulate tissue repair and reduce
                  inflammation at the injury site in selected diagnoses.
                </p>
                <p className="prp-process-paragraph">Here is how the procedure is done:</p>
              </div>
            </div>

            <div className="prp-steps-grid" role="list" aria-label="Platelet-rich plasma injection steps">
              <article className="prp-step-card" role="listitem" aria-label="Step 1 blood draw">
                <p className="prp-step-number">1.</p>
                <h3 className="prp-step-title">Blood Draw</h3>
                <div className="prp-step-divider" aria-hidden="true" />
                <p className="prp-step-body">A small amount of blood is drawn from your arm.</p>
              </article>

              <article className="prp-step-card" role="listitem" aria-label="Step 2 centrifugation">
                <p className="prp-step-number">2.</p>
                <h3 className="prp-step-title">Centrifugation</h3>
                <div className="prp-step-divider" aria-hidden="true" />
                <p className="prp-step-body">
                  The blood sample is placed in a centrifuge, which spins it rapidly to separate the platelets from other blood components.
                </p>
              </article>

              <article className="prp-step-card" role="listitem" aria-label="Step 3 injection">
                <p className="prp-step-number">3.</p>
                <h3 className="prp-step-title">Injection</h3>
                <div className="prp-step-divider" aria-hidden="true" />
                <p className="prp-step-body">
                  The concentrated platelet‑rich plasma is injected into the affected area. In some cases, ultrasound guidance is used to
                  ensure precise placement.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section prp-aftercare" aria-labelledby="prp-aftercare-title">
          <header className="prp-aftercare-header">
            <h2 id="prp-aftercare-title" className="prp-aftercare-title">What to Expect From the Procedure</h2>
            <p className="prp-aftercare-subtitle">The PRP injection post‑procedure care is simple and straightforward:</p>
          </header>

          <div className="prp-aftercare-layout" aria-label="PRP post-procedure expectations">
            <figure className="prp-aftercare-media" aria-hidden="true">
              <div className="prp-aftercare-poster">
                <img
                  className="prp-aftercare-image"
                  src="/assets/images/medical/1-platelets-plasma-injection.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>

            <div className="prp-aftercare-panel" role="list" aria-label="PRP post-procedure expectations">
              <article className="prp-aftercare-item" role="listitem">
                <h3 className="prp-aftercare-item-title">During the Procedure</h3>
                <p className="prp-aftercare-item-body">
                  The injection process is relatively quick, typically taking about 30 to 60 minutes. Discomfort is usually minimal, but
                  you may feel a brief sting or pressure at the injection site.
                </p>
              </article>
              <div className="prp-aftercare-divider" aria-hidden="true" />
              <article className="prp-aftercare-item" role="listitem">
                <h3 className="prp-aftercare-item-title">Post‑Procedure Care</h3>
                <p className="prp-aftercare-item-body">
                  You may experience mild soreness and bruising at the injection site. It&apos;s recommended to rest the treated area and
                  avoid strenuous activities for a few days. Follow‑up may be advised depending on the condition.
                </p>
              </article>
              <div className="prp-aftercare-divider" aria-hidden="true" />
              <article className="prp-aftercare-item" role="listitem">
                <h3 className="prp-aftercare-item-title">Results Timeline</h3>
                <p className="prp-aftercare-item-body">
                  Improvement can vary, with some patients noticing relief within a few weeks, while others may require several months to
                  see significant benefits. The healing response progresses in stages, which is why a graded rehab plan matters.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section prp-benefits" aria-labelledby="prp-benefits-title">
          <div className="prp-benefits-inner">
            <header className="prp-benefits-header">
              <h2 id="prp-benefits-title" className="prp-benefits-title">Benefits of PRP Injections</h2>
              <p className="prp-benefits-subtitle">PRP injections offer several benefits, such as:</p>
            </header>

            <div className="prp-benefits-grid" role="list" aria-label="Benefits of PRP injections">
              <article className="prp-benefit-card prp-benefit-card--highlight" role="listitem">
                <h3 className="prp-benefit-title">Accelerated Healing</h3>
                <div className="prp-benefit-divider" aria-hidden="true" />
                <p className="prp-benefit-body">
                  PRP can support the healing process by delivering a higher concentration of growth factors to the treated area.
                </p>
              </article>

              <article className="prp-benefit-card" role="listitem">
                <h3 className="prp-benefit-title">Reduced Pain &amp; Inflammation</h3>
                <div className="prp-benefit-divider" aria-hidden="true" />
                <p className="prp-benefit-body">
                  PRP may help reduce pain and inflammation, supporting improvements in mobility and function in selected conditions.
                </p>
              </article>

              <article className="prp-benefit-card" role="listitem">
                <h3 className="prp-benefit-title">Natural &amp; Low‑Risk</h3>
                <div className="prp-benefit-divider" aria-hidden="true" />
                <p className="prp-benefit-body">
                  Since PRP is derived from your own blood, the risk of allergic reactions is low, and serious complications are uncommon.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section prp-conditions" aria-labelledby="prp-conditions-title">
          <div className="prp-conditions-inner tms-conditions-inner">
            <header className="prp-conditions-header tms-conditions-header">
              <h2 id="prp-conditions-title" className="prp-conditions-title tms-conditions-title">
                Conditions Treated with PRP
                <br />
                Injections
              </h2>
            </header>

            <div className="prp-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with PRP injections">
              <article className="prp-condition-card tms-conditions-card" role="listitem">
                <div className="prp-condition-text tms-conditions-copy">
                  <h3 className="prp-condition-title tms-conditions-card-title">Chronic Tendon Injuries</h3>
                  <p className="prp-condition-body tms-conditions-card-body">
                    Conditions such as tennis elbow, Achilles tendinitis, and patellar tendinitis can benefit from PRP therapy in selected
                    cases.
                  </p>
                </div>
                <div className="prp-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="prp-condition-image tms-conditions-image"
                    src="/assets/images/medical/ankle-pain-min.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="prp-condition-card prp-condition-card--reverse" role="listitem">
                <div className="prp-condition-text tms-conditions-copy">
                  <h3 className="prp-condition-title tms-conditions-card-title">Acute Ligament &amp; Muscle Injuries</h3>
                  <p className="prp-condition-body tms-conditions-card-body">
                    PRP is used in treating selected sports injuries such as pulled muscles and sprains, based on diagnosis and stage of
                    healing.
                  </p>
                </div>
                <div className="prp-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="prp-condition-image tms-conditions-image"
                    src="/assets/images/medical/DSC01749.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="prp-condition-card prp-condition-card--reverse" role="listitem">
                <div className="prp-condition-text tms-conditions-copy">
                  <h3 className="prp-condition-title tms-conditions-card-title">Osteoarthritis</h3>
                  <p className="prp-condition-body tms-conditions-card-body">
                    Early studies show promise for selected joint pain and stiffness patterns, and PRP may be considered alongside a graded
                    strengthening plan.
                  </p>
                </div>
                <div className="prp-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="prp-condition-image tms-conditions-image"
                    src="/assets/images/medical/DSC02128.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="prp-condition-card tms-conditions-card" role="listitem">
                <div className="prp-condition-text tms-conditions-copy">
                  <h3 className="prp-condition-title tms-conditions-card-title">Post‑Surgical Healing</h3>
                  <p className="prp-condition-body tms-conditions-card-body">
                    PRP can be used to support recovery in some surgical contexts involving tendons, ligaments, and muscles, when
                    clinically appropriate.
                  </p>
                </div>
                <div className="prp-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="prp-condition-image tms-conditions-image"
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

        <section className="page-section prp-help" aria-labelledby="prp-help-title">
          <div className="prp-help-inner">
            <h2 id="prp-help-title" className="prp-help-title">
              Are Platelet–Rich Plasma
              <br />
              Injections Right for You?
            </h2>
            <div className="prp-help-copy">
              <p className="prp-help-paragraph">
                Platelet‑Rich Plasma (PRP) injections could be a suitable choice if you&apos;re looking for a natural, minimally invasive way
                to support recovery and manage pain in selected conditions.
              </p>
              <p className="prp-help-paragraph">
                PRP is often considered when symptoms persist despite rehabilitation and other conservative treatments. Because PRP is
                usually paired with a graded loading plan, it may be especially helpful when the goal is to improve tolerance to activity
                and movement.
              </p>
              <p className="prp-help-paragraph">
                Since PRP uses components from your own blood, it appeals to many people who prefer a biologic approach rather than
                introducing foreign substances.
              </p>
              <p className="prp-help-paragraph">
                By consulting with your clinician, you can determine whether PRP aligns with your diagnosis, symptom severity, and
                long‑term health goals.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section prp-faq" aria-labelledby="prp-faq-title">
          <div className="prp-faq-inner">
            <header className="prp-faq-header">
              <h2 id="prp-faq-title" className="prp-faq-title">
                Platelet–Rich Plasma FAQ
              </h2>
            </header>
            <div className="prp-faq-card" role="list" aria-label="Platelet-rich plasma frequently asked questions">
              {PRP_FAQ.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `prp-faq-${item.id}`;
                const panelId = `prp-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="prp-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="prp-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="prp-faq-question">{item.question}</span>
                      <span className="prp-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="prp-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="prp-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="prp-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="prp-details-title" className="minimally-invasive-treatment-details-title">
              PRP injection: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              PRP is usually an adjunct to rehabilitation, not a replacement for it. Your clinician will explain whether PRP is appropriate
              for your condition and what outcomes are realistic.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-technique-title">
              <h3 id="prp-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Blood is processed to concentrate platelets, then PRP is injected into the target tissue. Platelets release growth factors
                that may influence the local healing response in selected conditions.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-benefits-title">
              <h3 id="prp-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of PRP injection">
                <li>May support gradual symptom improvement in selected tendon and joint problems.</li>
                <li>Uses your own blood components; serious complications are uncommon.</li>
                <li>Often improves tolerance to rehabilitation progressions when combined with a graded plan.</li>
                <li>Outpatient procedure with a short appointment time.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-steps-title">
              <h3 id="prp-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="PRP injection procedural steps">
                <li>Assessment, target selection, and explanation of expected outcomes.</li>
                <li>Blood draw and processing to concentrate platelets.</li>
                <li>Skin preparation and local anaesthetic (case‑dependent).</li>
                <li>Injection into the target area, often under ultrasound guidance.</li>
                <li>Aftercare plan and rehabilitation schedule for the following weeks.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-risks-title">
              <h3 id="prp-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of PRP injection">
                <li>Soreness or temporary pain flare.</li>
                <li>Bruising, bleeding, or infection (rare).</li>
                <li>Incomplete relief if the diagnosis or target is not correct.</li>
                <li>Post‑procedure stiffness if activity progression is not followed appropriately.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-prep-title">
              <h3 id="prp-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for PRP injection">
                <li>Bring medication list; ask about anti‑inflammatory medicine guidance around the procedure.</li>
                <li>Plan relative rest for 24–48 hours, then follow a graded loading plan.</li>
                <li>Monitor for fever, spreading redness, or severe worsening pain.</li>
                <li>Schedule rehabilitation follow‑up and track functional changes over time.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="prp-recovery-title">
              <h3 id="prp-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                PRP response is typically gradual over weeks to months. Progress is best tracked through function and load tolerance rather
                than pain alone, alongside a structured rehabilitation programme.
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

export default PlateletsRichPlasmaInjectionPage;
