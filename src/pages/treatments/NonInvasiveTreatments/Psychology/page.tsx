import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Psychology.css';

const PsychologyPage: React.FC = () => {
  const faqItems = React.useMemo(
      () => [
        {
          id: 'Frequency',
          question: 'How often do I need psychology sessions?',
          answer:
            'The frequency varies depending on individual needs; many start with weekly sessions, which may adjust as therapy progresses.',
        },
        {
          id: 'Therapy Standars',
          question: 'Is therapy confidential?',
          answer:
            'Yes, all sessions are confidential, with strict adherence to privacy and ethical standards.',
        },
        {
          id: 'Duration',
          question: 'How long does therapy usually last?',
          answer:
            'Therapy duration depends on individual goals and progress; it may be short-term or continue for an extended period based on needs.',
        },
        {
          id: 'Conditions',
          question: 'Can therapy be effective for severe mental health issues?',
          answer:
            'Yes, psychological therapy is effective for a range of conditions, including moderate to severe mental health challenges.',
        },
        {
          id: 'insurance',
          question: 'Is psychology covered by insurance?',
          answer:
            'Insurance coverage varies, so it’s best to check with your provider to understand specific benefits.',
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

    {/* SEO */}
    const pageTitle = 'Psychology in Algarve | Support for pain, mood, and adjustment';
    document.title = pageTitle;

    const description =
      'Explore psychology services in Algarve for chronic pain, anxiety, and life changes. Compassionate, evidence‑based care with simple consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-psychology') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "url('/assets/images//Psychology/banner.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page psychology-page page-psychology" id="psx-psychology">
      <header className="treatment-page-hero psychology-hero" aria-label="Psychology hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Psychology</h1>
          <p className="psx-hero-subtitle">
            Psychological support can help you cope with chronic pain and life changes.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Psychology" />


        {/* Introdução */}
        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="psy-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/Psychology/Behavioral.webp"
                alt="Psychology support for chronic pain, mood, and adjustment, delivered as part of multidisciplinary rehabilitation care (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="psy-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Psychology support helps you build practical skills to manage stress, sleep problems, fear of movement, and the emotional
                impact of pain or illness. It is commonly used as part of multidisciplinary care, because pain and recovery are influenced by
                the nervous system, mood, habits, and the environment.
              </p>
              <p className="treatments-feature-body">
                Sessions are collaborative and goal‑focused. Your psychologist will explore your story, identify what keeps symptoms and
                distress going, and teach evidence‑based tools (for example pacing, relaxation, cognitive strategies, and values‑based goal
                setting) that you can use in daily life.
              </p>
              <p className="treatments-feature-body">
                Many people benefit from combining psychology with physiotherapy and medical review. The aim is improved function and quality
                of life, even if pain does not disappear immediately.
              </p>
            </div>
          </div>
        </section>







        {/* Understanding */}
        <section className="page-section psychology-understanding st-understanding" aria-labelledby="psychology-understanding-title">
          <div className="psychology-understanding-inner st-understanding-inner">
            <h2 id="psychology-understanding-title" className="psychology-understanding-title st-understanding-title">
              Understanding
              <br />
              Psychology
            </h2>
            <div className="psychology-understanding-copy st-understanding-copy">
              <p className="st-understanding-paragraph">
                Psychology involves the assessment and treatment of mental health concerns, using evidence-based practices to address a wide variety of conditions.
                <br /><br />
                At its core, psychology seeks to understand thought patterns, emotional responses, and behaviors, providing tools and support for managing challenges. With specialized training, psychologists offer therapeutic methods to help individuals gain clarity, cope with stress, and achieve personal growth.
              </p>
            </div>
          </div>
        </section>

        {/* Processo */} 
        <section className="page-section psychology-process st-process" aria-labelledby="psychology-process-title">
          <div className="psychology-process-inner st-process-inner">
            <header className="psychology-process-header st-process-header">
              <h2 id="psychology-process-title" className="psychology-process-title st-process-title">
                What this Process Looks Like
              </h2>
            </header>

            <div className="psychology-steps-grid st-steps-grid" role="list" aria-label="Psychology care process steps">
              <article className="st-step-card" role="listitem" aria-label="Step 1 initial evaluation">
                <p className="st-step-number" aria-hidden="true">
                  1.
                </p>
                <h3 className="st-step-title">Initial Evaluation</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  The process begins with a thorough evaluation, where speech therapists assess speech, language, and swallowing functions.
                  This includes understanding the patient&apos;s challenges and establishing clear therapy goals.
                </p>
              </article>

              <article className="st-step-card" role="listitem" aria-label="Step 2 personalized treatment plan">
                <p className="st-step-number" aria-hidden="true">
                  2.
                </p>
                <h3 className="st-step-title">Personalized Treatment Plan</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Based on the assessment, therapists develop an individualized plan that may include speech exercises, language games, and
                  activities to improve swallowing.
                </p>
              </article>

              <article className="st-step-card" role="listitem" aria-label="Step 3 ongoing therapy sessions">
                <p className="st-step-number" aria-hidden="true">
                  3.
                </p>
                <h3 className="st-step-title">Ongoing Therapy Sessions</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Therapy typically involves regular sessions that focus on specific goals. Sessions may include exercises to strengthen
                  muscles, articulation practice, cognitive-linguistic tasks, and techniques for safe swallowing when needed.
                </p>
              </article>
            </div>
          </div>
        </section>

         {/* Expectativa */}
        <section className="page-section psychology-aftercare st-aftercare" aria-labelledby="psychology-aftercare-title">
          <header className="psychology-aftercare-header st-aftercare-header">
              <h2 id="psychology-aftercare-title" className="psychology-aftercare-title st-aftercare-title">
                What to Expect After Implementation
              </h2>
          </header>

          <div className="psychology-aftercare-layout st-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="psychology-aftercare-media st-aftercare-media" aria-hidden="true">
                <div className="psychology-aftercare-poster st-aftercare-poster">
                  <img
                  className="st-aftercare-image"
                  src="/assets/images/Psychology/card.webp"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
                </div>
              </figure>

              <div className="psychology-aftercare-panel st-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Increased Self-Awareness</h3>
                  <p className="st-aftercare-item-body">
                    Therapy often leads to greater insight into personal patterns, motivations, and emotional responses, which can empower individuals to make positive changes.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Improved Coping Mechanisms</h3>
                  <p className="st-aftercare-item-body">
                    Patients develop tools to manage stress, anxiety, and other mental health challenges, contributing to greater emotional resilience.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Ongoing Personal Growth</h3>
                  <p className="st-aftercare-item-body">
                    Psychological support encourages continuous self-improvement and emotional development, both during and after therapy.
                  </p>
                </article>
              </div>
            </div>
        </section>

        {/* Beneficio */} 
        <section className="page-section psychology-benefits st-benefits" aria-labelledby="psychology-benefits-title">
          <div className="psychology-benefits-inner st-benefits-inner">
            <header className="psychology-benefits-header st-benefits-header">
              <h2 id="psychology-benefits-title" className="psychology-benefits-title st-benefits-title">
                Benefits of Speech Therapy
              </h2>
              <p className="st-benefits-subtitle">
                Speech Therapy can significantly improve the quality of life.
              </p>
              <p className="ot-benefits-subtitle-secondary">Some of the main benefits include:</p>
            </header>

            <div className="rfa-benefits-grid" role="list" aria-label="Benefits of psychology care">
              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Improved Cognitive-Linguistic Skills</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Speech therapy also supports cognitive-linguistic development, especially in children and those recovering from brain injuries.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Increased Social Confidence</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  By enhancing communication skills, patients feel more confident and comfortable in social situations, which can improve social integration and personal relationships.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Support for Swallowing Disorders</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  For patients with swallowing difficulties, speech therapy offers techniques that promote safer swallowing and reduce the risk of choking or aspiration.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Condição */} 
        <section className="page-section psychology-conditions st-conditions" aria-labelledby="psychology-conditions-title">
          <div className="pt-conditions-inner tms-conditions-inner">
            <header className="pt-conditions-header tms-conditions-header">
              <h2 id="psychology-conditions-title" className="pt-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Psychology
              </h2>
            </header>

            <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions supported by psychology care">
              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Anxiety Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Psychological therapies, especially CBT, help individuals manage symptoms of anxiety.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image" 
                    src="/assets/images/Psychology/Anxiety.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Stress Management</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Techniques like mindfulness and cognitive restructuring can reduce stress and improve overall well-being.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Psychology/StressManagement.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Trauma and PTSD</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Specialized therapies, such as trauma-focused CBT, are used to help individuals recover from past trauma.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Psychology/TraumaPTSD.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Depression & Mood Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Therapy can provide tools to cope with and manage depressive symptoms and mood fluctuations.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Psychology/Depression.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Behavioral Issues</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    For those struggling with behavioral or emotional regulation, psychology provides structured guidance.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Psychology/Behavioral.webp"
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
        <section className="page-section st-right" aria-labelledby="pt-right-title">
          <div className="rfa-help-inner">
            <h2 id="pt-right-title" className="rfa-help-title">
              Is Psychology
              <br />
              Right for You?
            </h2>
            <div className="rfa-help-copy">
              <p className="rfa-help-paragraph">
                Psychology can be beneficial for anyone seeking support with mental health, from managing stress and anxiety to fostering personal growth and resilience. Through structured guidance, it helps individuals build coping skills and enhance self-awareness.
              </p>
              <p className="rfa-help-paragraph">
                Successful therapy requires a commitment to the process and openness to self-exploration. This willingness allows individuals to uncover deeper insights and achieve meaningful growth.
              </p>
              <p className="rfa-help-paragraph">
                Therapy is often a gradual journey, with the best results coming from consistent engagement and patience over time, leading to lasting improvements in mental health and emotional well-being.
              </p>
            </div>
          </div>
        </section>
         
        {/* FAQ */}
        <section className="page-section psychology-faq st-faq" aria-labelledby="psychology-faq-title">
          <div className="psychology-faq-inner st-faq-inner">
            <header className="psychology-faq-header st-faq-header">
              <h2 id="psychology-faq-title" className="psychology-faq-title st-faq-title">
                Psychology Therapy FAQ
              </h2>
            </header>

            <div className="psychology-faq-card st-faq-card" role="list" aria-label="Psychology frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `psychology-faq-${item.id}`;
                const panelId = `psychology-faq-panel-${item.id}`;
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
        
        {/* Sumario */}
        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="psy-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="psy-details-title" className="minimally-invasive-treatment-details-title">
              Psychology: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Psychological therapy is tailored to your goals, symptoms, and preferences. Your clinician will explain the approach used and
              how it fits alongside other treatments.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-technique-title">
              <h3 id="psy-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Therapy focuses on skills that change how the nervous system responds to stress and pain. Common approaches include cognitive
                behavioural strategies, acceptance‑based methods, and education about how pain and mood interact.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-benefits-title">
              <h3 id="psy-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of psychology support">
                <li>Reduced distress and improved coping with pain and flare‑ups.</li>
                <li>Better sleep routines and improved energy management.</li>
                <li>Reduced fear‑avoidance and improved participation in rehabilitation.</li>
                <li>Improved mood and quality of life in many patients.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-steps-title">
              <h3 id="psy-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Psychology care steps">
                <li>Assessment of symptoms, stressors, sleep, and goals.</li>
                <li>Shared formulation of what maintains distress and disability.</li>
                <li>Skills training (pacing, relaxation, cognitive strategies, behavioural plans).</li>
                <li>Home practice and tracking of meaningful outcomes.</li>
                <li>Review and consolidation to support long‑term self‑management.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-risks-title">
              <h3 id="psy-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of psychology support">
                <li>Temporary increase in emotion when discussing difficult experiences.</li>
                <li>Fatigue after intensive sessions or new behavioural change.</li>
                <li>Delayed improvement if practice between sessions is inconsistent.</li>
                <li>Need for urgent support if there are safety concerns; the clinician will discuss pathways.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-prep-title">
              <h3 id="psy-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for psychology support">
                <li>Bring a brief symptom timeline and a medication list.</li>
                <li>Think about 1–3 goals that matter to you (sleep, walking, return to work).</li>
                <li>Practise assigned skills consistently; small daily practice is effective.</li>
                <li>Seek urgent support for self‑harm thoughts or safety concerns.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="psy-recovery-title">
              <h3 id="psy-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people notice early changes in understanding and coping within a few sessions. Sustained improvement usually builds over
                weeks to months as skills become habits and rehabilitation progresses.
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

export default PsychologyPage;
