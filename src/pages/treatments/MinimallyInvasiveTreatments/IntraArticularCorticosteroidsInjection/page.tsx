import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './IntraArticularCorticosteroidsInjection.css';

const IntraArticularCorticosteroidsInjectionPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'duration',
        question: 'How long do the effects of an intra‑articular corticosteroid injection last?',
        answer:
          'Relief can last from several weeks to a few months, depending on the joint, diagnosis, and individual response. Rehabilitation and load management help support longer-term outcomes.',
      },
      {
        id: 'side-effects',
        question: 'Are there any side effects?',
        answer:
          'Temporary soreness or a short-term pain flare can occur. Less commonly, bruising or infection is possible. People with diabetes may have a transient rise in blood sugar. Your clinician will review personalised risks.',
      },
      {
        id: 'frequency',
        question: 'How often can I get these injections?',
        answer:
          'Frequency depends on diagnosis, response, and safe dosing guidance. Your clinician will advise an appropriate interval and whether another approach is better for your case.',
      },
      {
        id: 'candidate',
        question: 'Who is a good candidate for this treatment?',
        answer:
          'Candidates are assessed individually. It may be helpful for inflammatory flare-ups or joint irritation where reducing inflammation supports movement and rehabilitation.',
      },
      {
        id: 'activities',
        question: 'Can I resume normal activities after the injection?',
        answer:
          'Most people return to normal daily activities quickly, but it’s common to avoid high-load activity for a short period. Your clinician will give joint-specific guidance and when to resume strengthening.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle =
      'Intra‑articular corticosteroid injection in Algarve | Joint pain relief';
    document.title = pageTitle;

    const description =
      'Learn about intra‑articular corticosteroid injections in Algarve for knee, hip, or shoulder pain. Image‑guided, safe dosing, and easy consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-intra-articular-corticosteroids-injection') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page intra-articular-corticosteroids-injection-page page-intraarticularcorticosteroidsinjection" id="psx-intra-articular-corticosteroids-injection">
      <header className="treatment-page-hero intra-articular-corticosteroids-injection-hero" aria-label="Intra-articular corticosteroids injection hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/illustrative/Knee-Pain-min.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Intra-articular corticosteroids injection</h1>
          <p className="psx-hero-subtitle">
            Image-guided steroid injections reduce inflammation inside painful joints.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Intra-articular corticosteroids injection" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="iacsi-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Knee-Pain-min.webp"
                alt="Image representing knee joint pain that may be treated with an image-guided intra-articular corticosteroid injection (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="iacsi-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Intra‑articular corticosteroid injections place anti‑inflammatory medication directly into a joint. They are used to reduce
                inflammation and pain in selected conditions such as osteoarthritis flare‑ups or inflammatory joint irritation.
              </p>
              <p className="treatments-feature-body">
                Your clinician will review your symptoms, medical history, and imaging where appropriate. Image guidance (often ultrasound)
                can improve accuracy, particularly in deeper joints. The goal is to reduce pain so you can restore movement and progress a
                rehabilitation plan.
              </p>
              <p className="treatments-feature-body">
                Aftercare focuses on protecting the joint for a short period, monitoring for side effects, and combining symptom relief
                with strengthening and load management to improve longer‑term outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section iacsi-overview" aria-labelledby="iacsi-understanding-title">
          <div className="iacsi-overview-inner">
            <div className="iacsi-understanding-top">
              <h2 id="iacsi-understanding-title" className="iacsi-understanding-title">
                Understanding Intra‑
                <br />
                Articular Corticosteroid
                <br />
                Injections for Pain
                <br />
                Management
              </h2>
              <div className="iacsi-understanding-copy">
                <p className="iacsi-understanding-paragraph">
                  Intra‑articular corticosteroid injections are a common treatment for joint pain, especially during inflammatory flare‑ups
                  of osteoarthritis or other joint irritation. The medication is delivered directly into the joint, aiming to reduce
                  inflammation and improve comfort.
                </p>
                <p className="iacsi-understanding-paragraph">
                  Image guidance (often ultrasound) can improve accuracy, particularly for deeper joints. This can help target the correct
                  space and support safer, more consistent delivery.
                </p>
                <p className="iacsi-understanding-paragraph">The procedure for intra‑articular corticosteroid injections is relatively straightforward:</p>
              </div>
            </div>

            <div className="iacsi-steps-grid" role="list" aria-label="Intra-articular corticosteroid injection steps">
              <article className="iacsi-step-card" role="listitem" aria-label="Step 1 consultation">
                <p className="iacsi-step-number">1.</p>
                <h3 className="iacsi-step-title">Consultation</h3>
                <div className="iacsi-step-divider" aria-hidden="true" />
                <p className="iacsi-step-body">
                    Your clinician reviews symptoms, medical history, and relevant imaging to confirm the joint and ensure the injection is
                    appropriate.
                </p>
              </article>

              <article className="iacsi-step-card" role="listitem" aria-label="Step 2 preparation">
                <p className="iacsi-step-number">2.</p>
                <h3 className="iacsi-step-title">Preparation</h3>
                <div className="iacsi-step-divider" aria-hidden="true" />
                <p className="iacsi-step-body">
                    The skin around the joint is cleaned to reduce infection risk, and the injection approach is planned.
                </p>
              </article>

              <article className="iacsi-step-card" role="listitem" aria-label="Step 3 anaesthesia">
                <p className="iacsi-step-number">3.</p>
                <h3 className="iacsi-step-title">Anaesthesia</h3>
                <div className="iacsi-step-divider" aria-hidden="true" />
                <p className="iacsi-step-body">
                    A small amount of local anaesthetic may be used to reduce discomfort during needle placement.
                </p>
              </article>

              <article className="iacsi-step-card" role="listitem" aria-label="Step 4 injection">
                <p className="iacsi-step-number">4.</p>
                <h3 className="iacsi-step-title">Injection</h3>
                <div className="iacsi-step-divider" aria-hidden="true" />
                <p className="iacsi-step-body">
                    Under image guidance when needed, a needle is placed into the joint space and the medication is injected.
                </p>
              </article>

              <article className="iacsi-step-card" role="listitem" aria-label="Step 5 post-injection">
                <p className="iacsi-step-number">5.</p>
                <h3 className="iacsi-step-title">Post‑Injection</h3>
                <div className="iacsi-step-divider" aria-hidden="true" />
                <p className="iacsi-step-body">
                    You receive aftercare guidance, including short-term load protection and when to resume strengthening and rehabilitation.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section iacsi-aftercare" aria-labelledby="iacsi-aftercare-title">
          <header className="iacsi-aftercare-header">
              <h2 id="iacsi-aftercare-title" className="iacsi-aftercare-title">
                What to Expect After the Procedure
              </h2>
              <p className="iacsi-aftercare-subtitle">
                After receiving an intra‑articular corticosteroid injection, patients might experience:
              </p>
          </header>

          <div className="iacsi-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="iacsi-aftercare-media" aria-hidden="true">
                <div className="iacsi-aftercare-poster">
                  <img className="iacsi-aftercare-image" src="/assets/images/illustrative/Knee-Pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </figure>

              <div className="iacsi-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="iacsi-aftercare-item" role="listitem">
                  <h3 className="iacsi-aftercare-item-title">Immediate Relief</h3>
                  <p className="iacsi-aftercare-item-body">
                    Some patients feel relief within a few hours, while for others it may take a few days as inflammation settles.
                  </p>
                </article>
                <div className="iacsi-aftercare-divider" aria-hidden="true" />
                <article className="iacsi-aftercare-item" role="listitem">
                  <h3 className="iacsi-aftercare-item-title">Temporary Discomfort</h3>
                  <p className="iacsi-aftercare-item-body">
                    Mild soreness at the injection site can occur and typically resolves within a few days.
                  </p>
                </article>
                <div className="iacsi-aftercare-divider" aria-hidden="true" />
                <article className="iacsi-aftercare-item" role="listitem">
                  <h3 className="iacsi-aftercare-item-title">Improved Mobility</h3>
                  <p className="iacsi-aftercare-item-body">
                    Reduced pain and inflammation can lead to improved joint mobility and better tolerance for strengthening and activity.
                  </p>
                </article>
              </div>
          </div>
        </section>

        <section className="page-section iacsi-benefits" aria-labelledby="iacsi-benefits-title">
          <div className="iacsi-benefits-inner">
            <header className="iacsi-benefits-header">
              <h2 id="iacsi-benefits-title" className="iacsi-benefits-title">
                Benefits of Intra‑Articular Corticosteroid Injections
              </h2>
              <p className="iacsi-benefits-subtitle">Corticosteroid injections offer several benefits:</p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of intra-articular corticosteroid injections">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Pain Relief</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  They can provide significant pain relief, often within a few days, by reducing joint inflammation.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Reduced Inflammation</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Corticosteroids decrease inflammation inside the joint, which can improve mobility and function.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Quick Procedure</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  The injection process is typically quick, often taking less than 15 minutes plus a short observation period.
                </p>
              </article>
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Minimal Systemic Effects</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Because medication is delivered into the joint, systemic side effects are usually limited compared with oral steroids.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Improved Quality of Life</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Reduced pain can improve sleep, daily activity tolerance, and participation in rehabilitation and strengthening.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section iacsi-conditions" aria-labelledby="iacsi-conditions-title">
          <div className="iacsi-conditions-inner tms-conditions-inner">
            <header className="iacsi-conditions-header tms-conditions-header">
              <h2 id="iacsi-conditions-title" className="iacsi-conditions-title tms-conditions-title">
                Conditions Treated with Intra‑
                <br />
                Articular Corticosteroid Injections
              </h2>
            </header>

            <div className="iacsi-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with intra-articular corticosteroid injections">
              <article className="iacsi-condition-card tms-conditions-card" role="listitem" aria-labelledby="iacsi-condition-oa-title">
                <div className="iacsi-condition-copy tms-conditions-copy">
                  <h3 id="iacsi-condition-oa-title" className="iacsi-condition-title tms-conditions-card-title">
                    Osteoarthritis
                  </h3>
                  <p className="iacsi-condition-body tms-conditions-card-body">
                    Used for reducing inflammation and pain in osteoarthritis flare-ups, helping improve mobility and quality of life.
                  </p>
                </div>
                <div className="iacsi-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iacsi-condition-image tms-conditions-image" src="/assets/images/illustrative/Knee-Pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="iacsi-condition-card tms-conditions-card" role="listitem" aria-labelledby="iacsi-condition-ra-title">
                <div className="iacsi-condition-copy tms-conditions-copy">
                  <h3 id="iacsi-condition-ra-title" className="iacsi-condition-title tms-conditions-card-title">
                    Rheumatoid Arthritis
                  </h3>
                  <p className="iacsi-condition-body tms-conditions-card-body">
                    Helps reduce joint pain and swelling in inflamed joints caused by autoimmune inflammatory arthritis.
                  </p>
                </div>
                <div className="iacsi-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iacsi-condition-image tms-conditions-image" src="/assets/images/illustrative/Knee-Pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="iacsi-condition-card tms-conditions-card" role="listitem" aria-labelledby="iacsi-condition-gout-title">
                <div className="iacsi-condition-copy tms-conditions-copy">
                  <h3 id="iacsi-condition-gout-title" className="iacsi-condition-title tms-conditions-card-title">
                    Gout
                  </h3>
                  <p className="iacsi-condition-body tms-conditions-card-body">
                    Can be used to manage acute joint inflammation in selected cases, reducing pain and helping restore function.
                  </p>
                </div>
                <div className="iacsi-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iacsi-condition-image tms-conditions-image" src="/assets/images/illustrative/Knee-Pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="iacsi-condition-card tms-conditions-card" role="listitem" aria-labelledby="iacsi-condition-bursitis-title">
                <div className="iacsi-condition-copy tms-conditions-copy">
                  <h3 id="iacsi-condition-bursitis-title" className="iacsi-condition-title tms-conditions-card-title">
                    Bursitis
                  </h3>
                  <p className="iacsi-condition-body tms-conditions-card-body">
                    Treats inflammation in bursae (small sacs filled with fluid), which can cause pain around joints.
                  </p>
                </div>
                <div className="iacsi-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="iacsi-condition-image tms-conditions-image" src="/assets/images/illustrative/Knee-Pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section iacsi-right-for-you" aria-labelledby="iacsi-right-for-you-title">
          <div className="iacsi-right-for-you-inner">
            <div className="iacsi-right-for-you-layout">
              <h2 id="iacsi-right-for-you-title" className="iacsi-right-for-you-title">
                Are Intra‑Articular
                <br />
                Corticosteroid Injections
                <br />
                Right for You?
              </h2>

              <div className="iacsi-right-for-you-copy">
                <p className="iacsi-right-for-you-paragraph">
                  Intra‑articular corticosteroid injections are typically suitable for individuals with joint pain due to conditions such as
                  osteoarthritis or inflammatory arthritis who have not found enough relief with other treatments.
                </p>
                <p className="iacsi-right-for-you-paragraph">
                  They’re often recommended for targeted, temporary symptom reduction to help you move more comfortably and progress a
                  rehabilitation plan.
                </p>
                <p className="iacsi-right-for-you-paragraph">
                  However, injections may not be ideal for everyone. People with suspected joint infection, certain allergies, or those who
                  have recently had similar injections may need alternative approaches.
                </p>
                <p className="iacsi-right-for-you-paragraph">
                  A clinician will review your history and goals to determine whether this option aligns with your needs and safe dosing
                  guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section iacsi-faq" aria-labelledby="iacsi-faq-title">
          <div className="iacsi-faq-inner">
            <header className="iacsi-faq-header">
              <h2 id="iacsi-faq-title" className="iacsi-faq-title">
                Intra‑Articular Corticosteroid Injections FAQ
              </h2>
            </header>

            <div className="iacsi-faq-card" role="list" aria-label="Intra-articular corticosteroid injections frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `iacsi-faq-${item.id}`;
                const panelId = `iacsi-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="iacsi-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="iacsi-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="iacsi-faq-question">{item.question}</span>
                      <span className="iacsi-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="iacsi-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="iacsi-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="iacsi-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="iacsi-details-title" className="minimally-invasive-treatment-details-title">
              Intra‑articular corticosteroid injection: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Steroid injections can be helpful for short‑term symptom reduction in selected scenarios. Your clinician will discuss dosing,
              frequency, and whether another approach is more appropriate for your diagnosis.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-technique-title">
              <h3 id="iacsi-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                After skin preparation and local anaesthetic, a needle is placed into the joint (often under ultrasound guidance) and
                medication is injected to reduce inflammation. Some clinicians also inject a small amount of local anaesthetic.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-benefits-title">
              <h3 id="iacsi-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of intra-articular corticosteroid injections">
                <li>Can reduce pain and inflammation in selected joint conditions.</li>
                <li>May improve sleep, mobility, and ability to participate in rehabilitation.</li>
                <li>Outpatient, minimally invasive procedure with a short appointment time.</li>
                <li>Can be part of a broader plan including exercise therapy and load management.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-steps-title">
              <h3 id="iacsi-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Intra-articular corticosteroid injection procedural steps">
                <li>Clinical assessment and confirmation of target joint.</li>
                <li>Skin cleaning and local anaesthetic.</li>
                <li>Needle placement (often with ultrasound guidance).</li>
                <li>Medication injection and short observation period.</li>
                <li>Aftercare instructions and rehabilitation planning.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-risks-title">
              <h3 id="iacsi-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of intra-articular corticosteroid injections">
                <li>Temporary soreness or a short‑term pain flare.</li>
                <li>Infection, bleeding, bruising (uncommon).</li>
                <li>Transient rise in blood sugar in people with diabetes.</li>
                <li>Skin colour change or tissue thinning near the injection site (uncommon).</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-prep-title">
              <h3 id="iacsi-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for intra-articular corticosteroid injections">
                <li>Bring a medication list; discuss blood thinners and diabetes management as needed.</li>
                <li>Avoid high‑load activity for a short period and follow guidance on gradual return.</li>
                <li>Watch for fever, increasing redness, or worsening pain after the injection.</li>
                <li>Use the symptom relief window to progress strengthening and movement goals.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="iacsi-recovery-title">
              <h3 id="iacsi-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people resume normal daily activities quickly. Relief may occur within days, while longer‑term improvement depends on
                rehabilitation and addressing contributing factors such as strength, mobility, and load management.
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

export default IntraArticularCorticosteroidsInjectionPage;
