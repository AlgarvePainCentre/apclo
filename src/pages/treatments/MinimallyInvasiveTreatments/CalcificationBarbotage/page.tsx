import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './CalcificationBarbotage.css';

const CalcificationBarbotagePage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'relief',
        question: 'How long does it take to feel relief after calcification barbotage?',
        answer:
          'Relief often begins within a few days, but it may improve gradually over weeks as the tendon settles and you rebuild movement and strength with rehabilitation.',
      },
      {
        id: 'side-effects',
        question: 'Are there any side effects?',
        answer:
          'Temporary soreness, bruising, or a short-lived pain flare can occur. Less commonly, bleeding or infection is possible. Your clinician will explain warning signs and aftercare steps.',
      },
      {
        id: 'duration',
        question: 'How long does the procedure take?',
        answer:
          'Procedure time varies based on deposit size and location, but it is commonly completed within 20–60 minutes, plus brief observation afterwards.',
      },
      {
        id: 'painful',
        question: 'Is calcification barbotage painful?',
        answer:
          'Local anaesthetic is used to minimise discomfort. You may feel pressure or brief soreness during and after the procedure, which typically settles over the next few days.',
      },
      {
        id: 'sessions',
        question: 'How many sessions are required?',
        answer:
          'Many cases are managed in a single session, but this depends on the deposit type and symptoms. If needed, your clinician will discuss whether a repeat treatment makes sense.',
      },
      {
        id: 'success',
        question: 'What is the success rate of calcification barbotage?',
        answer:
          'Success varies depending on the deposit characteristics and whether calcification is the main pain driver. Your clinician will discuss expected outcomes for your specific case after ultrasound assessment.',
      },
      {
        id: 'physio',
        question: 'Will I need physical therapy after the procedure?',
        answer:
          'Rehabilitation is usually recommended. Physiotherapy helps restore shoulder mechanics, regain strength, and reduce recurrence risk after pain settles.',
      },
      {
        id: 'not-candidate',
        question: 'Who is not a good candidate for calcification barbotage?',
        answer:
          'Barbotage may not be suitable if the deposit is not appropriate for needling, if there are bleeding risks, or if other diagnoses better explain symptoms. A clinician will confirm suitability on assessment.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle = 'Calcification barbotage in Algarve | Ultrasound‑guided tendon care';
    document.title = pageTitle;

    const description =
      'Discover ultrasound‑guided calcification barbotage in Algarve for shoulder or tendon pain. Break up calcium deposits and book a specialist assessment.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-calcification-barbotage') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page calcification-barbotage-page page-calcificationbarbotage" id="psx-calcification-barbotage">
      <header className="treatment-page-hero calcification-barbotage-hero" aria-label="Calcification barbotage hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/illustrative/shoulder-pain-min.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Calcification barbotage</h1>
          <p className="psx-hero-subtitle">
            Ultrasound-guided needling helps break up and remove painful tendon calcifications.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Calcification barbotage" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="cb-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/shoulder-pain-min.webp"
                alt="Image representing shoulder tendon pain and calcific tendinopathy treated with ultrasound-guided calcification barbotage (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="cb-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Calcification barbotage (also called needling and lavage) is an ultrasound‑guided procedure used for selected painful
                calcium deposits in tendons—most commonly in the shoulder (rotator cuff). The goal is to reduce pain and improve movement
                by breaking up and washing out the deposit where appropriate.
              </p>
              <p className="treatments-feature-body">
                Your clinician confirms the diagnosis with ultrasound and reviews symptoms, movement, and goals. The procedure is typically
                performed with local anaesthetic, and rehabilitation afterward is important to restore shoulder function and reduce
                recurrence risk.
              </p>
              <p className="treatments-feature-body">
                Aftercare often includes relative rest initially, then a structured return to mobility and strengthening. Your team will
                advise how to manage soreness and when to restart physiotherapy exercises.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section cb-overview" aria-labelledby="cb-understanding-title">
          <div className="cb-overview-inner">
            <div className="cb-understanding-top">
              <h2 id="cb-understanding-title" className="cb-understanding-title">
                Understanding
                <br />
                Calcification Barbotage
              </h2>
              <div className="cb-understanding-copy">
                <p className="cb-understanding-paragraph">
                  Calcification barbotage (also called ultrasound-guided barbotage, needling, or percutaneous needling) is a specialised
                  procedure used to treat painful calcium deposits in tendons—most often the rotator cuff in the shoulder.
                </p>
                <p className="cb-understanding-paragraph">
                  Using real-time ultrasound guidance, the clinician targets the deposit, breaks it up where appropriate, and may flush
                  (lavage) calcium material to reduce mechanical irritation and help calm the inflammatory response.
                </p>
                <p className="cb-understanding-paragraph">
                  Barbotage is typically performed as an outpatient procedure with local anaesthetic. Rehabilitation afterwards helps
                  restore shoulder mechanics, rebuild strength, and reduce the risk of recurring pain.
                </p>
                <p className="cb-understanding-paragraph">Here is how the procedure is done:</p>
              </div>
            </div>

            <div className="cb-steps-grid" role="list" aria-label="Calcification barbotage steps">
              <article className="cb-step-card" role="listitem" aria-label="Step 1 preparation">
                <p className="cb-step-number">1.</p>
                <h3 className="cb-step-title">Preparation</h3>
                <div className="cb-step-divider" aria-hidden="true" />
                <p className="cb-step-body">
                    The shoulder is positioned and the skin is cleaned. Ultrasound is used to identify the deposit and plan a safe needle
                    path.
                </p>
              </article>

              <article className="cb-step-card" role="listitem" aria-label="Step 2 local anaesthesia">
                <p className="cb-step-number">2.</p>
                <h3 className="cb-step-title">Local Anaesthesia</h3>
                <div className="cb-step-divider" aria-hidden="true" />
                <p className="cb-step-body">
                    Local anaesthetic is injected to numb the skin and nearby tissues, helping you stay comfortable during the procedure.
                </p>
              </article>

              <article className="cb-step-card" role="listitem" aria-label="Step 3 ultrasound guidance">
                <p className="cb-step-number">3.</p>
                <h3 className="cb-step-title">Ultrasound Guidance</h3>
                <div className="cb-step-divider" aria-hidden="true" />
                <p className="cb-step-body">
                    A high-frequency ultrasound probe visualises the tendon and deposit in real time, improving accuracy and avoiding nearby
                    structures.
                </p>
              </article>

              <article className="cb-step-card" role="listitem" aria-label="Step 4 needling and lavage">
                <p className="cb-step-number">4.</p>
                <h3 className="cb-step-title">Needling &amp; Lavage</h3>
                <div className="cb-step-divider" aria-hidden="true" />
                <p className="cb-step-body">
                    The deposit may be gently fragmented and flushed with saline to help wash out calcium material where appropriate.
                </p>
              </article>

              <article className="cb-step-card" role="listitem" aria-label="Step 5 injection of steroid">
                <p className="cb-step-number">5.</p>
                <h3 className="cb-step-title">Injection of Steroid</h3>
                <div className="cb-step-divider" aria-hidden="true" />
                <p className="cb-step-body">
                    In some cases, a small anti-inflammatory injection may be used to help settle post-procedure irritation and support early
                    movement.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section cb-aftercare" aria-labelledby="cb-aftercare-title">
          <header className="cb-aftercare-header">
              <h2 id="cb-aftercare-title" className="cb-aftercare-title">
                What to Expect From the Procedure
              </h2>
              <p className="cb-aftercare-subtitle">
                After calcification barbotage, most patients can go home the same day. Here’s what to expect during the recovery period:
              </p>
          </header>

          <div className="cb-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="cb-aftercare-media" aria-hidden="true">
                <div className="cb-aftercare-poster">
                  <img className="cb-aftercare-image" src="/assets/images/illustrative/shoulder-pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </figure>

              <div className="cb-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="cb-aftercare-item" role="listitem">
                  <h3 className="cb-aftercare-item-title">Post‑Procedure Care</h3>
                  <p className="cb-aftercare-item-body">
                    Mild to moderate soreness is common for a few days. Your team will advise how to manage discomfort and when to restart
                    movement.
                  </p>
                </article>
                <div className="cb-aftercare-divider" aria-hidden="true" />
                <article className="cb-aftercare-item" role="listitem">
                  <h3 className="cb-aftercare-item-title">Activity and Healing</h3>
                  <p className="cb-aftercare-item-body">
                    Expect a short period of relative rest, followed by a gradual return to mobility and strengthening as symptoms settle.
                  </p>
                </article>
                <div className="cb-aftercare-divider" aria-hidden="true" />
                <article className="cb-aftercare-item" role="listitem">
                  <h3 className="cb-aftercare-item-title">Follow‑Up and Recovery</h3>
                  <p className="cb-aftercare-item-body">
                    Improvement typically continues over weeks. Physiotherapy helps restore shoulder mechanics and maximise functional gains.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section cb-benefits" aria-labelledby="cb-benefits-title">
          <div className="cb-benefits-inner">
            <header className="cb-benefits-header">
              <h2 id="cb-benefits-title" className="cb-benefits-title">
                Benefits of Calcification Barbotage
              </h2>
              <p className="cb-benefits-subtitle">
                Calcification barbotage offers several benefits for individuals with painful tendon calcifications:
              </p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of calcification barbotage">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Minimal Invasiveness and Recovery Times</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  The procedure is needle-based with local anaesthetic, aiming to reduce recovery time while avoiding large incisions.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Targeted Pain Relief</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  By reducing deposit burden where appropriate, barbotage can decrease tendon irritation and help pain settle over time.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Enhanced Mobility</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Reduced pain can support improved movement and better participation in rehabilitation and daily activities.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section cb-conditions" aria-labelledby="cb-conditions-title">
          <div className="cb-conditions-inner tms-conditions-inner">
            <header className="cb-conditions-header tms-conditions-header">
              <h2 id="cb-conditions-title" className="cb-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Calcification Barbotage
              </h2>
            </header>

            <div className="cb-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with calcification barbotage">
              <article className="cb-condition-card tms-conditions-card" role="listitem" aria-labelledby="cb-condition-shoulder-title">
                <div className="cb-condition-copy tms-conditions-copy">
                  <h3 id="cb-condition-shoulder-title" className="cb-condition-title tms-conditions-card-title">
                    Calcific Tendinitis of the Shoulder
                  </h3>
                  <p className="cb-condition-body tms-conditions-card-body">
                    Calcium deposits within the rotator cuff tendons can drive pain and restrict shoulder movement in selected cases.
                  </p>
                </div>
                <div className="cb-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="cb-condition-image tms-conditions-image" src="/assets/images/interspinous-spacers-treatment/DSC06795-1.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="cb-condition-card tms-conditions-card" role="listitem" aria-labelledby="cb-condition-hip-title">
                <div className="cb-condition-copy tms-conditions-copy">
                  <h3 id="cb-condition-hip-title" className="cb-condition-title tms-conditions-card-title">
                    Calcification in the Hip Tendons
                  </h3>
                  <p className="cb-condition-body tms-conditions-card-body">
                    Calcium build-up in hip tendons can contribute to pain and limited mobility, affecting walking and daily activities.
                  </p>
                </div>
                <div className="cb-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="cb-condition-image tms-conditions-image" src="/assets/images/interspinous-spacers-treatment/DegenerativeDiscDisease.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="cb-condition-card tms-conditions-card" role="listitem" aria-labelledby="cb-condition-elbow-title">
                <div className="cb-condition-copy tms-conditions-copy">
                  <h3 id="cb-condition-elbow-title" className="cb-condition-title tms-conditions-card-title">
                    Elbow Calcification (Tennis Elbow)
                  </h3>
                  <p className="cb-condition-body tms-conditions-card-body">
                    Calcific deposits near the elbow can be associated with chronic tendon pain, often worsened by gripping and repetitive
                    use.
                  </p>
                </div>
                <div className="cb-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="cb-condition-image tms-conditions-image" src="/assets/images/interspinous-spacers-treatment/Spondylolisthesis.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="cb-condition-card tms-conditions-card" role="listitem" aria-labelledby="cb-condition-bursitis-title">
                <div className="cb-condition-copy tms-conditions-copy">
                  <h3 id="cb-condition-bursitis-title" className="cb-condition-title tms-conditions-card-title">
                    Calcific Bursitis
                  </h3>
                  <p className="cb-condition-body tms-conditions-card-body">
                    Calcium deposits in or near bursae can contribute to inflammation and painful movement in selected areas.
                  </p>
                </div>
                <div className="cb-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="cb-condition-image tms-conditions-image" src="/assets/images/interspinous-spacers-treatment/FacetJointSyndrome.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section cb-right-for-you" aria-labelledby="cb-right-for-you-title">
          <div className="cb-right-for-you-inner">
            <div className="cb-right-for-you-layout">
              <h2 id="cb-right-for-you-title" className="cb-right-for-you-title">
                Is Calcification Barbotage
                <br />
                Right for You?
              </h2>

              <div className="cb-right-for-you-copy">
                <p className="cb-right-for-you-paragraph">
                  Calcification barbotage may be an appropriate option for individuals with painful tendon calcifications who have not found
                  adequate relief from conservative treatments, such as rest, physiotherapy, or medication. However, it is not suitable for
                  everyone.
                </p>
                <p className="cb-right-for-you-paragraph">
                  Before considering barbotage, it is important to have a thorough evaluation by a clinician experienced in ultrasound
                  assessment. They will review your history, examine your shoulder, and confirm deposit characteristics on imaging to
                  determine whether barbotage is the best option.
                </p>
                <p className="cb-right-for-you-paragraph">
                  People with certain medical conditions, such as bleeding disorders or significant anaesthetic allergies, may not be
                  suitable candidates. Additionally, some deposits are not ideal for needling and may require a different treatment plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section cb-faq" aria-labelledby="cb-faq-title">
          <div className="cb-faq-inner">
            <header className="cb-faq-header">
              <h2 id="cb-faq-title" className="cb-faq-title">
                Calcification Barbotage FAQ
              </h2>
            </header>

            <div className="cb-faq-card" role="list" aria-label="Calcification barbotage frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `cb-faq-${item.id}`;
                const panelId = `cb-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="cb-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="cb-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="cb-faq-question">{item.question}</span>
                      <span className="cb-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="cb-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="cb-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="cb-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="cb-details-title" className="minimally-invasive-treatment-details-title">
              Calcification barbotage: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Barbotage is not required for every calcification. Your clinician will explain whether your deposit type and symptoms make
              you a good candidate and what alternatives exist.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-technique-title">
              <h3 id="cb-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Using ultrasound guidance, a needle is placed into the calcium deposit. The deposit may be fragmented and flushed with
                saline (lavage). Some cases include a small medication injection afterward, depending on clinical judgement.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-benefits-title">
              <h3 id="cb-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of calcification barbotage">
                <li>Can reduce pain and improve shoulder function in selected calcific tendinopathy cases.</li>
                <li>Ultrasound guidance improves accuracy and visualises the deposit during treatment.</li>
                <li>Minimally invasive outpatient procedure with a short recovery focus.</li>
                <li>Often helps people engage in rehabilitation and restore normal movement patterns.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-steps-title">
              <h3 id="cb-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Calcification barbotage procedural steps">
                <li>Ultrasound confirmation of deposit location and suitability.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle placement into the deposit under ultrasound guidance.</li>
                <li>Fragmentation and lavage where appropriate, then removal of needle.</li>
                <li>Aftercare advice and rehabilitation plan for shoulder mobility and strength.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-risks-title">
              <h3 id="cb-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of calcification barbotage">
                <li>Post‑procedure soreness or flare.</li>
                <li>Bleeding, bruising, or infection (uncommon).</li>
                <li>Temporary stiffness; rehabilitation is important to regain motion.</li>
                <li>Incomplete symptom relief if the pain source is not primarily the calcification.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-prep-title">
              <h3 id="cb-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for calcification barbotage">
                <li>Bring imaging and a medication list; discuss blood thinners if applicable.</li>
                <li>Plan lighter activity for 24–48 hours and follow guidance for gradual return.</li>
                <li>Follow wound care guidance and watch for fever or worsening redness.</li>
                <li>Resume physiotherapy as advised to rebuild shoulder strength and control.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="cb-recovery-title">
              <h3 id="cb-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Most people return to daily activities quickly. Improvement continues over weeks as pain settles and shoulder mechanics
                improve through rehabilitation.
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

export default CalcificationBarbotagePage;
