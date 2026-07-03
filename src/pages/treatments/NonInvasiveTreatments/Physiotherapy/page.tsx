import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Physiotherapy.css';

type PhysiotherapyFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const PHYSIOTHERAPY_FAQ: PhysiotherapyFaqItem[] = [
  {
    id: 'session-length',
    question: 'How long does each session take?',
    answer:
      'Session length can vary by clinic and goals, but many appointments last around 30–60 minutes. Your clinician will confirm timing and what to expect for your specific plan.',
  },
  {
    id: 'results',
    question: 'When will I see results?',
    answer:
      'Some people feel improvement after a few sessions, while others need several weeks of progressive exercise to build capacity. Progress depends on the condition, how long symptoms have been present, and consistency with home exercises.',
  },
  {
    id: 'painful',
    question: 'Will physiotherapy be painful?',
    answer:
      'Some discomfort can be normal when working on stiff or sensitive tissues, but treatment should be tolerable and adapted to you. Your clinician will guide you on acceptable levels of discomfort and how to manage flare‑ups.',
  },
  {
    id: 'insurance',
    question: 'Is physiotherapy covered by insurance?',
    answer:
      'Coverage varies by insurer and policy. If you have insurance, we recommend checking your benefits and requirements for referrals or authorisation before booking.',
  },
];

const PhysiotherapyPage: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(() => PHYSIOTHERAPY_FAQ[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle = 'Physiotherapy in Algarve | Individual spine and joint rehab plans';
    document.title = pageTitle;

    const description =
      'Discover physiotherapy in Algarve for back, neck, and joint pain. Hands‑on care, exercise plans, and simple online consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-physiotherapy') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/illustrative/Physiotherapy-min.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page physiotherapy-page page-physiotherapy" id="psx-physiotherapy">
      <header className="treatment-page-hero physiotherapy-hero" aria-label="Physiotherapy hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Physiotherapy</h1>
          <p className="psx-hero-subtitle">
            Movement, strengthening and manual therapy support long-term recovery and mobility.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Physiotherapy" />

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="pt-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Physiotherapy-min.webp"
                alt="Physiotherapy assessment and exercise-based rehabilitation for spine and joint pain (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="pt-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Physiotherapy combines assessment, education, and a graded movement plan to improve function and reduce pain interference.
                Treatment is built around your goals—walking, stairs, work tolerance, sport, or everyday tasks—rather than a one‑size‑fits‑all
                set of exercises.
              </p>
              <p className="treatments-feature-body">
                A session usually includes a detailed history, movement and strength testing, and a plan you can follow between visits.
                Hands‑on techniques may be used as an adjunct, but long‑term improvements usually depend on progressive exercise, pacing, and
                confidence with movement.
              </p>
              <p className="treatments-feature-body">
                After sessions, you’ll have home exercises and clear guidance on what levels of discomfort are acceptable. Your plan is
                adjusted over time based on measurable progress, flare patterns, and what matters most to you.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section pt-understanding" aria-labelledby="pt-understanding-title">
          <div className="pt-understanding-inner">
            <div className="pt-understanding-top">
              <h2 id="pt-understanding-title" className="pt-understanding-title">
                Understanding
                <br />
                Physiotherapy
              </h2>
              <div className="pt-understanding-copy">
                <p className="pt-understanding-paragraph">
                  Physiotherapy is a non‑invasive treatment that enhances movement, promotes healing, and helps prevent future injuries
                  through personalised exercise and rehabilitation techniques.
                </p>
                <p className="pt-understanding-paragraph">
                  It focuses on restoring and maintaining physical function with tailored exercise programmes, manual therapy, and other
                  techniques for musculoskeletal and neurological issues, supporting recovery without the need for surgery or procedures.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section pt-process" aria-labelledby="pt-process-title">
          <div className="pt-process-inner">
            <div className="pt-process-top">
              <h2 id="pt-process-title" className="pt-process-title">
                What this Process Looks Like
              </h2>
              <div className="pt-process-copy">
                <p className="pt-process-paragraph">
                  Physiotherapy usually starts with a detailed assessment, continues with targeted treatment sessions, and is reinforced by
                  guided exercises at home to support lasting progress.
                </p>
              </div>
            </div>

            <div className="pt-steps-grid" role="list" aria-label="Physiotherapy process steps">
              <article className="pt-step-card" role="listitem" aria-label="Step 1 initial assessment">
                <p className="pt-step-number">1.</p>
                <h3 className="pt-step-title">Initial Assessment</h3>
                <div className="pt-step-divider" aria-hidden="true" />
                <p className="pt-step-body">
                  A comprehensive evaluation is conducted, which includes assessing your medical history, physical abilities, and any
                  current pain or limitations. This helps create a customised plan that targets your unique needs.
                </p>
              </article>

              <article className="pt-step-card" role="listitem" aria-label="Step 2 treatment sessions">
                <p className="pt-step-number">2.</p>
                <h3 className="pt-step-title">Treatment Sessions</h3>
                <div className="pt-step-divider" aria-hidden="true" />
                <p className="pt-step-body">
                  Sessions involve targeted exercises, stretches, and sometimes hands‑on techniques to address stiffness, pain, or
                  restricted movement. Treatment may be combined with other modalities when appropriate.
                </p>
              </article>

              <article className="pt-step-card" role="listitem" aria-label="Step 3 at-home exercises">
                <p className="pt-step-number">3.</p>
                <h3 className="pt-step-title">At‑Home Exercises</h3>
                <div className="pt-step-divider" aria-hidden="true" />
                <p className="pt-step-body">
                  You&apos;ll receive specific exercises to perform at home to reinforce therapy goals and maintain progress between sessions.
                  These programmes are designed to be simple, effective, and sustainable.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pt-aftercare" aria-labelledby="pt-aftercare-title">
          <header className="pt-aftercare-header">
            <h2 id="pt-aftercare-title" className="pt-aftercare-title">
              What to Expect After
              <br />
              Implementation
            </h2>
            <p className="pt-aftercare-subtitle">Here&apos;s a breakdown of what you can expect:</p>
          </header>

          <div className="pt-aftercare-layout" aria-label="After implementation expectations">
            <figure className="pt-aftercare-media" aria-hidden="true">
              <div className="pt-aftercare-poster">
                <img
                  className="pt-aftercare-image"
                  src="/assets/images/medical/DSC04816-1536x1229.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>

            <div className="pt-aftercare-panel" role="list" aria-label="After implementation expectations">
              <article className="pt-aftercare-item" role="listitem">
                <h3 className="pt-aftercare-item-title">Increased Mobility &amp; Strength</h3>
                <p className="pt-aftercare-item-body">
                  Over time, many people improve range of motion, strength, and confidence with movement, helping them move more freely in
                  daily life.
                </p>
              </article>
              <div className="pt-aftercare-divider" aria-hidden="true" />
              <article className="pt-aftercare-item" role="listitem">
                <h3 className="pt-aftercare-item-title">Reduced Pain &amp; Discomfort</h3>
                <p className="pt-aftercare-item-body">
                  Pain relief is often gradual but noticeable, with reduced discomfort as tissue capacity improves and flare cycles become
                  easier to manage.
                </p>
              </article>
              <div className="pt-aftercare-divider" aria-hidden="true" />
              <article className="pt-aftercare-item" role="listitem">
                <h3 className="pt-aftercare-item-title">Self‑Management Skills</h3>
                <p className="pt-aftercare-item-body">
                  Physiotherapy equips you with knowledge and exercises to manage your condition independently and reduce the likelihood of
                  recurrence or future injuries.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pt-benefits" aria-labelledby="pt-benefits-title">
          <div className="pt-benefits-inner">
            <header className="pt-benefits-header">
              <h2 id="pt-benefits-title" className="pt-benefits-title">Benefits of Physiotherapy</h2>
              <p className="pt-benefits-subtitle">
                Physiotherapy can significantly improve quality of life for those living with chronic pain.
              </p>
              <p className="pt-benefits-subtitle">Some of the main benefits include:</p>
            </header>

            <div className="pt-benefits-grid" role="list" aria-label="Benefits of physiotherapy">
              <article className="pt-benefit-card pt-benefit-card--highlight" role="listitem">
                <h3 className="pt-benefit-title">
                  Non–Invasive
                  <br />
                  Recovery
                </h3>
                <div className="pt-benefit-divider" aria-hidden="true" />
                <p className="pt-benefit-body">
                  Patients can recover mobility and strength without surgery, making it an ideal option for those who prefer non‑invasive
                  treatments.
                </p>
              </article>

              <article className="pt-benefit-card" role="listitem">
                <h3 className="pt-benefit-title">
                  Preventative
                  <br />
                  Care Approach
                </h3>
                <div className="pt-benefit-divider" aria-hidden="true" />
                <p className="pt-benefit-body">
                  Physiotherapy helps prevent future injuries by strengthening the body&apos;s support systems and improving physical
                  function.
                </p>
              </article>

              <article className="pt-benefit-card" role="listitem">
                <h3 className="pt-benefit-title">
                  Personalized
                  <br />
                  Rehabilitation
                </h3>
                <div className="pt-benefit-divider" aria-hidden="true" />
                <p className="pt-benefit-body">
                  Each programme is tailored to your needs, making therapy effective and responsive to changes in your condition.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pt-conditions" aria-labelledby="pt-conditions-title">
          <div className="pt-conditions-inner tms-conditions-inner">
            <header className="pt-conditions-header tms-conditions-header">
              <h2 id="pt-conditions-title" className="pt-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Physiotherapy
              </h2>
            </header>

            <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with physiotherapy">
              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Musculoskeletal Issues</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Physiotherapy is effective for back pain, neck pain, and joint problems due to injury or overload, supporting strength
                    and movement control.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/treatment-img/SpinePain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card pt-condition-card--reverse" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Post‑Surgical Recovery</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Structured rehabilitation helps rebuild strength, restore range of motion, and return to daily activities safely after
                    surgery.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/treatment-img/HipPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card pt-condition-card--reverse" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Neurological Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Physiotherapy can improve motor control, balance, and mobility in conditions affecting the nervous system, supporting
                    independence.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/treatment-img/Neuropatic.webp"
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
                    From sprains and strains to overuse injuries, physiotherapy supports safe return to sport through progressive loading
                    and technique coaching.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/treatment-img/KneePain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section pt-help" aria-labelledby="pt-help-title">
          <div className="pt-help-inner">
            <h2 id="pt-help-title" className="pt-help-title">
              Is Physiotherapy
              <br />
              Right for You?
            </h2>
            <div className="pt-help-copy">
              <p className="pt-help-paragraph">
                Physiotherapy can be ideal for people experiencing pain, restricted movement, or recovering from injuries or surgeries. It
                can provide relief, improve mobility, and support the healing process across a wide range of physical issues.
              </p>
              <p className="pt-help-paragraph">
                While physiotherapy can benefit many, it may not be suitable for everyone—especially if there are medical restrictions or
                red‑flag symptoms. A thorough assessment helps determine whether physiotherapy is the best approach for your situation.
              </p>
              <p className="pt-help-paragraph">
                Physiotherapy often requires a longer‑term commitment. For chronic conditions, multiple sessions may be necessary for
                optimal results, leading to meaningful, lasting improvements in function.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section pt-faq" aria-labelledby="pt-faq-title">
          <div className="pt-faq-inner">
            <header className="pt-faq-header">
              <h2 id="pt-faq-title" className="pt-faq-title">
                Physiotherapy FAQ
              </h2>
            </header>
            <div className="pt-faq-card" role="list" aria-label="Physiotherapy frequently asked questions">
              {PHYSIOTHERAPY_FAQ.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `pt-faq-${item.id}`;
                const panelId = `pt-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="pt-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="pt-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="pt-faq-question">{item.question}</span>
                      <span className="pt-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="pt-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="pt-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="pt-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="pt-details-title" className="minimally-invasive-treatment-details-title">
              Physiotherapy: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Physiotherapy is a progressive process. The focus is safe exposure to movement, improved strength and endurance, and better
              self‑management—often alongside medical care when needed.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-technique-title">
              <h3 id="pt-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Physiotherapy uses assessment findings to create a graded programme of mobility, strength, and conditioning. Education and
                pacing strategies reduce flare cycles, while targeted exercise improves tissue capacity and nervous system tolerance.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-benefits-title">
              <h3 id="pt-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of physiotherapy">
                <li>Improved function, confidence, and activity tolerance over time.</li>
                <li>Reduced pain interference and better flare‑up management strategies.</li>
                <li>Strength, balance, and endurance improvements that protect long‑term mobility.</li>
                <li>Supports recovery after procedures or surgery with structured progression.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-steps-title">
              <h3 id="pt-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Physiotherapy steps">
                <li>History and screening for red flags or referral needs.</li>
                <li>Movement, strength, and functional assessment.</li>
                <li>Shared goals and an initial programme with safe starting dose.</li>
                <li>Progression rules and a flare‑up plan.</li>
                <li>Reassessment and updates as capacity improves.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-risks-title">
              <h3 id="pt-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of physiotherapy">
                <li>Temporary symptom increase after new exercises or manual therapy.</li>
                <li>Delayed onset muscle soreness with strength work (normal and usually short‑lived).</li>
                <li>Injury risk if exercises progress too quickly without guidance.</li>
                <li>Persistent symptoms if underlying diagnosis requires medical review or imaging.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-prep-title">
              <h3 id="pt-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for physiotherapy">
                <li>Wear comfortable clothing and bring supportive footwear if relevant.</li>
                <li>Bring a medication list and any relevant imaging or reports.</li>
                <li>Follow home exercises consistently; small, frequent practice works best.</li>
                <li>Report new neurological symptoms or red flags for prompt medical review.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pt-recovery-title">
              <h3 id="pt-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people notice early improvements in confidence and movement within weeks. Strength and capacity gains typically build
                over weeks to months, supported by progressive loading and consistent practice.
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

export default PhysiotherapyPage;
