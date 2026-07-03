import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Exercise.css';

const ExercisePage: React.FC = () => {

    const faqItems = React.useMemo(
        () => [
          {
            id: 'Frequency',
            question: 'How long does a typical exercise session last?',
            answer:
              'Sessions typically last between 30 to 60 minutes, depending on the program and individual needs.',
          },
          {
            id: 'Therapy Standars',
            question: 'Will I receive a personalized exercise plan?',
            answer:
              'Yes, each client receives a tailored exercise program based on their specific goals and assessment results.',
          },
          {
            id: 'Duration',
            question: 'How often should I exercise?',
            answer:
              'The frequency of sessions varies; however, most individuals benefit from at least 2-3 sessions per week.',
          },
          {
            id: 'Conditions',
            question: 'Can exercise help with my specific condition?',
            answer:
              'Our team is experienced in designing programs for various conditions; consultations will help determine suitability.',
          },
          {
            id: 'conditions',
            question: 'Is exercise safe for everyone?',
            answer:
              'Exercise is generally safe; however, a preliminary assessment is essential to identify any potential risks or limitations.',
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
    const pageTitle = 'Exercise therapy in Algarve | Safe movement programs for pain';
    document.title = pageTitle;

    const description =
      'Discover exercise therapy in Algarve for spine, joint, and nerve pain. Graded activity plans, clear guidance, and easy consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-exercise') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "url('/assets/images/Exercise/banner.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page exercise-page page-exercise" id="psx-exercise">
      <header className="treatment-page-hero exercise-hero" aria-label="Exercise therapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Exercise</h1>
          <p className="psx-hero-subtitle">
            Structured exercise plans help you move more, with less pain and more confidence.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Exercise" />

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ex-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/performance-min.webp"
                alt="Exercise therapy and performance training used to improve strength, mobility, and confidence with movement (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ex-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Exercise therapy uses a structured, progressive plan to rebuild strength, mobility, and confidence with movement. The aim is
                improved function—walking, lifting, stairs, sport—while reducing flare‑ups through pacing and smart progression.
              </p>
              <p className="treatments-feature-body">
                Your clinician will assess movement patterns, strength and endurance, and what activities matter most to you. Programmes are
                individualised and start at a safe “minimum effective dose”, then progress as your capacity improves.
              </p>
              <p className="treatments-feature-body">
                After sessions, you will have a home programme with clear instructions on frequency, intensity, and how to respond to
                symptom fluctuations. Consistency and gradual progression are the keys to long‑term results.
              </p>
            </div>
          </div>
        </section>

        {/* Understanding */}
        <section className="page-section exercise-understanding st-understanding" aria-labelledby="exercise-understanding-title">
          <div className="exercise-understanding-inner st-understanding-inner">
            <h2 id="exercise-understanding-title" className="exercise-understanding-title st-understanding-title">
              Understanding
              <br />
              Exercise
            </h2>
            <div className="exercise-understanding-copy st-understanding-copy">
              <p className="st-understanding-paragraph">
                Exercise is a structured physical activity aimed at improving strength, flexibility, endurance, and overall health. It plays a crucial role in rehabilitation by promoting healing and enhancing physical function.
              </p>
              <p className="st-understanding-paragraph">
                Personalized exercise programs take into account individual needs, abilities, and health conditions to create a tailored approach that optimizes recovery and performance.
              </p>
              <p className="st-understanding-paragraph">
                Understanding the different types of exercise—such as strength training, cardiovascular workouts, and flexibility exercises—is essential for maximizing benefits and preventing injuries.
              </p>
            </div>
          </div>
        </section>

        {/* Processo */} 
        <section className="page-section exercise-process st-process" aria-labelledby="exercise-process-title">
          <div className="exercise-process-inner st-process-inner">
            <header className="exercise-process-header st-process-header">
              <h2 id="exercise-process-title" className="exercise-process-title st-process-title">
                What this Process Looks Like
              </h2>
            </header>

            <div className="exercise-steps-grid st-steps-grid" role="list" aria-label="Exercise therapy process steps">
              <article className="st-step-card" role="listitem" aria-label="Step 1 consultation and program design">
                <p className="st-step-number" aria-hidden="true">
                  1.
                </p>
                <h3 className="st-step-title">Consultation &amp; Program Design</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Based on an assessment, a personalized exercise plan is developed. This plan includes a variety of exercises tailored to
                  your needs, focusing on strength, flexibility, and endurance.
                </p>
              </article>

              <article className="st-step-card" role="listitem" aria-label="Step 2 supervised sessions">
                <p className="st-step-number" aria-hidden="true">
                  2.
                </p>
                <h3 className="st-step-title">Supervised Sessions</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Exercise sessions may be conducted one-on-one with a qualified trainer or therapist, ensuring correct form and technique.
                  This supervision helps prevent injuries and enhances effectiveness.
                </p>
              </article>

              <article className="st-step-card" role="listitem" aria-label="Step 3 progress monitoring">
                <p className="st-step-number" aria-hidden="true">
                  3.
                </p>
                <h3 className="st-step-title">Progress Monitoring</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Regular evaluations are conducted to monitor your progress and make necessary adjustments to the program, ensuring
                  continuous improvement and adaptation to your evolving needs.
                </p>
              </article>
            </div>
          </div>
        </section>

         {/* Expectativa */}
        <section className="page-section exercise-aftercare st-aftercare" aria-labelledby="exercise-aftercare-title">
          <header className="exercise-aftercare-header st-aftercare-header">
              <h2 id="exercise-aftercare-title" className="exercise-aftercare-title st-aftercare-title">
                What to Expect After Implementation
              </h2>
          </header>

          <div className="exercise-aftercare-layout st-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="exercise-aftercare-media st-aftercare-media" aria-hidden="true">
                <div className="exercise-aftercare-poster st-aftercare-poster">
                  <img
                  className="st-aftercare-image"
                  src="/assets/images/Exercise/card.webp"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
                </div>
              </figure>

              <div className="exercise-aftercare-panel st-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Increased Strength and Mobility</h3>
                  <p className="st-aftercare-item-body">
                    Engaging in regular exercise can lead to improved muscle strength, joint stability, and overall mobility.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Enhanced Confidence</h3>
                  <p className="st-aftercare-item-body">
                    As you progress through your exercise program, you may notice a boost in confidence and self-efficacy, helping you to engage more actively in daily activities.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Improved Mental Health</h3>
                  <p className="st-aftercare-item-body">
                    Regular physical activity is associated with improved mood, reduced anxiety, and better overall mental health, contributing to a positive outlook on life.
                  </p>
                </article>
              </div>
            </div>
        </section>

        {/* Beneficio */} 
        <section className="page-section exercise-benefits st-benefits" aria-labelledby="exercise-benefits-title">
          <div className="exercise-benefits-inner st-benefits-inner">
            <header className="exercise-benefits-header st-benefits-header">
              <h2 id="exercise-benefits-title" className="exercise-benefits-title st-benefits-title">
                Benefits of Speech Therapy
              </h2>

              <p className="ot-benefits-subtitle-secondary">Some of the main benefits include:</p>
            </header>

            <div className="rfa-benefits-grid" role="list" aria-label="Benefits of exercise therapy">

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Speedier Recovery</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Regular physical activity can help alleviate chronic pain conditions by strengthening muscles and improving flexibility.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Pain Management</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Regular physical activity can help alleviate chronic pain conditions by strengthening muscles and improving flexibility.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Quality of Life</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Incorporating exercise into your routine can improve overall health, leading to a more active and fulfilling lifestyle.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Mental Well-Being</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Exercise has been shown to release endorphins, which can improve mood and reduce symptoms of anxiety and depression.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Empowerment Through Movement</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  A personalized approach allows individuals to take control of their health and well-being, fostering a sense of empowerment and achievement.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Condição */} 
        <section className="page-section exercise-conditions st-conditions" aria-labelledby="exercise-conditions-title">
          <div className="pt-conditions-inner tms-conditions-inner">
            <header className="pt-conditions-header tms-conditions-header">
              <h2 id="exercise-conditions-title" className="pt-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Exercise Therapy
              </h2>
            </header>

            <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions supported by exercise therapy">
              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Musculoskeletal Injuries</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Exercise programs are beneficial for recovering from injuries such as sprains, strains, and fractures.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image" 
                    src="/assets/images/Exercise/Musculoskeletal.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Cardiovascular Health</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Exercise programs designed to improve cardiovascular fitness can help manage conditions such as hypertension and heart disease.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Exercise/Balance&Coordination.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Balance & Coordination Issues</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Targeted exercises can help improve stability and reduce the risk of falls, particularly in older adults.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Exercise/Balance&Coordination.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Right - Question  */}
        <section className="page-section exercise-right st-right" aria-labelledby="exercise-right-title">
          <div className="exercise-right-inner st-right-inner">
            <h2 id="exercise-right-title" className="exercise-right-title st-right-title">
              Is Exercise
              <br />
              Right for You?
            </h2>
            <div className="exercise-right-copy st-right-copy">
              <p className="st-right-body">
                Exercise benefits people of all ages and fitness levels, whether for injury recovery or general health improvement. It provides a path to better physical and mental well-being through regular movement.
              </p>
              <p className="st-right-body">
                Success in an exercise program requires a commitment to consistent physical activity and full engagement with the program. This dedication enables individuals to achieve the best possible results.
              </p>
              <p className="st-right-body">
                A consultation with our team is recommended before starting, ensuring that the program aligns with your health needs and is both safe and effective.
              </p>
            </div>
          </div>
        </section>

                {/* FAQ */}
        <section className="page-section exercise-faq st-faq" aria-labelledby="exercise-faq-title">
          <div className="exercise-faq-inner st-faq-inner">
            <header className="exercise-faq-header st-faq-header">
              <h2 id="exercise-faq-title" className="exercise-faq-title st-faq-title">
                Exercise therapy FAQ
              </h2>
            </header>

            <div className="exercise-faq-card st-faq-card" role="list" aria-label="Exercise therapy frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `exercise-faq-${item.id}`;
                const panelId = `exercise-faq-panel-${item.id}`;
                const maxHeight = isActive ? `${panelHeights[item.id] ?? 0}px` : '0px';

                return (
                  <div key={item.id} className="st-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="st-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="st-faq-question">{item.question}</span>
                      <span className="st-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="st-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                      style={{ maxHeight }}
                    >
                      <div
                        className="st-faq-panel-inner"
                        ref={(node) => {
                          panelContentRefs.current[item.id] = node;
                        }}
                      >
                        <p className="st-faq-answer">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>        















        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ex-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ex-details-title" className="minimally-invasive-treatment-details-title">
              Exercise therapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Exercise plans are adapted to diagnosis, baseline fitness, and safety considerations. Your clinician will advise on safe
              progressions, load limits, and any red flags that need medical review.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-technique-title">
              <h3 id="ex-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Exercise increases tissue capacity and improves nervous system tolerance through graded exposure. Strength, mobility, and
                conditioning are progressed over time using measurable targets and a flare‑up plan.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-benefits-title">
              <h3 id="ex-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of exercise therapy">
                <li>Improved strength, balance, and endurance for daily activities.</li>
                <li>Reduced flare frequency through pacing and better load tolerance.</li>
                <li>Improved confidence with movement and return to valued activities.</li>
                <li>Supports recovery after procedures by restoring capacity safely.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-steps-title">
              <h3 id="ex-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Exercise therapy steps">
                <li>Assessment of baseline capacity, symptoms, and functional goals.</li>
                <li>Selection of starting exercises and safe intensity range.</li>
                <li>Progression rules based on symptoms and performance measures.</li>
                <li>Education on pacing, rest, sleep, and recovery habits.</li>
                <li>Review and progression as capacity improves.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-risks-title">
              <h3 id="ex-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of exercise therapy">
                <li>Temporary pain flare or muscle soreness after new loads.</li>
                <li>Overuse injury if intensity increases too quickly.</li>
                <li>Dizziness or cardiovascular symptoms in susceptible patients (requires screening).</li>
                <li>Delayed progress if programmes are inconsistent or poorly matched to diagnosis.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-prep-title">
              <h3 id="ex-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for exercise therapy">
                <li>Wear comfortable clothing and supportive footwear when relevant.</li>
                <li>Bring a medication list and note any heart, breathing, or balance concerns.</li>
                <li>Follow the plan consistently and progress only as advised.</li>
                <li>Seek medical review for new neurological symptoms, chest pain, or fainting.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ex-recovery-title">
              <h3 id="ex-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Early gains in confidence and movement often appear within weeks. Strength and conditioning improvements typically build over
                weeks to months with progressive loading and consistent practice.
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

export default ExercisePage;
