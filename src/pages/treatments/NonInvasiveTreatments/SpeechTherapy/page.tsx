import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './SpeechTherapy.css';


  


const SpeechTherapyPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'frequency',
        question: 'How often do I need speech therapy sessions?',
        answer:
          'Frequency depends on your goals and the type of difficulties being addressed (speech, language, voice, or swallowing). Many plans start with regular sessions and adjust as skills improve.',
      },
      {
        id: 'practice',
        question: 'Will I need to practice at home?',
        answer:
          'Home practice is often a key part of progress. Your therapist will provide manageable exercises or strategies to use in daily situations between sessions.',
      },
      {
        id: 'insurance',
        question: 'Is speech therapy covered by insurance?',
        answer:
          'Coverage varies by provider and policy. It’s best to confirm with your insurer, and our team can provide supporting documentation if required.',
      },
      {
        id: 'duration',
        question: 'How long does speech therapy last?',
        answer:
          'Duration varies based on the underlying cause, severity, and goals. Some people need short-term support, while others benefit from longer rehabilitation and review over time.',
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
    const pageTitle = 'Speech therapy in Algarve | Voice, language, and swallowing care';
    document.title = pageTitle;

    const description =
      'Learn about speech therapy in Algarve for speech, language, and swallowing problems. Compassionate, evidence‑based care and simple consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, 
  
  
  
  []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-speech-therapy') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "url('/assets/images/SpeechTherapy/banner.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };


  return (
    <div className="psx-page speech-therapy-page page-speechtherapy" id="psx-speech-therapy">
      <header className="treatment-page-hero speech-therapy-hero" aria-label="Speech therapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Speech therapy</h1>
          <p className="psx-hero-subtitle">
            Specialist support helps improve speech, language and swallowing after injury or illness.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Speech therapy" />

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="st-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/SpeechTherapy/card.webp"
                alt="Speech and language therapy session supporting communication, voice, and swallowing care (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="st-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Speech and language therapy supports communication, voice, and swallowing. Care may be needed after stroke or neurological
                illness, following head and neck problems, or when speech and swallowing change with ageing or medical conditions.
              </p>
              <p className="treatments-feature-body">
                The first session includes an assessment of speech clarity, language, cognition‑communication (when relevant), voice, and
                swallowing safety. Your therapist then sets practical goals and provides a plan for practice at home.
              </p>
              <p className="treatments-feature-body">
                If swallowing is a concern, safety is prioritised. Your clinician may advise food texture changes, swallowing strategies,
                and coordination with medical assessment where needed.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section speech-understanding st-understanding" aria-labelledby="speech-understanding-title">
          <div className="speech-understanding-inner st-understanding-inner">
            <h2 id="speech-understanding-title" className="speech-understanding-title st-understanding-title">
              Understanding
              <br />
              Speech Therapy
            </h2>
            <div className="speech-understanding-copy st-understanding-copy">
              <p className="st-understanding-paragraph">
                Speech therapy encompasses various techniques aimed at improving communication skills and addressing swallowing difficulties.
                It targets a range of speech issues, from articulation and fluency to language comprehension and voice disorders. For
                individuals facing challenges in expressing themselves or experiencing issues with swallowing, speech therapy offers
                structured, goal-oriented interventions to enhance both functional communication and quality of life.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section speech-process st-process" aria-labelledby="speech-process-title">
          <div className="speech-process-inner st-process-inner">
            <header className="speech-process-header st-process-header">
              <h2 id="speech-process-title" className="speech-process-title st-process-title">
                What this Process Looks Like
              </h2>
            </header>

            <div className="speech-steps-grid st-steps-grid" role="list" aria-label="Speech therapy process steps">
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

        <section className="page-section speech-aftercare st-aftercare" aria-labelledby="speech-aftercare-title">
          <header className="speech-aftercare-header st-aftercare-header">
              <h2 id="speech-aftercare-title" className="speech-aftercare-title st-aftercare-title">
                What to Expect After Implementation
              </h2>
          </header>

          <div className="speech-aftercare-layout st-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="speech-aftercare-media st-aftercare-media" aria-hidden="true">
                <div className="speech-aftercare-poster st-aftercare-poster">
                  <img
                  className="st-aftercare-image"
                  src="/assets/images/SpeechTherapy/card.webp"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
                </div>
              </figure>

              <div className="speech-aftercare-panel st-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Enhanced Communication Skills</h3>
                  <p className="st-aftercare-item-body">
                    Many patients experience improved clarity in speech, better articulation, and increased confidence in verbal communication.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Improved Quality of Life</h3>
                  <p className="st-aftercare-item-body">
                    Enhanced communication and safer swallowing can lead to increased social interaction, higher self-esteem, and overall
                    well-being.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Long‑Term Progress</h3>
                  <p className="st-aftercare-item-body">
                    Speech therapy often yields gradual improvements, with lasting benefits as patients continue to practice their skills
                    independently or with family support.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section speech-benefits st-benefits" aria-labelledby="speech-benefits-title">
          <div className="speech-benefits-inner st-benefits-inner">
            <header className="speech-benefits-header st-benefits-header">
              <h2 id="speech-benefits-title" className="speech-benefits-title st-benefits-title">
                Benefits of Speech Therapy
              </h2>
              <p className="st-benefits-subtitle">
                Speech Therapy can significantly improve the quality of life.
              </p>
              <p className="ot-benefits-subtitle-secondary">Some of the main benefits include:</p>
            </header>

            <div className="rfa-benefits-grid" role="list" aria-label="Benefits of speech therapy">
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

         <section className="page-section speech-conditions st-conditions" aria-labelledby="speech-conditions-title">
          <div className="pt-conditions-inner tms-conditions-inner">
            <header className="pt-conditions-header tms-conditions-header">
              <h2 id="speech-conditions-title" className="pt-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Speech Therapy
              </h2>
            </header>

            <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with speech therapy">
              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Articulation & Phonological Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Therapy helps individuals with sound formation and pronunciation challenges.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image" 
                    src="/assets/images/SpeechTherapy/Articulation&Phonological.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Fluency Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Therapy can address stuttering and other fluency issues, improving ease and comfort in speaking.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/SpeechTherapy/FluencyDisorders.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Language Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Patients with difficulties in understanding or using language, whether due to developmental delays or neurological conditions, benefit from targeted language exercises.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/SpeechTherapy/LanguageDisorders.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Voice Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    For those with vocal quality issues (hoarseness, pitch problems), therapy includes techniques for better vocal control.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/SpeechTherapy/VoiceDisorders.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Dysphagia</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Patients with swallowing difficulties learn strategies to improve swallowing safety and reduce the risk of aspiration.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/SpeechTherapy/Dysphagia.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section speech-right st-right" aria-labelledby="speech-right-title">
          <div className="speech-right-inner st-right-inner">
            <h2 id="speech-right-title" className="speech-right-title st-right-title">
              Is Speech Therapy
              <br />
              Right for You?
            </h2>
            <div className="speech-right-copy st-right-copy">
              <p className="st-right-body">
                Speech therapy is suitable for individuals of all ages who experience challenges with speech, language, or swallowing. This may include children with developmental conditions, adults recovering from injury, or anyone facing difficulties in communication skills due to various causes. Through specialized techniques, speech therapy helps individuals improve their ability to communicate effectively and enhance their quality of life.
              </p>
              <p className="st-right-body">
                Achieving success in speech therapy requires a commitment to consistent practice. Regular participation in therapy sessions is essential, as well as engaging in prescribed exercises at home. This dedication to practice allows individuals to reinforce what they learn during therapy, fostering steady improvement over time.
              </p>
              <p className="st-right-body">
                Speech therapy often follows a gradual, long-term approach, especially for those with significant or complex needs. The best results come from steady progress and consistent reinforcement, helping individuals build skills that can lead to meaningful, lasting improvements in their communication abilities.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section speech-faq st-faq" aria-labelledby="speech-faq-title">
          <div className="speech-faq-inner st-faq-inner">
            <header className="speech-faq-header st-faq-header">
              <h2 id="speech-faq-title" className="speech-faq-title st-faq-title">
                Speech Therapy FAQ
              </h2>
            </header>

            <div className="speech-faq-card st-faq-card" role="list" aria-label="Speech therapy frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `speech-faq-${item.id}`;
                const panelId = `speech-faq-panel-${item.id}`;
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



         
        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="st-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="st-details-title" className="minimally-invasive-treatment-details-title">
              Speech therapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Speech therapy is personalised and practice‑based. Progress is supported by frequent, manageable home practice and clear goals
              that connect to real life communication and safety.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="st-technique-title">
              <h3 id="st-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Therapy uses structured exercises and functional practice to improve speech clarity, language, voice use, and swallowing
                strategies. The plan is adapted based on the underlying cause and your response over time.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-benefits-title">
              <h3 id="st-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of speech therapy">
                <li>Improved communication confidence and participation in social life.</li>
                <li>Better voice quality and reduced strain in selected voice problems.</li>
                <li>Improved swallowing safety strategies and reduced aspiration risk when relevant.</li>
                <li>Support for family and carers with practical communication tools.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-steps-title">
              <h3 id="st-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Speech therapy steps">
                <li>Assessment of communication, voice, and/or swallowing based on the referral concern.</li>
                <li>Goal setting and explanation of what is driving the symptoms.</li>
                <li>Individualised exercises and functional practice tasks.</li>
                <li>Home programme and strategies for daily use.</li>
                <li>Follow‑up reassessment and progression plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-risks-title">
              <h3 id="st-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of speech therapy">
                <li>Temporary vocal fatigue after voice exercises.</li>
                <li>Frustration or fatigue with challenging language tasks (therapy is paced to tolerance).</li>
                <li>Swallowing safety risk if recommendations are not followed when dysphagia is present.</li>
                <li>Delayed progress if practice is inconsistent between sessions.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-prep-title">
              <h3 id="st-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for speech therapy">
                <li>Bring a medication list and relevant medical history (for example stroke details, ENT reviews).</li>
                <li>Note when symptoms occur: fatigue, certain foods, or particular speaking situations.</li>
                <li>Practise the home programme little and often for best results.</li>
                <li>Seek urgent help for sudden new swallowing difficulty, facial droop, or new speech weakness.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="st-recovery-title">
              <h3 id="st-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Progress depends on the cause and severity. Many people notice improvement over weeks with consistent practice; longer‑term
                neurological recovery may take months and benefits from ongoing support.
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

export default SpeechTherapyPage;
