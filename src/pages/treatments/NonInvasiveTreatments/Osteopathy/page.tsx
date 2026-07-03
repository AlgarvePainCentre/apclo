import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Osteopathy.css';

const OsteopathyPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'duration',
        question: 'How long does each osteopathy session take?',
        answer:
          'Session length can vary depending on your goals and what is needed on the day. Your clinician will explain the plan at the start of the appointment.',
      },
      {
        id: 'discomfort',
        question: 'Will I experience any discomfort?',
        answer:
          'Some techniques can feel slightly uncomfortable, and mild soreness can occur afterwards. This is usually short‑lived and should be discussed if it persists or worsens.',
      },
      {
        id: 'sessions',
        question: 'How many sessions will I need?',
        answer:
          'This depends on your condition, how long symptoms have been present, and your response to treatment. Many plans are reassessed after a small number of sessions to confirm progress.',
      },
      {
        id: 'safe',
        question: 'Is osteopathy safe for all ages?',
        answer:
          'Osteopathy can be appropriate across age groups when care is tailored to the individual. Your clinician will screen for red flags and adapt techniques to your health profile.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);
  const panelContentRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const [panelHeights, setPanelHeights] = React.useState<Record<string, number>>({});

  const measurePanel = React.useCallback((id: string) => {
    const el = panelContentRefs.current[id];
    if (!el) return;
    const nextHeight = el.scrollHeight;
    setPanelHeights((current) => (current[id] === nextHeight ? current : { ...current, [id]: nextHeight }));
  }, []);

  React.useEffect(() => {
    if (!activeFaqId) return;
    measurePanel(activeFaqId);
  }, [activeFaqId, measurePanel]);

  React.useEffect(() => {
    const handleResize = () => {
      if (!activeFaqId) return;
      measurePanel(activeFaqId);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeFaqId, measurePanel]);

  React.useEffect(() => {
    if (!activeFaqId) return;
    if (typeof ResizeObserver === 'undefined') return;
    const el = panelContentRefs.current[activeFaqId];
    if (!el) return;

    const ro = new ResizeObserver(() => measurePanel(activeFaqId));
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeFaqId, measurePanel]);

  React.useEffect(() => {
    const pageTitle = 'Osteopathy in Algarve | Gentle manual therapy for spine and joints';
    document.title = pageTitle;

    const description =
      'Learn about osteopathy in Algarve for back pain, posture, and joint stiffness. Gentle hands‑on care and easy consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-osteopathy') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "url('/assets/images/Osteopathy/banner.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page osteopathy-page page-osteopathy" id="psx-osteopathy">
      <header className="treatment-page-hero osteopathy-hero" aria-label="Osteopathy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Osteopathy</h1>
          <p className="psx-hero-subtitle">
            Hands-on techniques aim to restore balance in joints, muscles and posture.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Osteopathy" />

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ost-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/Osteopathy/banner.webp"
                alt="Hands-on musculoskeletal assessment and manual therapy techniques used in osteopathy care (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ost-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Osteopathy combines hands‑on assessment with movement advice and an active home plan. Sessions aim to reduce pain, improve
                mobility, and build confidence with daily activities. The best results are typically achieved when treatment supports an
                exercise programme rather than replacing it.
              </p>
              <p className="treatments-feature-body">
                Your clinician will take a detailed history and perform a physical assessment of movement, strength, and how symptoms behave.
                Hands‑on techniques may be used when appropriate, alongside education and practical strategies for posture, work demands, and
                activity pacing.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section ost-understanding" aria-labelledby="ost-understanding-title">
          <div className="ost-understanding-inner">
            <h2 id="ost-understanding-title" className="ost-understanding-title">
              Understanding
              <br />
              Osteopathy
            </h2>
            <div className="ost-understanding-copy">
              <p className="ost-understanding-paragraph">
                Osteopathy is a hands-on treatment approach that involves moving, stretching, and massaging muscles and joints to address
                and prevent musculoskeletal issues. This holistic approach supports overall well-being by promoting the body’s natural
                ability to heal itself, with targeted techniques tailored to each individual.
              </p>
              <p className="ost-understanding-paragraph">
                Osteopathy is a non-invasive, manual therapy that aims to improve the function of the musculoskeletal system. By focusing on
                the body’s structure—bones, muscles, ligaments, and connective tissues—osteopathy helps relieve pain, restore movement, and
                improve health. This approach is particularly effective for those seeking a gentle treatment option that enhances overall
                physical function.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section ost-process" aria-labelledby="ost-process-title">
          <div className="ost-process-inner">
            <header className="ost-process-header">
              <h2 id="ost-process-title" className="ost-process-title">
                What this Process Looks Like
              </h2>
            </header>

            <div className="ost-steps-grid" role="list" aria-label="Osteopathy process steps">
              <article className="ost-step-card" role="listitem" aria-label="Step 1 initial assessment">
                <p className="ost-step-number" aria-hidden="true">
                  1.
                </p>
                <h3 className="ost-step-title">Initial Assessment</h3>
                <div className="ost-step-divider" aria-hidden="true" />
                <p className="ost-step-body">
                  The first step involves a detailed evaluation of the patient's medical history, current symptoms, and physical condition.
                  This may include an examination of posture, muscle tension, and joint alignment.
                </p>
              </article>

              <article className="ost-step-card" role="listitem" aria-label="Step 2 treatment techniques">
                <p className="ost-step-number" aria-hidden="true">
                  2.
                </p>
                <h3 className="ost-step-title">Treatment Techniques</h3>
                <div className="ost-step-divider" aria-hidden="true" />
                <p className="ost-step-body">
                  Osteopaths use a variety of techniques, such as stretching, massaging, and gentle manipulation, to relieve muscle tension,
                  improve joint mobility, and enhance blood flow. Techniques are adjusted to the patient's comfort level and specific needs.
                </p>
              </article>

              <article className="ost-step-card" role="listitem" aria-label="Step 3 complementary advice">
                <p className="ost-step-number" aria-hidden="true">
                  3.
                </p>
                <h3 className="ost-step-title">Complementary Advice</h3>
                <div className="ost-step-divider" aria-hidden="true" />
                <p className="ost-step-body">
                  Many osteopathic treatments include guidance on posture, exercises, and lifestyle habits that can support healing and
                  prevent future issues.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ost-aftercare" aria-labelledby="ost-aftercare-title">
          <header className="ost-aftercare-header">
              <h2 id="ost-aftercare-title" className="ost-aftercare-title">
                What to Expect After Implementation
              </h2>
          </header>

          <div className="ost-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="ost-aftercare-media" aria-hidden="true">
                <div className="ost-aftercare-poster">
                  <img
                  className="ost-aftercare-image"
                  src="/assets/images/Osteopathy/card.webp"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
                </div>
              </figure>

              <div className="ost-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="ost-aftercare-item" role="listitem">
                  <h3 className="ost-aftercare-item-title">Immediate Relaxation</h3>
                  <p className="ost-aftercare-item-body">
                    Many patients experience relief from tension and a feeling of relaxation immediately after the session.
                  </p>
                </article>
                <div className="ost-aftercare-divider" aria-hidden="true" />
                <article className="ost-aftercare-item" role="listitem">
                  <h3 className="ost-aftercare-item-title">Gradual Pain Relief</h3>
                  <p className="ost-aftercare-item-body">
                    While some pain relief may be immediate, it often continues to improve over the following days as the body adjusts to the
                    treatment.
                  </p>
                </article>
                <div className="ost-aftercare-divider" aria-hidden="true" />
                <article className="ost-aftercare-item" role="listitem">
                  <h3 className="ost-aftercare-item-title">Enhanced Mobility</h3>
                  <p className="ost-aftercare-item-body">
                    Patients commonly report improved flexibility and ease of movement after osteopathic sessions, which may further improve
                    with regular sessions.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section ost-benefits" aria-labelledby="ost-benefits-title">
          <div className="ost-benefits-inner">
            <header className="ost-benefits-header">
              <h2 id="ost-benefits-title" className="ost-benefits-title">
                Benefits of Osteopathy
              </h2>
            </header>

            <div className="rfa-benefits-grid" role="list" aria-label="Benefits of osteopathy">
              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Non-Invasive Pain Relief</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Osteopathy provides pain relief without medication or surgery, making it a suitable option for those seeking natural,
                  hands-on treatment.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Holistic Approach</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Osteopathy treats the body as an interconnected system, addressing root causes rather than just symptoms, which supports
                  overall well-being.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Improved Circulation &amp; Healing</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Gentle manipulation techniques promote blood flow, which can aid healing and enhance the body’s ability to recover.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ost-conditions" aria-labelledby="ost-conditions-title">
          <div className="pt-conditions-inner tms-conditions-inner">
            <header className="pt-conditions-header tms-conditions-header">
              <h2 id="ost-conditions-title" className="pt-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Osteopathy
              </h2>
            </header>

            <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with osteopathy">
              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Back &amp; Neck Pain</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Osteopathy is highly effective in treating back and neck pain caused by poor posture, muscle tension, or spinal
                    misalignments.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Osteopathy/Bac&NeckPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card pt-condition-card--reverse" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Joint Pain &amp; Arthritis</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    This therapy can alleviate pain and stiffness associated with arthritis and other joint conditions, helping to maintain
                    mobility.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Osteopathy/JoinPain&Arthritis.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card pt-condition-card--reverse" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Headaches &amp; Migraines</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Tension headaches and certain types of migraines can be managed through osteopathic techniques that relieve stress in the
                    neck and upper back.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Osteopathy/Headaches&Migraines.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Sports Injuries</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Osteopathy is frequently used by athletes to aid in recovery from injuries and to improve performance through better
                    alignment and flexibility.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Osteopathy/SportsInjuries.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Postural Issues</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Conditions arising from poor posture, such as shoulder pain, knee strain, or muscle imbalance, respond well to osteopathic
                    treatment.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Osteopathy/PosturalIssues.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ost-right" aria-labelledby="ost-right-title">
          <div className="rfa-help-inner">
            <h2 id="ost-right-title" className="rfa-help-title">
              Is Osteopathy
              <br />
              Right for You?
            </h2>
            <div className="rfa-help-copy">
              <p className="rfa-help-paragraph">
                Osteopathy is a suitable treatment option for individuals experiencing musculoskeletal pain or mobility issues. This natural,
                non-invasive approach can be beneficial for those seeking relief from discomfort without relying on medication or surgery,
                making it an appealing choice for people looking to improve their physical well-being through gentle, hands-on techniques.
              </p>
              <p className="rfa-help-paragraph">
                However, osteopathy may not be ideal for everyone. Individuals with specific medical conditions, such as osteoporosis or severe
                joint degeneration, may need to consider alternative treatments. A consultation with a healthcare provider can help assess
                your unique needs and determine if osteopathy is the most appropriate option for you.
              </p>
              <p className="rfa-help-paragraph">
                Osteopathy often yields the best results when integrated into a continued care plan. Patients who commit to multiple sessions
                over time can experience progressive improvements in pain relief and mobility, enhancing their overall quality of life through
                consistent, tailored care.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section ost-faq" aria-labelledby="ost-faq-title">
          <div className="ost-faq-inner">
            <header className="ost-faq-header">
              <h2 id="ost-faq-title" className="ost-faq-title">
                Osteopathy FAQ
              </h2>
            </header>

            <div className="ost-faq-card" role="list" aria-label="Osteopathy frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `ost-faq-${item.id}`;
                const panelId = `ost-faq-panel-${item.id}`;
                const maxHeight = isActive ? `${panelHeights[item.id] ?? 0}px` : '0px';

                return (
                  <div key={item.id} className="ost-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="ost-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="ost-faq-question">{item.question}</span>
                      <span className="ost-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="ost-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                      style={{ maxHeight }}
                    >
                      <div
                        className="ost-faq-panel-inner"
                        ref={(node) => {
                          panelContentRefs.current[item.id] = node;
                        }}
                      >
                        <p className="ost-faq-answer">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ost-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ost-details-title" className="minimally-invasive-treatment-details-title">
              Osteopathy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Osteopathy is typically part of a broader plan that includes movement progression, sleep and stress strategies when relevant,
              and collaboration with other clinicians for complex cases.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-technique-title">
              <h3 id="ost-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Osteopathy uses manual assessment and selected hands‑on techniques to influence joint mobility and muscle tone, combined with
                education and exercise to build longer‑term capacity. Treatment is tailored to the individual’s presentation and goals.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-benefits-title">
              <h3 id="ost-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of osteopathy">
                <li>May reduce pain and improve movement confidence in selected musculoskeletal problems.</li>
                <li>Hands‑on care can support short‑term symptom relief for some people.</li>
                <li>Education and home exercises support longer‑term functional gains.</li>
                <li>Integrates well with physiotherapy, exercise therapy, and medical review when needed.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-steps-title">
              <h3 id="ost-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Osteopathy session steps">
                <li>History and screening for red flags or referral needs.</li>
                <li>Movement assessment and identification of contributing factors.</li>
                <li>Hands‑on treatment where appropriate.</li>
                <li>Exercise plan and practical strategies for daily activities.</li>
                <li>Follow‑up reassessment and progression of the plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-risks-title">
              <h3 id="ost-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of osteopathy">
                <li>Temporary soreness or symptom flare after hands‑on work.</li>
                <li>Bruising or mild discomfort with manual techniques (uncommon).</li>
                <li>Injury risk if techniques are inappropriate for the condition (screening reduces this risk).</li>
                <li>Delayed diagnosis if red flags are missed; seek review for worsening or unusual symptoms.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-prep-title">
              <h3 id="ost-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for osteopathy">
                <li>Bring a medication list and any relevant imaging or reports.</li>
                <li>Wear comfortable clothing for movement assessment.</li>
                <li>Follow the home programme consistently and track functional change.</li>
                <li>Seek medical advice for red flags such as fever, unexplained weight loss, or progressive neurological symptoms.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ost-recovery-title">
              <h3 id="ost-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people feel short‑term symptom change within days, while longer‑term improvement depends on consistent exercise and
                activity progression over weeks to months.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideMinimallyInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default OsteopathyPage;
