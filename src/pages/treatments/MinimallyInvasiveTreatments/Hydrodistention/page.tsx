import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Hydrodistention.css';

const HydrodistentionPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'duration',
        question: 'How long does symptom relief last after hydrodistention?',
        answer:
          'Relief duration varies, but many patients experience symptom improvement for weeks to months. Repeat procedures may be considered depending on response and rehabilitation progress.',
      },
      {
        id: 'painful',
        question: 'Is hydrodistention painful?',
        answer:
          'Discomfort is usually brief and manageable because a local anaesthetic is used. Some soreness afterwards is common and typically settles within a few days.',
      },
      {
        id: 'recovery',
        question: 'What is the recovery time after hydrodistention?',
        answer:
          'Most people return to normal daily activity quickly, often the same day. Physiotherapy and home exercises in the following days and weeks are key to maintaining mobility gains.',
      },
      {
        id: 'risks',
        question: 'Are there any risks associated with hydrodistention?',
        answer:
          'Risks are uncommon but can include short-term pain flare, bruising, bleeding, or infection. Your clinician will review warning signs and tailored precautions.',
      },
      {
        id: 'cure',
        question: 'Can hydrodistention cure frozen shoulder?',
        answer:
          'Hydrodistention is not a guaranteed cure, but it can reduce capsular restriction and support recovery when combined with a structured physiotherapy plan.',
      },
      {
        id: 'repeat',
        question: 'How often can hydrodistention be repeated?',
        answer:
          'If needed, it can be repeated based on symptoms, functional goals, and clinical assessment. Your clinician will advise an appropriate interval for your case.',
      },
      {
        id: 'insurance',
        question: 'Is hydrodistention covered by insurance?',
        answer:
          'Coverage depends on your insurer and policy. It’s best to confirm directly with your provider, and our team can assist with documentation if required.',
      },
      {
        id: 'candidate',
        question: 'Who is a good candidate for hydrodistention?',
        answer:
          'Candidates are assessed individually. It may be appropriate when frozen shoulder or capsular tightness is confirmed and when a rehabilitation plan is in place to maintain gains.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle = 'Hydrodistention in Algarve | Gentle joint stretching for stiffness';
    document.title = pageTitle;

    const description =
      'Learn about hydrodistention in Algarve for frozen shoulder or joint stiffness. Image‑guided joint stretching, pain relief, and easy consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-hydrodistention') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page hydrodistention-page page-hydrodistention" id="psx-hydrodistention">
      <header className="treatment-page-hero hydrodistention-hero" aria-label="Hydrodistention hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/illustrative/Shoulder-Pain-min-1.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Hydrodistention</h1>
          <p className="psx-hero-subtitle">
            Gentle joint stretching with fluid can improve movement and reduce stiffness.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Hydrodistention" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="hd-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Shoulder-Pain-min-1.webp"
                alt="Image representing frozen shoulder stiffness and pain that may be treated with image-guided hydrodistention combined with physiotherapy (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="hd-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Hydrodistention (also called capsular distension) is an image‑guided procedure often used for frozen shoulder (adhesive
                capsulitis). Fluid is gently injected to stretch the joint capsule and reduce painful restriction, helping restore movement.
              </p>
              <p className="treatments-feature-body">
                Your clinician confirms the diagnosis, reviews the phase of frozen shoulder, and explains expected results. Hydrodistention
                is typically combined with physiotherapy to translate improved capsule stretch into lasting mobility and strength gains.
              </p>
              <p className="treatments-feature-body">
                After the procedure, you may notice temporary soreness. Early guided movement is important—your team will outline home
                exercises and a plan for follow‑up therapy.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section hd-overview" aria-labelledby="hd-understanding-title">
          <div className="hd-overview-inner">
            <div className="hd-understanding-top">
              <h2 id="hd-understanding-title" className="hd-understanding-title">
                Understanding
                <br />
                Hydrodistention
              </h2>
              <div className="hd-understanding-copy">
                <p className="hd-understanding-paragraph">
                  Hydrodistention is an image-guided procedure commonly used for frozen shoulder (adhesive capsulitis). By introducing fluid
                  into the joint, the capsule is gently stretched, which can reduce painful restriction and support improved range of motion.
                </p>
                <p className="hd-understanding-paragraph">
                  Frozen shoulder can be persistent and may limit daily activities. Hydrodistention is typically combined with physiotherapy
                  to translate the temporary increase in capsule stretch into lasting mobility and strength gains over the following weeks.
                </p>
              </div>
            </div>
            <div className="hd-steps-grid" role="list" aria-label="Hydrodistention steps">
              <article className="hd-step-card" role="listitem" aria-label="Step 1 preparation">
                <p className="hd-step-number">1.</p>
                <h3 className="hd-step-title">Preparation</h3>
                <div className="hd-step-divider" aria-hidden="true" />
                <p className="hd-step-body">
                  The shoulder is assessed and the skin is cleaned. A local anaesthetic is used to reduce discomfort and you are positioned
                  for ultrasound or fluoroscopy guidance.
                </p>
              </article>

              <article className="hd-step-card" role="listitem" aria-label="Step 2 needle placement">
                <p className="hd-step-number">2.</p>
                <h3 className="hd-step-title">Needle Placement</h3>
                <div className="hd-step-divider" aria-hidden="true" />
                <p className="hd-step-body">
                  A fine needle is placed into the shoulder joint under imaging guidance to confirm accurate positioning.
                </p>
              </article>

              <article className="hd-step-card" role="listitem" aria-label="Step 3 capsular distension">
                <p className="hd-step-number">3.</p>
                <h3 className="hd-step-title">Capsular Distension</h3>
                <div className="hd-step-divider" aria-hidden="true" />
                <p className="hd-step-body">
                  Sterile fluid is introduced in a controlled way to gently stretch the joint capsule and reduce restriction.
                </p>
              </article>

              <article className="hd-step-card" role="listitem" aria-label="Step 4 immediate mobility">
                <p className="hd-step-number">4.</p>
                <h3 className="hd-step-title">Immediate Mobility</h3>
                <div className="hd-step-divider" aria-hidden="true" />
                <p className="hd-step-body">
                  You are guided through gentle movement to take advantage of improved capsule stretch and comfort.
                </p>
              </article>

              <article className="hd-step-card" role="listitem" aria-label="Step 5 aftercare plan">
                <p className="hd-step-number">5.</p>
                <h3 className="hd-step-title">Aftercare Plan</h3>
                <div className="hd-step-divider" aria-hidden="true" />
                <p className="hd-step-body">
                  Home exercises and physiotherapy follow-up are arranged to maintain gains over the following weeks.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section hd-aftercare" aria-labelledby="hd-aftercare-title">
          <header className="hd-aftercare-header">
              <h2 id="hd-aftercare-title" className="hd-aftercare-title">
                What to Expect After the Procedure
              </h2>
              <p className="hd-aftercare-subtitle">
                After the procedure, most patients are monitored for a short period to ensure there are no immediate complications. Here’s
                what you can typically expect during the recovery period:
              </p>
          </header>

          <div className="hd-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="hd-aftercare-media" aria-hidden="true">
                <div className="hd-aftercare-poster">
                  <img
                  className="hd-aftercare-image"
                  src="/assets/images/illustrative/Shoulder-Pain-min-1.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                </div>
              </figure>

              <div className="hd-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="hd-aftercare-item" role="listitem">
                  <h3 className="hd-aftercare-item-title">Initial Discomfort</h3>
                  <p className="hd-aftercare-item-body">
                    It is common to experience some soreness in the shoulder area. This is usually related to capsular stretching and should
                    settle within a few days.
                  </p>
                </article>
                <div className="hd-aftercare-divider" aria-hidden="true" />
                <article className="hd-aftercare-item" role="listitem">
                  <h3 className="hd-aftercare-item-title">Increased Stiffness or Ache</h3>
                  <p className="hd-aftercare-item-body">
                    Some patients notice a temporary ache or stiffness after the procedure. This is generally short‑lived and improves as you
                    resume guided movement and exercises.
                  </p>
                </article>
                <div className="hd-aftercare-divider" aria-hidden="true" />
                <article className="hd-aftercare-item" role="listitem">
                  <h3 className="hd-aftercare-item-title">Possible Bruising</h3>
                  <p className="hd-aftercare-item-body">
                    Mild bruising around the injection site can occur. This should gradually reduce over the following days.
                  </p>
                </article>
                <div className="hd-aftercare-divider" aria-hidden="true" />
                <article className="hd-aftercare-item" role="listitem">
                  <h3 className="hd-aftercare-item-title">Mobility Improvement</h3>
                  <p className="hd-aftercare-item-body">
                    Many patients feel improved movement soon after the procedure. Physiotherapy and home exercises help maintain gains and
                    build long‑term strength.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section hd-benefits" aria-labelledby="hd-benefits-title">
          <div className="hd-benefits-inner">
            <header className="hd-benefits-header">
              <h2 id="hd-benefits-title" className="hd-benefits-title">
                Benefits of Hydrodistention
              </h2>
              <p className="hd-benefits-subtitle">
                Hydrodistention can offer several benefits for selected frozen shoulder cases when combined with a structured rehabilitation
                plan:
              </p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of hydrodistention">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Pain Relief</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Stretching the tight capsule can reduce painful restriction, making day-to-day movement more comfortable.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Improved Range of Motion</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Many patients notice improved shoulder mobility, creating a better starting point for physiotherapy.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Faster Rehab Progress</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  When paired with guided exercises, improved comfort and movement can help you progress more consistently.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section hd-conditions" aria-labelledby="hd-conditions-title">
          <div className="hd-conditions-inner tms-conditions-inner">
            <header className="hd-conditions-header tms-conditions-header">
              <h2 id="hd-conditions-title" className="hd-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Hydrodistention
              </h2>
            </header>

            <div className="hd-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with hydrodistention">
              <article className="hd-condition-card tms-conditions-card" role="listitem" aria-labelledby="hd-condition-frozen-title">
                <div className="hd-condition-copy tms-conditions-copy">
                  <h3 id="hd-condition-frozen-title" className="hd-condition-title tms-conditions-card-title">
                    Frozen Shoulder (Adhesive Capsulitis)
                  </h3>
                  <p className="hd-condition-body tms-conditions-card-body">
                    Painful shoulder stiffness that limits movement. Hydrodistention may help stretch the capsule and support mobility
                    recovery.
                  </p>
                </div>
                <div className="hd-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="hd-condition-image tms-conditions-image"
                    src="/assets/images/illustrative/Shoulder-Pain-min-1.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="hd-condition-card tms-conditions-card" role="listitem" aria-labelledby="hd-condition-postop-title">
                <div className="hd-condition-copy tms-conditions-copy">
                  <h3 id="hd-condition-postop-title" className="hd-condition-title tms-conditions-card-title">
                    Post‑Immobilisation Stiffness
                  </h3>
                  <p className="hd-condition-body tms-conditions-card-body">
                    Shoulder stiffness after prolonged rest, sling use, or limited movement. The goal is to reduce restriction and help you
                    restart rehab safely.
                  </p>
                </div>
                <div className="hd-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="hd-condition-image tms-conditions-image"
                    src="/assets/images/illustrative/Shoulder-Pain-min-1.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="hd-condition-card tms-conditions-card" role="listitem" aria-labelledby="hd-condition-trauma-title">
                <div className="hd-condition-copy tms-conditions-copy">
                  <h3 id="hd-condition-trauma-title" className="hd-condition-title tms-conditions-card-title">
                    Post‑Traumatic Shoulder Stiffness
                  </h3>
                  <p className="hd-condition-body tms-conditions-card-body">
                    Stiffness following injury can limit progress. Hydrodistention may be considered when capsular tightness is a key driver.
                  </p>
                </div>
                <div className="hd-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="hd-condition-image tms-conditions-image"
                    src="/assets/images/illustrative/Shoulder-Pain-min-1.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="hd-condition-card tms-conditions-card" role="listitem" aria-labelledby="hd-condition-pain-title">
                <div className="hd-condition-copy tms-conditions-copy">
                  <h3 id="hd-condition-pain-title" className="hd-condition-title tms-conditions-card-title">
                    Persistent Pain with Capsular Tightness
                  </h3>
                  <p className="hd-condition-body tms-conditions-card-body">
                    When imaging and assessment suggest capsular restriction contributes to pain, hydrodistention can support a mobility‑first
                    plan.
                  </p>
                </div>
                <div className="hd-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="hd-condition-image tms-conditions-image"
                    src="/assets/images/illustrative/Shoulder-Pain-min-1.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section hd-faq" aria-labelledby="hd-faq-title">
          <div className="hd-faq-inner">
            <header className="hd-faq-header">
              <h2 id="hd-faq-title" className="hd-faq-title">
                Hydrodistention FAQ
              </h2>
            </header>

            <div className="hd-faq-card" role="list" aria-label="Hydrodistention frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `hd-faq-${item.id}`;
                const panelId = `hd-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="hd-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="hd-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="hd-faq-question">{item.question}</span>
                      <span className="hd-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="hd-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="hd-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="hd-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="hd-details-title" className="minimally-invasive-treatment-details-title">
              Hydrodistention: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Hydrodistention can reduce pain and improve shoulder mobility in selected frozen shoulder cases. Your clinician will confirm
              suitability and coordinate the therapy plan that follows.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-technique-title">
              <h3 id="hd-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Under ultrasound or fluoroscopic guidance, a needle is placed into the shoulder joint. Fluid is introduced to gently
                distend the capsule; medication may be included depending on the plan and clinical judgement.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-benefits-title">
              <h3 id="hd-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of hydrodistention">
                <li>Can improve shoulder movement and reduce pain in selected frozen shoulder cases.</li>
                <li>Image guidance improves accuracy and comfort.</li>
                <li>Outpatient, minimally invasive approach with short procedural time.</li>
                <li>Supports physiotherapy by creating a better starting point for mobility work.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-steps-title">
              <h3 id="hd-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Hydrodistention procedural steps">
                <li>Assessment to confirm frozen shoulder and define goals.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle placement into the joint under imaging guidance.</li>
                <li>Controlled capsular distension with fluid.</li>
                <li>Immediate post‑procedure mobility guidance and therapy plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-risks-title">
              <h3 id="hd-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of hydrodistention">
                <li>Short‑term pain flare or soreness.</li>
                <li>Bleeding, bruising, or infection (uncommon).</li>
                <li>Temporary dizziness or fainting in some patients.</li>
                <li>Incomplete improvement without a structured physiotherapy plan.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-prep-title">
              <h3 id="hd-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for hydrodistention">
                <li>Bring a medication list; discuss blood thinners and diabetes management as needed.</li>
                <li>Plan gentle activity immediately after and schedule physiotherapy sessions.</li>
                <li>Follow home exercises to maintain range of motion improvements.</li>
                <li>Monitor for fever, spreading redness, or severe worsening pain.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hd-recovery-title">
              <h3 id="hd-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people resume daily activities quickly. Mobility gains are best maintained through early, consistent physiotherapy over
                the following weeks.
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

export default HydrodistentionPage;
