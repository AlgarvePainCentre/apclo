import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './OccupationTherapy.css';

const OccupationTherapyPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'frequency',
        question: 'How often will I need occupational therapy sessions?',
        answer:
          'Frequency depends on your goals, safety needs, and the stage of rehabilitation. Some people benefit from weekly sessions initially, with reviews spaced out as independence improves.',
      },
      {
        id: 'home-exercises',
        question: 'Will I need to continue exercises at home?',
        answer:
          'Home practice is usually an important part of progress. You may be given simple task practice, routines, or exercises to reinforce strategies between sessions.',
      },
      {
        id: 'insurance',
        question: 'Is occupational therapy covered by insurance?',
        answer:
          'Coverage varies by provider and policy. It’s best to check directly with your insurer, and our team can provide documentation if needed.',
      },
      {
        id: 'duration',
        question: 'How long does occupational therapy last?',
        answer:
          'Duration varies based on complexity and progress. Some plans are short and goal-focused, while others involve longer-term support for chronic or neurological conditions.',
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
    const pageTitle = 'Occupational therapy in Algarve | Daily activity and independence support';
    document.title = pageTitle;

    const description =
      'Explore occupational therapy in Algarve to improve daily activities, adapt your environment, and plan your recovery. Book a supportive consultation today.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-occupation-therapy') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "url('/assets/images/OccupationalTherapy/banner.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page occupation-therapy-page page-occupationtherapy" id="psx-occupation-therapy">
      <header className="treatment-page-hero occupation-therapy-hero" aria-label="Occupational therapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Occupational therapy</h1>
          <p className="psx-hero-subtitle">
            Practical strategies help you manage daily activities more comfortably and independently.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Occupational therapy" />

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ot-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <video
                className="treatments-feature-video"
                aria-label="Occupational therapy support for daily activities, independence, and home safety planning (illustrative)."
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
                poster="/assets/images/illustrative/pain-medicine-algarve-min.webp"
              >
                <source src="/assets/videos/Pain-Medicine-min.h264.mp4" type="video/mp4" />
                <source src="/assets/videos/Pain-Medicine-min.av1.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ot-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Occupational therapy focuses on helping you do everyday tasks more safely and independently. It can support recovery after
                illness or injury, improve confidence at home, and reduce fatigue and falls risk through practical strategies and
                environment adaptations.
              </p>
              <p className="treatments-feature-body">
                Your therapist will ask about your daily routine and goals—washing, dressing, cooking, mobility, work tasks—and assess how
                symptoms, strength, balance, or cognition affect function. The plan may include training, pacing, equipment advice, and
                home safety recommendations.
              </p>
              <p className="treatments-feature-body">
                After sessions, you’ll receive a clear action plan: exercises or task practice, recommendations for home set‑up, and
                guidance for carers when relevant.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section ot-understanding" aria-labelledby="ot-understanding-title">
          <div className="ot-understanding-inner">
            <h2 id="ot-understanding-title" className="ot-understanding-title">
              Understanding
              <br />
              Occupational Therapy
            </h2>
            <div className="ot-understanding-copy">
              <p className="ot-understanding-paragraph">
                Occupational therapy (OT) focuses on assisting individuals in achieving independence in daily life. It encompasses a range of
                practices to help people of all ages perform essential tasks, whether at home, work, or in social settings. This therapy adapts
                activities to match an individual&apos;s physical, emotional, and cognitive abilities, allowing them to lead fulfilling,
                autonomous lives.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section ot-process" aria-labelledby="ot-process-title">
          <div className="ot-process-inner">
            <header className="ot-process-header">
              <h2 id="ot-process-title" className="ot-process-title">
                What this Process Looks Like
              </h2>
            </header>

            <div className="ot-steps-grid" role="list" aria-label="Occupational therapy process steps">
              <article className="ot-step-card" role="listitem" aria-label="Step 1 personalized assessment">
                <p className="ot-step-number" aria-hidden="true">
                  1.
                </p>
                <h3 className="ot-step-title">Personalized Assessment</h3>
                <div className="ot-step-divider" aria-hidden="true" />
                <p className="ot-step-body">
                  The process begins with an in-depth evaluation, where therapists identify the patient&apos;s needs, preferences, and goals.
                  This can include analyzing movement abilities, cognitive function, emotional needs, and lifestyle factors.
                </p>
              </article>

              <article className="ot-step-card" role="listitem" aria-label="Step 2 customized treatment plans">
                <p className="ot-step-number" aria-hidden="true">
                  2.
                </p>
                <h3 className="ot-step-title">Customized Treatment Plans</h3>
                <div className="ot-step-divider" aria-hidden="true" />
                <p className="ot-step-body">
                  Based on the assessment, occupational therapists develop individualized plans that may include therapeutic exercises,
                  practical skills training, and the use of adaptive tools.
                </p>
              </article>

              <article className="ot-step-card" role="listitem" aria-label="Step 3 skill building and practice">
                <p className="ot-step-number" aria-hidden="true">
                  3.
                </p>
                <h3 className="ot-step-title">Skill Building &amp; Practice</h3>
                <div className="ot-step-divider" aria-hidden="true" />
                <p className="ot-step-body">
                  Patients work with therapists on activities that align with their goals, such as grooming, mobility, communication, and
                  work-related skills. Adaptive techniques may be used to simplify tasks and increase comfort and independence.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ot-aftercare" aria-labelledby="ot-aftercare-title">
          <header className="ot-aftercare-header">
              <h2 id="ot-aftercare-title" className="ot-aftercare-title">
                What to Expect After Implementation
              </h2>
              <p className="ot-aftercare-subtitle">Here’s a breakdown of what you can expect:</p>
          </header>

          <div className="ot-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="ot-aftercare-media" aria-hidden="true">
                <div className="ot-aftercare-poster">
                  <img
                  className="ot-aftercare-image"
                  src="/assets/images/OccupationalTherapy/card.webp"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
                </div>
              </figure>

              <div className="ot-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="ot-aftercare-item" role="listitem">
                  <h3 className="ot-aftercare-item-title">Improved Daily Functioning</h3>
                  <p className="ot-aftercare-item-body">
                    Most patients notice increased ease and independence in daily activities, including self-care, household tasks, and
                    community engagement.
                  </p>
                </article>
                <div className="ot-aftercare-divider" aria-hidden="true" />
                <article className="ot-aftercare-item" role="listitem">
                  <h3 className="ot-aftercare-item-title">Enhanced Confidence</h3>
                  <p className="ot-aftercare-item-body">
                    As individuals become more capable of managing daily tasks, their self-confidence grows, leading to improved mental
                    well-being.
                  </p>
                </article>
                <div className="ot-aftercare-divider" aria-hidden="true" />
                <article className="ot-aftercare-item" role="listitem">
                  <h3 className="ot-aftercare-item-title">Gradual Progress &amp; Long-Term Gains</h3>
                  <p className="ot-aftercare-item-body">
                    Occupational therapy often provides gradual improvements, but the benefits are long-lasting as patients learn skills they
                    can apply independently over time.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section ot-benefits" aria-labelledby="ot-benefits-title">
          <div className="ot-benefits-inner">
            <header className="ot-benefits-header">
              <h2 id="ot-benefits-title" className="ot-benefits-title">
                Benefits of Occupational Therapy
              </h2>
              <p className="ot-benefits-subtitle">
                Occupational Therapy can significantly improve the quality of life for those suffering from chronic pain.
              </p>
              <p className="ot-benefits-subtitle-secondary">Some of the main benefits include:</p>
            </header>

            <div className="rfa-benefits-grid" role="list" aria-label="Benefits of occupational therapy">
              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Greater Independence</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  OT empowers individuals to manage daily tasks, promoting autonomy and reducing the need for caregiver assistance.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Enhanced Physical &amp; Cognitive Abilities</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  OT strengthens both physical and cognitive skills, helping individuals adapt to challenges and maintain functionality.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Emotional Support &amp; Coping</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Occupational therapists offer support to help individuals adapt emotionally, particularly after life-changing events or
                  injuries.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ot-conditions" aria-labelledby="ot-conditions-title">
          <div className="pt-conditions-inner tms-conditions-inner">
            <header className="pt-conditions-header tms-conditions-header">
              <h2 id="ot-conditions-title" className="pt-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Occupational Therapy
              </h2>
            </header>

            <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with occupational therapy">
              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Post‑Surgical Rehabilitation</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Patients recovering from surgery or injury can benefit from OT to regain skills and prevent further complications.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/OccupationalTherapy/PostSurgical.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Developmental Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Children with developmental disorders such as autism or ADHD receive support in building skills necessary for social
                    interaction and daily tasks.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/OccupationalTherapy/DevelopmentDisorders.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Mental Health Challenges</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Individuals dealing with mental health conditions, including anxiety and depression, can benefit from OT, which helps
                    them engage in therapeutic activities that improve focus, mood, and motivation.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/OccupationalTherapy/MentalHeath.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Neurological Conditions</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Conditions like stroke, Parkinson’s disease, and multiple sclerosis can be managed with OT, aiding patients in adapting to
                    new physical limitations and maintaining daily functions.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/OccupationalTherapy/NeurologicalConditions.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ot-right" aria-labelledby="ot-right-title">
          <div className="rfa-help-inner">
            <h2 id="ot-right-title" className="rfa-help-title">
              Is Occupational Therapy
              <br />
              Right for You?
            </h2>
            <div className="rfa-help-copy">
              <p className="rfa-help-paragraph">
                Occupational therapy is highly beneficial for individuals who face challenges in completing everyday tasks due to physical,
                mental, or developmental issues. It offers a supportive pathway for those looking to regain or improve their ability to
                function independently in daily life, helping them overcome various obstacles through targeted activities and skill-building
                exercises.
              </p>
              <p className="rfa-help-paragraph">
                However, occupational therapy is a gradual process, requiring consistent effort and a proactive attitude toward therapeutic
                activities. It is most effective for individuals who are motivated to improve their daily functioning and willing to engage in
                exercises designed to build or restore essential skills over time.
              </p>
              <p className="rfa-help-paragraph">
                While occupational therapy can produce noticeable improvements within a few weeks, long-term commitment often brings the
                greatest benefits, especially for those managing chronic conditions or severe disabilities. Ongoing engagement allows
                individuals to make steady progress, enhancing their quality of life and independence in meaningful ways.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section ot-faq" aria-labelledby="ot-faq-title">
          <div className="ot-faq-inner">
            <header className="ot-faq-header">
              <h2 id="ot-faq-title" className="ot-faq-title">
                Occupational Therapy FAQ
              </h2>
            </header>

            <div className="ot-faq-card" role="list" aria-label="Occupational therapy frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `ot-faq-${item.id}`;
                const panelId = `ot-faq-panel-${item.id}`;
                const maxHeight = isActive ? `${panelHeights[item.id] ?? 0}px` : '0px';

                return (
                  <div key={item.id} className="ot-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="ot-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="ot-faq-question">{item.question}</span>
                      <span className="ot-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="ot-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                      style={{ maxHeight }}
                    >
                      <div
                        className="ot-faq-panel-inner"
                        ref={(node) => {
                          panelContentRefs.current[item.id] = node;
                        }}
                      >
                        <p className="ot-faq-answer">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ot-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ot-details-title" className="minimally-invasive-treatment-details-title">
              Occupational therapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Occupational therapy is goal‑based and highly practical. Your therapist will tailor strategies to your environment, symptoms,
              and independence goals.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-technique-title">
              <h3 id="ot-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Occupational therapy analyses tasks and identifies barriers (strength, balance, pain, fatigue, cognition, or environment).
                The therapist then adapts tasks, introduces equipment, and trains strategies to improve safety and independence.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-benefits-title">
              <h3 id="ot-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of occupational therapy">
                <li>Improved independence with daily activities and safer mobility at home.</li>
                <li>Reduced falls risk through environment changes and practical training.</li>
                <li>Better fatigue and pain pacing through sustainable routines.</li>
                <li>Support for carers and coordinated rehabilitation goals.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-steps-title">
              <h3 id="ot-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Occupational therapy steps">
                <li>Assessment of goals, daily routine, and safety risks.</li>
                <li>Functional testing of tasks (transfers, dressing, kitchen tasks) as appropriate.</li>
                <li>Home or environment review and equipment recommendations.</li>
                <li>Training in strategies: pacing, energy conservation, safe movement patterns.</li>
                <li>Review and progression as independence improves.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-risks-title">
              <h3 id="ot-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of occupational therapy">
                <li>Temporary fatigue after challenging task practice.</li>
                <li>Short‑term soreness if activity increases too quickly.</li>
                <li>Falls risk during early training without appropriate supervision.</li>
                <li>Delayed progress if equipment or home changes are not implemented.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-prep-title">
              <h3 id="ot-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for occupational therapy">
                <li>Bring a medication list and note key challenges in your daily routine.</li>
                <li>Consider photos or notes of your home set‑up if an in‑person visit is not possible.</li>
                <li>Follow pacing guidance and practice tasks consistently between sessions.</li>
                <li>Discuss falls risk, dizziness, or new neurological symptoms promptly.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ot-recovery-title">
              <h3 id="ot-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Improvements can start immediately with environment changes and strategies. Longer‑term gains in independence typically
                build over weeks to months with consistent practice and follow‑up.
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

export default OccupationTherapyPage;
